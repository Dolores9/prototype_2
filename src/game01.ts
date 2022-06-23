import * as PIXI from "pixi.js"
import headImage from "./images/head.png"
import rocketImage from "./images/rocket.png"
import backgroundImage from "./images/background-rain.jpg"
import { Head } from "./head"
import {Rocket} from "./shark"

export class RocketGame {

    private pixi: PIXI.Application
    private loader: PIXI.Loader
    public heads: Head [] = []
    public rockets: Rocket [] = []
    public background = backgroundImage

    constructor() {
        this.pixi = new PIXI.Application({
            width: innerHeight, height: innerHeight})
        document.body.appendChild(this.pixi.view)

        this.loader = new PIXI.Loader()
        this.loader
            .add("backgroundTexture", backgroundImage)
            .add('fishTexture', headImage)
            .add('rocketTexture', rocketImage )
        this.loader.load(() => this.doneLoading())
    }

    doneLoading() {
        console.log("all textures loaded!")
        this.background = new PIXI.Sprite(this.loader.resources["backgroundTexture"].texture!)
        this.background.width = window.innerWidth;
        this.background.height = window.innerHeight;
        this.pixi.stage.addChild(this.background)

        for (let i = 0; i < 25; i++) {
            let myHeads = new Head(this.loader.resources["headTexture"].texture!)
            this.pixi.stage.addChild(myHeads)
            this.heads.push(myHeads)

           

        }
        for(let i = 0; i < 1; i++){
            let rocket = new Rocket(this.loader.resources["rocketTexture"].texture!)
            this.pixi.stage.addChild(rocket)
            this.rockets.push(rocket)
        }

        this.pixi.ticker.add((delta) => this.updateTheStage(delta))

    }

    updateTheStage(delta: number) {

        for (let myhead of this.heads) {
            myhead.swim()
        }

        for (let myrocket of this.rockets){
            myrocket.update();
        }

        this.checkCollision()
    }

    killHead(rocket:Rocket, heads:Head){
        heads.destroy()
        const index = this.heads.indexOf(heads, 0);
        if (index > -1) {
        this.heads.splice(index, 1);
        }
    }

    private checkCollision(){
        
        for (let rocket of this.rockets){
            
            for (let head of this.heads){
                
                 if(this.collision(rocket, head)){
                //  this.scoreUp()
                 this.killHead(rocket, head)
                 }
                // break
            }
        }
    }

    private collision(rockets:Rocket, heads:Heads){
        const bounds1 = rockets.getBounds()
        const bounds2 = heads.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }


    resetGame(){ 
        
    }
}
            
new RocketGame()