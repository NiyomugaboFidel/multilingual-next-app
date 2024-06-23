import app from "./app.js";
import 'dotenv/config'
// import { connection } from "./app";

const PORT  = process.env.PORT || 6000
// listenng on port (browser)
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);

   
});