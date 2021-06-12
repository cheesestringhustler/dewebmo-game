class Platform extends Component {
    constructor(id, x, y, width, height, className, kinetic) {
        super(id, x, y, width, height, className, kinetic);
    }

    tick() {
        this.oldx = this.x;
        this.oldy = this.y;
        let windowBottom = window.innerHeight - this.height + 1000;

        if (!this.kinetic) {
            this.vy += gravity;
            this.y += this.vy;

        }
        
        if (this.y > windowBottom) { // Ground/Window Collision
            // const index = Platforms.findIndex(x => x.id == this.id);
            // Platforms = Platforms.splice(0, 1);
            this.vy = 0;
            this.y = windowBottom;
            //TODO remove once out of view
        }

        this.animate();
    }
}
