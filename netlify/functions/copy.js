exports.handler = async function (event) {
  try {
    const key = event.queryStringParameters["key"];
    const body = await (await fetch(`${process.env.KV_URL}?key=${key}`)).text();
    return { statusCode: 200, body };
  } catch (e) {
    return { statusCode: 500, body: `Something went wrong: "${e}"` };
  }
};
