import {readFileSync } from "fs";

let filename = "satinput1.txt";
let lines = readFileSync(filename, 'utf-8').split(`\n`).map(b=>b.split(" ").map(Number));
let n=lines.length;
console.log(lines[0]);

let values= Array(n).fill(true);
function testClause(line,values){
    return values[line[0]]||values[line[1]];
}

console.log(testClause(lines[0],values));