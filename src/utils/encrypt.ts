import * as crypto from 'crypto';
import * as uuid from 'uuid';

export function encryptPassword(password: string) {
  return crypto.createHmac('sha256', password).digest('hex');
}

export function generateToken() {
  const token = uuid.v4();
  return crypto.createHmac('sha256', token).digest('hex');
}