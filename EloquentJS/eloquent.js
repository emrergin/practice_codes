




class Matrix {
	constructor(x,y) {
		this.x = x;
		this.y = y;
	}
	plus(this, b) {
		return {x: this.x+b.x , y:this.y+b.y};
	}
	minus(this, b) {
		return {x: this.x-b.x , y:this.y-b.y};
	}
	length (x, y) {
		return Math.sqrt(this.x^2+this.y^2)
	}
}

class Group {
	constructor() {
		this.elements=[];
	}
	add(b) {
		if (this.elements.indexOf(b)===-1){this.elements.push(b)}
	}
	delete(b) {
		if (this.elements.indexOf(b)!==-1){this.elements.splice(this.elements.indexOf(b),1)}
	}
	has (b) {
		return this.elements.indexOf(b)!==-1
	}
	
	static from(iterable) {
		let sonuc = new Group();
		for (item of iterable){
			sonuc.add(item);
		}
		return sonuc;
	}
}


class GroupIterator {
	constructor(group) {
		this.index = 0
		this.group = group;
	}
	next() {
		if (this.x == this.group.length) return {done: true};
		let value = {
			index: this.index,
			value: this.group[index]
		};
		this.index++
		return {value, done: false};
	}
}


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




<!doctype html>
<script src="code/chapter/16_game.js"></script>
<script src="code/levels.js"></script>

<link rel="stylesheet" href="css/game.css">

<body>
<script>
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
</script>
</body>


<!doctype html>
<script src="code/chapter/16_game.js"></script>
<script src="code/levels.js"></script>

<link rel="stylesheet" href="css/game.css">
<style>.monster { background: purple }</style>

<body>
  <script>
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
  </script>
</body>

<!doctype html>
<script src="code/chapter/19_paint.js"></script>

<div></div>
<script>
  // Change this method
  PictureCanvas.prototype.syncState = function(picture) {
    let updatedPicture;
    let updatedCoordinates=[];
    if (this.picture == picture) return;
    if (this.picture !== undefined){
    	updatedPicture=Object.assign({}, picture);
      	updatedPicture.pixels=
        updatedPicture.pixels.filter((a, index)=> {
          if(this.picture.pixels[index]!==a)
          { let updatedPosition={};
            updatedPosition.x=index % picture.width;
           	updatedPosition.y=Math.floor(index/picture.width);
            updatedCoordinates.push(updatedPosition);}
          return this.picture.pixels[index]!==a
        });
    }
    else{
      	updatedPicture=picture;
    }
    updatedPicture.coordinates=updatedCoordinates;
    console.log(updatedPicture);
    this.picture = picture;   	
    drawPicture(this.picture, this.dom, scale);
  };

  // You may want to use or change this as well
  function drawPicture(picture, canvas, scale) {
    canvas.width = picture.width * scale;
    canvas.height = picture.height * scale;
    let cx = canvas.getContext("2d");

    for (let y = 0; y < picture.height; y++) {
      for (let x = 0; x < picture.width; x++) {
        //if(picture.pixel(x,y)!==oldPicture.pixel(x,y)){
          cx.fillStyle = picture.pixel(x, y);
          cx.fillRect(x * scale, y * scale, scale, scale);
        //}
      }
    }
  }

  document.querySelector("div")
    .appendChild(startPixelEditor({}));
</script>


<!doctype html>
<script src="code/chapter/19_paint.js"></script>

<div></div>
<script>
  // The old draw tool. Rewrite this.
  function draw(pos, state, dispatch) {
    function drawPixel({x, y}, state) {
      let drawn = {x, y, color: state.color};
      dispatch({picture: state.picture.draw([drawn])});
    }
    drawPixel(pos, state);
    return drawPixel;
  }
  
  function line(start, state, dispatch) {
  function drawLine(pos) {
    let drawn = [];    
    let linearCombinations=[];
    let ilerleyenNokta={x:start.x,y:start.y}
    for (let i=0; y <= yEnd;) {
      
    }
    for (let y = yStart; y <= yEnd; y++) {
      for (let x = xStart; x <= xEnd; x++) {

        drawn.push({x, y, color: state.color});
      }
    }
    dispatch({picture: state.picture.draw(drawn)});
  }
  drawLine(start);
  return drawLine;
}

  let dom = startPixelEditor({
    tools: {draw, line, fill, rectangle, pick}
  });
  document.querySelector("div").appendChild(dom);
