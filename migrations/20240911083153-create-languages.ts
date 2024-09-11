import {QueryInterface, DataTypes} from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('languages', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      display_name: {
        type: DataTypes.STRING(20),
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
    await queryInterface.dropTable('languages');
  }
};