const Amadeus = require("amadeus");
const API = `api`;
// This is AMADEUS client for getting authToken that we need to make actual call to amadeus API
const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_KEY
  clientSecret: process.env.AMADEUS_SECRET
});

module.exports = {
  nonstop: async (destination) => {
    const response = await amadeus.client.get("/v1/reference-data/locations", {
      keyword,
      subType,
      "page[offset]": page * 10
    });
  },
  price: async (body) => {
    const { trip_id, card_id, action } = body;
    return pool.query(
      `INSERT INTO card_actions (trip_id, card_id, action) VALUES (${trip_id}, ${card_id}, '${action}')`
    );
  },
  generateQuestions: async (activity) => {
    try {
      console.log("inside openai");
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a travel agent." },
          { role: "user", content: `Top tourist questions and answers about ${activity.name} excluding cost, duration, and how to get there. Each question and answer should be one line.` },
        ],
        max_tokens: 250,
      });
      const response = completion.data.choices[0].message.content;
      const questions = response.split("\n")
      const tokenCount = completion.data.usage.total_tokens;
      console.log("Token count:", tokenCount);
      return questions;
    } catch (error) {
      console.error("An error occurred:", error);
      return [];
    }
  }
};