const test1 =
[
[1 ,4],
[2 ,8],
[3 ,6],
[4 ,7],
[5 ,2],
[6 ,9],
[7 ,1],
[8 ,5],
[8 ,6],
[9 ,7],
[9 ,3]
]

const test2=[
[1, 2],
[2, 6],
[2, 3],
[2, 4],
[3, 1],
[3, 4],
[4, 5],
[5, 4],
[6, 5],
[6, 7],
[7, 6],
[7, 8],
[8, 5],
[8, 7]
]

const test3=
[
[1, 2],
[2, 3],
[3, 1],
[3, 4],
[5, 4],
[6, 4],
[8, 6],
[6, 7],
[7, 8]
]

const test4=[
[1, 2],
[2, 3],
[3, 1],
[3, 4],
[5, 4],
[6, 4],
[8, 6],
[6, 7],
[7, 8],
[4, 3],
[4, 6]
]

const test5=[
[1 ,2],
[2 ,3],
[2 ,4],
[2 ,5],
[3 ,6],
[4 ,5],
[4 ,7],
[5 ,2],
[5 ,6],
[5 ,7],
[6 ,3],
[6 ,8],
[7 ,8],
[7 ,10],
[8 ,7],
[9 ,7],
[10 ,9],
[10 ,11],
[11 ,12],
[12 ,10]
]

function toposort(G,rev=false){
	const vertices = Array.from(new Set(G. flatMap(a=>[a[0],a[1]])));
	const isExplored = new Map();
	const labels = new Map();
	
	for (let v of vertices){
		isExplored.set(v,0);
	}
	
	let currentLabel=vertices.length;
	
	for (let v of vertices){
		if (isExplored.get(v)===0){
			dfsTopo(G,v);
		}
	}
	
	function dfsTopo(G,s){
		
		isExplored.set(s,1);
		let neighbours = rev? 
			G.filter(a=>a[1]===s).map(a=>a[0]):
			G.filter(a=>a[0]===s).map(a=>a[1]);		
		
		for(let vertex of neighbours){
			if (isExplored.get(vertex)===0){
				dfsTopo(G,vertex);
			}
		}		
	
		labels.set(s,currentLabel);
		currentLabel-=1;
	}
	
	return labels;
}

function toposortIterative(G,vertices= Array.from(new Set(G. flatMap(a=>[a[0],a[1]]))),rev=false){
	console.log(`starting toposort.`);
	const isExplored = new Map();
	const labels = new Map();
	
	let currentLabel=vertices.length;
	
	for (let v of vertices){
		if (!isExplored.has(v)){
			dfsTopo(G,v);
		}
	}
	
	function dfsTopo(G,s){
		let dfsStack=[s];		
		
		while(dfsStack.length>0){
			let v = dfsStack[dfsStack.length-1];			
			
			if (isExplored.get(v)){
				labels.set(v,currentLabel);
				currentLabel-=1;
				dfsStack.pop();
				if (currentLabel%1000===0){
					console.log(`topo`,currentLabel);
				}
			}
			
			if(!isExplored.has(v)){				
				
				let neighbours = rev? 
					G.filter(a=>a[1]===v && !isExplored.has(a[0])).map(a=>a[0]):
					G.filter(a=>a[0]===v && !isExplored.has(a[1])).map(a=>a[1]);
				// neighbours= neighbours.filter(a=>!isExplored.has(a));
					
				isExplored.set(v,true);
				for (let vertex of neighbours){
					dfsStack.push(vertex);
				}
			}			
		}
	}	
	
	return labels;
}


function kosaraju(G){
	
	let vertices = Array.from(new Set(G. flatMap(a=>[a[0],a[1]])));
	const isExplored = new Map();
	const sccValues = new Map();
	
	const labels = toposortIterative(G,vertices,true);
	let numSCC=0;
	console.log(`starting main part.`);
	
	vertices=vertices.sort((a,b)=>{
		if (labels.get(a)>labels.get(b)){return 1}
		if (labels.get(a)<labels.get(b)){return -1}
		if (labels.get(a)===labels.get(b)){return 0}
	});	
	
	for (let vertex of vertices){
		if (!isExplored.get(vertex)){
			numSCC+=1;
			console.log(`kosaraji`,numSCC);
			dfsScc(G,vertex);
		}
	}
	
	function dfsScc(G,s){
		let dfsStack=[s];
		
		while(dfsStack.length>0){
			let v = dfsStack.pop();
			if(!isExplored.get(v)){
				isExplored.set(v,true);
				sccValues.set(v,numSCC);
				const neighbours = G.filter(a=>a[0]===v).map(a=>a[1]);
				for (let vertex of neighbours){
					dfsStack.push(vertex);
				}
			}			
		}
	}	
	// return sccValues;
	return Array.from(Array.from(sccValues.values()).reduce((prev,curr)=> {
		if (!prev.has(curr)){
			prev.set(curr,1)
		}
		else{
			prev.set(curr,prev.get(curr)+1)
		}
		return prev
	}		,new Map()).values()).sort().reverse().slice(0,5);
}

// console.log(toposort(test1));
// console.log(toposortIterative(test1));
// console.log(kosaraju(test5));

export default kosaraju;
