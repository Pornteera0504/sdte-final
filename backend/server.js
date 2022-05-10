const express = require("express");
const app = express();
const cors = require('cors');

const apiRouter = require("./routers/apiRouter");

const jsonParser = express.json();
app.use(jsonParser);

app.use(cors());

app.use(apiRouter);

const port = 3030;
app.listen(port, '0.0.0.0');
