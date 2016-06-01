var canvasWidth = 400;
var canvasHeight = 600;

var canvas = document.getElementById("canvas1");
var context = canvas.getContext("2d");
canvas.width = canvasWidth;
canvas.height = canvasHeight;

var heroWidth = 66;
var heroHeight = 82;
var heroSpeed = 20;
var heroIsDie = false;

var heroImgs = new Image();
heroImgs.src = "img/herofly.png";
var index = 0;

function createNewEnemy() {
	var x = randFn(0, canvas.width - enemyWidth1);
	var y = randFn(-100, -40);
	var ene = enemys[enemys.length - 1];
	var spaceY = randFn(30, 79);
	var y = ene.y - spaceY;

	createRandomEnemy(x, y);
}

var heroClass = function(x, y, heroW, heroH, src, Speed) {
	this.x = x;
	this.y = y;
	this.heroW = heroW;
	this.heroH = heroH;
	this.src = src;
	this.img = heroImgs;
	this.startX = 0;
	this.bulletType = 1;
	//	移动的方法
	this.move = function(direction) {
		switch (direction) {
			case "左":
				this.x -= Speed;
				console.log("ddd")
				if (this.x <= 0) {
					this.x = 0;
					heroIsDie = true;

				}
				break;
			case "上":
				this.y -= Speed;
				if (this.y <= 0) {
					this.y = 0;
					heroIsDie = true;

				}
				break;
			case "右":
				this.x += Speed;
				if (this.x >= canvas.width - heroW) {
					this.x = canvas.width - heroW;
					heroIsDie = true;
				}

				break;
			case "下":
				this.y += Speed;
				if (this.y >= canvas.height - heroH) {
					this.y = canvas.height - heroH;
					heroIsDie = true;

				}
				break;

			default:
				break;
		}

		//		var startXpoint = heroIsDie ? (heroW * 4) : (heroW * index);
		//		context.clearRect(0, 0, canvas.width, canvas.height);
		//		context.drawImage(this.img, startXpoint, 0, heroW, heroH, this.x, this.y, heroW, heroH)
	}

	//		飞机打子弹的方法
	this.fire = function() {

		}
		//		飞机死的方法
	this.die = function() {
			//	this很enemy的碰撞情况
			for (var i = 0; i < enemys.length; i++) {
				var result = false;
				var plane = this;
				var children = enemys[i];
				var aa = plane.y <= (children.y + children.height * 0.9);
				var bb = (plane.y + plane.heroH * 0.8) > children.y;
				var cc = (plane.x + plane.heroW * 0.8) > children.x;
				var dd = plane.x <= (children.x + children.width * 0.9)
				if (aa && bb && cc && dd) {
					//					console.log("死了")
					if (children.width == 39) {
						hero.bulletType = 2;
						var index = findIndexForEnemy(children);
						enemys.splice(index, 1);
						createNewEnemy();

					} else {

					}
				}
			}
		}
		//		创建飞机方法
	this.draw = function() {

		if (this.startX == 0) {
			this.startX = heroWidth;
		} else if (this.startX = heroWidth) {
			this.startX = 0
		}
		context.drawImage(this.img, this.startX, 0, heroWidth, heroHeight, this.x, this.y, heroWidth, heroHeight);

	}
}

var heroX = canvas.width * 0.5 - heroWidth * 0.5;
var heroY = canvas.height - heroHeight;
var hero = new heroClass(heroX, heroY, heroWidth, heroHeight, "img/herofly.png", heroSpeed);

var bulletClass = function(x, y, width, height, img, speed) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.img = img;
		this.speed = speed;
		this.moveUp = function() {
			//		定义一个变量
			//		用来标记子弹能不能碰到飞机

			this.y -= this.speed;
			if (this.y + this.height <= 10) {
				var index = findIndexForBullet(bullets);
				bullets.splice(index, 1);
			}
			checkIsConflict(this);
			this.draw();
		}
		this.draw = function() {
			context.drawImage(this.img, this.x, this.y, this.width, this.height)
		}
	}
	// 检测和小飞机的碰撞情况

