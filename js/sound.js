const jumpAudio = new Audio('/sounds/jump.wav');
const walkAudio = new Audio('/sounds/walk.wav');
const thwompAudio = new Audio('/sounds/thwomp.mp3');
const deathAudio = new Audio('/sounds/death.mov');

function playAudio(name) {
    if (name === 'jump') {
        jumpAudio.play();
    } else if (name === 'walk') {
        walkAudio.play();
    } else if (name === 'thwomp') {
        thwompAudio.play();
    } else if (name === 'dead') {
        deathAudio.play();
    }
}