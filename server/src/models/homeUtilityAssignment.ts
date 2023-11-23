import { Model, UUIDV4 } from "sequelize";

export interface RealtyUtilityAssignmentAttributes {
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

    RealtyId!: string;
    UtilityId!: string;

    static associate(models: any) {
      // define association here
    }
  }
  RealtyUtilityAssignment.init(
    {
      RealtyId: {
        type: DataTypes.UUID,
      },
      UtilityId: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "RealtyUtilityAssignment",
    },
  );
  return RealtyUtilityAssignment;
};

export default RealtyUtilityAssignment;
