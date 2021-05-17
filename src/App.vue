
<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import Header from '@/components/Header/Header';
import Footer from './components/Footer/Footer';
export default {
  name: 'app',
  components:{
    Header,
    Footer
  },
  prop: {
    confirmationResult: ''
  },
  data(){
    return{
      
    }
  },
}
</script>