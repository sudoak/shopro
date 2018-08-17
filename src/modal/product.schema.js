let mongoose = require("mongoose")
SchemaTypes = mongoose.Schema.Types
require("mongoose-double")(mongoose)

let product_schema = mongoose.Schema({
   
    pname : {type: String, required : true, unique : true},
    company : String,
    sku : {type: String, required : true, unique : true},
    details : {
        mfgdate : String,
        expdate : String,
        isic : Number,
        attributes : String
    },
    price : { type : SchemaTypes.Double}
})
module.exports = mongoose.model("product", product_schema)
