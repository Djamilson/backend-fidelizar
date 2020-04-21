module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('loyalty', 'company_id', {
      type: Sequelize.INTEGER,
      references: { model: 'companies', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('loyalty', 'company_id');
  },
};
