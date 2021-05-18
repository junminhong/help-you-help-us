<template src="./ShopForm.html">

</template>

<script>
import db from "@/db";
import { uid } from 'uid';
let dateFormat = require("dateformat")
//import Swal from 'sweetalert2';

export default{
    prop: {
        confirmationResult: ''
    },
    data(){
        return{
            realShopName: '',
            shopAddress: '',
            shopPhoneNumber: '',
            realOwnerName: '',
            ownerPhoneNumber: '',
            realShopNameErrorMsg: '',
            shopAddressErrorMsg: '',
            shopPhoneNumberErrorMsg: '',
            realOwnerNameErrorMsg: '',
            ownerPhoneNumberErrorMsg: '',
            canAddShopInfo: true,
            confirmationResult: '',
            haveVerificationPhone: false,
        }
    },
    methods: {
        checkShopInfo: function(){
            console.log('商店名稱：' + this.realShopName +
                        '商店地址：' + this.shopAddress +
                        '商店電話：' + this.shopPhoneNumber + 
                        '真實負責人姓名：' + this.realOwnerName + 
                        '負責人手機電話：' + this.ownerPhoneNumber);
            console.log(uid(64));
            if(this.realShopName === ''){
                this.realShopNameErrorMsg = '商店名稱不得為空！';
                this.canAddShopInfo = false;
            }
            if(this.shopAddress === ''){
                this.shopAddressErrorMsg = '商店地址不得為空！';
                this.canAddShopInfo = false;
            }
            if(this.shopPhoneNumber === ''){
                this.shopPhoneNumberErrorMsg = '商店市話/手機不得為空！';
                this.canAddShopInfo = false;
            }
            if(this.realOwnerName === ''){
                this.realOwnerNameErrorMsg = '負責人姓名不得為空！';
                this.canAddShopInfo = false;
            }
            if(this.ownerPhoneNumber === ''){
                this.ownerPhoneNumberErrorMsg = '負責人手機不得為空！';
                this.canAddShopInfo = false;
            }
            if(this.canAddShopInfo){
                this.clearErrorMsg();
                this.addShopInfo();
            }
            this.canAddShopInfo = true;
        },
        addShopInfo: function(){
            var email = this.ownerPhoneNumber + '@help-you-help-us.com.tw';
            var name = this.realOwnerName + this.realOwnerName;
            db.auth().signInWithEmailAndPassword(email, name).then(user => {user.user.phoneNumber
                this.createShopInfo(user.user.uid, user.user.phoneNumber);
                console.log('註冊完成，等待生成qrcode');
            }).catch(error => {
                if (error.code === 'auth/user-not-found'){
                    db.auth().createUserWithEmailAndPassword(email, name).then(user => {
                        this.createShopInfo(user.user.uid, user.user.phoneNumber);
                    })
                }
            })
        },
        clearErrorMsg: function(){
            console.log('clear');
            this.realShopNameErrorMsg = '';
            this.shopAddressErrorMsg = '';
            this.shopPhoneNumberErrorMsg = '';
            this.realOwnerNameErrorMsg = '';
            this.ownerPhoneNumberErrorMsg = '';
        },
        clearFormInput: function(){
            this.realShopName = '';
            this.realOwnerName = '';
            this.shopPhoneNumber = '';
            this.ownerPhoneNumber = '';
            this.shopAddress = '';
        },
        gotoPhoneVerification: function(shopUid){
            this.$router.push({
                name: 'PhoneVerification',
                params:{phonenumber: this.ownerPhoneNumber, shopUid: shopUid}
            }) 
        },
        gotoQrcode: function(shopUid){
            this.$router.push({
                name: 'ShopQrCode',
                params:{shopUid: shopUid,}
            }) 
        },
        createShopInfo: function(userUid, phoneNumber){
            let date = dateFormat(db.firestore.Timestamp.seconds, "yyyy-mm-dd HH:mm:ss")
            let shopUid = uid(64);
            db.firestore().collection('users').doc(userUid).set({
                name: this.realOwnerName,
                phone: this.ownerPhoneNumber,
                create_time: date,
                update_time: date,
            }).then(()=>{
                console.log('新增user');
                db.firestore().collection('shops').doc(shopUid).set({
                    name: this.realShopName,
                    phone: this.shopPhoneNumber,
                    address: this.shopAddress,
                    user_uid: userUid,
                    create_time: date,
                    update_time: date,
                }).then(()=>{
                    this.clearFormInput();
                    if (this.haveVerificationPhone){
                        if (phoneNumber === undefined){
                            this.gotoPhoneVerification(shopUid);
                        }else{
                            this.gotoQrcode(shopUid);
                        }
                    }else{
                        // 如果不用驗證
                        this.gotoQrcode(shopUid);
                    }
                })
            })
        },
        aas: function(){
            console.log('ss');
            console.log(this.confirmationResult);
            this.confirmationResult.confirm('123456').then(result => {
                console.log(result);
            }).catch((error) => {
                console.log(error);
            });
            window.recaptchaVerifier = new db.auth.RecaptchaVerifier('send_sms', {
                'size': 'invisible',
                'callback': function(response) {
                    console.log(response)
                }
            })
            db.auth().signInWithEmailAndPassword('0912345678@help-you-help-us.com.tw', '0912345678').then(()=>{
                //console.log(db.auth().currentUser.phoneNumber);
                let appVerifier = window.recaptchaVerifier
                db.auth().currentUser.linkWithPhoneNumber('+886912345678', appVerifier)
                .then(confirmationResult => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    //console.log(confirmationResult)
                    this.confirmationResult = confirmationResult;
                }).catch(()=>{
                    location.reload();
                })
            })
        }
    }
}
</script>

<style src="./ShopForm.css" scoped>
</style>