function saveRequire(script) {
    try {
        return require(script)
    } catch (EvaluatorException) {
        print("[WARNING] Couldn't load module with the name [" + script + "]. Continuing without it...")
    }
}

print("Loading subscripts")
// Buff all enemies
saveRequire("buff-enemies")
saveRequire("wave-event-extended")

print("Reading files...")