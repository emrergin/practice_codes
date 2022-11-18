

specialForms.set = (args, scope) => {
  // Your code here.
  let currentScope=scope;
  while(Object.getPrototypeOf(currentScope)){
    currentscope=Object.getPrototypeOf(currentScope);
   if (currentscope.args[0]){
      currentscope.args[0]=currentscope.args[1];
   }
  }
};




// <!doctype html>
// <script src="code/chapter/16_game.js"></script>
// <script src="code/levels.js"></script>

// <link rel="stylesheet" href="css/game.css">

// <body>
// <script>
  // The old runLevel function. Modify this...
  function runLevel(level, Display) {
    let display = new Display(document.body, level);
    let state = State.start(level);
    let ending = 1;
    
    let durum={};
	
	function pauseFunction(event) {

		if (event.key==`Escape`) {
          
			if (!(`pause` in durum)){
				durum.pause=true;
              
			}
			else{
				durum.pause=!durum.pause;	
			}
		}
	}
	
	window.addEventListener("keydown", pauseFunction);
	
    return new Promise(resolve => {
      runAnimation(time => {
        state = state.update(time, arrowKeys);
        display.syncState(state);
        
		if (`pause` in durum && !durum.pause){
			return false;
          	console.log(state.durum);
		}
        if (state.status == "playing") {
          return true;
        } else if (ending > 0) {
          ending -= time;
          return true;
        } else {
          display.clear();
          resolve(state.status);
          return false;
        }
      });
    });
  }
  runGame(GAME_LEVELS, DOMDisplay);
// </script>
// </body>


// <!doctype html>
// <script src="code/chapter/16_game.js"></script>
// <script src="code/levels.js"></script>

// <link rel="stylesheet" href="css/game.css">
// <style>.monster { background: purple }</style>

// <body>
//   <script>
    // Complete the constructor, update, and collide methods
    class Monster {
      constructor(pos,speed) {
      this.pos = pos;
      this.speed = speed;
      }

      get type() { return "monster"; }

      static create(pos) {
        var chosenValue = Math.random() < 0.5 ? 1 : -1;
        return new Monster(pos.plus(new Vec(0, -1)),new Vec(chosenValue, 0));
      }

      update(time, state) {
        let newPos = this.pos.plus(this.speed.times(time));
        if (!state.level.touches(newPos, this.size, "wall")) {
        	return new Monster(newPos, this.speed);
        } else {
        	return new Monster(this.pos, this.speed.times(-1));
        }
      }

      collide(state) {
      	let filtered = state.actors.filter(a => a != this);
        return new State(state.level, filtered, state.status);
      }
    }

    Monster.prototype.size = new Vec(1.2, 2);

    levelChars["M"] = Monster;

    runLevel(new Level(`
..................................
.################################.
.#..............................#.
.#..............................#.
.#..............................#.
.#...........................o..#.
.#..@...........................#.
.##########..............########.
..........#..o..o..o..o..#........
..........#...........M..#........
..........################........
..................................
`), DOMDisplay);
//   </script>
// </body>