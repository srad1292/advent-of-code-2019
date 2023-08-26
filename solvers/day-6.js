// Build a tree
// To count orbits, need to traverse tree 
// count += distance
// foreach chid node -> count += nextNode(count, distance+1)
// return count


class Node {
    constructor(id) {
        this.id = id;
        this.children = [];
    }
    addChild(node) {
        this.children.push(node);
    }
    getChildren() {
        return this.children;
    }
}

const UniversalOrbitMap = {
    // directOrbits: 0,
    // indirectOrbits: 0,
    solvePartOne: (input) => {
        let tree = UniversalOrbitMap.buildTree(input);
        let orbits = UniversalOrbitMap.countOrbits(tree);
        return orbits;
    },
    buildTree: (input) => {
        let nodeMap = {};
        let orbits = input.split("\n");
        let orbiting, orbited;
        orbits.forEach(orbit => {
            objects = orbit.split(")");
            orbiting = objects[1].trim();
            orbited = objects[0].trim();
            if(nodeMap[orbiting] === undefined) {
                nodeMap[orbiting] = new Node(orbiting);
            }
            if(nodeMap[orbited] === undefined) {
                nodeMap[orbited] = new Node(orbited);
            }
            nodeMap[orbited].addChild(nodeMap[orbiting]);
        });
        return nodeMap['COM'];
    },
    countOrbits: (tree) => {
        let countNextNode = (node, count, distance) => {
            count += distance;
            node.getChildren().forEach(child => {
                count = countNextNode(child, count, distance+1);
            });
            return count;
        };
        return countNextNode(tree, 0, 0);
    }

};

module.exports = UniversalOrbitMap;