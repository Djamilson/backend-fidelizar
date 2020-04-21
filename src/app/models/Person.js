import Sequelize, { Model } from 'sequelize';

class Person extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        status: Sequelize.BOOLEAN,
        privacy: Sequelize.BOOLEAN,
      },
      { sequelize }
    );
    return this;
  }

  static associate(models) {
    this.hasMany(models.Phone, { foreignKey: 'phone_id', as: 'phones' });
    this.hasMany(models.Address, { foreignKey: 'address_id', as: 'addresses' });
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsTo(models.Phone, { foreignKey: 'phone_man_id', as: 'phone' });
  }
}

export default Person;
