function wrapString(inString, tag) {
    return "<" + tag + ">" + inString + "</" + tag + ">";
}

function makeWrapper(tag) {
    return (s) => wrapString(s, tag);
}

function wrapStrings(arr, tag) {
    return arr.map(makeWrapper(tag));
}