var Item = require('./itemModel');

function getAllItems(req, res) {
  Item.get(function (err, Items) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
      return ;
    }
    res.json({
      status: "success",
      message: "Items retrieved successfully",
      data: Items
    });
  });
};

function createItem(req, res) {
  var newItem = new Item();
  newItem.name = req.body.name;
  newItem.quantity = req.body.quantity;
  newItem.price = req.body.price;
  newItem.seller_info = req.body.seller_info;

  newItem.save(function (err, data) {
    if (err) {
      res.json(err);
      return ;
    }

    res.json({
      message: 'New Item created!',
      data: data
    });
  });
}

function getAnItem(req, res) {
  Item.findById(req.params.item_id, function (err, data) {
    if (err) {
      res.send(err);
      return;
    }

    if (!data) {
      res.json({
        message: 'Item not found. Please use the correct _id.',
        data: data
      });
      return ;
    }

    res.json({
      message: 'Item found.',
      data: data
    });
  });
}

function updateItem(req, res) {
  Item.findByIdAndUpdate(req.params.item_id, req.body, {new: true}, function (err, existingItem) {
    if (err) {
      res.send(err);
      return;
    }

    res.json({
      message: 'Item Info updated',
      data: existingItem
    });

  });
};

function deleteItem(req, res) {
  Item.deleteOne({
    _id: req.params.item_id
  }, function (err, data) {
    if (err) {
      res.send(err);
      return ;
    }
    res.json({
      status: "success",
      message: 'Item deleted',
      data: data
    });
  });
};

module.exports = {
  getAll: getAllItems,
  create: createItem,
  view: getAnItem,
  update: updateItem,
  delete: deleteItem
}