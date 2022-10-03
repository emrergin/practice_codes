import Heap from "./Heap.js";

const test1 = 

[
    [1,	[2,1],	[8,2]],
    [2,	[1,1],	[3,1]],
    [3,	[2,1],	[4,1]],
    [4,	[3,1],	[5,1]],
    [5,	[4,1],	[6,1]],
    [6,	[5,1],	[7,1]],
    [7,	[6,1],	[8,1]],
    [8,	[7,1],	[1,2]]
]

function dijkstra(G,s){
    const checked = new Set([s]);
    const distances = new Map();
   
    const vertices = G.map(a=>a[0]);
    

    for (let vertex of vertices){
        distances.set(vertex,Infinity);
    }
    distances.set(s,0);

    const edges = G.flatMap((a,index)=>a.map(b=>[index+1,b[0],b[1]]).slice(1));

    let notChecked=vertices.filter(a=>!checked.has(a));

    while(notChecked.length>0){
        
        const relatedEdges = edges.filter(a=>(checked.has(a[0]) && !checked.has(a[1])));
        if (relatedEdges.length===0){break;}
        const edgeToTraverse = relatedEdges
                                .map(a=> ({edge: a, distance: distances.get(a[0])+a[2]}))
                                .reduce((prev,curr)=> 
                                    {if (prev.distance<curr.distance){return prev}else{return curr}},{edge:null,distance:Infinity});
        checked.add((edgeToTraverse.edge)[1]);
        distances.set((edgeToTraverse.edge)[1],edgeToTraverse.distance);
        notChecked=vertices.filter(a=>!checked.has(a));
    }

    return(distances);
}

function dijkstraHeap(G,s){
    const checked = new Set();
    const heap = new Heap(`vertex`);

    
    const distances = new Map();
    
    const vertices = G.map(a=>a[0]);
    const edges = G.flatMap((a,index)=>a.map(b=>[index+1,b[0],b[1]]).slice(1)); 

    heap.insert({vertex:s, key: 0});
    let otherVertices = vertices.filter(a=>a!==s);
    for (let vertex of otherVertices){
        heap.insert({vertex, key: Infinity});
    }

    while(heap.store.length>0){

        let w= heap.extract();
        checked.add(w.vertex);
        distances.set(w.vertex,w.key);

        if(heap.store.length===0){break;}
        let relatedEdges = edges.filter(a=>(a[0]===w.vertex && !checked.has(a[1])));

        for (let edge of relatedEdges){
            let y = edge[1];
            let indexToDelete = heap.indices.get(y);
            
            let vertexToUpdate = heap.store[indexToDelete];

            heap.delete(indexToDelete);
            vertexToUpdate.key=Math.min(vertexToUpdate.key,distances.get(edge[0])+edge[2]);
            heap.insert(vertexToUpdate);
            
        }
    }
    return distances; 

}
export {dijkstra,dijkstraHeap};