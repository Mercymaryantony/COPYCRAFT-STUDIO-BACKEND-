const mongoose = require("mongoose")
 
const schema = mongoose.Schema(
    {
        "name":{ type: String, required: true },
        "class":{ type: String, required: true },
        "type":{ type: String, required: true },
        "binding":{ type: String, required: true },
        "frontcolor":{ type: String, required: true },
        "number":{ type: String, required: true },
        "category":{ type: String, required: true },
        "date":{ type: String, required: true },
        "time":{ type: String, required: true },
        "image":{ type: String, required: true }
       }
)

let bindmodel = mongoose.model("binds",schema)
module.exports = {bindmodel}