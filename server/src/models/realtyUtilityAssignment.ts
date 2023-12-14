import { Model, UUIDV4 } from 'sequelize';

export interface RealtyUtilityAssignmentAttributes {
  id: string;
  RealtyId: string;
  UtilityId: string;
}

const RealtyUtilityAssignment = (sequelize: any, DataTypes: any) => {
  class RealtyUtilityAssignment
    extends Model
    implements RealtyUtilityAssignmentAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    RealtyId!: string;
    UtilityId!: string;

    static associate(models: any) {
      // define association here
      RealtyUtilityAssignment.hasMany(models.UtilityPayment);
    }
  }
  RealtyUtilityAssignment.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      RealtyId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      UtilityId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'RealtyUtilityAssignment',
    },
  );
  return RealtyUtilityAssignment;
};

export default RealtyUtilityAssignment;
