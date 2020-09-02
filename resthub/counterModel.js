var mongoose = require('mongoose');
// setup auto incremental
var counterSchema = mongoose.Schema({
	_id: String,
	seq: Number
}, {_id: false});
var Counter = mongoose.model('counter', counterSchema);

// insert data
var dataCounter = new Counter({seq: 1});
var counterToUpdate = { _id: 'item_id' };
var counterToInsert = { $setOnInsert: dataCounter };
var options = { upsert: true };
Counter.updateOne(counterToUpdate, counterToInsert, options, function(err) {
	if (err) console.error(err);
});

const autoIncrementModelID = function (modelName, doc, next) {
  Counter.findByIdAndUpdate(        // ** Method call begins **
    modelName,                           // The ID to find for in counters model
    { $inc: { seq: 1 } },                // The update
    { new: true, upsert: true },         // The options
    function(error, counter) {           // The callback
      if(error) return next(error);
      doc._id = counter.seq;
      next();
    }
  );                                     // ** Method call ends **
}

module.exports = autoIncrementModelID;