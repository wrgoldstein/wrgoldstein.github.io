import{J as Y,K as q,M as F,P as M,N as U,g as l,w as p,u as g,O as y,R as x,Q as h,T as G,U as V,V as Z,W as $,S as z,X as H,y as L,Y as J,Z as K,_ as w,a0 as Q}from"./runtime.bkAFKJgj.js";import{p as W}from"./proxy.CQPsOVN2.js";import{c as X}from"./store.BsSpNLuv.js";function B(r){for(var a=w,n=w;a!==null&&!(a.f&(y|x));)a=a.parent;try{return h(a),r()}finally{h(n)}}function ae(r,a,n,v){var b;var R=(n&G)!==0,d=!V||(n&Z)!==0,c=(n&$)!==0,C=(n&Q)!==0,I=!1,i;c?[i,I]=X(()=>r[a]):i=r[a];var D=z in r||H in r,_=((b=Y(r,a))==null?void 0:b.set)??(D&&c&&a in r?e=>r[a]=e:void 0),t=v,P=!0,o=!1,O=()=>(o=!0,P&&(P=!1,C?t=g(v):t=v),t);i===void 0&&v!==void 0&&(_&&d&&q(),i=O(),_&&_(i));var u;if(d)u=()=>{var e=r[a];return e===void 0?O():(P=!0,o=!1,e)};else{var A=B(()=>(R?L:J)(()=>r[a]));A.f|=F,u=()=>{var e=l(A);return e!==void 0&&(t=void 0),e===void 0?t:e}}if(!(n&M))return u;if(_){var N=r.$$legacy;return function(e,f){return arguments.length>0?((!d||!f||N||I)&&_(f?u():e),e):u()}}var S=!1,T=!1,m=K(i),s=B(()=>L(()=>{var e=u(),f=l(m);return S?(S=!1,T=!0,f):(T=!1,m.v=e)}));return R||(s.equals=U),function(e,f){if(arguments.length>0){const E=f?l(s):d&&c?W(e):e;return s.equals(E)||(S=!0,p(m,E),o&&t!==void 0&&(t=E),g(()=>l(s))),e}return l(s)}}export{ae as p};
