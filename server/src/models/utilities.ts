import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize, DataTypes: DataTypes) => {
  const Utilities = sequelize.define(
    "utilites",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      home_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  );

  Utilities.associate = (models) => {
    Utilities.belongsTo(models.home, {
      foreignKey: "status_id",
    });
  };
  return Utilities;
};
