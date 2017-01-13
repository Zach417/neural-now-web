var express = require('express');
var router = express.Router();

router.use(require('./routes/api'));
router.use(require('./routes/index'));

module.exports = router;
