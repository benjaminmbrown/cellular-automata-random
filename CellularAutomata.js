var CellularAutomata = function() {
    this.w = 20;

    // this.cells = new Array(width/this.w);
   	// for (var i = 0;i<this.cells.length;i++){
   	// 	this.cells[i] = 0;
   	// }

    this.cells = [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0]
    this.ruleSet = [0,1,0,1,1,0,1,0];

    //  this.cells[this.cells.length / 2] = 1;
    this.generation = 0;
    //cell's state formula : CELL state at time t = f(CELL neighborhood at time t - 1)

    this.rules = function(a,b,c){
    	if(a==1 && b==1 && c==1)return this.ruleSet[0];
    	if(a==1 && b==1 && c==0)return this.ruleSet[1];
    	if(a==1 && b==0 && c==1)return this.ruleSet[2];
    	if(a==1 && b==0 && c==0)return this.ruleSet[3];
    	if(a==0 && b==1 && c==1)return this.ruleSet[4];
    	if(a==0 && b==1 && c==0)return this.ruleSet[5];
    	if(a==0 && b==0 && c==1)return this.ruleSet[6];
    	if(a==0 && b==0 && c==0)return this.ruleSet[7];

    	return 0;

    }

    this.generate = function(){
    	var nextGeneration = [];
    	for (var i = 0;i<this.cells.length;i++){
    		nextGeneration[i]=0;
    	}

    	for (var i = 1; i < this.cells.length - 1; i++) {
    		var left = this.cells[i-1];
    		var mid = this.cells[i];
    		var right = this.cells[i+1];
    		nextGeneration[i] = this.rules(left,mid,right);
    	}
    	this.cells = nextGeneration;
    	this.generation++;
    }

    this.display = function() {
        var newCells = [];
        for (var i = 1; i < this.cells.length - 1; i++) {
            if (this.cells[i] == 0) { fill(255) } else { fill(0) };
            stroke(0);
            rect(i * 20, 0, 20, 20);

        }
    }

}
