webpackJsonp([15,0],{0:function(e,t,i){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}var a=i(3),o=s(a),r=i(12),n=s(r),l=i(290),d=s(l),u=(i(1),i(20));i(11);o.default.use(n.default),o.default.component("App",d.default),new o.default({el:"body",data:{weibo:u.singleWeibo}})},1:function(e,t,i){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}function a(e){return e<10?"0"+e:e}function o(e){var t=[];return t.push(e.getHours()),t.push(e.getMinutes()),t=t.map(a),t.join(":")}function r(e){var t=[];return t.push(e.getMonth()+1+"月"),t.push(e.getDate()+"日"),t=t.map(a),t.join("")}Object.defineProperty(t,"__esModule",{value:!0}),t.app=void 0;var n=i(13),l=s(n),d=i(3),u=s(d),c=i(10),p=s(c);u.default.component("user-card",p.default),u.default.filter("showTime",function(e){e=(0,l.default)(e);var t=Date.now()-e;return t/864e5>1||(new Date).getDate()-new Date(e).getDate()>0||(new Date).getMonth()-new Date(e).getMonth()>0||(new Date).getFullYear()-new Date(e).getFullYear()>0?r(new Date(e))+" "+o(new Date(e)):t/36e5>1?"今天 "+o(new Date(e)):Math.ceil(t/6e4)+"分钟前"});var f={getAts:function(e){var t=/(@[0-9a-zA-Z_\u0391-\uFFE5-]+$)|(@[0-9a-zA-Z_\u0391-\uFFE5-]+\s)/g;return e.match(t)},weiboFactory:function(e){return{weiboid:0,user:e,text:"",time:Date.now()+"",forward:0,comment:0,like:0,favourited:!1,liked:!1}},commentFactory:function(e){return{user:e,text:"",time:Date.now()+"",commentid:0,weiboid:0,comment_commentid:0,like:0,liked:!1}},operationFactory:function(e){return{userid:e,weiboid:0,name:null,target_userid:0,commentid:0,time:Date.now()+""}},userCardCache:{}};window.app=f,t.app=f},6:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i(1);t.default={props:["name","userid"],data:function(){return{isHover:!1,user:null,loading:!1,userLoading:!1}},methods:{handleFollow:function(){var e=this;this.loading=!0,this.user.followed=!this.user.followed;var t=s.app.currentUser,i=s.app.operationFactory(t.userid);i.target_userid=this.user.userid,this.user.followed?this.$http.post("/follow",i).then(function(t){e.loading=!1}):this.$http.post("/follow/delete",i).then(function(t){e.loading=!1})},removeFan:function(){this.user.beFollowed=!1;var e=s.app.currentUser,t=s.app.operationFactory(e.userid);this.$http.post("/follower/delete",t).then(function(e){})},setHover:function(){var e=this;if(this.isHover=!0,!this.userLoading){if(this.userLoading=!0,this.userid&&(s.app.userCardCache[this.userid]||null===s.app.userCardCache[this.userid]))return this.user=s.app.userCardCache[this.userid],void(this.userLoading=!1);if(this.name&&(s.app.userCardCache[this.name]||null===s.app.userCardCache[this.name]))return this.user=s.app.userCardCache[this.name],void(this.userLoading=!1);var t=this.userid?"/userCard/id/"+this.userid:"/userCard/name/"+this.name;this.$http.get(t).then(function(t){var i=JSON.parse(t.data);s.app.userCardCache[e.userid?e.userid:e.name]=i,e.user=i,e.userLoading=!1})}}}}},7:function(e,t){},8:function(e,t){e.exports=' <span class=user-card-component> <span class=content-wrapper @mouseenter=setHover @mouseleave="isHover=false"> <slot></slot> </span> <div class=card v-show=isHover @mouseenter=setHover @mouseleave="isHover=false" transition=user-card> <div class=wrapper v-show="user && !userLoading"> <div class=upper> <a class=pic> <img :src=user.avatar width=50 height=50 /> </a> <div class=name> <a href=/user/{{user.userid}}>{{user.username}}</a> </div> <div class=intro> {{user.intro}} </div> </div> <div class=lower> <div class=count> <ul> <li><a href=#>关注<em>275</em></a></li> <li><a href=#>粉丝<em>860</em></a></li> <li><a href=#>微博<em>8326</em></a></li> </ul> </div> <div class=operation v-if="currentUser.userid != user.userid"> <div class=button-wrapper> <button href=javascript:void(0); class=W_btn_b @click=handleFollow> <span v-if="user.followed && user.beFollowed &&!loading"> <em class="W_ficon ficon_addtwo S_ficon">Z</em>互相关注 </span> <span v-if="loading && user.followed "> <i class=W_loading></i>关注中 </span> <span v-if="user.followed && !user.beFollowed &&!loading"> <em class="W_ficon ficon_right S_ficon">Y</em>已关注 </span> <span v-if="loading && !user.followed "> <i class=W_loading></i>取消关注中 </span> <span v-if="!user.followed && user.beFollowed &&!loading"> <em class="W_ficon ficon_right S_ficon">Y</em><em class="W_vline S_line1"></em><em class="W_ficon ficon_add">+</em>关注 </span> <span v-if="!user.followed && !user.beFollowed &&!loading"> <em class="W_ficon ficon_add S_ficon">+</em>关注 </span> </button> </div> <div class=button-wrapper> <a href=javascript:void(0); class="W_btn_b W_btn_pf_menu"> <em class="W_ficon ficon_menu S_ficon">=</em> </a> <div class=menu v-if=user.beFollowed> <div class=list_wrap> <div class="list_content W_f14"> <ul class=list_ul> <li class=item v-if=user.beFollowed @click=removeFan><a class=tlink>移除粉丝</a></li> </ul> </div> </div> </div> </div> </div> </div> </div> <div class="wrapper not-exist" v-show="!user && !userLoading"> <span>抱歉，这个昵称不存在哦！^_^</span> </div> <div class="wrapper loading" v-show=userLoading> <i class=W_loading></i> <span>正在加载，请稍后...</span> </div> </div> </span> '},10:function(e,t,i){var s,a,o={};i(7),s=i(6),a=i(8),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;a&&(r.template=a),r.computed||(r.computed={}),Object.keys(o).forEach(function(e){var t=o[e];r.computed[e]=function(){return t}})},11:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={userid:"12345",username:"xingo",intro:"立派なショタコン",following:413,fans:758,weibo:8030,avatar:"http://tva2.sinaimg.cn/crop.802.675.420.420.180/6b8bbe7ejw8f8ixud41otj21kw17uqmz.jpg"},s={userid:"12345",username:"xingo",intro:"立派なショタコン",area:"上海 虹口",birthday:"1995-04-27",mail:"xingoxu@foxmail.com"};t.currentUser=i,t.fullUserData=s},20:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i={userid:"987654321",username:"xingo",avatar:"http://tva2.sinaimg.cn/crop.802.675.420.420.180/6b8bbe7ejw8f8ixud41otj21kw17uqmz.jpg"},s={weiboid:"12345",user:i,text:"abcdefg，今天是个好天气@测试 ，[微笑]测试[哈哈]",pics:["http://wsqncdn.miaopai.com/stream/a9ukbYtdFibmwKEgeVboyQ___m.jpg","http://ww4.sinaimg.cn/large/6b8bbe7egw1f9rk0b5py8j20vx0hy0zl.jpg","http://ww1.sinaimg.cn/large/6b8bbe7egw1f9rk071we9j20vc0h5wm6.jpg","http://ww2.sinaimg.cn/large/6b8bbe7egw1f9wh3jile4j20xc0xcdw7.jpg"],time:"1479649004555",forward:30,comment:5,like:350,favourited:!1,liked:!1},a={weiboid:"123456789",text:"abcdefg，今天是个好天气@测试 ，[微笑]测试[哈哈]",time:"1479649079293",user:i,forwardWeibo:s,liked:!1,favourited:!0,like:0,forward:1,comment:3},o=[s,a];t.singleWeibo=s,t.forwardWeibo=a,t.timeline=o},153:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:["weibo"],data:function(){var e=["垃圾营销","不实信息","有害信息","违法信息","淫秽色情","人身攻击我"];return{types:e,selected:""}},methods:{submit:function(){}},computed:{}}},210:function(e,t){},250:function(e,t){e.exports=' <div class=report-spam> <div class="cp_paper clearfix"> <div class="cp_paper_head clrfloat"> <div class=cp_txt_to>我要举报的是 “<a href=miit class=cp_link_blue>@工信微报</a>” 发的微博：</div> <div class=cp_wb_short node-type=abstract> <dl class=clrfloat> <dt> <a target=_blank href=miit><img src=http://tva2.sinaimg.cn/crop.0.0.149.149.50/005CvelIjw1ev7n15yxc6j3046046glq.jpg></a> </dt> <dd> <a target=_blank href=miit class=cp_link_blue>@工信微报</a> ：为完善云服务市场环境，促进互联网产业健康有序发展，工信部起草了《关于规范云服务... </dd> </dl> </div> <div class="cp_radiobox clrfloat"> <span class=radiobox_tit> 请选择举报类型：</span> <div class=radiobox> <p v-for="type in types"> <label class=cholab> <input type=radio class=W_radio name=type :value=type v-model=selected> <span>{{type}}</span> </label> </p> </div> </div> </div> <div class="cp_paper_body clrfloat"> <div class=cp_input_intro style="visibility: visible; overflow: hidden; height: 130px"> <span class=intro_txt>补充举报说明：</span> <span class=intro_num>还可以输入<span>140</span>字</span> <textarea style="color: rgb(51, 51, 51)" placeholder=请详细填写，以确保举报能够被受理></textarea> </div> <div class=cp_btnbox> <div> <button type=button @click=submit>提交</button> </div> </div> </div> <div class="cp_paper_bottom clrfloat"> <div class=cp_footbox>举报电话: 4000 960 960（个人） 4000 980 980（企业）</div> </div> </div> </div> '},290:function(e,t,i){var s,a,o={};i(210),s=i(153),a=i(250),e.exports=s||{},e.exports.__esModule&&(e.exports=e.exports.default);var r="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;a&&(r.template=a),r.computed||(r.computed={}),Object.keys(o).forEach(function(e){var t=o[e];r.computed[e]=function(){return t}})}});