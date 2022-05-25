const { response } = require("express");
const Product = require("../models/product");






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
  };
  const product = new Product(data);

  await product.save();

  res.status(201).json(product);
};




const getAll = async( req, res = response )  =>{

  const { limit = 10 , start = 0 } = req.query;
  const query = { state: true  };
  const {name,category,strain,country,producer,orden} = req.query
 
  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate('category', 'name')
      .skip(Number(start))
      .limit(Number(limit)),
  ]);


  if(name || strain || category || country || producer || orden ){
    let namefiltred = []
    let strainFiltred =[]
    let categoryFiltred = []
    let countryFiltred =[] 
    let producerFilter =[]
 
  if(name){   
    let x = products.filter((e) =>
    e.name.toLowerCase().includes(name.toLowerCase()))
    x.length>0?namefiltred=x:res.json("msg: Nombre no encontrado")

}else{
     namefiltred = products
     console.log(namefiltred)
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

if(producerFilter.length>0){
  if(!orden || orden === 'abc'){
    let sortAbc = producerFilter.sort(function(a,b){
      if(a.name.toLowerCase() > b.name.toLowerCase()){
        return 1;
    }
    if(b.name.toLowerCase() > a.name.toLowerCase()){
        return -1
    }
    return 0
  })
  res.json({
    sortAbc
  })
  }
if(orden === 'cba'){
  let sortAbc = producerFilter.sort(function(a,b){
    if(b.name.toLowerCase() > a.name.toLowerCase()){
      return 1;
  }
  if(a.name.toLowerCase() > b.name.toLowerCase()){
      return -1
  }
  return 0
})
res.json({
  sortAbc
})
}
if(orden==="pricemax"){
  let sortAbc = producerFilter.sort(function(a,b){
    if(b.price > a.price){
      return 1;
  }
  if(a.price > b.price){
      return -1
  }
  return 0
})


  res.json({
    sortAbc
  })
}
if(orden==="pricemin"){
  let sortAbc = producerFilter.sort(function(a,b){
    if(a.price > b.price){
      return 1;
  }
  if(b.price > a.price){
      return -1
  }
  return 0
})


  res.json({
    sortAbc
  })
}
 }

}
else{
  res.json({
    products
  });
}

}








module.exports = {
  postProduct,
  getAll,
};






// const getAll = async( req, res = response )  =>{

//   const { limit = 10 , start = 0 } = req.query;
//   const query = { state: true  };
//   const {name,category,strain,country,producer} = req.query
 
//   const [total, products] = await Promise.all([
//     Product.countDocuments(query),
//     Product.find(query)
//       .populate('category', 'name')
//       .skip(Number(start))
//       .limit(Number(limit)),
//   ]);


//   if(name && strain && category && country && producer ){
//     const namefiltred = products.filter((e) =>
//     e.name.toLowerCase().includes(name.toLowerCase())
//   )
//    const strainFiltred = namefiltred.filter((e) =>
//    e.strain.toLowerCase() === strain.toLowerCase())
   
//  const categoryFiltred = strainFiltred.filter((e) =>
//    e.category.name === category)
//   const countryFiltred = categoryFiltred.filter((e) =>
//    e.country.toLowerCase() === country.toLowerCase())
//   const producerFilter = countryFiltred.filter((e) =>
//   e.producer === producer)
// if(producerFilter.length>0){
//    res.json({
//     producerFilter
//   });}else{
//     res.json({
//       msg: "Vino no encontrado"
//     })
//   }
// } 
// else if(name && strain && category && country){
//   const namefiltred = products.filter((e) =>
//   e.name.toLowerCase().includes(name.toLowerCase())
// )
//  const strainFiltred = namefiltred.filter((e) =>
//  e.strain.toLowerCase() === strain.toLowerCase())
 
