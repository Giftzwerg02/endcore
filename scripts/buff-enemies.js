const allBuffs = { healthFactor: 3, speedFactor: 2 };

const specificBuffs = {
    dagger: { health: 500, speed: 0.4, maxVelocity: 1.5 },
    crawler: { health: 300, speed: 20, maxVelocity: 10 },
    eruptor: { health: 3500, speed: 0.2, maxVelocity: 0.5 },
    lich: { health: 35000, speed: 0.01, maxVelocity: 0.5 },
    eradicator: { health: 100000, speed: 0.1, maxVelocity: 0.5 },
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