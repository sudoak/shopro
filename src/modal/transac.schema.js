let mongoose = require("mongoose")
SchemaTypes = mongoose.Schema.Types
require("mongoose-double")(mongoose)

let transac_schema = mongoose.Schema({
    oid : String,
    cart : [{
        sku : String,
        qty : Number,
        pname : String
    }],
    createdAt : String
})
module.exports = mongoose.model("transactions", transac_schema)
