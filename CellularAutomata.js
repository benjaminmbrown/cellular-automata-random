var CellularAutomata = function() {
    this.w = 20;

    // this.cells = new Array(width/this.w);
    // for (var i = 0;i<this.cells.length;i++){
    // 	this.cells[i] = 0;
    // }

    this.cells = [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0]

    this.ruleSet = [0, 1, 0, 1, 1, 0, 1, 0]; //Rule 90
    //this.ruleSet = {0,1,1,1,1,0,1,1};   // Rule 222  
    //this.ruleSet= {0,1,1,1,1,1,0,1};   // Rule 190  
    //this.ruleSet= {0,1,1,1,1,0,0,0};   // Rule 30  
    //this.ruleSet = {0,1,1,1,0,1,1,0};   // Rule 110

    //  this.cells[this.cells.length / 2] = 1;
    this.generation = 0;
    this.cols = width / this.w;
    this.rows = height / this.w;

    console.log(this.rows, this.cols);
    //store generational history
    this.matrix = new Array(this.cols);
    for (var i = 0; i < this.cols; i++) {
        this.matrix[i] = new Array(this.rows);
    }



    //cell's state formula : CELL state at time t = f(CELL neighborhood at time t - 1)

    this.rules = function(a, b, c) {
        if (a == 1 && b == 1 && c == 1) return this.ruleSet[0];
        if (a == 1 && b == 1 && c == 0) return this.ruleSet[1];
        if (a == 1 && b == 0 && c == 1) return this.ruleSet[2];
        if (a == 1 && b == 0 && c == 0) return this.ruleSet[3];
        if (a == 0 && b == 1 && c == 1) return this.ruleSet[4];
        if (a == 0 && b == 1 && c == 0) return this.ruleSet[5];
        if (a == 0 && b == 0 && c == 1) return this.ruleSet[6];
        if (a == 0 && b == 0 && c == 0) return this.ruleSet[7];

        return 0;

    }

    this.reset = function() {
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
                this.matrix[i][j] = 0;
            }
        }
        //middle cell always has 1
        this.matrix[this.cols / 2][0] = 1;
        this.generation = 0;
    }

    this.reset();

    this.randomizeRules = function() {
        for (var i = 0; i < 8; i++) {
            this.ruleSet[i] = Math.floor(random(2));
        }
    }

    this.generate = function() {
       
        for (var i = 0; i < this.cols; i++) {

            var left = this.matrix[(i + this.cols - 1) % this.cols][this.generation % this.rows];
            var mid = this.matrix[i][this.generation % this.rows];
            var right = this.matrix[(i + 1) % this.cols][this.generation % this.rows];

            this.matrix[i][(this.generation + 1) % this.rows] = this.rules[left, mid, right];
        }
        this.generation++;
    }

    this.display = function() {
        var offset = this.generation % this.rows;

        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
            	console.log(this.matrix[i][j]);
                var y = j - offset;

                if (y <= 0) y = this.rows + y;

                if (this.matrix[i][j] == 1) {
        
                    fill(0);
                    stroke(2);
                    rect(i * this.w, (y - 1) * this.w, this.w, this.w);
                }
                else{
                	fill(255);
                    stroke(1);
                }
                       rect(i * this.w, (y - 1) * this.w, this.w, this.w);
            }
        }
    }

}
