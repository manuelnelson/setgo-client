import router from 'vue-router';
import Vue from 'vue'
import {SanitizeGo, GetParent} from '../services/go-helper';

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
      let parent = state.gos.find(x=>x.id == payload.parent);
      if(parent.children)
        parent.children.push(payload)
      else
        Vue.set(parent,'children',[payload]);
    } 
    else //if top level, just push
      state.gos.push(payload);
  },
  setGos: (state, payload) => {
    let topLevel = []
    let children = []
    payload.map(x => {
      x.active = false;
      x.parent ? children.push(x) : topLevel.push(x)
    });
    console.log('children',children)
    console.log('top',topLevel)
    if(children.length > 0){
      topLevel.map(z => {
        let topChildren = children.filter(child=>child.parent ==z.id);
        topChildren ? Vue.set(z,'children',topChildren) : null
      })
    }
    state.gos = topLevel;
  },
  updateGo: (state, payload) => {
    let goToUpdate = state.gos.find(x=>x.id === payload.id);
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

