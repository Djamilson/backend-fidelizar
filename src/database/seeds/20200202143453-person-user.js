const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'people',
      [
        {
          name: 'Minha empresa',
          email: 'admin@loyalty.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Teste user',
          email: 'admin@teste.com',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
