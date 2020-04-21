module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('loyalty', 'person_id', {
      type: Sequelize.INTEGER,
      references: { model: 'people', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('loyalty', 'person_id');
  },
};
