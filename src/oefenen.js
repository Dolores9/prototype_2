class Goomba {
    // eigenschappen geen let of const
    speed = Math.random*10;
    size = 3;
    health = 3;
    amno = 3;
    
    // gedrag
    attack(){
        this.amno --;
        console.log(`amno left is ${this.amno}`)
    }

    jump() {
      console.log('Jumping!');
    }
  }


  let myGoombaOne = new Goomba();
  let anotherGoomba = new Goomba();
  console.log(myGoombaOne.health);

  let list: Goomba [] = [];
  list = [myGoombaOne, anotherGoomba];
  for (let g of list) {
    g.jump();
  }
  