export default class SearchTree{
    constructor(){
        this.root=null;
    }

    search(k){
        let currentNode = this.root;
        while(currentNode){
            if (currentNode.key === k){
                return currentNode;
            }
            if (k <= currentNode.key){
                currentNode = currentNode.leftChild;
            }
            if (k > currentNode.key){
                currentNode = currentNode.rightChild;
            }
        }
        return currentNode;
    }

    max (startNode = this.root){
        let currentNode = startNode;
        while(currentNode.rightNode){
            currentNode = currentNode.rightNode;
        }
        return currentNode;
    }

    min (startNode = this.root){
        let currentNode = startNode;
        while(currentNode.leftchild){
            currentNode = currentNode.leftchild;
        }
        return currentNode;
    }

    predecessor(object){
        const maximumLeftOfSubtree = this.max(object.leftChild);
        if(maximumLeftOfSubtree){return maximumLeftOfSubtree;}

        let currentNode =  object;
        let parentNode = object.parent;

        while(parentNode){
            if(parentNode.rightChild === currentNode){
                return parentNode;
            }
            currentNode = parentNode;
        }
        return null;
    }

    successor(object){
        const maximumOfRightSubtree = this.min(object.rightChild);
        if(maximumOfRightSubtree){return maximumOfRightSubtree;}

        let currentNode =  object;
        let parentNode = object.parent;

        while(parentNode){
            if(parentNode.leftChild === currentNode){
                return parentNode;
            }
            currentNode = parentNode;
        }
        return null;
    }

    outputSorted(startNode=this.root){
        if (startNode){
            this.outputSorted(startNode.leftChild);
            console.log(startNode?.key);
            this.outputSorted(startNode.rightChild);
        }
    }

    outputTree(startNode=this.root,level=0){
        if (startNode){            
            console.log("-".repeat(level)+startNode.key,startNode.size);
            this.outputTree(startNode.leftChild,level+1);
            this.outputTree(startNode.rightChild,level+1);
        }
    }

    insert(key){
        const object = new treeNode(key);
        let currentNode = this.root;
        while(currentNode){
            
            currentNode.size+=1;
            if (currentNode.key>=key){
                if (currentNode.leftChild === null){
                    currentNode.leftChild = object;
                    object.parent=currentNode;
                    return;
                }
                currentNode = currentNode.leftChild;
            }
            else if (currentNode.key<key){
                if (currentNode.rightChild === null){
                    currentNode.rightChild = object;
                    object.parent=currentNode;
                    return;
                }
                currentNode = currentNode.rightChild;
            }
        }
        this.root = object;
    }

    delete(key){
        const itemToDelete = this.search(key);
        if (!itemToDelete) {return;}
        const parentNode = itemToDelete.parent;

        while((itemToDelete.leftChild && !itemToDelete.rightChild) || (!itemToDelete.leftChild && itemToDelete.rightChild)){
            const itemToSwitch = this.predecessor(itemToDelete.leftChild);
            const parent1 = itemToSwitch.parent;
            const child1 = itemToSwitch.leftChild;
            const size1= itemToSwitch.size;
            const parent2 = itemToDelete.parent;
            const child2 = itemToDelete.leftChild;
            const child3 = itemToDelete.rightChild;
            const size2= itemToDelete.size;

            itemToDelete.parent = parent1;
            itemToDelete.leftChild= child1;
            itemToDelete.size= size1;
            itemToSwitch.parent=parent2;
            itemToSwitch.leftChild=child2;
            itemToSwitch.rightChild=child3;
            itemToSwitch.size=size2;
        }

        if(!itemToDelete.leftChild && !itemToDelete.rightChild){
            if(parentNode.leftChild===itemToDelete){
                parentNode.leftChild=null;
                parentNode.size-=1;
            }
            else{
                parentNode.rightChild=null;
                parentNode.size-=1;
            }
            return;            
        }
    }

    select(i, startNode=this.root){
        let j = startNode?.leftChild?.size || 0;
        if (i===j+1){
            return startNode;
        }
        if (i<j+1){
            return this.select(i,startNode.leftChild);
        }
        if(i>j+1){
            return this.select(i-j-1,startNode.rightChild);
        }
    }


}

class treeNode{
    constructor (key){
        this.parent = null;
        this.leftChild=null;
        this.rightChild = null;
        this.key=key;
        this.size=1;
    }
}