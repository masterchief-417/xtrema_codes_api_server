import {Router} from "@oak/oak/router"
import check_auth_details from "../components/check_auth_details.ts";
import server_url from "../database/server.ts";

const account_router = new Router({
    prefix: '/account'
})

account_router
    .post('/information',async(ctx)=>{
        const {username, password} = await ctx.request.body.json()

        if(!check_auth_details(username,password)){
            ctx.response.status = 400
            ctx.response.body = {data:null,error:"Invalid username or password"}
            return
        }

        const get_account_info = await fetch(` ${server_url}/player_api.php?username=${username}&password=${password}`)
        if(!get_account_info.ok){
            ctx.response.body = {data:null, error:"Failed to process request"}
            ctx.response.status = 401
        }else{
            const result = await get_account_info.json()
            ctx.response.status = 200
            ctx.response.body = {data:result, error:null}
        }
    })


export default account_router