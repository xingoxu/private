<template>
  <div>
    <send-weibo-input class="weibo-send-weibo-wrapper" :current-user="currentUser"></send-weibo-input>
    <weibo-homepage-filter></weibo-homepage-filter>
    <div class="weibo-wrapper">
      <single-weibo class="weibo-single-weibo" v-for="weibo in timeline" :weibo="weibo" :current-user="currentUser" transition="show-weibo"></single-weibo>
    </div>
  </div>

</template>

<script>
import sendWeiboInput from './comp/send-weibo-input';
import singleWeibo from './comp/index-single-weibo';

export default {
  props:['timeline','currentUser'],
  data () {
    return {

    }
  },
  events: {
    newWeiboSended(weibo){
      this.timeline.unshift(weibo);
    }
  },
  components: {
    sendWeiboInput,
    singleWeibo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .weibo-send-weibo-wrapper {
    // margin-bottom: 10px;
  }
  .weibo-wrapper {
    .weibo-single-weibo {
      margin-top: 10px;
    }
  }
</style>
