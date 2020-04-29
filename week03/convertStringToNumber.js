function convertStringToNumber(string, n = 10) {
    let chars = string.split('');
    let number = 0;
    let i = 0;

    while (i < chars.length && chars[i] != '.') {
        number = number * n;
        number = number + chars[i].codePointAt(0) - '0'.codePointAt(0);
        i ++;
    }

    if (chars[i] == '.') {
        i ++;
    }

    let fraction = 1;
    while (i < chars.length) {
        fraction = fraction / n;
        number   = number + ( chars[i].codePointAt(0) - '0'.codePointAt(0) ) * fraction;
        i ++;
    }
    return number;
}

console.log( convertStringToNumber('10.0123') );
console.log( convertStringToNumber('10.0123') === 10.0123 );