class PGroup {
	constructor(elements) {
		this.elements=elements;      	
	}
	add(b) {
    	return new PGroup([...this.elements,b]);
	}
	delete(b) {
      	if (this.elements.indexOf(b)!== -1){
         return new PGroup([...this.elements.slice(0,this.elements.indexOf(b)),
                            ...this.elements.slice(this.elements.indexOf(b)+1)]);  
        }
		return new PGroup(this.elements);
	}
	has (b) {
		return this.elements.indexOf(b)!==-1
	}
	
}

PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
console.log(a.has("b"));
console.log(b.has("a"));