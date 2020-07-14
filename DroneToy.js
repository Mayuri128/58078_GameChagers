let isRightMenuver = true;
let isTopMenuver = true;
let dronePosition = "East";
let droneObj;
let isActiveCanvas = false;

let canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

context.font = "35px black Arial ";
context.strokeText("Click on PLACE button to start", 10, 180);



function radiogrpfunction() {
    var checked_Pos = document.querySelector('input[type = "radio"]:checked');
    if (checked_Pos != null) {
        var whichSide = checked_Pos.value;
        switch (whichSide) {
            case "north":
                NorthbtnCLick();
                break;
            case "south":
                SouthbtnCLick();
                break;
            case "east":
                EastKeyCLick();
                break;
            case "west":
                WestKeyCLick();
                break;

        }

    }
}

function drone(x, y) {
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.v = 10;
    this.fires = [];
}

var fireSound = new Audio();
fireSound.src = "Images/fire_sound.mp3";
// fireSound.src = "https://github.com/mayuri127/Drone_Assignment/blob/master/fire_sound.mp3";


var blockSound = new Audio();
blockSound.src = "Images/block_sound.mp3";
// blockSound.src = "https://github.com/mayuri127/Drone_Assignment/blob/master/block_sound.mp3";




drone.prototype.draw = function() {

    if (dronePosition == "North") {
        this.img.src = "Images/DTN.jpg";
        // this.img.src = "https://github.com/mayuri127/Drone_Assignment/blob/master/DTN.jpg";

    } else if (dronePosition == "South") {
        this.img.src = "Images/DTS.jpg";
        // this.img.src = "https://github.com/mayuri127/Drone_Assignment/blob/master/DTS.jpg";

    } else if (dronePosition == "East") {
        this.img.src = "Images/DTR.jpg";
        // this.img.src = "https://github.com/mayuri127/Drone_Assignment/blob/master/DTR.jpg";

    } else if (dronePosition == "West") {
        this.img.src = "Images/DTL.jpg";
        // this.img.src = "https://github.com/mayuri127/Drone_Assignment/blob/master/DTL.jpg";

    }
    context.drawImage(this.img, this.x, this.y);

    for (var i = 0; i < this.fires.length; i++) {
        this.fires[i].draw();
    }
}

drone.prototype.fire = function() {
    var f = new fire(this.x, this.y);
    this.fires.push(f);
}

drone.prototype.update = function() {
    // for (var i = 0; i < this.fires.length; i++) {
    this.fires[i].update();
    //}
}

function Move() {

    if (dronePosition == "North") {
        if (checkAreaTopBottom()) {
            droneObj.y = droneObj.y - 120;
        }
    } else if (dronePosition == "South") {
        if (checkAreaTopBottom()) {
            droneObj.y = droneObj.y + 120;
        }
    } else if (dronePosition == "East") {
        if (checkAreaLeftRight()) {
            droneObj.x = droneObj.x + 120;
        }
    } else if (dronePosition == "West") {
        if (checkAreaLeftRight()) {
            droneObj.x = droneObj.x - 120;
        }
    }
}

function fire(x, y) {
    this.x = x;
    this.y = y;
    this.img = new Image();
    this.v = 5;
}

//////Beam shoot
fire.prototype.draw = function() {

    if (dronePosition == "North") {
        this.img.src = "Images/Shoot.jpg";
        // this.img.src = "https://github.com/mayuri127/Drone_Assignment/blob/master/Shoot.jpg";

        context.drawImage(this.img, this.y + 20, this.x - 60);
    } else if (dronePosition == "South") {
        this.img.src = "Images/Shoot.jpg";
        // this.img.src = "https://github.com/mayuri127/Drone_Assignment/blob/master/Shoot.jpg";

        context.drawImage(this.img, this.y + 60, this.x + 180);
    }
    if (dronePosition == "East") {
        this.img.src = "Images/Shoot.jpg";
        // this.img.src = "https://github.com/mayuri127/Drone_Assignment/blob/master/Shoot.jpg";

        context.drawImage(this.img, this.x + 220, this.y + 80);
    } else if (dronePosition == "West") {
        this.img.src = "Images/Shoot.jpg";
        // this.img.src = "https://github.com/mayuri127/Drone_Assignment/blob/master/Shoot.jpg";

        context.drawImage(this.img, this.x - 110, this.y + 60);
    }
}

fire.prototype.update = function() {
    if (isRightMenuver) {
        this.x = this.x + this.v;
    } else {
        this.x = this.x - this.v;
    }

}

function bomb(x, y) {
    this.x = 0;
    this.y = 270;
    this.img = new Image();
    this.srcx = 0;
    this.srcy = 0;
    this.sheetWidth = 251;
    this.sheetHeight = 201;
    this.cols = 5;
    this.rows = 4;
    this.width = this.sheetWidth / this.cols;
    this.height = this.sheetHeight / this.rows;
    this.currentFrame = 0;
    this.v = 10;
}


bomb.prototype.updateFrame = function() {
    this.currentFrame = ++this.currentFrame % this.cols;
    this.srcx = this.currentFrame * this.width;
    this.srcy = 3;

    context.clearRect(this.x, this.y, this.width, this.height);
}


