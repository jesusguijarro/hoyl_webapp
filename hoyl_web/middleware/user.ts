import { Middleware, Context } from "@nuxt/types";
const user: Middleware = async (contex: Context)=>{
    const cookie = contex.app.$cookies.get('token');
    if (!cookie){
        return contex.redirect('/');
    }    else if(cookie && contex.route.path === '/'){
      return contex.redirect('/PagPrin/Principal');
    } 
}
export default user;