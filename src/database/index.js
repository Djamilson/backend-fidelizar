import Token from '../app/models/Token';
import File from '../app/models/File';
import GroupUser from '../app/models/GroupUser';
import Group from '../app/models/Group';
import User from '../app/models/User';

import Recipient from '../app/models/Recipient';
import Address from '../app/models/Address';
import City from '../app/models/State';
import State from '../app/models/City';

import Company from '../app/models/Company';
import Finance from '../app/models/Finance';
import Loyalty from '../app/models/Loyalty';

import Person from '../app/models/Person';
import Phone from '../app/models/Phone';

import databaseConfig from '../config/database';
import Sequelize from 'sequelize';

const models = [
  User,
  File,
  Token,
  Group,
  GroupUser,
  State,
  City,
  Recipient,
  Address,
  Company,
  Loyalty,
  Finance,
  Person,
  Phone,
];

class Database {
  constructor() {
    this.connection = new Sequelize(databaseConfig);

    this.init();
    this.associate();
    // this.mongo();
  }

  init() {
    models.map(model => model.init(this.connection));
  }

  associate() {
    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
  /*
  mongo() {
    const { MONGO_HOST, MONGO_PORT, MONGO_NAME } = process.env;

    const mongoURI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}`;

    this.mongoConnection = mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useFindAndModify: true,

      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  }*/
}

export default new Database();
