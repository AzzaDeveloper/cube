function changeClass(classname) {
    rect.stats.class = classname;
    var bullet = bulletInfo;
    switch (classname) {
        case "Sniper":
            bullet.width = 5;
            bullet.height = 5;
            bullet.damage = 20;
            bullet.speed = 25;
            bullet.rate = 1.2;
            bullet.lifetime = 5;
            break;
        case "Destroyer":
            bullet.width = 25;
            bullet.height = 25;
            bullet.damage = 30;
            bullet.speed = 5;
            bullet.rate = 4;
            bullet.lifetime = 5;
            break;
        case "Hyperspeed":
            bullet.width = 10;
            bullet.height = 10;
            bullet.damage = 15;
            bullet.speed = 40;
            bullet.rate = 1.5;
            bullet.lifetime = 2;
            break;
        case "Tank":
            rect.width = 50;
            rect.height = 50;
            rect.stats.maxHealth = 500;
            rect.stats.health = rect.stats.maxHealth;
            break;
        case "Reimu":
            bullet.width = 10;
            bullet.height = 10;
            bullet.damage = 1.2;
            bullet.speed = 10;
            bullet.rate = 3;
            bullet.lifetime = 5;
            bullet.type = "homing";
            bullet.loops = {
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
            break;
        case "Octopath":
            bullet.width = 10;
            bullet.height = 10;
            bullet.damage = 5;
            bullet.speed = 10;
            bullet.rate = 1;
            bullet.lifetime = 2;
            bullet.loops = {
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
}