import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

let products = [
  { id: 1, name: "Computer", category: "office", price: 99 },
  { id: 2, name: "Pen", category: "office", price: 99 },
  { id: 3, name: "Knife", category: "kitchen", price: 99 },
  { id: 4, name: "Spoon", category: "kitchen", price: 99 },
  { id: 5, name: "Plate", category: "kitchen", price: 99 },
  { id: 6, name: "Alon Tree", category: "garden", price: 99 },
  { id: 7, name: "Garden Chair", category: "garden", price: 99 },
  { id: 8, name: "Garden Table", category: "garden", price: 99 },
];

const corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(function (req: any, res: any, next: any) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control_Allow_Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/products", (req, res) => {
  return res.send(products);
});

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const prod: any = products.filter((p) => p.id === Number(id));
  return res.send(prod[0]);
});

app.delete("/products/:id", (req, res) => {
  const newArray = products.filter((p) => p.id !== Number(req.params.id));
  products = newArray;
  res.send({ message: "ok" });
});

app.put("/products/:id", (req, res) => {
  products.map((p) => {
    if (p.id === req.body.id) {
      if (p.category !== req.body.category) {
        return p.category = req.body.category;
      }
      if (p.name !== req.body.name) {
        return p.name = req.body.name;
      }
      if (p.price !== Number(req.body.price)) {
        console.log(Number(req.body.price))
        return p.price = Number(req.body.price);
      }
    }
  });
});

app.get("/products/category/:category", (req, res) => {
  console.log(req.params)
  const category = req.params.category
  const results = products.filter(p => p.category === category)
  return res.send(results)
})

app.post("/products", (req, res) => {
  console.log(req.body)
  const product = req.body
  products.push({
    id: 9,
    name: product.name,
    category: product.category,
    price: product.price
  })
})

app.listen(port, () => {
  console.log("server is up on", port);
});
