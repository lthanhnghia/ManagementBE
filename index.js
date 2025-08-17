const express = require('express')
const app = express()
const port = 5000
const cors = require("cors");
const initRouter = require('./src/Routes')
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/", initRouter);
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
