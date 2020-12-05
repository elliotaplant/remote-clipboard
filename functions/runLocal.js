const { createPaste, getPastes } = require('./requests/airtable');

async function main() {
  const createResponse = await createPaste('moo ' + Math.random());
  console.log('createResponse', createResponse);
}

main().catch(console.error);
