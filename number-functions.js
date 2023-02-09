function sqrt(x) {
    return Math.sqrt(x);
}

function hill(x) {
    return -2 * (x-4) * (x-16);
}

function wiggle(x) {
    return 10 * (x-1) * (x-5) * (x-9);
}

function curve1() {
    let r = range(0, 30);
    let y = r.map((x) => sqrt(x));
    newPlot(r, y)
}

function curve2() {
    let r = range(0, 21);
    let y = r.map((x) => hill(x));
    newPlot(r,y);
}

function curve3() {
    let r = range(0, 11);
    let y = r.map((x) => wiggle(x));
    newPlot(r,y);
}


function curve4() {
    let r = range(0, 100);
    let y = r.map(function (x) {return 5 * Math.cos(0.2*x)});
    newPlot(r,y);
}

function curve5() {
    let r = range(0,100);
    let y = r.map((x) => function (x) {return 5 * Math.cos(0.2*x) * 5 * Math.cos(0.2*x)});
    newPlot(r, y);
}

function curve1a() {
    curve1();
    let r = range(0,30);
    addPlot(r, r.map((x) => sqrt(x)));
}

function curve2a() {
    curve2();
    let r = range(0,21);
    addPlot(r, r.map((x) => hill(x)));
}

function curve3a() {
    curve3();
    let r = range(0,11);
    addPlot(r, r.map((x) => wiggle(x)));
}

function quadratic(c, r1, r2) {
    return function (x) {return c * (x - r1) * (x - r2)};
}

function curve2b() {
    curve2a();
    let r = range(0, 21);
    addPlot(r, r.map((x) => quadratic(-2, 4, 16)(x)));
}

function cubic(c, r1, r2, r3) {
    return function (x) {return c * (x - r1) * (x - r2) * (x - r3)};
}

function curve3b() {
    curve3a();
    let r = range(0, 11);
    addPlot(r, r.map((x) => cubic(10, 1, 5, 9)(x)));
}