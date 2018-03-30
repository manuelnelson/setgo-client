import {RemoveProperties} from './api-helper'
import Vue from 'vue';
export const SanitizeGo = (go) => {
  return RemoveProperties(go,['active', 'children']);
}

///go state logic helpers
export const GetParent = (state,item) => {
  if(item.parent)
    return state.gos.find(x=>x.id === item.parent)
}

export const FindGoInState = (state,item) => {
  if(!item.parent)
    return state.gos.find(x=> x.id === item.id);
  else{
    let parent = GetParent(state, item)
    if(parent)
      return parent.children.find(x=>x.id === item.id);
  }
}

//takes a flat list of gos, and adds the respective children to its parents
export const AddChildrenToParentGos = (gos) => {
  let topLevel = []
  let children = []
  gos.map(x => {
    x.active = false;
    x.parent ? children.push(x) : topLevel.push(x)
  });
  if(children.length > 0){
    topLevel.map(parent => {
      let topChildren = children.filter(child=>child.parent == parent.id);
      topChildren ? Vue.set(parent,'children',topChildren) : null
    })
  }
  return topLevel;
}