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
        div.style.backgroundRepeat = 'no-repeat';
        div.style.backgroundSize = 'contain';
        this.elem = div;
        div.id = id;
        if (className != null) {
            div.classList.add(className);
        }
        div.style.width = width;
        div.style.height = height;
        this.kinetic = kinetic;
        if (kinetic) {
            // div.style.left = x;
            // div.style.top = y;
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

    getImgHTML(src, style) {
        return '<img src="' + src + '" style="'+style+'" height="100%" width="100%"/>'
    }

    waitforme(milisec) {
        return new Promise(resolve => {
            setTimeout(() => { resolve('') }, milisec);
        })
    }

    rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
            return false;
        }
        return true;
    }

    spawnPlatform(id, p) {
        Platforms.push(
            new Platform(id, p.x + 350, p.y, 100, 100, 'platform')
        );
        // const index = p.getIndex();
        // Platforms[index].kinetic = false;
    }
}
