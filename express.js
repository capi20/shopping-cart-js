const express = require("express");
const path = require("path");
const app = express();
const cors = require('cors')
const products = require('./server/products/index.get.json')
const port = 3000;

app.use(cors())
app.use(express.static(path.join(__dirname, "/src/static")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("app.html", { root: __dirname });
});

app.get("/products", (req, res) => {
  res.sendFile("app.html", { root: __dirname });
});

app.get("/productdata", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  let productId = req.params.id
  const filteredList = products.filter(el => el.category === productId) 
  res.json(filteredList);
});

// app.delete("/course/:id", (req, res) => {
//   //   console.log("Deleting course..", req.params.id);
//   let theCourseId = req.params.id;
//   // functional programming
//   courses = courses.filter((course) => course.id != theCourseId);
//   console.log(courses);
//   res.json({ msg: "success" });
// });

// app.post("/newcourse", (req, res) => {
//   let courseToBeAdded = req.body;
//   courses = [...courses, courseToBeAdded]; // push !
//   //   console.log("Adding new course");
//   res.json({ msg: "success" });
// });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
