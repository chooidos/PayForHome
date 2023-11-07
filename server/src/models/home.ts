import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
  const Home = sequelize.define(
    "home",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  );

  Home.associate = (models) => {
    Home.hasMany(models.utilities, {
      foreignKey: "home_id",
      onDelete: "CASCADE",
    });
  };
  return Home;
};
