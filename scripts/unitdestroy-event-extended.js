const event = EventType.UnitDestroyEvent
const addEvent = require("helpers/add-event")

addEvent(event, unitDestroyEventExtended)

var unitsDestroyed = 0

function unitDestroyEventExtended() {
    unitsDestroyed++
    print("Units destroyed: " + unitsDestroyed)
}