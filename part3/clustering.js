import {readFileSync } from "fs";
import UnionFind from './UnionFind.js'

let lines = readFileSync(`clustering_small.txt`, 'utf-8')
// let lines = readFileSync(`clustering1_test1.txt`, 'utf-8')
                .split(/\r?\n/).map((a) => a.split(` `).map(b=>+b));

export function clustering(G,k){
    const T = [];
   
    const U = new UnionFind();

    const vertices = Array.from(new Set(G.flatMap(a=>[a[0],a[1]])));
    U.initialize(vertices.sort((a,b)=>a-b));
    G.sort((a,b)=>a[2]-b[2]);

    for (let i=0;i<G.length;i++){
        if(U.find(G[i][0]-1)!==U.find(G[i][1]-1)){
            if(T.length<vertices.length-k){
                T.push(G[i]);
                U.union(G[i][0]-1,G[i][1]-1);
            }
            else{            
                console.log(G[i][2]);
                break;
            }
        }
    }
    return T;
}

clustering(lines,4);