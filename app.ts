class BreakoutGame {
    private ball : any;
    private bricks: any;
    private paddle: any;
    private newBrick : any;
    private brickInfo: any;
    game: Phaser.Game;

    constructor() {
        var gameConfig = {
            preload: this.preload,
            create: this.create,
            update: this.update
        }

        this.game = new Phaser.Game(480, 320, Phaser.AUTO, null, gameConfig);
    }


    preload() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.stage.backgroundColor = '#eee';
        this.game.load.image('ball', 'img/ball.png');
        this.game.load.image('paddle', 'img/paddle.png');
        this.game.load.image('brick', 'img/brick.png');
    }

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.paddle = this.game.add.sprite(this.game.world.width * 0.5, this.game.world.height - 5, 'paddle');
        this.ball = this.game.add.sprite(this.game.world.width * 0.5, this.game.world.height - 25, 'ball');
        this.ball.anchor.set(0.5);
        this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.paddle, Phaser.Physics.ARCADE);
        this.game.physics.arcade.checkCollision.down = false;
        this.ball.checkWorldBounds = true;
        this.ball.events.onOutOfBounds.add(function () {
            alert('Game over!');
            location.reload();
        }, this);
        this.ball.body.collideWorldBounds = true;
        this.ball.body.velocity.set(150, 150);
        this.ball.body.bounce.set(1);
        this.paddle.anchor.set(0.5, 1);
        this.paddle.body.immovable = true;
        this.brickInfo = {
            width: 50,
            height: 20,
            count: {
                row: 3,
                col: 7
            },
            offset: {
                top: 50,
                left: 60
            },
            padding: 10
        }
        this.bricks = this.game.add.group();
        for (var c = 0; c < this.brickInfo.count.col; c++) {
            for (var r = 0; r < this.brickInfo.count.row; r++) {
                // create new brick and add it to the group
                var brickX = (c * (this.brickInfo.width + this.brickInfo.padding)) + this.brickInfo.offset.left;
                var brickY = (r * (this.brickInfo.height + this.brickInfo.padding)) + this.brickInfo.offset.top;
                var newBrick = this.game.add.sprite(brickX, brickY, 'brick');
                this.game.physics.enable(newBrick, Phaser.Physics.ARCADE);
                newBrick.body.immovable = true;
                newBrick.anchor.set(0.5);
                this.bricks.add(newBrick);
            }
        }
    }

   
    update() {
        this.game.physics.arcade.collide(this.ball, this.paddle);
        this.game.physics.arcade.collide(this.ball, this.bricks, (ball: any, brick: any): void => {
            brick.kill();
        });
        this.paddle.x = this.game.input.x;
    }

}

window.onload = () => {

    var game = new BreakoutGame();

};