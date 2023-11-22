import { Model, UUIDV4 } from "sequelize";

export interface HomeUtilityAssignmentAttributes {
  HomeId: string;
  UtilityId: string;
}

const HomeUtilityAssignment = (sequelize: any, DataTypes: any) => {
  class HomeUtilityAssignment
    extends Model
    implements HomeUtilityAssignmentAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    HomeId!: string;
    UtilityId!: string;

    static associate(models: any) {
      // define association here
    }
  }
  HomeUtilityAssignment.init(
    {
      HomeId: {
        type: DataTypes.UUID,
      },
      UtilityId: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "HomeUtilityAssignment",
    },
  );
  return HomeUtilityAssignment;
};

export default HomeUtilityAssignment;
