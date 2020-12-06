function makePaste(body) {
  const url = 'https://remote-clipboard.netlify.app/.netlify/functions/paste';
  const options = { method: 'POST', body };
  return fetch(url, options).then(r => r.json());
}

function getPaste() {
  return fetch('https://remote-clipboard.netlify.app/.netlify/functions/copy')
    .then(resp => resp.text());
}

window.makePaste = makePaste;
window.getPaste = getPaste;
