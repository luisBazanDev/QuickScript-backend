import {QueryInterface, DataTypes} from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('users', {
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
      wpm: {
        type: DataTypes.DECIMAL(6, 2),
      },
      avg_time: {
        type: DataTypes.BIGINT,
      },
      total_words: {
        type: DataTypes.INTEGER,
      },
      avg_error: {
        type: DataTypes.INTEGER,
      },
      prefered_lang: {
        type: DataTypes.INTEGER,
        references: { model: 'languages', key: 'id' },
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
    await queryInterface.dropTable('users');
  }
};