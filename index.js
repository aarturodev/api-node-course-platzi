import express from "express"
import cors from "cors"
import routerApi from "./routes/index.js";

import { logErrors, errorHandler, boomErrorHandler } from "./middlewares/error.handler.js";

const app = express();


const port = process.env.PORT || 3000;


app.use(express.json());

const whiteList = ['http://localhost:5500', 'http://127.0.0.1:5500']
const options = {
     origin: (origin, callback)=>{
          if(whiteList.includes(origin) || !origin){
               callback(null, true);
          }else {
               callback(new Error('no permitido'))
          }
     }
}
app.use(cors(options))

routerApi(app);

app.use(boomErrorHandler)
app.use(logErrors)
app.use(errorHandler)



app.listen(port, ()=>{
     console.log("server running on port", port);
});