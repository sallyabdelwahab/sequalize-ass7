
import { Sequelize } from "sequelize";


export const sequelize=new Sequelize('posts_app','root','root',{
 host: "localhost",
 port:3306,
    dialect: "mysql"


});

const connectDB=async()=>{
try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}


};

export default connectDB


