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
      await this.client.set(key, serializedData, {
        EX: 60 * 60 /*expire in 1hr seconds*/,
      });
    } catch (e) {
      console.error(`Failed to cache data for key=${key}`, e);
    }
  }

  async getCached(key, options = { EX: 60 * 60 /*expire in 1hr seconds*/ }) {
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

  async invalidateKey(key) {
    console.debug("invalidated key", key);
    this.client.del(key, (err, result) => {
      if (err) {
        console.error("Error:", err);
      } else {
        console.log(
          "Key deleted:",
          result === 1 ? "successfully" : "not found"
        );
      }
    });
  }
}

const client = RedisClient.getInstance();
module.exports = client;
