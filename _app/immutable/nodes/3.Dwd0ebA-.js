const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../chunks/svelte_animations.BTrujO20.js","../chunks/disclose-version.DNOx7Oqc.js","../chunks/runtime.C-37iwFS.js","../chunks/each.CnkBLtXS.js","../chunks/index-client.C8niFDdS.js","../chunks/attributes.rdWudkkO.js","../chunks/render.BzjjO4gR.js"])))=>i.map(i=>d[i]);
import{_ as q}from"../chunks/preload-helper.D6kgxu3v.js";import{H as C}from"../chunks/control.CYgJF_JY.js";import{l as d,m as t,n as w,t as P,$ as L,p as R,o as g}from"../chunks/disclose-version.DNOx7Oqc.js";import{h as U,t as V,j as z}from"../chunks/runtime.C-37iwFS.js";import{h as A,s as N}from"../chunks/render.BzjjO4gR.js";import{s as r}from"../chunks/attributes.rdWudkkO.js";const W=(o,e,s)=>{const a=o[e];return a?typeof a=="function"?a():Promise.resolve(a):new Promise((k,n)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(n.bind(null,new Error("Unknown variable dynamic import: "+e+(e.split("/").length!==s?". Note that variables only represent file names one level deep.":""))))})};function Z(o,e){throw new C(o,e)}new TextEncoder;const B=async({params:o})=>{try{const e=await W(Object.assign({"../../../lib/posts/svelte_animations.md":()=>q(()=>import("../chunks/svelte_animations.BTrujO20.js"),__vite__mapDeps([0,1,2,3,4,5,6]),import.meta.url)}),`../../../lib/posts/${o.post}.md`,6);return{PostContent:e.default,meta:{...e.metadata,slug:o.post}}}catch(e){Z(404,e)}},at=Object.freeze(Object.defineProperty({__proto__:null,load:B},Symbol.toStringTag,{value:"Module"}));var F=P('<meta data-key="description" name="description"> <meta property="og:type" content="article"> <meta property="og:title"> <meta name="twitter:title"> <meta property="og:description"> <meta name="twitter:description"> <meta property="og:image:width"> <meta property="og:image:height">',1),G=P('<article class="tracking-wide prose mx-auto mt-16 prose-a:text-twirl prose-pre:border prose-pre:border-neutral-700 prose-img:rounded-xl prose-figcaption:lg:-ml-[5ch] prose-figcaption:lg:max-w-[75ch] prose-img:lg:-ml-[5ch] prose-img:lg:max-w-[90ch] px-8 lg:max-w-[85ch] mb-16 svelte-13sntge"><a href="/">back</a> <img class="cover-image" alt=""> <div class="flex gap-2 text-sm"> </div> <h1 class="text-5xl font-[400] text-purple mt-6 mb-12"> </h1> <!></article>');function ot(o,e){U(e,!0);const s={year:"numeric",month:"long",day:"numeric",timeZone:"utc"},{title:a,category:k,excerpt:n,date:E,updated:J,coverImage:O,coverWidth:m,coverHeight:c,categories:K}=e.data.meta,{PostContent:j}=e.data;var p=G();A(I=>{var v=F();L.title=`${a??""}`;var _=R(v);r(_,"content",n);var M=t(t(_,!0)),f=t(t(M,!0));r(f,"content",a);var h=t(t(f,!0));r(h,"content",a);var y=t(t(h,!0));r(y,"content",n);var x=t(t(y,!0));r(x,"content",n);var b=t(t(x,!0));r(b,"content",m);var $=t(t(b,!0));r($,"content",c),w(I,v)});var D=d(p),i=t(t(D,!0));r(i,"src",O),r(i,"style",`aspect-ratio: ${m??""} / ${c??""};`),r(i,"width",m),r(i,"height",c);var l=t(t(i,!0)),H=d(l);V(()=>N(H,new Date(E).toLocaleDateString("en-US",s))),g(l);var u=t(t(l,!0)),S=d(u);S.nodeValue=a,g(u);var T=t(t(u,!0));j(T,{}),g(p),w(o,p),z()}export{ot as component,at as universal};