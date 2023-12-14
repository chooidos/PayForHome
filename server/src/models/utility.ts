import { Sequelize } from 'sequelize';
import { Model, UUIDV4 } from 'sequelize';

export interface UtilityAttributes {
  id: string;
  name: string;
  isCountable: boolean;
  units: string;
  price: number;
  isDeleted: boolean;
  icon: string;
  comment: string;
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
    price!: number;
    units: string;
    isDeleted!: boolean;
    icon: string;
    comment: string;

    static associate(models: any) {
      // define association here
      Utility.belongsToMany(models.Realty, {
        through: 'RealtyUtilityAssignment',
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
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      icon: {
        type: DataTypes.STRING,
      },
      comment: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.DECIMAL,
      },
      units: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Utility',
    },
  );
  return Utility;
};

export default Utility;
