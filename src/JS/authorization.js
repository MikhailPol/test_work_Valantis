import md5 from 'md5';


export function authRequest() {
  const password = "Valantis";
  const timeStamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const authString = `${password}_${timeStamp}`;
  return md5(authString);
};