function checkIsConflict(bullet) {
	for (var i = 0; i < enemys.length; i++) {
		//		检测子弹是否碰撞
		if (isConflict(bullet, enemys[i])) {
			//				子弹从数组中移除
			//			算出当前子弹的下标

			//			飞机从数组中移除
			console.log(enemys[i].width)
			if (enemys[i].width == 39) {

			} else {
				enemys[i].IsConflict = true;
				var index = findIndexForBullet(bullet);
				bullets.splice(index, 1);
				break;
			}

		}

	}
}

//	根据子弹求下标方法
function findIndexForBullet(b) {
	var myIndex = 0;
	for (var i = 0; i < bullets.length; i++) {
		if (bullets[i] == b) {
			myIndex = i;
		}
	}
	return myIndex;
}

function findIndexForEnemy(b) {
	var myIndex = 0;
	for (var j = 0; j < enemys.length; j++) {
		if (enemys[j] == b) {
			myIndex = j;
		}
	}
	return myIndex;
}

function isConflict(a, b) {
	if (a.y <= b.y + b.height && a.x + a.width >= b.x && a.x <= b.x + b.width) {
		console.log("xxxxx");
		return true;
	} else {
		return false;
	}
}

//敌机对象

var enemyClass = function(x, y, width, height, img, speed) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.img = img;
		this.IsConflict = false;
		this.startX = 0;
		//	落下的方法
		this.down = function() {
			this.y += speed;

			if (this.y >= canvas.height + 200) {
				//	移除数组中的第一个元素
				enemys.shift();
				console.log(canvas.height)
					//移除数组中的最后一个元素
					//			enemys.pop();
					//		创造一个新的数组
				createNewEnemy();
			}
			this.draw();
		}

		//		创建飞机方法
		this.draw = function() {

			if (this.IsConflict == false) {
				this.startX = 0;
			} else {
				this.startX += this.width;
				console.log(this.IsConflict)
				if (this.startX == this.width * 5) {
					var enemyIndex = 0;
					for (var j = 0; j < enemys.length; j++) {
						if (enemys[j] == this) {
							enemyIndex = j;
							break;
						}
					}
					enemys.splice(enemyIndex, 1);
					createNewEnemy();
				}
			};

			console.log(this.startX)

			context.drawImage(this.img, this.startX, 0, this.width, this.height, this.x, this.y, this.width, this.height);
		}
	}
	// 移除再创方法
	//创建一个飞机

var enemyWidth1 = 40;
var enemyHeight1 = 34;
var enemyImage1 = new Image();
enemyImage1.src = "img/enemy1.png";
var enemySpeed1 = 5;

var enemyWidth2 = 110;
var enemyHeight2 = 164;
var enemyImage2 = new Image();
enemyImage2.src = "img/enemy2.png";
var enemySpeed2 = 2;

var enemyWidth3 = 46;
var enemyHeight3 = 64;
var enemyImage3 = new Image();
enemyImage3.src = "img/enemy3.png";
var enemySpeed3 = 5;

var propWidth = 39;
var propHeight = 68;
var propImage = new Image();
propImage.src = "img/prop.png";
var propSpeed = 5;

document.onkeydown = function() {
	switch (event.keyCode) {
		case 37:
			//		左
			hero.move("左");
			break;
		case 38:
			hero.move("上");

			//		上
			break;
		case 39:
			hero.move("右");

			//		右
			break;
		case 40:
			hero.move("下");

			//		下
			break;

		default:
			break;
	}
}

var bg1 = new Image();
bg1.src = "img/background.png";
var bg2 = new Image();
bg2.src = "img/background.png";
var bgSpeed = 10;
var backgClass = function(y1, y2, b1, b2, bSpeed) {
	this.y1 = y1;
	this.y2 = y2;
	this.b1 = b1;
	this.b2 = b2;
	this.moveUp = function() {
		this.y1 += bSpeed;
		this.y2 += bSpeed;
		if (this.y1 >= canvas.height) {
			this.y1 = canvas.height * -1;
		}
		if (this.y2 >= canvas.height) {
			this.y2 = canvas.height * -1;
		}
		this.draw();
	}
	this.draw = function() {
		context.drawImage(this.b1, 0, this.y1, canvas.width, canvas.height);
		context.drawImage(this.b2, 0, this.y2, canvas.width, canvas.height);
	}
}
var background = new backgClass(0, -canvas.height, bg1, bg2, bgSpeed);

