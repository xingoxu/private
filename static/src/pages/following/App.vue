<template>
  <div class="weibo-main-app">
    <top-nav :current-user="currentUser" :notification="notification"></top-nav>
    <div class="weibo-frame">
      <personal-header class="weibo-personal-header" :current-user="currentUser" :user="targetUserCard"></personal-header>
      <left-col class="weibo-left-col"  :target-user-card="targetUserCard" :target-user="targetUser"></left-col>
      <middle-col class="weibo-mid-col" :users="users"></middle-col>
    </div>
    <footer>
      <p>服务热线：4000 960 960（个人/企业）服务时间9:00-21:00 4000 980 980（广告主）服务时间9:00-18:00 （按当地市话标准计算）</p>
      <p>京ICP证100780号 互联网药品服务许可证 互联网医疗保健许可证 京网文[2014]2046-296号 京ICP备12002058号 增值电信业务经营许可证B2-20140447</p>
      <p>Copyright © 2009-2016 WEIBO 北京微梦创科网络技术有限公司 京公网安备11000002000019号</p>
    </footer>
    <new-weibo-popup v-ref:new-weibo-popup :current-user="currentUser"></new-weibo-popup>
  </div>
</template>

<script>
import leftCol from '../personalPage/left-col';
import middleCol from './middle-col';
import topNav from '../../components/comp/top-nav';
import personalHeader from '../../components/personal-header';
import forwardPopup from '../../components/comp/forward-popup';
import favouriteSuccessPopup from '../../components/comp/favourite-success-popup';
import cancelFavouritePopup from '../../components/comp/cancel-favourite-popup';
import newWeiboPopup from '../../components/comp/new-weibo-popup';

export default {
  props: ['currentUser','notification','targetUser','targetUserCard','users'],
  created(){
    document.title= `${this.currentUser.username}的微博_微博`;
    app.currentUser = this.currentUser;
  },
  data () {
    return {

    }
  },
  created(){
    app.currentUser = this.currentUser;
  },
  methods: {

  },
  events: {

  },
  components: {
    leftCol,
    middleCol,
    topNav,
    forwardPopup,
    favouriteSuccessPopup,
    cancelFavouritePopup,
    newWeiboPopup,
    personalHeader
  }
}
</script>

<style lang="less">
@import "../../common.less";
body {
  // background: url("http://img.t.sinajs.cn/t6/skin/skin048/images/body_bg.jpg?id=201503261330") no-repeat top center, url("http://img.t.sinajs.cn/t6/skin/skin048/images/body_repeat.png?id=1414052827385") repeat-x center 0 #b4daf0;
  background: url("http://img.t.sinajs.cn/t6/skin/skin055/images/body_bg.jpg?id=1410943047113") no-repeat top center #1f160e;

  padding-top: 50px;
}
.weibo-frame {
  width: 920px;
  min-height: ~"calc(100vh - 16px - 50px - 108px - 10px)"; //108 - 10底部高度
  margin: 0 auto;
  padding: 16px 0 0;
  position: relative;

  padding-bottom: 10px;
  .weibo-personal-header {
    margin-bottom: 16px;
  }
  .weibo-left-col {
    float: left;
    width: 300px;
  }
  .weibo-mid-col {
    margin: 0 0 0 320px;
  }
}
.weibo-main-app {
  >footer {
    background: #232324;
    padding: 20px 0;
    text-align: center;
    color: #999;
    position: relative;
    p {
      margin: 0 0 10px;
      &:last-child {
        margin: 0;
      }
    }
  }
}
</style>
