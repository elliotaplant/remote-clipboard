const { createPaste } = require('./requests/airtable');

exports.handler = async function(event) {
  console.log('event.body', event.body);

  try {
    await createPaste(event.body);
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*/*'
      },
      body: JSON.stringify({ message: `Created paste "${event.body}"` })
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*/*'
      },
      body: JSON.stringify({ message: `Something went wrong: "${e}"` })
    };
  }

};
