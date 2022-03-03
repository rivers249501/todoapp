const express = require('express');
const cors = require('cors');
//Models
const { todosRouter } = require('./routes/todo.route');
//Util
const { sequelize } = require('./util/database');
// Init express app
const app = express();
app.use(cors());
// Enable JSON incoming data
app.use(express.json());
//Endopoint
app.use('/api/v1/todos', todosRouter);
//Autentification
sequelize
  .authenticate()
  .then(() => console.log('Connection DB'))
  .catch((err) => console.log(err));

sequelize
  .sync()
  .then(() => console.log('Database success'))
  .catch((err) => console.log(err));

app.listen(4001, () => {
  console.log('Express app running');
});