// const categoryFiltred = strainFiltred.filter((e) =>
//  e.category.name === category)
// const countryFiltred = categoryFiltred.filter((e) =>
//  e.country.toLowerCase() === country.toLowerCase())
// if(countryFiltred.length>0){
//  res.json({
//   countryFiltred
// });}else{
//   res.json({
//     msg: "Vino no encontrado"
//   })
// }
// }else if(name && strain && category){
//   const namefiltred = products.filter((e) =>
//   e.name.toLowerCase().includes(name.toLowerCase())
// )
//  const strainFiltred = namefiltred.filter((e) =>
//  e.strain.toLowerCase() === strain.toLowerCase())
 
// const categoryFiltred = strainFiltred.filter((e) =>
//  e.category.name === category)



// if(categoryFiltred.length>0){
//  res.json({
//   categoryFiltred
// });}else{
//   res.json({
//     msg: "Vino no encontrado"
//   })
// }
// }




// else{
//   res.json({
//     products
//   });
// }

// }
// const getWinesABC = async( req, res = response )  =>{

//   const { limit = 10 , start = 0 } = req.query;
//   const query = { state: true  };

//   const [total, products] = await Promise.all([
//     Product.countDocuments(query),
//     Product.find(query).skip(Number(start)).limit(Number(limit)),
//   ]);

//   let sortAbc = products.sort(function(a,b){
//     if(a.name.toLowerCase() > b.name.toLowerCase()){
//       return 1;
//   }
//   if(b.name.toLowerCase() > a.name.toLowerCase()){
//       return -1
//   }
//   return 0
// })


//   res.json({
//     total,
//     sortAbc
//   });

// }
// const getWinesCBA = async( req, res = response )  =>{

//   const { limit = 10 , start = 0 } = req.query;
//   const query = { state: true  };

//   const [total, products] = await Promise.all([
//     Product.countDocuments(query),
//     Product.find(query).skip(Number(start)).limit(Number(limit)),
//   ]);

//   let sortAbc = products.sort(function(a,b){
//     if(b.name.toLowerCase() > a.name.toLowerCase()){
//       return 1;
//   }
//   if(a.name.toLowerCase() > b.name.toLowerCase()){
//       return -1
//   }
//   return 0
// })


//   res.json({
//     total,
//     sortAbc
//   });

// }

// const getWineshigherprice = async( req, res = response )  =>{

//   const { limit = 10 , start = 0 } = req.query;
//   const query = { state: true  };

//   const [total, products] = await Promise.all([
//     Product.countDocuments(query),
//     Product.find(query).skip(Number(start)).limit(Number(limit)),
//   ]);

//   let sortAbc = products.sort(function(a,b){
//     if(b.price > a.price){
//       return 1;
//   }
//   if(a.price > b.price){
//       return -1
//   }
//   return 0
// })


//   res.json({
//     total,
//     sortAbc
//   });

// }
// const getWineslowerprice = async( req, res = response )  =>{

//   const { limit = 10 , start = 0 } = req.query;
//   const query = { state: true  };

//   const [total, products] = await Promise.all([
//     Product.countDocuments(query),
//     Product.find(query).skip(Number(start)).limit(Number(limit)),
//   ]);

//   let sortAbc = products.sort(function(a,b){
//     if(a.price > b.price){
//       return 1;
//   }
//   if(b.price > a.price){
//       return -1
//   }
//   return 0
// })


//   res.json({
//     total,
//     sortAbc
//   });

// }

// const getName = async( req, res = response )  =>{

//   const { limit = 10 , start = 0 } = req.query;
//   const query = { state: true  };
//   const {name} = req.query

//   const [total, products] = await Promise.all([
//     Product.countDocuments(query),
//     Product.find(query).skip(Number(start)).limit(Number(limit)),
//   ]);

//   if(name){
//     const namefiltred = products.filter((e) =>
//     e.name.toLowerCase().includes(name.toLowerCase())
//   )
//     res.json({
//       namefiltred
//     });
//   }
 
// }





// const getWines = async( req, res = response )  =>{

//   const { limit = 10 , start = 0 } = req.query;
//   const query = { state: true  };

//   const [total, products] = await Promise.all([
//     Product.countDocuments(query),
//     Product.find(query)
//       .populate('category', 'name')
//       .skip(Number(start))
//       .limit(Number(limit)),
//   ]);


//   res.json({
//     total,
//     products
//   });

// }