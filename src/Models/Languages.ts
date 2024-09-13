import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../Connection/database';

class Languages extends Model{
    public id!: number;
    public name!: string;
    public display_name!: string;
}

Languages.init(
    {
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
          }
    },
    {
        sequelize: sequelize,
        tableName: 'Languages',
        timestamps: false
    }
);

export default Languages;