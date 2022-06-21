import * as PIXI from 'pixi.js'
export class Bubble extends PIXI.Sprite {

    speed: number
    

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.speed = Math.random() * 1
        this.x = Math.random() * 800
        this.y = Math.random() * 500
        this.anchor.set(0.5)
        this.tint = ((Math.random() * 0.001) + 0.999) * 0xFFFFFF;
        this.scale.set(0.4 + (Math.random() * 0.6))

    }
    swim() {

        this.y += this.speed
        console.log(this.y)
        if (this.y <= 15) {
            this.y = -1000
        }

  
    }
}