function randFn(min, max) {
	return parseInt(Math.random() * (max - min) + min);
}

var enemys = [];
for (var i = 0; i < 20; i++) {

	var x = 0;
	var Yjianju = randFn(40, 100);
	var y = 0;
	if (i == 0) {
		y = -100;

	}
	if (i > 0) {
		y = enemys[i - 1].y - Yjianju
	}
	createRandomEnemy(x, y);
}

function createRandomEnemy(x, y) {
	var enemyType = randFn(1, 100);
	if (enemyType >= 1 && enemyType <= 45) {
		x = randFn(0, canvasWidth - enemyWidth1);
		console.log("creat")
			//		第一类飞机
		enemys.push(new enemyClass(x, y, enemyWidth1, enemyHeight1, enemyImage1, enemySpeed1));

	} else if (enemyType >= 45 && enemyType < 60) {
		x = randFn(0, canvasWidth - enemyWidth2);

		//			第二类飞机
		enemys.push(new enemyClass(x, y, enemyWidth2, enemyHeight2, enemyImage2, enemySpeed2));

	} else if (enemyType >= 60 && enemyType <= 90) {
		x = randFn(0, canvasWidth - enemyWidth3);

		//				第三类飞机
		enemys.push(new enemyClass(x, y, enemyWidth3, enemyHeight3, enemyImage3, enemySpeed3));

	} else if (enemyType > 90) {
		x = randFn(0, canvasWidth - propWidth);
		enemys.push(new enemyClass(x, y, propWidth, propHeight, propImage, propSpeed));

	}
}

setInterval(function() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	background.moveUp();
	for (var i = 0; i < enemys.length; i++) {
		enemys[i].down();
	}

	hero.draw();
	hero.die();
	for (var i = 0; i < bullets.length; i++) {
		bullets[i].moveUp();
	}

}, 50)

//创建子弹的定时器
var bulletImg1 = new Image();
bulletImg1.src = "img/bullet1.png";
var bulletWidth1 = 6;
var bulletHeight1 = 14;
var bulletSpeed1 = 10;
var bulletX1 = hero.x + heroWidth / 2 - bulletWidth1 / 2;
var bulletY1 = hero.y - bulletHeight1;

var bulletImg2 = new Image();
bulletImg2.src = "img/bullet2.png";
var bulletWidth2 = 48;
var bulletHeight2 = 14;
var bulletSpeed2 = 15;
var bulletX2 = hero.x + heroWidth / 2 - bulletWidth2 / 2;
var bulletY2 = hero.y - bulletHeight2;

var bullets = [];
setInterval(function() {
	if (hero.bulletType == 1) {
		var bulletX1 = hero.x + heroWidth / 2 - bulletWidth1 / 2;
		var bulletY1 = hero.y - bulletHeight1;
		var bullet1 = new bulletClass(bulletX1, bulletY1, bulletWidth1, bulletHeight1, bulletImg1, bulletSpeed1);
		bullets.push(bullet1)
	}
	if (hero.bulletType == 2) {
		var bulletX2 = hero.x + heroWidth / 2 - bulletWidth2 / 2;
		var bulletY2 = hero.y - bulletHeight2;
		var bullet2 = new bulletClass(bulletX2, bulletY2, bulletWidth2, bulletHeight2, bulletImg2, bulletSpeed2);
		bullets.push(bullet2)
	}

}, 200);

var time = 0;
setInterval(function() {
	if (hero.bulletType == 2) {
		time++;
		if (time >= 40) {
			hero.bulletType = 1;
			time = 0
		}
	}
}, 200)