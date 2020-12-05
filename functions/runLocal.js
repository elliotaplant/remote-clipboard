const { createPaste, getPastes } = require('./requests/airtable');

async function main() {
  const createResponse = await createPaste('moo ' + Math.random());
  console.log('createResponse', createResponse);
  // const getResponse = await getPastes(2);
  // console.log('getResponse', getResponse.records);
}

main().catch(console.error);