bomb.prototype.update = function() {
    this.y = this.y + this.v;
}


bomb.prototype.draw = function() {
    this.updateFrame();
    context.drawImage(this.img, this.srcx, this.srcy, this.width, this.height, this.x, this.y, this.width, this.height);

}

// game loop
function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    droneObj.draw();
    droneObj.update();

}

//ALL Event listenet
function place() {
    isRightMenuver = true;
    var posX = document.getElementById('xposition').value;
    var posY = document.getElementById('yposition').value;

    if (posX >= 0 && posY >= 0) {
        droneObj = new drone(parseInt(posX), parseInt(posY));
        setInterval(gameLoop, 20);
        document.getElementById('canvas').removeAttribute('class');
        document.getElementById('canvas').click();
        document.getElementById('canvas').focus();

        isActiveCanvas = true;


        document.getElementById('attack').removeAttribute('disabled');
        document.getElementById('leftCLick').removeAttribute('disabled');
        document.getElementById('rightCLick').removeAttribute('disabled');
        document.getElementById('report').removeAttribute('disabled');
        document.getElementById('MoveClick').removeAttribute('disabled');
    } else {
        alert("Add valid position");
    }
}


document.addEventListener('keydown', function(event) {
    if (isActiveCanvas) {
        switch (event.keyCode) {
            case 37: //left key press
                leftKeyCLick();
                break;
            case 38: // Up Arrow (Move)
                console.log("droneObj.x + droneObj.y " + droneObj.x + "   " + droneObj.v);
                dronePosition = "South";
                isTopMenuver = true;
                if (checkAreaTopBottom()) {
                    droneObj.y = droneObj.y - droneObj.v;
                }

                break;
            case 40: // Down key press
                dronePosition = "North";
                isTopMenuver = false;
                if (checkAreaTopBottom()) {
                    droneObj.y = droneObj.y + droneObj.v;
                }
                break;

            case 39: // RIght key press
                rightKeyCLick();
                break;
            case 88: // Trigger fire.
                attack();
                break;

            case 66: // Drom bomb.
                dropBomb();
                break;
        }
    }
});

function leftKeyCLick() {
    if (dronePosition == "North") {
        WestKeyCLick();
    } else if (dronePosition == "South") {
        EastKeyCLick();
    } else if (dronePosition == "East") {
        NorthbtnCLick();
    } else if (dronePosition == "West") {
        SouthbtnCLick();
    }
}

function rightKeyCLick() {
    if (dronePosition == "North") {
        EastKeyCLick();
    } else if (dronePosition == "South") {
        WestKeyCLick();
    } else if (dronePosition == "East") {
        SouthbtnCLick();
    } else if (dronePosition == "West") {
        NorthbtnCLick();
    }

}

function NorthbtnCLick() {
    dronePosition = "North";
    isTopMenuver = true;
    isRightMenuver = false;
    droneObj.fires = [];
    if (checkAreaTopBottom()) {
        droneObj.y = droneObj.y + droneObj.v;
    }
}

function SouthbtnCLick() {
    dronePosition = "South";
    isTopMenuver = false;
    isRightMenuver = false;
    droneObj.fires = [];
    if (checkAreaTopBottom()) {
        droneObj.y = droneObj.y - droneObj.v;
    }
}

function EastKeyCLick() {
    dronePosition = "East";
    isRightMenuver = true;
    isTopMenuver = false;
    droneObj.fires = [];
    if (checkAreaLeftRight()) {
        droneObj.x = droneObj.x + droneObj.v;
    }
}

function WestKeyCLick() {
    dronePosition = "West";
    isRightMenuver = false;
    isTopMenuver = false;
    droneObj.fires = [];
    if (checkAreaLeftRight()) {
        droneObj.x = droneObj.x - droneObj.v;
    }
}

function attack() {

    droneObj.fire();
    fireSound.play();
    // Move();
}

function checkAreaLeftRight() {
    if (((droneObj.x + droneObj.v) < canvas.width) == true || !isRightMenuver) {
        if ((droneObj.x == 0 && !isRightMenuver)) {
            blockSound.play();
            return false;
        } else if (droneObj.x < 0 && droneObj.x > 420) {
            blockSound.play();
            return false;
        } else if (droneObj.x > 420 && isRightMenuver) {
            blockSound.play();
            return false;
        } else if (droneObj.x < 0 && !isRightMenuver) {
            blockSound.play();
            return false;
        } else {
            return true;
        }
    } else {
        if ((droneObj.x == 0 || droneObj.y == 0) && isRightMenuver) {
            blockSound.play();
            return false;
        } else if (droneObj.x < 0 && droneObj.x > 420) {
            blockSound.play();
            return false;
        } else {
            return true;
        }
    }
}

function checkAreaTopBottom() {
    if (droneObj.y == 0) {
        blockSound.play();
        return false;
    } else if (droneObj.y <= 0 && dronePosition == "North") {
        blockSound.play();
        return false;
    } else if (droneObj.y > 400 && dronePosition == "South") {
        blockSound.play();
        return false;
    } else return true;
}

function showReport() {

    document.getElementById('xPos').innerText = droneObj.x;
    document.getElementById('yPos').innerText = droneObj.y;
    document.getElementById('droneFace').innerText = dronePosition;

}