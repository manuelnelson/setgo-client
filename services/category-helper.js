

export const GetIcon = (goItem) => {
  switch(goItem.category){
    case 1:
      return 'folder';
    case 2:
      return 'business';      
    case 3:
      return 'home';      
    case 4:
      return 'attach_money';      
    case 5:
      return 'heart';      
    case 6:
      return 'tv';      
    case 7:
      return 'group';      
    case 8:
      return 'shopping_cart';      
  }
}