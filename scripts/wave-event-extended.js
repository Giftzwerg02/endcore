const event = EventType.WaveEvent
const addEvent = require("helpers/add-event")
addEvent(event, () => print("WAVE EVENT TRIGGERED"));