var express = require('express');
const { getHomeHandler, postPDFHandler } = require('../controllers');
var router = express.Router();
const Multer = require('multer')

/**
 * Multer is required to process file uploads and make them available via req.files.
 */
const multer = Multer({
  storage: Multer.memoryStorage(),
  // storage: Multer.diskStorage({
  //   destination: 'uploads/',
  //   filename: function (req, file, cb) {
  //     // this overwrites the default multer renaming callback
  //     // and simply saves the file as it is
  //     cb(null, file.originalname)
  //   }
  // }),
  limits: { fieldSize: 5 * 1024 * 1024 }
})

/* GET home page. */
router.get('/', getHomeHandler);

router.post('/', multer.single('file'), postPDFHandler);



module.exports = router;
