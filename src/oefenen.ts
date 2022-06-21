
import * as PIXI from 'pixi.js'


class Game {
    pixi : PIXI.Application // canvas element in de html file
    loader : PIXI.Loader
    constructor(){
        this.pixi = new PIXI.Application(
            { width: 800,
              height: 450,
            }
         );

        document.body.appendChild(this.pixi.view)
        this.loader = new PIXI.Loader()
        
            
        this.loader.load(() => this.loadCompleted())
    }
    loadCompleted() {
        
    }
}
let g = new Game()