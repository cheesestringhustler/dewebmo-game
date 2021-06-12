const fps = 60;
const ms = 1000 / fps;

class Component {
    constructor(id, x = 0, y = 0, width, height, className = null, kinetic = true) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.oldx = this.x;
        this.oldy = this.y;
        let div = document.createElement('div');
        this.elem = div;
        div.id = id;
        if (className != null) {
            div.classList.add(className);
        }
        div.style.width = width;
        div.style.height = height;
        if (kinetic) {
            div.style.left = x;
            div.style.top = y;
        }
        document.getElementById("body").appendChild(div);
        this.height = height;
        this.width = width;
        this.anim = this.elem.animate(null, { duration: ms });
    }

    animate() {
        let keyframes = [
            { transform: 'translate(' + this.oldx + 'px, ' + this.oldy + 'px)' },
            { transform: 'translate(' + this.x + 'px, ' + this.y + 'px)' },
        ]

        this.anim.effect.setKeyframes(keyframes)
        this.anim.play();
    }

}
