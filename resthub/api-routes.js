let router = require('express').Router();
var itemController = require('./itemController');

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// routes
router.route('/items')
    .get(itemController.getAll)
    .post(itemController.create);

router.route('/items/:item_id')
    .get(itemController.view)
    .patch(itemController.update)
    .put(itemController.update)
    .delete(itemController.delete);

// Export API routes
module.exports = router;