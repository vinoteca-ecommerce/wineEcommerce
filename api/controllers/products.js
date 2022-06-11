const { response } = require("express");
const Product = require("../models/product");
const User = require("../models/user");
const axios = require("axios");

const getAllProducers = async (req, res = response) => {
  const query = { state: true };

  const products = await Product.find(query)
    .populate("user", "name")
    .populate("category", "name");
  const array = [];
  products.map((e) => array.push(e.producer));

  const dataArr = new Set(array);

  const producer = Array.from(dataArr);
  res.json({ producer });
};

const getAll = async (req, res = response) => {
  const { limit, start = 0 } = req.query;
  const query = { state: true };
  const { name, strain, category, country, producer, orden, pmax, pmin } =
    req.query;

  const products = await Product.find(query)
    .populate("user", "name")
    .populate("category", "name");

  if (
    name ||
    strain ||
    category ||
    country ||
    producer ||
    orden ||
    (pmax && pmin)
  ) {
    let namefiltred = [];
    let strainFiltred = [];
    let categoryFiltred = [];
    let countryFiltred = [];
    let producerFilter = [];
    let pricemaxmin = [];

    if (name) {
      const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      };
      let x = products.filter((e) =>
        removeAccents(e.name.toLowerCase()).includes(
          removeAccents(name.toLowerCase())
        )
      );
      x.length > 0 ? (namefiltred = x) : res.json({msg: "No se encontraron coincidencias"});
    } else {
      namefiltred = products;
    }
    if (strain) {
      strainFiltred = namefiltred.filter(
        (e) => e.strain.toLowerCase() === strain.toLowerCase()
      );
      if (strainFiltred.length === 0) {
        return res.json({ msg: "No se encontraron coincidencias" });
      }
    } else {
      strainFiltred = namefiltred;
    }

    if (category) {
      categoryFiltred = strainFiltred.filter(
        (e) => e.category.name === category
      );
      if (categoryFiltred.length === 0) {
        return res.json({ msg: "No se encontraron coincidencias" });
      }
    } else {
      categoryFiltred = strainFiltred;
    }

    if (country) {
      countryFiltred = categoryFiltred.filter(
        (e) => e.country.toLowerCase() === country.toLowerCase()
      );
      if (countryFiltred.length === 0) {
        return res.json({ msg: "No se encontraron coincidencias" });
      }
    } else {
      countryFiltred = categoryFiltred;
    }
    if (producer) {
      producerFilter = countryFiltred.filter((e) => e.producer === producer);

      if (producerFilter.length === 0) {
        return res.json({ msg: "No se encontraron coincidencias" });
      }
    } else {
      producerFilter = countryFiltred;
    }
    if (pmax && pmin) {
      pricemaxmin = producerFilter.filter(
        (e) => e.price > pmin && e.price < pmax
      );
    } else {
      pricemaxmin = producerFilter;
    }

    if (pricemaxmin.length > 0) {
      if (!orden || orden === "abc") {
        let sortAbc = pricemaxmin.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return -1;
          }
          return 0;
        });
        const result = sortAbc;
        res.json({
          total: sortAbc.length,
          result,
        });
      }
      if (orden === "cba") {
        let sortAbc = pricemaxmin.sort(function (a, b) {
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return 1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }
          return 0;
        });
        const result = sortAbc;
        res.json({
          total: sortAbc.length,
          result,
        });
      }
      if (orden === "pricemax") {
        let sortAbc = pricemaxmin.sort(function (a, b) {
          if (b.price > a.price) {
            return 1;
          }
          if (a.price > b.price) {
            return -1;
          }
          return 0;
        });

        const result = sortAbc;
        res.json({
          total: sortAbc.length,
          result,
        });
      }
      if (orden === "pricemin") {
        let sortAbc = pricemaxmin.sort(function (a, b) {
          if (a.price > b.price) {
            return 1;
          }
          if (b.price > a.price) {
            return -1;
          }
          return 0;
        });

        const result = sortAbc;
        res.json({
          total: sortAbc.length,
          result,
        });
      }
    }
  } else {
    const result = products;
    res.json({
      total: products.length,
      result,
    });
  }
};

const getProduct = async (req, res = response) => {
  const { id } = req.params;

  const wineById = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.json(wineById);
};

