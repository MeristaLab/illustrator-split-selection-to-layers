# Illustrator: Split Selected Objects into Individual Layers

**splitSelectionToLayers.jsx**
by Merista Lab

This repository contains the source code for the Illustrator script “Selection to Layer”.

---

## **Overview**

`splitSelectionToLayers.jsx` is a utility script for Adobe Illustrator that automatically distributes selected objects into **individual top-level layers**.

* Single selection → one new layer
* Multiple selections → one new layer per object
* Layer names are applied **only when the object has a user-defined name**
* Illustrator’s auto-generated names (e.g., “Path”, “パス”) are ignored
* Reverse-order processing preserves the correct stacking order

---

## **Features**

* Lightweight and simple
* Fully compatible with Illustrator's layer behavior
* Extendable structure for AE / PS automation
* ES3 / ExtendScript compliant
* Can be exported as JSXBIN (ideal for BOOTH distribution)

---

## **Installation**

1. Download `splitSelectionToLayers.jsx`
2. In Illustrator:
   **File → Scripts → Other Script…**
3. Select and run the JSX file

---

## **Requirements**

* Illustrator CS6–CC
* Windows / macOS
* ExtendScript / ES3 environment

---

## **License**

MIT License

---

## **Author**

**Merista Lab / Yamaguchi**
Developer of Adobe automation and workflow tools.