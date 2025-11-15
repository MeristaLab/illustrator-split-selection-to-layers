// ------------------------------------------------------------
// splitSelectionToLayers.jsx
// Version: 1.0.0
// Last Update: 2025-11-13
// Developer: Merista Lab/Yamaguchi
//
// Description:
// Illustrator utility that separates selected objects into
// individual top-level layers. A user-defined object name
// (item.name or item.note) is applied to the layer when present.
// Default Illustrator labels ("Path", "パス", auto-generated names)
// are ignored and the layer name remains unchanged.
// ------------------------------------------------------------

var doc = app.activeDocument;

// Debug flag
var DEBUG_LOG = false;

function dbgLog(msg){
    if (DEBUG_LOG) $.writeln(String(msg));
}

// ============================================================
// ① getSelectionStatus(doc)
// ============================================================
function getSelectionStatus(targetDoc) {
    var result = {};
    var sel = targetDoc.selection;

    if (sel.length === 0) {
        result.count = 0;
        return result;
    }

    result.count = sel.length;
    result.first = sel[0];

    return result;
}


// ============================================================
// ② createNewLayerNear(baseLayer)
// ============================================================
function createNewLayerNear(baseLayer) {
    var newLayer = doc.layers.add();
    newLayer.move(baseLayer, ElementPlacement.PLACEAFTER);
    return newLayer;
}


// ============================================================
// ③ moveSingleItemToLayer(targetItem, targetLayer)
// ============================================================
function moveSingleItemToLayer(targetItem, targetLayer) {
    targetItem.move(targetLayer, ElementPlacement.PLACEATBEGINNING);
}


// ============================================================
// ④ decideLayerLabel(newLayer, item)
//     Assign a layer name ONLY if the item actually has a
//     user-defined name visible in Illustrator's UI.
//     - For PathItem: name is empty → check note
//     - If both name and note are empty → do not rename
// ============================================================
function decideLayerLabel(newLayer, item) {
    var raw = "";

    // Illustrator UI-visible name:
    //   - Groups, Text, Symbols → item.name contains user label
    //   - PathItem normally has "" → fallback to .note
    if (item.name !== undefined && item.name !== "") {
        raw = item.name;
    } else {
        raw = item.note;
    }

    // Clean up
    var cleaned = raw.replace(/^\s+/, "").replace(/\s+$/, "");

    // If empty → treat as "default object label" → do NOT rename layer
    if (cleaned === "") {
        dbgLog("Layer name not changed (default Illustrator label).");
        return;
    }

    newLayer.name = cleaned;
    dbgLog("Layer renamed to: " + cleaned);
}


// ============================================================
// ⑤ runScript()
// ============================================================
function runScript() {
    var status = getSelectionStatus(doc);
    if (status.count === 0) {
        alert("No objects selected.");
        dbgLog("No objects selected.");
        return;
    }

    var sel = doc.selection;

    // --------------------------------------------------------
    // Single selection
    // --------------------------------------------------------
    if (status.count === 1) {
        var baseLayer = status.first.layer;
        var newLayer = createNewLayerNear(baseLayer);

        sel[0].move(newLayer, ElementPlacement.PLACEATBEGINNING);

        decideLayerLabel(newLayer, sel[0]); // Always try rename

        dbgLog("Moved the object to a new layer.");
        return;
    }

    // --------------------------------------------------------
    // Multiple selection (process in reverse order)
    // --------------------------------------------------------
    for (var i = sel.length - 1; i >= 0; i--) {

        var item = sel[i];
        var base = item.layer;

        var newL = createNewLayerNear(base);

        moveSingleItemToLayer(item, newL);

        decideLayerLabel(newL, item);
    }

    dbgLog("Separated selected objects into individual layers.");
}


// ------------------------------------------------------------
// Execute
// ------------------------------------------------------------
runScript();
