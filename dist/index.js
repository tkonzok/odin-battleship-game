"use strict";(self.webpackChunkodin_battleship_game=self.webpackChunkodin_battleship_game||[]).push([[826],{855:(n,e,t)=>{t.d(e,{g:()=>o});class o{constructor(n,e){this.compGameboard=n,this.playerGameboard=e}getAvailableCells(){return this.playerGameboard.getCells().filter((n=>!1===n.shot))}getNeighborCells(n){return this.playerGameboard.getCells().filter((e=>e.x===(n[0]+1||n[0]-1)&&e.y===n[1]||e.x===n[0]&&(e.y===n[1]+1||e.y===n[1]-1)))}randomPickCell(n){return n[Math.floor(Math.random()*n.length)]}}},558:(n,e,t)=>{t.d(e,{e:()=>o,i5:()=>s,ug:()=>i});class o{constructor(){this.playerContainer=document.getElementById("player-battlefield-container"),this.compContainer=document.getElementById("comp-battlefield-container"),this.columns=0}createBattlefields(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;const t=document.createElement("div");this.playerContainer.appendChild(t);const o=document.createElement("div");this.compContainer.appendChild(o),this.columns=e;for(let o=0;o<n;o++)for(let n=0;n<e;n++){const e=document.createElement("div");e.classList.add("cell"),e.id=`playerCell[${n}, ${o}]`,e.setAttribute("x",n),e.setAttribute("y",o),t.appendChild(e)}for(let t=0;t<n;t++)for(let n=0;n<e;n++){const e=document.createElement("div");e.classList.add("cell"),e.classList.add("comp"),e.id=`compCell[${n}, ${t}]`,e.setAttribute("x",n),e.setAttribute("y",t),o.appendChild(e)}}highlightAvailableCells(n,e){for(const t of e)document.getElementById(`${n}Cell[${t.x}, ${t.y}]`).classList.add("available")}removeHighlight(){const n=document.querySelectorAll(".available");for(let e of n)e.classList.remove("available")}placeShip(n,e,t){let o=[t];if(arguments.length>3&&void 0!==arguments[3]&&!arguments[3])for(let n=1;n<e;n++)o.push([t[0],t[1]+n]);else for(let n=1;n<e;n++)o.push([t[0]+n,t[1]]);for(const e of o)document.getElementById(`${n}Cell[${e[0]}, ${e[1]}]`).classList.add("ship")}renderBoard(n,e){for(const t of e){const e=document.getElementById(`${n}Cell[${t.x}, ${t.y}]`);if(e.innerHTML="",t.shot&&!t.contains){const n=document.createElement("div");n.classList.add("shot"),e.appendChild(n)}t.shot&&t.contains&&e.classList.add("hit")}}updateDisplay(n){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;const i=document.getElementById("display");t?i.textContent=`Game over! The winner is ${t}`:"game"===n?i.textContent=`It's ${e}s turn`:"pre-game"===n&&(i.textContent=`It's your turn to place a ship of size ${o.size}`)}}class i{constructor(){this.waitForPressResolve,this.x=99,this.y=99}waitForPress(){return new Promise((n=>this.waitForPressResolve=n))}btnResolver(n,e){this.x=n,this.y=e,this.waitForPressResolve&&this.waitForPressResolve()}receivePlacement(n){for(const e of n)document.getElementById(`playerCell[${e.x}, ${e.y}]`).addEventListener("click",(()=>{this.btnResolver(e.x,e.y)}))}removeListener(n){for(const e of n)document.getElementById(`playerCell[${e.x}, ${e.y}]`).removeEventListener("click",this.btnResolver)}async place(n){return this.receivePlacement(n),await this.waitForPress(),this.removeListener(n),[this.x,this.y]}}class s{constructor(){this.waitForPressResolve,this.x=99,this.y=99}waitForPress(){return new Promise((n=>this.waitForPressResolve=n))}btnResolver(n,e){this.x=n,this.y=e,this.waitForPressResolve&&this.waitForPressResolve()}receivePlacement(n,e){for(const t of e)document.getElementById(`${n}Cell[${t.x}, ${t.y}]`).addEventListener("click",(()=>{this.btnResolver(t.x,t.y)}))}removeListener(n,e){for(const t of e)document.getElementById(`${n}Cell[${t.x}, ${t.y}]`).removeEventListener("click",this.btnResolver)}async shoot(n,e){return this.receivePlacement(n,e),await this.waitForPress(),this.removeListener(n,e),[this.x,this.y]}}},162:(n,e,t)=>{t.d(e,{V:()=>i});class o{constructor(n){this.size=n,this.timesHit=0,this.sunk=!1}hit(){this.timesHit+=1}isSunk(){return this.timesHit>=this.size&&(this.sunk=!0,!0)}}class i{constructor(){this.rows=0,this.columns=0,this.cells=[],this.ships=[],this.sunkShips=[],this.allShipsSunk=!1}fillCells(){let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;this.rows=n,this.columns=e;for(let t=0;t<e;t++)for(let e=0;e<n;e++)this.cells.push({x:t,y:e,contains:null,shot:!1})}getCells(){return this.cells}createShips(n){for(let e of n){const n=new o(e);this.ships.push(n)}}getAvailableCellsToPlaceShip(n){let e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.rows,this.columns;const t=this.cells,o=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];function i(n){return o.map((e=>[e[0]+n.x,e[1]+n.y]))}let s=t.filter((n=>!n.contains));return s=function(n){let e=[];for(const o of n){let n=i(o);for(const i of n){const n=t.findIndex((n=>n.x==i[0]&&n.y==i[1]));-1!=n&&t[n].contains&&e.push(o)}}return n.filter((n=>!e.includes(n)))}(s),s=function(t){let o=[];for(let i of t){let s=[];if(!0===e)for(let e=0;e<n;e++)s.push(t.filter((n=>n.x===i.x+e&&n.y===i.y))[0]);else for(let e=0;e<n;e++)s.push(t.filter((n=>n.x===i.x&&n.y===i.y+e))[0]);if(!s.includes(void 0)){let n=!0;for(let e of s)e.contains&&(n=!1);n&&o.push(i)}}return o}(s),s}getAvailableCellsToMakeMove(){return this.cells.filter((n=>!1===n.shot))}isShipAround(){const n=this.rows,e=this.columns,t=[[-1,0],[0,1],[0,-1],[1,0]];let o=null;const i=this.cells.filter((n=>n.contains&&n.shot));for(const s of i){const i=t.map((n=>[n[0]+s.x,n[1]+s.y])).filter((t=>t[0]>=0&&t[1]>=0&&t[0]<n&&t[1]<e));for(const n of i){const e=this.cells.findIndex((e=>e.x==n[0]&&e.y==n[1]));!1===this.cells[e].shot&&(o=this.cells[e])}}return o}placeShip(n,e,t){let o=[e];if(t)for(let t=1;t<n.size;t++)o.push([e[0]+t,e[1]]);else for(let t=1;t<n.size;t++)o.push([e[0],e[1]+t]);for(const e of o)this.cells.find((n=>n.x===e[0]&&n.y===e[1])).contains=n}receiveAttack(n){const e=this.cells.find((e=>e.x===n[0]&&e.y===n[1]));if(e.shot=!0,e.contains){let n=e.contains;return n.hit(),this.shipHit(e),n}}updateShipStatus(){for(const n of this.ships)if(n.isSunk()){const e=this.ships.findIndex((e=>e==n));this.sunkShips.push(n),this.ships.splice(e,1)}this.allShipsSunk=0==this.ships.length&&0!=this.sunkShips.length}shipHit(n){const e=this.rows,t=this.columns,o=this.cells;let i=[];const s=[[-1,-1],[-1,1],[1,-1],[1,1]].map((e=>[e[0]+n.x,e[1]+n.y])).filter((n=>n[0]>=0&&n[1]>=0&&n[0]<e&&n[1]<t));for(const n of s){const e=o.findIndex((e=>e.x==n[0]&&e.y==n[1]));i.includes(e)||o[e].contains||i.push(e)}i=i.map((n=>o[n]));for(const n of i)n.shot=!0}shipSinks(n){const e=this.rows,t=this.columns,o=this.cells,i=o.filter((e=>e.contains===n)),s=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];let r=[];for(const n of i){const i=s.map((e=>[e[0]+n.x,e[1]+n.y])).filter((n=>n[0]>=0&&n[1]>=0&&n[0]<e&&n[1]<t));for(const n of i){const e=o.findIndex((e=>e.x==n[0]&&e.y==n[1]));r.includes(e)||o[e].contains||r.push(e)}}r=r.map((n=>o[n]));for(const n of r)n.shot=!0;console.log("sipSinks"),console.log(n)}}},490:(n,e,t)=>{t.a(n,(async(n,e)=>{try{t(74),t(654);var o=t(162),i=t(296),s=t(558),r=t(855);const l=new s.e;l.createBattlefields(10,10);const a=new i.J("Player"),c=new i.J("Computer"),h=new o.V,d=new o.V;h.fillCells(10,10),d.fillCells(10,10),a.registerOpponentGameboard(d),c.registerOpponentGameboard(h);const p=new r.g(d,h),u=[5,4,3];h.createShips(u),d.createShips(u);const f=h.ships,m=d.ships;async function g(n){let e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],t=h.getAvailableCellsToPlaceShip(n.size,e);l.highlightAvailableCells("player",t);const o=new s.ug,i=await o.place(t);h.placeShip(n,i,e),l.placeShip("player",n.size,i,e),l.removeHighlight()}function b(n){let e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],t=d.getAvailableCellsToPlaceShip(n.size,e);const o=p.randomPickCell(t),i=[o.x,o.y];d.placeShip(n,i,e),l.placeShip("comp",n.size,i,e)}async function y(n){let e=!1;if(n===a){const n=d.getAvailableCellsToMakeMove();l.highlightAvailableCells("comp",n);const t=new s.i5,o=await t.shoot("comp",n);let i=a.attack(o);d.updateShipStatus(),i&&(!0===i.isSunk()&&(d.shipSinks(i),console.log(d.ships),console.log(d.sunkShips)),d.allShipsSunk||(e=!0)),l.renderBoard("comp",d.getCells()),l.removeHighlight()}else{const n=h.getCells().filter((n=>!n.shot));let t;t=h.isShipAround(n)?h.isShipAround(n):p.randomPickCell(n);const o=[t.x,t.y];let i=c.attack(o);i&&(!0===i.sunk&&(h.shipSinks(i),console.log(h.ships),console.log(h.sunkShips)),h.allShipsSunk||(e=!0)),h.updateShipStatus(),l.renderBoard("player",h.getCells())}return e}for(let C of f){let S=!0;0===Math.floor(2*Math.random())&&(S=!1),l.updateDisplay("pre-game",null,null,C),await g(C,S)}for(let k of m){let E=!0;0===Math.floor(2*Math.random())&&(E=!1),b(k,E)}let v=!1,x=a,w=a;for(;!v;){l.updateDisplay("game",w.name);let z=await y(w);z||(h.allShipsSunk&&(x=c,v=!0),d.allShipsSunk&&(x=a,v=!0)),z||(w=w===a?c:a)}l.updateDisplay(null,null,x.name),e()}catch(I){e(I)}}),1)},296:(n,e,t)=>{t.d(e,{J:()=>o});class o{constructor(n){this.name=n,this.opponent=null}registerOpponentGameboard(n){this.opponent=n}attack(n){return this.opponent.receiveAttack(n)}}},24:(n,e,t)=>{t.d(e,{Z:()=>l});var o=t(81),i=t.n(o),s=t(645),r=t.n(s)()(i());r.push([n.id,'/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\n\n/* Document\n   ========================================================================== */\n\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in iOS.\n */\n\nhtml {\n  line-height: 1.15; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/* Sections\n   ========================================================================== */\n\n/**\n * Remove the margin in all browsers.\n */\n\nbody {\n  margin: 0;\n}\n\n/**\n * Render the `main` element consistently in IE.\n */\n\nmain {\n  display: block;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\npre {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Remove the gray background on active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * 1. Remove the bottom border in Chrome 57-\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10.\n */\n\nimg {\n  border-style: none;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change the font styles in all browsers.\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  line-height: 1.15; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\n[type="button"],\n[type="reset"],\n[type="submit"] {\n  -webkit-appearance: button;\n  appearance: button;\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type="button"]::-moz-focus-inner,\n[type="reset"]::-moz-focus-inner,\n[type="submit"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type="button"]:-moz-focusring,\n[type="reset"]:-moz-focusring,\n[type="submit"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Correct the padding in Firefox.\n */\n\nfieldset {\n  padding: 0.35em 0.75em 0.625em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Remove the default vertical scrollbar in IE 10+.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10.\n * 2. Remove the padding in IE 10.\n */\n\n[type="checkbox"],\n[type="radio"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type="number"]::-webkit-inner-spin-button,\n[type="number"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type="search"] {\n  -webkit-appearance: textfield; /* 1 */\n  appearance: textfield; /* 1b */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding in Chrome and Safari on macOS.\n */\n\n[type="search"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/* Interactive\n   ========================================================================== */\n\n/*\n * Add the correct display in Edge, IE 10+, and Firefox.\n */\n\ndetails {\n  display: block;\n}\n\n/*\n * Add the correct display in all browsers.\n */\n\nsummary {\n  display: list-item;\n}\n\n/* Misc\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 10+.\n */\n\ntemplate {\n  display: none;\n}\n\n/**\n * Add the correct display in IE 10.\n */\n\n[hidden] {\n  display: none;\n}\n',""]);const l=r},426:(n,e,t)=>{t.d(e,{Z:()=>p});var o=t(81),i=t.n(o),s=t(645),r=t.n(s),l=t(667),a=t.n(l),c=new URL(t(131),t.b),h=r()(i());h.push([n.id,"@import url(https://fonts.googleapis.com/css2?family=VT323&display=swap);"]);var d=a()(c);h.push([n.id,`:root {\n  --rows: 10;\n  --columns: 10;\n}\n\nbody {\n  background-image: url(${d});\n  background-position: center top;\n  background-repeat: no-repeat;\n  height: 100vh;\n  background-size: cover;\n  display: flex;\n  flex-direction: column;\n  justify-content: start;\n  align-items: center;\n  font-family: "VT323", monospace;\n}\n\n.title {\n  font-size: 200px;\n  color: #eeeeee;\n  text-align: center;\n}\n\n.display {\n  font-size: 56px;\n  background-color: #000000ac;\n  color: #eeeeee;\n  text-align: center;\n  width: 350px;\n  height: 200px;\n  margin-bottom: 50px;\n}\n\n#battlefields-container {\n  display: flex;\n  justify-content: center;\n  flex-wrap: wrap;\n  gap: 100px;\n  width: 100%;\n}\n\n#battlefields-container > div {\n  display: flex;\n  width: 350px;\n  height: 350px;\n}\n\n#battlefields-container > div:first-child {\n  justify-content: end;\n}\n\n#battlefields-container > * > div {\n  display: grid;\n  grid-template-columns: repeat(var(--columns), 1fr);\n  grid-template-rows: repeat(var(--rows), 1fr);\n  width: 100%;\n  height: 100%;\n}\n\n.cell {\n  border: 3px solid #00000000;\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.cell::before,\n.cell::after {\n  position: absolute;\n  content: "";\n  width: 100%;\n  height: 100%;\n  background-color: #ffffff80;\n}\n\n.cell:hover {\n  background-color: #ff7fb0;\n}\n\n.available:hover {\n  background-color: #7fffd4;\n}\n\n.shot {\n  position: relative;\n  background-color: #000000;\n  width: 25%;\n  height: 25%;\n  z-index: 200;\n}\n\n.ship:not(.comp)::before,\n.ship:not(.comp)::after {\n  background-color: #7fffd4;\n  z-index: 100;\n}\n\n.ship.hit::before,\n.ship.hit::after {\n  background-color: #ff7fb0;\n}\n`,""]);const p=h},645:n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",o=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),o&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),o&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,o,i,s){"string"==typeof n&&(n=[[null,n,void 0]]);var r={};if(o)for(var l=0;l<this.length;l++){var a=this[l][0];null!=a&&(r[a]=!0)}for(var c=0;c<n.length;c++){var h=[].concat(n[c]);o&&r[h[0]]||(void 0!==s&&(void 0===h[5]||(h[1]="@layer".concat(h[5].length>0?" ".concat(h[5]):""," {").concat(h[1],"}")),h[5]=s),t&&(h[2]?(h[1]="@media ".concat(h[2]," {").concat(h[1],"}"),h[2]=t):h[2]=t),i&&(h[4]?(h[1]="@supports (".concat(h[4],") {").concat(h[1],"}"),h[4]=i):h[4]="".concat(i)),e.push(h))}},e}},667:n=>{n.exports=function(n,e){return e||(e={}),n?(n=String(n.__esModule?n.default:n),/^['"].*['"]$/.test(n)&&(n=n.slice(1,-1)),e.hash&&(n+=e.hash),/["'() \t\n]|(%20)/.test(n)||e.needQuotes?'"'.concat(n.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):n):n}},81:n=>{n.exports=function(n){return n[1]}},74:(n,e,t)=>{var o=t(379),i=t.n(o),s=t(795),r=t.n(s),l=t(569),a=t.n(l),c=t(565),h=t.n(c),d=t(216),p=t.n(d),u=t(589),f=t.n(u),m=t(24),g={};g.styleTagTransform=f(),g.setAttributes=h(),g.insert=a().bind(null,"head"),g.domAPI=r(),g.insertStyleElement=p(),i()(m.Z,g),m.Z&&m.Z.locals&&m.Z.locals},654:(n,e,t)=>{var o=t(379),i=t.n(o),s=t(795),r=t.n(s),l=t(569),a=t.n(l),c=t(565),h=t.n(c),d=t(216),p=t.n(d),u=t(589),f=t.n(u),m=t(426),g={};g.styleTagTransform=f(),g.setAttributes=h(),g.insert=a().bind(null,"head"),g.domAPI=r(),g.insertStyleElement=p(),i()(m.Z,g),m.Z&&m.Z.locals&&m.Z.locals},379:n=>{var e=[];function t(n){for(var t=-1,o=0;o<e.length;o++)if(e[o].identifier===n){t=o;break}return t}function o(n,o){for(var s={},r=[],l=0;l<n.length;l++){var a=n[l],c=o.base?a[0]+o.base:a[0],h=s[c]||0,d="".concat(c," ").concat(h);s[c]=h+1;var p=t(d),u={css:a[1],media:a[2],sourceMap:a[3],supports:a[4],layer:a[5]};if(-1!==p)e[p].references++,e[p].updater(u);else{var f=i(u,o);o.byIndex=l,e.splice(l,0,{identifier:d,updater:f,references:1})}r.push(d)}return r}function i(n,e){var t=e.domAPI(e);return t.update(n),function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,i){var s=o(n=n||[],i=i||{});return function(n){n=n||[];for(var r=0;r<s.length;r++){var l=t(s[r]);e[l].references--}for(var a=o(n,i),c=0;c<s.length;c++){var h=t(s[c]);0===e[h].references&&(e[h].updater(),e.splice(h,1))}s=a}}},569:n=>{var e={};n.exports=function(n,t){var o=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},216:n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},565:(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},795:n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var i=void 0!==t.layer;i&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,i&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var s=t.sourceMap;s&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),e.styleTagTransform(o,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},589:n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}},131:(n,e,t)=>{n.exports=t.p+"d08a502c85fdc01e752c.jpg"}},n=>{n(n.s=490)}]);