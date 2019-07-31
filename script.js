// ==UserScript==
// @name         GitHub Commit Colors
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  make commit links colored according to their hash
// @author       Ben Berman
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  const links = document.querySelectorAll('.commit-link > tt, .commit-id');

  for (const link of links) {
    let hash = link.innerHTML;
    if (hash.length < 6) {
      continue;
    }

    hash = hash.substr(0, 6);
    link.style.color = `#${hash}`;
    const rgb = parseInt(hash, 16); // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff; // extract red
    const g = (rgb >> 8) & 0xff; // extract green
    const b = (rgb >> 0) & 0xff; // extract blue

    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if (luma > 200) {
      link.style.backgroundColor = '#222';
    }
  }
})();
