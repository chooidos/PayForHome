import { Sequelize } from 'sequelize';
import { Model, UUIDV4 } from 'sequelize';

export interface UtilityPaymentAttributes {
  id: string;
  realtyUtilityId: string;
  date: string;
  value?: number;
  consumed?: number;
  price: number;
  totalPrice?: number;
  paid: string;
  recipe?: string;
}

const UtilityPayment = (sequelize: Sequelize, DataTypes: any) => {
  class UtilityPayment extends Model implements UtilityPaymentAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    realtyUtilityId!: string;
    date!: string;
    value?: number;
    consumed?: number;
    price!: number;
    totalPrice?: number;
    paid!: string;
    recipe?: string;

    static associate(models: any) {
      // define association here
      UtilityPayment.belongsTo(models.RealtyUtilityAssignment);
    }
  }
  UtilityPayment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      realtyUtilityId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      value: {
        type: DataTypes.DECIMAL,
      },
      consumed: {
        type: DataTypes.DECIMAL,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      totalPrice: {
        type: DataTypes.DECIMAL,
      },
      paid: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      recipe: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'UtilityPayment',
    },
  );
  return UtilityPayment;
};

export default UtilityPayment;
