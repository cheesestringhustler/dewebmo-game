class Player extends Component {
    constructor(id, x, y, width, height, className, kinetic) {
        super(id, x, y, width, height, className, kinetic);
        this.jumping = false;
        this.onPlatform = false;
        this.lastPlatform = null;
        this.currentSprite = 0;
        this.spritesWalk = ['images/player/Player_walk1.png', 'images/player/Player_walk2.png', 'images/player/Player_walk3.png'];
        this.spritesDeath = ['images/player/Player_hit1.png', 'images/player/Player_hit2.png', 'images/player/Player_hit3.png'];
        this.direction = 1;
    }

    async deathAni() {
        for (let i = 0; i < 3; i++) {
            this.elem.innerHTML = this.getImgHTML(this.spritesDeath[i]);
            await this.waitforme(350);
        }
    }
    
    tick(commands) {
        this.oldx = this.x;
        this.oldy = this.y;
        let windowBottom = window.innerHeight - this.height;
        let windowRight = window.innerWidth;
        var intersectingY = false;

        // Act on Commands
        if (!gameOver) {
            if (commands.left) {
                this.x -= speed;
                this.direction = -1;
            }
            if (commands.right) {
                this.x += speed;
                this.direction = 1;
            }
            if (commands.up && !this.jumping) {
                this.vy = -jumpForce;
            }


            this.vy += gravity;
            this.y += this.vy;
        }

        // Platforms Collision Detection
        Platforms.forEach(p => {
            //TODO: check still needed? 🤷‍♂️
            if (this.rectIntersect(this.x, this.y, this.width, this.height, p.x, p.y, p.width, p.height)) {

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
                            Platforms[p.getIndex()].fallAni();
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

        if (!gameOver) {
            // Wall/Windows Collision || this.x + this.width > windowRight
            if (this.x < 0) {
                this.x = this.oldx;
            }

            // Ground/Window Collision
            this.jumping = (this.y <= windowBottom && intersectingY == false);
            if (this.y > windowBottom) {
                this.vy = 0;
                this.y = windowBottom;
                if (this.lastPlatform != null) {
                    // console.log("game over")
                    gameOver = true;
                    this.deathAni();
                }
            }

            // Jumping off platform FIXME: falling off platform does not onPlatform = false
            if (this.jumping && this.vy < 0 && this.onPlatform) {
                this.onPlatform = false;
                const id = "platorm_" + Platforms.length + 1;
                this.spawnPlatform(id, this.lastPlatform);
            }

            // Camera scrolling
            if (this.x > window.innerWidth / 3) {
                window.scrollTo(this.x - (window.innerWidth / 3), 0);
                document.getElementById("parallax").scrollTo(this.x - (window.innerWidth / 3), 0);
                document.body.style.width = windowRight + this.x + 'px';
            }

            //Sprite Animation
            if (this.oldx != this.x) {
                if (!this.jumping) {
                    if (this.currentSprite < this.spritesWalk.length - 1) {
                        this.currentSprite++;
                    } else {
                        this.currentSprite = 0;
                    }
                } else {
                    this.currentSprite = 0;
                }
            }
            this.elem.innerHTML = this.getImgHTML(this.spritesWalk[this.currentSprite], 'transform: scaleX(' + this.direction + ')');
        }

        this.animate();
    }
}