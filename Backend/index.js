const app = require("./app");
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
app.listen(port, (error) => {
  if (!error) return console.log(`Server running on port ${port}`);
  return console.log(error);
});
