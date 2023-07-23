"use strict";(self.webpackChunkodin_battleship_game=self.webpackChunkodin_battleship_game||[]).push([[826],{855:(n,e,t)=>{t.d(e,{g:()=>o});class o{constructor(n,e){this.compGameboard=n,this.playerGameboard=e}getAvailableCells(){return this.playerGameboard.getCells().filter((n=>!1===n.shot))}getNeighborCells(n){return this.playerGameboard.getCells().filter((e=>e.x===(n[0]+1||n[0]-1)&&e.y===n[1]||e.x===n[0]&&(e.y===n[1]+1||e.y===n[1]-1)))}randomPickCell(n){console.log(n);const e=Math.floor(Math.random()*n.length);return console.log(e),n[e]}}},558:(n,e,t)=>{t.d(e,{e:()=>o,u:()=>i});class o{constructor(){this.playerContainer=document.getElementById("player-battlefield-container"),this.compContainer=document.getElementById("comp-battlefield-container"),this.columns=0}createBattlefields(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;const t=document.createElement("div");this.playerContainer.appendChild(t);const o=document.createElement("div");this.compContainer.appendChild(o),this.columns=e;for(let o=0;o<n;o++)for(let n=0;n<e;n++){const e=document.createElement("div");e.classList.add("cell"),e.id=`playerCell[${n}, ${o}]`,e.setAttribute("x",n),e.setAttribute("y",o),t.appendChild(e)}for(let t=0;t<n;t++)for(let n=0;n<e;n++){const e=document.createElement("div");e.classList.add("cell"),e.id=`compCell[${n}, ${t}]`,e.setAttribute("x",n),e.setAttribute("y",t),o.appendChild(e)}}highlightAvailableCells(n){for(const e of n)document.getElementById(`playerCell[${e.x}, ${e.y}]`).classList.add("available")}removeHighlight(){const n=document.querySelectorAll(".available");for(let e of n)e.classList.remove("available")}placeShip(n,e,t){let o=[t];if(arguments.length>3&&void 0!==arguments[3]&&!arguments[3])for(let n=1;n<e;n++)o.push([t[0],t[1]+n]);else for(let n=1;n<e;n++)o.push([t[0]+n,t[1]]);for(const e of o)"Player"===n?document.getElementById(`playerCell[${e[0]}, ${e[1]}]`).classList.add("ship"):document.getElementById(`compCell[${e[0]}, ${e[1]}]`).classList.add("ship")}}class i{constructor(){this.waitForPressResolve,this.x=99,this.y=99}waitForPress(){return new Promise((n=>this.waitForPressResolve=n))}btnResolver(n,e){this.x=n,this.y=e,this.waitForPressResolve&&this.waitForPressResolve()}receivePlacement(n){for(const e of n)document.getElementById(`playerCell[${e.x}, ${e.y}]`).addEventListener("click",(()=>{this.btnResolver(e.x,e.y)}))}removeListener(n){for(const e of n)document.getElementById(`playerCell[${e.x}, ${e.y}]`).removeEventListener("click",this.btnResolver)}async doIt(n){return this.receivePlacement(n),await this.waitForPress(),this.removeListener(n),[this.x,this.y]}}},162:(n,e,t)=>{t.d(e,{V:()=>i});class o{constructor(n){this.size=n,this.timesHit=0,this.sunk=!1}hit(){this.timesHit+=1}isSunk(){return this.timesHit>=this.size}}class i{constructor(){this.rows=0,this.columns=0,this.cells=[],this.ships=[],this.sunkShips=[],this.allShipsSunk=!1}fillCells(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;this.rows=n,this.columns=e;for(let t=0;t<e;t++)for(let e=0;e<n;e++)this.cells.push({x:t,y:e,contains:null,shot:!1})}getCells(){return this.cells}createShips(n){for(let e of n){const n=new o(e);this.ships.push(n)}}getAvailableCellsToPlaceShip(n){let e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.rows,this.columns;const t=this.cells,o=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];function i(n){return o.map((e=>[e[0]+n.x,e[1]+n.y]))}let r=t.filter((n=>!n.contains));return r=function(n){let e=[];for(const o of n){let n=i(o);for(const i of n){const n=t.findIndex((n=>n.x==i[0]&&n.y==i[1]));-1!=n&&t[n].contains&&e.push(o)}}return n.filter((n=>!e.includes(n)))}(r),r=function(t){let o=[];for(let i of t){let r=[];if(!0===e)for(let e=0;e<n;e++)r.push(t.filter((n=>n.x===i.x+e&&n.y===i.y))[0]);else for(let e=0;e<n;e++)r.push(t.filter((n=>n.x===i.x&&n.y===i.y+e))[0]);if(!r.includes(void 0)){let n=!0;for(let e of r)e.contains&&(n=!1);n&&o.push(i)}}return o}(r),console.log(r),r}placeShip(n,e,t){let o=[e];if(t)for(let t=1;t<n.size;t++)o.push([e[0]+t,e[1]]);else for(let t=1;t<n.size;t++)o.push([e[0],e[1]+t]);for(const e of o)this.cells.find((n=>n.x===e[0]&&n.y===e[1])).contains=n}receiveAttack(n){const e=this.cells.find((e=>e.x===n[0]&&e.y===n[1]));e.contains&&e.contains.hit(),e.shot=!0}updateShipStatus(){this.allShipsSunk=0==this.ships.length&&0!=this.sunkShips.length}shipHit(n){const e=this.rows,t=this.columns,o=this.cells,i=o.filter((e=>e.x===n[0]&&e.y===n[1]));let r=[];const s=[[-1,-1],[-1,1],[1,-1],[1,1]].map((n=>[n[0]+i[0].x,n[1]+i[0].y])).filter((n=>n[0]>=0&&n[1]>=0&&n[0]<e&&n[1]<t));for(const n of s){const e=o.findIndex((e=>e.x==n[0]&&e.y==n[1]));r.includes(e)||o[e].contains||r.push(e)}r=r.map((n=>o[n]));for(const n of r)n.shot=!0}shipSinks(n){const e=this.rows,t=this.columns,o=this.cells,i=o.filter((e=>e.contains===n)),r=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];let s=[];for(const n of i){const i=r.map((e=>[e[0]+n.x,e[1]+n.y])).filter((n=>n[0]>=0&&n[1]>=0&&n[0]<e&&n[1]<t));for(const n of i){const e=o.findIndex((e=>e.x==n[0]&&e.y==n[1]));s.includes(e)||o[e].contains||s.push(e)}}s=s.map((n=>o[n]));for(const n of s)n.shot=!0}}},490:(n,e,t)=>{t.a(n,(async(n,e)=>{try{t(74),t(654);var o=t(162),i=t(296),r=t(558),s=t(855);const a=new r.e;a.createBattlefields(10,10);const l=new i.J("Player"),c=new i.J("Comp"),d=new o.V,h=new o.V;d.fillCells(10,10),h.fillCells(10,10),l.registerOpponentGameboard(h),c.registerOpponentGameboard(d);const p=new s.g(h,d),f=[7,6,5,4,3,2,1];d.createShips(f),h.createShips(f);const u=d.ships,m=h.ships;async function b(n){let e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],t=d.getAvailableCellsToPlaceShip(n.size,e);a.highlightAvailableCells(t);const o=new r.u,i=await o.doIt(t);console.log(i),d.placeShip(n,i,e),a.placeShip("Player",n.size,i,e),a.removeHighlight()}function g(n){let e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],t=h.getAvailableCellsToPlaceShip(n.size,e);const o=p.randomPickCell(t);console.log(o);const i=[o.x,o.y];h.placeShip(n,i,e),a.placeShip("Comp",n.size,i,e)}for(let y of u){let v=!0;0===Math.floor(2*Math.random())&&(v=!1),await b(y,v)}for(let x of m){let w=!0;0===Math.floor(2*Math.random())&&(w=!1),g(x,w)}e()}catch(C){e(C)}}),1)},296:(n,e,t)=>{t.d(e,{J:()=>o});class o{constructor(n){this.name=n,this.opponent=null}registerOpponentGameboard(n){this.opponent=n}attack(n){this.opponent.receiveAttack(n)}}},24:(n,e,t)=>{t.d(e,{Z:()=>a});var o=t(81),i=t.n(o),r=t(645),s=t.n(r)()(i());s.push([n.id,'/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type="button"],\n[type="reset"],\n[type="submit"] {\n  -webkit-appearance: button;\n  appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type="button"]::-moz-focus-inner,\n[type="reset"]::-moz-focus-inner,\n[type="submit"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type="button"]:-moz-focusring,\n[type="reset"]:-moz-focusring,\n[type="submit"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type="checkbox"],\n[type="radio"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type="number"]::-webkit-inner-spin-button,\n[type="number"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type="search"] {\n  -webkit-appearance: textfield; /* 1 */\n  appearance: textfield; /* 1b */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type="search"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n',""]);const a=s},426:(n,e,t)=>{t.d(e,{Z:()=>a});var o=t(81),i=t.n(o),r=t(645),s=t.n(r)()(i());s.push([n.id,':root {\n  --rows: 10;\n  --columns: 10;\n}\n\nbody {\n  background-color: #aba8a8;\n}\n\n#battlefields-container {\n  background-color: #8a8a8a;\n  display: flex;\n  justify-content: center;\n  gap: 100px;\n  width: 100%;\n  margin-top: 100px;\n  padding: 50px 0;\n}\n\n#battlefields-container > * {\n  display: flex;\n  width: 300px;\n  height: 300px;\n}\n\n#battlefields-container > div:first-child {\n  justify-content: end;\n}\n\n#battlefields-container > * > div {\n  display: grid;\n  grid-template-columns: repeat(var(--columns), 1fr);\n  grid-template-rows: repeat(var(--rows), 1fr);\n  width: 100%;\n  height: 100%;\n}\n\n.cell {\n  border: 2px solid #00000000;\n  position: relative;\n}\n\n.cell::before,\n.cell::after {\n  position: absolute;\n  content: "";\n  width: 100%;\n  height: 100%;\n  background-color: #fff;\n}\n\n.cell:hover {\n  background-color: #bf1c1c;\n}\n\n.available:hover {\n  background-color: #0f9351;\n}\n\n.ship::before,\n.ship::after {\n  background-color: aquamarine;\n  z-index: 100;\n}\n',""]);const a=s},645:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",o=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),o&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),o&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,o,i,r){"string"==typeof n&&(n=[[null,n,void 0]]);var s={};if(o)for(var a=0;a<this.length;a++){var l=this[a][0];null!=l&&(s[l]=!0)}for(var c=0;c<n.length;c++){var d=[].concat(n[c]);o&&s[d[0]]||(void 0!==r&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=r),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),i&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=i):d[4]="".concat(i)),e.push(d))}},e}},81:n=>{n.exports=function(n){return n[1]}},74:(n,e,t)=>{var o=t(379),i=t.n(o),r=t(795),s=t.n(r),a=t(569),l=t.n(a),c=t(565),d=t.n(c),h=t(216),p=t.n(h),f=t(589),u=t.n(f),m=t(24),b={};b.styleTagTransform=u(),b.setAttributes=d(),b.insert=l().bind(null,"head"),b.domAPI=s(),b.insertStyleElement=p(),i()(m.Z,b),m.Z&&m.Z.locals&&m.Z.locals},654:(n,e,t)=>{var o=t(379),i=t.n(o),r=t(795),s=t.n(r),a=t(569),l=t.n(a),c=t(565),d=t.n(c),h=t(216),p=t.n(h),f=t(589),u=t.n(f),m=t(426),b={};b.styleTagTransform=u(),b.setAttributes=d(),b.insert=l().bind(null,"head"),b.domAPI=s(),b.insertStyleElement=p(),i()(m.Z,b),m.Z&&m.Z.locals&&m.Z.locals},379:n=>{var e=[];function t(n){for(var t=-1,o=0;o<e.length;o++)if(e[o].identifier===n){t=o;break}return t}function o(n,o){for(var r={},s=[],a=0;a<n.length;a++){var l=n[a],c=o.base?l[0]+o.base:l[0],d=r[c]||0,h="".concat(c," ").concat(d);r[c]=d+1;var p=t(h),f={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)e[p].references++,e[p].updater(f);else{var u=i(f,o);o.byIndex=a,e.splice(a,0,{identifier:h,updater:u,references:1})}s.push(h)}return s}function i(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,i){var r=o(n=n||[],i=i||{});return function(n){n=n||[];for(var s=0;s<r.length;s++){var a=t(r[s]);e[a].references--}for(var l=o(n,i),c=0;c<r.length;c++){var d=t(r[c]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}r=l}}},569:n=>{var e={};n.exports=function(n,t){var o=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},216:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},565:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},795:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var i=void 0!==t.layer;i&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,i&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var r=t.sourceMap;r&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(o,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},589:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},n=>{n(n.s=490)}]);