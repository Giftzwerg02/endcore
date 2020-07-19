function saveRequire(script) {
    try {
        require(script)
    } catch (EvaluatorException) {
        print("[WARNING] Couldn't find module with the name [" + script + "]. Continuing without it...")
    }
}

print("Loading subscripts")

// Buff all enemies
saveRequire("buff-enemies")
saveRequire("aofjieowajf")

print("Reading files...")