<template>  
  <div class="go-list">
    <div class="go-list-container" v-if="gos.length > 0" :class="{'show-children':showChildList}">
      <v-list>
        <template v-for="(item,ndx) in gos" >
          <v-divider :key="item.id"></v-divider>
          <v-list-tile avatar two-line :key="item.title" :class="{'active':item.active}" @click="activate(gos,item,ndx)">
            <v-list-tile-avatar>
              <v-icon class="secondary--text text--darken-1">{{getCategory(item)}}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.name}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action-text>
              <v-btn icon ripple title="complete!" @click="completeGo(ndx)">
                <v-icon class="primary--text text--darken-1">done</v-icon>
              </v-btn>
            </v-list-tile-action-text>
          </v-list-tile>            
        </template>
      </v-list>
      <v-list v-if="showChildList">
        <template  v-for="(item,ndx) in children" >
          <v-divider :key="item.id"></v-divider>
          <v-list-tile avatar two-line :key="item.title" :class="{'active':item.active}" @click="activate(children,item,ndx)">
            <v-list-tile-avatar>
              <v-icon class="secondary--text text--darken-1">{{getCategory(item)}}</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.name}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action-text>
              <v-btn icon ripple title="complete!" @click="completeGo(ndx)">
                <v-icon class="primary--text text--darken-1">done</v-icon>
              </v-btn>
            </v-list-tile-action-text>
          </v-list-tile>            
        </template>
      </v-list>
    </div>
    <div v-else>
      <h3 class="display-1">{{message}}</h3>
    </div>
  </div>

</template>
<script>
import {GetIcon} from '~/services/category-helper'
import {mapMutations,mapGetters,mapActions} from 'vuex';
import {GetParent} from '~/services/go-helper'
export default {
  props: ['gos','message'],
  data(){
    return {
      activeItem: null,
      children: []
    }
  },
  computed: {
    showChildList(){
      return (this.activeItem && this.activeItem.children && this.activeItem.children.length) || (this.activeItem && this.activeItem.parent);
    }
  },
  methods: {
    ...mapMutations({
      setActive: 'go/setActive',
      clearListActive: 'go/clearListActive'
    }),    
    ...mapActions({
      completeGo: 'go/completeGo'
    }),
    getCategory(item){
      return GetIcon(item)
    },
    //
    activate(list,item,ndx){
      //clear previous
      const isActive = item.active;
      this.clearListActive(list);
      //set active
      this.setActive({item:item,activeState:!isActive});
      
      if(item.active) {
        this.children = item.parent ? this.children : item.children
        this.activeItem = item;
        //console.log(this.gos)
        this.parentItem = GetParent({gos:this.gos},item);
        this.$emit('showEdit',item, this.parentItem)
      } else {
        this.activeItem = null;
        this.parentItem = null;
        this.children = []
        this.clearListActive();
        this.$emit('showCreate')
      }
    },
  }
}
</script>
<style lang="stylus">
.go-list
  overflow hidden

  .go-list-container
    width 200%
    display flex
    position relative
    left 0
    transition left 0.5s ease-in-out
    &.show-children
      left -100%
  .list
    width 50%
    .active
      background-color rgba(213,101,0,0.12)
</style>

