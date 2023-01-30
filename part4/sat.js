import { readFileSync } from "fs";

function papadimitrou(filename) {
  let lines = readFileSync(filename, "utf-8")
    .split(`\n`)
    .map((b) => b.split(" ").map(Number));
  let n = lines.length;
  let counter1 = 0;
  let counter1Max = Math.log2(n);
  let counter2 = 0;
  let counter2Max = 2 * n ** 2;

  let satisfiable = false;
  while (counter1 < counter1Max) {
    let values = Array(n)
      .fill()
      .map(() => (Math.random() >= 0.5 ? true : false));
    console.log(counter1);
    counter2 = 0;
    while (counter2 < counter2Max) {
      let unsatisfiedIndex = null;
      for (let i = 0; i < n; i++) {
        let currentBool = testClause(lines[i], values);
        if (!currentBool) {
          unsatisfiedIndex = i;
          break;
        }
      }
      if (unsatisfiedIndex===null) {
        console.log("satisfiable", values);
        satisfiable = true;
        return true;
      }
      let randomIndex = Math.floor(Math.random() * 2);
      values[Math.abs(lines[unsatisfiedIndex][randomIndex])-1] =
        !values[Math.abs(lines[unsatisfiedIndex][randomIndex])-1];
      counter2++;
    }
    counter1++;
  }
  if (!satisfiable) {
    console.log("not satisfiable");
    return false;
  }

  function testClause(line, values) {
    let value1 = values[Math.abs(line[0])-1];
    let value2 = values[Math.abs(line[1])-1];
    if (line[0] < 0) {
      value1 = !value1;
    }
    if (line[1] < 0) {
      value2 = !value2;
    }
    return (value1 || value2);
  } 
}

function parseDataForKosaraju(filename){

}


const t1 = papadimitrou("satinput1.txt");
const t2 = papadimitrou("satinput2.txt");
const t3 = papadimitrou("satinput3.txt");
const t4 = papadimitrou("satinput4.txt");
const t5 = papadimitrou("satinput5.txt");
const t6 = papadimitrou("satinput6.txt");
console.log(t1,t2,t3,t4,t5,t6);
// papadimitrou("sattest1.txt");//0
// papadimitrou("sattest2.txt");//1
// papadimitrou("sattest3.txt");//1