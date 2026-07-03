function fetchWithTimeout(url, ms, callback) {
  fetch(url, (err, data) => {
    callback(null, data);
  });

  setTimeout(() => callback("Request Timed Out"), ms);
}
