const mongoose = require("mongoose")

const schema = mongoose.Schema(
    {
        "name": { type: String, required: true },
        "email": { type: String, required: true },
        "password": { type: String, required: true },
        "phone": { type: String, required: true }
       
    }
)


let adminmodel = mongoose.model("admins", schema)
module.exports = { adminmodel }