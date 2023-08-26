const UniversalOrbitMap = {
    solvePartOne: (input) => {
        let orbitMap = UniversalOrbitMap.buildOrbitMap(input);
        let orbits = UniversalOrbitMap.countOrbits(orbitMap);
        return orbits;
    },
    solvePartTwo: (input, traveler, destination) => {
        let orbitMap = UniversalOrbitMap.buildOrbitMap(input);
        let travelDistance = UniversalOrbitMap.findTravelDistance(orbitMap, traveler, destination);
        return travelDistance;
    },
    buildOrbitMap: (input) => {
        let orbitMap = {};
        let orbits = input.split("\n");
        let orbiting, orbited;
        orbits.forEach(orbit => {
            objects = orbit.split(")");
            orbiting = objects[1].trim();
            orbited = objects[0].trim();
            if(orbitMap[orbiting] === undefined) {
                orbitMap[orbiting] = {parent: undefined, children: []};
            }
            if(orbitMap[orbited] === undefined) {
                orbitMap[orbited] = {parent: undefined, children: []};
            }
            orbitMap[orbited].children.push(orbiting);
            orbitMap[orbiting].parent = orbited;
        });
        return orbitMap;
    },
    countOrbits: (orbitMap) => {
        let countNextNode = (map, id, count, distance) => {
            count += distance;
            map[id].children.forEach(childId => {
                count = countNextNode(map, childId, count, distance+1);
            });
            return count;
        };
        return countNextNode(orbitMap, "COM", 0, 0);
    },
    findTravelDistance: (orbitMap, traveler, destination) => {
        let result = -1;
        let tryToFindNode = (distance,currentId,fromId) => {
            if(orbitMap[destination].parent === currentId) {
                return distance;
            } 
            if(orbitMap[destination] === currentId) {
                return distance+1;
            }

            orbitMap[currentId].children.forEach(childId => {
                if(childId !== fromId) {
                    result = tryToFindNode(distance+1, childId, currentId);
                    if(result !== -1) {
                        return result;
                    }
                }
            });

            if(result === -1 && orbitMap[currentId].parent !== undefined && orbitMap[currentId].parent !== fromId) {
                result = tryToFindNode(currentId === traveler ? distance : distance+1, orbitMap[currentId].parent, currentId);
            }

            return result;
        }

        return tryToFindNode(0,traveler,'');
    }

};

module.exports = UniversalOrbitMap;