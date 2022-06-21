import * as PIXI from "pixi.js"
import fishImage from "./images/fish.png"
import sharkImage from "./images/shark.png"
import backgroundImage from "./images/background.png"
import bubblesImage from "./images/bubble.png"
import { Fish } from "./fish"
import { Bubble } from "./bubble"
import {Shark} from "./shark"

export class fishGame {

    private pixi: PIXI.Application
    private loader: PIXI.Loader
    public fishes: Fish [] = []
    public bubbles: Bubble [] = []
    public sharks: Shark [] = []
    public background = backgroundImage

    constructor() {
        this.pixi = new PIXI.Application({
            width: 800, height: 600})
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader
            .add("backgroundTexture", backgroundImage)
            .add('fishTexture', fishImage)
            .add('bubbleTexture', bubblesImage)
            .add('sharkTexture', sharkImage )
        this.loader.load(() => this.doneLoading())
    }

    doneLoading() {
        console.log("all textures loaded!")
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!)
        this.background.width = window.innerWidth;
        this.background.height = window.innerHeight;
        this.pixi.stage.addChild(this.background)

        for (let i = 0; i < 25; i++) {
            let myFishes = new Fish(this.loader.resources["fishTexture"].texture!)
            this.pixi.stage.addChild(myFishes)
            this.fishes.push(myFishes)

            let manyBubbles = new Bubble(this.loader.resources["bubbleTexture"].texture!)
            this.pixi.stage.addChild(manyBubbles)
            this.bubbles.push(manyBubbles)

        }
        for(let i = 0; i < 1; i++){
            let shark = new Shark(this.loader.resources["sharkTexture"].texture!)
            this.pixi.stage.addChild(shark)
            this.sharks.push(shark)
        }

        this.pixi.ticker.add((delta) => this.updateTheStage(delta))

    }

    updateTheStage(delta: number) {

        for (let myfish of this.fishes) {
            myfish.swim()
        }

        for (let myshark of this.sharks){
            myshark.update();
        }

        this.checkCollision()
    }

    killFish(shark:Shark, fishes:Fish){
        fishes.destroy()
        const index = this.fishes.indexOf(fishes, 0);
        if (index > -1) {
        this.fishes.splice(index, 1);
        }
    }

    private checkCollision(){
        
        for (let shark of this.sharks){
            
            for (let fish of this.fishes){
                
                 if(this.collision(shark, fish)){
                //  this.scoreUp()
                 this.killFish(shark, fish)
                 }
                // break
            }
        }
    }

    private collision(shark:Shark, fishes:Fish){
        const bounds1 = shark.getBounds()
        const bounds2 = fishes.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }


    resetGame(){ 
        
    }
}
            
new fishGame()