var morning = { r: 234, g: 250, b: 215};
var afternoon = { r: 236, g: 165, b: 77};
var night = { r: 2, g: 2, b: 68};

var StartTime = true;


function carregar() {
    var body = window.document.getElementById("body");
    var msg = window.document.getElementById("msg");
    var imgs = window.document.querySelectorAll("img");
    var data = new Date();
    var hora = data.getHours();
    var min = data.getMinutes();
    var sec = data.getSeconds();
    var td;
    var per;
    msg.innerHTML = `Time now is ${hora}:${min}:${sec}`;
    if (hora <= 12 && hora >= 6) {
        imgs[2].style.opacity = 0;
        td = calcdif(hora, min, sec, 0);
        per = 1 - (td / (7*3600));
        imgs[0].style.opacity = 1 - per;
        imgs[1].style.opacity = per;
        body.style.background = `#${rgbToHex(morning.r*(1-per) + afternoon.r*per, morning.g*(1-per) + afternoon.g*per, morning.b*(1-per) + afternoon.b*per)}`;
    } else if (hora >= 13 && hora <= 18) {
        imgs[0].style.opacity = 0;
        td = calcdif(hora, min, sec, 1);
        per = 1 - (td / (6*3600));
        imgs[1].style.opacity = 1 - per;
        imgs[2].style.opacity = per;
        body.style.background = `#${rgbToHex(afternoon.r*(1-per) + night.r*per, afternoon.g*(1-per) + night.g*per, afternoon.b*(1-per) + night.b*per)}`;
    } else {
        imgs[1].style.opacity = 0;
        td = calcdif(hora, min, sec, 2);
        per = 1 - (td / (11*3600));
        imgs[2].style.opacity = 1 - per;
        imgs[0].style.opacity = per;
        body.style.background = `#${rgbToHex(night.r*(1-per) + morning.r*per, night.g*(1-per) + morning.g*per, night.b*(1-per) + morning.b*per)}`;
    }
    setTimeout(carregar, 1000);
}

carregar();

function rgbToHex(R, G, B) { return toHex(R) + toHex(G) + toHex(B) }

function toHex(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) return "00";
    n = Math.max(0, Math.min(n, 255));
    return "0123456789ABCDEF".charAt((n - n % 16) / 16)
        + "0123456789ABCDEF".charAt(n % 16);
}

function calcdif(hora, min, sec, num) {
    var t = 0;
    switch (num) {
        case 0:
            t = (3600*13) - (hora*3600 + min*60 + sec);
            break;
        case 1:
            t = (3600*19) - (hora*3600 + min*60 + sec);
            break;
        case 2:
            if(hora>12)
                t = (3600*hora) - ((24-hora+5)*3600 + min*60 + sec);
            else
                t = (3600*6) - (hora*3600 + min*60 + sec);
            break;
        default:
            t = 0;
            break;
    }
    return t;
}