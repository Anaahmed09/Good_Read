// const http = require("http");
const app = require("./app");
// const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
app.listen(port, (error) => {
  if (!error) return console.log(`Server running on port ${port}`);
  return console.log(error);
});
