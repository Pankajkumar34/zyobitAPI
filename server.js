const express = require('express');
const cookiesParser = require('cookie-parser');
const app = express();
require('dotenv').config();
const cors = require('cors');
const DBConnect = require('./db/db');

const routes = require('./routes/routes');

DBConnect();

const port = process.env.PORT || 4000;
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cookiesParser());
app.use(express.json());



app.get('/', (req, res) => {
  res.send('Welcome to the API');
});
app.use("/api", routes)

app.listen(port, () => {
  console.log(`Server is running on port  ${port}`);
}
);

