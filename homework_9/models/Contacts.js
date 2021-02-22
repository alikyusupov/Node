const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    name:{
        type:String,
        required:true
    },
	age:{
		type: Number,
		required: true
	},
	phone:{
		type: String,
		required:true
	},
	status:{
		type: String,
		required: false
	},
	address: {
		type: String,
		required: false,
	},
	avaPath: {
		type: String,
		required: true
	},
	description:{
		type: String,
		required: false
	}
})

module.exports = mongoose.model("Contact",contactSchema)

