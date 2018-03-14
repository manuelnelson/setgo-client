<template>
  <v-app>
    <v-content >
      <alerts></alerts>
      <nuxt />
    </v-content>
    <v-footer :fixed="fixed" class="footer" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import Alerts from '~/components/global/Alerts.vue'
import Navigation from '~/components/Navigation.vue'
import {mapGetters, mapMutations} from 'vuex'
  
  export default {
    created(){
      this.containerType = this.$route.name === 'index' ? 'fluid' : 'grid-list-lg'
    },
    head(){
      return {
        title: 'Just Go | Home',
        meta: [
          { hid: 'description', name: 'description', content: 'Efficient productivity app' }
        ]
      }
    },
    computed:{
      ...mapGetters({
        miniVariant: 'menuItems/miniVariant'
      }),
    },
    data(context) {
      return {
        clipped: true,
        drawer: false,
        fixed: false,
        right: true,
        rightDrawer: false,
        title: 'Just Go',
        containerType: 'grid-list-lg'
      }
    },
    methods: {
      toggleMinivariant(){
        this.setMinivariant();
        if(this.miniVariant){
          this.closeGroups();
        }
      },
      ...mapMutations({
        setMinivariant: 'menuItems/setMinivariant',
        closeGroups: 'menuItems/closeGroups',
      })
    },

    components:{
      Alerts,
      Navigation
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~assets/variables'
    $height = 80vh

  .footer
    background-color: rgba(0,0,0,0.4)
    color: $primary

</style>
