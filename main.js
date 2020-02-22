const roleHarvester = require("role.harvester");
const roleUpgrader = require("role.upgrader");
const roleBuilder = require("role.builder");
// const roleMiner = require('role.miner')

module.exports.loop = function() {
  //clear memory
  for (let name in Memory.creeps) {
    if (Game.creeps[name] == undefined) {
      delete Memory.creeps[name];
    }
  }

  // var tower = Game.getObjectById('f3aec81a1f44b2194b56e282');
  // if(tower) {
  //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
  //         filter: (structure) => structure.hits < structure.hitsMax
  //     });
  //     if(closestDamagedStructure) {
  //         tower.repair(closestDamagedStructure);
  //     }

  //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  //     if(closestHostile) {
  //         tower.attack(closestHostile);
  //     }
  // }

  for (let name in Game.creeps) {
    let creep = Game.creeps[name];
    if (creep.memory.role == "harvester") {
      roleHarvester.run(creep);
    }
    if (creep.memory.role == "upgrader") {
      roleUpgrader.run(creep);
    }
    if (creep.memory.role == "builder") {
      roleBuilder.run(creep);
    }
    // if (creep.memory.role == "miner") {
    //     roleBuilder.run(creep);
    // }
  }

  let minimumNumberOfHarvesters = 4;
  let numberOfHarvesters = _.sum(
    Game.creeps,
    c => c.memory.role == "harvester"
  );
  let minimumNumberOfUpgraders = 4;
  let numberOfUpgraders = _.sum(Game.creeps, c => c.memory.role == "upgrader");
  let minimumNumberOfBuilders = 3;
  let numberOfBuilders = _.sum(Game.creeps, c => c.memory.role == "builder");

  let name = undefined;

  /* //https://docs.screeps.com/api/#Constants
    BODYPART_COST
    "move": 50,
    "work": 100,
    "attack": 80,
    "carry": 50,
    "heal": 250,
    "ranged_attack": 150,
    "tough": 10,
    "claim": 600
 */

//


  if (numberOfHarvesters < minimumNumberOfHarvesters) {
    name = Game.spawns.BatesMotel.createCreep(
      [WORK, WORK, CARRY, MOVE],
      undefined,
      {
        //300
        role: "harvester",
        dryRun: false
      }
    );
  }
  if (numberOfUpgraders < minimumNumberOfUpgraders) {
    name = Game.spawns.BatesMotel.createCreep(
      [WORK, CARRY, CARRY, MOVE, MOVE],
      undefined,
      {
        //300
        role: "upgrader",
        dryRun: false
      }
    );
  }
  if (numberOfBuilders < minimumNumberOfBuilders) {
    name = Game.spawns.BatesMotel.createCreep(
      [WORK, WORK, CARRY, MOVE],
      undefined,
      {
        //300
        role: "builder",
        dryRun: false
      }
    );
  }

  if (!(name < 0)) {
    console.log("Spawned new creep", name);
  }
  console.log("Builder count:", numberOfBuilders);
  console.log("Upgrader count:", numberOfUpgraders);
  console.log("Harvester count:", numberOfHarvesters);

let messaged = 0
  if (
    numberOfHarvesters == 4 &&
    numberOfUpgraders == 4 &&
    numberOfHarvesters == 3 &&
    messaged === 0
  ) {
      
    Game.notify("We made it, baby.", [0])
    messaged = 1
  }
};
