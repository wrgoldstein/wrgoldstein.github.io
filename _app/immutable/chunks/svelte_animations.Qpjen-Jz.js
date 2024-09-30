import{h as Os,g as cs,c as Gs,v as Ps,u as Ys,x as ys,b as Hs,F as Us,T as Zs,C as Q,f as G,a as W,G as Ds,o as U,s as a,t as Ks,p as Z}from"./disclose-version.CgYhSZhZ.js";import{b as Qs,a as Vs,g as Xs,C as O,M as Js,X as $s,Y as sa,T as aa,z as na,c as ea,Z as oa,q as is,h as V,j as X,t as us,k as p,Q as w,d as la,s as Es}from"./runtime.C-37iwFS.js";import{e as ds,i as Fs}from"./each.BV-JM6ex.js";import{p as I,i as hs,o as ta}from"./index-client.BcPJMPnO.js";import{s as f}from"./attributes.Bnc3ajR3.js";import{b as pa}from"./render.DqDPve6i.js";function S(o,s,l,r,n){var y=o,d="",i;Qs(()=>{d!==(d=s())&&(i&&(Xs(i),i=null),d!==""&&(i=Vs(()=>{if(Os){cs.data;for(var e=Gs(),t=e;e!==null&&(e.nodeType!==8||e.data!=="");)t=e,e=e.nextSibling;if(e===null)throw Ps(),Ys;ys(cs,t),y=Hs(e);return}var h=d+"",E=Us(h);ys(E.firstChild,E.lastChild),y.before(E)})))})}const ms=typeof window<"u",ra=ms?requestAnimationFrame:O,ca=ms?()=>performance.now():()=>Date.now(),A={tick:o=>ra(o),now:()=>ca(),tasks:new Set};function fs(o){A.tasks.forEach(s=>{s.c(o)||(A.tasks.delete(s),s.f())}),A.tasks.size!==0&&A.tick(fs)}function ya(o){let s;return A.tasks.size===0&&A.tick(fs),{promise:new Promise(l=>{A.tasks.add(s={c:o,f:l})}),abort(){A.tasks.delete(s)}}}function R(o,s){o.dispatchEvent(new CustomEvent(s))}function ia(o){const s=o.split("-");return s.length===1?s[0]:s[0]+s.slice(1).map(l=>l[0].toUpperCase()+l.slice(1)).join("")}function Cs(o){const s={},l=o.split(";");for(const r of l){const[n,y]=r.split(":");if(!n||y===void 0)break;const d=ia(n.trim());s[d]=y.trim()}return s}const Ea=o=>o;function da(o,s,l,r){var n=(o&Zs)!==0,y="both",d,i=s.inert,e,t;function h(){return d??(d=l()(s,r==null?void 0:r(),{direction:y}))}var E={is_global:n,in(){s.inert=i,t==null||t.abort(),e==null||e.abort(),R(s,"introstart"),e=K(s,h(),t,1,()=>{R(s,"introend"),e==null||e.abort(),e=d=void 0},void 0)},out(c){t==null||t.abort(),s.inert=!0,R(s,"outrostart"),t=K(s,h(),e,0,()=>{R(s,"outroend"),t==null||t.abort(),t=d=void 0,c==null||c()},void 0),t.reset},stop:()=>{e==null||e.abort(),t==null||t.abort()}},u=ea;if((u.transitions??(u.transitions=[])).push(E),pa){let c=n;if(!c){for(var F=u.parent;F&&F.f&Js;)for(;(F=F.parent)&&!(F.f&$s););c=!F||(F.f&sa)!==0}c&&aa(()=>{na(()=>E.in())})}}function K(o,s,l,r,n,y){var d=r===1;if(oa(s)){var i,e=!1;return is(()=>{if(!e){var D=s({direction:d?"in":"out"});i=K(o,D,l,r,n,y)}}),{abort:()=>{e=!0,i==null||i.abort()},deactivate:()=>i.deactivate(),reset:()=>i.reset(),t:D=>i.t(D)}}if(l==null||l.deactivate(),!(s!=null&&s.duration))return n==null||n(),{abort:O,deactivate:O,reset:O,t:()=>r};const{delay:t=0,css:h,tick:E,easing:u=Ea}=s;var F=A.now()+t,c=(l==null?void 0:l.t(F))??1-r,C=r-c,k=s.duration*Math.abs(C),L=F+k,B,x;return h?is(()=>{var D=[],v=Math.ceil(k/16.666666666666668);if(d&&t>0){let b=Math.ceil(t/16.666666666666668),P=Cs(h(0,1));for(let q=0;q<b;q+=1)D.push(P)}for(var _=0;_<=v;_+=1){var M=c+C*u(_/v),j=h(M,1-M);D.push(Cs(j))}B=o.animate(D,{delay:d?0:t,duration:k+(d?t:0),easing:"linear",fill:"forwards"}),B.finished.then(()=>{n==null||n(),r===1&&B.cancel()}).catch(b=>{if(B.startTime!==null&&B.currentTime!==null)throw b})}):(c===0&&(E==null||E(0,1)),x=ya(D=>{if(D>=L)return E==null||E(r,1-r),n==null||n(),!1;if(D>=F){var v=c+C*u((D-F)/k);E==null||E(v,1-v)}return!0})),{abort:()=>{B&&(B.cancel(),B.effect=null),x==null||x.abort(),y==null||y(),n=void 0,y=void 0},deactivate:()=>{n=void 0,y=void 0},reset:()=>{r===0&&(E==null||E(1,0))},t:D=>{var v=c+C*u((D-F)/k);return Math.min(1,Math.max(0,v))}}}const Fa=o=>o;function Ca(o,{delay:s=0,duration:l=400,easing:r=Fa}={}){const n=+getComputedStyle(o).opacity;return{delay:s,duration:l,easing:r,css:y=>`opacity: ${y*n}`}}var Da=Ds('<path stroke-linecap="square"></path>');function m(o,s){V(s,!0);const l=I(s,"draw",3,"regular"),r=I(s,"stroke",3,"white"),n=I(s,"strokeWidth",3,2),y=I(s,"fill",3,"none"),d=I(s,"strokeDasharray",3,"none"),i=1e3;let e=new Array(i).fill().map((c,C)=>2*Math.PI*(C/i)).map(c=>`L${s.cx+s.r*Math.cos(c)} ${s.cy+s.r*Math.sin(c)}`);const t=l()==="reversed";e=t?e.reverse():e,e[0]=e[0].replace("L","M");let h=w(()=>{if(l()=="none")return i;if(s.time<=s.delay||s.time>s.delay+s.duration+s.hold+5)return 0;let c=i*(s.time-s.delay)/s.duration;return t?1-c:c}),E=w(()=>e.slice(0,p(h)).join(" "));var u=Q(),F=G(u);hs(F,()=>s.time>s.delay&&s.time<s.delay+s.duration,c=>{var C=Da();us(()=>{f(C,"d",p(E)),f(C,"stroke",r()),f(C,"fill",y()),f(C,"stroke-dasharray",d()),f(C,"stroke-width",n())}),da(3,C,()=>Ca),W(c,C)}),W(o,u),X()}function ua(o,s,l){return o<=s?s:o>=l?l:o}var ha=Ds('<line stroke-linecap="square"></line>');function g(o,s){V(s,!0);let l=w(()=>ua((s.time-s.delay)/s.duration,0,1)),r=w(()=>s.x0+(s.x2-s.x0)*p(l)),n=w(()=>s.y0+(s.y2-s.y0)*p(l));var y=Q(),d=G(y);hs(d,()=>p(l)>0,i=>{var e=ha();us(()=>{f(e,"x1",s.x0),f(e,"y1",s.y0),f(e,"x2",p(r)),f(e,"y2",p(n)),f(e,"stroke",s.stroke),f(e,"stroke-dasharray",s.strokeDashArray),f(e,"stroke-width",s.strokeWidth)}),W(i,e)}),W(o,y),X()}var ma=Ks('<svg viewbox="0 0 600 100" class="w-full mt-24 mb-12 mx-auto"><path d="M0 50 L 250 50" stroke="#2C5943" stroke-dasharray="0 1 0"></path><path d="M300 50 L 600 50" stroke="#2C5943" stroke-dasharray="0 1 0"></path><!><rect x="100" y="0" width="100" height="100" rx="15" fill="#2C5943"></rect><!><!><!><!><!><rect x="250" y="0" width="100" height="100" rx="15" fill="#2C5943"></rect><path d="M300 0 L 300 100" stroke="white" stroke-dasharray="0 1 0"></path><path d="M250 50 L 350 50" stroke="white" stroke-dasharray="0 1 0"></path><!><!><!><!><!><rect x="400" y="0" width="100" height="100" rx="15" fill="#2C5943"></rect><!><!><!><!></svg> <p>I build <a href="https://twirldata.com" rel="nofollow">a website recently for work</a>, and as part of that process I got connected to fantastic designer who came up with an awesome vibrant and fun look for the site.</p> <p>One aspect of her vision was to include lots of fun iconographics and animations, and it turned out she’s skilled at making the required 2D renderings in <a href="https://www.adobe.com/products/aftereffects.html" rel="nofollow">AfterEffects</a>.</p> <p>The animations were really cool, but the exported gifs weren’t always as smooth as I would have liked. We achieved a higher quality of visual by switching from gifs to <a href="https://lottiefiles.com/" rel="nofollow">lotties</a>, but I had an feeling I could do the visuals with svg animated by javascript and it would render silky smooth.</p> <svg viewbox="0 0 500 100" class="my-12 mx-auto">rect> <!></svg> <p>The idea is basically to define a svelte <code>$state()</code> variable containing the timing (how far into a loop we are), and then pass that to child components to compute what they should look like based on their own delay, duration, and shape.</p> <p>Here’s everything I ended up needed for the animation timing (cribbed from <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#examples" rel="nofollow">here</a>).</p> <!> <p>What I like about the example I’m recreating here is it’s tight timing and sense of rhythm. To achieve that, we just have a Svelte component that receives the <code>time</code> prop from the parent above, and then computes an SVG <code>&lt;path/&gt;</code> that corresponds to the desired effect and timing.</p> <div class="p-4 bg-gray-200"><p>Note the <a href="https://svelte.dev/docs/svelte-transition" rel="nofollow">svelte/transition</a> package has <code>draw</code> in it, which achieves much of the same effect by <a href="https://css-tricks.com/svg-line-animation-works/" rel="nofollow">stroke-dash animation</a>--- but I wanted my lines to retain their stroke dashes, and also to build towards more complicated shapes that can’t be animated with this trick.</p></div> <p>Once you have the timing, Svelte makes the rest really easy.</p> <svg viewbox="0 0 600 100" class="w-full mx-auto"><!><!><!></svg> <p>The main thing is to compute what fraction of the way through the animation we are based on the timing, delay, and duration.</p> <!> <p>We don’t want the fraction to be less than 0 or greater than 1, so we clamp the value to that interval. It would be nice if <code>clamp</code> were <a href="https://stackoverflow.com/questions/11409895/whats-the-most-elegant-way-to-cap-a-number-to-a-segment#comment137766458_39477954" rel="nofollow">part of Math</a>, but since it’s not, we’ll borrow a suggested implementation:</p> <!> <p>and then we just construct an svg element that uses the fraction to interpolate where it should be</p> <!> <p>The colorful lines above are just</p> <!> <p>The circles are the same deal, mostly. We use trigonometry to get some points on a circle, and then figure out what points are visible based on the timing and draw a <code>path</code> element.</p> <p>I’m not sure what’s next. It seems like it would be pretty easy to add <a href="https://svelte.dev/docs/svelte-easing" rel="nofollow">easing</a>, but I’d also like to explore <a href="https://www.youtube.com/watch?v=qlfh_rv6khY" rel="nofollow">procedural animation</a>, or maybe incorporating <a href="https://brm.io/matter-js/" rel="nofollow">physics</a>. Stay tuned.</p> <div class="flex place-content-center">🔲</div>',1);const wa={layout:"post",title:"Svelte animations",date:"2024-09-27T00:00:00.000Z"};function xa(o,s){V(s,!0);const l=5500;let r,n=la(void 0);function y(T){r=T,d(T)}function d(T){Es(n,T-r),p(n)<l?requestAnimationFrame(z=>d(z)):(Es(n,0),setTimeout(()=>requestAnimationFrame(y),100))}ta(()=>{requestAnimationFrame(y)});var i=ma(),e=G(i),t=U(e),h=a(t),E=a(h);g(E,{x0:0,x2:100,y0:50,y2:50,stroke:"#2C5943",strokeWidth:4,get time(){return p(n)},delay:"0",duration:250});var u=a(E),F=a(u);m(F,{cx:150,cy:50,r:25,get time(){return p(n)},delay:"250",duration:"500",hold:"500",draw:"reversed"});var c=a(F);m(c,{cx:150,cy:50,r:35,get time(){return p(n)},delay:"750",duration:"500",strokeDasharray:"4 4"});var C=a(c);m(C,{cx:150,cy:50,r:45,get time(){return p(n)},delay:"1250",duration:"500",strokeDasharray:"0 4"});var k=a(C);m(k,{cx:150,cy:50,r:25,get time(){return p(n)},delay:"1750",duration:"500",hold:"400"});var L=a(k);g(L,{x0:200,x2:250,y0:50,y2:50,stroke:"#2C5943",strokeWidth:4,get time(){return p(n)},delay:"2250",duration:250});var B=a(L),x=a(B),D=a(x),v=a(D);m(v,{cx:300,cy:50,r:25,get time(){return p(n)},stroke:"none",fill:"white",delay:"2500",duration:"250",hold:"500",draw:"none"});var _=a(v);m(_,{cx:300,cy:50,r:25,get time(){return p(n)},delay:"0",duration:"4000",hold:"500",draw:"none"});var M=a(_);m(M,{cx:300,cy:50,r:35,get time(){return p(n)},delay:"3000",duration:"500"});var j=a(M);m(j,{cx:300,cy:50,r:45,get time(){return p(n)},delay:"3500",duration:"500",strokeDasharray:"0 4"});var b=a(j);g(b,{x0:350,x2:450,y0:50,y2:50,stroke:"#2C5943",strokeWidth:4,get time(){return p(n)},delay:"4000",duration:250});var P=a(b),q=a(P);m(q,{cx:450,cy:50,r:25,get time(){return p(n)},delay:"0",duration:"4000",hold:"500",draw:"none"});var J=a(q);m(J,{cx:450,cy:50,r:28,get time(){return p(n)},delay:"4250",duration:"500",hold:"500",strokeWidth:10});var $=a(J);m($,{cx:450,cy:50,r:45,get time(){return p(n)},delay:"4750",duration:"500",strokeDasharray:"0 4"});var Bs=a($);g(Bs,{x0:500,x2:600,y0:50,y2:50,stroke:"#2C5943",strokeWidth:4,get time(){return p(n)},delay:"5250",duration:250}),Z(e);var vs=a(a(e,!0)),As=a(a(vs,!0)),ks=a(a(As,!0)),Y=a(a(ks,!0)),gs=a(U(Y));ds(gs,16,()=>[100,200,300,400],Fs,(T,z)=>{var ps=Q(),zs=G(ps);ds(zs,16,()=>Array(5).fill().map((rs,N)=>N*10),Fs,(rs,N)=>{var Ns=w(()=>.5*N),Rs=w(()=>5*z+5*N);m(rs,{get cx(){return z},cy:50,get r(){return p(Ns)},get time(){return p(n)},stroke:"#2C5943",strokeWidth:1,get delay(){return p(Rs)},duration:500,hold:"500",draw:"none"})}),W(T,ps)}),Z(Y);var ws=a(a(Y,!0)),xs=a(a(ws,!0)),ss=a(a(xs,!0));S(ss,()=>`<pre class="shiki nord" style="background-color:#2e3440ff;color:#d8dee9ff" tabindex="0"><code><span class="line"><span style="color:#81A1C1">&#x3C;script></span></span>
<span class="line"><span style="color:#81A1C1">  import</span><span style="color:#ECEFF4"> &#123;</span><span style="color:#8FBCBB"> onMount</span><span style="color:#ECEFF4"> &#125;</span><span style="color:#81A1C1"> from</span><span style="color:#ECEFF4"> '</span><span style="color:#A3BE8C">svelte</span><span style="color:#ECEFF4">'</span><span style="color:#81A1C1">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#81A1C1">  let</span><span style="color:#D8DEE9"> zero</span></span>
<span class="line"><span style="color:#81A1C1">  let</span><span style="color:#D8DEE9"> time</span><span style="color:#81A1C1"> =</span><span style="color:#81A1C1"> $</span><span style="color:#88C0D0">state</span><span style="color:#D8DEE9FF">()</span><span style="color:#81A1C1">;</span></span>
<span class="line"><span style="color:#81A1C1">  const</span><span style="color:#D8DEE9"> loop_time</span><span style="color:#81A1C1"> =</span><span style="color:#B48EAD"> 5_500</span><span style="color:#81A1C1">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#81A1C1">  function</span><span style="color:#88C0D0"> firstFrame</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9">timestamp</span><span style="color:#ECEFF4">)</span><span style="color:#ECEFF4"> &#123;</span></span>
<span class="line"><span style="color:#D8DEE9">    zero</span><span style="color:#81A1C1"> =</span><span style="color:#D8DEE9"> timestamp</span><span style="color:#81A1C1">;</span></span>
<span class="line"><span style="color:#88C0D0">    animate</span><span style="color:#D8DEE9FF">(</span><span style="color:#D8DEE9">timestamp</span><span style="color:#D8DEE9FF">)</span><span style="color:#81A1C1">;</span></span>
<span class="line"><span style="color:#ECEFF4">  &#125;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#81A1C1">  function</span><span style="color:#88C0D0"> animate</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9">timestamp</span><span style="color:#ECEFF4">)</span><span style="color:#ECEFF4"> &#123;</span></span>
<span class="line"><span style="color:#D8DEE9">    time</span><span style="color:#81A1C1"> =</span><span style="color:#D8DEE9"> timestamp</span><span style="color:#81A1C1"> -</span><span style="color:#D8DEE9"> zero</span><span style="color:#81A1C1">;</span></span>
<span class="line"><span style="color:#81A1C1">    if</span><span style="color:#D8DEE9FF"> (</span><span style="color:#D8DEE9">time</span><span style="color:#81A1C1"> &#x3C;</span><span style="color:#D8DEE9"> loop_time</span><span style="color:#D8DEE9FF">) </span><span style="color:#ECEFF4">&#123;</span></span>
<span class="line"><span style="color:#88C0D0">      requestAnimationFrame</span><span style="color:#D8DEE9FF">(</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9">t</span><span style="color:#ECEFF4">)</span><span style="color:#81A1C1"> =></span><span style="color:#88C0D0"> animate</span><span style="color:#D8DEE9FF">(</span><span style="color:#D8DEE9">t</span><span style="color:#D8DEE9FF">))</span><span style="color:#81A1C1">;</span></span>
<span class="line"><span style="color:#ECEFF4">    &#125;</span><span style="color:#81A1C1"> else</span><span style="color:#ECEFF4"> &#123;</span></span>
<span class="line"><span style="color:#D8DEE9">      time</span><span style="color:#81A1C1"> =</span><span style="color:#B48EAD"> 0</span><span style="color:#81A1C1">;</span></span>
<span class="line"><span style="color:#88C0D0">      setTimeout</span><span style="color:#D8DEE9FF">(</span><span style="color:#ECEFF4">()</span><span style="color:#81A1C1"> =></span><span style="color:#88C0D0"> requestAnimationFrame</span><span style="color:#D8DEE9FF">(</span><span style="color:#D8DEE9">firstFrame</span><span style="color:#D8DEE9FF">)</span><span style="color:#ECEFF4">,</span><span style="color:#B48EAD"> 100</span><span style="color:#D8DEE9FF">)</span><span style="color:#81A1C1">;</span></span>
<span class="line"><span style="color:#ECEFF4">    &#125;</span></span>
<span class="line"><span style="color:#ECEFF4">  &#125;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#88C0D0">  onMount</span><span style="color:#D8DEE9FF">(</span><span style="color:#ECEFF4">()</span><span style="color:#81A1C1"> =></span><span style="color:#ECEFF4"> &#123;</span></span>
<span class="line"><span style="color:#88C0D0">    requestAnimationFrame</span><span style="color:#D8DEE9FF">(</span><span style="color:#D8DEE9">firstFrame</span><span style="color:#D8DEE9FF">)</span><span style="color:#81A1C1">;</span></span>
<span class="line"><span style="color:#ECEFF4">  &#125;</span><span style="color:#D8DEE9FF">)</span><span style="color:#81A1C1">;</span></span>
<span class="line"><span style="color:#81A1C1">&#x3C;/script></span></span></code></pre>`);var _s=a(a(ss,!0)),bs=a(a(_s,!0)),Ts=a(a(bs,!0)),H=a(a(Ts,!0)),as=U(H);g(as,{x0:0,x2:600,y0:50,y2:50,stroke:"Tomato",strokeWidth:20,strokeDashArray:"0 25 0 25 0 25",delay:"0",duration:"3000",get time(){return p(n)}});var ns=a(as);g(ns,{x0:0,x2:600,y0:20,y2:30,stroke:"MediumSeaGreen",strokeWidth:20,strokeDashArray:"0 0 50 0 25 50 25",delay:"0",duration:"4000",get time(){return p(n)}});var Ws=a(ns);g(Ws,{x0:0,x2:600,y0:40,y2:10,stroke:"DodgerBlue",strokeWidth:10,strokeDashArray:"0 25 50 0 25 50 25",delay:"3000",duration:"500",get time(){return p(n)}}),Z(H);var Ms=a(a(H,!0)),es=a(a(Ms,!0));S(es,()=>'<pre class="shiki nord" style="background-color:#2e3440ff;color:#d8dee9ff" tabindex="0"><code><span class="line"><span style="color:#81A1C1">let</span><span style="color:#D8DEE9"> fraction</span><span style="color:#81A1C1"> =</span><span style="color:#88C0D0"> $derived</span><span style="color:#D8DEE9FF">((</span><span style="color:#D8DEE9">time</span><span style="color:#81A1C1"> -</span><span style="color:#D8DEE9"> delay</span><span style="color:#D8DEE9FF">) </span><span style="color:#81A1C1">/</span><span style="color:#D8DEE9"> duration</span><span style="color:#D8DEE9FF">)</span></span></code></pre>');var qs=a(a(es,!0)),os=a(a(qs,!0));S(os,()=>`<pre class="shiki nord" style="background-color:#2e3440ff;color:#d8dee9ff" tabindex="0"><code><span class="line"><span style="color:#81A1C1">function</span><span style="color:#88C0D0"> clamp</span><span style="color:#ECEFF4">(</span><span style="color:#D8DEE9">num</span><span style="color:#ECEFF4">,</span><span style="color:#D8DEE9"> min</span><span style="color:#ECEFF4">,</span><span style="color:#D8DEE9"> max</span><span style="color:#ECEFF4">)</span><span style="color:#ECEFF4"> &#123;</span></span>
<span class="line"><span style="color:#81A1C1">    return</span><span style="color:#D8DEE9"> num</span><span style="color:#81A1C1"> &#x3C;=</span><span style="color:#D8DEE9"> min</span><span style="color:#D8DEE9FF"> </span></span>
<span class="line"><span style="color:#81A1C1">      ?</span><span style="color:#D8DEE9"> min</span><span style="color:#D8DEE9FF"> </span></span>
<span class="line"><span style="color:#81A1C1">      :</span><span style="color:#D8DEE9"> num</span><span style="color:#81A1C1"> >=</span><span style="color:#D8DEE9"> max</span><span style="color:#D8DEE9FF"> </span></span>
<span class="line"><span style="color:#81A1C1">        ?</span><span style="color:#D8DEE9"> max</span><span style="color:#D8DEE9FF"> </span></span>
<span class="line"><span style="color:#81A1C1">        :</span><span style="color:#D8DEE9"> num</span></span>
<span class="line"><span style="color:#ECEFF4">  &#125;</span></span></code></pre>`);var Is=a(a(os,!0)),ls=a(a(Is,!0));S(ls,()=>`<pre class="shiki nord" style="background-color:#2e3440ff;color:#d8dee9ff" tabindex="0"><code><span class="line"><span style="color:#81A1C1">&#x3C;script></span></span>
<span class="line"><span style="color:#81A1C1">  const</span><span style="color:#ECEFF4"> &#123;</span></span>
<span class="line"><span style="color:#D8DEE9">    x1</span><span style="color:#ECEFF4">,</span></span>
<span class="line"><span style="color:#D8DEE9">    y1</span><span style="color:#ECEFF4">,</span></span>
<span class="line"><span style="color:#D8DEE9">    xto</span><span style="color:#ECEFF4">,</span></span>
<span class="line"><span style="color:#D8DEE9">    yto</span><span style="color:#ECEFF4">,</span></span>
<span class="line"><span style="color:#D8DEE9">    delay</span><span style="color:#ECEFF4">,</span></span>
<span class="line"><span style="color:#D8DEE9">    duration</span><span style="color:#ECEFF4">,</span></span>
<span class="line"><span style="color:#D8DEE9">    time</span><span style="color:#ECEFF4">,</span></span>
<span class="line"><span style="color:#D8DEE9">    stroke</span><span style="color:#ECEFF4">,</span></span>
<span class="line"><span style="color:#D8DEE9">    strokeWidth</span><span style="color:#ECEFF4">,</span></span>
<span class="line"><span style="color:#D8DEE9">    strokeDasharray</span></span>
<span class="line"><span style="color:#ECEFF4">  &#125;</span><span style="color:#81A1C1"> =</span><span style="color:#81A1C1"> $</span><span style="color:#88C0D0">props</span><span style="color:#D8DEE9FF">()</span><span style="color:#81A1C1">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#81A1C1">  let</span><span style="color:#D8DEE9"> fraction</span><span style="color:#81A1C1"> =</span><span style="color:#81A1C1"> $</span><span style="color:#88C0D0">derived</span><span style="color:#D8DEE9FF">(</span><span style="color:#88C0D0">clamp</span><span style="color:#D8DEE9FF">((</span><span style="color:#D8DEE9">time</span><span style="color:#81A1C1"> -</span><span style="color:#D8DEE9"> delay</span><span style="color:#D8DEE9FF">) </span><span style="color:#81A1C1">/</span><span style="color:#D8DEE9"> duration</span><span style="color:#ECEFF4">,</span><span style="color:#B48EAD"> 0</span><span style="color:#ECEFF4">,</span><span style="color:#B48EAD"> 1</span><span style="color:#D8DEE9FF">))</span></span>
<span class="line"><span style="color:#81A1C1">  let</span><span style="color:#D8DEE9"> x2</span><span style="color:#81A1C1"> =</span><span style="color:#81A1C1"> $</span><span style="color:#88C0D0">derived</span><span style="color:#D8DEE9FF">(</span><span style="color:#D8DEE9">x1</span><span style="color:#81A1C1"> +</span><span style="color:#D8DEE9FF"> (</span><span style="color:#D8DEE9">xto</span><span style="color:#81A1C1"> -</span><span style="color:#D8DEE9"> x1</span><span style="color:#D8DEE9FF">) </span><span style="color:#81A1C1">*</span><span style="color:#D8DEE9"> fraction</span><span style="color:#D8DEE9FF">)</span></span>
<span class="line"><span style="color:#81A1C1">  let</span><span style="color:#D8DEE9"> y2</span><span style="color:#81A1C1"> =</span><span style="color:#81A1C1"> $</span><span style="color:#88C0D0">derived</span><span style="color:#D8DEE9FF">(</span><span style="color:#D8DEE9">y1</span><span style="color:#81A1C1"> +</span><span style="color:#D8DEE9FF"> (</span><span style="color:#D8DEE9">yto</span><span style="color:#81A1C1"> -</span><span style="color:#D8DEE9"> y1</span><span style="color:#D8DEE9FF">) </span><span style="color:#81A1C1">*</span><span style="color:#D8DEE9"> fraction</span><span style="color:#D8DEE9FF">)</span></span>
<span class="line"><span style="color:#81A1C1">&#x3C;/script></span></span>
<span class="line"></span>
<span class="line"><span style="color:#81A1C1">&#x3C;line</span></span>
<span class="line"><span style="color:#8FBCBB">  &#123;</span><span style="color:#D8DEE9">x1</span><span style="color:#8FBCBB">&#125;</span><span style="color:#8FBCBB"> &#123;</span><span style="color:#D8DEE9">y1</span><span style="color:#8FBCBB">&#125;</span><span style="color:#8FBCBB"> &#123;</span><span style="color:#D8DEE9">x2</span><span style="color:#8FBCBB">&#125;</span><span style="color:#8FBCBB"> &#123;</span><span style="color:#D8DEE9">y2</span><span style="color:#8FBCBB">&#125;</span></span>
<span class="line"><span style="color:#8FBCBB">  &#123;</span><span style="color:#D8DEE9">stroke</span><span style="color:#8FBCBB">&#125;</span></span>
<span class="line"><span style="color:#8FBCBB">  stroke-dasharray</span><span style="color:#ECEFF4">=</span><span style="color:#81A1C1">&#123;</span><span style="color:#D8DEE9">strokeDasharray</span><span style="color:#81A1C1">&#125;</span></span>
<span class="line"><span style="color:#8FBCBB">  stroke-linecap</span><span style="color:#ECEFF4">=</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">square</span><span style="color:#ECEFF4">"</span></span>
<span class="line"><span style="color:#8FBCBB">  stroke-width</span><span style="color:#ECEFF4">=</span><span style="color:#81A1C1">&#123;</span><span style="color:#D8DEE9">strokeWidth</span><span style="color:#81A1C1">&#125;</span></span>
<span class="line"><span style="color:#81A1C1">></span></span>
<span class="line"><span style="color:#81A1C1">&#x3C;/line></span></span></code></pre>`);var Ss=a(a(ls,!0)),ts=a(a(Ss,!0));S(ts,()=>`<pre class="shiki nord" style="background-color:#2e3440ff;color:#d8dee9ff" tabindex="0"><code><span class="line"><span style="color:#81A1C1">&#x3C;svg</span><span style="color:#8FBCBB"> viewbox</span><span style="color:#ECEFF4">=</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">0 0 600 100</span><span style="color:#ECEFF4">"</span><span style="color:#8FBCBB"> class</span><span style="color:#ECEFF4">=</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">w-full mx-auto</span><span style="color:#ECEFF4">"</span><span style="color:#81A1C1">></span></span>
<span class="line"><span style="color:#81A1C1">  &#x3C;</span><span style="color:#8FBCBB">Line</span><span style="color:#D8DEE9FF"> </span></span>
<span class="line"><span style="color:#8FBCBB">    x1</span><span style="color:#ECEFF4">=</span><span style="color:#81A1C1">&#123;</span><span style="color:#B48EAD">0</span><span style="color:#81A1C1">&#125;</span><span style="color:#8FBCBB"> xto</span><span style="color:#ECEFF4">=</span><span style="color:#81A1C1">&#123;</span><span style="color:#B48EAD">600</span><span style="color:#81A1C1">&#125;</span><span style="color:#8FBCBB"> y1</span><span style="color:#ECEFF4">=</span><span style="color:#81A1C1">&#123;</span><span style="color:#B48EAD">40</span><span style="color:#81A1C1">&#125;</span><span style="color:#8FBCBB"> yto</span><span style="color:#ECEFF4">=</span><span style="color:#81A1C1">&#123;</span><span style="color:#B48EAD">10</span><span style="color:#81A1C1">&#125;</span><span style="color:#8FBCBB"> stroke</span><span style="color:#ECEFF4">=</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">DodgerBlue</span><span style="color:#ECEFF4">"</span><span style="color:#D8DEE9FF"> </span></span>
<span class="line"><span style="color:#8FBCBB">    strokeWidth</span><span style="color:#ECEFF4">=</span><span style="color:#81A1C1">&#123;</span><span style="color:#B48EAD">10</span><span style="color:#81A1C1">&#125;</span><span style="color:#8FBCBB"> strokeDashArray</span><span style="color:#ECEFF4">=</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">0 25 50 0 25 50 25</span><span style="color:#ECEFF4">"</span><span style="color:#8FBCBB"> delay</span><span style="color:#ECEFF4">=</span><span style="color:#B48EAD">3000</span><span style="color:#8FBCBB"> duration</span><span style="color:#ECEFF4">=</span><span style="color:#B48EAD">500</span><span style="color:#8FBCBB"> &#123;</span><span style="color:#D8DEE9">time</span><span style="color:#8FBCBB">&#125;</span></span>
<span class="line"><span style="color:#81A1C1">  /></span></span>
<span class="line"><span style="color:#81A1C1">  &#x3C;</span><span style="color:#8FBCBB">Line</span><span style="color:#D8DEE9FF"> </span></span>
<span class="line"><span style="color:#8FBCBB">    x1</span><span style="color:#ECEFF4">=</span><span style="color:#81A1C1">&#123;</span><span style="color:#B48EAD">0</span><span style="color:#81A1C1">&#125;</span><span style="color:#8FBCBB"> xto</span><span style="color:#ECEFF4">=</span><span style="color:#81A1C1">&#123;</span><span style="color:#B48EAD">600</span><span style="color:#81A1C1">&#125;</span><span style="color:#8FBCBB"> y1</span><span style="color:#ECEFF4">=</span><span style="color:#81A1C1">&#123;</span><span style="color:#B48EAD">50</span><span style="color:#81A1C1">&#125;</span><span style="color:#8FBCBB"> yto</span><span style="color:#ECEFF4">=</span><span style="color:#81A1C1">&#123;</span><span style="color:#B48EAD">50</span><span style="color:#81A1C1">&#125;</span><span style="color:#8FBCBB"> stroke</span><span style="color:#ECEFF4">=</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">Tomato</span><span style="color:#ECEFF4">"</span><span style="color:#D8DEE9FF"> </span></span>
<span class="line"><span style="color:#8FBCBB">    strokeWidth</span><span style="color:#ECEFF4">=</span><span style="color:#81A1C1">&#123;</span><span style="color:#B48EAD">20</span><span style="color:#81A1C1">&#125;</span><span style="color:#8FBCBB"> strokeDashArray</span><span style="color:#ECEFF4">=</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">0 25 0 25 0 25</span><span style="color:#ECEFF4">"</span><span style="color:#8FBCBB"> delay</span><span style="color:#ECEFF4">=</span><span style="color:#B48EAD">0</span><span style="color:#8FBCBB"> duration</span><span style="color:#ECEFF4">=</span><span style="color:#B48EAD">3000</span><span style="color:#8FBCBB"> &#123;</span><span style="color:#D8DEE9">time</span><span style="color:#8FBCBB">&#125;</span></span>
<span class="line"><span style="color:#81A1C1">  /></span></span>
<span class="line"><span style="color:#81A1C1">  &#x3C;</span><span style="color:#8FBCBB">Line</span><span style="color:#D8DEE9FF"> </span></span>
<span class="line"><span style="color:#8FBCBB">    x1</span><span style="color:#ECEFF4">=</span><span style="color:#81A1C1">&#123;</span><span style="color:#B48EAD">0</span><span style="color:#81A1C1">&#125;</span><span style="color:#8FBCBB"> xto</span><span style="color:#ECEFF4">=</span><span style="color:#81A1C1">&#123;</span><span style="color:#B48EAD">600</span><span style="color:#81A1C1">&#125;</span><span style="color:#8FBCBB"> y1</span><span style="color:#ECEFF4">=</span><span style="color:#81A1C1">&#123;</span><span style="color:#B48EAD">20</span><span style="color:#81A1C1">&#125;</span><span style="color:#8FBCBB"> yto</span><span style="color:#ECEFF4">=</span><span style="color:#81A1C1">&#123;</span><span style="color:#B48EAD">30</span><span style="color:#81A1C1">&#125;</span><span style="color:#8FBCBB"> stroke</span><span style="color:#ECEFF4">=</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">MediumSeaGreen</span><span style="color:#ECEFF4">"</span><span style="color:#D8DEE9FF"> </span></span>
<span class="line"><span style="color:#8FBCBB">    strokeWidth</span><span style="color:#ECEFF4">=</span><span style="color:#81A1C1">&#123;</span><span style="color:#B48EAD">20</span><span style="color:#81A1C1">&#125;</span><span style="color:#8FBCBB"> strokeDashArray</span><span style="color:#ECEFF4">=</span><span style="color:#ECEFF4">"</span><span style="color:#A3BE8C">0 0 50 0 25 50 25</span><span style="color:#ECEFF4">"</span><span style="color:#8FBCBB"> delay</span><span style="color:#ECEFF4">=</span><span style="color:#B48EAD">0</span><span style="color:#8FBCBB"> duration</span><span style="color:#ECEFF4">=</span><span style="color:#B48EAD">4000</span><span style="color:#8FBCBB"> &#123;</span><span style="color:#D8DEE9">time</span><span style="color:#8FBCBB">&#125;</span></span>
<span class="line"><span style="color:#81A1C1">  /></span></span>
<span class="line"><span style="color:#81A1C1">&#x3C;/svg></span></span></code></pre>`);var Ls=a(a(ts,!0)),js=a(a(Ls,!0));a(a(js,!0)),W(o,i),X()}export{xa as default,wa as metadata};
