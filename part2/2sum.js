import { promises as fsPromises} from 'fs';
async function asyncReadFile(filename, interval) {
    try {
      const contents = await fsPromises.readFile(filename, 'utf-8');
    
      const arr = contents.split(/\r?\n/).map(a=>+a.trim());
      console.log(`file parsing done.`);
    //   console.log(arr);
    
      let counter =0;
      for (let tar of interval){
        if (twoSum(arr,tar)){counter++;}
      }

      console.log(counter);
    } catch (err) {
      console.log(err);
    }
}

function twoSum(array,target){
    const H = new Map();

    for (let num of array){
        H.set(num,true);
    }

    for (let num of array){
        if (H.get(target-num) && (target-num!== num)){
            return true;
        }
    }
    return false;
}

function getInterval(start,end){
    return Array.from({length:end-start+1},(a,index)=>start+index)
}

asyncReadFile(`./problem12.3.test.txt`,getInterval(3,10))

asyncReadFile(`./problem12.3.txt`,getInterval(-10000,10000))