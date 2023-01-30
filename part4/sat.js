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

  function testClause(line, values) {
    let value1 = values[Math.abs(line[0])];
    let value2 = values[Math.abs(line[1])];
    if (line[0] < 0) {
      value1 = !value1;
    }
    if (line[1] < 0) {
      value2 = !value2;
    }
    return value1 || value2;
  }

  let satisfiable = false;

  outerloop: while (counter1 < counter1Max) {
    let values = Array(n)
      .fill()
      .map(() => (Math.random() >= 0.5 ? true : false));
    let check = true;
    console.log(counter1);
    counter2 = 0;
    let unsatisfiedIndex = null;
    while (counter2 < counter2Max) {
      console.log(values);
      for (let i = 0; i < n; i++) {
        let currentBool = testClause(lines[i], values);
        if (!currentBool) {
          check = false;
          unsatisfiedIndex = i;
          break;
        }
      }
      if (check) {
        console.log("satisfiable", values);
        satisfiable = true;
        break outerloop;
      }
      let randomIndex = Math.floor(Math.random() * 2);
      values[Math.abs(lines[unsatisfiedIndex][randomIndex])] =
        !values[Math.abs(lines[unsatisfiedIndex][randomIndex])];
      counter2++;
    }
    counter1++;
  }
  if (!satisfiable) {
    console.log("not satisfiable");
  }
}

// papadimitrou("satinput1.txt");
papadimitrou("sattest1.txt");
// papadimitrou("sattest2.txt");
// function convertLineToEdges(line){
//     let twoEdges=[];
//     twoEdges[0]=line
// }

//test1 0 test2 1
// console.log(testClause(lines[0],values));
