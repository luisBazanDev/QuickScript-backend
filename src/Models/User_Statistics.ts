import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../Connection/database';

class User_Statistics extends Model{
    public id!: number;
    public user_id!: number;
    public wpm!: number;
    public avg_time!: number;
    public total_words!: number;
    public avg_error!: number;
    public prefered_lang!: number;
}

User_Statistics.init(
    {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.INTEGER,
          references: { model: 'Users', key: 'id' },
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
          references: { model: 'Languages', key: 'id' },
        }
    },
    {
        sequelize: sequelize,
        tableName: 'User_Statistics',
        timestamps: false
    }
);

export default User_Statistics;