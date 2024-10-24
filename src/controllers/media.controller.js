const logger = require('../utils/logger');
const s3 = require('../utils/s3');

module.exports = {
  user: {
    uploadAvatar: async (req, res) => {
      try {
        const { file } = req.files;
        let uploadedFiles = [];
        if (file && file.length) {
          uploadedFiles = await s3.upload(file, 'shared/user/avatars', { dimensions: [400, 400] });
        } else {
          res.status(400).send({
            message: 'No files to upload',
          });
          return;
        }
        res.send({
          data: uploadedFiles[0],
        });
      } catch (err) {
        logger.error(err);
        res.status(500).send({
          message: err.message || 'Some error occurred',
        });
      }
    },
  },
};
