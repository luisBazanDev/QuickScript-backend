import { Model, DataTypes } from "sequelize";
import { sequelize } from "../Connection/database";

class Error_Keys extends Model {
  public id!: number;
  public session_id!: number;
  public amount_errors!: number;
  public time!: number;
}

Error_Keys.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    session_id: {
      type: DataTypes.INTEGER,
      references: { model: "Sessions", key: "id" },
      onDelete: "CASCADE",
    },
    amount_errors: {
      type: DataTypes.INTEGER,
    },
    time: {
      type: DataTypes.BIGINT,
    },
  },
  {
    sequelize: sequelize,
    tableName: "Error_Keys",
    timestamps: false,
  }
);

export default Error_Keys;