</script>



<!doctype html>
<script src="code/chapter/19_paint.js"></script>

<div></div>
<script>
  // The old draw tool. Rewrite this.
  function draw(start, state, dispatch) {
    let lastDrawn=null;
    function drawPixel(pos,state) {
      //console.log(pos);
      let drawn = [{x:pos.x, y:pos.y, color: state.color}];
	if(lastDrawn){
      drawn=drawn.concat(drawLine(pos,lastDrawn)); 
    }
      lastDrawn={x:pos.x, y:pos.y};
      dispatch({picture: state.picture.draw(drawn)});
    }    
    
    drawPixel(start,state);
    return drawPixel;
    
    function drawLine(nok1,nok2) {
      let drawn = [];    
      let distance=Math.floor(Math.sqrt((nok1.x-nok2.x)**2+(nok1.y-nok2.y)**2));
      for (let i=0; i <= distance*2; i++) {
        let arax=Math.round((nok1.x*i+nok2.x*(2*distance-i))/(2*distance));
        let aray=Math.round((nok1.y*i+nok2.y*(2*distance-i))/(2*distance));
        drawn.push({x:arax, y:aray, color: state.color});
      }
      return drawn;
    }
  }
  
  function line(start, state, dispatch) {
  function drawLine(pos) {
    let drawn = [];    
    let distance=Math.floor(Math.sqrt((start.x-pos.x)**2+(start.y-pos.y)**2));
    for (let i=0; i <= 3*distance; i++) {
      let arax=Math.round((start.x*i+pos.x*(3*distance-i))/(3*distance));
      let aray=Math.round((start.y*i+pos.y*(3*distance-i))/(3*distance));
        drawn.push({x:arax, y:aray, color: state.color});      
    }
    
    drawn=drawn.filter((a,index)=>
                 {if (index>0 && index<drawn.length-1){
                   if (
                     Math.sqrt((drawn[index-1].x-drawn[index+1].x)**2
                               +(drawn[index-1].y-drawn[index+1].y)**2)==Math.sqrt(2)
                   ){
                     return false;
                   }
                   else{                     
                     return true;
                   }               
                     
                     
                 }
                  else{
                   return true; 
                  }
    })
    dispatch({picture: state.picture.draw(drawn)});
  }
  drawLine(start);
  return drawLine;
}

  let dom = startPixelEditor({
    tools: {draw, line, fill, rectangle, pick}
  });
  document.querySelector("div").appendChild(dom);
</script>

function findPath(a, b) {
  // Your code here...
  let startTime=Date.now();
  let work = [{at: a, route: [a]}];
  const reachedNodes = new Set();
  
  //console.log(work);
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    let komsular=graph.filter(a=>a.hasEdge(at));
    for (let place of komsular) {
      if (place == b) return {route: route.concat(place),time: (Date.now()-startTime)/1000};
      if (!reachedNodes.has(place)) {
      	work.push({at: place, route: route.concat(place)});
        reachedNodes.add(place);
      }
    }
  }
}

let graph = treeGraph(5,8);
let solution= findPath(graph[0], graph[graph.length - 1]);
console.log(solution.time);



function findAPath(a, b) {
  let startTime=Date.now();
  let work = [{at: a, route: [a]}];
  const reachedNodes = new Set();
  
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of at.edges) {
      if (place == b) return route.concat(place);
      if (!reachedNodes.has(place)) {
      	work.push({at: place, route: route.concat(place)});
        reachedNodes.add(place);
      }
    }
  }
}
time(findAPath);

