const cache = {};

export async function cachedFetch(key, fn, ttl = 3600000) {
  if (cache[key] && Date.now() - cache[key].time < ttl) {
    return cache[key].data;
  }

  const data = await fn();

  cache[key] = {
    data,
    time: Date.now(),
  };

  return data;
}
