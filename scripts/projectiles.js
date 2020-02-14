class projectile {
    constructor(x, y, width, height, speed, damage) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.damage = damage;
        this.dx = 0;
        this.dy = 0;
    }
    createProjectile(x, y) {
        const vx = x - this.x;
        const vy = y - this.y;
        const dist = Math.sqrt(vx * vx + vy * vy);
        this.dx = (vx / dist) * this.speed;
        this.dy = (vy / dist) * this.speed;
    }
    checkCollision(x, y, width, height) {
        x = x - width / 2;
        y = y - height / 2;
        const pX = this.x - this.width / 2;
        const pY = this.y - this.height / 2;
        if (x < pX + this.width &&
            x + width > pX &&
            y < pY + this.height &&
            y + height > pY) {
            return true;
        } else {
            return false;
        }
    }
}
function changeClass(classname) {
    rect.stats.class = classname;
    var bullet = rect.bullet;
    switch (classname) {
        case "Sniper":
            bullet.width = 5;
            bullet.height = 5;
            bullet.damage = 20;
            bullet.speed = 25;
            break;
        case "Destroyer":
            bullet.width = 25;
            bullet.height = 25;
            bullet.damage = 30;
            bullet.speed = 5;
            break;
        case "Hyperspeed":
            bullet.width = 10;
            bullet.height = 10;
            bullet.damage = 15;
            bullet.speed = 40;
            break;
        case "Tank":
            rect.width = 50;
            rect.height = 50;
            rect.stats.maxHealth = 500;
            rect.stats.health = rect.stats.maxHealth;
            break;
        case "Stormtrooper":
            bullet.width = 10;
            bullet.height = 10;
            bullet.damage = 15;
            bullet.speed = 40;
            break;
        case "Reimu":
            rect.bullet = {
                width: 10,
                height: 10,
                damage: 1,
                speed: 8,
                loops: {
                    loop1: {
                        amount: 5,
                        startX: 0,
                        offsetX: 20,
                        startY: -100,
                        offsetY: 20
                    },
                    loop2: {
                        amount: 5,
                        startX: 100,
                        offsetX: -20,
                        startY: 0,
                        offsetY: 20
                    },
                    loop3: {
                        amount: 5,
                        startX: 0,
                        offsetX: -20,
                        startY: 100,
                        offsetY: -20
                    },
                    loop4: {
                        amount: 5,
                        startX: -100,
                        offsetX: 20,
                        startY: 0,
                        offsetY: -20
                    }
                }
            }
            break;
    }
}