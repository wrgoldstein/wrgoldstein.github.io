var Jt=o=>{throw TypeError(o)};var st=(o,r,t)=>r.has(o)||Jt("Cannot "+t);var a=(o,r,t)=>(st(o,r,"read from private field"),t?t.call(o):r.get(o)),y=(o,r,t)=>r.has(o)?Jt("Cannot add the same private member more than once"):r instanceof WeakSet?r.add(o):r.set(o,t),_=(o,r,t,l)=>(st(o,r,"write to private field"),l?l.call(o,t):r.set(o,t),t),Lt=(o,r,t)=>(st(o,r,"access private method"),t);import{a as I,t as ir,n as F}from"./disclose-version.BFhNmyvO.js";import{a8 as X,j as or,J as k,az as nr,n as cr,g as v,p as dr,s as i,w as lr,t as w,e as hr,av as vr,f,r as g,o as ur,D as at}from"./runtime.6XPVmw07.js";import{d as pr,s as it}from"./render.CIVx1IxL.js";import{e as B,i as E}from"./each.BrNH79d_.js";import{r as ot,s}from"./attributes.CyJ1nIoY.js";import{b as nt}from"./input.DCRdV7WR.js";import{p as fr}from"./proxy.BX94T_fX.js";import{r as gr,l as mr}from"./loop.BGGTUj09.js";function Gt(o){return Object.prototype.toString.call(o)==="[object Date]"}function ct(o,r,t,l){if(typeof t=="number"||Gt(t)){const p=l-t,h=(t-r)/(o.dt||1/60),$=o.opts.stiffness*p,S=o.opts.damping*h,O=($-S)*o.inv_mass,j=(h+O)*o.dt;return Math.abs(j)<o.opts.precision&&Math.abs(p)<o.opts.precision?l:(o.settled=!1,Gt(t)?new Date(t.getTime()+j):t+j)}else{if(Array.isArray(t))return t.map((p,h)=>ct(o,r[h],t[h],l[h]));if(typeof t=="object"){const p={};for(const h in t)p[h]=ct(o,r[h],t[h],l[h]);return p}else throw new Error(`Cannot spring ${typeof t} values`)}}var T,P,C,b,A,D,H,R,Y,M,W,L,Kt;const lt=class lt{constructor(r,t={}){y(this,L);y(this,T,X(.15));y(this,P,X(.8));y(this,C,X(.01));y(this,b,X(void 0));y(this,A,X(void 0));y(this,D);y(this,H,0);y(this,R,1);y(this,Y,0);y(this,M,null);y(this,W,null);a(this,b).v=a(this,A).v=r,typeof t.stiffness=="number"&&(a(this,T).v=J(t.stiffness,0,1)),typeof t.damping=="number"&&(a(this,P).v=J(t.damping,0,1)),typeof t.precision=="number"&&(a(this,C).v=t.precision)}static of(r,t){const l=new lt(r(),t);return or(()=>{l.set(r())}),l}set(r,t){var p,h;if((p=a(this,W))==null||p.reject(new Error("Aborted")),t!=null&&t.instant||a(this,b).v===void 0)return(h=a(this,M))==null||h.abort(),_(this,M,null),k(a(this,b),k(a(this,A),r)),_(this,D,r),Promise.resolve();t!=null&&t.preserveMomentum&&(_(this,R,0),_(this,Y,t.preserveMomentum));var l=_(this,W,nr());return l.promise.catch(cr),Lt(this,L,Kt).call(this,r).then(()=>{l===a(this,W)&&l.resolve(void 0)}),l.promise}get current(){return v(a(this,b))}get damping(){return v(a(this,P))}set damping(r){k(a(this,P),J(r,0,1))}get precision(){return v(a(this,C))}set precision(r){k(a(this,C),r)}get stiffness(){return v(a(this,T))}set stiffness(r){k(a(this,T),J(r,0,1))}get target(){return v(a(this,A))}set target(r){this.set(r)}};T=new WeakMap,P=new WeakMap,C=new WeakMap,b=new WeakMap,A=new WeakMap,D=new WeakMap,H=new WeakMap,R=new WeakMap,Y=new WeakMap,M=new WeakMap,W=new WeakMap,L=new WeakSet,Kt=function(r){var l;if(k(a(this,A),r),(l=a(this,b)).v??(l.v=r),a(this,D)??_(this,D,a(this,b).v),!a(this,M)){_(this,H,gr.now());var t=1e3/(a(this,Y)*60);a(this,M)??_(this,M,mr(p=>{_(this,R,Math.min(a(this,R)+t,1));const h={inv_mass:a(this,R),opts:{stiffness:a(this,T).v,damping:a(this,P).v,precision:a(this,C).v},settled:!0,dt:(p-a(this,H))*60/1e3};var $=ct(h,a(this,D),a(this,b).v,a(this,A).v);return _(this,D,a(this,b).v),_(this,H,p),k(a(this,b),$),h.settled&&_(this,M,null),!h.settled}))}return a(this,M).promise};let dt=lt;function J(o,r,t){return Math.max(r,Math.min(t,o))}const Hr={title:"Colors",summary:"Where I wish I were a designer",date:"2025-03-27T00:00:00.000Z"};var yr=F('<path stroke="white" stroke-width="0.1"></path>'),_r=F('<text r="4" fill="black" stroke="white" stroke-width=".5"> </text>'),wr=(o,r,t)=>r.target=v(t),br=F('<path stroke="white" stroke-width="0.1"></path>'),kr=F('<text r="4" fill="black" stroke="white" stroke-width=".5"> </text>'),$r=(o,r,t)=>r.target=v(t),xr=F('<path stroke="white" stroke-width="0.1"></path>'),Mr=F('<text r="4" fill="black" stroke="white" stroke-width=".5"> </text>'),Ar=(o,r,t)=>r.target=v(t),jr=ir('<p>Here’s a color combination I like:</p> <div class="flex mt-8"><div class="w-72 h-6"></div> <div class="w-72 h-6"></div> <div class="w-72 h-6"></div></div> <p>What do I like about it? Well, its the primary colors, but just a bit off in a satisfying way.</p> <p>A natural question is what’s a fourth color that would look good with these? First, take a look at where they are on a color wheel.</p> <div class="flex justify-center h-96"><svg viewBox="0 40 200 120"><!><!></svg></div> <p>Two are opposite each other; these are called complementary colors. Another is just a few degrees away from one of the compliments. This is called a split complimentary scheme.</p> <p>A good choice for a fourth color in a split complementary color scheme is a riff on the saturation and brightness of the main three:</p> <label>Main color</label> <input class="w-72" type="range" min="0" max="360"> <p>Brighten them:</p> <div class="flex mt-8"><div class="w-72 h-12"></div> <div class="w-72 h-12"></div> <div class="w-72 h-12"></div> <div class="w-72 h-12"></div> <div class="w-72 h-12"></div> <div class="w-72 h-12"></div></div> <p>Darken:</p> <div class="flex mt-8"><div class="w-72 h-12"></div> <div class="w-72 h-12"></div> <div class="w-72 h-12"></div> <div class="w-72 h-12"></div> <div class="w-72 h-12"></div> <div class="w-72 h-12"></div></div> <p>Desaturate:</p> <div class="flex mt-8"><div class="w-72 h-12"></div> <div class="w-72 h-12"></div> <div class="w-72 h-12"></div> <div class="w-72 h-12"></div> <div class="w-72 h-12"></div> <div class="w-72 h-12"></div></div> <p>Add in a fourth color by adding 90 degrees. This is called a triadic color because it makes a triangle:</p> <div class="flex justify-center h-96"><svg viewBox="0 40 200 120"><!><!></svg></div> <p>Here’s that color slider again:</p> <input class="w-72" type="range" min="0" max="360"> <div class="flex mt-8"><div class="w-72 h-6"></div> <div class="w-72 h-6"></div> <div class="w-72 h-6"></div> <div class="w-72 h-6"></div></div> <p>Of course we can go the other direction with -90 degrees for a fifth color:</p> <div class="flex justify-center h-96"><svg viewBox="0 40 200 120"><!><!></svg></div> <p>Here’s that color slider again:</p> <input class="w-72" type="range" min="0" max="360"> <div class="flex mt-8"><div class="w-72 h-6"></div> <div class="w-72 h-6"></div> <div class="w-72 h-6"></div> <div class="w-72 h-6"></div> <div class="w-72 h-6"></div></div> <p>This starts to look garish, but it can be necessary when plotting a chart and maximum contrast is desired between different categories. See the <a href="https://d3js.org/d3-scale-chromatic/categorical" rel="nofollow">D3.js categorical schemes</a> for examples.</p> <p>Perceptually red, blue and green tend to take up a little bit more than their fair share of space. The result is you can usually distinguish between two oranges better than you can between two reds of the same brightness. This is why depending the same relative arrangement of colors around the color wheel don’t look perceptually even.</p>',1);function Wr(o,r){dr(r,!0);const t=64,l=100,p=100,h=50,$=25;function S(d,u,n,c){const m=(c-90)*Math.PI/180;return{x:d+n*Math.cos(m),y:u+n*Math.sin(m)}}function O(d){const u=d*(360/t),n=(d+1)*(360/t),c=S(l,p,h,u),m=S(l,p,h,n),Zt=S(l,p,$,n),qt=S(l,p,$,u),zt=n-u<=180?0:1;return`
      M ${c.x} ${c.y}
      A ${h} ${h} 0 ${zt} 1 ${m.x} ${m.y}
      L ${Zt.x} ${Zt.y}
      A ${$} ${$} 0 ${zt} 0 ${qt.x} ${qt.y}
      Z
    `}function j(d){return`hsl(${d*(360/t)}, 100%, 50%)`}function G(d){const u=d*(Math.PI/180),n=(h+$)/2,c=l+Math.cos(u-Math.PI/2)*n,m=p+Math.sin(u-Math.PI/2)*n;return{x:c,y:m}}let x=vr(238),e=fr(new dt(238));var ht=jr(),K=i(lr(ht),2),vt=f(K),ut=i(vt,2),Nt=i(ut,2);g(K);var N=i(K,6),pt=f(N),ft=f(pt);B(ft,17,()=>Array(t),E,(d,u,n)=>{var c=yr();w(()=>s(c,"d",O(n))),w(()=>s(c,"fill",j(n))),I(d,c)});var Qt=i(ft);B(Qt,17,()=>[e.current,e.current-190,e.current-190-30],E,(d,u)=>{var n=_r();const c=at(()=>G(v(u)));var m=f(n);w(()=>it(m,`▢${Math.round(v(u)+360)%360}°`)),g(n),w(()=>{s(n,"x",v(c).x-5),s(n,"y",v(c).y+5)}),I(d,n)}),g(pt),g(N);var Z=i(N,8);ot(Z),Z.__change=[wr,e,x];var Q=i(Z,4),gt=f(Q),mt=i(gt,2),yt=i(mt,2),_t=i(yt,2),wt=i(_t,2),Ut=i(wt,2);g(Q);var U=i(Q,4),bt=f(U),kt=i(bt,2),$t=i(kt,2),xt=i($t,2),Mt=i(xt,2),Vt=i(Mt,2);g(U);var V=i(U,4),At=f(V),jt=i(At,2),It=i(jt,2),Tt=i(It,2),Pt=i(Tt,2),tr=i(Pt,2);g(V);var tt=i(V,4),Ct=f(tt),Dt=f(Ct);B(Dt,17,()=>Array(t),E,(d,u,n)=>{var c=br();w(()=>s(c,"d",O(n))),w(()=>s(c,"fill",j(n))),I(d,c)});var rr=i(Dt);B(rr,17,()=>[e.current+90,e.current,e.current-190,e.current-190-30],E,(d,u)=>{var n=kr();const c=at(()=>G(v(u)));var m=f(n);w(()=>it(m,`▢${Math.round(v(u)+360)%360}°`)),g(n),w(()=>{s(n,"x",v(c).x-5),s(n,"y",v(c).y+5)}),I(d,n)}),g(Ct),g(tt);var q=i(tt,4);ot(q),q.__change=[$r,e,x];var rt=i(q,2),Rt=f(rt),St=i(Rt,2),Bt=i(St,2),er=i(Bt,2);g(rt);var et=i(rt,4),Et=f(et),Ht=f(Et);B(Ht,17,()=>Array(t),E,(d,u,n)=>{var c=xr();w(()=>s(c,"d",O(n))),w(()=>s(c,"fill",j(n))),I(d,c)});var sr=i(Ht);B(sr,17,()=>[e.current+90,e.current-90,e.current,e.current-190,e.current-190-30],E,(d,u)=>{var n=Mr();const c=at(()=>G(v(u)));var m=f(n);w(()=>it(m,`▢${Math.round(v(u)+360)%360}°`)),g(n),w(()=>{s(n,"x",v(c).x-5),s(n,"y",v(c).y+5)}),I(d,n)}),g(Et),g(et);var z=i(et,4);ot(z),z.__change=[Ar,e,x];var Wt=i(z,2),Ft=f(Wt),Ot=i(Ft,2),Xt=i(Ot,2),Yt=i(Xt,2),ar=i(Yt,2);g(Wt),ur(4),w(()=>{s(vt,"style",`background-color: hsl(${e.current??""}, 100%, 50%)`),s(ut,"style",`background-color: hsl(${e.current-190}, 100%, 50%)`),s(Nt,"style",`background-color: hsl(${e.current-190-30}, 100%, 50%)`),s(gt,"style",`background-color: hsl(${e.current??""}, 100%, 50%);`),s(mt,"style",`background-color: hsl(${e.current??""}, 100%, 80%);`),s(yt,"style",`background-color: hsl(${e.current-190}, 100%, 50%);`),s(_t,"style",`background-color: hsl(${e.current-190}, 100%, 80%);`),s(wt,"style",`background-color: hsl(${e.current-190-30}, 100%, 50%);`),s(Ut,"style",`background-color: hsl(${e.current-190-30}, 100%, 80%);`),s(bt,"style",`background-color: hsl(${e.current??""}, 100%, 50%);`),s(kt,"style",`background-color: hsl(${e.current??""}, 100%, 20%);`),s($t,"style",`background-color: hsl(${e.current-190}, 100%, 50%);`),s(xt,"style",`background-color: hsl(${e.current-190}, 100%, 20%);`),s(Mt,"style",`background-color: hsl(${e.current-190-30}, 100%, 50%);`),s(Vt,"style",`background-color: hsl(${e.current-190-30}, 100%, 20%);`),s(At,"style",`background-color: hsl(${e.current??""}, 100%, 50%);`),s(jt,"style",`background-color: hsl(${e.current??""}, 50%, 50%);`),s(It,"style",`background-color: hsl(${e.current-190}, 100%, 50%);`),s(Tt,"style",`background-color: hsl(${e.current-190}, 50%, 50%);`),s(Pt,"style",`background-color: hsl(${e.current-190-30}, 100%, 50%);`),s(tr,"style",`background-color: hsl(${e.current-190-30}, 50%, 50%);`),s(Rt,"style",`background-color: hsl(${e.current??""}, 100%, 50%)`),s(St,"style",`background-color: hsl(${e.current+90}, 100%, 50%)`),s(Bt,"style",`background-color: hsl(${e.current-190}, 100%, 50%)`),s(er,"style",`background-color: hsl(${e.current-190-30}, 100%, 50%)`),s(Ft,"style",`background-color: hsl(${e.current+90}, 100%, 50%)`),s(Ot,"style",`background-color: hsl(${e.current??""}, 100%, 50%)`),s(Xt,"style",`background-color: hsl(${e.current-90}, 100%, 50%)`),s(Yt,"style",`background-color: hsl(${e.current-190}, 100%, 50%)`),s(ar,"style",`background-color: hsl(${e.current-190-30}, 100%, 50%)`)}),nt(Z,()=>v(x),d=>k(x,d)),nt(q,()=>v(x),d=>k(x,d)),nt(z,()=>v(x),d=>k(x,d)),I(o,ht),hr()}pr(["change"]);export{Wr as default,Hr as metadata};
