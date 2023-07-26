const models = require("./models");

module.exports = {
  nonstop: async (req,res) => {
    try {


    }catch (err) {
      res.status(501).send("Cannot get cards")
    }
  },

  price: async (req, res) => {
    try{
      console.log("controller req.body: ", req.body)
      let response = await models.post(req.body);
      res.status(201).send("card added");
    } catch (err) {
      res.status(501).send("Cannot add card action")
    }
  },
}