

class Player extends Component {
    constructor(id, x, y, width, height, className, kinetic) {
        super(id, x, y, width, height, className, kinetic);
        this.jumping = false;
        this.onPlatform = false;
        this.lastPlatform = null;
    }

    tick(commands) {
        this.oldx = this.x;
        this.oldy = this.y;
        let windowBottom = window.innerHeight - this.height;
        let windowRight = window.innerWidth;
        var intersectingY = false;

        if (commands.left) {
            this.x -= speed;
        }
        if (commands.right) {
            this.x += speed;
        }
        if (commands.up && !this.jumping) {
            this.vy = -jumpForce;
        }


        this.vy += gravity;
        this.y += this.vy;

        Platforms.forEach(p => {
            if (rectIntersect(this.x, this.y, this.width, this.height, p.x, p.y, p.width, p.height)) { //TODO: Still needed? 🤷‍♂️

                if (this.x + this.width > p.x && this.x < p.x + p.width &&
                    this.oldy + this.height > p.y && this.oldy < p.y + p.height) { //https://happycoding.io/tutorials/processing/collision-detection#collision-detection-with-moving-objects
                    // this.x = this.oldx;
                    if (this.oldx > this.x) {
                        this.x = p.x + this.width;
                    } else {
                        this.x = p.x - this.width;
                    }
                    // console.log("intersect X");
                }

                if (this.oldx + this.width > p.x && this.oldx < p.x + p.width &&
                    this.y + this.height > p.y && this.y < p.y + p.height) {
                    if (this.vy > 0) {
                        this.y = p.y - this.height;

                        if (this.onPlatform == false) {
                            console.log("intersecting w platform top");
                            this.lastPlatform = p;
                            this.onPlatform = true;
                        }

                    } else {
                        this.y = p.y + this.height;
                    }
                    this.vy = 0;
                    // console.log("intersect Y");
                    intersectingY = true;

                }
            }
            p.tick();
        });
        
        if (this.x < 0) { // Wall/Windows Collision || this.x + this.width > windowRight
            this.x = this.oldx;
        }
        
        this.jumping = (this.y <= windowBottom && intersectingY == false);
        if (this.y > windowBottom) { // Ground/Window Collision
            this.vy = 0;
            this.y = windowBottom;
            if (this.lastPlatform != null) {
                console.log("game over")
            }
        }

        if (this.jumping && this.vy < 0 && this.onPlatform) { // Jumping off platform FIXME: falling off platform does not onPlatform = false
            this.onPlatform = false;
            const id = "platorm_" + Platforms.length + 1;
            spawnPlatform(id, this.lastPlatform);
        }

        if (this.x > window.innerWidth / 3) { // Camera scrolling
            window.scrollTo(this.x - (window.innerWidth / 3), 0);
            document.getElementById("parallax").scrollTo(this.x - (window.innerWidth / 3), 0);
            document.body.style.width = windowRight+this.x+'px';
        }
   
        this.animate();
    }
}

function spawnPlatform(id, p) {
    Platforms.push(
        new Platform(id, p.x + 350, p.y, 100, 100, 'platform')
    );

    const index = Platforms.findIndex(x => x.id == p.id);
    Platforms[index].kinetic = false;
}

function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2) {
        return false;
    }
    return true;
}