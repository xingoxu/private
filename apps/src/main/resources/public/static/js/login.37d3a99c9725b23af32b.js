webpackJsonp([24,0],{0:function(e,s,t){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var a=t(3),n=i(a),o=t(12),r=i(o),u=t(278),l=i(u);t(1);n.default.use(r.default),n.default.component("App",l.default),new n.default({el:"body"})},1:function(e,s,t){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e){return e<10?"0"+e:e}function n(e){var s=[];return s.push(e.getHours()),s.push(e.getMinutes()),s=s.map(a),s.join(":")}function o(e){var s=[];return s.push(e.getMonth()+1+"月"),s.push(e.getDate()+"日"),s=s.map(a),s.join("")}Object.defineProperty(s,"__esModule",{value:!0}),s.app=void 0;var r=t(13),u=i(r),l=t(3),d=i(l),c=t(10),p=i(c);d.default.component("user-card",p.default),d.default.filter("showTime",function(e){e=(0,u.default)(e);var s=Date.now()-e;return s/864e5>1||(new Date).getDate()-new Date(e).getDate()>0||(new Date).getMonth()-new Date(e).getMonth()>0||(new Date).getFullYear()-new Date(e).getFullYear()>0?o(new Date(e))+" "+n(new Date(e)):s/36e5>1?"今天 "+n(new Date(e)):Math.ceil(s/6e4)+"分钟前"});var f={getAts:function(e){var s=/(@[0-9a-zA-Z_\u0391-\uFFE5-]+$)|(@[0-9a-zA-Z_\u0391-\uFFE5-]+\s)/g;return e.match(s)},weiboFactory:function(e){return{weiboid:0,user:e,text:"",time:Date.now()+"",forward:0,comment:0,like:0,favourited:!1,liked:!1}},commentFactory:function(e){return{user:e,text:"",time:Date.now()+"",commentid:0,weiboid:0,comment_commentid:0,like:0,liked:!1}},operationFactory:function(e){return{userid:e,weiboid:0,name:null,target_userid:0,commentid:0,time:Date.now()+""}},userCardCache:{}};window.app=f,s.app=f},7:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=t(1);s.default={props:["name","userid"],data:function(){return{isHover:!1,user:null,loading:!1,userLoading:!1}},methods:{handleFollow:function(){var e=this;this.loading=!0,this.user.followed=!this.user.followed;var s=i.app.currentUser,t=i.app.operationFactory(s.userid);t.target_userid=this.user.userid,this.following?this.$http.post("/follow",t).then(function(s){e.loading=!1}):this.$http.post("/follow/delete",t).then(function(s){e.loading=!1})},removeFan:function(){this.user.beFollowed=!1;var e=i.app.currentUser,s=i.app.operationFactory(e.userid);this.$http.post("/follower/delete",s).then(function(e){})},setHover:function(){var e=this;if(this.isHover=!0,!this.userLoading){if(this.userLoading=!0,this.userid&&(i.app.userCardCache[this.userid]||null===i.app.userCardCache[this.userid]))return this.user=i.app.userCardCache[this.userid],void(this.userLoading=!1);if(this.name&&(i.app.userCardCache[this.name]||null===i.app.userCardCache[this.name]))return this.user=i.app.userCardCache[this.name],void(this.userLoading=!1);var s=this.userid?"/userCard/id/"+this.userid:"/userCard/name/"+this.name;this.$http.get(s).then(function(s){var t=JSON.parse(s.data);i.app.userCardCache[e.userid?e.userid:e.name]=t,e.user=t,e.userLoading=!1})}}}}},8:function(e,s){},9:function(e,s){e.exports=' <span class=user-card-component> <span class=content-wrapper @mouseenter=setHover @mouseleave="isHover=false"> <slot></slot> </span> <div class=card v-show=isHover @mouseenter=setHover @mouseleave="isHover=false" transition=user-card> <div class=wrapper v-show="user && !userLoading"> <div class=upper> <a class=pic> <img :src=user.avatar width=50 height=50 /> </a> <div class=name> <a href=/user/{{user.userid}}>{{user.username}}</a> </div> <div class=intro> {{user.intro}} </div> </div> <div class=lower> <div class=count> <ul> <li><a href=#>关注<em>275</em></a></li> <li><a href=#>粉丝<em>860</em></a></li> <li><a href=#>微博<em>8326</em></a></li> </ul> </div> <div class=operation v-if="currentUser.userid != user.userid"> <div class=button-wrapper> <button href=javascript:void(0); class=W_btn_b @click=handleFollow> <span v-if="user.followed && user.beFollowed &&!loading"> <em class="W_ficon ficon_addtwo S_ficon">Z</em>互相关注 </span> <span v-if="loading && user.followed "> <i class=W_loading></i>关注中 </span> <span v-if="user.followed && !user.beFollowed &&!loading"> <em class="W_ficon ficon_right S_ficon">Y</em>已关注 </span> <span v-if="loading && !user.followed "> <i class=W_loading></i>取消关注中 </span> <span v-if="!user.followed && user.beFollowed &&!loading"> <em class="W_ficon ficon_right S_ficon">Y</em><em class="W_vline S_line1"></em><em class="W_ficon ficon_add">+</em>关注 </span> <span v-if="!user.followed && !user.beFollowed &&!loading"> <em class="W_ficon ficon_add S_ficon">+</em>关注 </span> </button> </div> <div class=button-wrapper> <a href=javascript:void(0); class="W_btn_b W_btn_pf_menu"> <em class="W_ficon ficon_menu S_ficon">=</em> </a> <div class=menu v-if=user.beFollowed> <div class=list_wrap> <div class="list_content W_f14"> <ul class=list_ul> <li class=item v-if=user.beFollowed @click=removeFan><a class=tlink>移除粉丝</a></li> </ul> </div> </div> </div> </div> </div> </div> </div> <div class="wrapper not-exist" v-show="!user && !userLoading"> <span>抱歉，这个昵称不存在哦！^_^</span> </div> <div class="wrapper loading" v-show=userLoading> <i class=W_loading></i> <span>正在加载，请稍后...</span> </div> </div> </span> '},10:function(e,s,t){var i,a,n={};t(8),i=t(7),a=t(9),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var o="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;a&&(o.template=a),o.computed||(o.computed={}),Object.keys(n).forEach(function(e){var s=n[e];o.computed[e]=function(){return s}})},137:function(e,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={data:function(){return{blur:"",inputDisabled:!1,model:{username:"",password:""}}},methods:{submit:function(){var e=this;this.inputDisabled=!0,this.$http.post("/login",this.model).then(function(e){var s=JSON.parse(e.data);return s.success?(document.cookie=e.headers.get("Set-Cookie"),location.href="/"):alert(s.reason),s}).then(function(){e.inputDisabled=!1})}}}},194:function(e,s){},236:function(e,s){e.exports=' <div> <div class=upper> <div class="middle-container clrfloat"> <a class=logo href=/ ></a> <div class=left> <h1>随时随地发现新鲜事</h1> </div> <div class=right> <div class=login-panel> <div class=title> <h3>账号登录</h3> </div> <div class=W_login_form> <div class="info_list username"> <div class=input_wrap :class="{\'focus\': blur==\'username\'}"> <input class=W_input placeholder=用户名 maxlength=128 name=username type=text @focus="blur=\'username\'" @blur="blur=\'\'" :disabled=inputDisabled v-model=model.username> </div> </div> <div class="info_list password"> <div class=input_wrap :class="{\'focus\': blur==\'password\'}"> <input class=W_input maxlength=24 placeholder=请输入密码 name=password type=password @focus="blur=\'password\'" @blur="blur=\'\'" :disabled=inputDisabled v-model=model.password> </div> </div> <div class="info_list login_btn"> <button class="W_btn_a btn_32px" @click=submit :disabled=inputDisabled> <span>登录</span> </button> </div> <div class="info_list register"> <span class=S_txt2>还没有微博？</span><a target=_blank href=/register>立即注册!</a> </div> </div> </div> </div> </div> </div> </div> '},278:function(e,s,t){var i,a,n={};t(194),i=t(137),a=t(236),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var o="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;a&&(o.template=a),o.computed||(o.computed={}),Object.keys(n).forEach(function(e){var s=n[e];o.computed[e]=function(){return s}})}});