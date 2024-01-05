const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: 'public/product-images',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});
  module.exports=storage