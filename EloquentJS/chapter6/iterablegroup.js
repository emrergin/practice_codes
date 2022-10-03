import Group from "./group.js";

class GroupIterator {
	constructor(group) {
		this.index = 0
		this.group = group.elements;
	}
	next() {
		if (this.index == this.group.length) return {done: true};
		let value = this.group[this.index];
		this.index++
		return {value, done: false};
	}
}

Group.prototype[Symbol.iterator] = function() {
	return new GroupIterator(this);
};

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}