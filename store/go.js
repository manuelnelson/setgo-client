import router from 'vue-router';
import Vue from 'vue'
import {SanitizeGo, GetParent, AddChildrenToParentGos, FindGoInState} from '../services/go-helper';

export const actions = {
    //get's logged in users go items
    async get({commit, rootState}, payload){
      var $that = this;   
      let response = await this.$axios.$get(`/gos/?user_id=${rootState.auth.user.id}&completed=false`)
      commit('setGos', response.gos)
    },

    async post({commit},payload){
        var $that = this;
        let response = await this.$axios.$post('/gos', payload)
        commit('addGo', response.go)
    },

    async update({commit},payload){
      var $that = this; 
      let response = await this.$axios.$put(`/gos/${payload.id}`,payload)
      commit('updateGo', response.go)
      return response.go; 
    },

    async completeGo({state,commit},index) {
      let go =state.gos[index]; 
      commit('completeGo', go);   
      SanitizeGo(go);   
      let response = await this.$axios.$put(`/gos/${go.id}`,go)
      commit('clearCompleted');
    }    
  
}

export const getters = {
  gos: state => state.gos,
};
  
export const mutations = {
  addGo: (state, payload) => {
    //if go has parent, add as go-child
    if(payload.parent) {
      let parent = GetParent(state,payload);
      parent.children ? parent.children.push(payload) : Vue.set(parent,'children',[payload]);
    } 
    else //if top level, just push
      state.gos.push(payload);
  },
  setGos: (state, gos) => {
    let topLevel = AddChildrenToParentGos(gos);
    state.gos = topLevel;
  },
  updateGo: (state, payload) => {
    console.log(payload);
    let goToUpdate = FindGoInState(state, payload) 
    if(!goToUpdate)
      console.warn("Unable to find go to update!") //TODO: add appropriate logic here
    Object.assign(goToUpdate,payload);
  },
  setActive: (state,payload) => {
    Vue.set(payload.item,'active', payload.activeState)
  },
  clearListActive: (state, itemsToClear) => {
    if(itemsToClear)
      itemsToClear.map(x => Vue.set(x,'active', false))
    else
      state.gos.map(x => Vue.set(x,'active', false))
  },
  completeGo: (state,payload) => {
    Vue.set(payload,'completed',true);
  },
  clearCompleted: (state,payload) => {
    state.gos = state.gos.filter(x => !x.completed)
  }
};

export const state = () => ({
    gos:[]
})

