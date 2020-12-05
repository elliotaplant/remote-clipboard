const createPaste = require('./requests/airtable');

exports.handler = async function(event) {
  console.log('event.body', event.body);

  try {
    const airtableResponse = await createPaste(event.body);
    console.log('airtableResponse', airtableResponse);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Created paste "${event.body}"` })
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Something went wrong: "${e}"` })
    };
  }

};
