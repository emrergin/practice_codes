function randMax(max) {
    return Math.trunc(1E9 * Math.random()) % max;
}

var reel = {
    symbols: [
        "♠", "♥", "♦", "♣", "☺", "★", "☾", "☀"
    ],
    spin() {
        if (this.position == null) {
            this.position = randMax(
                this.symbols.length - 1
            );
        }
        this.position = (
            this.position + 100 + randMax(100)
        ) % this.symbols.length;
    },
    display() {
        if (this.position == null) {
            this.position = randMax(
                this.symbols.length - 1
            );
        }
        return this.symbols[this.position];
    }
};

var slotMachine = {
    reels: [
        // this slot machine needs 3 separate reels
        // hint: Object.create(..)
        Object.create(reel),Object.create(reel),Object.create(reel)
    ],
    spin() {
        this.reels.forEach(function spinReel(reel){
            reel.spin();
        });
    },
    display() {
        function displayPrev(r){
            let posMinus1=r.position-1;
            if (posMinus1===-1){posMinus1=r.symbols.length - 1;}
            return (r.symbols[posMinus1])
        }
        function displayNext(r){
            let posPlus1=r.position+1;
            if (posPlus1===r.symbols.length){posPlus1=0;}
            return (r.symbols[posPlus1])
        }
        // TODO
        console.log(this.reels.map(displayPrev));
        console.log(this.reels.map(a=>a.display()));
        console.log(this.reels.map(displayNext));
            

    }
};

slotMachine.spin();
slotMachine.display();
// ☾ | ☀ | ★
// ☀ | ♠ | ☾
// ♠ | ♥ | ☀

slotMachine.spin();
slotMachine.display();
// ♦ | ♠ | ♣
// ♣ | ♥ | ☺
// ☺ | ♦ | ★