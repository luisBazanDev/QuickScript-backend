import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../Connection/database';
import bcrypt from 'bcrypt';

class Users extends Model{
    public id!: number;
    public username!: string;
    public password!: string;
    public async validPassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
    }
}

Users.init(
    {
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
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
        sequelize: sequelize,
        tableName: 'Users',
        timestamps: true
    }
);

export default Users;