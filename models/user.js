const mongoose = require("mongoose")

const schema = mongoose.Schema(
    {
        "name": { type: String, required: true },
        "course": { type: String, required: true },
        "batch": { type: String, required: true },
        "year": { type: String, required: true },
        "email": { type: String, required: true },
        "password": { type: String, required: true },
        "phone": { type: String, required: true }
       
    }
)


let usermodel = mongoose.model("users", schema)
module.exports = { usermodel }