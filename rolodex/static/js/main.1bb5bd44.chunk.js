(this["webpackJsonpreact-project-rolodex"]=this["webpackJsonpreact-project-rolodex"]||[]).push([[0],[,,,,,function(e,t,n){e.exports={"card-list":"card-list_card-list__1auyK"}},function(e,t,n){e.exports={"card-container":"card_card-container__2hnvk"}},function(e,t,n){e.exports={search:"search-box_search__1v148"}},,,function(e,t,n){e.exports=n(28)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){var a={"./1.png":18,"./10.png":19,"./2.png":20,"./3.png":21,"./4.png":22,"./5.png":23,"./6.png":24,"./7.png":25,"./8.png":26,"./9.png":27};function o(e){var t=r(e);return n(t)}function r(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}o.keys=function(){return Object.keys(a)},o.resolve=r,e.exports=o,o.id=17},function(e,t,n){e.exports=n.p+"static/media/1.0edc7548.png"},function(e,t,n){e.exports=n.p+"static/media/10.ebf120cf.png"},function(e,t,n){e.exports=n.p+"static/media/2.ce05a341.png"},function(e,t,n){e.exports=n.p+"static/media/3.d5cd9590.png"},function(e,t,n){e.exports=n.p+"static/media/4.64a79987.png"},function(e,t,n){e.exports=n.p+"static/media/5.3c592722.png"},function(e,t,n){e.exports=n.p+"static/media/6.9edd14c8.png"},function(e,t,n){e.exports=n.p+"static/media/7.ab4bb55e.png"},function(e,t,n){e.exports=n.p+"static/media/8.308fe317.png"},function(e,t,n){e.exports=n.p+"static/media/9.f9da866f.png"},function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(2),c=n.n(r),i=(n(15),n(3)),s=n(4),l=n(9),u=n(8),p=(n(16),n(5)),d=n.n(p),f=n(6),m=n.n(f),h=function(e){return o.a.createElement("div",{className:m.a["card-container"]},o.a.createElement("img",{alt:"monster ".concat(e.robot.id),src:n(17)("./".concat(e.robot.id,".png"))}),o.a.createElement("h2",null,e.robot.name),o.a.createElement("p",null,e.robot.email))};var g=function(e){return o.a.createElement("div",{className:d.a["card-list"]},e.robots.map((function(e){return o.a.createElement(h,{key:(997*Math.random()).toString(36).replace(".",""),robot:e})})))},v=n(7),b=n.n(v),x=function(e){return o.a.createElement("input",{className:b.a.search,type:"search",placeholder:e.placeHolder,value:e.searchField,onChange:e.changeHandler})},E=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var a;return Object(i.a)(this,n),(a=t.call(this,e)).state={title:"How are you?",searchField:"",robots:[]},a}return Object(s.a)(n,[{key:"onClickHandler",value:function(e){e.preventDefault(),this.setState({title:"fine, thanks"})}},{key:"onChangeHandler",value:function(e){var t=this;e.preventDefault(),this.setState({searchField:e.target.value,title:e.target.value},(function(){return console.log(t.state)}))}},{key:"componentDidMount",value:function(){var e=this;fetch("https://jsonplaceholder.typicode.com/users").then((function(e){return e.json()})).then((function(t){e.setState({robots:t.map((function(e){return{id:e.id,name:e.name,email:e.email}}))})}))}},{key:"render",value:function(){var e=this.state,t=e.robots,n=e.searchField,a=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}));return o.a.createElement("div",{className:"App"},o.a.createElement("h1",null,"Robots Rolodex"),o.a.createElement(x,{searchField:n,placeHolder:"search robot",changeHandler:this.onChangeHandler.bind(this)}),o.a.createElement(g,{robots:a}))}}]),n}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(E,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[10,1,2]]]);
//# sourceMappingURL=main.1bb5bd44.chunk.js.map