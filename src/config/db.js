var db = ()=>{

	var mongoose = require("mongoose")
	mongoose.Promise = require("bluebird")
	require("mongoose-double")(mongoose)
	let SchemaTypes = mongoose.Schema.Types,
			figlet = require("figlet"),
			moment = require("moment-timezone")

	figlet("SHOPRO API", function(err, data) {
		if (err) {
			console.log("SHOPPRO API...")
			console.dir(err)
			return
		}
		console.log(data)
	})
    const options = {
        useNewUrlParser : true,
        autoIndex: false, // Don't build indexes
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 5000, // Reconnect every 5s
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0
      };
	mongoose.connect(`mongodb://localhost/${process.env.DB_URL}`,options)

	var db = mongoose.connection
	db.on("error", function(err){
		console.log(`Error${err}`)
	})
	db.once("open", function() {
		console.log("MONGODB Connected " + moment().tz("Asia/Kolkata").format().toString())
	})
}

module.exports = db
