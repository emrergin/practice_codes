import {VillageState,findRoute,roadGraph} from "./prerequisites/robot.js"

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
    
    function betterRobot({place, parcels}, route) {
      if (route.length == 0) {
        let parcelList=[];
        for (let parcel of parcels){
          let routeCand=[];
          if (parcel.place != place) {
              routeCand = findRoute(roadGraph, place, parcel.place);
          } else {
              routeCand = findRoute(roadGraph, place, parcel.address);
          }
         parcelList.push({parcel:parcel,distance:routeCand.length});
        }
        let minDist=parcelList.reduce((a,b)=>a.distance<b.distance? a: b).distance;
        let nextParcels=parcelList.filter(a=>a.distance===minDist);    
        let nextParcel = nextParcels[0].parcel;
    
        if (nextParcel.place != place) {
              route = findRoute(roadGraph, place, nextParcel.place);
        } else {
              route = findRoute(roadGraph, place, nextParcel.address);
        }
      }
      return {direction: route[0], memory: route.slice(1)};
    }
    
    function bestRobot({place, parcels}, route) {
      if (route.length == 0) {
        let parcelList=[];
        for (let parcel of parcels){
          let routeCand=[];
          let pickup=true;
          if (parcel.place != place) {
              routeCand = findRoute(roadGraph, place, parcel.place);
            pickup=true;
          } else {
              routeCand = findRoute(roadGraph, place, parcel.address);
            pickup=false;
          }
         parcelList.push({parcel:parcel,distance:routeCand.length,pickup:pickup});
        }
        let minDist=parcelList.reduce((a,b)=>a.distance<b.distance? a: b).distance;
        let nextParcels=parcelList.filter(a=>{a.distance===minDist && a.pickup}); 
        if (nextParcels.length===0){nextParcels=parcelList.filter(a=>a.distance===minDist);}
        let nextParcel = nextParcels[0].parcel;
    
        if (nextParcel.place != place) {
              route = findRoute(roadGraph, place, nextParcel.place);
        } else {
              route = findRoute(roadGraph, place, nextParcel.address);
        }
      }
      return {direction: route[0], memory: route.slice(1)};
    }
    
    function compareRobots(robot1, memory1, robot2, memory2) {
      // Your code here  
      let toplam1=0;
      let toplam2=0;
      for (let i=0;i<100;i++){
          let randomPath = VillageState.random(10);
    
        toplam1+=runRobot(randomPath,
                      robot1, []);
          toplam2+=runRobot(randomPath,
                      robot2, []);
        
      }
      console.log(toplam1/100,toplam2/100,toplam1>toplam2);
    }
    
    
    for (let si=0;si<10;si++){
        compareRobots(betterRobot, [], bestRobot, []);
    }