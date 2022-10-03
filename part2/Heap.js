export default class Heap{
    constructor(listedProperty,type=`min`){
        this.store=[];
        this.listedProperty=listedProperty;
        this.indices = new Map();
        this.comparison = type===`min`? (a,b)=>a<b : (a,b)=>a>b;
        return this;
    }

    insert(newElement){

        this.store.push(newElement);
        this.indices.set(newElement[`${this.listedProperty}`], this.store.length-1);
        this.heapifyAbove(this.store.length-1,newElement);
    }

    extract(){        
        const output = this.store[0];
        this.indices.delete(this.store[0][`${this.listedProperty}`]);

        const lastElement = this.store.pop();
        if (this.store.length===0){return lastElement;}        
        
        this.heapifyBelow(0, lastElement);

        return output; 
    }

    delete(index){
        this.indices.delete(this.store[index][`${this.listedProperty}`]);
        const lastElement = this.store.pop();
        if (this.store.length===0){return;}        

        this.heapifyBelow(index, lastElement);
        this.heapifyAbove(index, this.store[index]);
    }

    heapifyBelow(startingIndex, relocatedElement){
        this.store[startingIndex] =  relocatedElement;
        this.indices.set(relocatedElement[`${this.listedProperty}`], startingIndex);
        let i = startingIndex;
        let childLocation1 = 2*(i+1)-1;
        let childLocation2 = 2*(i+1);
        let minChild=childLocation1;
        if (this.comparison(this.store[childLocation2]?.key,this.store[childLocation1]?.key)){
            minChild =  childLocation2;       
        }

        while(this.store[minChild] && this.comparison(this.store[minChild].key,relocatedElement.key)){
                
            [this.store[minChild],this.store[i]]=
                [this.store[i],this.store[minChild]];

            this.indices.set(relocatedElement[`${this.listedProperty}`], minChild);
            this.indices.set(this.store[i][`${this.listedProperty}`], i);
            i = minChild;

            childLocation1 = 2*(i+1)-1;
            childLocation2 = 2*(i+1);
            
            minChild=childLocation1;
            if (this.comparison(this.store[childLocation2]?.key,this.store[childLocation1]?.key)){
                minChild =  childLocation2;       
            }
        }    
    }

    heapifyAbove(startingIndex, relocatedElement){
        let i = startingIndex;
        let parentLocation = Math.floor((i+1)/2)-1;

        while(this.store[parentLocation] && this.comparison(relocatedElement.key,this.store[parentLocation].key)){
                
            [this.store[parentLocation],this.store[i]]=
                [this.store[i],this.store[parentLocation]];

            this.indices.set(relocatedElement[`${this.listedProperty}`], parentLocation);
            this.indices.set(this.store[i][`${this.listedProperty}`], i);
            i=parentLocation;
            parentLocation = Math.floor((i+1)/2)-1;
        } 
    }

    get length() {
        return this.store.length;
    }
}