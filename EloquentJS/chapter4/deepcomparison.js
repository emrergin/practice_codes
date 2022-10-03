function deepEqual(a,b){
	if ((a==b)&&a==null){return true;}
	else{
		if (typeof a !== typeof b){return false;}
		else{
			if (typeof a !== `object`){
				return (a===b);
			}
			else
			{
				for (let key in a){
                    if (typeof a[key]===`object` && typeof b[key]===`object`){
                        if (!deepEqual(a[key],b[key])){return false;}
                    }
					else if (a[key]!==b[key]){
                        return false;                    
                    }
				}
				return true;
			}
		}
	}
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));