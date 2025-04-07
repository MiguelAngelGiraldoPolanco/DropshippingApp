const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'myPassword123';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(hash);
}

hashPassword();
