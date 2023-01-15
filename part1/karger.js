import {readFileSync } from "fs";
import UnionFind from "../part3/UnionFind.js";

let lines = readFileSync(`testmincut.txt`, 'utf-8')
                .split(`\n`);

const dataLength=lines.length;
                
lines= lines.map(a=>a.trim().split(/[ \t]/)
                .reduce((acc,curr,index,arr)=>{
                    if(index>0){
                        acc.push([arr[0],curr])
                    }
                    return acc;
                },[])).flatMap(a=>a);


let minimumCut=Number.MAX_SAFE_INTEGER;
let necessaryTimes = Math.ceil(combinations(dataLength,2)*Math.log(dataLength));
for(let i=0;i<necessaryTimes;i++){

    let ongoingEdges=[...lines];
    let vertices = new Set(ongoingEdges.map(a=>a[0]));

    const U = new UnionFind();
    let numberOfVertices=vertices.size;
    U.initialize(vertices);

    while(numberOfVertices>2){
        const randomIndex = Math.floor(Math.random()*ongoingEdges.length);
        const randomEdge = ongoingEdges[randomIndex];

        if(U.find(U.indices.get(randomEdge[0])).self===U.find(U.indices.get(randomEdge[1])).self){
            continue;
        }
        ongoingEdges=ongoingEdges.map(a=>{
            if(a[1]===randomEdge[1]){
                return ([a[0],U.find(U.indices.get(randomEdge[0])).self])
            }
            else{
                return a;
            }
        });        
        
        U.union(U.indices.get(randomEdge[0]),U.indices.get(randomEdge[1]));
        numberOfVertices--;
        ongoingEdges=ongoingEdges.filter(a=>U.find(U.indices.get(a[0])).self!==U.find(U.indices.get(a[1])).self);

    }
    let counter=0;
    for(let edge of ongoingEdges){
        if(U.find(U.indices.get(edge[0])).self!==U.find(U.indices.get(edge[1])).self){
            counter++;
        }
    }

    if(counter<minimumCut){
        minimumCut=counter;
    }
}
console.log(minimumCut/2);

function product_Range(a,b) {
    var prd = a,i = a;
   
    while (i++< b) {
      prd*=i;
    }
    return prd;
  }
  
  
function combinations(n, r) 
    {
    if (n==r || r==0) 
    {
        return 1;
    } 
    else 
    {
        r=(r < n-r) ? n-r : r;
        return product_Range(r+1, n)/product_Range(1,n-r);
    }
}