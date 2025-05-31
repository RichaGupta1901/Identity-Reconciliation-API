// Modelling a contact entry
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Contact = sequelize.define('Contact', {
  id: { type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true },
  phoneNumber: { type: DataTypes.STRING,
    allowNull: true },
  email: { type: DataTypes.STRING,
    allowNull: true },
  linkedId: { type: DataTypes.INTEGER,
    allowNull: true },
  linkPrecedence: { type: DataTypes.ENUM('primary', 'secondary'),
    defaultValue: 'primary' },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE
}, {
  timestamps: true,
  paranoid: true
});

module.exports = Contact;
