const jumpAudio = new Audio('/sounds/jump.wav');
const walkAudio = new Audio('/sounds/walk.wav');
const thwompAudio = new Audio('/sounds/thwomp.mp3');
const deathAudio = new Audio('/sounds/death.mov');

walkAudio.volume = 0.1;
thwompAudio.volume = 0.1;
deathAudio.volume = 0.1;
jumpAudio.volume = 0.1;

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