import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../Connection/database';

class Sessions extends Model{
    public id!: number;
    public user_id!: number;
    public average_wpm!: number;
    public language!: number;
    public precision!: number;
    public min_wpm!: number;
    public max_wpm!: number;
    public start_time!: Date;
    public end_time!: Date;
}

Sessions.init(
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
          average_wpm: {
            type: DataTypes.DECIMAL(6, 2),
          },
          language: {
            type: DataTypes.INTEGER,
            references: { model: 'Languages', key: 'id' },
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
          }
    },
    {
        sequelize: sequelize,
        tableName: 'Sessions',
        timestamps: false
    }
);

export default Sessions;