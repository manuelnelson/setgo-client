<template>
  <v-app>
    <v-navigation-drawer
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <navigation></navigation>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped" class="primary white--text">
      <v-toolbar-side-icon class="white--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn class="white--text" icon @click.stop="toggleMinivariant()">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <alerts></alerts>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import Alerts from '~/components/global/Alerts.vue'
import Navigation from '~/components/Navigation.vue'
import {mapGetters, mapMutations} from 'vuex'
  
  export default {
    head(){
      return {
        title: 'Just Go | Home',
        meta: [
          { hid: 'description', name: 'description', content: 'Your personal productivity assistant' }
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
        title: 'Just Go'
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
