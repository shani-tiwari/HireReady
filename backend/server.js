require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/db");
const main = require("./src/services/ai.service");

const PORT = 3000 || process.env.PORT;


// app.use(express.json());

// connect to database
connectToDB();
main();

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});