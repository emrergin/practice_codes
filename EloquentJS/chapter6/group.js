
export default class Group {
	constructor() {
		this.elements=[];
	}
	add(b) {
		if (this.elements.indexOf(b)===-1){this.elements.push(b)}
	}
	delete(b) {
		if (this.elements.indexOf(b)!==-1){this.elements.splice(this.elements.indexOf(b),1)}
	}
	has (b) {
		return this.elements.indexOf(b)!==-1
	}
	
	static from(iterable) {
		let sonuc = new Group();
		for (let item of iterable){
			sonuc.add(item);
		}
		return sonuc;
	}
}

// let group = Group.from([10, 20]);
// console.log(group.has(10));
// console.log(group.has(30));
// group.add(10);
// group.delete(10);
// console.log(group.has(10));