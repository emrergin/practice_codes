import { promises as fsPromises} from 'fs';
import {dijkstra, dijkstraHeap} from './dijkstra.js'

async function asyncReadFile(filename) {
    try {
      const contents = await fsPromises.readFile(filename, 'utf-8');
    
      const arr = contents.split(/\r?\n/).map(a=>a.trim().split(/\t/).map((b,index)=>
      {
        if (index===0){return Number(b);}
        else{
          return b.split(`,`).map(c=>Number(c))
        }
      }));

      
      console.log(`file parsing done.`);

      console.time('dijkstra')
      const m1 = await dijkstra([...arr],1);
      console.timeEnd('dijkstra')

      console.time('dijkstraHeap')
      const m2 = await dijkstraHeap([...arr],1);
      console.timeEnd('dijkstraHeap');

      
      const mapsAreEqual = (m1, m2) => Array.from(m1.keys()).every((key) => (m1.get(key) === m2.get(key)));

      console.log(mapsAreEqual(m1,m2));
      console.log(m1.size===m2.size);

      Array.from(m1.keys()).forEach(key=>
        {if(m1.get(key)!==m2.get(key)){
          console.log(key,m1.get(key),m2.get(key))
        }}
      )
  
    } catch (err) {
      console.log(err);
    }
  }
  
  asyncReadFile('./problem10.8.txt');