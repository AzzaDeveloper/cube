class cube {
    constructor(name, color, border, chatColor) {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.width = 25;
        this.height = 25;
        this.name = name
        this.chatMessage = "";
        this.dashing = false;
        this.bullets = [];
        this.stats = {
            class: "Default",
            maxHealth: 100,
            health: 100,
        };
        this.color = {
            cube: color,
            border: border,
            chatColor: chatColor
        };
        this.meta = {
            time: 0,
            joined: "",
            status: ""
        };
        this.alive = false;
    }
}
var physicsInfo = {
    velX: 0,
    velY: 0,
    maxVel: 5,
    dashSpeed: 25
}
var bulletInfo = {
    width: 10,
    height: 10,
    damage: 15,
    speed: 10,
    rate: 0.33,
    lifetime: 3,
    type: "default",
    loops: {
        loop1: {
            amount: 1,
            startX: 0,
            offsetX: 0,
            startY: 0,
            offsetY: 0
        }
    }
}