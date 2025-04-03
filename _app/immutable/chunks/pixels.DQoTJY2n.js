import{a as $,t as tt}from"./disclose-version.COxdfNiN.js";import{p as et,x as E,s as M,v as at,t as ot,w as h,g as e,e as nt,f as st,r as it,o as ct}from"./runtime.bkAFKJgj.js";import{d as lt,s as N}from"./render.VnJAW1R7.js";import{r as At}from"./attributes.B0y3oGGG.js";import{s as rt}from"./class.9_k7OQ4W.js";import{b as dt}from"./input.aF47l6pt.js";import{p as f}from"./proxy.CQPsOVN2.js";import{o as gt}from"./index-client.DCCAqnLN.js";const vt={title:"Pixel art",summary:"The weird thing about 2025",date:"2025-03-31T00:00:00.000Z"};var pt=(R,m)=>h(m,f(e(m)=="pencil"?"fill":"pencil")),mt=(R,m)=>h(m,!e(m)),ut=tt('<p>For a project of mine I need to create some pixel art.</p> <p>I downloaded a couple of apps and visited a website or two and all of the options have ads and pretty unfriendly interfaces.</p> <p>But as a coder in 2025 you’re not really at the mercy of anyone else’s tool design. In two chat messages I can have the basic grid for my own pixel art generator, and add whatever features I want.</p> <p>This basic pixel art drawer that took 15 minutes to make and supports the advanced features I need:</p> <ul><li>Symmetry drawing</li> <li>Copying the image to clipboard</li> <li>Resizing</li> <li>Fill tool</li></ul> <input type="color" id="colorPicker" value="#000000"> <button class="bg-red-200 min-w-16 rounded px-2 py-1"> </button> <input type="range" min="4" max="16" step="4"> <button>toggle symmetry</button> <button id="clearButton" class="bg-blue-200 rounded px-2 py-1">clear canvas</button> <button id="copyButton" class="bg-green-200 rounded px-2 py-1">Copy as PNG</button> <button id="undoButton" class="bg-purple-200 rounded px-2 py-1">Undo</button> <div class="p-4 bg-gray-200 mt-4"><canvas id="pixelCanvas" class="bg-white place-self-center" width="448" height="448"></canvas></div> <p>My favorite feature is the symmetry drawing toggle, which makes it easy to do what I set out to do: little pixel spaceships:</p> <div class="flex justify-around"><img src="data:image/png;base64,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"> <img src="data:image/png;base64,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"></div>',1);function Et(R,m){et(m,!0);let i=E(8),w=E("pencil"),c=E(f([])),C=64,Y=50,x=E(!1);function P(){const o=document.getElementById("pixelCanvas").toDataURL();h(c,f([...e(c),o])),e(c).length>Y&&h(c,f(e(c).slice(e(c).length-Y)))}function j(){if(e(c).length<=1)return;const t=document.getElementById("pixelCanvas"),o=t.getContext("2d");h(c,f(e(c).slice(0,e(c).length-1)));const B=e(c)[e(c).length-1],g=new Image;g.onload=function(){o.clearRect(0,0,t.width,t.height),o.drawImage(g,0,0)},g.src=B}gt(()=>{const t=document.getElementById("pixelCanvas"),o=t.getContext("2d"),B=document.getElementById("colorPicker");P(),o.fillStyle="#FFFFFF",o.fillRect(0,0,t.width,t.height);let g=!1;function Q(n,A){o.fillStyle=B.value;const l=Math.floor(n/e(i))*e(i),a=Math.floor(A/e(i))*e(i);if(o.fillRect(l,a,e(i),e(i)),e(x)){const s=t.width-l-e(i);o.fillRect(s,a,e(i),e(i))}}function q(n,A,l){const a=o.getImageData(0,0,t.width,t.height),s=a.data,D=Math.floor(n/1)*1,O=Math.floor(A/1)*1,I=(O*t.width+D)*4,J=s[I],G=s[I+1],z=s[I+2],T=s[I+3],S=document.createElement("canvas").getContext("2d");S.fillStyle=l,S.fillRect(0,0,1,1);const p=S.getImageData(0,0,1,1).data;if(J===p[0]&&G===p[1]&&z===p[2]&&T===p[3])return;const u=[];u.push([D,O]);const W=new Set;for(;u.length>0;){const[r,d]=u.shift(),K=`${r},${d}`;if(W.has(K))continue;W.add(K);const b=(d*t.width+r)*4;if(s[b]===J&&s[b+1]===G&&s[b+2]===z&&s[b+3]===T){for(let U=0;U<1;U++)for(let X=0;X<1;X++){const v=((d+U)*t.width+(r+X))*4;s[v]=p[0],s[v+1]=p[1],s[v+2]=p[2],s[v+3]=p[3]}r>=1&&u.push([r-1,d]),r+1<t.width&&u.push([r+1,d]),d>=1&&u.push([r,d-1]),d+1<t.height&&u.push([r,d+1])}}if(o.putImageData(a,0,0),e(x)){const r=t.width-D-1;q(r,O,l)}}function Z(){o.fillStyle="#FFFFFF",o.fillRect(0,0,t.width,t.height)}t.addEventListener("mousedown",n=>{g=!0;const A=t.getBoundingClientRect(),l=Math.floor((n.clientX-A.left)*(t.width/t.offsetWidth)),a=Math.floor((n.clientY-A.top)*(t.height/t.offsetHeight));e(w)==="pencil"?Q(l,a):e(w)==="fill"&&q(l,a,B.value)}),t.addEventListener("mousemove",n=>{if(!g)return;const A=t.getBoundingClientRect(),l=Math.floor((n.clientX-A.left)*(t.width/t.offsetWidth)),a=Math.floor((n.clientY-A.top)*(t.height/t.offsetHeight));Q(l,a)}),t.addEventListener("mouseup",()=>{g=!1,P()}),t.addEventListener("mouseleave",()=>{g=!1}),document.getElementById("clearButton").addEventListener("click",Z),document.getElementById("copyButton").addEventListener("click",_),document.getElementById("undoButton").addEventListener("click",j);function _(){const n=document.createElement("canvas");n.width=C,n.height=C;const A=n.getContext("2d");console.log(t),A.drawImage(t,0,0,C,C);const l=n.toDataURL("image/png"),a=document.createElement("textarea");a.value=l,document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a)}});var k=ut(),y=M(at(k),12);y.__click=[pt,w];var V=st(y,!0);it(y);var H=M(y),F=M(H);At(F);var L=M(F,2);L.__click=[mt,x],ct(12),ot(()=>{N(V,e(w)),N(H,` ${e(i)??""} `),rt(L,`${(e(x)?"bg-yellow-300":"bg-gray-200")??""} rounded px-2 py-1`)}),dt(F,()=>e(i),t=>h(i,t)),$(R,k),nt()}lt(["click"]);export{Et as default,vt as metadata};
