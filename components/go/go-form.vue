<template>
  <v-card>
    <v-form v-model="valid" ref="form" @submit.prevent="submit()" lazy-validation>
      <v-card-title class="display-1 primary--text">{{title}}</v-card-title>
      <v-card-text>
        <v-text-field
              label="Name"
              v-model="name"
              :rules="[rules.required]"
              required
        >
        </v-text-field>
        <v-card-text class="advanced pl-0">
          <label class="text-xs-center">optional</label>
        </v-card-text>
        <v-slider label="Priority" thumb-label step="1" ticks :min="1" :max="10" v-model="priority"></v-slider>
        <v-slider label="Points" thumb-label step="1" ticks :min="1" :max="10" v-model="points"></v-slider>
        <v-select
          :items="categories"
          v-model="category"
          label="Category"
          autocomplete
        ></v-select>
        <v-menu
          ref="menu"
          lazy
          :close-on-content-click="false"
          v-model="menu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-right="40"
          min-width="290px"
          :return-value.sync="startDate"
        >
          <v-text-field
            slot="activator"
            label="Notify Date"
            v-model="startDate"
            prepend-icon="event" 
            class="start-date"
            readonly
          ></v-text-field>
          <v-date-picker v-model="startDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn flat color="primary" @click="$refs.menu.save(startDate)">OK</v-btn>
          </v-date-picker>
        </v-menu>          
        </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="showAddChildrenButton" type="submit" class="submit-button" flat @click.prevent="saveAndAddChildren()">Associate Gos</v-btn>
        <v-btn type="submit" class="submit-button" flat>Go</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>


<script>
import {mapMutations,mapGetters, mapActions} from 'vuex';

const defaultPriority = 5;
const defaultPoints = 1;
const defaultCategory = 1;
export default {
  props:['title', 'existingGo','parentGo'],
  
  data() {
    return {
      name: '',
      priority: defaultPriority,
      startDate: null,
      points: defaultPoints,
      menu: false,
      category: defaultCategory,
      categories: [
        {value:2, text:"Work"},
        {value:3, text:"Home"},
        {value:4, text:"Finances"},
        {value:5, text:"Health"},
        {value:6, text:"Fun"},
        {value:7, text:"Family"},
        {value:8, text:"Errand"},
        {value:1, text:"Miscellaneous"}
      ],
      rules: {
        required: (value) => !!value || 'Required.',
      },
      valid: false      
    }
  },
  computed: {
    showAddChildrenButton(){
      return this.existingGo && !this.existingGo.parent
    }
  },
  watch:{
    //if existingGo item changes, make sure to update form
    '$props': {
      handler: function (val, oldVal) {         
        this.existingGo = val.existingGo
        this.title = val.title;
        this.populateForm();
      },
      deep: true
    }
  },

  components: {
  },
  methods: {
    ...mapActions({
      postGo: 'go/post',
      update: 'go/update'
    }),
    async submit(){
      if (this.$refs.form.validate()) {   
        let formData = {
          name:this.name, 
          priority: this.priority || defaultPriority, 
          points:this.points || defaultPoints, 
          category: this.category || defaultCategory,
          startDateTime: this.startDate, 
          user_id:this.$store.$auth.state.user.id,
        };    
        formData = this.addParentIfExists(formData);
        if(this.existingGo){
          //this is edit form, use PUT
          formData = Object.assign({id:this.existingGo.id},formData);
          const go = await this.update(formData)
        } else {
          const go = await this.postGo(formData)
        }
        this.formReset();
        return formData;
      }
    },
    formReset(){
      this.$refs.form.reset()
      //set default values
      this.priority = defaultPriority;
      this.points = defaultPoints;
      this.category = defaultCategory;
    },
    addParentIfExists(formData){
      if(this.parentGo)
        return Object.assign({parent:this.parentGo.id},formData);
      return formData;
    },
    async saveAndAddChildren(){
      console.log('adddddd')
      let go = await this.submit();
      if(go){
        this.$emit('showAdd', go)
      }
    },

    populateForm(){
      if(this.existingGo){
        this.name = this.existingGo.name;
        this.priority = this.existingGo.priority || defaultPriority;
        this.startDate = this.existingGo.startDateTime;
        this.points = this.existingGo.points || defaultPoints;
        this.category = this.existingGo.category || defaultCategory;
      } else {
        this.formReset();
      }
    }
  }
}
</script>

<style lang="stylus" >
  @import '~assets/variables'      
  .start-date
    .icon
      color $secondary-dark !important

  .submit-button
    background-color $secondary-dark !important
    color white !important  

  .advanced  
    font-size 1rem
    color $secondary-dark
</style>
