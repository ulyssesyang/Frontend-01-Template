const net = require('net');

class Request {
    // method, url = host + port + path
    // body: key/value (Single-resource bodies, defined by Content-Type/Content-Length)
    // headers
    constructor(options) {
        this.method  = options.method  || 'GET';
        this.host    = options.host    || '127.0.0.1';
        this.path    = options.path    || '/',
        this.port    = options.port    || 8080;
        this.body    = options.body    || {};
        this.headers = options.headers || {};

        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        }

        if (this.headers['Content-Type'] === 'application/json') {
            this.bodyText = JSON.stringify(this.body);
        } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
            this.bodyText = Object.keys(this.body).map((key) => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        }

        this.headers['Content-Length'] = this.bodyText.length;
    }

    send(connection) {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser();
            if (connection) {
                connection.write(this.toString());
            } else {
                connection = net.createConnection({
                    host: this.host,
                    port: this.port,
                }, (params) => {
                    connection.write(this.toString());
                });
            }
            connection.on('data', (data) => {
                parser.receive(data.toString());
                console.log('data.toString():\n',data.toString());
                // console.log('parser.statusLine:\n',parser.statusLine);
                // console.log('parser.headers:\n',parser.headers);
                if(parser.isFinished) {
                    resolve(parser.response);
                }
                connection.end();
            });
            connection.on('error', (error) => {
                reject(error);
                connection.end();
            })
        })
    }

    toString() {
        return (
            `${this.method} ${this.path} HTTP/1.1\r\n`
            + `${Object.keys(this.headers).map((key) => `${key}: ${this.headers[key]}`).join('\r\n')}\r\n`
            + '\r\n'
            + this.bodyText
        );
    }
}

class Response {
    constructor(params) {

    }
}

// Because of response data from server is streaming chunks
// We have to match data type coming as different state to parse differently
// State machine is a good strategy to use
class ResponseParser {
    constructor(params) {
        this.WAITING_STATUS_LINE        = 0;
        this.WAITING_STATUS_LINE_END    = 1; // end with \r
        this.WAITING_HEADER_NAME        = 2; // end with :
        this.WAITING_HEADER_SPACE       = 3;
        this.WAITING_HEADER_VALUE       = 4;
        this.WAITING_HEADER_LINE_END    = 5; // end with \r
        this.WAITING_HEADER_BLOCK_END   = 6; // \r\n
        this.WAITING_BODY               = 7;

        this.current        = this.WAITING_STATUS_LINE;
        this.statusLine     = '';
        this.headers        = {};
        this.headersName    = '';
        this.headersValue   = '';
        this.bodyParser     = null;
    }

    get isFinished() {
        return this.bodyParser && this.bodyParser.isFinished;
    }

    get response() {
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        }
    }

    // Buffer string
    receive(string) {
        // parse each character
        for (let i = 0; i < string.length; i++) {
            this.receiveChar(string.charAt(i));
        }
    }

    receiveChar(char) {
        if (this.current === this.WAITING_STATUS_LINE) {
            // console.log(char.charCodeAt(0));
            if (char === '\r') {
                this.current = this.WAITING_STATUS_LINE_END;
            } else if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME;
            } else {
                this.statusLine += char;
            }
        } else if (this.current === this.WAITING_STATUS_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME;
            }
        } else if (this.current === this.WAITING_HEADER_NAME) {
            if (char === ':') {
                this.current      = this.WAITING_HEADER_SPACE;
            } else if (char === '\r') {
                this.current      = this.WAITING_HEADER_BLOCK_END;
                if (this.headers['Transfer-Encoding'] === 'chunked') {
                    this.bodyParser   = new TrunkedBodyParser();
                }
            } else {
                this.headersName += char;
            }
        } else if (this.current === this.WAITING_HEADER_SPACE) {
            if (char === ' ') {
                this.current = this.WAITING_HEADER_VALUE;
            }
        } else if (this.current === this.WAITING_HEADER_VALUE) {
            if (char === '\r') {
                this.current                   = this.WAITING_HEADER_LINE_END;
                this.headers[this.headersName] = this.headersValue;
                this.headersName               = '';
                this.headersValue              = '';
            } else {
                this.headersValue             += char;
            }
        } else if (this.current === this.WAITING_HEADER_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_HEADER_NAME;
            }
        } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
            if (char === '\n') {
                this.current = this.WAITING_BODY;
            }
        } else if (this.current === this.WAITING_BODY) {
            this.bodyParser.receiveChar(char);
        }
    }
}

class TrunkedBodyParser {
    constructor(params) {
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;
        this.WAITING_NEW_LENGTH = 3;
        this.WAITING_NEW_LENGTH_END = 4;

        this.length = 0;
        this.content = [];
        this.isFinished = false;
        this.current = this.WAITING_LENGTH;
    }
    receiveChar(char) {
        // console.log('char:',char)
        if (this.current === this.WAITING_LENGTH) {
            if (char === '\r') {
                if (this.length === 0) {
                    this.isFinished = true;
                } else {
                    this.current = this.WAITING_LENGTH_LINE_END;
                }
            } else {
                this.length *= 16;
                this.length += parseInt(char, 16);
                // console.log('this.length:',this.length)
            }
        } else if (this.current === this.WAITING_LENGTH_LINE_END) {
            if (char === '\n') {
                this.current = this.READING_TRUNK;
            }
        } else if (this.current === this.READING_TRUNK) {
            this.content.push(char);
            this.length --;
            if (this.length === 0) {
                this.current = this.WAITING_NEW_LENGTH;
            }
        } else if (this.current === this.WAITING_NEW_LENGTH) {
            // console.log('WAITING_NEW_LENGTH:',this.content)
            if (char === '\r') {
                this.current = this.WAITING_NEW_LENGTH_END;
            }
        } else if (this.current === this.WAITING_NEW_LENGTH_END) {
            // console.log('WAITING_NEW_LENGTH_END',this.content)
            if (char === '\n') {
                this.current = this.WAITING_LENGTH;
            }
        } 
    }
}

void async function  () {
    const request = new Request({
        method: 'POST',
        headers: {
            ['X-KKK']: 'OOO',
        },
        body: {
            name: 'hello world',
        }
    });
    
    const res = await request.send();
    console.log(res);
}();

/*

// For testing purpose
const client = net.createConnection({
    host: '127.0.0.1',
    port: 8080,
}, () => {
    console.log('connected to server!');

    client.write('POST / HTTP/1.1\r\n');
    client.write('Content-Type: application/x-www-form-urlencoded\r\n');
    client.write('Content-Length: 16\r\n');
    client.write('\r\n');
    client.write('name=hello world\r\n');
});

client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});

client.on('end', () => {
    console.log('disconnected from server');
});

*/