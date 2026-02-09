
import { DataTypes} from "sequelize";
import {sequelize} from "../connection.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true   //  built-in email validation
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkPasswordLength(value) {   // ✅ custom validation
          if (value.length <= 6) {
            throw new Error("Password must be longer than 6 characters");
          }
        }
      }
    },

    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user"
    }
  },
  {
    timestamps: true, // createdAt & updatedAt
    hooks: {
      beforeCreate(user) {   //  hook for name length
        if (user.name.length <= 2) {
          throw new Error("Name must be longer than 2 characters");
        }
      }
    }
  }
);
export default User;

