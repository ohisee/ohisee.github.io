define("todoapp/todo",["backbone"],function(e){console.log("Todo");var t=t||{};return t.Todo=e.Model.extend({defaults:{title:"",completed:!1},toggle:function(){this.save({completed:!this.get("completed")})},getCompletedVal:function(){return this.get("completed")},saveTodo:function(e){this.save({completed:e})},saveTitle:function(e){this.save({title:e})}}),t}),define("todoapp/todos",["backbone","localstorage","todoapp/todo"],function(e,t,o){console.log("Todos Collection");var n=e.Collection.extend({model:o.Todo,localStorage:new t("todos-backbone"),completed:function(){return this.filter(function(e){return e.getCompletedVal()})},remaining:function(){return this.reject(function(e){return e.getCompletedVal()===!0})},nextOrder:function(){return this.length?this.last().get("order")+1:1},comparator:function(e){return e.get("order")}});o.Todos=new n}),define("todoapp/todovars",[],function(){return{ENTER_KEY:13,MAX_ITEM_CHARS_LENGTH:32,MAX_ITEM_ALLOWED:7,MAX_ITEM_REACHED_MSG:"Too many todo items on the list, consider deleting some",FADE_DURATION:3e3}}),define("requiretext",["module"],function(e){"use strict";var t,o,n,i,s,r=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],l=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,a=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,d="undefined"!=typeof location&&location.href,c=d&&location.protocol&&location.protocol.replace(/\:/,""),p=d&&location.hostname,u=d&&(location.port||void 0),h={},f=e.config&&e.config()||{};return t={version:"2.0.12",strip:function(e){if(e){e=e.replace(l,"");var t=e.match(a);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:f.createXhr||function(){var e,t,o;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(t=0;t<3;t+=1){o=r[t];try{e=new ActiveXObject(o)}catch(e){}if(e){r=[o];break}}return e},parseName:function(e){var t,o,n,i=!1,s=e.indexOf("."),r=0===e.indexOf("./")||0===e.indexOf("../");return s!==-1&&(!r||s>1)?(t=e.substring(0,s),o=e.substring(s+1,e.length)):t=e,n=o||t,s=n.indexOf("!"),s!==-1&&(i="strip"===n.substring(s+1),n=n.substring(0,s),o?o=n:t=n),{moduleName:t,ext:o,strip:i}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,o,n,i){var s,r,l,a=t.xdRegExp.exec(e);return!a||(s=a[2],r=a[3],r=r.split(":"),l=r[1],r=r[0],!(s&&s!==o||r&&r.toLowerCase()!==n.toLowerCase()||(l||r)&&l!==i))},finishLoad:function(e,o,n,i){n=o?t.strip(n):n,f.isBuild&&(h[e]=n),i(n)},load:function(e,o,n,i){if(i&&i.isBuild&&!i.inlineText)return void n();f.isBuild=i&&i.isBuild;var s=t.parseName(e),r=s.moduleName+(s.ext?"."+s.ext:""),l=o.toUrl(r),a=f.useXhr||t.useXhr;return 0===l.indexOf("empty:")?void n():void(!d||a(l,c,p,u)?t.get(l,function(o){t.finishLoad(e,s.strip,o,n)},function(e){n.error&&n.error(e)}):o([r],function(e){t.finishLoad(s.moduleName+"."+s.ext,s.strip,e,n)}))},write:function(e,o,n,i){if(h.hasOwnProperty(o)){var s=t.jsEscape(h[o]);n.asModule(e+"!"+o,"define(function () { return '"+s+"';});\n")}},writeFile:function(e,o,n,i,s){var r=t.parseName(o),l=r.ext?"."+r.ext:"",a=r.moduleName+l,d=n.toUrl(r.moduleName+l)+".js";t.load(a,n,function(o){var n=function(e){return i(d,e)};n.asModule=function(e,t){return i.asModule(e,d,t)},t.write(e,a,n,s)},s)}},"node"===f.env||!f.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]?(o=require.nodeRequire("fs"),t.get=function(e,t,n){try{var i=o.readFileSync(e,"utf8");0===i.indexOf("\ufeff")&&(i=i.substring(1)),t(i)}catch(e){n&&n(e)}}):"xhr"===f.env||!f.env&&t.createXhr()?t.get=function(e,o,n,i){var s,r=t.createXhr();if(r.open("GET",e,!0),i)for(s in i)i.hasOwnProperty(s)&&r.setRequestHeader(s.toLowerCase(),i[s]);f.onXhr&&f.onXhr(r,e),r.onreadystatechange=function(t){var i,s;4===r.readyState&&(i=r.status||0,i>399&&i<600?(s=new Error(e+" HTTP status: "+i),s.xhr=r,n&&n(s)):o(r.responseText),f.onXhrComplete&&f.onXhrComplete(r,e))},r.send(null)}:"rhino"===f.env||!f.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?t.get=function(e,t){var o,n,i="utf-8",s=new java.io.File(e),r=java.lang.System.getProperty("line.separator"),l=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(s),i)),a="";try{for(o=new java.lang.StringBuffer,n=l.readLine(),n&&n.length()&&65279===n.charAt(0)&&(n=n.substring(1)),null!==n&&o.append(n);null!==(n=l.readLine());)o.append(r),o.append(n);a=String(o.toString())}finally{l.close()}t(a)}:("xpconnect"===f.env||!f.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(n=Components.classes,i=Components.interfaces,Components.utils.import("resource://gre/modules/FileUtils.jsm"),s="@mozilla.org/windows-registry-key;1"in n,t.get=function(e,t){var o,r,l,a={};s&&(e=e.replace(/\//g,"\\")),l=new FileUtils.File(e);try{o=n["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream),o.init(l,1,0,!1),r=n["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream),r.init(o,"utf-8",o.available(),i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),r.readString(o.available(),a),r.close(),o.close(),t(a.value)}catch(e){throw new Error((l&&l.path||"")+": "+e)}}),t}),define("requiretext!templates/item-template.html",[],function(){return'<div class="view">\n\t<input class="toggle" type="checkbox" <%=completed ? \'checked\' : \'\' %>>\n\t<label><%= title %></label>\n\t<button class="destroy"></button>\n</div>\n<input class="edit" value="<%= title %>">\n'}),define("todoapp/todoview",["underscore","backbone","todoapp/todo","todoapp/todovars","requiretext!templates/item-template.html"],function(e,t,o,n,i){console.log("Todo View"),o.TodoView=t.View.extend({tagName:"li",template:e.template(i),events:{"click .toggle":"toggleCompleted","dblclick label":"edit","click .destroy":"clear","keypress .edit":"updateOnEnter","blur .edit":"close"},initialize:function(){this.listenTo(this.model,"change",this.render),this.listenTo(this.model,"destroy",this.remove),this.listenTo(this.model,"visible",this.toggleVisible)},render:function(){return this.$el.html(this.template(this.model.attributes)),this.$el.toggleClass("completed",this.model.getCompletedVal()),this.toggleVisible(),this.$input=this.$(".edit"),this},toggleVisible:function(){this.$el.toggleClass("hidden",this.isHidden())},isHidden:function(){var e=this.model.getCompletedVal();return!e&&"completed"===o.TodoFilter||e&&"active"===o.TodoFilter},toggleCompleted:function(){this.model.toggle()},edit:function(){this.$el.addClass("editing"),this.$input.attr("maxlength",n.MAX_ITEM_CHARS_LENGTH),this.$input.focus()},close:function(){var e=this.$input.val().trim();e?this.model.saveTitle(e):this.clear(),this.$el.removeClass("editing")},updateOnEnter:function(e){e.which===n.ENTER_KEY&&this.close()},clear:function(){this.model.destroy()}})}),define("requiretext!templates/stats-template.html",[],function(){return'<span id="todo-count">\n\t<strong><%= remaining %></strong><%= remaining === 1 ? \'&nbsp;item\' : \'&nbsp;items\' %> left</span>\n<ul id="filters">\n\t<li>\n\t\t<a class="selected" href="#/">All</a>\n\t</li>\n\t<li>\n\t\t<a href="#/active">Active</a>\n\t</li>\n\t<li>\n\t\t<a href="#/completed">Completed</a>\n\t</li>\n</ul>\n<% if (completed) { %>\n\t<button id="clear-completed">Clear completed (<%= completed %>)</button>\n<% } %>\n'}),define("todoapp/todoappview",["underscore","backbone","todoapp/todo","todoapp/todos","todoapp/todoview","todoapp/todovars","requiretext!templates/stats-template.html"],function(e,t,o,n,i,s,r){console.log("App View"),o.AppView=t.View.extend({el:"#todoapp",statsTemplate:e.template(r),events:{"keypress #new-todo":"createOnEnter","click #clear-completed":"clearCompleted","click #toggle-all":"toggleAllComplete"},initialize:function(){this.allCheckbox=this.$("#toggle-all")[0],this.$input=this.$("#new-todo"),this.$footer=this.$("#footer"),this.$main=this.$("#main"),this.$msg=this.$("#todomsg"),this.listenTo(o.Todos,"add",this.addOne),this.listenTo(o.Todos,"reset",this.addAll),this.listenTo(o.Todos,"change:completed",this.filterOne),this.listenTo(o.Todos,"filter",this.filterAll),this.listenTo(o.Todos,"all",this.render),this.listenTo(o.Todos,"warning",this.warningMessage),o.Todos.fetch({reset:!0}),this.allCheckbox.checked=!1,this.$input.attr("maxlength",s.MAX_ITEM_CHARS_LENGTH)},render:function(){var e=o.Todos.completed().length,t=o.Todos.remaining().length;o.Todos.length?(this.$main.show(),this.$footer.show(),this.$footer.html(this.statsTemplate({completed:e,remaining:t})),this.$("#filters li a").removeClass("selected").filter('[href="#/'+(o.TodoFilter||"")+'"]').addClass("selected")):(this.$main.hide(),this.$footer.hide()),this.allCheckbox.checked=!t},addOne:function(e){var t=new o.TodoView({model:e});$("#todo-list").append(t.render().el)},addAll:function(){this.$("#todo-list").html(""),o.Todos.each(this.addOne,this)},filterOne:function(e){e.trigger("visible")},filterAll:function(){o.Todos.each(this.filterOne,this)},newAttributes:function(){return{title:this.$input.val().trim(),order:o.Todos.nextOrder(),completed:!1}},createOnEnter:function(e){e.which===s.ENTER_KEY&&this.$input.val().trim()&&(o.Todos.length<s.MAX_ITEM_ALLOWED?o.Todos.create(this.newAttributes()):o.Todos.trigger("warning"),this.$input.val(""))},clearCompleted:function(){return e.invoke(o.Todos.completed(),"destroy"),!1},toggleAllComplete:function(){var e=this.allCheckbox.checked;o.Todos.each(function(t){t.saveTodo(e)})},warningMessage:function(){o.Todos.length>=s.MAX_ITEM_ALLOWED&&(this.$msg.show(),this.$msg.html(s.MAX_ITEM_REACHED_MSG).css({"font-size":"13px","font-style":"italic",color:"rgba(107, 38, 20, 0.75)","border-bottom":"2px ridge rgba(153, 153, 153, 0.2)"}),this.$msg.fadeOut(s.FADE_DURATION))}})}),define("todoapp/todorouter",["backbone","todoapp/todo","todoapp/todos"],function(e,t,o){console.log("Todo Router");var n=e.Router.extend({routes:{help:"showHelp","*filter":"setFilter"},showHelp:function(){console.log("Help on its way")},setFilter:function(e){e&&(e=e.trim()),t.TodoFilter=e||"",t.Todos.trigger("filter")}});t.TodoRouter=new n,e.history.start()}),requirejs.config({paths:{jquery:"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min",underscore:"https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min",backbone:"https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min",localstorage:"https://cdnjs.cloudflare.com/ajax/libs/backbone-localstorage.js/1.1.16/backbone.localStorage-min",requiretext:"https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min"}}),requirejs(["todoapp/todo","todoapp/todos","todoapp/todoview","todoapp/todoappview","todoapp/todorouter","todoapp/todovars"],function(e,t,o,n,i,s){console.log("Start Todo App"),new e.AppView}),define("todoappconfig.js",function(){});