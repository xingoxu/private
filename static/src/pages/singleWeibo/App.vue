<template>
  <div class="weibo-main-app">
    <top-nav nav-now="homepage" :current-user="currentUser" :notification="notification"></top-nav>
    <div class="weibo-frame">
      <middle-col class="weibo-mid-col" v-ref:middle-col :weibo="weibo" :current-user="currentUser"></middle-col>
      <div class="weibo-right-col">
        <right-col :current-user="currentUser"></right-col>
      </div>

    </div>
    <footer>
      <p>服务热线：4000 960 960（个人/企业）服务时间9:00-21:00 4000 980 980（广告主）服务时间9:00-18:00 （按当地市话标准计算）</p>
      <p>京ICP证100780号 互联网药品服务许可证 互联网医疗保健许可证 京网文[2014]2046-296号 京ICP备12002058号 增值电信业务经营许可证B2-20140447</p>
      <p>Copyright © 2009-2016 WEIBO 北京微梦创科网络技术有限公司 京公网安备11000002000019号</p>
    </footer>
    <new-weibo-popup v-ref:new-weibo-popup :current-user="currentUser"></new-weibo-popup>
    <cancel-favourite-popup v-ref:cancel-favourite-popup></cancel-favourite-popup>
    <favourite-success-popup v-ref:favourite-success-popup></favourite-popup>
  </div>
</template>

<script>
import middleCol from './middle-col';
import rightCol from '../../components/right-col';
import topNav from '../../components/comp/top-nav';
import forwardPopup from '../../components/comp/forward-popup';
import favouriteSuccessPopup from '../../components/comp/favourite-success-popup';
import cancelFavouritePopup from '../../components/comp/cancel-favourite-popup';
import newWeiboPopup from '../../components/comp/new-weibo-popup';

export default {
  created() {
    document.title= `${this.weibo.text.substring(0,10)}... - 微博`;
    app.currentUser = this.currentUser;
  },
  props: ['weibo','currentUser','notification'],
  data () {
    return {

    }
  },
  methods: {
  },
  events: {
    weiboFavourited(){
      this.$refs.favouriteSuccessPopup.$emit('show');
    },
    cancelFavourite(weiboID){
      this.$refs.cancelFavouritePopup.$emit('show',weiboID);
    },
    weiboFavouritCancelled(weiboID) {
      this.$refs.middleCol.$broadcast('weiboFavouritCancelled',weiboID);
    },
    showNewWeiboPopup(){
      this.$refs.newWeiboPopup.$emit('show');
    }
  },
  components: {
    middleCol,
    rightCol,
    topNav,
    forwardPopup,
    favouriteSuccessPopup,
    cancelFavouritePopup,
    newWeiboPopup,
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
  width: 830px;
  min-height: ~"calc(100vh - 16px - 50px)";
  margin: 0 auto;
  padding: 16px 0 0;
  position: relative;

  padding-bottom: 10px;
  .weibo-left-col {
    position: fixed;
    width: 150px;
  }
  .weibo-right-col {
    position: absolute;
    top: 16px;//same with weibo-frame's padding top;
    right: 0;
    width: 230px;
    margin-right: 10px;
    >div{
      position: fixed;
      width: 230px;
    }
  }
  .weibo-mid-col {
    padding: 0 250px 0 0px;
    margin-right: 10px;
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
