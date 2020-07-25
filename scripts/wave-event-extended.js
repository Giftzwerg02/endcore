const event = EventType.WaveEvent
const addEvent = require("helpers/add-event")
addEvent(event, waveEventExtended)

var roundCount = 0

function waveEventExtended() {
    roundCount++
    print("Round-Count: " + roundCount)
}