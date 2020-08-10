function addEvent(event, callback) {
    const c = new Cons({ 
        get: function(e) { 
            callback(e)
        } 
    })
    Events.on(event, c)
}

module.exports = addEvent