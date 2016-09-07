var CellularAutomata = function() {
    this.w = 20;
    this.cells = [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0]

    //  this.cells[this.cells.length / 2] = 1;
    this.generation = 0;
    //cell's state formula : CELL state at time t = f(CELL neighborhood at time t - 1)

    this.display = function() {
        var newCells = [];
        for (var i = 1; i < this.cells.length - 1; i++) {
            if (this.cells[i] == 0) { fill(255) } else { fill(0) };

            stroke(0);
            rect(i * 20, 0, 20, 20);


        }
    }

}
