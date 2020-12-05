const request = require('./request');
const { AIRTABLE_API_KEY, PASTES_TABLE_ID } = process.env;

const API_ROOT = `https://api.airtable.com/v0/${PASTES_TABLE_ID}/Table%201`;
const authHeader = { Authorization: `Bearer ${AIRTABLE_API_KEY}` };
const DEFAULT_USER_ID = 1;

async function getPastes(user_id) {
  const resp = await request(
    'get',
    `${API_ROOT}?maxRecords=3&view=Grid%20view&filterByFormula=%28%7Buser_id%7D%20%3D%20${user_id}%29`,
    authHeader
  );
  return resp;
}

async function createPaste(text) {
  await getPastes(DEFAULT_USER_ID);
  console.log('done getting pastes');
  const body = JSON.stringify({ records: [{ fields: { paste: text, user_id: DEFAULT_USER_ID } }] });
  const headers = { ...authHeader, 'Content-Type': 'application/json' };

  return request('post', API_ROOT, headers, body);
}

module.exports = {
  createPaste
};
