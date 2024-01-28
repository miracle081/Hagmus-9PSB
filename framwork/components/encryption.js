const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function comparePassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

// Example usage
const password = "wewillwin";

// Hashing the password
hashPassword(password)
  .then(hashedPassword => {
    console.log(hashedPassword);
    
    // Comparing the password with the hash
    comparePassword(password, hashedPassword)
      .then(isMatch => {
        console.log(isMatch); // Outputs: true
      })
      .catch(error => {
        console.log(error);
      });
  })
  .catch(error => {
    console.log(error);
  });