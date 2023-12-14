import { Sequelize } from 'sequelize';
import { Model, UUIDV4 } from 'sequelize';
import { dbI } from '.';

export interface RealtyAttributes {
  id: string;
  name: string;
  country?: string;
  city?: string;
  address?: string;
}

const Realty = (sequelize: Sequelize, DataTypes: any) => {
  class Realty extends Model<RealtyAttributes> implements RealtyAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    name!: string;
    country?: string;
    city?: string;
    address?: string;

    static associate(models: dbI) {
      // define association here
      Realty.belongsToMany(models.Utility, {
        through: 'RealtyUtilityAssignment',
      });
    }
  }
  Realty.init(
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
      country: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Realty',
    },
  );

  return Realty;
};

export default Realty;
