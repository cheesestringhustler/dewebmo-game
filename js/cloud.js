function spawnCloud(offset) {
    const offsetLeft = getRandomInt(10, 200);
    const offsetTop = getRandomInt(10, 150);
    const speed = getRandomArbitrary(1, 2) * 12;
    const size = getRandomInt(80, 120);

    var clds = document.getElementById("clouds");
    var cld = document.getElementById("cloud_1");
    var cln = cld.cloneNode(true);
    cln.style.height = size + "px";
    cln.style.marginLeft = offset + offsetLeft + "px";
    cln.style.top = offsetTop + "px";

    clds.appendChild(cln);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}