import SCRIPTS from "./scripts.js"

function dominantDirection(text) {
	function countBy(items, groupName) {
      let counts = [];
      for (let item of items) {
        let name = groupName(item);
        let known = counts.findIndex(c => c.name == name);
        if (known == -1) {
          counts.push({name, count: 1});
        } else {
          counts[known].count++;
        }
      }
      return counts;
	}

    function characterScript(code) {
        for (let script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => {
            return code >= from && code < to;
        })) {
            return script;
        }
        }
        return null;
    }
  
    let resultAdayi= countBy(text.split(``).map(a=>a.charCodeAt(0)),a=>characterScript(a)?.direction);   
    resultAdayi = resultAdayi.reduce((prev,curr)=>prev.count>curr.count? prev:curr,{name:`undefined`,count:0}); 
    // console.log(resultAdayi);
    return resultAdayi.name;

}

console.log(dominantDirection("Hello!"));
console.log(dominantDirection("Hey, مساء الخير"));

