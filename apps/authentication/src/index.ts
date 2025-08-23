import dotenv from 'dotenv'
import database from "./db/database.js";
import { app } from "./app.js"



dotenv.config({
    path: './.env'
})

database()
    .then(() => {

        // In Express.js, the .on() function is used to listen for events on an object, 
        // like a server or a stream.
        app.on("error", (error :any) => {
            console.log("ERROR", error);
            throw error;
        })

        app.listen(process.env.PORT || 8000, () => {
            console.log(`⚙️  Server running on port ${process.env.PORT} 🔥`)
        });
    })
    .catch((error) => {
        console.log("MONGODB CONNECTION FAILED");
        console.log("ERROR", error)
        throw error
    })