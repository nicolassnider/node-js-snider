const products = require("../../utils/products.json");
const productsData = products.data;

const getProducts = (req, res) => {
  const itemsPerPage = 6;
  const page = parseInt(req.query.page);
  const start = (page - 1) * itemsPerPage;
  const total = products.data.length;
  const end = page * itemsPerPage;
  products.page = page;
  products.total = products.data.length;
  products.data = products.data.slice();
  console.log(page);
  products.total_pages = Math.ceil(products.data.length / itemsPerPage);
  res.send(products);
};

const getProductById = (req, res) => {
  const productId = parseInt(req.params.productId);
  const index = productsData.findIndex((item) => item.id == productId);
  if (index !== -1) {
    res.send({ data: productsData[index] });
  } else {
    res.status(404).send({});
  }
};

const crateProduct = (req, res) => {
  const { name, year, color, pantone_value } = req.body;
  const newProduct ={
    id : productsData.length+1,
    name,
    year,
    color,
    pantone_value
  }
  console.log(newProduct)
  productsData.push(newProduct);
  res.send(newProduct)
};
module.exports = { getProducts, getProductById,crateProduct };
