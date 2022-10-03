import Heap from "../part2/Heap.js";


const test = [
    [1, 2, 6],
    [1, 4, 5],
    [1, 5, 4],
    [2, 4, 1],
    [2, 5, 2],
    [2, 3, 5],
    [2, 6, 3],
    [3, 6, 4],
    [4, 5, 2],
    [5, 6, 4]
]
export function naivePrim(G){
    const X = new Set ();
    X.add(1);
    const T = new Set ();

    let filteredEdges = G.filter(edge => (X.has(edge[0])&& !X.has(edge[1]))||(!X.has(edge[0])&& X.has(edge[1])));    

    while (filteredEdges.length>0){

        let minimumCostEdge=filteredEdges.sort((a,b)=>a[2]-b[2])[0];
        if (!X.has(minimumCostEdge[1])){X.add(minimumCostEdge[1]);}
        else{X.add(minimumCostEdge[0]);}
        T.add(minimumCostEdge);
        filteredEdges = G.filter(edge => (X.has(edge[0])&& !X.has(edge[1]))||(!X.has(edge[0])&& X.has(edge[1])));
    }

    return T;
}

export function heapPrim(G){
    const X = new Set();
    X.add(1);
    const T = new Set();
    const H = new Heap(`vertex`);

    const vertices = Array.from(new Set(G.flatMap(a=>[a[0],a[1]])));
    const verticesExceptStart = vertices.filter(a=>a!==1);

    for (let vertex of verticesExceptStart){
        const relatedEdge = G.find(a=>(a[0]===vertex && a[1]===1) ||(a[0]===1 && a[1]===vertex));
        if (relatedEdge){
            H.insert({key: relatedEdge[2], vertex, winner: relatedEdge});
        }
        else{
            H.insert({key:+Infinity, vertex, winner: null})
        }
    }
    let counter =0;
    while (H.store.length>0){
    // while(T.size<vertices.length-1){
        // console.log(`---`)
        let w = H.extract();
        // if (w.key > Math.min(...H.store.map(a=>a.key))){
        //     // console.log(counter);
        //     console.log(w,H.store.filter(a=>a.key<w.key),H.length);
        //     // counter++;
        // }
        
        X.add(w.vertex);
        T.add(w.winner);

        let edgesToUpdateWith = G.filter(a=>((!X.has(a[0]) && a[1]===w.vertex) ||(a[0]===w.vertex && !X.has(a[1]))));

        for (let edge of edgesToUpdateWith){
            let relatedVertex = edge[0] === w.vertex ? edge[1] : edge[0];
            let indexToUpdate = H.indices.get(relatedVertex);
            let vertexToUpdate = H.store[indexToUpdate];

            if (edge[2]< vertexToUpdate.key){
                H.delete(indexToUpdate);
                // console.log(vertexToUpdate);
                vertexToUpdate.key=edge[2];
                vertexToUpdate.winner=edge;
                // console.log(vertexToUpdate);
                H.insert(vertexToUpdate);

                // if(H.store[0].key> Math.min(...H.store.map(a=>a.key))){
                //     console.log(`error`)
                // }
            }            
        }  
    }
    return T;
}

// console.log(Array.from(naivePrim(test)).reduce((prev,curr)=>prev+curr[2],0));
// console.log(heapPrim(test));