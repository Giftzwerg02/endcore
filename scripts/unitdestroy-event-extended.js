const event = EventType.UnitDestroyEvent
const addEvent = require("helpers/add-event")
const ui = require("helpers/ui")
const units = require("helpers/unitlist")

units.dagger.coinValue = 1
units.eradicator.coinValue = 2
units.revenant.coinValue = 3
units.spirit.coinValue = 4
units.reaper.coinValue = 5
units.eruptor.coinValue = 6
units.lich.coinValue = 7
units.phantom.coinValue = 8
units.fortress.coinValue = 9
units.draug.coinValue = 10
units.wraith.coinValue = 11
units.crawler.coinValue = 12
units.titan.coinValue = 13
units.ghoul.coinValue = 14
units.chaosArray.coinValue = 15

addEvent(event, unitDestroyEventExtended)

var coins = 0

function getEnemyValue(type) {
    if(units[type])
        return units[type].coinValue
    else
        return 0
}

function unitDestroyEventExtended(event) {
    const type = event.unit.type
    const coinsToAdd = getEnemyValue(type)
    coins += coinsToAdd
}

ui.addTable(
    "side", 
    "coins", 
    table => table.label(prov(() => "Current amount of coins: " + coins))
)

Events.on(EventType.ClientLoadEvent, run(() => {
	ui.load()
}))
