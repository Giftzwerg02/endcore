const unitDestroyEvent = EventType.UnitDestroyEvent
const playerChatEvent = EventType.PlayerChatEvent
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

var coins = 0
var lastMessage = "none"

addEvent(unitDestroyEvent, onUnitDestroy)
addEvent(playerChatEvent, onPay)

addEvent(EventType.PlayerJoin, e => {

    if(Vars.world.getMap().tags.get("coins") == null) {
        Vars.world.getMap().tags.put("coins", 0)
    }

    coins = Vars.world.getMap().tags.get("coins")
})

function getEnemyValue(type) {
    if(units[type])
        return units[type].coinValue
    else
        return 0
}

// client-sided
function onUnitDestroy(event) {
    const type = event.unit.type
    const coinsToAdd = getEnemyValue(type)
    coins += coinsToAdd
    Vars.world.getMap().tags.put("coins", coins)
}

// server-sided
function onPay(event) {
    const message = event.message
    const player = event.player
    print(eval(message))
    //print("firing event...")
    //Events.fire(new java.lang.String(message))
}

ui.addTable(
    "side", 
    "coins", 
    table => {
        table.label(prov(() => "Current amount of coins: " + coins))
        table.row()
        table.label(prov(() => "Last message entered: " + lastMessage))
    }
)

ui.addButton(
    "pay",
    "../sprites/blocks/questchest.png",
    () => coins -= 10,
    () => {}
)

Events.on(EventType.ClientLoadEvent, run(() => {
	ui.load()
}))
