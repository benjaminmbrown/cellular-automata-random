var cellularAutomata = [];

function setup() {

    createCanvas(650, 450);
    setFrameRate(50);
    cellularAutomata = new CellularAutomata();
}

function draw() {
    background(255);
    cellularAutomata.display();
    if(cellularAutomata.generation < height / cellularAutomata.w){
        cellularAutomata.generate();
    }
}

function mouseDragged(){
    
}

function keyPressed() {


}
