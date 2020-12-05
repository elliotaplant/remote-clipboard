const https = require('https');

module.exports = function request(method, url, headers = {}, body = null) {
  if (!['get', 'post', 'head'].includes(method)) {
    throw new Error(`Invalid method: ${method}`);
  }

  let urlObject;

  try {
    urlObject = new URL(url);
  } catch (error) {
    throw new Error(`Invalid url ${url}`);
  }

  if (body && method !== 'post') {
    throw new Error(
      `Invalid use of the body parameter while using the ${method.toUpperCase()} method.`
    );
  }

  const options = {
    method: method.toUpperCase(),
    hostname: urlObject.hostname,
    port: urlObject.port,
    path: urlObject.pathname,
    headers,
  };

  if (body) {
    if (typeof body !== 'string') {
      body = JSON.stringify(body);
      options.headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };
    }

    options.headers = {
      'Content-Length': Buffer.byteLength(body),
      ...options.headers,
    };
  }

  return new Promise((resolve, reject) => {
    const clientRequest = https.request(options, incomingMessage => {
      // Response object.
      const response = {
        statusCode: incomingMessage.statusCode,
        headers: incomingMessage.headers,
        body: []
      };

      // Collect response body data.
      incomingMessage.on('data', chunk => {
        response.body.push(chunk);
      });

      // Resolve on end.
      incomingMessage.on('end', () => {
        if (response.body.length) {
          response.body = response.body.join();

          try {
            response.body = JSON.parse(response.body);
          } catch (error) {
            // Silently fail if response is not JSON.
          }
        }

        resolve(response);
      });
    });

    // Reject on request error.
    clientRequest.on('error', error => {
      reject(error);
    });

    // Write request body if present.
    if (body) {
      clientRequest.write(body);
    }

    // Close HTTP connection.
    clientRequest.end();
  });
};
