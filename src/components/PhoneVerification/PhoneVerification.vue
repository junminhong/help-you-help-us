<template src="./PhoneVerification.html">

</template>

<script>
import db from "@/db";
import Swal from 'sweetalert2';
export default{
    data(){
        return{
            verificationCode: '',
            confirmationResult: ''
        }
    },
    mounted() {
        this.initRecaptchaVerifier()
    },
    methods:{
        gotoQrcode: function(shopUid){
            this.$router.push({
                name: 'ShopQrCode',
                params:{shopUid: shopUid,}
            }) 
        },
        sendCode: function(){
            this.confirmationResult.confirm(this.verificationCode).then(() => {
                //console.log(result);
                this.gotoQrcode(this.$route.params.shopUid);
            }).catch((error) => {
                if (error.code === 'auth/invalid-verification-code'){
                    Swal.fire(
                        '手機認證訊息',
                        '驗證碼錯誤',
                        'error'
                    )
                }else if(error.code === 'auth/provider-already-linked'){
                    // 已經綁定
                }
            });
        },
        checkParams: function(){
            if (this.$route.params.confirmationResult === ''){
                //location.href = 'phone-verification';
            }
        },
        initRecaptchaVerifier: function(){
            window.recaptchaVerifier = new db.auth.RecaptchaVerifier('send-sms', {
                'size': 'invisible',
                'callback': function() {
                    //console.log(response)
                }
            })
            let appVerifier = window.recaptchaVerifier
            let taiwan_phone_number = '+886' + this.$route.params.phonenumber.slice(1, 10)
            db.auth().currentUser.linkWithPhoneNumber(taiwan_phone_number, appVerifier)
            .then(confirmationResult => {
                this.confirmationResult = confirmationResult;
            }).catch(()=>{
                //location.reload();
                //console.log(error);
            })
        }
    }
}
</script>

<style src="./PhoneVerification.css" scoped>
</style>