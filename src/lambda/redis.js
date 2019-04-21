const redis = require('redis');

const [host, port] = process.env.REDIS_HOST.split(':');

const client = redis.createClient({
  port,
  host,
  password: process.env.REDIS_KEY
});

exports.handler = function(event, context, callback) {
  console.log(event, context)

  client.set("string key 22 2 2 2", "string val", redis.print);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: 'ok lets kill that secret' })
  })
}