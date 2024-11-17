import { RouterContext } from "@oak/oak/router";

const check_auth_details=(username:string, password:string)=>{
    if(typeof (username)!= "string" || typeof (password)!= "string") {
       return false
    }else{
        return true
    }
}

export default check_auth_details