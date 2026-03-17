const mongoose = require("mongoose");

async function connectToDB(){
    // try {
        await mongoose.connect(process.env.MONGODB_URL)
        .then(() => { console.log("connected to db")})
        .catch((e) => { console.log(`${e} - not connected to db`)});
    // } catch (error) {
    //     console.log(`${error} - error while connection to db`);
    // }
}

module.exports = connectToDB