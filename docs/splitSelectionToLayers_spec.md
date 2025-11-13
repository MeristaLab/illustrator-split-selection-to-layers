# splitSelectionToLayers.jsx — Specification  
Version: v1.0.0  
Last Updated: 2025-11-13  
Author: Merista Lab / Yamaguchi  

---

## 1. Overview  
`splitSelectionToLayers.jsx` is a utility script for Adobe Illustrator that  
automatically separates selected objects into **individual top-level layers**.


A user-defined object name (as shown in Illustrator's UI) is applied to the new  
layer only when it actually exists.  

Default Illustrator labels such as “Path” or “パス ○○” cannot be retrieved  
through scripting, therefore they are treated as unnamed and the layer name  
remains as Illustrator’s automatic default.

---

## 2. Feature Summary

### ● Single Selection  
- Creates one new layer directly above the original layer  
- Moves the selected object into that layer  
- Applies the object's UI-defined name only when it exists  
- If no name exists, the layer name is not changed

### ● Multiple Selection  
- Processes items in reverse order to preserve the visual stacking order  
- Creates a dedicated new layer for each selected object  
- Applies object names only when available  
- Keeps automatic layer names when objects have no user-defined name

---

## 3. Naming Logic

### ● Cases where the object is considered “named”  
- `item.name` contains a user-defined label (Group, TextFrame, Symbol, etc.)  
- `item.note` contains a user-defined name for PathItem

### ● Cases where the object is considered “unnamed”  
- `item.name` is an empty string  
- `item.note` is empty  
→ Layer name remains unchanged (default Illustrator name)

---

## 4. Internal Structure (Function List)

| Function Name          | Role                                         |
|------------------------|----------------------------------------------|
| getSelectionStatus     | Returns selection count and first selected item |
| createNewLayerNear     | Creates a new layer above the base layer       |
| moveSingleItemToLayer  | Moves a single object to a target layer        |
| decideLayerLabel       | Determines and applies a layer name            |
| runScript              | Controls the entire execution flow             |

---

## 5. ES3 / ExtendScript Compliance  
- All variables use `var`  
- Uses `replace()` instead of `trim()`  
- Disallows `let`, `const`, `class`, `map`, `JSON`, `eval`, etc.  
- Structured for easy extension to AE/PS scripting environments

---

## 6. Intended Use Cases  
- Organizing complex layer structures  
- Preparing artwork for animation workflows (AE / Lottie)  
- Separating large numbers of paths  
- Automating Illustrator-based production pipelines

---

## 7. License  
MIT License  
(Free for commercial use, modification, and redistribution)
