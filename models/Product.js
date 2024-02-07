const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isFloat: true,
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true,
        equals: 10, // Compare against a numeric value, not a string
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category', // Make sure this matches your actual model name
        key: 'id',
      }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
