const jwt = require('jsonwebtoken');


const jwtGenerator = (uid = "") => {
    return new Promise((resolve, reject) => {
    
      const payload = { uid };
  
      jwt.sign(
        payload,
        process.env.SECRETORPRIVATEKEY,
        {
          expiresIn: "24h",

        },
        (err, token) => {
          if (err) {
            console.log(err);
            reject("Token cant be generated");
          } else {
            resolve(token);
          }
        }
      );
    });
  };
  

module.exports = {
    jwtGenerator
};

