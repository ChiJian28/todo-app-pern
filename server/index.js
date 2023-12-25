const express = require('express');
const app = express();
const cors = require('cors');
const todoRoute = require('./routes/todoRoute.js');
require('dotenv').config();

const { Sequelize } = require('sequelize');
const { sequelize, connectToDatabase } = require('./db/db'); 

app.use(express.json());
app.use(cors());

// this is our HTTP method that used for getting resource from server
// can display at browser
app.get('/', (request, response) => {
  console.log(request)
  return response.status(234).send("Welcome to PERN stack !");
});

app.use('/todos', todoRoute)

const server = async () => {
  try {
    // 连接数据库
    await connectToDatabase();
    
    // 同步数据库
    // -确保数据库与 Sequelize 模型的定义一致
    // -如果没有这个table 会自行创建
    await sequelize.sync();
    console.log('Database synced successfully');

    // 启动 Express 服务器
    app.listen(process.env.PORT, () => {
      console.log(`Server has started on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
};

// 启动服务器
server();


