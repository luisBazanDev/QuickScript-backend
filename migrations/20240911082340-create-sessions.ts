import {QueryInterface, DataTypes} from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('sessions', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      },
      average_wpm: {
        type: DataTypes.DECIMAL(6, 2),
      },
      language: {
        type: DataTypes.INTEGER,
        references: { model: 'languages', key: 'id' },
      },
      precision: {
        type: DataTypes.DECIMAL(5, 2),
      },
      min_wpm: {
        type: DataTypes.DECIMAL(6, 2),
      },
      max_wpm: {
        type: DataTypes.DECIMAL(6, 2),
      },
      start_time: {
        type: DataTypes.DATE,
      },
      end_time: {
        type: DataTypes.DATE,
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
    await queryInterface.dropTable('sessions');
  }
};