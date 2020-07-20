function addEvent(event, callback) {
    const c = new Cons({ 
        get: function() { 
            callback()
        } 
    })
    Events.on(event, c)
}

module.exports = addEvent