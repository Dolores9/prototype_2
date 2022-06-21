

const Application = PIXI.Application;

const game = new Application({
    width: 500,
    height: 500
    
});

app.renderer.backgroundColor = 0x23395D
app.renderer.resize(window.innerWidth, window.innerHeight);
document.body.appendChild(app.view);


const fishTexture = PIXI.texture.from("./images/fish.png");
const fishSprite = new PIXI.sprite(fishTexture);
app.stage.appendChild(fishSprite);