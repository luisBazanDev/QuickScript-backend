import {QueryInterface, DataTypes} from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('registros', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      session_id: {
        type: DataTypes.INTEGER,
        references: { model: 'sessions', key: 'id' },
        onDelete: 'CASCADE',
      },
      wpm: {
        type: DataTypes.DECIMAL(6, 2),
      },
      time: {
        type: DataTypes.BIGINT,
      },
      total_words: {
        type: DataTypes.INTEGER,
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
    await queryInterface.dropTable('registros');
  }
};