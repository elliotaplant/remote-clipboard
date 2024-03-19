exports.handler = async function (event) {
  try {
    const key = event.queryStringParameters["key"];
    await fetch(`${process.env.KV_URL}?key=${key}`, {
      method: "PUT",
      body: event.body,
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Created paste" }),
    };
  } catch (e) {
    return { statusCode: 500, body: `Something went wrong: "${e}"` };
  }
};
