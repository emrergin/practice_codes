import {readFileSync } from "fs";

function greedyTSP(filename){
    let lines = readFileSync(filename, 'utf-8').split(`\n`).map(b=>b.split(" ").map(Number));
    let vertices = lines.map(a=>({index:+a[0],x:+a[1],y:+a[2]}));
    let n = lines.length; 

    let pathLength=0;
    let startingCity =structuredClone(vertices[0]);
    let currentCity=startingCity;
    let visitedCities = new Set([1]);
    while(visitedCities.size<n){
        vertices = vertices.filter(a=>!visitedCities.has(a.index));
        let minimumDistance=Infinity;
        let nextCity=null;
        for(let city of vertices){
            let currentDistance = distanceBetweenTwoPoints(currentCity,city);
            if(currentDistance<minimumDistance){
                minimumDistance=currentDistance;
                nextCity=city;
            }
            if(currentDistance===minimumDistance){
                if(city.index<nextCity.index){
                    nextCity=city;
                }
            }
        }
        currentCity=nextCity;
        visitedCities.add(nextCity.index);
        pathLength+=minimumDistance;
    }

    function euclidean(x1,y1,x2,y2){
        return Math.hypot((x1-x2),(y1-y2));
    }

    function distanceBetweenTwoPoints(point1,point2){
        return euclidean(point1.x,point1.y,point2.x,point2.y);
    }

    console.log(pathLength+distanceBetweenTwoPoints(currentCity,startingCity));
}

greedyTSP('tsphuge.txt');