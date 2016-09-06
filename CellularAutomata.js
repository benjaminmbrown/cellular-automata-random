var CellularAutomata = function() {
    this.w = 20;
    this.cells = new Array(width / this.w);
    for (var i = 0; i < this.cells.length; i++) {
        this.cells[i] = 0;
    }

    this.cells[this.cells.length / 2] = 1;
    this.generation = 0;


    this.display = function() {
        for (var i = 0; i < this.cells.length; i++) {
            if (this.cells[i] == 0) { fill(255) } else { fill(0) };
            
            stroke(0);
            rect(i*50,0,50,50);


        }
    }

}
