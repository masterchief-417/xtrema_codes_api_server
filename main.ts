import {Application} from "@oak/oak/application"
import {Router} from "@oak/oak/router"
import account_router from "./routes/account_router.ts";
import channels_router from "./routes/channels_router.ts";
import movies_router from "./routes/movies_router.ts";
import series_router from "./routes/series_router.ts";

const router = new Router()

router.get('/',(context)=>{
  context.response.body= "Halo v1.0.0 ◉"
})

const app = new Application()
app.use(router.routes())
app.use(router.allowedMethods())

app.use(account_router.routes())
app.use(account_router.allowedMethods())

app.use(channels_router.routes())
app.use(channels_router.allowedMethods())

app.use(movies_router.routes())
app.use(movies_router.allowedMethods())

app.use(series_router.routes())
app.use(series_router.allowedMethods())


await app.listen({port:3000})