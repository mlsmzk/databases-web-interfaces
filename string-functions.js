/* Miles Mezaki HW3 Submission */

function wrapString(inString, tag) {
    /*
    Return an HTML formatted string with user-given tag.

    Args:
        inString: string to be included in the returned HTML formatted string
        tag: string representing the HTML tag to be applied to inString
    
    Returns:
        HTML formatted string of form "<tag>inString</tag>"
    */
    return "<" + tag + ">" + inString + "</" + tag + ">";
}

function makeWrapper(tag) {
    /*
    Return a function that will wrap a string with a user-given tag.

    Args:
        tag: string representing the HTML tag to be applied

    Returns:
        Anonymous function which, when applied, will wrap the input the anonymous function is applied to
        in the given HTML tag.
    */
    return (s) => wrapString(s, tag);
}

function wrapStrings(arr, tag) {
    /*
    Return an array of HTML formatted strings.

    Args:
        arr: array of strings representing the content of an HTML string
        tag: string representing the HTML tag to be applied to arr in order
             to wrap each element of arr in the HTML tag.
    
    Returns:
        Array of HTML formatted strings with tag *tag*.
    */
    return arr.map(makeWrapper(tag));
}

function wrapStringsTest(arr, tag) {
    /*
    Add a list of strings to the webpage given by array *arr* with tag *tag*.

    Args:
        arr: array of strings to be added to the webpage, in order
        tag: string representing the HTML tag that will be applied to arr

    Returns:
        None
    */
    let t = wrapStrings(arr,tag);
    setList(t);
}

function hardCodedList(tag) {
    /*
    Add the list ['apple','banana','chocolate'] to the webpage with given tag *tag*.

    Args:
        tag: string representing the HTML tag to add to the array.
    
    Returns:
        None
    */
    let t = ['apple','banana', 'chocolate'];
    wrapStringsTest(t, tag);
}

function strongList() {
    /*
    Add the list ['apple','banana','chocolate'] to the webpage with the <strong></strong> HTML tag.

    Args:
        None

    Returns:
        None
    */
    hardCodedList('strong');
}

function emList() {
    /*
    Add the list ['apple','banana','chocolate'] to the webpage with the <em></em> HTML tag.

    Args:
        None
        
    Returns:
        None
    */
    hardCodedList('em');
}