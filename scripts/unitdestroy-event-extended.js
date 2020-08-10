const event = EventType.UnitDestroyEvent
const addEvent = require("helpers/add-event")
const ui = require("lib/ui/scripts/library")
require("lib/ui/scripts/effects")
require("lib/ui/scripts/clicks")
require("lib/ui/scripts/errors")
require("lib/ui/scripts/areas")

addEvent(event, unitDestroyEventExtended)

var unitValues = 
    {
        "dagger": 1,
        "eradicator": 2,
        "revenant": 3,
        "spirit": 4,
        "reaper": 5,
        "eruptor": 6,
        "lich": 7,
        "phantom": 8,
        "fortress": 9,
        "draug": 10,
        "wraith": 11,
        "crawler": 12,
        "titan": 13,
        "ghoul": 14,
        "chaosArray": 15
    }

var coins = 0

function unitDestroyEventExtended(event) {
    const type = event.unit.type
    if(!type) return
    coins += unitValues[type]
}

ui.addTable("side", "coins", client => client.label(prov(() => "Current amount of coins: " + coins)))

Events.on(EventType.ClientLoadEvent, run(() => {
	ui.load()
}))
