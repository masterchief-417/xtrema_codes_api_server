import {Router} from "@oak/oak/router"

const account_router = new Router({
    prefix: '/account'
})

account_router
    .post('/information',async(ctx)=>{
        const {username, password} = await ctx.request.body.json()
        if(typeof (username)!= "string" || typeof (password)!= "string") {
                ctx.response.status = 400
                ctx.response.body = {data:null,error:"Invalid username or password"}
                return
        }
        const get_account_info = await fetch(` ${Deno.env.get("SERVER_URL")}/player_api.php?username=${username}&password=${password}`)
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