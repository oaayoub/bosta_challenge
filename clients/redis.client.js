const { createClient } = require("redis");
const InternalError = require("../Error/InternalServer.error");
require("dotenv").config();

class RedisClient {
  static #instance = null;

  constructor() {
    if (RedisClient.#instance) {
      return RedisClient.#instance;
    }
    this.client = createClient({
      url: "redis://redis:6379",
    });
    RedisClient.#instance = this;
  }

  async writeData(key, data) {
    try {
      console.debug("📝📝 writeData");
      const serializedData = JSON.stringify(data); // Serialize data if needed
      await this.client.set(key, serializedData,{ EX: 60/*expire in 60 seconds*/ });
    } catch (e) {
      console.error(`Failed to cache data for key=${key}`, e);
    }
  }

  async getCached(key, options = { EX: 60/*expire in 60 seconds*/ }) {
    console.debug("caching res");
    const cachedValue = await this.client.get(key);
    console.debug("📝📝 getCached cachedValue", cachedValue);
    return cachedValue;
  }

  static getInstance() {
    if (!RedisClient.#instance) {
      console.debug("📝📝 getInstance ");
      RedisClient.#instance = new RedisClient();
    }
    return RedisClient.#instance;
  }
}

const client = RedisClient.getInstance();
module.exports = client;
