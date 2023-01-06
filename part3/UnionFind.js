export default class UnionFind{
    constructor(){
        this.store=[];
        this.indices = new Map();
        return this;
    }

    initialize(arr){
        let index=0;
        for(let row of arr){
            this.store.push({self:row,parent:row,size:1});
            this.indices.set(row,index);
            index++;
        }
    }

    find(index){
        let currentNode = this.store[index];
        let currentParent = currentNode.parent;

        while(currentParent!==currentNode.self){
            currentNode=this.store[this.indices.get(currentParent)];
            currentParent = currentNode.parent;
        }

        return currentNode;
    }

    union(index1,index2){
        let firstParent = this.find(index1);
        let secondParent = this.find(index2);

        if(firstParent===secondParent){return;}

        if(firstParent>=secondParent){
            secondParent.parent=firstParent.self;
            firstParent.size += secondParent.size;
        }
        else{
            firstParent.parent=secondParent.self;
            secondParent.size += firstParent.size;
        }
    }

}