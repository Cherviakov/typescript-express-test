import crypto from 'crypto';

export const hash = (payload:string) => {
  const h = crypto.createHash('sha512WithRSAEncryption');
  h.update(payload);
  return h.digest('hex');
}
