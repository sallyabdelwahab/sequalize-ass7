import { DataTypes,Model } from "sequelize";
import {sequelize} from "../connection.js";

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Comment",
    timestamps: true
  }
);
export default Comment;