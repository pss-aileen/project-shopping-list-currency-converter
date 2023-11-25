"use strict";{async function callSymbolsApi(){try{const e=await fetch("https://api.exchangerate.host/symbols");if(!e.ok)throw new Error(`HTTPS error: ${e.status}`);return e.json()}catch(e){console.error(`Could not get products: ${e}`)}}function showSymbols(e){const t=document.querySelector(".country-lists");for(let o=0;o<e.length;o++){const n=document.createElement("li"),s=document.createElement("label"),c=document.createElement("input"),l=document.createElement("div"),r=document.createElement("div");t.appendChild(n),n.appendChild(s),s.appendChild(c),s.appendChild(l),s.appendChild(r),n.classList.add("country-lists__item"),s.classList.add("country"),c.classList.add("country__input-radio"),l.classList.add("country__code"),r.classList.add("country__description"),c.setAttribute("type","radio"),c.setAttribute("name","countries"),c.value=e[o].code,l.textContent=e[o].code,r.textContent=e[o].description}}function searchSymbols(){const e=document.querySelector(".country-search__input"),t=document.querySelectorAll(".country-lists .country__input-radio");e.addEventListener("input",()=>{const o=e.value,n=new RegExp(o,"i");console.log(`input: ${n}`);for(let e=0;e<t.length;e++)n.test(t[e].value)?t[e].classList.remove("is_displayNone"):t[e].classList.add("is_displayNone")})}function setCurrency(){const e=document.querySelector("#btn-set-from"),t=document.querySelector("#btn-set-to");console.log(e);const o=document.querySelector(".country-lists-modal");e.addEventListener("click",()=>{o.classList.add("is_show"),pickUpAndSet("from")}),t.addEventListener("click",()=>{o.classList.add("is_show"),pickUpAndSet("to")})}function pickUpAndSet(e){const t=document.querySelector(".country-lists-modal"),o=document.querySelectorAll("input[name='countries']");document.getElementById("from-currency"),document.getElementById("to-currency");for(let n=0;n<o.length;n++)o[n].addEventListener("click",()=>{console.log(o[n]),"from"===e?(console.log("from"+n),t.classList.remove("is_show")):"to"===e&&(console.log("to"+n),t.classList.remove("is_show"))});console.log("-----")}callSymbolsApi().then(e=>{for(const[t,o]of Object.entries(e))console.log(`${t}: ${o}`);return Object.values(e.symbols)}).then(e=>{showSymbols(e),searchSymbols(),setCurrency()})}