(function(n){"use strict";function i(){var n=this;this.init=function(n,i){if(i=i||{},this.sigInst=n,this.config=sigma.utils.extend(i,s),this.easing=i.easing,this.duration=i.duration,i.nodes&&(this.nodes=i.nodes,delete i.nodes),!sigma.plugins||"undefined"==typeof sigma.plugins.animate)throw new Error("sigma.plugins.animate is not declared");this.running=!1},this.atomicGo=function(){if(!this.running||this.iterCount<1)return!1;var i,s,t,o,e,d,r,g,a,f,c,h,l,u,p,x,_,m,y,M,z,v=this.nodes||this.sigInst.graph.nodes(),I=v.length,E=1/0,N=-(1/0),S=1/0,w=-(1/0);for(this.iterCount--,this.running=!1,i=0;I>i;i++)s=v[i],s.dn.dx=0,s.dn.dy=0,E=Math.min(E,s.dn_x-(s.dn_size*n.config.scaleNodes+n.config.nodeMargin)),N=Math.max(N,s.dn_x+(s.dn_size*n.config.scaleNodes+n.config.nodeMargin)),S=Math.min(S,s.dn_y-(s.dn_size*n.config.scaleNodes+n.config.nodeMargin)),w=Math.max(w,s.dn_y+(s.dn_size*n.config.scaleNodes+n.config.nodeMargin));for(o=N-E,e=w-S,d=(E+N)/2,r=(S+w)/2,E=d-n.config.permittedExpansion*o/2,N=d+n.config.permittedExpansion*o/2,S=r-n.config.permittedExpansion*e/2,w=r+n.config.permittedExpansion*e/2,g={},a=0;a<n.config.gridSize;a++)for(g[a]={},f=0;f<n.config.gridSize;f++)g[a][f]=[];for(i=0;I>i;i++)for(s=v[i],m=s.dn_x-(s.dn_size*n.config.scaleNodes+n.config.nodeMargin),y=s.dn_x+(s.dn_size*n.config.scaleNodes+n.config.nodeMargin),M=s.dn_y-(s.dn_size*n.config.scaleNodes+n.config.nodeMargin),z=s.dn_y+(s.dn_size*n.config.scaleNodes+n.config.nodeMargin),c=Math.floor(n.config.gridSize*(m-E)/(N-E)),h=Math.floor(n.config.gridSize*(y-E)/(N-E)),l=Math.floor(n.config.gridSize*(M-S)/(w-S)),u=Math.floor(n.config.gridSize*(z-S)/(w-S)),f=c;h>=f;f++)for(a=l;u>=a;a++)g[a][f].push(s.id);for(p={},a=0;a<n.config.gridSize;a++)for(f=0;f<n.config.gridSize;f++)g[a][f].forEach(function(i){for(p[i]||(p[i]=[]),x=Math.max(0,a-1);x<=Math.min(a+1,n.config.gridSize-1);x++)for(_=Math.max(0,f-1);_<=Math.min(f+1,n.config.gridSize-1);_++)g[x][_].forEach(function(n){n!==i&&-1===p[i].indexOf(n)&&p[i].push(n)})});for(i=0;I>i;i++)t=v[i],p[t.id].forEach(function(i){var s=n.sigInst.graph.nodes(i),d=s.dn_x-t.dn_x,r=s.dn_y-t.dn_y,g=Math.sqrt(d*d+r*r),a=g<t.dn_size*n.config.scaleNodes+n.config.nodeMargin+(s.dn_size*n.config.scaleNodes+n.config.nodeMargin);a&&(n.running=!0,g>0?(s.dn.dx+=d/g*(1+t.dn_size),s.dn.dy+=r/g*(1+t.dn_size)):(s.dn.dx+=.01*o*(.5-Math.random()),s.dn.dy+=.01*e*(.5-Math.random())))});for(i=0;I>i;i++)s=v[i],s.fixed||(s.dn_x=s.dn_x+.1*s.dn.dx*n.config.speed,s.dn_y=s.dn_y+.1*s.dn.dy*n.config.speed);return this.running&&this.iterCount<1&&(this.running=!1),this.running},this.go=function(){for(this.iterCount=this.config.maxIterations;this.running;)this.atomicGo();this.stop()},this.start=function(){if(!this.running){var i=this.sigInst.graph.nodes(),s=this.sigInst.renderers[n.config.rendererIndex].options.prefix;this.running=!0;for(var t=0;t<i.length;t++)i[t].dn_x=i[t][s+"x"],i[t].dn_y=i[t][s+"y"],i[t].dn_size=i[t][s+"size"],i[t].dn={dx:0,dy:0};o[n.sigInst.id].dispatchEvent("start"),this.go()}},this.stop=function(){var i=this.sigInst.graph.nodes();if(this.running=!1,this.easing)o[n.sigInst.id].dispatchEvent("interpolate"),sigma.plugins.animate(n.sigInst,{x:"dn_x",y:"dn_y"},{easing:n.easing,onComplete:function(){n.sigInst.refresh();for(var s=0;s<i.length;s++)i[s].dn=null,i[s].dn_x=null,i[s].dn_y=null;o[n.sigInst.id].dispatchEvent("stop")},duration:n.duration});else{for(var s=0;s<i.length;s++)i[s].x=i[s].dn_x,i[s].y=i[s].dn_y;this.sigInst.refresh();for(var s=0;s<i.length;s++)i[s].dn=null,i[s].dn_x=null,i[s].dn_y=null;o[n.sigInst.id].dispatchEvent("stop")}},this.kill=function(){this.sigInst=null,this.config=null,this.easing=null}}if("undefined"==typeof sigma)throw new Error("sigma is not declared");sigma.utils.pkg("sigma.layouts.noverlap");var s={speed:3,scaleNodes:1.2,nodeMargin:5,gridSize:20,permittedExpansion:1.1,rendererIndex:0,maxIterations:500},t={},o={};sigma.prototype.configNoverlap=function(n){var s=this;if(!n)throw new Error('Missing argument: "config"');return t[s.id]||(t[s.id]=new i,o[s.id]={},sigma.classes.dispatcher.extend(o[s.id]),s.bind("kill",function(){t[s.id].kill(),t[s.id]=null,o[s.id]=null})),t[s.id].init(s,n),o[s.id]},sigma.prototype.startNoverlap=function(n){var i=this;return n&&this.configNoverlap(i,n),t[i.id].start(),o[i.id]},sigma.prototype.isNoverlapRunning=function(){var n=this;return!!t[n.id]&&t[n.id].running}}).call(this);