const speed = 6;
const gravity = 1.0;
const jumpForce = 25;

const fps = 60;
const ms = 1000 / fps;

let gameOver = false;

const player = new Player('player', 10, 900, 100, 100, null, false);

let Platforms = [
    new Platform('platform1', 200, window.innerHeight - 200, 100, 100, 'platform')
];

// document.body.style.width = '2000px';

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

window.addEventListener("wheel", e => e.preventDefault(), { passive:false })