//removes properties on an object
export const RemoveProperties = (object, propertiesToRemove) => {
  if(Array.isArray(propertiesToRemove)){
    propertiesToRemove.forEach(x=> delete object[x])
  }
  else if(typeof propertiesToRemove === 'string'){
    delete object[propertiesToRemove]
  }
  return object
}


///by object
