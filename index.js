const crypto = require('crypto');

const password = 'Valantis';
const timeStamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const authString = (password + '_' + timeStamp);
const url = 'https://api.valantis.store:41000/';
const options = {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    "X-Auth": "cd0bfbcb48b87cbb908ce771120bb507"
  },
  body: JSON.stringify({
    action: "get_items",
    "params": {"ids": ["3ca71eb4-2045-4419-8b2d-138e2b2f4a14"]}
  })
};

fetch(url, options)
  .then(response => {
    if (response.status === 401) {
      throw new Error('Не авторизован');
    }
    return response.json();
  })
  .then(data => {console.log(data.result[0].price)})
  .catch(e => console.log(e));

console.log(typeof(timeStamp));
console.log(timeStamp);
console.log(authString);










































// const year = String(currentDate.getFullYear());
// const month = String(currentDate.getMonth() + 1).padStart(2, '0');
// const day = String(currentDate.getDate()).padStart(2, '0');
// console.log(month);
// console.log(currentDate);
// console.log(day);
// console.log(typeof(year));
// console.log(currentDate.toISOString().slice(0, 10).replace(/-/g,''));
