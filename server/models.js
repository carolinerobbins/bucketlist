const Amadeus = require("amadeus");
// This is AMADEUS client for getting authToken that we need to make actual call to amadeus API
const amadeus = new Amadeus({
  clientId: "yGFVWbtERT1CGjvk37TAdm7tBEmGNV9c",
  clientSecret: "UfXRFWj08sZWrJOo",
});

module.exports = {
  nonstop: async (destination) => {
    try {
      const response = await amadeus.airport.directDestinations.get({
        departureAirportCode: destination,
      });
      const locations = response.data;
      const iataCodes = locations.map((location) => location.iataCode);
      return iataCodes;
    } catch (error) {
      console.error("Error fetching direct destinations:", error);
      return null;
    }
  },
  price: async (origin, destination) => {
    try {
      console.log(origin, destination)
      const response = await amadeus.shopping.flightDates.get({
        origin : `${origin}`,
        destination : `${destination}`
      })
      const prices = response.data;
      return prices;
    } catch (error) {
      console.error("Error fetching direct destinations:", error);
      return null;
    }
  },
};

