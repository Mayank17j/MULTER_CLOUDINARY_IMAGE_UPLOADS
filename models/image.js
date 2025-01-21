const { Model, Sequelize, DataTypes } = require("sequelize");

module.exports = (Sequelize, DataTypes) => {
  Image.init(
    {
      url: DataTypes.STRING,
      secure_url: DataTypes.STRING,
      tags: DataTypes.STRING,
      uploadAt: DataTypes.DATE,
      userId: DataTypes.INTEGER,
      isDeleted: DataTypes.BOOLEAN,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      Sequelize,
      modelName: "Image",
    }
  );

  return Image;
};
