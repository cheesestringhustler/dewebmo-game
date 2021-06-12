function spawnPlatform(id, p) {
    const offsetLeft = getRandomInt(300, 500);
    const offsetTop = getRandomInt(-10, 50);
    
    //TODO: check if new position is to high or too low

    Platforms.push(
        new Platform(id, p.x + offsetLeft, p.y - offsetTop, 200, 200, 'platform', true, ['thwomp_1.png', 'thwomp_2.png', 'thwomp_3.png', 'thwomp_4.png', 'thwomp_5.png', 'thwomp_6.png'])
    );
    // const index = p.getIndex();
    // Platforms[index].kinetic = false;
}

function spawnCloud(offset) {
    const offsetLeft = getRandomInt(10, 200);
    const offsetTop = getRandomInt(10, 150);
    const speed = getRandomArbitrary(1, 2) * 12;
    const size = getRandomInt(80, 120);

    var clds = document.getElementById("clouds");
    var cld = document.getElementById("cloud_0");
    var cln = cld.cloneNode(true);
    cln.id = "cloud_"+clds.childElementCount;
    cln.style.height = size + "px";
    cln.style.marginLeft = offset + offsetLeft + "px";
    cln.style.top = offsetTop + "px";

    clds.appendChild(cln);
}

function spawnMountain(offset) {
    var mtns = document.getElementById("mountains");
    var mtn = document.getElementById("mountain_0");
    var cln = mtn.cloneNode(true);
    cln.id = "mountain_"+mtns.childElementCount;
    cln.style.marginLeft = offset + "px";
    mtns.appendChild(cln);
}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}