import{E as F,S as d,F as K,G as j,l as C,d as w,i as G,s as v,J as A,k as _,c as H,z as O,K as Z,b as $,r as L,a as M,p as q,M as p,N as J,O as Q,P as V,Q as B,R as W,m as X,v as I,x as ee}from"./runtime.C-37iwFS.js";import{U as R,h as g,c as ne,H as te,r as se,b as ae,d as U,g as re,P as ie,y as fe,z as ue,A as le,B as ce}from"./disclose-version.CgYhSZhZ.js";function oe(e){throw new Error("lifecycle_outside_component")}function b(e,n=null,s){if(typeof e=="object"&&e!=null&&!F(e)){if(d in e){const t=e[d];if(t.t===e||t.p===e)return t.p}const a=Z(e);if(a===K||a===j){const t=new Proxy(e,de);return C(e,d,{value:{s:new Map,v:w(0),a:G(e),p:t,t:e},writable:!0,enumerable:!1}),t}}return e}function z(e,n=1){v(e,e.v+n)}const de={defineProperty(e,n,s){if(s.value){const a=e[d],t=a.s.get(n);t!==void 0&&v(t,b(s.value,a))}return Reflect.defineProperty(e,n,s)},deleteProperty(e,n){const s=e[d],a=s.s.get(n),t=s.a,r=delete e[n];if(t&&r){const i=s.s.get("length"),c=e.length-1;i!==void 0&&i.v!==c&&v(i,c)}return a!==void 0&&v(a,R),r&&z(s.v),r},get(e,n,s){var r;if(n===d)return Reflect.get(e,d);const a=e[d];let t=a.s.get(n);if(t===void 0&&(!(n in e)||(r=A(e,n))!=null&&r.writable)&&(t=w(b(e[n],a)),a.s.set(n,t)),t!==void 0){const i=_(t);return i===R?void 0:i}return Reflect.get(e,n,s)},getOwnPropertyDescriptor(e,n){const s=Reflect.getOwnPropertyDescriptor(e,n);if(s&&"value"in s){const t=e[d].s.get(n);t&&(s.value=_(t))}return s},has(e,n){var r;if(n===d)return!0;const s=e[d],a=Reflect.has(e,n);let t=s.s.get(n);return(t!==void 0||H!==null&&(!a||(r=A(e,n))!=null&&r.writable))&&(t===void 0&&(t=w(a?b(e[n],s):R),s.s.set(n,t)),_(t)===R)?!1:a},set(e,n,s,a){const t=e[d];let r=t.s.get(n);r===void 0&&(O(()=>a[n]),r=t.s.get(n)),r!==void 0&&v(r,b(s,t));const i=t.a,c=!(n in e);if(i&&n==="length")for(let f=s;f<e.length;f+=1){const o=t.s.get(f+"");o!==void 0&&v(o,R)}var l=Reflect.getOwnPropertyDescriptor(e,n);if(l!=null&&l.set?l.set.call(a,s):e[n]=s,c){if(i){const f=t.s.get("length"),o=e.length;f!==void 0&&f.v!==o&&v(f,o)}z(t.v)}return!0},ownKeys(e){const n=e[d];return _(n.v),Reflect.ownKeys(e)}};function me(e,n,s,a=null,t=!1){g&&ne();var r=e,i=null,c=null,l=null,f=t?p:0;$(()=>{if(l===(l=!!n()))return;let o=!1;if(g){const h=r.data===te;l===h&&(r=se(),ae(r),U(!1),o=!0)}l?(i?L(i):i=M(()=>s(r)),c&&q(c,()=>{c=null})):(c?L(c):a&&(c=M(()=>a(r))),i&&q(i,()=>{i=null})),o&&U(!0)},f),g&&(r=re)}function he(e,n,s,a){var N;var t=(s&fe)!==0,r=(s&ue)!==0,i=(s&le)!==0,c=(s&ce)!==0,l=e[n],f=(N=A(e,n))==null?void 0:N.set,o=a,h=!0,T=()=>(c&&h&&(h=!1,o=O(a)),o);l===void 0&&a!==void 0&&(f&&r&&J(),l=T(),f&&f(l));var y;if(r)y=()=>{var u=e[n];return u===void 0?T():(h=!0,u)};else{var D=(t?B:W)(()=>e[n]);D.f|=Q,y=()=>{var u=_(D);return u!==void 0&&(o=void 0),u===void 0?o:u}}if(!(s&ie))return y;if(f){var Y=e.$$legacy;return function(u,m){return arguments.length>0?((!r||!m||Y)&&f(m?y():u),u):y()}}var S=!1,E=X(l),P=B(()=>{var u=y(),m=_(E);return S?(S=!1,m):E.v=u});return t||(P.equals=V),function(u,m){var k=_(P);if(arguments.length>0){const x=m?_(P):r&&i?b(u):u;return P.equals(x)||(S=!0,v(E,x),_(P)),u}return k}}function Pe(e){I===null&&oe(),I.l!==null?_e(I).m.push(e):ee(()=>{const n=O(e);if(typeof n=="function")return n})}function _e(e){var n=e.l;return n.u??(n.u={a:[],b:[],m:[]})}export{b as a,me as i,Pe as o,he as p};
