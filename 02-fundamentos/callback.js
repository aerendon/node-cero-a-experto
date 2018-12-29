// setTimeout(() => {
//   console.log('Hola Mundo');
// }, 3000);

let getUserById = (id, callback) => {
  let usuario = {
    nombre: 'Fernando',
    id
  }

  if (id === 20) {
    callback(`The user with id ${ id }, doesn't exist on DB`);
  } else {
    callback(null, usuario);
  }
}

getUserById(1, (err, user) => {
  if (err) {
    return console.log(err);
  }

  console.log('User from database ', user);
});