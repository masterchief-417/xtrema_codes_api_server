import {Router} from "@oak/oak/router"
import check_auth_details from "../components/check_auth_details.ts";
import {server_url, tmdb_key, tmdb_api} from "../database/server.ts";
import api_actions from "../components/api_actions.ts";

const movies_router = new Router({
    prefix: "/movies",
})


movies_router.post("/get_categories", async(ctx)=>{
    // get auth data
    const {username,password} = await ctx.request.body.json()

    // check if auth data is there
    if(!check_auth_details(username,password)){
        ctx.response.status = 400
        ctx.response.body = {data:null,error:"Invalid username or password"}
        return
    }

    //request data
    const request_url = `${server_url}/player_api.php?username=${username}&password=${password}&action=${api_actions.movie_categories}`

    const request_data = await fetch(request_url)
    console.log(request_data)
    if(!request_data.ok){
        ctx.response.body = {data:null, error:"Failed to process request"}
        ctx.response.status = 401
        return
    }else{
        const result = await request_data.json()
        ctx.response.status = 200
        ctx.response.body = {data:result, error:null}
        return
    }
})

movies_router.post("/get_sub_categories",async(ctx)=>{
    // get auth data
    const {username,password, cat_id} = await ctx.request.body.json()

    // check if auth data is there
    if(!check_auth_details(username,password)){
        ctx.response.status = 400
        ctx.response.body = {data:null,error:"Invalid username or password"}
        return
    }

    //request data
    const request_url = `${server_url}/player_api.php?username=${username}&password=${password}&action=${api_actions.movies}&category_id=${cat_id}`

    const request_data = await fetch(request_url)

    if(!request_data.ok){
        ctx.response.body = {data:null, error:"Failed to process request"}
        ctx.response.status = 401
        return
    }else{
        const result = await request_data.json()
        ctx.response.status = 200
        ctx.response.body = {data:result, error:null}
        return
    }
})

movies_router.post("/get_all",async(ctx)=>{
    // get auth data
    const {username,password} = await ctx.request.body.json()

    // check if auth data is there
    if(!check_auth_details(username,password)){
        ctx.response.status = 400
        ctx.response.body = {data:null,error:"Invalid username or password"}
        return
    }

    //request data
    const request_url = `${server_url}/player_api.php?username=${username}&password=${password}&action=${api_actions.movies}`

    const request_data = await fetch(request_url)

    if(!request_data.ok){
        ctx.response.body = {data:null, error:"Failed to process request"}
        ctx.response.status = 401
        return
    }else{
        const result = await request_data.json()
        ctx.response.status = 200
        ctx.response.body = {data:result, error:null}
        return
    }
})

movies_router.post("/get_info",async(ctx)=>{
    // get auth data
    const {username,password, movie_id} = await ctx.request.body.json()

    // check if auth data is there
    if(!check_auth_details(username,password)){
        ctx.response.status = 400
        ctx.response.body = {data:null,error:"Invalid username or password"}
        return
    }

    //request data
    const request_url = `${tmdb_api}movie/${movie_id}?language=en-us`
    const request_headers = {
        method:"GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${tmdb_key}`
        }
    }
    const request_data = await fetch(request_url,request_headers)

    if(!request_data.ok){
        ctx.response.body = {data:null, error:"Failed to process request"}
        ctx.response.status = 401
        return
    }else{
        const result = await request_data.json()
        ctx.response.status = 200
        ctx.response.body = {data:result, error:null}
        return
    }
})



export default movies_router