import Sequelize, { Model } from 'sequelize';

class Loyalty extends Model {
  static init(sequelize) {
    super.init(
      {
        price: Sequelize.FLOAT,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Person, {
      foreignKey: 'person_id',
      as: 'person',
    });
    this.belongsTo(models.Company, {
      foreignKey: 'company_id',
      as: 'company',
    });
  }
}

export default Loyalty;
