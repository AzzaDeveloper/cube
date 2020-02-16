class projectile {
    constructor(x, y, width, height, speed, damage, type, lifetime) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.damage = damage;
        this.type = type;
        this.lifetime = lifetime;
        this.date = Date.now();
        this.dx = 0;
        this.dy = 0;
    }
    // Generate velocity relative to the mouse
    createProjectile(x, y) {
        const vx = x - this.x;
        const vy = y - this.y;
        const dist = Math.sqrt(vx * vx + vy * vy);
        this.dx = (vx / dist) * this.speed;
        this.dy = (vy / dist) * this.speed;
        // Push to the array
        rect.bullets.push(this);
    }
    /// shhh. its magic.
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