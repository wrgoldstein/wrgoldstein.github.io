import{ab as j,b as ee,ac as G,h as w,a0 as D,Y as ae,aa as re,ad as J,Z as ne,_ as W,a1 as M,c as b,ae as H,a2 as K,a as P,a3 as fe,q as ie,W as X,af as L,ag as Z,ah as O,ai as le,aj as se,ak as ue,d as te,al as ve,am as de,an as _e,ao as ce,V as oe,a7 as z,ap as he,aq as Ee}from"./runtime.R5fxAIps.js";function me(l,e){return e}function pe(l,e,a,t){for(var v=[],_=e.length,u=0;u<_;u++)le(e[u].e,v,!0);var c=_>0&&v.length===0&&a!==null;if(c){var A=a.parentNode;se(A),A.append(a),t.clear(),x(l,e[0].prev,e[_-1].next)}ue(v,()=>{for(var h=0;h<_;h++){var d=e[h];c||(t.delete(d.k),x(l,d.prev,d.next)),te(d.e,!c)}})}function xe(l,e,a,t,v,_=null){var u=l,c={flags:e,items:new Map,first:null},A=(e&G)!==0;if(A){var h=l;u=w?D(ve(h)):h.appendChild(j())}w&&ae();var d=null,C=!1;ee(()=>{var r=a(),s=re(r)?r:r==null?[]:J(r),i=s.length;if(C&&i===0)return;C=i===0;let I=!1;if(w){var E=u.data===ne;E!==(i===0)&&(u=W(),D(u),M(!1),I=!0)}if(w){for(var p=null,T,o=0;o<i;o++){if(b.nodeType===8&&b.data===de){u=b,I=!0,M(!1);break}var n=s[o],f=t(n,o);T=Q(b,c,p,null,n,f,o,v,e),c.items.set(f,T),p=T}i>0&&D(W())}if(!w){var R=_e;Ae(s,c,u,v,e,(R.f&H)!==0,t)}_!==null&&(i===0?d?K(d):d=P(()=>_(u)):d!==null&&fe(d,()=>{d=null})),I&&M(!0),a()}),w&&(u=b)}function Ae(l,e,a,t,v,_,u){var y,V,Y,B;var c=(v&ce)!==0,A=(v&(L|O))!==0,h=l.length,d=e.items,C=e.first,r=C,s,i=null,I,E=[],p=[],T,o,n,f;if(c)for(f=0;f<h;f+=1)T=l[f],o=u(T,f),n=d.get(o),n!==void 0&&((y=n.a)==null||y.measure(),(I??(I=new Set)).add(n));for(f=0;f<h;f+=1){if(T=l[f],o=u(T,f),n=d.get(o),n===void 0){var R=r?r.e.nodes_start:a;i=Q(R,e,i,i===null?e.first:i.next,T,o,f,t,v),d.set(o,i),E=[],p=[],r=i.next;continue}if(A&&Te(n,T,f,v),n.e.f&H&&(K(n.e),c&&((V=n.a)==null||V.unfix(),(I??(I=new Set)).delete(n))),n!==r){if(s!==void 0&&s.has(n)){if(E.length<p.length){var g=p[0],m;i=g.prev;var q=E[0],S=E[E.length-1];for(m=0;m<E.length;m+=1)F(E[m],g,a);for(m=0;m<p.length;m+=1)s.delete(p[m]);x(e,q.prev,S.next),x(e,i,q),x(e,S,g),r=g,i=S,f-=1,E=[],p=[]}else s.delete(n),F(n,r,a),x(e,n.prev,n.next),x(e,n,i===null?e.first:i.next),x(e,i,n),i=n;continue}for(E=[],p=[];r!==null&&r.k!==o;)(_||!(r.e.f&H))&&(s??(s=new Set)).add(r),p.push(r),r=r.next;if(r===null)continue;n=r}E.push(n),i=n,r=n.next}if(r!==null||s!==void 0){for(var N=s===void 0?[]:J(s);r!==null;)(_||!(r.e.f&H))&&N.push(r),r=r.next;var k=N.length;if(k>0){var $=v&G&&h===0?a:null;if(c){for(f=0;f<k;f+=1)(Y=N[f].a)==null||Y.measure();for(f=0;f<k;f+=1)(B=N[f].a)==null||B.fix()}pe(e,N,$,d)}}c&&ie(()=>{var U;if(I!==void 0)for(n of I)(U=n.a)==null||U.apply()}),X.first=e.first&&e.first.e,X.last=i&&i.e}function Te(l,e,a,t){t&L&&Z(l.v,e),t&O?Z(l.i,a):l.i=a}function Q(l,e,a,t,v,_,u,c,A){var h=(A&L)!==0,d=(A&he)===0,C=h?d?oe(v):z(v):v,r=A&O?z(u):u,s={i:r,v:C,k:_,a:null,e:null,prev:a,next:t};try{return s.e=P(()=>c(l,C,r),w),s.e.prev=a&&a.e,s.e.next=t&&t.e,a===null?e.first=s:(a.next=s,a.e.next=s.e),t!==null&&(t.prev=s,t.e.prev=s.e),s}finally{}}function F(l,e,a){for(var t=l.next?l.next.e.nodes_start:a,v=e?e.e.nodes_start:a,_=l.e.nodes_start;_!==t;){var u=Ee(_);v.before(_),_=u}}function x(l,e,a){e===null?l.first=a:(e.next=a,e.e.next=a&&a.e),a!==null&&(a.prev=e,a.e.prev=e&&e.e)}export{xe as e,me as i};
