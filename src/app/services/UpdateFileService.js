import File from '../models/File';
import sharp from 'sharp';
import pathlocal from 'path';
import fs from 'fs';
import { basename, extname } from 'path';

class UpdateFileService {
  async run({ id_file, name, path, key, destination, location, filePath }) {
    console.log('name: ', name);
    console.log('path: ', path);
    console.log('key: ', key);
    console.log('filePath:', filePath);
    console.log('destination:', destination);
    console.log('location:', location);

    console.log('ooooo: ', id_file);
    const fileExist = await File.findByPk(id_file, {
      attributes: ['id', 'name', 'path'],
    });
    console.log("mimm", fileExist);

    if (!fileExist) {
      throw new Error('Image not exists.');
    }

    let newPath = '';

    if (process.env.LOCAL_DOS_ARQUIVOS === 'local') {
      console.log("estou no")
      await sharp(filePath)
        .resize(500)
        .jpeg({ quality: 50 })
        .toFile(pathlocal.resolve(destination, 'resized', path));
      // remove os arquivo da pasta, arquivos velhos
      fs.unlinkSync(filePath);
      newPath = key;
    } else {
      newPath = `${basename(location, extname(location))}.jpg`;
    }

    const { id: _id, name: _name, path: _path, url } = await fileExist.update({
      name,
      path: newPath,
    })

    return { _id, _name, _path, url };
   // return;
  }
}
export default new UpdateFileService();
