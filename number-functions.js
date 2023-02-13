/* Miles Mezaki HW3 Submission */

function sqrt(x) {
    /* 
    Take the square root a number.
    Args:
        x: float representing the number the user will take the square root of.

    Returns:
        Square root of x
    */
        return Math.sqrt(x);
}

function hill(x) {
    /*
    Apply a special quadratic function to a number

    Args:
        x: float representing the number the user will apply the quadratic to

    Returns:
        The quadratic "hill" function applied to x
    */
    return -2 * (x-4) * (x-16);
}

function wiggle(x) {
    /*
    Apply a special cubic function to a number

    Args:
        x: float representing the number the user will apply the cubic to

    Returns:
        The cubic "wiggle" function applied to x
    */
    return 10 * (x-1) * (x-5) * (x-9);
}

function curve1() {
    /*
    Plot the square root function on a webpage for the range of integers between 0 and 29 inclusive.

    Args:
        None

    Returns:
        None
    */
    let r = range(0, 30);
    let y = r.map((x) => sqrt(x));
    newPlot(r, y)
}

function curve2() {
    /*
    Plot the hill function on a webpage for the range of integers between 0 and 20 inclusive.

    Args:
        None

    Returns:
        None
    */
    let r = range(0, 21);
    let y = r.map((x) => hill(x));
    newPlot(r,y);
}

function curve3() {
    /*
    Plot the wiggle function on a webpage for the range of integers between 0 and 10 inclusive.

    Args:
        None

    Returns:
        None
    */
    let r = range(0, 11);
    let y = r.map((x) => wiggle(x));
    newPlot(r,y);
}

let specialCos = function (x) {return 5 * Math.cos(0.2*x)};

function curve4() {
    /*
    Plot the function 5*cos(0.2*x) on a webpage for the range of integers between 0 and 99 inclusive.

    Args:
        None

    Returns:
        None
    */
    let r = range(0, 100);
    let y = r.map(specialCos);
    newPlot(r,y);
}

function curve5() {
    /*
    Plot the square of the 5*cos(0.2*x) function on a webpage for the range of integers between 0 and 99 inclusive.

    Args:
        None

    Returns:
        None
    */
    let r = range(0,100);
    let y = r.map(specialCos).map((x) => x*x);
    newPlot(r, y);
}

function curve1a() {
    /*
    Plot the square root function on a webpage for the range of integers between 0 and 29 inclusive.
    Then add an anonymous function representing the square root of x and plot it on the same grid as
    the square root function.

    Args:
        None

    Returns:
        None
    */
    curve1();
    let r = range(0,30);
    addPlot(r, r.map((x) => sqrt(x)));
}

function curve2a() {
    /*
    Plot the hill function on a webpage for the range of integers between 0 and 20 inclusive.
    Then add an anonymous function representing the hill function on x and plot it on the same grid as
    the hill function.

    Args:
        None

    Returns:
        None
    */
    curve2();
    let r = range(0,21);
    addPlot(r, r.map((x) => hill(x)));
}

function curve3a() {
    /*
    Plot the wiggle function on a webpage for the range of integers between 0 and 10 inclusive.
    Then add an anonymous function representing the wiggle on x and plot it on the same grid as
    the wiggle function.

    Args:
        None

    Returns:
        None
    */
    curve3();
    let r = range(0,11);
    addPlot(r, r.map((x) => wiggle(x)));
}

function quadratic(c, r1, r2) {
    /*
    Return a quadratic function of form y = c (x - r1) (x - r2)

    Args:
        c: float representing a constant coefficient
        r1: float representing the first root of the quadratic
        r2: float representing the second root of the quadratic

    Returns:
        Function literal with with float argument x representing a quadratic with coefficient c and roots r1, r2.
    */
    return function (x) {return c * (x - r1) * (x - r2)};
}

function curve2b() {
    /*
    Plot the hill function on a webpage for the range of integers between 0 and 20 inclusive.
    Then add an anonymous function representing the hill function on x and plot it on the same grid as
    the hill function. Finally, add a function using quadratic(-2,4,16) representing the hill function
    expressed in terms of the quadratic function to the plot.

    Args:
        None

    Returns:
        None
    */
    curve2a();
    let r = range(0, 21);
    addPlot(r, r.map((x) => quadratic(-2, 4, 16)(x)));
}

function cubic(c, r1, r2, r3) {
    /*
    Return a cubic function of form y = c (x - r1) (x - r2) (x - r3)

    Args:
        c: float representing a constant coefficient
        r1: float representing the first root of the cubic
        r2: float representing the second root of the cubic
        r3: float representing the third root of the cubic

    Returns:
        Function literal with with float argument x representing a cubic with coefficient c and roots r1, r2, r3.
    */
    return function (x) {return c * (x - r1) * (x - r2) * (x - r3)};
}

function curve3b() {
    /*
    Plot the wiggle function on a webpage for the range of integers between 0 and 10 inclusive.
    Then add an anonymous function representing the wiggle on x and plot it on the same grid as
    the wiggle function. Finally, add a function using cubic(10, 1, 5, 9) representing wiggle expressed
    in terms of the cubic function to the plot.

    Args:
        None

    Returns:
        None
    */
    curve3a();
    let r = range(0, 11);
    addPlot(r, r.map((x) => cubic(10, 1, 5, 9)(x)));
}