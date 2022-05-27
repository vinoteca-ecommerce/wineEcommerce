const { response } = require("express");
const Product = require("../models/product");


const getAll = async( req, res = response )  =>{

  const { limit = 10 , start = 0 } = req.query;
  const query = { state: true  };
  const {name,category,strain,country,producer,orden,pmax,pmin} = req.query
 
  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate('user', 'name')
      .populate('category', 'name')
      .skip(Number(start))
      .limit(Number(limit)),
  ]);


  if(name || strain || category || country || producer || orden || (pmax && pmin)){
    let namefiltred = []
    let strainFiltred =[]
    let categoryFiltred = []
    let countryFiltred =[] 
    let producerFilter =[]
    let pricemaxmin =[]
 
  if(name){   
    let x = products.filter((e) =>
    e.name.toLowerCase().includes(name.toLowerCase()))
    x.length>0?namefiltred=x:res.json("msg: Name not found")

}else{
     namefiltred = products
  }
if(strain){
    strainFiltred = namefiltred.filter((e) =>
   e.strain.toLowerCase() === strain.toLowerCase())}else{
      strainFiltred = namefiltred
   }
   
if(category){   
  categoryFiltred = strainFiltred.filter((e) =>
   e.category.name === category)}else{
      categoryFiltred = strainFiltred
   }

if(country){
   countryFiltred = categoryFiltred.filter((e) =>
   e.country.toLowerCase() === country.toLowerCase())} else{
     countryFiltred = categoryFiltred
   }
  if(producer){
   producerFilter = countryFiltred.filter((e) =>
  e.producer === producer)} else {
     producerFilter = countryFiltred
  } 
if(pmax && pmin){
 pricemaxmin = producerFilter.filter((e) =>
 e.price > pmin && e.price < pmax )} else {
  pricemaxmin = producerFilter 
}

if(pricemaxmin.length>0){
  if(!orden || orden === 'abc'){
    let sortAbc = pricemaxmin.sort(function(a,b){
      if(a.name.toLowerCase() > b.name.toLowerCase()){
        return 1;
    }
    if(b.name.toLowerCase() > a.name.toLowerCase()){
        return -1
    }
    return 0
  })
  res.json({
    total: sortAbc.length,
    sortAbc
  })
  }
if(orden === 'cba'){
  let sortAbc = pricemaxmin.sort(function(a,b){
    if(b.name.toLowerCase() > a.name.toLowerCase()){
      return 1;
  }
  if(a.name.toLowerCase() > b.name.toLowerCase()){
      return -1
  }
  return 0
})
res.json({
  total: sortAbc.length,
  sortAbc
})
}
if(orden==="pricemax"){ 
  let sortAbc = pricemaxmin.sort(function(a,b){
    if(b.price > a.price){
      return 1;
  }
  if(a.price > b.price){
      return -1
  }
  return 0
})


  res.json({
    total: sortAbc.length,
    sortAbc
  })
}
if(orden==="pricemin"){
  let sortAbc = pricemaxmin.sort(function(a,b){
    if(a.price > b.price){
      return 1;
  }
  if(b.price > a.price){
      return -1
  }
  return 0
})


  res.json({
    total: sortAbc.length,
    sortAbc
  })
}
 }

}
else{
  res.json({
    total,
    products
  });
}

};

const getProduct = async(req, res = response) =>{

  const { id } = req.params;

  const wineById = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name');

    res.json(wineById);

};

const productUpdate = async(req, res=response)=>{


  const { id } = req.params;
  const { state, user, category,...data } = req.body;

  const product = await Product.findByIdAndUpdate(id, data, { new:true });

  res.json(product);

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
    user : req.user._id,
  
  };
  const product = new Product(data);

  await product.save();

  res.status(201).json(product);
};

const deleteProduct = async (req, res = response)=>{

  const { id } = req.params;
  
  const deleteProduct = await Product.findByIdAndUpdate(id , { state: false }, { new:true });

  res.status(200).json({deleteProduct});

}


const addFav=async(req,res=response)=>{
  const {id}=req.params;

  const wine = await Product.findById(id)
  

  const find=req.user.favorites.find(v=>v.name===wine.name)
  if (find){
    return res.json({msg:'the wine is already con your favorites'})
  }
  await req.user.favorites.push(wine)
  
  req.user.save();
  
  return res.json(req.user.favorites)
}


const getFavs=async(req,res=response)=>{

  const favs= req.user.favorites;
  
  return res.send({
    total:favs.length,  
    favs
  })
}


const deleteFavs=async(req,res=response)=>{
  const {id}=req.params

  const wine = await Product.findById(id)

  req.user.favorites=req.user.favorites.filter(w=>w.name!==wine.name)

  req.user.save();

  res.json({msg:'Wine deleted from your favorites succesfully.'})
}






module.exports = {
  postProduct,
  getAll,
  getProduct,
  productUpdate,
  deleteProduct,
  addFav,
  getFavs,
  deleteFavs
};

