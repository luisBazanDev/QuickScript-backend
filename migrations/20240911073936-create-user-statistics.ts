import {QueryInterface, DataTypes} from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('user_statistics', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('user_statistics');
  }
};