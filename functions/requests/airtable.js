const request = require('./request');
const { AIRTABLE_API_KEY, PASTES_TABLE_ID } = process.env;


module.exports = function createPaste(text) {
  return request(
    'post',
    `https://api.airtable.com/v0/${PASTES_TABLE_ID}/Table%201`,
    {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    JSON.stringify({ records: [{ fields: { paste: text } }] }),
  );
};
