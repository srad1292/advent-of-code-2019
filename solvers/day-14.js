const Basics = {
    Fuel: "FUEL",
    Ore: "ORE",
}

class Material {
    constructor(name, multiplier, oreCost) {
        this.name = name;
        this.oreCost = oreCost;
        this.multiplier = multiplier;
    }
    getOreToProduce(amount) {
        return this.oreCost * Math.ceil(amount/this.multiplier);
    }
    toString() {
        if(this.name === Basics.Ore) {
            return `Mult: ${this.multiplier === undefined ? 'X' : this.multiplier} --- Name: ${this.name}`;
        } else {
            return `Mult: ${this.multiplier === undefined ? 'X' : this.multiplier} --- Name: ${this.name} --- OreCost: ${this.oreCost === undefined ? 'X' : this.oreCost}`;
        }
    }
}

class Reaction {
    constructor(inputs, output) {
        this.inputs = [...inputs];
        this.output = output;
    }
    toString() {
        return `${this.inputs.map(input => input.toString()).join(" + ")} = ${this.output.toString()}`;
    }
}

class ReactionChemical {
    constructor(cost, name) {
        this.cost = cost;
        this.name = name;
    }
    toString() {
        return `${this.cost} ${this.name}`;
    }
}

const SpaceFactory = {
    debugPartOne: false,
    debugPartTwo: false,
    debugFactory: false,
    solvePartOne: (input) => {
        const reactionsAndMaterials = SpaceFactory.inputToReactionsAndMaterials(input);
        let reactions = reactionsAndMaterials.reactions;
        if(SpaceFactory.debugPartOne) {
            Object.values(reactions).forEach(reaction => console.log(reaction.toString()));
        }

        let materials = reactionsAndMaterials.materials;
        if(SpaceFactory.debugPartOne) {
            Object.values(materials).forEach(material => console.log(material.toString()));
        }
        let costForFuel = SpaceFactory.findOreCostsForFuel(reactions, materials, 1);
        if(SpaceFactory.debugPartOne) {
            Object.values(materials).forEach(material => console.log(material.toString()));
        }
        return costForFuel;
        
    },
    solvePartTwo: (input) => {
        const reactionsAndMaterials = SpaceFactory.inputToReactionsAndMaterials(input);
        let reactions = reactionsAndMaterials.reactions;
        if(SpaceFactory.debugPartTwo) {
            Object.values(reactions).forEach(reaction => console.log(reaction.toString()));
        }

        let materials = reactionsAndMaterials.materials;
        if(SpaceFactory.debugPartTwo) {
            Object.values(materials).forEach(material => console.log(material.toString()));
        }

        let oreMined = 0;
        let maxOre = 1000000000000;
        let fuelToMake = 4200000;
        let maxTries = 4300000;

        while(oreMined <= maxOre && fuelToMake < maxTries) {
            oreMined = SpaceFactory.findOreCostsForFuel(reactions, materials, fuelToMake);
            fuelToMake++;
        }

        if(SpaceFactory.debugPartTwo) {
            Object.values(materials).forEach(material => console.log(material.toString()));
            console.log("Ore Mined: " + oreMined);
        }
        return fuelToMake > maxTries ? -1 : oreMined <= maxOre ? fuelToMake-1 : fuelToMake-2;
        
    },
    solvePartTwoOld: (input) => {
        const reactionsAndMaterials = SpaceFactory.inputToReactionsAndMaterials(input);
        let reactions = reactionsAndMaterials.reactions;
        if(SpaceFactory.debugPartTwo) {
            Object.values(reactions).forEach(reaction => console.log(reaction.toString()));
            console.log("");
        }

        let materials = reactionsAndMaterials.materials;
        if(SpaceFactory.debugPartTwo) {
            Object.values(materials).forEach(material => console.log(material.toString()));
            console.log("");
        }

        const OreStoppingPoint = 1000000000000;
        let oreMined = 0;
        let fuelProduced = 0;
        let excess = {};
        while(oreMined < OreStoppingPoint) {
            if(SpaceFactory.debugPartTwo && fuelProduced < 4) {
                console.log("Excess when " + fuelProduced + " fuel produced");  
                console.log(excess);
            }
            let response = SpaceFactory.simulateFactory(reactions, materials, excess);
            excess = response.excess;
            oreMined += response.oreProduced;
            if(SpaceFactory.debugPartTwo && fuelProduced < 4) {
                console.log("Ore Mined: " + oreMined + " -- fuel Produced" + fuelProduced);
            }  
            if(oreMined < OreStoppingPoint) {
                fuelProduced++;
            }
        }
        
        
        if(SpaceFactory.debugPartTwo) {
            console.log("");
            Object.values(materials).forEach(material => console.log(material.toString()));
        }

        return fuelProduced;
        
    },
    inputToReactionsAndMaterials: (input) => {
        let materials = {};
        let reactions = {};
        input.split("\n").forEach(line => {
            // line: 10 ORE => 10 A
            line = line.trim();
            let inOut = line.split("=>");
            // inOut: ["10 ORE", "10 A"]

            let outMaterial = inOut[1].trim().split(" "); 
            //outMaterial: ["10", "A"]
            let outName = outMaterial[1].trim();
            let multiplier = parseInt(outMaterial[0].trim())
            let rOutput = new ReactionChemical(multiplier, outName);

            if(reactions[outName] !== undefined) {
                throw new Error("Multiple output with same name");
            }

            let rInput = [];
            rInput = inOut[0].split(",").map(inMaterial => {
                //inMaterial: "10 ORE"
                inMaterial = inMaterial.trim();
                let inName = inMaterial.split(" ")[1].trim();
                let cost = parseInt(inMaterial.split(" ")[0].trim());
                // If ORE is input, add output to basic materials object
                if(inName === Basics.Ore && materials[outName] === undefined) {
                    materials[outName] = new Material(outName, multiplier, cost);
                }
                return new ReactionChemical(cost, inName);
            });

            reactions[outName] = new Reaction(rInput, rOutput);
        });
        
        return {reactions, materials};
    },
    findOreCostsForFuel: (reactions, materials, fuelReactions) => {

        let fuelReaction = reactions[Basics.Fuel];
        if(SpaceFactory.debugFactory){ 
            console.log("Fuel Reaction: " + fuelReaction.toString());
        }
        let basicBlockCounts = SpaceFactory.breakDownReaction({}, {}, reactions, fuelReaction, fuelReactions, materials);

        if(SpaceFactory.debugFactory){ 
            console.log({basicBlockCounts});
        }

        // Go through each count of basic material and get minimum fuel to produce that number of that material
        return Object.keys(basicBlockCounts).reduce((accum, name) => accum+materials[name].getOreToProduce(basicBlockCounts[name]),0);
    },
    breakDownReaction(basicBlockCounts, excess, reactions, reaction, amountRequested, materials) {
        // reactions: inputs, output - both are ReactionChemical
        // ReactionChemical: cost, name
        // Material: name, multiplier, fuelCost

        // Parent: 53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL
        // reaction would be: 1 NVRVD => 8 CXFTF
        // amount requested would be 68
        // Steps
        // If we have extra of output (CXFTF) we could remove from the request amount
        // Calculate reaction multiplier -> We need 9 reactions((amountRequest-excess)/output.cost -> 68/8 = 8.something = 9)
        // Create chemicals - 9 * 8 = 72 
        // Add extra to excess -> Needed 68, made 72, so we have 4 extra (CXFTF)
        // If output is basic material: Add created amount to count of needed basic material
        // Else, call function for each input within reaction using multiplier
        let outName = reaction.output.name;
        if(excess[outName] === undefined) {
            excess[outName] = 0;
        }

        let reactionsNeeded;
        if(excess[outName] > amountRequested) {
            reactionsNeeded = 0;
            excess[outName] = excess[outName]-amountRequested;
        } else {
            reactionsNeeded = amountRequested-excess[outName];
            excess[outName] = 0;
        }

        let reactionMultiplier = Math.ceil(reactionsNeeded / reaction.output.cost);
        let created = reaction.output.cost * reactionMultiplier;
        if(SpaceFactory.debugFactory) {
            console.log("-----");
            console.log(reaction.toString());
            console.log({amountRequested,reactionsNeeded,reactionMultiplier,created,excess,basicBlockCounts});
        }

        excess[outName] = excess[outName] + (created-reactionsNeeded);

        if(materials[outName] !== undefined) {
            if(basicBlockCounts[outName] === undefined) {
                basicBlockCounts[outName] = 0;
            }
            basicBlockCounts[outName] = basicBlockCounts[outName] + created;
        } else {
            reaction.inputs.forEach(input => {
                basicBlockCounts = SpaceFactory.breakDownReaction(basicBlockCounts, excess, reactions, reactions[input.name], input.cost*reactionMultiplier, materials);
            });
        }


        return basicBlockCounts;
    },
    // Originally for part 2 I thought I could simulate running factory and 
    // Keeping up with excess, and run until max ore reached
    // This worked but was slow
    // Wanted to keep it in though
    simulateFactory: (reactions, materials, excess) => {

        let fuelReaction = reactions[Basics.Fuel];
        if(SpaceFactory.debugFactory){ 
            console.log("Fuel Reaction: " + fuelReaction.toString());
        }
        let basicBlockCounts = SpaceFactory.breakDownReaction({}, excess, reactions, fuelReaction, 1, materials);

        if(SpaceFactory.debugFactory){ 
            console.log({basicBlockCounts});
        }

        // Go through each count of basic material and get minimum fuel to produce that number of that material
        let oreProduced = Object.keys(basicBlockCounts).reduce((accum, name) => accum+materials[name].getOreToProduce(basicBlockCounts[name]),0);
        if(SpaceFactory.debugFactory) {
            console.log("Produced " + oreProduced + " ore");
        }
        return {oreProduced, excess};
    },
}

module.exports = SpaceFactory;