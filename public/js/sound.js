const jumpAudio = new Audio('/sounds/jump.wav');
const walkAudio = new Audio('/sounds/walk.wav');
const thwompAudio = new Audio('/sounds/thwomp.mp3');
const deathAudio = new Audio('/sounds/death.mov');

function playAudio(name) {
    if (name === 'jump') {
        jumpAudio.volume = 0.1;
        jumpAudio.play();
    } else if (name === 'walk') {
        walkAudio.volume = 0.3;
        walkAudio.play();
    } else if (name === 'thwomp') {
        thwompAudio.volume = 0.05;
        thwompAudio.play();
    } else if (name === 'dead') {
        deathAudio.volume = 0.2;
        deathAudio.play();
    }
}