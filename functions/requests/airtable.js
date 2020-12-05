const request = require('./request');
const { AIRTABLE_API_KEY, PASTES_TABLE_ID } = process.env;

const API_ROOT = `https://api.airtable.com/v0/${PASTES_TABLE_ID}/Table%201`;
const authHeader = { Authorization: `Bearer ${AIRTABLE_API_KEY}` };
const DEFAULT_USER_ID = 1;

async function getPastes(user_id) {
  const resp = await request(
    'get',
    `${API_ROOT}?maxRecords=10&view=Grid%20view&filterByFormula=%28%7Buser_id%7D%20%3D%20${user_id}%29`,
    authHeader
  );
  return resp.body;
}

async function deletePastes(recordIds) {
  console.log('deleting pastes', recordIds.join(', '));
  const resp = await request(
    'delete',
    `${API_ROOT}?${recordIds.map(r => `records[]=${r}`).join('&')}`,
    authHeader
  );
  return resp.body;
}

async function createPaste(text) {
  const { records } = await getPastes(DEFAULT_USER_ID);
  console.log('Founds pastes', records);
  if (records && records.length) {
    await deletePastes(records.map(r => r.id));
  }
  console.log('creating new paste', text);
  const body = JSON.stringify({ records: [{ fields: { paste: text, user_id: DEFAULT_USER_ID } }] });
  return request('post', API_ROOT, authHeader, body);
}

module.exports = {
  createPaste,
  getPastes,
};
