import{S as h,a3 as D,a4 as A,a5 as v,a6 as S,A as l,w as x,a2 as u,g as c,N as T,a7 as j,k as E,a8 as K}from"./runtime.CXcYMYoM.js";function y(s,N=null,L){if(typeof s!="object"||s===null||h in s)return s;const P=E(s);if(P!==D&&P!==A)return s;var i=new Map,b=K(s),o=v(0);b&&i.set("length",v(s.length));var g;return new Proxy(s,{defineProperty(f,e,t){(!("value"in t)||t.configurable===!1||t.enumerable===!1||t.writable===!1)&&S();var n=i.get(e);return n===void 0?(n=v(t.value),i.set(e,n)):l(n,y(t.value,g)),!0},deleteProperty(f,e){var t=i.get(e);if(t===void 0)e in f&&i.set(e,v(u));else{if(b&&typeof e=="string"){var n=i.get("length"),r=Number(e);Number.isInteger(r)&&r<n.v&&l(n,r)}l(t,u),R(o)}return!0},get(f,e,t){var d;if(e===h)return s;var n=i.get(e),r=e in f;if(n===void 0&&(!r||(d=x(f,e))!=null&&d.writable)&&(n=v(y(r?f[e]:u,g)),i.set(e,n)),n!==void 0){var a=c(n);return a===u?void 0:a}return Reflect.get(f,e,t)},getOwnPropertyDescriptor(f,e){var t=Reflect.getOwnPropertyDescriptor(f,e);if(t&&"value"in t){var n=i.get(e);n&&(t.value=c(n))}else if(t===void 0){var r=i.get(e),a=r==null?void 0:r.v;if(r!==void 0&&a!==u)return{enumerable:!0,configurable:!0,value:a,writable:!0}}return t},has(f,e){var a;if(e===h)return!0;var t=i.get(e),n=t!==void 0&&t.v!==u||Reflect.has(f,e);if(t!==void 0||T!==null&&(!n||(a=x(f,e))!=null&&a.writable)){t===void 0&&(t=v(n?y(f[e],g):u),i.set(e,t));var r=c(t);if(r===u)return!1}return n},set(f,e,t,n){var O;var r=i.get(e),a=e in f;if(b&&e==="length")for(var d=t;d<r.v;d+=1){var w=i.get(d+"");w!==void 0?l(w,u):d in f&&(w=v(u),i.set(d+"",w))}r===void 0?(!a||(O=x(f,e))!=null&&O.writable)&&(r=v(void 0),l(r,y(t,g)),i.set(e,r)):(a=r.v!==u,l(r,y(t,g)));var _=Reflect.getOwnPropertyDescriptor(f,e);if(_!=null&&_.set&&_.set.call(n,t),!a){if(b&&typeof e=="string"){var I=i.get("length"),m=Number(e);Number.isInteger(m)&&m>=I.v&&l(I,m+1)}R(o)}return!0},ownKeys(f){c(o);var e=Reflect.ownKeys(f).filter(r=>{var a=i.get(r);return a===void 0||a.v!==u});for(var[t,n]of i)n.v!==u&&!(t in f)&&e.push(t);return e},setPrototypeOf(){j()}})}function R(s,N=1){l(s,s.v+N)}export{y as p};
