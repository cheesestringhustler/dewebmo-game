class Platform extends Component {
    constructor(id, x, y, width, height, className, kinetic) {
        super(id, x, y, width, height, className, kinetic);
        this.currentSprite = 0;
        this.spritePath = "images/objects/";
        this.sprites = ['thwomp_1.png', 'thwomp_2.png', 'thwomp_3.png', 'thwomp_4.png', 'thwomp_5.png', 'thwomp_6.png'];
        this.elem.innerHTML = this.getImgHTML(this.spritePath + this.sprites[0]);
    }

    async fallAni() {
        for (let i = 1; i < 5; i++) {
            this.elem.innerHTML = this.getImgHTML(this.spritePath + this.sprites[i]);
            await this.waitforme(2000/5);
        }
        await this.waitforme(500);
        this.kinetic = false;
    }

    getIndex() {
        return Platforms.findIndex(x => x.id == this.id);
    }

    tick() {
        this.oldx = this.x;
        this.oldy = this.y;
        let windowBottom = window.innerHeight - this.height + 1000;

        if (!this.kinetic) {
            this.elem.innerHTML = this.getImgHTML(this.spritePath + this.sprites[5]);
            this.vy += gravity;
            this.y += this.vy;
        }

        if (this.y > windowBottom) { // Ground/Window Collision
            this.vy = 0;
            this.y = windowBottom;
            //TODO remove once out of view
            // Platforms = Platforms.splice(this.getIndex(), 1);
        }



        this.animate();
    }
}
