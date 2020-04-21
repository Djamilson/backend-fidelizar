const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import slug from '../app/util/slug';

import { basename, extname } from 'path';

const storageTypes = {
  local: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) return cb(err);
        console.log('Dentro: do multer:', file);
        console.log('Dentro do multer::', req.body.data);

        const { originalname } = file;
        const baseName = slug(basename(originalname, extname(originalname)));
        const extensao = originalname.split('.').pop();

        const fileName = `${baseName}.${extensao}`;
        console.log('fileName::', fileName);

        file.key = `${hash.toString('hex')}_${fileName}`;
        console.log('file.key::', file.key);

        cb(null, file.key);
      });
    },
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.BUCKET_NAME,

    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);
        const { originalname } = file;
        const baseName = slug(basename(originalname, extname(originalname)));
        const extensao = originalname.split('.').pop();

        const fileName = `uploads/${hash.toString(
          'hex'
        )}_${baseName}.${extensao}`;

        cb(null, fileName);
      });
    },
  }),
};

const getStorage = () => {
  if (process.env.LOCAL_DOS_ARQUIVOS == 'local') {
    return process.env.STORAGE_TYPE_LOCAL;
  }
  return process.env.STORAGE_TYPE_S3;
};

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads', 'resized'),

  //storage: storageTypes['s3'],
  //storage: storageTypes['local'],
  //storage: storageTypes[process.env.STORAGE_TYPE_LOCAL],

  storage: storageTypes[getStorage()],
};
