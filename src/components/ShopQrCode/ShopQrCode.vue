<template src="./ShopQrCode.html">

</template>

<script>
import VueQrcode from "vue3-qrcode";
export default {
  data(){
    return{
      shopQrcode: '',
    }
  },
  components: {
    VueQrcode
  },
  mounted() {
    this.showUserWalletStatus()
  },
  methods: {
    showUserWalletStatus: function (){
      this.shopQrcode = 'test';
    },
    downloadQrcode: function(){
      var img = document.getElementById('qrcode'); // 获取要下载的图片
      var url = img.src;                            // 获取图片地址
      var a = document.createElement('a');          // 创建一个a节点插入的document
      var event = new MouseEvent('click')           // 模拟鼠标click点击事件
      a.download = 'qrcode.png'                      // 设置a节点的download属性值
      a.href = url;                                 // 将图片的src赋值给a节点的href
      a.dispatchEvent(event)                        // 触发鼠标点击事件
    }
  }
}
</script>

<style src="./ShopQrCode.css" scoped>
</style>