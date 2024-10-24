const { body } = require('express-validator');
const { validateRules, handleMulterErrors } = require('../middlewares/validators');

module.exports = {
  user: {
    uploadAvatar: [
      body('file').custom((value, { req }) => {
        if (req.files && req.files.file) {
          const file = req.files.file[0];
          const fileSize = file.size;
          const fileType = file.mimetype;
          if (fileSize > 10485760) {
            throw new Error('Avatar must be less than 10MB');
          }
          if (!['image/jpeg', 'image/png'].includes(fileType)) {
            throw new Error('Avatar must be in JPEG or PNG format');
          }
          return true;
        }
        throw new Error('No file was provided');
      }),
      validateRules,
      handleMulterErrors,
    ],
  },
};
