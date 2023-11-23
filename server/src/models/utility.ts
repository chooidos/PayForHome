import { Sequelize } from "sequelize";
import { Model, UUIDV4 } from "sequelize";

export interface UtilityAttributes {
  id: string;
  name: string;
  isCountable: boolean;
}

const Utility = (sequelize: Sequelize, DataTypes: any) => {
  class Utility extends Model implements UtilityAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    name!: string;
    isCountable!: boolean;

    static associate(models: any) {
      // define association here
      Utility.belongsToMany(models.Realty, {
        through: "RealtyUtilityAssignment",
      });
    }
  }
  Utility.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      isCountable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Utility",
    },
  );
  return Utility;
};

export default Utility;
