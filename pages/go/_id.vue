<template>
  <v-layout row wrap>
    <v-flex xs12 lg5>
      <h2 class="display-2 primary--text mb-4 text-xs-center">Today's Go List</h2>
      <div v-if="gos && gos.length > 0">
        <go-list :gos="gos" @showEdit="showEditForm" @showCreate="showCreateForm" :active-item="activeItem" :message="message"></go-list>
      </div>
    </v-flex>
    <v-flex xs12 lg4 offset-lg2>
      <go-form v-if="showCreate" title="Create"></go-form>
      <go-form v-if="showEdit && activeItem" @showAdd="showAddForm" :existing-go="activeItem" title="Edit"></go-form>
      <go-form v-if="showAdd && activeItem" :parent-go="activeItem" title="Add"></go-form>
      <!-- <edit-go v-if="showAdd && activeItem" @showAdd="showAddForm" :active-item="activeItem"></edit-go>
      <create-child-go v-if="showAdd && activeItem" :item="activeItem" title="Add"></create-child-go> -->
    </v-flex>
  </v-layout>
  
</template>


<script>
import {mapMutations,mapGetters} from 'vuex';
import goList from '~/components/go/go-list.vue';
import goForm from '~/components/go/go-form.vue';
// import createChildGo from '~/components/go/create-child-go.vue';
// import editGo from '~/components/go/edit-go.vue';
export default {
  async fetch({store}){
    await store.dispatch('go/get') 
  },
  data() {
    return {
      message: "Nothing to do today! Add some go's",
      showEdit: false,
      showCreate: true,
      showAdd: false,
      activeItem: null
    }
  },
  computed: {
    ...mapGetters({
      gos: 'go/gos'
    }),
  },
  components: {
    goForm,
    goList
  },
  methods: {
    showEditForm(item){
      console.log(item)
      this.activeItem = item;
      this.showEdit = true
      this.showCreate = false
      this.showAdd = false
    },
    showAddForm(item){
      console.log('add',item)
      this.activeItem = item;
      this.showEdit = false
      this.showCreate = false
      this.showAdd = true
    },
    showCreateForm(){
      console.log('createe')
      this.activeItem = null;
      this.showEdit = false
      this.showCreate = true
      this.showAdd = false
    }
  }
}
</script>
