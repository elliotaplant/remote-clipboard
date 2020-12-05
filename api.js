function makePaste(body) {
  let url = '/.netlify/functions/paste';
  let options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body,
  };
  if (location.host === '') {
    url = 'https://remote-clipboard.netlify.app' + url;

    options = {
      ...options,
      mode: 'no-cors', // no-cors, *cors, same-origin
      credentials: 'omit', // include, *same-origin, omit
    };
  }

  return fetch(url, options).then(r => r.json());
}

function getPaste() {
  let url = '/.netlify/functions/copy';
  let options = {};
  if (location.host === '') {
    url = 'https://remote-clipboard.netlify.app' + url;

    options = {
      mode: 'no-cors', // no-cors, *cors, same-origin
      credentials: 'omit', // include, *same-origin, omit
    };
  }

  return fetch(url, options).then(r => r.json());
}

window.makePaste = makePaste;
window.getPaste = getPaste;
