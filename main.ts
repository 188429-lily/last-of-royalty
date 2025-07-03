namespace SpriteKind {
    export const helper = SpriteKind.create()
}
function StartNextLevel () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.destroy()
    }
    currentLevel += 1
    if (currentLevel == 1) {
        tiles.setTilemap(tilemap`platformer1`)
    } else if (currentLevel == 2) {
        tiles.setTilemap(tilemap`level3`)
    } else if (currentLevel == 3) {
        tiles.setTilemap(tilemap`level1`)
    } else if (currentLevel == 4) {
        tiles.setTilemap(tilemap`level6`)
    } else {
        game.over(true, effects.confetti)
    }
    tiles.placeOnRandomTile(mySprite, assets.tile`tile3`)
    for (let value of tiles.getTilesByType(assets.tile`tile5`)) {
        myEnemy = sprites.create(img`
            ........................
            ......ffff..............
            ....fff22fff............
            ...fff2222fff...........
            ..fffeeeeeefff..........
            ..ffe222222eef..........
            ..fe2ffffff2ef..........
            ..ffffeeeeffff..........
            .ffefbf44fbfeff.........
            .fee41fddf14eef.........
            fdfeeddddd4eff..........
            fbffee444edd4e..........
            fbf4f2222edde...........
            fcf.f22cccee............
            .ff.f44cdc4f............
            ....fffddcff............
            .....fddcff.............
            ....cddc................
            ....cdc.................
            ....cc..................
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.Enemy)
        tiles.placeOnTile(myEnemy, value)
        myEnemy.follow(mySprite, 30)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile9`)) {
        myhelper = sprites.create(img`
            . . . . . b b b b b b . . . . . 
            . . . b b 4 2 2 2 2 2 b b . . . 
            . . b b 4 2 2 2 2 2 2 2 b b . . 
            . b b 4 4 2 2 2 2 2 2 2 2 b b . 
            . b 4 4 2 2 2 2 2 2 2 2 2 2 b . 
            b 5 4 4 2 2 2 2 7 7 2 2 2 2 2 b 
            b 5 4 2 2 7 2 2 2 7 2 2 2 2 2 b 
            b 5 4 2 7 7 7 2 2 7 2 2 2 2 2 b 
            b 5 4 4 2 7 2 2 7 7 7 2 2 2 4 b 
            b 5 4 4 2 2 2 2 2 2 2 2 2 4 4 b 
            b 5 4 4 4 2 2 2 2 2 2 2 4 4 4 b 
            . b 5 4 4 4 4 2 2 2 2 4 4 5 b . 
            . b 5 5 4 4 4 4 4 4 4 4 5 b b . 
            . . b 5 5 4 4 4 4 4 5 5 b b . . 
            . . . b b 5 5 5 5 5 5 b b . . . 
            . . . . . b b b b b b . . . . . 
            `, SpriteKind.helper)
        tiles.placeOnTile(myhelper, value)
    }
}
function game2 () {
    scene.setBackgroundColor(9)
    mySprite = sprites.create(assets.image`phoenix`, SpriteKind.Player)
    info.setScore(0)
    mySprite.ay = 500
    controller.moveSprite(mySprite, 100, 0)
    scene.cameraFollowSprite(mySprite)
    info.setLife(3)
    tiles.setTilemap(tilemap`platformer1`)
    tiles.placeOnRandomTile(mySprite, assets.tile`tile3`)
    for (let value of tiles.getTilesByType(assets.tile`myTile3`)) {
        myhelper = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f . f f f . . . . 
            . . . . f 3 3 3 f 3 3 3 f . . . 
            . . . . f 3 3 3 3 3 1 3 f . . . 
            . . . . f 3 3 3 3 3 3 3 f . . . 
            . . . . . f 3 b b b 3 f . . . . 
            . . . . . f f b b b f f . . . . 
            . . . . . . f f b f f . . . . . 
            . . . . . . . f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Food)
        tiles.placeOnTile(myhelper, value)
    }
    StartNextLevel()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile4`, function (sprite, location) {
    StartNextLevel()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    game2()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    mySprite.vy = -200
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.helper, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
})
function darkHorse () {
    music.play(music.createSong(hex`0084000408080205001c000f0a006400f4010a0000040000000000000000000000000000000002800100000400012a04000800012908000c0001270c001000011e10001400012a14001800012918001c0001271c002000011e20002400012a24002800012928002c0001272c003000011e30003400012a34003800012938003c0001273c004000011e40004400012a44004800012948004c0001274c005000011e50005400012a54005800012958005c0001275c006000011e60006400012a64006800012968006c0001276c007000011e70007400012a74007800012978007c0001277c008000011e80008400012984008800012788008c0001258c009000011d90009400012994009800012798009c0001259c00a000011da000a4000129a400a8000127a800ac000125ac00b000011db000b4000129b400b8000127b800bc000124bc00c000011dc000c4000129c400c8000127c800cc000125cc00d000011dd000d4000129d400d8000127d800dc000125dc00e000011de000e4000129e400e8000127e800ec000125ec00f000011df000f4000129f400f8000127f800fc000125fc000001011d06001c00010a006400f401640000040000000000000000000000000000000002300000002000010820004000010f40006000010c60008000010a8000a0000106a000c000010dc000e000010ae00000010108`), music.PlaybackMode.LoopingInBackground)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile2`, function (sprite, location) {
    game.over(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    info.changeLifeBy(0)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    otherSprite.destroy()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    if (sprite.bottom < otherSprite.y) {
        sprite.vy = -100
        info.changeScoreBy(1)
    } else {
        info.changeLifeBy(-1)
    }
})
let myhelper: Sprite = null
let myEnemy: Sprite = null
let mySprite: Sprite = null
let currentLevel = 0
darkHorse()
game.splash("I'm akira the last of royalty because ninjas killed the rest of royalty. now their after me. will yo help me kill them all and save my kingdom? press a then b to start this quest!")
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        if (myEnemy.isHittingTile(CollisionDirection.Bottom)) {
            if (value.vx < 0 && value.tileKindAt(TileDirection.Left, sprites.castle.tileGrass2)) {
                value.vy = -150
            } else if (value.vx > 0 && value.tileKindAt(TileDirection.Right, sprites.castle.tileGrass2)) {
                value.vy = -150
            } else if (value.isHittingTile(CollisionDirection.Left)) {
                value.vx = 30
            }
        } else if (value.isHittingTile(CollisionDirection.Right)) {
            value.vx = -30
        }
    }
})
