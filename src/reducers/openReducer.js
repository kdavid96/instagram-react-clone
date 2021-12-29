const openReducer = (state = false, action) => {
  switch(action.type){
      case 'OPEN':
          return !state;
      default:
          return state;
  }
}

export default openReducer;