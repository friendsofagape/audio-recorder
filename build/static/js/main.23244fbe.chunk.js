(this.webpackJsonpverserecorder=this.webpackJsonpverserecorder||[]).push([[0],{60:function(e,t,a){e.exports=a(77)},77:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(7),s=a.n(o);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var c=a(38),l=a(22),i=a.n(l),h=a(27),f=a(39),u=a(40),m=a(54),d=a(41),b=a(55),p=[{id:1,verse:"This is the genealogy[a] of Jesus the Messiah[b] the son of David, the son of Abraham:"},{id:2,verse:"Abraham was the father of Isaac, Isaac the father of Jacob, Jacob the father of Judah and his brothers,"},{id:3,verse:"Judah was the father of Perez and Zerah, and their mother was Tamar. Perez was the father of Hezron. Hezron was the father of Ram."},{id:4,verse:"Ram was the father of Amminadab. Amminadab was the father of Nahshon. Nahshon was the father of Salmon."},{id:5,verse:"Salmon and his wife Rahab, a non-Jewish woman, were the parents of Boaz. Boaz was the father of Obed. Obeds mother was Ruth, another non-Jewish woman. Obed was the father of Jesse"},{id:6,verse:"Jesse was the father of King David. David became the father of Solomon; Solomon mother was the wife of Uriah."},{id:7,verse:"Solomon was the father of Rehoboam. Rehoboam was the father of Abijah. Abijah was the father of Asa"},{id:8,verse:"Solomon was the father of Rehoboam. Rehoboam was the father of Abijah. Abijah was the father of Asa"},{id:9,verse:"Asa was the father of Jehoshaphat. Jehoshaphat was the father of Joram. Joram was an ancestor of Uzziah."},{id:10,verse:"Uzziah was the father of Jotham. Jotham was the father of Ahaz. Ahaz was the father of Hezekiah."},{id:11,verse:"Hezekiah was the father of Manasseh. Manasseh was the father of Amon. Amon was the father of Josiah."},{id:12,verse:"Josiah was the grandfather of Jechoniah and Jechoniahs brothers. They lived at the time when the Babylonian army took the Israelites as captives to the country of Babylon."},{id:13,verse:"After the Babylonians exiled the Israelites to Babylon, Jechoniah became the father of Shealtiel. Shealtiel was the ancestor of Zerubbabel."},{id:14,verse:"Zerubbabel was the father of Abiud. Abiud was the father of Eliakim. Eliakim was the father of Azor."},{id:15,verse:"Azor was the father of Zadok. Zadok was the father of Akim. Akim was the father of Eliud."},{id:16,verse:"Eliud was the father of Eleazar. Eleazar was the father of Matthan. Matthan was the father of Jacob."}],g=a(19),v=a.n(g),w=[],O=function(e,t,a,n){return v.a.setItem("".concat(n),t).then((function(e){w.push(e)})).catch((function(e){console.log(e)})),w};function E(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function j(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?E(a,!0).forEach((function(t){Object(c.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):E(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var y=Object(n.createContext)(),x=function(e){function t(){var e,a;Object(f.a)(this,t);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return(a=Object(m.a)(this,(e=Object(d.a)(t)).call.apply(e,[this].concat(r)))).state={isOpen:!0,onselect:1,bible:p,record:!1,recordedFiles:{},recVerse:[],isWarning:!1,blob:""},a.toggleOpen=function(){a.setState({isOpen:!a.state.isOpen})},a.selectNext=function(){a.state.onselect<=p.length&&a.setState({onselect:a.state.onselect+1})},a.selectPrev=function(){a.state.onselect>0&&a.setState({onselect:a.state.onselect-1})},a.resetVal=function(e,t,n){a.setState({onselect:e})},a.startRecording=function(){a.setState({record:!0}),a.state.recVerse.map((function(e,t){e===a.state.onselect?a.setState({isWarning:!0}):a.setState({isWarning:!1})}))},a.stopRecording=function(){a.setState({record:!1})},a.getDB=function(){var e;v.a.getItem("".concat(a.state.onselect)).then((function(t){console.log("given",t),e=t,a.setState({blob:e})})).catch((function(e){console.log(e)}))},a.saveRecord=function(){var e=Object(h.a)(i.a.mark((function e(t,n){var r;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.verse=a.state.onselect,!1===a.state.isWarning&&a.state.recVerse.push(a.state.onselect),a.setState({recordedFiles:t}),e.next=5,O(a.state.bible,a.state.recordedFiles,1,a.state.onselect);case 5:r=e.sent,console.log("saved",r),a.getDB();case 8:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),a}return Object(b.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(y.Provider,{value:j({},this.state,{toggleOpen:this.toggleOpen,selectNext:this.selectNext,selectPrev:this.selectPrev,resetVal:this.resetVal,startRecording:this.startRecording,stopRecording:this.stopRecording,saveRecord:this.saveRecord,getDB:this.getDB})},this.props.children)}}]),t}(n.Component),k=a(102),R=a(111),C=a(30),S=a(104),A=a(105),J=a(44),N=a.n(J),B=a(28),z=a.n(B),P=a(52),D=Object(k.a)((function(e){return{root:{flexGrow:1},appBar:{background:"#3F5274"},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1},soundWave:{maxWidth:300,position:"static",float:"right",marginLeft:462}}}));function I(){var e=D(),t=Object(n.useContext)(y),a=t.toggleOpen,o=t.saveRecord,s=Object(n.useContext)(y).record;return r.a.createElement("div",null,r.a.createElement(R.a,{position:"static",className:e.appBar},r.a.createElement(S.a,null,r.a.createElement(A.a,{edge:"start",className:e.menuButton,color:"inherit","aria-label":"menu"},r.a.createElement(N.a,null)),r.a.createElement(C.a,{variant:"h6",className:e.title},"Recorder"),r.a.createElement("div",null,r.a.createElement(P.a,{className:e.soundWave,record:s,onStop:function(e){o(e)},strokeColor:"#000000",backgroundColor:"#3F5274",nonstop:!0,duration:5})),r.a.createElement("div",null,r.a.createElement(A.a,{"aria-label":"account of current user","aria-controls":"menu-appbar","aria-haspopup":"true",onClick:a,color:"inherit"},r.a.createElement(z.a,null))))))}var W=a(25),V=a(112),F=a(106),L=a(46),T=a.n(L),G=a(47),M=a.n(G),U=a(48),Z=a.n(U),H=a(49),K=a.n(H),$=a(50),q=a.n($),Q=a(45),X=a.n(Q),Y=a(33),_=(Object(k.a)((function(e){return{root:{flexGrow:1},formControl:{margin:e.spacing(1),minWidth:120,marginLeft:150,float:"left",marginTop:20,position:"static"}}})),function(){var e=Object(n.useContext)(y),t=(e.isOpen,e.record,e.blob),a=e.onselect;return r.a.createElement("div",null,t.verse===a&&r.a.createElement("div",{className:Y.classes.root},r.a.createElement(X.a,{className:Y.classes.formControl,src:t.blobURL,onPlay:function(e){return console.log("onPlay")}})))}),ee=Object(k.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1},marginTop:200,button:{margin:e.spacing(1),float:"left",marginTop:18},input:{display:"none"},formControl:{margin:e.spacing(1),minWidth:120,marginLeft:150,float:"left",marginTop:20,position:"static"},appBar:{top:"auto",bottom:0,background:"#3F5274"},grow:{flexGrow:1},fab:{zIndex:1,top:-40,left:0,right:0,margin:e.spacing(2),marginLeft:-7},player:{display:"block",marginLeft:1200,width:300,color:"blue"}}}));var te=function(){var e=ee(),t=Object(n.useState)(!1),a=Object(W.a)(t,2),o=a[0],s=a[1],c=Object(n.useContext)(y),l=c.isOpen,i=c.record,h=c.blob,f=c.onselect,u=Object(n.useContext)(y).selectNext,m=Object(n.useContext)(y).selectPrev,d=Object(n.useContext)(y),b=d.startRecording,p=d.stopRecording,g=d.getDB,v=d.recVerse;return Object(n.useEffect)((function(){v.find((function(e){return e===f}))?s(!0):s(!1),console.log("onselect",f,"show",o);var e=setInterval((function(){return p()}),6e4);return function(){clearInterval(e)}})),r.a.createElement("div",null,l&&r.a.createElement(r.a.Fragment,null,r.a.createElement(V.a,{direction:"up",in:l,mountOnEnter:!0,unmountOnExit:!0},r.a.createElement(R.a,{position:"fixed",color:"primary",className:e.appBar},r.a.createElement(S.a,null,!1===i&&r.a.createElement(F.a,{color:"secondary","aria-label":"edit",className:e.fab,onClick:b},r.a.createElement(z.a,null)),i&&r.a.createElement(F.a,{color:"primary","aria-label":"edit",className:e.fab,onClick:p},r.a.createElement(T.a,null)),r.a.createElement(F.a,{color:"primary","aria-label":"edit",className:e.fab,onClick:m},r.a.createElement(M.a,null)),r.a.createElement(F.a,{color:"primary","aria-label":"edit",className:e.fab,onClick:u},r.a.createElement(Z.a,null)),o&&r.a.createElement(r.a.Fragment,null,r.a.createElement("a",{className:"download",href:h.blobURL,download:"verse.webm"},r.a.createElement(F.a,{"aria-label":"download",className:e.fab},r.a.createElement(K.a,null))),r.a.createElement(F.a,{"aria-label":"download",className:e.fab,onClick:g},r.a.createElement(q.a,null)),r.a.createElement("span",{className:e.player},r.a.createElement(_,null))))))))},ae=a(53),ne=a(107),re=a(113),oe=a(110),se=a(108),ce=a(51),le=a.n(ce),ie=a(109),he=Object(k.a)((function(e){return{root:{width:"100%",backgroundColor:e.palette.background.paper}}})),fe=p;function ue(){var e=he(),t=r.a.useState([0]),a=Object(W.a)(t,2),o=a[0],s=a[1],c=Object(n.useContext)(y).onselect,l=Object(n.useContext)(y),i=l.isOpen,h=l.recVerse,f=l.bible,u=Object(n.useContext)(y).resetVal,m=Object(n.useState)(c),d=Object(W.a)(m,2),b=d[0],p=d[1];Object(n.useEffect)((function(){p(c)}),[c]);var g=function(e){return function(){var t=o.indexOf(e),a=Object(ae.a)(o);p(e),u(e),-1===t?a.push(e):a.splice(t,1),s(a)}};return r.a.createElement(ne.a,{className:e.root},fe.map((function(e,t){var a="checkbox-list-label-".concat(e.id);return r.a.createElement(re.a,{key:e.id,role:void 0,dense:!0,button:!0,style:{marginBottom:"10px"},selected:b===t+1,onClick:g(e.id)},r.a.createElement(se.a,{id:a,primary:"".concat(e.id," ").concat(e.verse)}),i&&f[t].id===h[t]?r.a.createElement(ie.a,Object.assign({in:i,style:{transformOrigin:"0 0 0"}},i?{timeout:1e3}:{}),r.a.createElement(oe.a,null,r.a.createElement(le.a,{edge:"start",tabIndex:-1,style:{color:"red"}}))):r.a.createElement("span",{style:{marginRight:"56px"}}))})))}var me=function(){return r.a.createElement("div",null,r.a.createElement(x,null,r.a.createElement(I,null),r.a.createElement(te,null),r.a.createElement(ue,null)))};s.a.render(r.a.createElement(me,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[60,1,2]]]);
//# sourceMappingURL=main.23244fbe.chunk.js.map