import {RemoveProperties} from './api-helper'

export const SanitizeGo = (go) => {
  return RemoveProperties(go,['active', 'children']);
}

///go state logic helpers
export const GetParent = (state,item) => {
  if(item.parent)
    return state.gos.find(x=>x.id === item.parent)
}

export const FindGoInState = (state,item, index) => {
  if(!item.parent)
    return state.gos[index];
  else{
    let parent = GetParent(state, payload.item)
    if(parent)
      return parent.children[payload.index];
  }
}