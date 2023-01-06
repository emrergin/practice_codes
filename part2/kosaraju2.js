import {readFileSync } from "fs";

// let lines = readFileSync(`scc_test.txt`, 'utf-8')
// let lines = readFileSync(`scc_test2.txt`, 'utf-8')
// let lines = readFileSync(`scc_test0.txt`, 'utf-8')
let lines = readFileSync(`problem8.10.txt`, 'utf-8')
    .split(/\r?\n/).map(a=>a.trim().split(' '));

let vertices=[];
let index=1;
for(let i=0;i<lines.length;i++){
    if(i===0 || lines[i][0]!==lines[i-1][0]){        
        for(let j=index;j<=lines[i][0];j++){
            const newVertex = {name: j,nextVertices:[],label:null,previousVertices:[]}
            if(j===+lines[i][0]){
                newVertex.nextVertices.push(lines[i][1]);
            }
            vertices.push(newVertex);
            index=j+1;
        }
    }
    else{
        vertices[vertices.length-1].nextVertices.push(lines[i][1]);
    }
}

for(let i=0;i<vertices.length;i++){
    const currentVertex = vertices[i];
    for (let next of currentVertex.nextVertices){
        let index=+next-1;
        vertices[index].previousVertices.push(`${currentVertex.name}`)
    }
}

for(let i=0;i<vertices.length;i++){
    const currentVertex = vertices[i];
    currentVertex.nextVertices = currentVertex.nextVertices.map(a=>vertices[+a-1]);
}

kosaraju(vertices);

function kosaraju(V){	
	
	toposortIterative(V);
	console.log(`starting main part.`);
    const exploredK=new Set();
    let componentSizes=[];
    V=V.sort((a,b)=>a.label-b.label);

    for (let v of V){
		if (!exploredK.has(v.name)){            
			dfsScc(v);
		}
        if(exploredK.size>=V.length){
            break;
        }
	}

    function dfsScc(s){
		let dfsStack=[s];
        componentSizes.push(0);		
		
		while(dfsStack.length>0){
			let v = dfsStack[dfsStack.length-1];	
			if (exploredK.has(v.name)){
				dfsStack.pop();
			}
			else{	
				let neighbours = v.nextVertices;
                neighbours = neighbours.filter(a=>!exploredK.has(a.name));
					
				exploredK.add(v.name);
                componentSizes[componentSizes.length-1]=componentSizes[componentSizes.length-1]+1;
				for (let vertex of neighbours){
					dfsStack.push(vertex);
				}
			}			
		}
	}

    console.log(componentSizes.sort((a,b)=>b-a).slice(0,5));
	

}

function toposortIterative(Vx){
    const exploredT=new Set();
	console.log(`starting toposort.`);
	
	let currentLabel=Vx.length;

	for (let v of Vx){

		if (!exploredT.has(v.name)){
			dfsTopo(v);
		}
        if(exploredT.size>=Vx.length){
            break;
        }
	}
	
	function dfsTopo(s){
		let dfsStack=[s];		
		
		while(dfsStack.length>0){
			let v = dfsStack[dfsStack.length-1];	
			
			if (exploredT.has(v.name)){
				dfsStack.pop();
                v.label=currentLabel;
                currentLabel--;

			}
			else{			
				
				let neighbours = v.previousVertices;
                neighbours = neighbours.filter(a=>!exploredT.has(+a));
					
				exploredT.add(v.name);

				for (let vertex of neighbours){
					dfsStack.push(vertices[+vertex-1]);
				}
			}			
		}
	}	
}

