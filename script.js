var morning = { r: 234, g: 250, b: 215};
var afternoon = { r: 236, g: 165, b: 77};
var night = { r: 2, g: 2, b: 68};

var body;
var msg; 
var imgs;

var hour;
var min; 
var sec;
var date;

var td;
var per;

getElements();
setTimeout(load, 1000);

function load() {
    getTime();
    msg.innerHTML = `Time now is ${hour}:${min}:${sec}`;
    if (hour <= 12 && hour >= 6)
        handleColorAndOpacityChange(2, 0, 1, morning, afternoon);
    else if (hour >= 13 && hour <= 18) 
        handleColorAndOpacityChange(0, 1, 2, afternoon, night);
    else 
        handleColorAndOpacityChange(1, 2, 0, night, morning);
}

function getElements() {
    body = window.document.getElementById("body");
    msg = window.document.getElementById("msg");
    imgs = window.document.querySelectorAll("img");
}

function getTime() {
    date = new Date();
    hour = date.getHours();
    min  = date.getMinutes();
    sec  = date.getSeconds();
}

function handleColorAndOpacityChange(indexEnd, indexFrom, indexTo, timeFrom, timeTo) {
    imgs[indexEnd].style.opacity = 0;
    td = calcdif(hour, min, sec, indexFrom);
    per = 1 - (td / (7*3600));
    imgs[indexFrom].style.opacity = 1 - per;
    imgs[indexTo].style.opacity = per;
    body.style.background = `#${rgbToHex(timeFrom.r*(1-per) + timeTo.r*per, timeFrom.g*(1-per) +
        timeTo.g*per, timeFrom.b*(1-per) + timeTo.b*per)}`;
}

function rgbToHex(R, G, B) { return toHex(R) + toHex(G) + toHex(B) }

function toHex(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) return "00";
    n = Math.max(0, Math.min(n, 255));
    return "0123456789ABCDEF".charAt((n - n % 16) / 16)
        + "0123456789ABCDEF".charAt(n % 16);
}

function calcdif(hour, min, sec, timeFrom) {
    var t = 0;
    switch (timeFrom) {
        case 0:
            t = (3600*13) - (hour*3600 + min*60 + sec);
            break;
        case 1:
            t = (3600*19) - (hour*3600 + min*60 + sec);
            break;
        case 2:
            if(hour>12)
                t = (3600*hour) - ((24-hour+5)*3600 + min*60 + sec);
            else
                t = (3600*6) - (hour*3600 + min*60 + sec);
            break;
        default:
            t = 0;
            break;
    }
    return t;
}
