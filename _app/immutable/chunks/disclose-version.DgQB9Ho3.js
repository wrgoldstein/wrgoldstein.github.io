import{a6 as v,ag as i,O as m,ax as p,ay as T,h as f,c as d,T as w,W as y}from"./runtime.DhOOXZ0r.js";function h(r){var t=document.createElement("template");return t.innerHTML=r,t.content}function n(r,t){var e=m;e.nodes_start===null&&(e.nodes_start=r,e.nodes_end=t)}function C(r,t){var e=(t&p)!==0,l=(t&T)!==0,s,_=!r.startsWith("<!>");return()=>{if(f)return n(d,null),d;s===void 0&&(s=h(_?r:"<!>"+r),e||(s=i(s)));var a=l?document.importNode(s,!0):s.cloneNode(!0);if(e){var c=i(a),o=a.lastChild;n(c,o)}else n(a,a);return a}}function M(r,t,e="svg"){var l=!r.startsWith("<!>"),s=(t&p)!==0,_=`<${e}>${l?r:"<!>"+r}</${e}>`,a;return()=>{if(f)return n(d,null),d;if(!a){var c=h(_),o=i(c);if(s)for(a=document.createDocumentFragment();i(o);)a.appendChild(i(o));else a=i(o)}var u=a.cloneNode(!0);if(s){var g=i(u),E=u.lastChild;n(g,E)}else n(u,u);return u}}function L(r=""){if(!f){var t=v(r+"");return n(t,t),t}var e=d;return e.nodeType!==3&&(e.before(e=v()),y(e)),n(e,e),e}function O(){if(f)return n(d,null),d;var r=document.createDocumentFragment(),t=document.createComment(""),e=v();return r.append(t,e),n(t,e),r}function P(r,t){if(f){m.nodes_end=d,w();return}r!==null&&r.before(t)}const N="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(N);export{P as a,n as b,O as c,L as d,h as e,M as n,C as t};
