import { Model, UUIDV4 } from "sequelize";

export interface HomeAttributes {
  id: string;
  name: string;
  country?: string;
  city?: string;
  address?: string;
  email?: string;
}

const Home = (sequelize: any, DataTypes: any) => {
  class Home extends Model<HomeAttributes> implements HomeAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id: string;
    name: string;
    country?: string;
    city?: string;
    address?: string;
    email?: string;

    static associate(models: any) {
      // define association here
      Home.belongsToMany(models.Utility, {
        through: "HomeUtilityAssignment",
      });
    }
  }
  Home.init(
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
      email: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Home",
    },
  );

  return Home;
};

export default Home;
