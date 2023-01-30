import {readFileSync } from "fs";

let lines = readFileSync(`satinput5.txt`, 'utf-8')
	.split(/\r?\n/).map(a=>a.trim().split(' ').map(Number));

const n = lines.length;

let positiveVertices=[];
let negativeVertices=[];

for(let i=0;i<n;i++){
    const newVertex1 = {name: i+1,nextVertices:[],label:null,component:null,previousVertices:[], truth:true};
    const newVertex2 = {name: -(i+1),nextVertices:[],label:null,component:null,previousVertices:[], truth:false};
    positiveVertices.push(newVertex1);
    negativeVertices.push(newVertex2);
}

for(let i=0;i<n;i++){
    parseLine(lines[i]);
}

function parseLine(line){
    let index1 = Math.abs(line[0])-1;
    let index2 = Math.abs(line[1])-1;
    if(line[0]>0 && line[1]>0){
        negativeVertices[index1].nextVertices.push(line[1]);
        negativeVertices[index2].nextVertices.push(line[0]);
    }else if(line[0]<0 && line[1]>0){
        negativeVertices[index2].nextVertices.push(line[0]);
        positiveVertices[index1].nextVertices.push(line[1]);

    }else if(line[0]<0 && line[1]<0){
        positiveVertices[index1].nextVertices.push(line[1]);
        positiveVertices[index2].nextVertices.push(line[0]);

    }else if(line[0]>0 && line[1]<0){
        positiveVertices[index2].nextVertices.push(line[0]);
        negativeVertices[index1].nextVertices.push(line[1]);      
    }
}

for(let i=0;i<n;i++){
    const currentVertex = positiveVertices[i];
	for (let next of currentVertex.nextVertices){
        if(next>0){
            positiveVertices[next-1].previousVertices.push(currentVertex.name);
        }
        else{
            negativeVertices[Math.abs(next)-1].previousVertices.push(currentVertex.name);
        }
	}
}

for(let i=0;i<n;i++){
    const currentVertex = negativeVertices[i];
	for (let next of currentVertex.nextVertices){
		// let index=+next-1;
        if(next>0){
            positiveVertices[next-1].previousVertices.push(currentVertex.name);
        }
        else{
            negativeVertices[Math.abs(next)-1].previousVertices.push(currentVertex.name);
        }
	}
}

for(let i=0;i<n;i++){
    const currentVertex1 = positiveVertices[i];
    const currentVertex2 = negativeVertices[i];
    currentVertex1.nextVertices = currentVertex1.nextVertices.map(a=>a>0?positiveVertices[a-1]:negativeVertices[Math.abs(a)-1]);
    currentVertex2.nextVertices = currentVertex2.nextVertices.map(a=>a>0?positiveVertices[a-1]:negativeVertices[Math.abs(a)-1]);	
}

const vertices = positiveVertices.concat(negativeVertices);
kosaraju(vertices);

export function kosaraju(V){	
	
	toposortIterative(V);
	console.log(`starting main part.`);
	const exploredK=new Set();
	V=V.sort((a,b)=>a.label-b.label);
    let componentLabel=0;

	for (let v of V){
		if (!exploredK.has(v.name)){			
            componentLabel++;
			dfsScc(v);
		}
		if(exploredK.size>=V.length){
			break;
		}
	}

	function dfsScc(s){
		let dfsStack=[s];
		
		while(dfsStack.length>0){
            let v = dfsStack[dfsStack.length-1];	
			if (exploredK.has(v.name)){
				dfsStack.pop();
			}
			else{	
				let neighbours = v.nextVertices;
				neighbours = neighbours.filter(a=>!exploredK.has(a.name));
                v.component=componentLabel;
					
				exploredK.add(v.name);
				for (let vertex of neighbours){
					dfsStack.push(vertex);
				}
			}		
		}
	}
    let satisfiable=true;
	for(let i=0;i<n;i++){
        const currentVertex1 = positiveVertices[i];
        const currentVertex2 = negativeVertices[i];
        if(currentVertex1.component===currentVertex2.component){
            console.log("unsatisfiable");
            satisfiable=false;
            break;
        }
    }
    if(satisfiable){
        console.log("satisfiable");
    }

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
				neighbours = neighbours.filter(a=>!exploredT.has(a));
				exploredT.add(v.name);
				for (let vertex of neighbours){
                    if(vertex>0){
                        dfsStack.push(positiveVertices[+vertex-1]);
                    }
                    else{
                        dfsStack.push(negativeVertices[-vertex-1]);
                    }
				}
			}			
		}
	}	
}

