class cube {
    constructor(name, color, border, chatColor) {
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.width = 25;
        this.height = 25;
        this.velX = 0;
        this.velY = 0;
        this.maxVel = 5;
        this.dashing = false;
        this.name = name;
        this.chatMessage = "";
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
        this.bullet = {
            width: 10,
            height: 10,
            damage: 10,
            speed: 10,
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
        this.meta = {
            time: 0,
            joined: "",
            status: ""
        };
        this.alive = false;
    }
}