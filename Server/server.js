require("dotenv").config()

const app = require("./src/app");

console.log()


app.listen(3000, () => {
    console.log("Port is listening on 3000");
});