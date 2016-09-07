var CellularAutomata = function() {
    this.w = 6;



    this.cells = [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0]
    this.ruleSet = [];
    this.noiseIncrement = 0;

    //this.ruleSet = [0, 1, 0, 1, 1, 0, 1, 0]; //Rule 90
    //this.ruleSet = [0,1,1,1,1,0,1,1];   // Rule 222  
    //this.ruleSet= [0,1,1,1,1,1,0,1];   // Rule 190  
    //this.ruleSet = [0,1,1,1,1,0,0,0];   // Rule 30  
    //this.ruleSet = [0,1,1,1,0,1,1,0];   // Rule 110


    //ranodmized ruleset
    this.randomizeRules = function() {
        for (var i = 0; i < 8; i++) {
            this.ruleSet[i] = Math.floor(random(2));
        }
    }

    this.randomizeRules();

    this.addNoiseToRules = function() {
    	var n = noise(this.noiseIncrement);
    	console.log('time', n);
    	   console.log('rSet before:',this.ruleSet);

        for (var i = 0; i < 8; i++) {
        	var x = map(n,0,1,0,this.ruleSet[i]);
            this.ruleSet[i] = Math.round(x);
        }
        this.noiseIncrement +=0.001;

        console.log('rSet after:',this.ruleSet);
    }
    this.createNoiseyRules = function() {
        //https://github.com/benjaminmbrown/agents-flow-field/blob/master/Flowfield.js
        var xoff = 0;
        for (var i = 0; i < 8; i++) {
            this.ruleSet[i] = Math.floor(random(2));
        }


    }

    //  this.cells[this.cells.length / 2] = 1;
    this.generation = 0;
    this.cols = Math.floor(width / this.w);
    this.rows = Math.floor(height / this.w);


    //store generational history
    this.matrix = new Array(this.cols);
    for (var i = 0; i < this.cols; i++) {
        this.matrix[i] = new Array(this.rows);
    }

    //use perlin noise to slowly change the rules over


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



    this.generate = function() {
    	//this.addNoiseToRules();
        for (var i = 0; i < this.cols; i++) {

            this.matrix[i][(this.generation + 1) % this.rows] = 
            this.rules(
                this.matrix[(i + this.cols - 1) % this.cols][this.generation % this.rows],
                this.matrix[i][this.generation % this.rows],
                this.matrix[(i + 1) % this.cols][this.generation % this.rows]
                );
        }
        this.generation++;
    }

    this.display = function() {
        var offset = this.generation % this.rows;

        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {

                var y = j - offset;

                if (y <= 0) y = this.rows + y;

                if (this.matrix[i][j] == 1) {

                    fill(0);
                    stroke(2);

                } else {
                    fill(255);
                    stroke(1);
                }

                rect(i * this.w, (y - 1) * this.w, this.w, this.w);
            }
        }
    }

}
