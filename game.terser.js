!function(){function t(t=0,e=1){return p=16807*p%2147483647,(p-1)/2147483646*(e-t)+t}function e(t){return(e,n)=>{e.i.t[n]|=2,e.i.l[n]={o:n,s:t,u:[0,0],h:[]}}}function n(t){return(e,n)=>{e.i.t[n]|=4,e.i.m[n]={p:0,s:t,v:e.g}}}function i(t){return(e,n)=>{e.i.t[n]|=16,e.i.$[n]={M:t}}}function l(t){let e=performance.now(),n=i=>{t.R((i-e)/1e3),e=i,y=requestAnimationFrame(n)};o(),n(e)}function o(){cancelAnimationFrame(y)}function a(t,{S:e,F:n,I:i,k:l=[],A:o=[]}){let r=function(t,e=0){for(let n=0;n<v;n++)if(!t.t[n])return t.t[n]=e,n;throw Error("No more entities available.")}(t.i);!function(t=[0,0],e=0,n=[1,1]){return(i,l)=>{i.i.t[l]|=32,i.i.C[l]={o:l,i:[1,0,0,1,0,0],T:[1,0,0,1,0,0],S:t,F:e,I:n,A:[],U:1}}}(e,n,i)(t,r);for(let e of l)e(t,r);let s=t.i.C[r];for(let e of o){let n=a(t,e),i=t.i.C[n];i.q=s,s.A.push(i)}return r}function r(l){var o;l.i=new g,l.D=[],o=Date.now(),p=198706*o;for(let o=0;o<l.j-1;o++)a(l,{S:[t(0,l.K.width),t(0,l.K.height)],F:t(0,2*Math.PI),k:[n(3),e(3),i(50),(t,e)=>{t.i.t[e]|=1},(t,e)=>{t.i.t[e]|=64},(t,e)=>{t.i.t[e]|=8,t.i.N[e]={P:"vulnerable",W:0}}]});let r=a(l,{S:[t(0,l.K.width),t(0,l.K.height)],F:t(0,2*Math.PI),k:[n(3),e(3),i(50),(t,e)=>{t.i.t[e]|=1},(t,e)=>{t.i.t[e]|=64},(t,e)=>{t.i.t[e]|=8,t.i.N[e]={P:"vulnerable",W:0}}]});l.i.N[r].P="infected",l.i.m[r].v=l.B;for(let t=0;t<l.j*l.G;t++)1&l.i.t[t]&&(l.i.t[t]&=-17)}function s(t,e){let n=t.i.C[e];n.S[0]<0&&(n.S[0]=0,n.F=Math.PI-n.F,n.U=1),n.S[0]>t.K.width&&(n.S[0]=t.K.width,n.F=Math.PI-n.F,n.U=1),n.S[1]<0&&(n.S[1]=0,n.F=-n.F,n.U=1),n.S[1]>t.K.height&&(n.S[1]=t.K.height,n.F=-n.F,n.U=1)}function c(t,e,n){for(let o=n;o<e.length;o++){let n=e[o];n!==t&&function(t,e){let n=e[0]-t[0],i=e[1]-t[1];return n*n+i*i}((i=t).u,(l=n).u)<(i.s+l.s)**2&&(t.h.push(n),n.h.push(t))}var i,l}function f(t,e){t.H.fillStyle=e.v,t.H.beginPath(),t.H.arc(0,0,e.s,0,2*Math.PI),t.H.closePath(),t.H.fill()}function u(t,e,n){let i=t.i.N[e];if("infected"===i.P){if(i.W+=n,i.W>t.J)return i.P="recovered",t.i.m[e].v=t.L,void(t.i.t[e]&=-3);let l=t.i.l[e];for(let e=0;e<l.h.length;e++){let n=l.h[e];"vulnerable"===t.i.N[n.o].P&&(t.i.N[n.o].P="infected",t.i.m[n.o].v=t.B)}}}function h(t,e,n){let i=t.i.C[e],l=t.i.$[e];M[0]=i.i[0],M[1]=i.i[1],i.S[0]+=M[0]*l.M*n,i.S[1]+=M[1]*l.M*n,i.U=1}function d(t,...e){return t.reduce((t,n)=>t+function(t){let e=t.shift();return"boolean"==typeof e||null==e?"":Array.isArray(e)?e.join(""):e}(e)+n)}function m(e,n){let i=e.i.C[n];i.F+=t(-.1,.1),i.U=1}let p=1;const v=1e4;let y=0;class g{constructor(){this.t=[],this.l=[],this.m=[],this.N=[],this.$=[],this.C=[]}}let b,x=document.getElementById("update"),$=document.getElementById("delta"),w=document.getElementById("fps"),M=[0,0],R=0,S=new class{constructor(){this.i=new g,this.O=document.querySelector("nav"),this.K=document.querySelector("canvas#scene"),this.H=this.K.getContext("2d"),this.V=document.querySelector("canvas#histo"),this.X=this.V.getContext("2d"),this.Y="#e2ddc3",this.g="#fff",this.B="#ce6a12",this.L="#9582dd",this.j=500,this.G=0,this.J=20,this.D=[],document.addEventListener("visibilitychange",()=>document.hidden?o():l(this)),this.K.width=this.K.clientWidth,this.K.height=this.K.clientHeight,this.V.width=this.V.clientWidth,this.V.height=this.V.clientHeight}R(t){let e=performance.now();!function(t,e){for(let n=0;n<t.i.t.length;n++)48==(48&t.i.t[n])&&h(t,n,e)}(this,t),function(t,e){for(let e=0;e<t.i.t.length;e++)33==(33&t.i.t[e])&&s(t,e)}(this),function(t,e){for(let e=0;e<t.i.t.length;e++)96==(96&t.i.t[e])&&m(t,e)}(this),function(t,e){for(let e=0;e<t.i.t.length;e++)32==(32&t.i.t[e])&&(i=void 0,l=void 0,(n=t.i.C[e]).U&&(n.U=0,function t(e){for(let n of e.A)n.U=1,t(n)}(n),l=n.S,(i=n.i)[0]=1,i[1]=0,i[2]=0,i[3]=1,i[4]=l[0],i[5]=l[1],function(t,e,n){let i=e[0],l=e[1],o=e[2],a=e[3],r=e[4],s=e[5],c=Math.sin(n),f=Math.cos(n);t[0]=i*f+o*c,t[1]=l*f+a*c,t[2]=i*-c+o*f,t[3]=l*-c+a*f,t[4]=r,t[5]=s}(n.i,n.i,n.F),function(t,e,n){let i=e[1],l=e[2],o=e[3],a=e[4],r=e[5],s=n[0],c=n[1];t[0]=e[0]*s,t[1]=i*s,t[2]=l*c,t[3]=o*c,t[4]=a,t[5]=r}(n.i,n.i,n.I),n.q&&function(t,e,n){let i=e[0],l=e[1],o=e[2],a=e[3],r=e[4],s=e[5],c=n[0],f=n[1],u=n[2],h=n[3],d=n[4],m=n[5];t[0]=i*c+o*f,t[1]=l*c+a*f,t[2]=i*u+o*h,t[3]=l*u+a*h,t[4]=i*d+o*m+r,t[5]=l*d+a*m+s}(n.i,n.q.i,n.i),function(t,e){let n=e[0],i=e[1],l=e[2],o=e[3],a=e[4],r=e[5],s=n*o-i*l;s&&(s=1/s,t[0]=o*s,t[1]=-i*s,t[2]=-l*s,t[3]=n*s,t[4]=(l*r-o*a)*s,t[5]=(i*a-n*r)*s)}(n.T,n.i)));var n,i,l}(this),function(t,e){let n=[];for(let e=0;e<t.i.t.length;e++)if(34==(34&t.i.t[e])){let o=t.i.C[e],a=t.i.l[e];a.h=[],(i=a.u)[0]=(l=o.i)[4],i[1]=l[5],n.push(a)}var i,l;for(let t=0;t<n.length;t++)c(n[t],n,t+1)}(this),function(t,e){for(let n=0;n<t.i.t.length;n++)10==(10&t.i.t[n])&&u(t,n,e)}(this,t),function(t,e){if(R+=e,R>.06){R=0;let e=[0,0,0];for(let n=0;n<t.i.t.length;n++)if(8==(8&t.i.t[n]))switch(t.i.N[n].P){case"vulnerable":e[0]++;break;case"infected":e[1]++;break;case"recovered":e[2]++}t.D.push(e)}}(this,t),function(t,e){t.H.resetTransform(),t.H.fillStyle=t.Y,t.H.fillRect(0,0,t.K.width,t.K.height);for(let e=0;e<t.i.t.length;e++)if(36==(36&t.i.t[e])){let n=t.i.C[e];t.H.setTransform(n.i[0],n.i[1],n.i[2],n.i[3],n.i[4],n.i[5]);let i=t.i.m[e];switch(i.p){case 0:f(t,i)}}}(this),function(t,e){t.X.fillStyle="#f8f8f8",t.X.fillRect(0,0,t.V.width,t.V.height);for(let e=0;e<t.D.length;e++){let n=t.D[e],i=n[0]/t.j*t.V.height,l=n[1]/t.j*t.V.height,o=n[2]/t.j*t.V.height;t.X.fillStyle=t.L,t.X.fillRect(1*e,0,1,o),t.X.fillStyle=t.g,t.X.fillRect(1*e,o,1,i),t.X.fillStyle=t.B,t.X.fillRect(1*e,o+i,1,l)}}(this),function(t,e){let n=function(t){return d`<divstyle="display: flex;justify-content: space-between;padding: 5px;font: 12px monospace;"><div style="flex: 1; display: flex; flex-wrap: wrap;">${function(t){return d`<label style="display: flex; align-items: center; margin-right: 30px;">Population: ${t.j}<inputtype="range"min="1"max="1000"value="${t.j}"onchange="$(${0}, parseInt(this.value))"style="margin-left: 10px;"/></label>`}(t)} ${function(t){return d`<label style="display: flex; align-items: center; margin-right: 30px;">Distancing: ${Math.round(100*t.G)}%<inputtype="range"min="0"max="1"step="0.01"value="${t.G}"onchange="$(${1}, parseFloat(this.value))"style="margin-left: 10px;"/></label>`}(t)} ${function(t){return d`<label style="display: flex; align-items: center;">Recovery Time: ${t.J}s<inputtype="range"min="1"max="30"value="${t.J}"onchange="$(${2}, parseInt(this.value))"style="margin-left: 10px;"/></label>`}(t)}</div><buttononclick="$(${0}, ${t.j})"style="margin-left: 30px;">Restart</button></div>`}(t);n!==b&&(t.O.innerHTML=b=n)}(this),function(t,e,n){x&&(x.textContent=n.toFixed(1)),$&&($.textContent=(1e3*e).toFixed(1)),w&&(w.textContent=(1/e).toFixed())}(0,t,performance.now()-e)}};r(S),l(S),window.game=S,window.$=function(t,e,n){switch(e){case 0:t.j=n,requestAnimationFrame(()=>r(t));break;case 1:{t.G=n;let e=t.j*t.G;requestAnimationFrame(()=>{for(let n=0;n<t.i.t.length;n++)1&t.i.t[n]&&(n<e?t.i.t[n]&=-17:t.i.t[n]|=16)});break}case 2:t.J=n}}.bind(null,S)}();