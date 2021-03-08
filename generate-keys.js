const { accessSync, writeFileSync, constants } = require('fs');
const path = require('path');
const { generateKeyPairSync } = require('crypto');

const isProd = process.env.NODE_ENV === 'production';
const rootPath = __dirname;

const generateKeys = (keyName) => {
  try {
    if (!isProd && !areKeysExists(keyName)) {
      const { privateKey, publicKey } = generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: 'pkcs1',
          format: 'pem'
        },
        privateKeyEncoding: {
          type: 'pkcs8',
          format: 'pem'
        }
      });
      writeFileSync(path.join(rootPath, keyName), privateKey, {
        mode: '644'
      });
      writeFileSync(path.join(rootPath, `${keyName}.pub`), publicKey, {
        mode: '644'
      });
    }
  } catch (err) {
    console.error('keys generation failed', err);
  }
}

const areKeysExists = (keyName) => {
  return isPrivateKeyExists(keyName) || isPublicKeyExists(keyName);
}

const isPrivateKeyExists = (keyName) => {
  try {
    accessSync(path.join(rootPath, keyName), constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

const isPublicKeyExists = (keyName) => {
  try {
    accessSync(path.join(rootPath, `${keyName}.pub`), constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

generateKeys('server-jwt');
