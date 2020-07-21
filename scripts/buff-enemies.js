const allBuffs = { healthFactor: 1.5, speedFactor: 1.5 };

const specificBuffs = {
    dagger: { health: 260, speed: 0.3, maxVelocity: 1.5 },
    crawler: { health: 200, speed: 10, maxVelocity: 5 },
    eruptor: { health: 1300, speed: 0.2, maxVelocity: 0.5 },
    lich: { health: 20000, speed: 0.01, maxVelocity: 0.5 },
    eradicator: { health: 30000, speed: 0.1, maxVelocity: 0.5 },
};


function getAllUnits(){
    return Object.keys(UnitTypes).map(name => UnitTypes[name]);
}

function buffAllUnits(buff){
    getAllUnits().forEach(unit => {
        unit.health *= buff.healthFactor;
        unit.speed *= buff.speedFactor;
    });
}

function buffSpecific(name, buff){
    const unit = UnitTypes[name];

    Object.keys(buff).forEach( stat =>
        unit[stat] = buff[stat]
    );
}

function executeBuffs(){
    buffAllUnits(allBuffs);

    Object.keys(specificBuffs)
        .forEach(e => buffSpecific(e, specificBuffs[e]));
}


executeBuffs()