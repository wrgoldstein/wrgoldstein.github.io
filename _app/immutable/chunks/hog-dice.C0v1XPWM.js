var Vt=Object.defineProperty;var ht=t=>{throw TypeError(t)};var Dt=(t,n,e)=>n in t?Vt(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e;var mt=(t,n,e)=>Dt(t,typeof n!="symbol"?n+"":n,e),Q=(t,n,e)=>n.has(t)||ht("Cannot "+e);var N=(t,n,e)=>(Q(t,n,"read from private field"),e?e.call(t):n.get(t)),O=(t,n,e)=>n.has(t)?ht("Cannot add the same private member more than once"):n instanceof WeakSet?n.add(t):n.set(t,e),tt=(t,n,e,r)=>(Q(t,n,"write to private field"),r?r.call(t,e):n.set(t,e),e),dt=(t,n,e)=>(Q(t,n,"access private method"),e);import{f as Ct,s as _,o as Gt,a as gt,t as Lt,p as pt,G as Bt}from"./disclose-version.DOvlZpYt.js";import{T as Wt,n as Xt,h as Yt,j as Zt,k as L,s as Ut,d as Jt,t as nt}from"./runtime.KCf5Iwgn.js";import{e as Kt,i as Qt}from"./each.DfVqkM19.js";import{s as B}from"./attributes.BOuw2Dhl.js";import{o as tn}from"./index-client.Dw-JqChD.js";import{S as yt,a as nn,c as en,i as it,b as wt,d as kt,e as rn,r as an}from"./transform.tw96wDuq.js";var j,H,V,J,Tt;const K=class K{constructor(n){O(this,J);O(this,j,new WeakMap);O(this,H);O(this,V);tt(this,V,n)}observe(n,e){var r=N(this,j).get(n)||new Set;return r.add(e),N(this,j).set(n,r),dt(this,J,Tt).call(this).observe(n,N(this,V)),()=>{var i=N(this,j).get(n);i.delete(e),i.size===0&&(N(this,j).delete(n),N(this,H).unobserve(n))}}};j=new WeakMap,H=new WeakMap,V=new WeakMap,J=new WeakSet,Tt=function(){return N(this,H)??tt(this,H,new ResizeObserver(n=>{for(var e of n){K.entries.set(e.target,e);for(var r of N(this,j).get(e.target)||[])r(e)}}))},mt(K,"entries",new WeakMap);let at=K;var on=new at({box:"border-box"});function un(t,n,e){var r=on.observe(t,()=>e(t[n]));Wt(()=>(Xt(()=>e(t[n])),r))}function X(t,n){return t==null||n==null?NaN:t<n?-1:t>n?1:t>=n?0:NaN}function sn(t,n){return t==null||n==null?NaN:n<t?-1:n>t?1:n>=t?0:NaN}function Ft(t){let n,e,r;t.length!==2?(n=X,e=(s,f)=>X(t(s),f),r=(s,f)=>t(s)-f):(n=t===X||t===sn?t:fn,e=t,r=t);function i(s,f,o=0,d=s.length){if(o<d){if(n(f,f)!==0)return d;do{const l=o+d>>>1;e(s[l],f)<0?o=l+1:d=l}while(o<d)}return o}function u(s,f,o=0,d=s.length){if(o<d){if(n(f,f)!==0)return d;do{const l=o+d>>>1;e(s[l],f)<=0?o=l+1:d=l}while(o<d)}return o}function a(s,f,o=0,d=s.length){const l=i(s,f,o,d-1);return l>o&&r(s[l-1],f)>-r(s[l],f)?l-1:l}return{left:i,center:a,right:u}}function fn(){return 0}function cn(t){return t===null?NaN:+t}const ln=Ft(X),hn=ln.right;Ft(cn).center;class Mt extends Map{constructor(n,e=gn){if(super(),Object.defineProperties(this,{_intern:{value:new Map},_key:{value:e}}),n!=null)for(const[r,i]of n)this.set(r,i)}get(n){return super.get(vt(this,n))}has(n){return super.has(vt(this,n))}set(n,e){return super.set(mn(this,n),e)}delete(n){return super.delete(dn(this,n))}}function vt({_intern:t,_key:n},e){const r=n(e);return t.has(r)?t.get(r):e}function mn({_intern:t,_key:n},e){const r=n(e);return t.has(r)?t.get(r):(t.set(r,e),e)}function dn({_intern:t,_key:n},e){const r=n(e);return t.has(r)&&(e=t.get(r),t.delete(r)),e}function gn(t){return t!==null&&typeof t=="object"?t.valueOf():t}const pn=Math.sqrt(50),yn=Math.sqrt(10),wn=Math.sqrt(2);function Y(t,n,e){const r=(n-t)/Math.max(0,e),i=Math.floor(Math.log10(r)),u=r/Math.pow(10,i),a=u>=pn?10:u>=yn?5:u>=wn?2:1;let s,f,o;return i<0?(o=Math.pow(10,-i)/a,s=Math.round(t*o),f=Math.round(n*o),s/o<t&&++s,f/o>n&&--f,o=-o):(o=Math.pow(10,i)*a,s=Math.round(t/o),f=Math.round(n/o),s*o<t&&++s,f*o>n&&--f),f<s&&.5<=e&&e<2?Y(t,n,e*2):[s,f,o]}function kn(t,n,e){if(n=+n,t=+t,e=+e,!(e>0))return[];if(t===n)return[t];const r=n<t,[i,u,a]=r?Y(n,t,e):Y(t,n,e);if(!(u>=i))return[];const s=u-i+1,f=new Array(s);if(r)if(a<0)for(let o=0;o<s;++o)f[o]=(u-o)/-a;else for(let o=0;o<s;++o)f[o]=(u-o)*a;else if(a<0)for(let o=0;o<s;++o)f[o]=(i+o)/-a;else for(let o=0;o<s;++o)f[o]=(i+o)*a;return f}function ot(t,n,e){return n=+n,t=+t,e=+e,Y(t,n,e)[2]}function Mn(t,n,e){n=+n,t=+t,e=+e;const r=n<t,i=r?ot(n,t,e):ot(t,n,e);return(r?-1:1)*(i<0?1/-i:i)}function vn(t){return t}var et=1,rt=2,ut=3,R=4,bt=1e-6;function bn(t){return"translate("+t+",0)"}function xn(t){return"translate(0,"+t+")"}function An(t){return n=>+t(n)}function Nn(t,n){return n=Math.max(0,t.bandwidth()-n*2)/2,t.round()&&(n=Math.round(n)),e=>+t(e)+n}function Sn(){return!this.__axis}function It(t,n){var e=[],r=null,i=null,u=6,a=6,s=3,f=typeof window<"u"&&window.devicePixelRatio>1?0:.5,o=t===et||t===R?-1:1,d=t===R||t===rt?"x":"y",l=t===et||t===ut?bn:xn;function c(h){var y=r??(n.ticks?n.ticks.apply(n,e):n.domain()),M=i??(n.tickFormat?n.tickFormat.apply(n,e):vn),v=Math.max(u,0)+s,k=n.range(),S=+k[0]+f,b=+k[k.length-1]+f,T=(n.bandwidth?Nn:An)(n.copy(),f),g=h.selection?h.selection():h,z=g.selectAll(".domain").data([null]),x=g.selectAll(".tick").data(y,n).order(),F=x.exit(),I=x.enter().append("g").attr("class","tick"),P=x.select("line"),m=x.select("text");z=z.merge(z.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),x=x.merge(I),P=P.merge(I.append("line").attr("stroke","currentColor").attr(d+"2",o*u)),m=m.merge(I.append("text").attr("fill","currentColor").attr(d,o*v).attr("dy",t===et?"0em":t===ut?"0.71em":"0.32em")),h!==g&&(z=z.transition(h),x=x.transition(h),P=P.transition(h),m=m.transition(h),F=F.transition(h).attr("opacity",bt).attr("transform",function(w){return isFinite(w=T(w))?l(w+f):this.getAttribute("transform")}),I.attr("opacity",bt).attr("transform",function(w){var p=this.parentNode.__axis;return l((p&&isFinite(p=p(w))?p:T(w))+f)})),F.remove(),z.attr("d",t===R||t===rt?a?"M"+o*a+","+S+"H"+f+"V"+b+"H"+o*a:"M"+f+","+S+"V"+b:a?"M"+S+","+o*a+"V"+f+"H"+b+"V"+o*a:"M"+S+","+f+"H"+b),x.attr("opacity",1).attr("transform",function(w){return l(T(w)+f)}),P.attr(d+"2",o*u),m.attr(d,o*v).text(M),g.filter(Sn).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===rt?"start":t===R?"end":"middle"),g.each(function(){this.__axis=T})}return c.scale=function(h){return arguments.length?(n=h,c):n},c.ticks=function(){return e=Array.from(arguments),c},c.tickArguments=function(h){return arguments.length?(e=h==null?[]:Array.from(h),c):e.slice()},c.tickValues=function(h){return arguments.length?(r=h==null?null:Array.from(h),c):r&&r.slice()},c.tickFormat=function(h){return arguments.length?(i=h,c):i},c.tickSize=function(h){return arguments.length?(u=a=+h,c):u},c.tickSizeInner=function(h){return arguments.length?(u=+h,c):u},c.tickSizeOuter=function(h){return arguments.length?(a=+h,c):a},c.tickPadding=function(h){return arguments.length?(s=+h,c):s},c.offset=function(h){return arguments.length?(f=+h,c):f},c}function zn(t){return It(ut,t)}function Pn(t){return It(R,t)}function xt(t){return typeof t=="string"?new yt([[document.querySelector(t)]],[document.documentElement]):new yt([[t]],nn)}function _n(t,n){n||(n=[]);var e=t?Math.min(n.length,t.length):0,r=n.slice(),i;return function(u){for(i=0;i<e;++i)r[i]=t[i]*(1-u)+n[i]*u;return r}}function jn(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function Tn(t,n){var e=n?n.length:0,r=t?Math.min(e,t.length):0,i=new Array(r),u=new Array(e),a;for(a=0;a<r;++a)i[a]=ft(t[a],n[a]);for(;a<e;++a)u[a]=n[a];return function(s){for(a=0;a<r;++a)u[a]=i[a](s);return u}}function Fn(t,n){var e=new Date;return t=+t,n=+n,function(r){return e.setTime(t*(1-r)+n*r),e}}function In(t,n){var e={},r={},i;(t===null||typeof t!="object")&&(t={}),(n===null||typeof n!="object")&&(n={});for(i in n)i in t?e[i]=ft(t[i],n[i]):r[i]=n[i];return function(u){for(i in e)r[i]=e[i](u);return r}}function ft(t,n){var e=typeof n,r;return n==null||e==="boolean"?en(n):(e==="number"?it:e==="string"?(r=wt(n))?(n=r,kt):rn:n instanceof wt?kt:n instanceof Date?Fn:jn(n)?_n:Array.isArray(n)?Tn:typeof n.valueOf!="function"&&typeof n.toString!="function"||isNaN(n)?In:it)(t,n)}function $n(t,n){return t=+t,n=+n,function(e){return Math.round(t*(1-e)+n*e)}}function En(t){return Math.abs(t=Math.round(t))>=1e21?t.toLocaleString("en").replace(/,/g,""):t.toString(10)}function Z(t,n){if((e=(t=n?t.toExponential(n-1):t.toExponential()).indexOf("e"))<0)return null;var e,r=t.slice(0,e);return[r.length>1?r[0]+r.slice(2):r,+t.slice(e+1)]}function q(t){return t=Z(Math.abs(t)),t?t[1]:NaN}function Hn(t,n){return function(e,r){for(var i=e.length,u=[],a=0,s=t[0],f=0;i>0&&s>0&&(f+s+1>r&&(s=Math.max(1,r-f)),u.push(e.substring(i-=s,i+s)),!((f+=s+1)>r));)s=t[a=(a+1)%t.length];return u.reverse().join(n)}}function qn(t){return function(n){return n.replace(/[0-9]/g,function(e){return t[+e]})}}var On=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function U(t){if(!(n=On.exec(t)))throw new Error("invalid format: "+t);var n;return new ct({fill:n[1],align:n[2],sign:n[3],symbol:n[4],zero:n[5],width:n[6],comma:n[7],precision:n[8]&&n[8].slice(1),trim:n[9],type:n[10]})}U.prototype=ct.prototype;function ct(t){this.fill=t.fill===void 0?" ":t.fill+"",this.align=t.align===void 0?">":t.align+"",this.sign=t.sign===void 0?"-":t.sign+"",this.symbol=t.symbol===void 0?"":t.symbol+"",this.zero=!!t.zero,this.width=t.width===void 0?void 0:+t.width,this.comma=!!t.comma,this.precision=t.precision===void 0?void 0:+t.precision,this.trim=!!t.trim,this.type=t.type===void 0?"":t.type+""}ct.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function Rn(t){t:for(var n=t.length,e=1,r=-1,i;e<n;++e)switch(t[e]){case".":r=i=e;break;case"0":r===0&&(r=e),i=e;break;default:if(!+t[e])break t;r>0&&(r=0);break}return r>0?t.slice(0,r)+t.slice(i+1):t}var $t;function Vn(t,n){var e=Z(t,n);if(!e)return t+"";var r=e[0],i=e[1],u=i-($t=Math.max(-8,Math.min(8,Math.floor(i/3)))*3)+1,a=r.length;return u===a?r:u>a?r+new Array(u-a+1).join("0"):u>0?r.slice(0,u)+"."+r.slice(u):"0."+new Array(1-u).join("0")+Z(t,Math.max(0,n+u-1))[0]}function At(t,n){var e=Z(t,n);if(!e)return t+"";var r=e[0],i=e[1];return i<0?"0."+new Array(-i).join("0")+r:r.length>i+1?r.slice(0,i+1)+"."+r.slice(i+1):r+new Array(i-r.length+2).join("0")}const Nt={"%":(t,n)=>(t*100).toFixed(n),b:t=>Math.round(t).toString(2),c:t=>t+"",d:En,e:(t,n)=>t.toExponential(n),f:(t,n)=>t.toFixed(n),g:(t,n)=>t.toPrecision(n),o:t=>Math.round(t).toString(8),p:(t,n)=>At(t*100,n),r:At,s:Vn,X:t=>Math.round(t).toString(16).toUpperCase(),x:t=>Math.round(t).toString(16)};function St(t){return t}var zt=Array.prototype.map,Pt=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function Dn(t){var n=t.grouping===void 0||t.thousands===void 0?St:Hn(zt.call(t.grouping,Number),t.thousands+""),e=t.currency===void 0?"":t.currency[0]+"",r=t.currency===void 0?"":t.currency[1]+"",i=t.decimal===void 0?".":t.decimal+"",u=t.numerals===void 0?St:qn(zt.call(t.numerals,String)),a=t.percent===void 0?"%":t.percent+"",s=t.minus===void 0?"−":t.minus+"",f=t.nan===void 0?"NaN":t.nan+"";function o(l){l=U(l);var c=l.fill,h=l.align,y=l.sign,M=l.symbol,v=l.zero,k=l.width,S=l.comma,b=l.precision,T=l.trim,g=l.type;g==="n"?(S=!0,g="g"):Nt[g]||(b===void 0&&(b=12),T=!0,g="g"),(v||c==="0"&&h==="=")&&(v=!0,c="0",h="=");var z=M==="$"?e:M==="#"&&/[boxX]/.test(g)?"0"+g.toLowerCase():"",x=M==="$"?r:/[%p]/.test(g)?a:"",F=Nt[g],I=/[defgprs%]/.test(g);b=b===void 0?6:/[gprs]/.test(g)?Math.max(1,Math.min(21,b)):Math.max(0,Math.min(20,b));function P(m){var w=z,p=x,$,lt,D;if(g==="c")p=F(m)+p,m="";else{m=+m;var C=m<0||1/m<0;if(m=isNaN(m)?f:F(Math.abs(m),b),T&&(m=Rn(m)),C&&+m==0&&y!=="+"&&(C=!1),w=(C?y==="("?y:s:y==="-"||y==="("?"":y)+w,p=(g==="s"?Pt[8+$t/3]:"")+p+(C&&y==="("?")":""),I){for($=-1,lt=m.length;++$<lt;)if(D=m.charCodeAt($),48>D||D>57){p=(D===46?i+m.slice($+1):m.slice($))+p,m=m.slice(0,$);break}}}S&&!v&&(m=n(m,1/0));var G=w.length+m.length+p.length,A=G<k?new Array(k-G+1).join(c):"";switch(S&&v&&(m=n(A+m,A.length?k-p.length:1/0),A=""),h){case"<":m=w+m+p+A;break;case"=":m=w+A+m+p;break;case"^":m=A.slice(0,G=A.length>>1)+w+m+p+A.slice(G);break;default:m=A+w+m+p;break}return u(m)}return P.toString=function(){return l+""},P}function d(l,c){var h=o((l=U(l),l.type="f",l)),y=Math.max(-8,Math.min(8,Math.floor(q(c)/3)))*3,M=Math.pow(10,-y),v=Pt[8+y/3];return function(k){return h(M*k)+v}}return{format:o,formatPrefix:d}}var W,Et,Ht;Cn({thousands:",",grouping:[3],currency:["$",""]});function Cn(t){return W=Dn(t),Et=W.format,Ht=W.formatPrefix,W}function Gn(t){return Math.max(0,-q(Math.abs(t)))}function Ln(t,n){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(q(n)/3)))*3-q(Math.abs(t)))}function Bn(t,n){return t=Math.abs(t),n=Math.abs(n)-t,Math.max(0,q(n)-q(t))+1}function qt(t,n){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(n).domain(t);break}return this}const _t=Symbol("implicit");function Ot(){var t=new Mt,n=[],e=[],r=_t;function i(u){let a=t.get(u);if(a===void 0){if(r!==_t)return r;t.set(u,a=n.push(u)-1)}return e[a%e.length]}return i.domain=function(u){if(!arguments.length)return n.slice();n=[],t=new Mt;for(const a of u)t.has(a)||t.set(a,n.push(a)-1);return i},i.range=function(u){return arguments.length?(e=Array.from(u),i):e.slice()},i.unknown=function(u){return arguments.length?(r=u,i):r},i.copy=function(){return Ot(n,e).unknown(r)},qt.apply(i,arguments),i}function Wn(t){return function(){return t}}function Xn(t){return+t}var jt=[0,1];function E(t){return t}function st(t,n){return(n-=t=+t)?function(e){return(e-t)/n}:Wn(isNaN(n)?NaN:.5)}function Yn(t,n){var e;return t>n&&(e=t,t=n,n=e),function(r){return Math.max(t,Math.min(n,r))}}function Zn(t,n,e){var r=t[0],i=t[1],u=n[0],a=n[1];return i<r?(r=st(i,r),u=e(a,u)):(r=st(r,i),u=e(u,a)),function(s){return u(r(s))}}function Un(t,n,e){var r=Math.min(t.length,n.length)-1,i=new Array(r),u=new Array(r),a=-1;for(t[r]<t[0]&&(t=t.slice().reverse(),n=n.slice().reverse());++a<r;)i[a]=st(t[a],t[a+1]),u[a]=e(n[a],n[a+1]);return function(s){var f=hn(t,s,1,r)-1;return u[f](i[f](s))}}function Jn(t,n){return n.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown())}function Kn(){var t=jt,n=jt,e=ft,r,i,u,a=E,s,f,o;function d(){var c=Math.min(t.length,n.length);return a!==E&&(a=Yn(t[0],t[c-1])),s=c>2?Un:Zn,f=o=null,l}function l(c){return c==null||isNaN(c=+c)?u:(f||(f=s(t.map(r),n,e)))(r(a(c)))}return l.invert=function(c){return a(i((o||(o=s(n,t.map(r),it)))(c)))},l.domain=function(c){return arguments.length?(t=Array.from(c,Xn),d()):t.slice()},l.range=function(c){return arguments.length?(n=Array.from(c),d()):n.slice()},l.rangeRound=function(c){return n=Array.from(c),e=$n,d()},l.clamp=function(c){return arguments.length?(a=c?!0:E,d()):a!==E},l.interpolate=function(c){return arguments.length?(e=c,d()):e},l.unknown=function(c){return arguments.length?(u=c,l):u},function(c,h){return r=c,i=h,d()}}function Qn(){return Kn()(E,E)}function te(t,n,e,r){var i=Mn(t,n,e),u;switch(r=U(r??",f"),r.type){case"s":{var a=Math.max(Math.abs(t),Math.abs(n));return r.precision==null&&!isNaN(u=Ln(i,a))&&(r.precision=u),Ht(r,a)}case"":case"e":case"g":case"p":case"r":{r.precision==null&&!isNaN(u=Bn(i,Math.max(Math.abs(t),Math.abs(n))))&&(r.precision=u-(r.type==="e"));break}case"f":case"%":{r.precision==null&&!isNaN(u=Gn(i))&&(r.precision=u-(r.type==="%")*2);break}}return Et(r)}function ne(t){var n=t.domain;return t.ticks=function(e){var r=n();return kn(r[0],r[r.length-1],e??10)},t.tickFormat=function(e,r){var i=n();return te(i[0],i[i.length-1],e??10,r)},t.nice=function(e){e==null&&(e=10);var r=n(),i=0,u=r.length-1,a=r[i],s=r[u],f,o,d=10;for(s<a&&(o=a,a=s,s=o,o=i,i=u,u=o);d-- >0;){if(o=ot(a,s,e),o===f)return r[i]=a,r[u]=s,n(r);if(o>0)a=Math.floor(a/o)*o,s=Math.ceil(s/o)*o;else if(o<0)a=Math.ceil(a*o)/o,s=Math.floor(s*o)/o;else break;f=o}return t},t}function Rt(){var t=Qn();return t.copy=function(){return Jn(t,Rt())},qt.apply(t,arguments),ne(t)}var ee=Bt('<rect fill="purple"></rect>'),re=Lt('<p>I’m giving a presentation at <a href="http://observer.com/2015/08/artsys-wet-hot-american-summer/" rel="nofollow">Artsy’s offsite</a> on Analytics at Artsy, and I wanted an accessible and relevant ice breaker. I decided to go with the <a href="http://www.amstat.org/publications/jse/v11n2/feldman.html" rel="nofollow">HOG Dice Game</a> to try to get at how data analytics can be useful for solving real world problems. The game is simple:</p> <blockquote><ol><li>Players take turns rolling dice. Each player may choose any number of dice from one up to the total number of dice available. (We recommend that at least ten dice be available for each player or team.)</li> <li>The number of dice a player chooses to roll can vary from turn to turn.</li> <li>The player’s score for a turn is zero if at least one of the dice comes up with the value one. Otherwise, the player’s score for the turn is the sum of the faces showing on the dice. (Rolling a one sets only the score for that turn to zero, not the total cumulative score for the player.)</li> <li>A cumulative running total of the scores is kept for each player.</li> <li>The first player to reach or exceed a predetermined score (100 works well) wins the game. If more than one player reaches the predetermined score on the same turn then the player with the highest point total wins the game.</li></ol></blockquote> <p>To help explain the optimal results, I’ve made a small visualization of the theoretical vs experimental best choice for how many dice to roll. The below chart shows the analytical solution (orange) alongside the average return from a dice throw simulation. The experimental converges to the theoretical, but not as quickly as you might think.</p> <p>Here’s the expected value for each number of dice a player can choose:</p> <div class="w-full"><svg class="svelte-5iyv0k"></svg></div>',1);const le={layout:"post",title:"Hog Dice",date:"2016-07-24T00:00:00.000Z"};function he(t,n){Yt(n,!0);let e=40,r=Jt(void 0),i=an(e),u=Ot(i).domain(i).range([0,700]),a=Rt().domain([400,0]).range([0,700]);function s(M){return Math.pow(5/6,M)*M*4}tn(()=>{xt("svg").append("g").attr("transform",`translate(0,${L(r)})`).call(zn(u)),xt("svg").append("g").call(Pn(a))});var f=re(),o=Ct(f),d=_(_(o,!0)),l=_(_(d,!0)),c=_(_(l,!0)),h=_(_(c,!0)),y=Gt(h);Kt(y,21,()=>i,Qt,(M,v)=>{var k=ee();nt(()=>B(k,"x",u(L(v)))),nt(()=>B(k,"y",a(s(L(v))))),nt(()=>B(k,"height",a(0)-a(s(L(v))))),B(k,"width",10),gt(M,k)}),pt(y),pt(h),un(y,"clientHeight",M=>Ut(r,M)),gt(t,f),Zt()}export{he as default,le as metadata};
