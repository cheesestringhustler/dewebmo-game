const speed = 6;
const gravity = 1.0;
const jumpForce = 25;

const fps = 60;
const ms = 1000 / fps;

let gameOver = false;

const platformSprites = ['thwomp_1.png', 'thwomp_2.png', 'thwomp_3.png', 'thwomp_4.png', 'thwomp_5.png', 'thwomp_6.png'];

const player = new Player('player', 10, window.innerHeight - 300, 80, 150, null, false);

let Floors = [
    new Platform('platform_floor', 0, window.innerHeight - 50, 300, 50, 'floor', true, ['floor.png']),
];

let Platforms = [
    new Platform('platform_0', 500, window.innerHeight - 250, 200, 200, 'platform', true, platformSprites)
];

for (let i = 1; i < 4; i++) {
    Platforms.push(
        new Platform('platform_' + (i + 1), 500 + (500 * i), window.innerHeight - 250, 200, 200, 'platform', true, platformSprites)
    );
}

player.anim.onfinish = () => {
    //Player Movement
    player.tick(commands);
};

const commands = {
    left: false,
    right: false,
    up: false,
};

window.addEventListener('down', onkeydown, false);
window.addEventListener('up', onkeyup, false);

onkeydown = onkeyup = (e) => {
    let key = e.code;
    let keydown = (e.type === 'keydown');
    let keyup = (e.type === 'keyup');
    if (key === 'KeyA') commands.left = keydown ? true : keyup ? false : commands.left;
    if (key === 'KeyD') commands.right = keydown ? true : keyup ? false : commands.right;
    if (key === 'KeyW') commands.up = keydown ? true : keyup ? false : commands.up;
};

// window.addEventListener("wheel", (e) => e.preventDefault(), { passive:false });
