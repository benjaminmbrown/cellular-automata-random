var cellularAutomata = [];

function setup() {

    createCanvas(600, 500);
    setFrameRate(60);
    cellularAutomata = new CellularAutomata();
}

function draw() {
    background(255);
    cellularAutomata.display();
  //  if(cellularAutomata.generation < height / cellularAutomata.w){
        cellularAutomata.generate();
    //}
}

function mouseDragged(){
    
}

function keyPressed() {
     for (var i = 0; i < key; i++) {
        cellularAutomata.changeRuleSet();
      
    }



}
