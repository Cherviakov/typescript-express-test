import crypto from 'crypto';

const alphabet = Array.from({ length: 74 }, (item:undefined, index:number) => String.fromCharCode(48 + index)).filter((c:string) => /[0-9a-zA-Z]/.test(c));

export const generateId = ():string => {
  return Array.from({ length: 16 }, () => {
    const numeral = parseInt(crypto.randomBytes(1).toString('hex'), 16) % alphabet.length;
    return alphabet[numeral];
  }).join('');
};
