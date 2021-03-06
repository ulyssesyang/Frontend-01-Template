function match (string){
    let state = start;
    for (const c of string) {
        console.log(c)
       state = state(c);
    }
    return state === end;
}

function start (c){
    if (c === 'a') {
        return foundA;
    } else {
        return start;
    }
}

function end (c){
    return end;    
}

function foundA (c){
    if (c === 'b') {
        return foundB;
    } else {
        return start(c);
    }
}

function foundB (c){
    if (c === 'c') {
        return end;
    } else {
        return start(c);
    }
}

console.log(match('I am aabcede'));