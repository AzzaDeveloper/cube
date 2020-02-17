function changeClass(classname) {
    color();
    rect.stats.class = classname;
    bulletInfo = {
        width: 10,
        height: 10,
        damage: 15,
        speed: 10,
        friction: 0.9,
        rate: 0.33,
        lifetime: 3,
        info: `
        <i>Good ol' reliable.</i><br>
        Decent bullet size, speed, and damage.`,
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
    var bullet = bulletInfo;
    switch (classname) {
        case "Default":
            bullet.info = `
                <i>Good ol' reliable.</i><br>
                Decent bullet size, speed, and damage.`
            break;
        case "Sniper":
            bullet.width = 5;
            bullet.height = 5;
            bullet.damage = 20;
            bullet.speed = 25;
            bullet.friction = 1;
            bullet.rate = 1;
            bullet.lifetime = 5;
            bullet.info = `
            <i>I think this one explains for itself.<br></i>
            High speed and damage in exchange for a slow fire rate.<br>
            Zero friction.`
            break;
        case "Destroyer":
            bullet.width = 25;
            bullet.height = 25;
            bullet.damage = 50;
            bullet.speed = 30;
            bullet.friction = 0.9
            bullet.rate = 2;
            bullet.lifetime = 5;
            bullet.info = `
            <i>They'll never see it coming!<br></i>
            High speed, incredible damage but very slow fire rate.<br>
            Bullet starts out fast, but slow down pretty quickly.<br>`
            break;
        case "Hyperspeed":
            bullet.width = 10;
            bullet.height = 10;
            bullet.damage = 15;
            bullet.speed = 50;
            bullet.friction = 1;
            bullet.rate = 1;
            bullet.lifetime = 2;
            bullet.info = `
            <i>Zoooooooom<br></i>
            Average damage with low fire rate.<br>
            Your bullet travels faster than the speed of light.`
            break;
        case "Tank":
            rect.width = 50;
            rect.height = 50;
            rect.stats.maxHealth = 500;
            rect.stats.health = rect.stats.maxHealth;
            bullet.info = `
            <i>Suprisingly mobile for something this bulky.<br></i>
            You have a lot of health, but is twice as big.`
            break;
        case "Dasher":
            bullet.width = 10;
            bullet.height = 10;
            bullet.damage = 20;
            bullet.speed = 20;
            bullet.rate = 0.8;
            bullet.lifetime = 2;
            bullet.friction = 1;
            rect.maxVel = 8;
            physicsInfo.dashSpeed = 100;
            bullet.info = `
            <i>Where are you shooting? I'm not there anymore.</i><br>
            Your speed is slightly higher.<br>
            Doubled dash speed.<br>`
            break;
        case "Reimu":
            bullet.width = 10;
            bullet.height = 10;
            bullet.damage = 1.2;
            bullet.speed = 8;
            bullet.rate = 3;
            bullet.friction = 1;
            bullet.lifetime = 5;
            bullet.type = "homing";
            bullet.info = `
            <i>Hey, the name sounds weirdly familiar...<br></i>
            Low fire rate.<br>
            Shoot 12 homing bullets at once, but deals very low damage.`;
            bullet.loops = {
                loop1: {
                    amount: 3,
                    startX: 0,
                    offsetX: 50,
                    startY: -150,
                    offsetY: 50
                },
                loop2: {
                    amount: 3,
                    startX: 150,
                    offsetX: -50,
                    startY: 0,
                    offsetY: 50
                },
                loop3: {
                    amount: 3,
                    startX: 0,
                    offsetX: -50,
                    startY: 150,
                    offsetY: -50
                },
                loop4: {
                    amount: 3,
                    startX: -150,
                    offsetX: 50,
                    startY: 0,
                    offsetY: -50
                }
            }
            break;
        case "Octopath":
            bullet.width = 10;
            bullet.height = 10;
            bullet.damage = 5;
            bullet.speed = 10;
            bullet.rate = 1.5;
            bullet.friction = 0.1;
            bullet.lifetime = 2;
            bullet.info = `
            <i>But can you dodge THIS?</i><br>
            Low damage and bullet lifetime.<br>
            Shoot 25 bullets in all directions at once.`
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
            break
        case "B-52":
            bullet.width = 12;
            bullet.height = 12;
            bullet.damage = 10;
            bullet.speed = 10;
            bullet.rate = 2;
            bullet.friction = 0.8;
            bullet.lifetime = 2;
            bullet.info = `
            <i>Why are the trees talking?</i><br>
            High damage with a low fire rate.<br>
            Shoot bullets in a straight line.`
            bullet.loops = {
                loop1: {
                    amount: 10,
                    startX: -250,
                    offsetX: 50,
                    startY: 0,
                    offsetY: 0
                }
            }
            break;
    }
    document.getElementById("classInfo").innerHTML = bullet.info;
}