var Qn=Array.isArray,Wn=Array.from,Xn=Object.isFrozen,Zn=Object.defineProperty,nr=Object.getOwnPropertyDescriptor,Fn=Object.getOwnPropertyDescriptors,rr=Object.prototype,tr=Array.prototype,On=Object.getPrototypeOf;const er=()=>{};function ur(n){return n()}function Dn(n){for(var r=0;r<n.length;r++)n[r]()}const g=2,rn=4,D=8,tn=16,E=32,G=64,T=128,I=256,w=512,m=1024,C=2048,O=4096,R=8192,Cn=16384,en=32768,lr=65536,Rn=1<<18,J=Symbol("$state");function un(n){return n===this.v}function bn(n,r){return n!=n?r==r:n!==r||n!==null&&typeof n=="object"||typeof n=="function"}function ln(n){return!bn(n,this.v)}function jn(n){throw new Error("effect_in_teardown")}function Nn(){throw new Error("effect_in_unowned_derived")}function Pn(n){throw new Error("effect_orphan")}function In(){throw new Error("effect_update_depth_exceeded")}function or(){throw new Error("hydration_failed")}function sr(n){throw new Error("props_invalid_value")}function Mn(){throw new Error("state_unsafe_mutation")}function on(n){return{f:0,v:n,reactions:null,equals:un,version:0}}function ir(n){var t;const r=on(n);return r.equals=ln,v!==null&&v.l!==null&&((t=v.l).s??(t.s=[])).push(r),r}function Ln(n,r){return i!==null&&K()&&i.f&g&&Mn(),n.equals(r)||(n.v=r,n.version=kn(),sn(n,m),K()&&f!==null&&f.f&w&&!(f.f&E)&&(_!==null&&_.includes(n)?(h(f,m),H(f)):y===null?Un([n]):y.push(n))),r}function sn(n,r){var t=n.reactions;if(t!==null){var e=K();for(var u of t){var l=u.f;l&m||!e&&u===f||(h(u,r),l&(w|T)&&(l&g?sn(u,C):H(u)))}}}function fn(n){f===null&&i===null&&Pn(),i!==null&&i.f&T&&Nn(),V&&jn()}function Q(n,r){var t=r.last;t===null?r.last=r.first=n:(t.next=n,n.prev=t,r.last=n)}function b(n,r,t,e=!0){var u=(n&G)!==0,l=f,o={ctx:v,deps:null,nodes:null,f:n|m,first:null,fn:r,last:null,next:null,parent:u?null:l,prev:null,teardown:null,transitions:null,version:0};if(t){var s=A;try{W(!0),B(o),o.f|=Cn}catch(a){throw L(o),a}finally{W(s)}}else r!==null&&H(o);var p=t&&o.deps===null&&o.first===null&&o.nodes===null&&o.teardown===null;return!p&&!u&&e&&(l!==null&&Q(o,l),i!==null&&i.f&g&&Q(o,i)),o}function fr(n){const r=b(D,null,!1);return h(r,w),r.teardown=n,r}function ar(n){fn();var r=f!==null&&(f.f&D)!==0&&v!==null&&!v.m;if(r){var t=v;(t.e??(t.e=[])).push(n)}else{var e=an(n);return e}}function _r(n){return fn(),_n(n)}function cr(n){const r=b(G,n,!0);return()=>{L(r)}}function an(n){return b(rn,n,!1)}function _n(n){return b(D,n,!0)}function vr(n){return _n(n)}function pr(n,r=0){return b(D|tn|r,n,!0)}function hr(n,r=!0){return b(D|E,n,!0,r)}function cn(n){var r=n.teardown;if(r!==null){const t=V,e=i;X(!0),Z(null);try{r.call(null)}finally{X(t),Z(e)}}}function L(n,r=!0){var t=!1;if((r||n.f&Rn)&&n.nodes!==null){for(var e=n.nodes.start,u=n.nodes.end;e!==null;){var l=e===u?null:e.nextSibling;e.remove(),e=l}t=!0}if($(n,r&&!t),Y(n,0),h(n,R),n.transitions)for(const s of n.transitions)s.stop();cn(n);var o=n.parent;o!==null&&n.f&E&&o.first!==null&&vn(n),n.next=n.prev=n.teardown=n.ctx=n.deps=n.parent=n.fn=n.nodes=null}function vn(n){var r=n.parent,t=n.prev,e=n.next;t!==null&&(t.next=e),e!==null&&(e.prev=t),r!==null&&(r.first===n&&(r.first=e),r.last===n&&(r.last=t))}function wr(n,r){var t=[];pn(n,t,!0),Yn(t,()=>{L(n),r&&r()})}function Yn(n,r){var t=n.length;if(t>0){var e=()=>--t||r();for(var u of n)u.out(e)}else r()}function pn(n,r,t){if(!(n.f&O)){if(n.f^=O,n.transitions!==null)for(const o of n.transitions)(o.is_global||t)&&r.push(o);for(var e=n.first;e!==null;){var u=e.next,l=(e.f&en)!==0||(e.f&E)!==0;pn(e,r,l?t:!1),e=u}}}function Er(n){hn(n,!0)}function hn(n,r){if(n.f&O){n.f^=O,N(n)&&B(n);for(var t=n.first;t!==null;){var e=t.next,u=(t.f&en)!==0||(t.f&E)!==0;hn(t,u?r:!1),t=e}if(n.transitions!==null)for(const l of n.transitions)(l.is_global||r)&&l.in()}}let M=!1,z=[];function wn(){M=!1;const n=z.slice();z=[],Dn(n)}function dr(n){M||(M=!0,queueMicrotask(wn)),z.push(n)}function Bn(){M&&wn()}function Hn(n){let r=g|m;f===null&&(r|=T);const t={deps:null,deriveds:null,equals:un,f:r,first:null,fn:n,last:null,reactions:null,v:null,version:0};if(i!==null&&i.f&g){var e=i;e.deriveds===null?e.deriveds=[t]:e.deriveds.push(t)}return t}function yr(n){const r=Hn(n);return r.equals=ln,r}function En(n){$(n);var r=n.deriveds;if(r!==null){n.deriveds=null;for(var t=0;t<r.length;t+=1)zn(r[t])}}function dn(n){var r;En(n),r=gn(n);var t=(x||n.f&T)&&n.deps!==null?C:w;h(n,t),n.equals(r)||(n.v=r,n.version=kn())}function zn(n){En(n),Y(n,0),h(n,R),n.first=n.last=n.deps=n.reactions=n.fn=null}const yn=0,Kn=1;let P=yn,j=!1,A=!1,V=!1;function W(n){A=n}function X(n){V=n}let k=[],F=0,i=null;function Z(n){i=n}let f=null,_=null,c=0,y=null;function Un(n){y=n}let mn=0,x=!1,v=null;function kn(){return mn++}function K(){return v!==null&&v.l===null}function N(n){var o,s;var r=n.f;if(r&m)return!0;if(r&C){var t=n.deps,e=(r&T)!==0;if(t!==null){var u;if(r&I){for(u=0;u<t.length;u++)((o=t[u]).reactions??(o.reactions=new Set)).add(n);n.f^=I}for(u=0;u<t.length;u++){var l=t[u];if(N(l)&&dn(l),l.version>n.version)return!0;e&&!x&&!((s=l==null?void 0:l.reactions)!=null&&s.has(n))&&(l.reactions??(l.reactions=new Set)).add(n)}}e||h(n,w)}return!1}function Gn(n,r,t){throw n}function gn(n){var d;var r=_,t=c,e=y,u=i,l=x;_=null,c=0,y=null,i=n.f&(E|G)?null:n,x=!A&&(n.f&T)!==0;try{var o=(0,n.fn)(),s=n.deps;if(_!==null){var p,a;if(s!==null){var S=c===0?_:s.slice(0,c).concat(_),q=S.length>16?new Set(S):null;for(a=c;a<s.length;a++)p=s[a],(q!==null?!q.has(p):!S.includes(p))&&Tn(n,p)}if(s!==null&&c>0)for(s.length=c+_.length,a=0;a<_.length;a++)s[c+a]=_[a];else n.deps=s=_;if(!x)for(a=c;a<s.length;a++)((d=s[a]).reactions??(d.reactions=new Set)).add(n)}else s!==null&&c<s.length&&(Y(n,c),s.length=c);return o}finally{_=r,c=t,y=e,i=u,x=l}}function Tn(n,r){let t=r.reactions;t!==null&&(t.delete(n),t.size===0&&(t=r.reactions=null)),t===null&&r.f&g&&(h(r,C),r.f&(T|I)||(r.f^=I),Y(r,0))}function Y(n,r){var t=n.deps;if(t!==null)for(var e=r===0?null:t.slice(0,r),u=new Set,l=r;l<t.length;l++){var o=t[l];u.has(o)||(u.add(o),(e===null||!e.includes(o))&&Tn(n,o))}}function $(n,r=!1){var t=n.first;for(n.first=n.last=null;t!==null;){var e=t.next;L(t,r),t=e}}function B(n){var r=n.f;if(!(r&R)){h(n,w);var t=n.ctx,e=f,u=v;f=n,v=t;try{r&tn||$(n),cn(n);var l=gn(n);n.teardown=typeof l=="function"?l:null,n.version=mn}catch(o){Gn(o)}finally{f=e,v=u}}}function Sn(){F>1e3&&(F=0,In()),F++}function qn(n){var r=n.length;if(r!==0){Sn();var t=A;A=!0;try{for(var e=0;e<r;e++){var u=n[e];if(u.first===null&&!(u.f&E))nn([u]);else{var l=[];xn(u,l),nn(l)}}}finally{A=t}}}function nn(n){var r=n.length;if(r!==0)for(var t=0;t<r;t++){var e=n[t];!(e.f&(R|O))&&N(e)&&(B(e),e.deps===null&&e.first===null&&e.nodes===null&&(e.teardown===null?vn(e):e.fn=null))}}function Vn(){if(j=!1,F>1001)return;const n=k;k=[],qn(n),j||(F=0)}function H(n){P===yn&&(j||(j=!0,queueMicrotask(Vn)));for(var r=n;r.parent!==null;){r=r.parent;var t=r.f;if(t&E){if(!(t&w))return;h(r,C)}}k.push(r)}function xn(n,r){var t=n.first,e=[];n:for(;t!==null;){var u=t.f,l=(u&(R|O))===0,o=u&E,s=(u&w)!==0,p=t.first;if(l&&(!o||!s)){if(o&&h(t,w),u&D){if(!o&&N(t)&&(B(t),p=t.first),p!==null){t=p;continue}}else if(u&rn)if(o||s){if(p!==null){t=p;continue}}else e.push(t)}var a=t.next;if(a===null){let d=t.parent;for(;d!==null;){if(n===d)break n;var S=d.next;if(S!==null){t=S;continue n}d=d.parent}}t=a}for(var q=0;q<e.length;q++)p=e[q],r.push(p),xn(p,r)}function An(n){var r=P,t=k;try{Sn();const u=[];P=Kn,k=u,j=!1,qn(t);var e=n==null?void 0:n();return Bn(),(k.length>0||u.length>0)&&An(),F=0,e}finally{P=r,k=t}}async function mr(){await Promise.resolve(),An()}function $n(n){var r=n.f;if(r&R)return n.v;if(i!==null){var t=i.deps;_===null&&t!==null&&t[c]===n?c++:(t===null||c===0||t[c-1]!==n)&&(_===null?_=[n]:_[_.length-1]!==n&&_.push(n)),y!==null&&f!==null&&f.f&w&&!(f.f&E)&&y.includes(n)&&(h(f,m),H(f))}if(r&g){var e=n;N(e)&&dn(e)}return n.v}function kr(n){const r=i;try{return i=null,n()}finally{i=r}}const Jn=~(m|C|w);function h(n,r){n.f=n.f&Jn|r}function gr(n,r=1){var t=+$n(n);return Ln(n,t+r),t}function Tr(n,r=!1,t){v={p:v,c:null,e:null,m:!1,s:n,x:null,l:null},r||(v.l={s:null,u:null,r1:[],r2:on(!1)})}function Sr(n){const r=v;if(r!==null){const e=r.e;if(e!==null){r.e=null;for(var t=0;t<e.length;t++)an(e[t])}v=r.p,r.m=!0}return{}}function qr(n){if(!(typeof n!="object"||!n||n instanceof EventTarget)){if(J in n)U(n);else if(!Array.isArray(n))for(let r in n){const t=n[r];typeof t=="object"&&t&&J in t&&U(t)}}}function U(n,r=new Set){if(typeof n=="object"&&n!==null&&!(n instanceof EventTarget)&&!r.has(n)){r.add(n),n instanceof Date&&n.getTime();for(let e in n)try{U(n[e],r)}catch{}const t=On(n);if(t!==Object.prototype&&t!==Array.prototype&&t!==Map.prototype&&t!==Set.prototype&&t!==Date.prototype){const e=Fn(t);for(let u in e){const l=e[u].get;if(l)try{l.call(n)}catch{}}}}}export{tr as A,nr as B,On as C,pr as D,Er as E,wr as F,en as G,an as H,_n as I,dr as J,sr as K,lr as L,ln as M,Hn as N,yr as O,An as P,mr as Q,bn as R,J as S,kr as a,Wn as b,v as c,Zn as d,cr as e,hr as f,f as g,or as h,Qn as i,Sr as j,$n as k,gr as l,on as m,_r as n,ur as o,Tr as p,qr as q,Dn as r,Ln as s,vr as t,ar as u,er as v,fr as w,ir as x,Xn as y,rr as z};
