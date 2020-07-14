import * as CONFIG from './constant';

export default function todo(state = [], action) {
    // console.log("reducer----",action);

    switch (action.type) {
      case CONFIG.Blog_GET_SUCCESS:
        
        return action.data;

      default:
        return state
    }
}

