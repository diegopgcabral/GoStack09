module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'students',
      [
        {
          name: 'João Silva',
          email: 'joao.silva@gmail.com',
          age: 30,
          height: 1.75,
          weight: 80,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Maria Joana',
          email: 'maria.joana@gmail.com',
          age: 20,
          height: 1.64,
          weight: 62,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Diego Silva',
          email: 'diego.silva@gmail.com',
          age: 37,
          height: 1.9,
          weight: 92.5,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Gabriel Alves',
          email: 'gabriel.alves@gmail.com',
          age: 50,
          height: 1.75,
          weight: 102,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
