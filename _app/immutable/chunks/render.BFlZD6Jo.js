import{e as O,h as m,x as C,d as g,b as T,g as h,y as S,c as I,i as L,z as V,A as H,m as M,B as Y}from"./disclose-version.DOvlZpYt.js";import{x as B,i as F,b as P,H as $,G as j,J as q,K as x,a as z,h as G,c as J,j as K,l as W}from"./runtime.KCf5Iwgn.js";const Q=new Set,D=new Set;function E(r){var R;var e=this,i=e.ownerDocument,d=r.type,u=((R=r.composedPath)==null?void 0:R.call(r))||[],t=u[0]||r.target,l=0,_=r.__root;if(_){var f=u.indexOf(_);if(f!==-1&&(e===document||e===window)){r.__root=e;return}var c=u.indexOf(e);if(c===-1)return;f<=c&&(l=f)}if(t=u[l]||r.target,t!==e){B(r,"currentTarget",{configurable:!0,get(){return t||i}});try{for(var y,a=[];t!==null;){var o=t.parentNode||t.host||null;try{var n=t["__"+d];if(n!==void 0&&!t.disabled)if(F(n)){var[v,...w]=n;v.apply(t,[r,...w])}else n.call(t,r)}catch(b){y?a.push(b):y=b}if(r.cancelBubble||o===e||o===null)break;t=o}if(y){for(let b of a)queueMicrotask(()=>{throw b});throw y}}finally{r.__root=e,t=e}}}let s;function U(){s=void 0}function ae(r){let e=null,i=m;var d;if(m){for(e=h,s===void 0&&(s=document.head.firstChild);s!==null&&(s.nodeType!==8||s.data!==C);)s=s.nextSibling;s===null?g(!1):s=T(s.nextSibling)}m||(d=document.head.appendChild(O()));try{P(()=>r(d),$)}finally{i&&(g(!0),s=h,T(e))}}const X=["wheel","touchstart","touchmove","touchend","touchcancel"];function Z(r){return X.includes(r)}let N=!0;function ne(r,e){(r.__t??(r.__t=r.nodeValue))!==e&&(r.__t=e,r.nodeValue=e==null?"":e+"")}function ee(r,e){const i=e.anchor??e.target.appendChild(O());return k(r,{...e,anchor:i})}function ie(r,e){e.intro=e.intro??!1;const i=e.target,d=m,u=h;try{for(var t=i.firstChild;t&&(t.nodeType!==8||t.data!==C);)t=t.nextSibling;if(!t)throw S;g(!0),T(t),I();const l=k(r,{...e,anchor:t});if(h===null||h.nodeType!==8||h.data!==L)throw V(),S;return g(!1),l}catch(l){if(l===S)return e.recover===!1&&j(),H(),M(i),g(!1),ee(r,e);throw l}finally{g(d),T(u),U()}}const p=new Map;function k(r,{target:e,anchor:i,props:d={},events:u,context:t,intro:l=!0}){H();var _=new Set,f=a=>{for(var o=0;o<a.length;o++){var n=a[o];if(!_.has(n)){_.add(n);var v=Z(n);e.addEventListener(n,E,{passive:v});var w=p.get(n);w===void 0?(document.addEventListener(n,E,{passive:v}),p.set(n,1)):p.set(n,w+1)}}};f(q(Q)),D.add(f);var c=void 0,y=x(()=>(z(()=>{if(t){G({});var a=W;a.c=t}u&&(d.$$events=u),m&&Y(i,null),N=l,c=r(i,d)||{},N=!0,m&&(J.nodes.end=h),t&&K()}),()=>{for(var a of _){e.removeEventListener(a,E);var o=p.get(a);--o===0?(document.removeEventListener(a,E),p.delete(a)):p.set(a,o)}D.delete(f),A.delete(c)}));return A.set(c,y),c}let A=new WeakMap;function se(r){const e=A.get(r);e==null||e()}export{ie as a,N as b,ae as h,ee as m,ne as s,se as u};
