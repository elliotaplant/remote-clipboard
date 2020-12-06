function makePaste(body) {
  const url = 'https://remote-clipboard.netlify.app/.netlify/functions/paste';
  let options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body,
  };

  if (location.host !== 'remote-clipboard.netlify.app') {
    options = {
      ...options,
      // mode: 'no-cors', // no-cors, *cors, same-origin
      credentials: 'omit', // include, *same-origin, omit
    };
  }

  return fetch(url, options).then(r => r.json());
}

function getPaste() {
  let url = '/.netlify/functions/copy';
  let options = {};

  // if (location.host !== 'remote-clipboard.netlify.app') {
  url = 'https://remote-clipboard.netlify.app' + url;

  options = {
    // mode: 'no-cors', // no-cors, *cors, same-origin
    credentials: 'omit', // include, *same-origin, omit
  };
  // }
  console.log('url', url);

  return fetch(url, options).then(resp => resp.text());
}

window.makePaste = makePaste;
window.getPaste = getPaste;
