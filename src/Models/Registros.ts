import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../Connection/database';

class Registros extends Model{
    public id!: number;
    public session_id!: number;
    public wpm!: number;
    public time!: number;
    public total_words!: number;
    public avg_error!: number;
    public prefered_lang!: number;
}

Registros.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
          },
          session_id: {
            type: DataTypes.INTEGER,
            references: { model: 'Sessions', key: 'id' },
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
          }
    },
    {
        sequelize: sequelize,
        tableName: 'Registros',
        timestamps: false
    }
);

export default Registros;