const { createPaste, getPaste, DEFAULT_USER_ID } = require('./requests/airtable');

async function main() {
  // const getREsp = await getPaste(DEFAULT_USER_ID);
  // console.log('getREsp', getREsp);
  // // const createResponse = await createPaste('moo ' + Math.random());
  // console.log('createResponse', createResponse);
}

main().catch(console.error);
