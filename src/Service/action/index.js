import * as CONFIG from "../../Service/reducer/constant";

export const getblog = ()=>({
  type: CONFIG.Blog_GET,
})

export const getblogSuccess = (data)=>({
    type: CONFIG.Blog_GET_SUCCESS,
    data
})

