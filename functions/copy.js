const { getPaste, DEFAULT_USER_ID } = require('./requests/airtable');

exports.handler = async function(event) {
  console.log('event.body', event.body);

  try {
    const paste = await getPaste(DEFAULT_USER_ID);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: paste,
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: `Something went wrong: "${e}"`
    };
  }
};
