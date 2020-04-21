import File from '../models/File';
import sharp from 'sharp';
import pathlocal from 'path';
import fs from 'fs';
import { basename, extname } from 'path';

class CreateFileService {
  async run({ name, path, key, destination, location, filePath }) {
    console.log('name: ', name);
    console.log('path: ', path);
    console.log('key: ', key);
    console.log('filePath:', filePath);
    console.log('destination:', destination);
    console.log('location:', location);

    let newPath = '';

    if (process.env.LOCAL_DOS_ARQUIVOS === 'local') {
      await sharp(filePath)
        .resize(500)
        .jpeg({ quality: 50 })
        .toFile(pathlocal.resolve(destination, 'resized', path));
      // remove os arquivo da pasta, arquivos velhos
      fs.unlinkSync(filePath);
      newPath = key;
    } else {
      console.log('req.... Estou no S3');

      newPath = `${basename(location, extname(location))}.jpg`;
    }

    const { id: _id, name: _name, path: _path, url } = await File.create({
      name,
      path: newPath,
    });

    return { _id, _name, _path, url };
  }
}
export default new CreateFileService();
