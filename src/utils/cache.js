const cache = {};
const pending = {};

export async function cachedFetch(key, fn, ttl = 3600000) {
  const now = Date.now();

  if (cache[key] && now - cache[key].time < ttl) {
    return cache[key].data;
  }

  if (pending[key]) {
    return pending[key];
  }

  pending[key] = fn()
    .then((data) => {
      cache[key] = {
        data,
        time: Date.now(),
      };
      delete pending[key];
      return data;
    })
    .catch((err) => {
      delete pending[key];
      throw err;
    });

  return pending[key];
}
