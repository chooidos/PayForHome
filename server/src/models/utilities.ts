import { Model, UUIDV4 } from "sequelize";

interface UtilitiesAttributes {
  id: string;
  name: string;
  isCountable: boolean;
}

const Utilities = (sequelize: any, DataTypes: any) => {
  class Utilities extends Model implements UtilitiesAttributes {
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
      Utilities.belongsToMany(models.Home, {
        through: "Home_Utilities",
      });
    }
  }
  Utilities.init(
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
      modelName: "Utilities",
    },
  );
  return Utilities;
};

export default Utilities;
