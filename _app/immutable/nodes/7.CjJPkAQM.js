var et=a=>{throw TypeError(a)};var xt=(a,s,l)=>s.has(a)||et("Cannot "+l);var y=(a,s,l)=>(xt(a,s,"read from private field"),l?l.call(a):s.get(a)),F=(a,s,l)=>s.has(a)?et("Cannot add the same private member more than once"):s instanceof WeakSet?s.add(a):s.set(a,l);import{a as P,t as N,c as vt,n as lt}from"../chunks/disclose-version.KRzaITl4.js";import{au as g,g as t,A as p,p as pt,at as yt,$ as gt,t as j,e as mt,J,f as k,r as I,s as M,al as T,o as wt,av as _t}from"../chunks/runtime.DiZcWLR9.js";import{e as Mt,s as st}from"../chunks/render.CK68YWHb.js";import{i as it}from"../chunks/if.JqzBPkH5.js";import{e as V,i as K}from"../chunks/each.dRzjpiai.js";import{s as f}from"../chunks/attributes.lB_zpKmd.js";import{p as x}from"../chunks/proxy.Bnq3Z6YO.js";import{b as At}from"../chunks/this.B59M8f45.js";function rt(a,s,l=0){const v=a.x-s.x,e=a.y-s.y;return Math.sqrt(v*v+e*e)<l+a.radius+(s.radius||5)}function bt(a,s,l){return{x:(1-a)*s.x+a*l.x,y:(1-a)*s.y+a*l.y}}function at(a,s=0,l=100,v=0,e=100){const o=[];for(let w=0;w<a;w++){const z=Math.floor(Math.random()*(l-s+1))+s,_=Math.floor(Math.random()*(e-v+1))+v;o.push({x:z,y:_})}return o}var $,q,R,E,L;class h{constructor(s,l,v){F(this,$,g());F(this,q,g());F(this,R,g());F(this,E,g());F(this,L,g());this.x=s,this.y=l,this.angle=0,this.radius=v,this.prevAngle=null,this.left=null,this.right=null,this.followAt=null}get x(){return t(y(this,$))}set x(s){p(y(this,$),x(s))}get y(){return t(y(this,q))}set y(s){p(y(this,q),x(s))}get front(){return t(y(this,R))}set front(s){p(y(this,R),x(s))}get left(){return t(y(this,E))}set left(s){p(y(this,E),x(s))}get right(){return t(y(this,L))}set right(s){p(y(this,L),x(s))}setFollowAt(s){this.followAt=s}setFollowing(s,l){this.target=s,this.followAt=l,this.tick()}tick(){const s=this.followAt;let l=Math.atan2(this.y-this.target.y,this.x-this.target.x);this.prevAngle!=null&&(this.front={x:this.x+Math.cos(0+this.prevAngle)*this.radius,y:this.y+Math.sin(0+this.prevAngle)*this.radius},this.left={x:this.x+Math.cos(.5*Math.PI+this.prevAngle)*this.radius,y:this.y+Math.sin(.5*Math.PI+this.prevAngle)*this.radius},this.right={x:this.x+Math.cos(1.5*Math.PI+this.prevAngle)*this.radius,y:this.y+Math.sin(1.5*Math.PI+this.prevAngle)*this.radius}),this.prevAngle=l,this.x=this.target.x+Math.cos(l)*s,this.y=this.target.y+Math.sin(l)*s}}$=new WeakMap,q=new WeakMap,R=new WeakMap,E=new WeakMap,L=new WeakMap;var Ft=N("<div> </div>"),Pt=N("Previous best: <!>",1),kt=lt('<circle fill="purple"></circle><circle fill="purple"></circle><path fill-opacity="0.1"></path>',1),It=lt('<rect width="10" height="10"></rect>'),Ct=N('<div class="w-full"><div class="fixed right-[30rem] top-10"><span class="text-7xl"> </span> <div><!></div></div> <svg class="fixed top-0 left-0 h-full w-full" viewport="0 0 600 400"><circle></circle><!><!></svg> <div style="z-index: 999;" class="relative"><a href="/">back</a></div></div>');function Dt(a,s){pt(s,!0);let l=g(void 0),v=x({x:0,y:0}),e=g(x(new h(400,200,14))),o=g(x([])),w=g(!1),z=1,_=g(0),O=x([]),Q=J(()=>[...O].sort((i,r)=>r-i)),U=J(()=>t(w)?"red":"PaleVioletRed");function nt(i){v.x=i.clientX,v.y=i.clientY}function W(){const i=t(l).getBoundingClientRect();let r=bt(.05,t(e),{x:v.x-i.x,y:v.y});t(e).x=r.x,t(e).y=r.y,p(w,!1),t(o).forEach((c,n)=>{c.tick(),n>7&&rt(t(e),c)&&p(w,!0)});const d=t(A).findIndex(c=>rt(t(e),c,z-1));if(d!=-1){_t(_),t(A).splice(d,1);const c=new h(0,0,1);if(c.setFollowing(t(o)[t(o).length-1],10),c.tick(),t(o).push(c),t(e).radius+=.15,t(o).forEach((n,u)=>{u==0?t(o)[u].radius+=.25:u<t(o).length/2?(n.radius*=1.02,n.setFollowAt(n.radius*.9)):(n.radius+=1,n.setFollowAt(n.radius*.9))}),t(e).radius+=.05,Math.random()>.75){const n=t(o).length-2;t(o).splice(n,1),t(o)[n],t(o)[n].setFollowing(t(o)[n-1],t(o)[n-1].radius),t(o)[n].radius*=2}}requestAnimationFrame(W)}function ot(i){var c;if(!((c=i[0])!=null&&c.left))return;const[r,d]=i.reduce(([n,u],m)=>[n.concat(m.left),u.concat(m.right)],[[],[]]);return[r,d.reverse()].flat().map(({x:n,y:u})=>`L ${n} ${u}`).join().replace(/^L/,"M")}function X(){let i=[new h(t(e).x,t(e).y,14),new h(t(e).x,t(e).y,16),new h(t(e).x,t(e).y,17),new h(t(e).x,t(e).y,18),new h(t(e).x,t(e).y,19),new h(t(e).x,t(e).y,18),new h(t(e).x,t(e).y,17),new h(t(e).x,t(e).y,14),new h(t(e).x,t(e).y,12),new h(t(e).x,t(e).y,9),new h(t(e).x,t(e).y,7),new h(t(e).x,t(e).y,3),new h(t(e).x,t(e).y,1)];p(e,x(new h(t(e).x,t(e).y,14)));for(let r=0;r<i.length;r++)r==0?i[r].setFollowing(t(e),0):i[r].setFollowing(i[r-1],Math.min(i[r-1].radius,12));p(o,x(i))}let ht=J(()=>ot(t(o))),A=g(x(at(10,400,1200,100,600)));setInterval(()=>{if(t(w)&&t(_)>0&&(p(A,x([])),O.push(t(_)),p(_,0),X()),t(A).length<20){const[i]=at(1,400,1200,100,600);t(A).push(i)}},200),yt(()=>{X(),requestAnimationFrame(W)});var B=Ct();Mt("mousemove",gt.body,nt);var D=k(B),G=k(D),ct=k(G,!0);I(G);var Y=M(G,2),ft=k(Y);{var dt=i=>{var r=Pt(),d=M(T(r));V(d,17,()=>t(Q),K,(c,n,u)=>{var m=Ft();f(m,"style",`opacity: ${(10-u)/10}`);var b=k(m,!0);I(m),j(()=>st(b,t(n))),P(c,m)}),P(i,r)};it(ft,i=>{t(Q).length>0&&i(dt)})}I(Y),I(D);var H=M(D,2),C=k(H),Z=M(C);V(Z,17,()=>t(o),K,(i,r)=>{var d=vt(),c=T(d);{var n=u=>{var m=kt(),b=T(m);f(b,"r",5);var S=M(b);f(S,"r",5);var tt=M(S);j(()=>{f(b,"cx",t(r).left.x),f(b,"cy",t(r).left.y),f(S,"cx",t(r).right.x),f(S,"cy",t(r).right.y),f(tt,"d",t(ht)),f(tt,"fill",t(U))}),P(u,m)};it(c,u=>{t(r).left&&u(n)})}P(i,d)});var ut=M(Z);V(ut,17,()=>t(A),K,(i,r)=>{var d=It();j(()=>{f(d,"x",t(r).x),f(d,"y",t(r).y)}),P(i,d)}),I(H),At(H,i=>p(l,i),()=>t(l)),wt(2),I(B),j(()=>{st(ct,t(_)),f(C,"cx",t(e).x),f(C,"cy",t(e).y),f(C,"r",t(e).radius),f(C,"fill",t(U))}),P(a,B),mt()}export{Dt as component};
