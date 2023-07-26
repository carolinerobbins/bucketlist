const models = require("./models");

module.exports = {
  nonstop: async (req,res) => {
    try {
      const { departure } = req.query;
      let data = await models.nonstop(departure);
      res.send(data);
    }catch (err) {
      res.status(501).send("Cannot get nonstop flights")
    }
  },

  price: async (req, res) => {
    try {
      const { origin, destination } = req.query;
      let data = await models.price(origin, destination);
      console.log(data);
      res.send(data);
    }catch (err) {
      res.status(501).send("Cannot get prices")
    }
  },
}