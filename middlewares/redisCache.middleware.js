const redisClient = require("../clients/redis.client");
let endpointTo

function requestToKey(req){
  var key = []
  const elements = url.split('/');
  const root = elements[1];
  key.push(root)
  key.push(req.url)
  var redisKey = key.join('-');
  return redisKey
}
function isRedisWorking() {
  //force unwrap redisClient
  return !!redisClient?.isOpen;
}

async function writeData(key, data, options) {
  if (isRedisWorking()) {
    try {
      await redisClient.set(key, data, options);
    } catch (e) {
      console.error(`Failed to cache data for key=${key}`, e);
    }
  }
}

async function readData(key) {
  let cachedValue = undefined;

  if (isRedisWorking()) {
    cachedValue = await redisClient.get(key);
    if (cachedValue) return cachedValue;
  }
}
function redisCacheMiddleware(
  options = {
    EX: 60 * 60 * 6, // 6h
  }
) {
  return async (req, res, next) => {
    if (req.method === "GET" && isRedisWorking()) {
      console.debug("caching res");
      const key = requestToKey(req);
      // if there is some cached data, retrieve it and return it
      const cachedValue = await readData(key);
      var valideCachedValue = true
      if (cachedValue && valideCachedValue) {
        try {
          // if it is JSON data, then return it
          return res.json(JSON.parse(cachedValue));
        } catch {
          // if it is not JSON data, then return it
          return res.send(cachedValue);
        }
      } else {
        // override how res.send behaves
        // to introduce the caching logic
        //TODO : refactor this
        const oldSend = res.send;
        res.send = function (data) {
          // set the function back to avoid the 'double-send' effect
          res.send = oldSend;

          // cache the response only if it is successful
          if (res.statusCode.toString().startsWith("2")) {
            writeData(key, data, options).then();
          }

          return res.send(data);
        };

        // continue to the controller function
        next();
      }
    } else {
      // proceed with no caching
      next();
    }
  };
}
module.exports = { redisCacheMiddleware };
