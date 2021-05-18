<template src="./CustomerForm.html">

</template>

<script>
import db from "@/db";
export default {
    data(){
        return{
            shopName: '',
            personAmount: 1
        }
    },
    mounted() {
        this.showShopName()
    },
    methods:{
        showShopName: function(){
            db.firestore().collection('shops').doc(this.$route.params.shopUid).get().then(shop=>{
                this.shopName = shop.data().name;
            })
        },
        checkForm: function(){

        }
    }
}
</script>

<style src="./CustomerForm.css" scoped>
</style>