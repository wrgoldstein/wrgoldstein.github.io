import{f as h,o as i,s as f,a as $,t as x,p as b}from"../chunks/disclose-version.DOvlZpYt.js";import{M as k,u as p,l as j,N as l,n as w,O as y,k as m,P as E,Q as a,R as M,m as N,s as O,h as P,t as Q,j as R}from"../chunks/runtime.KCf5Iwgn.js";import{s as g}from"../chunks/render.BFlZD6Jo.js";import{s as S}from"../chunks/entry.lodniuoj.js";function q(){const s=j,e=s.l.u;e&&(e.b.length&&k(()=>{d(s),l(e.b)}),p(()=>{const r=w(()=>e.m.map(y));return()=>{for(const t of r)typeof t=="function"&&t()}}),e.a.length&&p(()=>{d(s),l(e.a)}))}function d(s){if(s.l.s)for(const e of s.l.s)m(e);E(s.s)}function z(s,e,r){if(s==null)return e(void 0),a;const t=s.subscribe(e,r);return t.unsubscribe?()=>t.unsubscribe():t}function A(s,e,r){const t=r[e]??(r[e]={store:null,source:N(void 0),unsubscribe:a});if(t.store!==s)if(t.unsubscribe(),t.store=s??null,s==null)t.source.v=void 0,t.unsubscribe=a;else{var u=!0;t.unsubscribe=z(s,n=>{u?t.source.v=n:O(t.source,n)}),u=!1}return m(t.source)}function B(){const s={};return M(()=>{for(var e in s)s[e].unsubscribe()}),s}const C=()=>{const s=S;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},D={subscribe(s){return C().page.subscribe(s)}};var F=x("<h1> </h1> <p> </p>",1);function K(s,e){P(e,!1);const r=B(),t=()=>A(D,"$page",r);q();var u=F(),n=h(u),v=i(n);b(n);var o=f(f(n,!0)),_=i(o);b(o),Q(()=>{var c;g(v,t().status),g(_,(c=t().error)==null?void 0:c.message)}),$(s,u),R()}export{K as component};
