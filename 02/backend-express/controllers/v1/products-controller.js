const products = require("../../utils/products.json");
let productsData = products.data;

const getProducts = (req, res) => {
  const itemsPerPage = 6;
  const page = parseInt(req.query.page);
  const start = (page - 1) * itemsPerPage;
  const total = products.data.length;
  const end = page * itemsPerPage;
  products.page = page;
  products.total = products.data.length;
  products.data = products.data.slice();
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

const createProduct = (req, res) => {
  const { name, year, color, pantone_value } = req.body;
  const newProduct = {
    id: productsData.length + 1,
    name,
    year,
    color,
    pantone_value,
  };
  productsData.push(newProduct);
  res.send(newProduct);
};

const updateProduct = (req, res) => {
  const productId = parseInt(req.params.productId);
  const { name, year, color, pantone_value } = req.body;
  const index = productsData.findIndex((item) => item.id == productId);
  if (index !== -1) {
    console.log(index);
    productsData[index] = {
      productId,
      name,
      year,
      color,
      pantone_value,
    };
    res.send({ data: products.data[index] });
  } else {
    res.status(404).send({});
  }
};

const partialUpdateProduct = (req, res) => {
  const productId = parseInt(req.params.productId);
  const { name, year, color, pantone_value } = req.body;
  const index = productsData.findIndex((item) => item.id == productId);
  if (index !== -1) {
    const product = productsData[index];
    productsData[index] = {
      id: product.id,
      name: name || product.name,
      year: year || product.year,
      color: color || product.color,
      pantone_value: pantone_value || product.pantone_value,
    };
    res.send({ data: products.data[index] });
  } else {
    res.status(404).send({});
  }
};

const deleteProduct = (req,res) =>{
  const productId = parseInt(req.params.productId);
  const index = productsData.findIndex((item)=> item.id ==productId);
  if(index!==-1){
    productsData = productsData.splice(index,1);
    res.send({})
  }else{res.status(404).send({})}
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  partialUpdateProduct,
  deleteProduct
};
