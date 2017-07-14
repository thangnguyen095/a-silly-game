!function(t){function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}var e={};n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=1)}([function(t,n,e){var r=e(3);t.exports=function(){this.animator=new r,this.posX,this.posY,this.width,this.height,this.draw=function(t){this.animator.draw(t,this.posX,this.posY,this.width,this.height)}}},function(t,n,e){var r=e(2),i=e(11),o=e(0);!function(){function t(){u.clearRect(0,0,a,s),c.movable.forEach(function(t){t.update();for(var n=0;n<c.immovable.length;n++)t.isCollising(c.immovable[n])&&t.handleCollision(c.immovable[n])}),c.background.forEach(function(t){t.draw(u)}),c.movable.forEach(function(t){t.draw(u)}),c.immovable.forEach(function(t){t.draw(u)}),c.foreground.forEach(function(t){t.draw(u)}),window.requestAnimationFrame(t)}var n=document.getElementById("game"),a=n.width,s=n.height,u=n.getContext("2d"),c={background:new Array,movable:new Array,immovable:new Array,foreground:new Array};!function(){var t=new o,n=new Image;n.src=e(15),t.animator.addState("idle",1e3,!1),t.animator.addImage("idle",n),t.posX=0,t.posY=0,t.width=1e3,t.height=750,c.background.push(t);var a=new r;a.width=80,a.height=110,a.posX=0,a.posY=0,a.init(),c.movable.push(a);for(var s=0;s<10;s++){var u=new i;u.width=100,u.height=100,u.posX=0+100*s,u.posY=400,u.init(),c.immovable.push(u)}}(),window.requestAnimationFrame(t)}()},function(t,n,e){var r=e(0),i=e(4);e(5);t.exports=function(){r.call(this);var t=new i,n=0,o=0,a=!0,s=!1,u=!1;this.init=function(){t.addKey("w",87),t.addKey("a",65),t.addKey("s",83),t.addKey("d",68);var n=new Array,r=new Array,i=new Array,o=new Image;o.src=e(17),n.push(o);var a=new Image;a.src=e(18),i.push(a);var s=new Image;s.src=e(19),r.push(s);var u=new Image;u.src=e(20),r.push(u),this.animator.addState("idle",50,!0),this.animator.addImages("idle",n),this.animator.addState("walk",200,!0),this.animator.addImages("walk",r),this.animator.addState("jump",50,!1),this.animator.addImages("jump",i)},this.isCollising=function(t){return this.posX<t.posX+t.width&&this.posX+this.width>t.posX&&this.posY<t.posY+t.height&&this.posY+this.height>t.posY},this.handleCollision=function(t){this.posY=t.posY-this.height,o=0,s=!1,u=!0},this.update=function(){"down"==t.getKeyState("d")?(a||(a=!0,this.animator.flip()),n=5,s||this.animator.changeState("walk")):"down"==t.getKeyState("a")?(a&&(a=!1,this.animator.flip()),n=-5,s||this.animator.changeState("walk")):(n=0,s||this.animator.changeState("idle")),this.posX+=n,"down"==t.getKeyState("w")&&!s&&u&&(o=-10,this.animator.changeState("jump"),s=!0),this.posY+=o,o+=.5,u=!1}}},function(t,n){t.exports=function(){function t(t,n,e,r,i,o){t.translate(e+i,r),t.scale(-1,1),t.drawImage(n,0,0,i,o),t.setTransform(1,0,0,1,0,0)}function n(){r[e].loop?i=++i%r[e].images.length:(i++,i=Math.min(i,r[e].images.length-1))}var e=null,r=new Array,i=0,o=(new Date).getTime(),a=!1;this.draw=function(s,u,c,f,h){if(null!=e){var l=(new Date).getTime();-1!=r[e].speed&&l-o>=r[e].speed&&(o=l,n());var d=r[e].images[i];a?t(s,d,u,c,f,h):s.drawImage(d,u,c,f,h)}},this.flip=function(){a=!a},this.changeState=function(t){if(r[e].name!=t){for(var n=0;n<r.length;n++)if(t==r[n].name)return e=n,i=0,o=(new Date).getTime(),!0;return!1}},this.addState=function(t,n,i){var o={name:t,speed:n,images:new Array,loop:i};r.push(o),null==e&&(e=0)},this.addImage=function(t,n){r.forEach(function(e){if(e.name==t)return void e.images.push(n)})},this.addImages=function(t,n){r.forEach(function(e){if(e.name==t)return void(e.images=n)})}}},function(t,n){t.exports=function(){function t(t){for(var n=t.which||t.keyCode,e=0;e<r.length;e++)r[e].code==n&&(r[e].state="down")}function n(t){for(var n=t.which||t.keyCode,e=0;e<r.length;e++)r[e].code==n&&(r[e].state=null)}function e(t){}var r=new Array;this.addKey=function(t,n){var e={name:t,code:n,state:null};r.push(e)},this.getKeyState=function(t){for(var n=0;n<r.length;n++)if(r[n].name==t)return r[n].state;return null},window.addEventListener("keydown",t),window.addEventListener("keyup",n),window.addEventListener("keypress",e)}},function(t,n,e){(function(t){function e(t,n){for(var e=0,r=t.length-1;r>=0;r--){var i=t[r];"."===i?t.splice(r,1):".."===i?(t.splice(r,1),e++):e&&(t.splice(r,1),e--)}if(n)for(;e--;e)t.unshift("..");return t}function r(t,n){if(t.filter)return t.filter(n);for(var e=[],r=0;r<t.length;r++)n(t[r],r,t)&&e.push(t[r]);return e}var i=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,o=function(t){return i.exec(t).slice(1)};n.resolve=function(){for(var n="",i=!1,o=arguments.length-1;o>=-1&&!i;o--){var a=o>=0?arguments[o]:t.cwd();if("string"!=typeof a)throw new TypeError("Arguments to path.resolve must be strings");a&&(n=a+"/"+n,i="/"===a.charAt(0))}return n=e(r(n.split("/"),function(t){return!!t}),!i).join("/"),(i?"/":"")+n||"."},n.normalize=function(t){var i=n.isAbsolute(t),o="/"===a(t,-1);return t=e(r(t.split("/"),function(t){return!!t}),!i).join("/"),t||i||(t="."),t&&o&&(t+="/"),(i?"/":"")+t},n.isAbsolute=function(t){return"/"===t.charAt(0)},n.join=function(){var t=Array.prototype.slice.call(arguments,0);return n.normalize(r(t,function(t,n){if("string"!=typeof t)throw new TypeError("Arguments to path.join must be strings");return t}).join("/"))},n.relative=function(t,e){function r(t){for(var n=0;n<t.length&&""===t[n];n++);for(var e=t.length-1;e>=0&&""===t[e];e--);return n>e?[]:t.slice(n,e-n+1)}t=n.resolve(t).substr(1),e=n.resolve(e).substr(1);for(var i=r(t.split("/")),o=r(e.split("/")),a=Math.min(i.length,o.length),s=a,u=0;u<a;u++)if(i[u]!==o[u]){s=u;break}for(var c=[],u=s;u<i.length;u++)c.push("..");return c=c.concat(o.slice(s)),c.join("/")},n.sep="/",n.delimiter=":",n.dirname=function(t){var n=o(t),e=n[0],r=n[1];return e||r?(r&&(r=r.substr(0,r.length-1)),e+r):"."},n.basename=function(t,n){var e=o(t)[2];return n&&e.substr(-1*n.length)===n&&(e=e.substr(0,e.length-n.length)),e},n.extname=function(t){return o(t)[3]};var a="b"==="ab".substr(-1)?function(t,n,e){return t.substr(n,e)}:function(t,n,e){return n<0&&(n=t.length+n),t.substr(n,e)}}).call(n,e(6))},function(t,n){function e(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function i(t){if(f===setTimeout)return setTimeout(t,0);if((f===e||!f)&&setTimeout)return f=setTimeout,setTimeout(t,0);try{return f(t,0)}catch(n){try{return f.call(null,t,0)}catch(n){return f.call(this,t,0)}}}function o(t){if(h===clearTimeout)return clearTimeout(t);if((h===r||!h)&&clearTimeout)return h=clearTimeout,clearTimeout(t);try{return h(t)}catch(n){try{return h.call(null,t)}catch(n){return h.call(this,t)}}}function a(){m&&d&&(m=!1,d.length?p=d.concat(p):g=-1,p.length&&s())}function s(){if(!m){var t=i(a);m=!0;for(var n=p.length;n;){for(d=p,p=[];++g<n;)d&&d[g].run();g=-1,n=p.length}d=null,m=!1,o(t)}}function u(t,n){this.fun=t,this.array=n}function c(){}var f,h,l=t.exports={};!function(){try{f="function"==typeof setTimeout?setTimeout:e}catch(t){f=e}try{h="function"==typeof clearTimeout?clearTimeout:r}catch(t){h=r}}();var d,p=[],m=!1,g=-1;l.nextTick=function(t){var n=new Array(arguments.length-1);if(arguments.length>1)for(var e=1;e<arguments.length;e++)n[e-1]=arguments[e];p.push(new u(t,n)),1!==p.length||m||i(s)},u.prototype.run=function(){this.fun.apply(null,this.array)},l.title="browser",l.browser=!0,l.env={},l.argv=[],l.version="",l.versions={},l.on=c,l.addListener=c,l.once=c,l.off=c,l.removeListener=c,l.removeAllListeners=c,l.emit=c,l.prependListener=c,l.prependOnceListener=c,l.listeners=function(t){return[]},l.binding=function(t){throw new Error("process.binding is not supported")},l.cwd=function(){return"/"},l.chdir=function(t){throw new Error("process.chdir is not supported")},l.umask=function(){return 0}},,,,,function(t,n,e){var r=e(0);e(5);t.exports=function(){r.call(this),this.init=function(){var t=new Image;t.src=e(16),this.animator.addState("idle",1e3,!1),this.animator.addImage("idle",t)}}},,,,function(t,n,e){t.exports=e.p+"44b9e40a94e851bca6a55e083e78bbdb.png"},function(t,n,e){t.exports=e.p+"d944744fa81efe78f2394d85ea176440.png"},function(t,n,e){t.exports=e.p+"3569609959eaa8dfc1f34118bc656212.png"},function(t,n,e){t.exports=e.p+"fe891c6a7aa257f89290e18160fefee2.png"},function(t,n,e){t.exports=e.p+"efd59b44cda0a5ff2dca8f4adbf78e56.png"},function(t,n,e){t.exports=e.p+"1205bb023742b11e13f92a7784831d0a.png"}]);