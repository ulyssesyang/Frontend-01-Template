function convertNumberToString(number, n = 10) {
    let integer  = Math.floor(number);
    let fraction = number - integer;
    let string   = integer ? '' : '0';

    while (integer > 0) {
        string  = String(integer % n) + string;
        integer = Math.floor(integer / n);
    }

    if (fraction) {
        string = string + '.';
        while (fraction) {
            fraction = fraction * n;
            string   = string + Math.floor(fraction);
            fraction = fraction - Math.floor(fraction);
        }
    }

    return string;
}

console.log( convertNumberToString(10.0123) );
console.log( convertNumberToString(10.0123) === '10.0123' );

console.log( convertNumberToString(0.0123) );
console.log( convertNumberToString(0.0123) === '0.0123' );