webpackJsonp([14,0],{0:function(e,s,t){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}var a=t(3),o=i(a),n=t(12),r=i(n),l=t(269),c=i(l),u=(t(1),t(11));o.default.use(r.default),o.default.component("App",c.default),new o.default({el:"body",data:{currentUser:u.currentUser}})},1:function(e,s,t){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}function a(e){return e<10?"0"+e:e}function o(e){var s=[];return s.push(e.getHours()),s.push(e.getMinutes()),s=s.map(a),s.join(":")}function n(e){var s=[];return s.push(e.getMonth()+1+"月"),s.push(e.getDate()+"日"),s=s.map(a),s.join("")}Object.defineProperty(s,"__esModule",{value:!0}),s.app=void 0;var r=t(13),l=i(r),c=t(3),u=i(c),d=t(10),p=i(d);u.default.component("user-card",p.default),u.default.filter("showTime",function(e){e=(0,l.default)(e);var s=Date.now()-e;return s/864e5>1||(new Date).getDate()-new Date(e).getDate()>0||(new Date).getMonth()-new Date(e).getMonth()>0||(new Date).getFullYear()-new Date(e).getFullYear()>0?n(new Date(e))+" "+o(new Date(e)):s/36e5>1?"今天 "+o(new Date(e)):Math.ceil(s/6e4)+"分钟前"});var f={getAts:function(e){var s=/(@[0-9a-zA-Z_\u0391-\uFFE5-]+$)|(@[0-9a-zA-Z_\u0391-\uFFE5-]+\s)/g;return e.match(s)},weiboFactory:function(e){return{weiboid:0,user:e,text:"",time:Date.now()+"",forward:0,comment:0,like:0,favourited:!1,liked:!1}},commentFactory:function(e){return{user:e,text:"",time:Date.now()+"",commentid:0,weiboid:0,comment_commentid:0,like:0,liked:!1}},operationFactory:function(e){return{userid:e,weiboid:0,name:null,target_userid:0,commentid:0,time:Date.now()+""}},userCardCache:{}};window.app=f,s.app=f},6:function(e,s,t){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var i=t(1);s.default={props:["name","userid"],data:function(){return{isHover:!1,user:null,loading:!1,userLoading:!1}},methods:{handleFollow:function(){var e=this;this.loading=!0,this.user.followed=!this.user.followed;var s=i.app.currentUser,t=i.app.operationFactory(s.userid);t.target_userid=this.user.userid,this.user.followed?this.$http.post("/follow",t).then(function(s){e.loading=!1}):this.$http.post("/follow/delete",t).then(function(s){e.loading=!1})},removeFan:function(){this.user.beFollowed=!1;var e=i.app.currentUser,s=i.app.operationFactory(e.userid);this.$http.post("/follower/delete",s).then(function(e){})},setHover:function(){var e=this;if(this.isHover=!0,!this.userLoading){if(this.userLoading=!0,this.userid&&(i.app.userCardCache[this.userid]||null===i.app.userCardCache[this.userid]))return this.user=i.app.userCardCache[this.userid],void(this.userLoading=!1);if(this.name&&(i.app.userCardCache[this.name]||null===i.app.userCardCache[this.name]))return this.user=i.app.userCardCache[this.name],void(this.userLoading=!1);var s=this.userid?"/userCard/id/"+this.userid:"/userCard/name/"+this.name;this.$http.get(s).then(function(s){var t=JSON.parse(s.data);i.app.userCardCache[e.userid?e.userid:e.name]=t,e.user=t,e.userLoading=!1})}}}}},7:function(e,s){},8:function(e,s){e.exports=' <span class=user-card-component> <span class=content-wrapper @mouseenter=setHover @mouseleave="isHover=false"> <slot></slot> </span> <div class=card v-show=isHover @mouseenter=setHover @mouseleave="isHover=false" transition=user-card> <div class=wrapper v-show="user && !userLoading"> <div class=upper> <a class=pic> <img :src=user.avatar width=50 height=50 /> </a> <div class=name> <a href=/user/{{user.userid}}>{{user.username}}</a> </div> <div class=intro> {{user.intro}} </div> </div> <div class=lower> <div class=count> <ul> <li><a href=#>关注<em>275</em></a></li> <li><a href=#>粉丝<em>860</em></a></li> <li><a href=#>微博<em>8326</em></a></li> </ul> </div> <div class=operation v-if="currentUser.userid != user.userid"> <div class=button-wrapper> <button href=javascript:void(0); class=W_btn_b @click=handleFollow> <span v-if="user.followed && user.beFollowed &&!loading"> <em class="W_ficon ficon_addtwo S_ficon">Z</em>互相关注 </span> <span v-if="loading && user.followed "> <i class=W_loading></i>关注中 </span> <span v-if="user.followed && !user.beFollowed &&!loading"> <em class="W_ficon ficon_right S_ficon">Y</em>已关注 </span> <span v-if="loading && !user.followed "> <i class=W_loading></i>取消关注中 </span> <span v-if="!user.followed && user.beFollowed &&!loading"> <em class="W_ficon ficon_right S_ficon">Y</em><em class="W_vline S_line1"></em><em class="W_ficon ficon_add">+</em>关注 </span> <span v-if="!user.followed && !user.beFollowed &&!loading"> <em class="W_ficon ficon_add S_ficon">+</em>关注 </span> </button> </div> <div class=button-wrapper> <a href=javascript:void(0); class="W_btn_b W_btn_pf_menu"> <em class="W_ficon ficon_menu S_ficon">=</em> </a> <div class=menu v-if=user.beFollowed> <div class=list_wrap> <div class="list_content W_f14"> <ul class=list_ul> <li class=item v-if=user.beFollowed @click=removeFan><a class=tlink>移除粉丝</a></li> </ul> </div> </div> </div> </div> </div> </div> </div> <div class="wrapper not-exist" v-show="!user && !userLoading"> <span>抱歉，这个昵称不存在哦！^_^</span> </div> <div class="wrapper loading" v-show=userLoading> <i class=W_loading></i> <span>正在加载，请稍后...</span> </div> </div> </span> '},10:function(e,s,t){var i,a,o={};t(7),i=t(6),a=t(8),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var n="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;a&&(n.template=a),n.computed||(n.computed={}),Object.keys(o).forEach(function(e){var s=o[e];n.computed[e]=function(){return s}})},11:function(e,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var t={userid:"12345",username:"xingo",intro:"立派なショタコン",following:413,fans:758,weibo:8030,avatar:"http://tva2.sinaimg.cn/crop.802.675.420.420.180/6b8bbe7ejw8f8ixud41otj21kw17uqmz.jpg"},i={userid:"12345",username:"xingo",intro:"立派なショタコン",area:"上海 虹口",birthday:"1995-04-27",mail:"xingoxu@foxmail.com"};s.currentUser=t,s.fullUserData=i},15:function(e,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={props:["currentUser","navNow","notification"],ready:function(){var e=this;window.addEventListener("scroll",this.windowScroll),window.addEventListener("keyup",function(s){78==s.keyCode&&e.showNewWeiboPopup()})},beforeDestroy:function(){window.removeEventListener("scroll",this.windowScroll)},data:function(){return{searchFocus:!1,isTop:!0}},methods:{windowScroll:function(e){return document.body.scrollTop>0?void(this.isTop=!1):void(this.isTop=!0)},showNewWeiboPopup:function(){this.$dispatch("showNewWeiboPopup")}}}},16:function(e,s){},17:function(e,s){e.exports=' <div> <nav class=top-nav :class="{\'has-alpha\': !isTop}"> <div class=center-zone> <div class=logo> <a href=/ > <span class=logo></span> </a> </div> <div class=search :class="{\'focus\': searchFocus}"> <form action=/search target=_blank method=get> <input type=text name=keywords autocomplete=off class=W_input placeholder=搜索微博、找人 @focus="searchFocus=true" @blur="searchFocus=false"/> <button title=搜索 class="W_ficon ficon_search S_ficon">f</button> </form> </div> <div class=right-operation> <div class=site-nav> <ul> <li :class="{\'now\': navNow==\'homepage\'}"><a href=/ ><em class="W_ficon ficon_home S_ficon">E</em><em class=text>首页</em></a></li> <li :class="{\'now\': navNow==\'mypage\'}"><a href=/user/{{currentUser.userid}}><em class="W_ficon ficon_home S_ficon">H</em><em class=text>{{currentUser.username}}</em></a></li> </ul> </div> <div class=nav-func> <ul class="gn_set S_line1"> <li class=gn_set_list> <a href=javascript:void(0); class=""> <em class="W_ficon ficon_mail S_ficon">I</em> </a> <div class=menu> <ul> <li><a href=/at>@我的</a> </li> <li><a href=/comment>评论</a> </li> <li><a href=/like>赞</a> </li> </ul> </div> </li> <li class=gn_set_list> <a href=javascript:void(0); class=""> <em class="W_ficon ficon_set S_ficon">*</em> </a> <div class=menu> <ul> <li><a href=/profile>个人资料</a> </li> <li><a href=/password>账号安全</a> </li> <li class="line S_line2"></li> <li><a href=/logout>退出</a> </li> </ul> </div> </li> <li class=gn_set_list> <a href=javascript:void(0); @click=showNewWeiboPopup><em class="W_ficon ficon_send S_ficon" title=新微博>ß</em></a> </li> </ul> <div class=gn_topmenulist_tips> <a href=javascript:void(0); class="W_ficon ficon_close S_ficon">X</a> <ul> <li>1条新评论，<a href=/comment>查看</a> </li> </ul> </div> </div> </div> </div> </nav> <div class=new-weibo-popup> </div> </div> '},18:function(e,s,t){var i,a,o={};t(16),i=t(15),a=t(17),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var n="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;a&&(n.template=a),n.computed||(n.computed={}),Object.keys(o).forEach(function(e){var s=o[e];n.computed[e]=function(){return s}})},88:function(e,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={props:["user","targetUserCard","targetUser"],data:function(){var e=[{key:"following",link:"/follow",showText:"关注"},{key:"fans",link:"/fans",showText:"粉丝"},{key:"weibo",link:"",showText:"微博"}];return{cardLowerStatus:e}}}},89:function(e,s){},90:function(e,s){e.exports=' <div class=left-col> <ul> <li> <div class=status> <ul> <li v-for="status in cardLowerStatus"> <a href=/user/{{targetUserCard.userid}}{{status.link}}> <strong>{{targetUserCard[status.key]}}</strong> <span>{{status.showText}}</span> </a> </li> </ul> </div> </li> <li> <ul class=detail> <li class="item S_line2 clrfloat" v-if=targetUser.area> <span class="item_ico W_fl"><em class="W_ficon ficon_cd_place S_ficon">2</em></span> <span class="item_text W_fl">{{targetUser.area}}</span> </li> <li class="item S_line2 clrfloat"> <span class="item_ico W_fl"><em class="W_ficon ficon_constellation S_ficon">ö</em></span> <span class="item_text W_fl">{{targetUser.birthday}}</span> </li> <li class="item S_line2 clrfloat"> <span class="item_ico W_fl"><em class="W_ficon ficon_pinfo S_ficon">Ü</em></span> <span class="item_text W_fl">{{targetUser.intro ? targetUser.intro : \'还没有做自我介绍哦\'}}</span> </li> <li class="item S_line2 clrfloat"> <span class="item_ico W_fl"><em class="W_ficon ficon_email S_ficon">ý</em></span> <span class="item_text W_fl">{{targetUser.mail}}</span> </li> </ul> </li> </ul> </div> '},91:function(e,s,t){var i,a,o={};t(89),i=t(88),a=t(90),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var n="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;a&&(n.template=a),n.computed||(n.computed={}),Object.keys(o).forEach(function(e){var s=o[e];n.computed[e]=function(){return s}})},132:function(e,s,t){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(s,"__esModule",{value:!0});var a=t(91),o=i(a),n=t(270),r=i(n),l=t(18),c=i(l);s.default={props:["currentUser"],data:function(){return{}},methods:{},events:{},components:{leftCol:o.default,middleCol:r.default,topNav:c.default}}},133:function(e,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.default={data:function(){return{failReason:"",status:""}},events:{},components:{}}},189:function(e,s){},190:function(e,s){},229:function(e,s){e.exports=" <div class=weibo-main-app> <top-nav :current-user=currentUser></top-nav> <div class=weibo-frame> <middle-col class=weibo-mid-col></middle-col> </div> <footer> <p>服务热线：4000 960 960（个人/企业）服务时间9:00-21:00 4000 980 980（广告主）服务时间9:00-18:00 （按当地市话标准计算）</p> <p>京ICP证100780号 互联网药品服务许可证 互联网医疗保健许可证 京网文[2014]2046-296号 京ICP备12002058号 增值电信业务经营许可证B2-20140447</p> <p>Copyright © 2009-2016 WEIBO 北京微梦创科网络技术有限公司 京公网安备11000002000019号</p> </footer> </div> "},230:function(e,s){e.exports=' <div class=security-panel> <div class=title> <span>账号安全</span> </div> <div class="panel clrfloat"> <ul class="left_list S_line1 W_fl"> <li class="on S_line1"> <span class="s_icon icon_01"></span><a>修改密码</a> </li> </ul> <div class="right_mod W_fr"> <div class=form_mod> <div class="W_tips tips_warn clearfix"> <p class=icon><i class="W_icon icon_warnS icon-background"></i></p> <p class=txt>为保障您的帐号安全，修改密码前请填写原密码</p> </div> <ul class=form_list> <li class=item> <span class=tit>原密码：</span> <input type=password class=W_input placeholder=请输入原密码> </li> <li class=item> <span class=tit>新密码：</span> <input type=password class=W_input placeholder=请输入新密码> </li> <li class=item> <span class=tit>确认新密码：</span> <input type=password class=W_input placeholder=请再一次输入新密码> </li> </ul> <div class="form_btn S_line2"> <div class=tip> <div class=success v-show="status==\'success\'" transition=up> <i class="icon_succS icon-background"></i>修改成功 </div> <div class=failed v-show="status==\'fail\'"> <i class="icon_rederrorS icon-background"></i>{{failReason}} </div> </div> <button class="W_btn_a btn_34px" @click="status=\'success\'">修改</button> </div> </div> </div> </div> </div> '},269:function(e,s,t){var i,a,o={};t(189),i=t(132),a=t(229),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var n="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;a&&(n.template=a),n.computed||(n.computed={}),Object.keys(o).forEach(function(e){var s=o[e];n.computed[e]=function(){return s}})},270:function(e,s,t){var i,a,o={};t(190),i=t(133),a=t(230),e.exports=i||{},e.exports.__esModule&&(e.exports=e.exports.default);var n="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;a&&(n.template=a),n.computed||(n.computed={}),Object.keys(o).forEach(function(e){var s=o[e];n.computed[e]=function(){return s}})}});