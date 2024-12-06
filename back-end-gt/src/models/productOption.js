"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductOption extends Model {
    static associate(models) {
      ProductOption.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }

  ProductOption.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      shape: {
        type: DataTypes.ENUM("square", "circle"),
        allowNull: true,
        defaultValue: "square",
      },
      radius: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      type: {
        type: DataTypes.ENUM("text", "color"),
        allowNull: true,
        defaultValue: "text",
      },
      values: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductOption",
      tableName: "product_options",
      timestamps: true,
    }
  );

  return ProductOption;
};