<template>
  <div>
    <section>
      <v-layout row wrap class="hero">
        <v-flex xs12 lg4 offset-lg1>
          <div class="branding">
            <span class="branding__slogan display-1">Don't Think.</span>
            <h1 class="display-4">Go</h1>
          </div>
        </v-flex>
        <v-flex xs12 lg4 offset-xs0 offset-lg2>
          <v-card >
            <v-form v-if="!$auth.state.loggedIn" v-model="valid" ref="form" @submit.prevent="logIn()" lazy-validation>
              <v-card-title class="display-1 primary--text">Login
              </v-card-title>
              <v-card-text>
                  <v-text-field
                  label="E-mail"
                  v-model="email"
                  :rules="[rules.email,rules.required]"
                  required
                  ></v-text-field>
                  <v-text-field
                      name="input-10-1"
                      label="Enter your password"
                      hint="At least 8 characters"
                      v-model="password"
                      :rules="[rules.minLength]"
                      min="8" 
                      :append-icon="e1 ? 'visibility' : 'visibility_off'"
                      :append-icon-cb="() => (e1 = !e1)"
                      :type="e1 ? 'password' : 'text'"
                      counter
                  ></v-text-field>  
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>          
              <nuxt-link class="d-block mt-3 mx-3" to="/register">Not Registered? Register Here</nuxt-link>
              <v-btn type="submit" color="primary" flat>Submit</v-btn>
            </v-card-actions>
          </v-form>
        </v-card> 
        </v-flex>
      </v-layout>
    </section>
    <v-container grid-list-lg>
      <v-layout>
        <v-flex xs12 lg4>
          <h2>not</h2>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  auth: false,
  layout: 'home',
  components: {
    Logo,
    VuetifyLogo
  },
  data () {
    return {
      e1: true,
      password: '',
      email: '',
      name: '',
      valid: false,
      rules: {
        required: (value) => !!value || 'Required.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        minLength: (value) => {
          return value.length > 7 || 'At least 8 Characters'
        }
      }
    }
  },
  methods:{
    logIn(){    
      let that = this;
      if (this.$refs.form.validate()) {          
        this.$auth.login({
          data: {
            email: this.email,
            password: this.password
          }
        }).then((response) => {
          this.$auth.state.loggedIn;
          this.$router.push({name:'index'});
        }).catch((err) => {
          this.$store.commit('alert/addAlert', {message: "You are not authenticated to access that resource"}, {root:true})
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/variables'
  
  .hero
    background-size cover
    background-image url('~assets/images/background-3.jpg')
    width 100%
    background-position center
    position relative
    &:before
      content ""
      display block
      position absolute 
      height 100%
      width 100%
      background-color rgba(0,0,0,0.25)
      z-index 1

  h1
    color $primary
    font-style italic
    font-weight  bold
    &:before
      content 'Just'
      color $white
      margin-right 16px
      font-style normal
      font-weight  300

    

  .layout, .flex
    height: 500px;
  
  .flex
    position relative
    z-index 2

  .branding
    &__slogan
      color $secondary-light
    transform: translateY(-50%);
    position relative
    top 50%


  .card
    transform: translateY(-50%);
    position relative
    top 50%
    background-color rgba(255,255,255,0.85)
  
</style>
