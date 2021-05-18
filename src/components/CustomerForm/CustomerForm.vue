<template src="./CustomerForm.html">

</template>

<script>
import db from "@/db";
import Swal from 'sweetalert2';
import { uid } from 'uid';
let dateFormat = require("dateformat")

export default {
    data(){
        return{
            shopName: '',
            personAmount: 1,
            haveSysError: false,
            realName: '',
            phoneNumber: '',
            realNameErrorMsg: '',
            phoneNumberErrorMsg: '',
            haveVerificationPhone: false
        }
    },
    mounted() {
        this.showShopName()
    },
    methods:{
        showShopName: function(){
            db.firestore().collection('shops').doc(this.$route.params.shopUid).get().then(shop=>{
                this.shopName = shop.data().name;
            }).catch(() =>{
                this.haveSysError = true;
                Swal.fire(
                    '系統訊息',
                    '無法找尋商家資訊，請麻煩重新掃描',
                    'error'
                )
            })
        },
        checkForm: function(){
            if (this.haveSysError){
                Swal.fire(
                    '系統訊息',
                    '此表單有些問題，麻煩聯絡商家',
                    'error'
                )
            }else{
                var canAddUserInfo = true;
                if (this.realName === ''){
                    this.realNameErrorMsg = '真實姓名不得為空';
                    canAddUserInfo = false;
                }
                if (this.phoneNumber === ''){
                    this.phoneNumberErrorMsg = '電話不得為空';
                    canAddUserInfo = false;
                }
                if (canAddUserInfo){
                    this.clearErrorMsg();
                    this.addUserInfo();
                }
            }
        },
        addUserInfo: function(){
            var email = this.phoneNumber + this.realName + '@help-you-help-us.com.tw';
            var name = this.phoneNumber + this.realName;
            console.log(name);
            db.auth().signInWithEmailAndPassword(email, name).then(user => {
                this.createUserInfo(user.user.uid, user.user.phoneNumber);
                //console.log('註冊完成，等待生成qrcode');
            }).catch(error => {
                if (error.code === 'auth/user-not-found'){
                    db.auth().createUserWithEmailAndPassword(email, name).then(user => {
                        this.createUserInfo(user.user.uid, user.user.phoneNumber);
                    }).catch(error => {
                        if(error.code === 'auth/weak-password'){
                            Swal.fire(
                                '系統資訊',
                                '哦哦！你的資料好像填得不太對哦。',
                                'error'
                            )
                        }
                    })
                }
            })
        },
        createUserInfo: function(userUid, phoneNumber){
            let date = dateFormat(db.firestore.Timestamp.seconds, "yyyy-mm-dd HH:mm:ss")
            let recordUid = uid(64);
            db.firestore().collection('users').doc(userUid).set({
                name: this.realName,
                phone: this.phoneNumber,
                create_time: date,
                update_time: date,
            }).then(()=>{
                db.firestore().collection('users').doc(userUid).collection('record').doc(recordUid).set({
                    shopName: this.shopName,
                    shopUid: this.$route.params.shopUid,
                    personAmount: this.personAmount,
                    create_time: date,
                    update_time: date,
                }).then(()=>{
                    db.firestore().collection('shops').doc(this.$route.params.shopUid).collection('record').doc(recordUid).set({
                        user_uid: userUid,
                        personAmount: this.personAmount,
                        create_time: date,
                        update_time: date,
                    })
                    this.clearFormInput();
                    this.$router.push({
                        name: 'VerificationSuccess',
                        params:{}  
                    })
                    console.log(phoneNumber);
                })
            })
        },
        showPosition: function(position){
            if (navigator.geolocation){
                navigator.geolocation.getCurrentPosition(this.showPosition);
            }else{
                console.log('不支援定位');
            }
            Swal.fire(
                '系統訊息',
                position.coords.latitude + ', ' + position.coords.longitude,
                'info'
            )
            console.log(position.coords.latitude, position.coords.longitude);
        },
        clearErrorMsg: function(){
            this.realNameErrorMsg = '';
            this.phoneNumberErrorMsg = '';
        },
        clearFormInput: function(){
            this.realName = '';
            this.phoneNumber = '';
        }
    }
}
</script>

<style src="./CustomerForm.css" scoped>
</style>