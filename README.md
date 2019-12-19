## Paper.js Bug Demo

This repo is a demonstration of a bug I found while using Paper.js.
It only appears in Windows and MacOS (Firefox and Chrome).

Please take a look at https://github.com/paperjs/paper.js/issues/1749

- This bug appears in Windows and MacOS (Chrome, Safari, Firefox), this bug does not appear in any Linux (Chrome, Firefox) (Ubuntu or Arch Linux).
- The red with black outline 'boxes' are out of position. When resizing the browser window in my application the boxes snap back into position, and jump out of position again when navigating. From this I assume there is some rendering issue with Paper.js.
- The blue/white 'selected' line represents the actual position of the paths (see next point)
`paper.project.activeLayer.children[0].exportJSON()` gives the same result regardless of zoom / navigation / window resize.
- This seems to be a problem with importJSON(), specifically using paper.project.activeLayer.importJSON(mock) results in broken rendering of some Paper.js items and not others

Specs:

- Paper.js 0.12.2

Most of the codee is based off [OpenSeadragonPaperjsOverlay](https://github.com/eriksjolund/OpenSeadragonPaperjsOverlay) by eriksjolund
