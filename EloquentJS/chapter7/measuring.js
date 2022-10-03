import {routeRobot,goalOrientedRobot,randomPick,roadGraph} from "./prerequisites/robot.js"

function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
    if (state.parcels.length == 0) {
    return turn;
    break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    }
    }
    
    class VillageState {
      constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
      }
    
      move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
          return this;
        } else {
          let parcels = this.parcels.map(p => {
            if (p.place != this.place) return p;
            return {place: destination, address: p.address};
          }).filter(p => p.place != p.address);
          return new VillageState(destination, parcels);
        }
      }
       
      static random(parcelCount = 5) {
          let parcels = [];
          for (let i = 0; i < parcelCount; i++) {
            let address = randomPick(Object.keys(roadGraph));
            let place;
            do {
              place = randomPick(Object.keys(roadGraph));
            } while (place == address);
            parcels.push({place, address});
          }
          return new VillageState("Post Office", parcels);
        };
    }
    
    function compareRobots(robot1, memory1, robot2, memory2) {
      // Your code here  
      let toplam1=0;
      let toplam2=0;
      for (let i=0;i<100;i++){
          let randomPath = VillageState.random();
    
        toplam1+=runRobot(VillageState.random(),
                      robot1, []);
          toplam2+=runRobot(VillageState.random(),
                      robot2, []);
        
      }
      console.log(toplam1/100,toplam2/100);
}
    
    
    
compareRobots(routeRobot, [], goalOrientedRobot, []);