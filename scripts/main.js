function requireAll(scripts, opt) {
    var required = {};
    if(!scripts)
        scripts = []
    if(!opt)
        opt = {sub: ""}
    scripts.forEach(script => required[script] = require(opt.sub + "/" + script));

    required["print"] = () => Object.keys(required).forEach(print)
    return required
}

print("Loading subscripts")

var helpers = requireAll(["add-event"], {sub: "helpers"})

requireAll(["buff-enemies", "wave-event-extended"])

print("Reading files...")