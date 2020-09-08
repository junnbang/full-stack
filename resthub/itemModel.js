var mongoose = require('mongoose');
let { log } = require('./logger');
const autoIncrementModelID = require('./counterModel');

// Created database schema
/*
{
    "name": "Canned Food",
    "quantity": 10,
    "price": 10.50,
    "seller_info": {
        "name": "Chloe",
        "phone": "92235003"
    }
}
*/
var itemSchema = mongoose.Schema({
	_id: Number,
	name: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	price: {
		type: mongoose.Types.Decimal128
	},
	seller_info: {
		name: String,
		phone: String
	},
	create_date: {
		type: Date,
		default: Date.now
	}
});

// auto incremental id
itemSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('item_id', this, next);
});

var Item = mongoose.model('items', itemSchema);

// insert sample data
/*
var data = {
	"name": "Canned Food",
	"quantity": 10,
	"price": 10.50,
	"seller_info": {
		"name": "Chloe",
		"phone": "92235003"
	}
}
var sampleItem = new Item(data);
var itemToUpdate = { _id: 1 };
var itemToInsert = { $setOnInsert: sampleItem };
var options = { upsert: true };
Item.updateOne(itemToUpdate, itemToInsert, options, (err, data) => {
	if (err) console.error(err);
	log("Database", "Sample data added.");
})
*/

// Export module (model) to make it accessible to other commponents
module.exports = Item;

module.exports.get = function (callback, limit) {
	Item.find(callback).limit(limit);
}