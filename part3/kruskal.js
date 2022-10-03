import UnionFind from "./UnionFind.js";

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
];

export function naiveKruskal(G){
    const T = [];
    G.sort((a,b)=>a[2]-b[2]);

    for (let edge of G){
        if(!dfs(T,edge[0]).has(edge[1])){
            T.push(edge);
        }
    }

    return T;
}

export function unionKruskal(G){
    const T = [];
    G.sort((a,b)=>a[2]-b[2]);
    const U = new UnionFind();

    const vertices = Array.from(new Set(G.flatMap(a=>[a[0],a[1]])));
    U.initialize(vertices);

    for (let edge of G){
        if(U.find(edge[0])!==U.find(edge[1])){
            T.push(edge);
            U.union(edge[0],edge[1]);
        }
    }
    return T;

}

function dfs(G,s){
    let dfsStack=[s];
    const isExplored = new Set();
    
    while(dfsStack.length>0){
        let v = dfsStack.pop();
        if(!isExplored.has(v)){
            isExplored.add(v);
            const neighbours = G.filter(a=>a[0]===v ||a[1]===v).map(a=>a[0]===v? a[1]:a[0]);
            for (let vertex of neighbours){
                dfsStack.push(vertex);
            }
        }			
    }

    return isExplored;
}

// console.log(naiveKruskal(test))
// console.log(unionKruskal(test))