const productUpdate = async (req, res = response) => {
  const { id } = req.params;
  const { state, user,  ...data } = req.body;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.json(product);
};


const productUpdateStock = async (req, res = response) => {
//llega toda la info por body: [{id, stockk},{id, stockk}]
console.log(req.body)
  req.body.map(async(e)=>{
    let product = await Product.findByIdAndUpdate(e.id,{ stock:e.stock}, { new: true });
  })
  

  res.json({msg:'Stock de los vinos recibido actualizado correctamente!'});}

  

const productUpdateComment = async (req, res = response) => {
  const { id } = req.params;

  const  data = req.body;

  
  const product = await Product.findById(id)
  product.comment.push(data)
  product.save()
  res.json({msg: "Comentario aceptado"});

};


const postProduct = async (req, res = response) => {
  const { state, name, ...body } = req.body;

  const productDB = await Product.findOne({ name });

  if (productDB) {
    return res.status(400).json({
      msg: `The product:  ${name} already exist`,
    });
  }

  const data = {
    ...body,
    name,
    user: req.user._id,
  };
  const product = new Product(data);

  await product.save();

  res.status(201).json(product);
};

const deleteProduct = async (req, res = response) => {
  const { id } = req.params;

  const deleteProduct = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.status(200).json({ deleteProduct });
};

const addFav = async (req, res = response) => {
  const { id } = req.params;

  const wine = await Product.findById(id);

  const find = req.user.favorites.find((v) => v.name === wine.name);
  if (find) {
    return res.json({ msg: "the wine is already con your favorites" });
  }
  await req.user.favorites.push(wine);

  req.user.save();

  return res.json(req.user.favorites);
};

const getFavs = async (req, res = response) => {
  const favs = req.user.favorites;

  return res.send({
    total: favs.length,
    favs,
  });
};

const deleteFavs = async (req, res = response) => {
  const { id } = req.params;

  const wine = await Product.findById(id);

  req.user.favorites = req.user.favorites.filter((w) => w.name !== wine.name);

  req.user.save();

  res.json({ msg: "Wine deleted from your favorites succesfully." });
};

const addToCart = async (req, res = response) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const wine = await Product.findById(id);
  const find = req.user.cart.find((e) => e.name == wine.name);
  let index = req.user.cart.indexOf(find);
  if (!find) {
    if (wine.stock >= quantity) {
      req.user.cart.push(wine);
      index = req.user.cart.indexOf(wine);

      req.user.cart[index].quantity = quantity;

      await req.user.save();
    } else {
      return res.json({ msg: "No stock available" });
    }
  } else {
    if (wine.stock >= quantity) {
      req.user.cart = req.user.cart.filter((v) => v.name !== find.name);

      req.user.cart.push(wine);
      index = req.user.cart.indexOf(wine);

      req.user.cart[index].quantity = quantity;

      await req.user.save();
    } else {
      return res.json({ msg: "No stock available" });
    }
  }

  res.status(200).json({
    msg: "Product added to the cart succesfully!",
    cart: req.user.cart,
  });
};









const getCart = async (req, res = response) => {
  const cart = req.user.cart;

  return res.json({
    cart,
  });
};

const deleteCart = async (req, res = response) => {
  const { email } = req.user;
  const user = await User.findOneAndUpdate(
    { email },
    { cart: [] },
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    }
  ).clone();

  res.status(201).json(user.cart);
};

const pushToCart = async (req, res = response) => {
  const { email } = req.user;
  const user = await User.findOneAndUpdate(
    { email },
    { cart: req.body },
    (error, data) => {
      if (error) {
        console.log(error);
      }
    }
  ).clone();

  res.status(201).json({ msg: "Done" });
};

const paymentMP = async (req, res) => {
  const url = "https://api.mercadopago.com/checkout/preferences";
  const body = req.body;
  console.log(body)
  const payment = await axios.post(url, body, {
    
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    },
  });

  res.send({ url: payment.data.init_point });
}; 

module.exports = {
  postProduct,
  getAll,
  getProduct,
  productUpdate,
  deleteProduct,
  addFav,
  getFavs,
  deleteFavs,
  addToCart,
  pushToCart,
  deleteCart,
  getCart,
  getAllProducers,
  paymentMP,


  productUpdateStock,
  productUpdateComment
}

