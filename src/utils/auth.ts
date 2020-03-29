import * as jwt from 'jsonwebtoken';

export async function getAccountId(authorization: any) {
  if (!authorization) return null;
  let token;
  const exp = await authorization.split(' ');
  if (exp && exp.length > 0) {
    token = exp[1];
  } else {
    return null;
  }

  const account: any = await jwt.decode(token);
  return account.id || account.sub;
}

export function getCompanyId(headers: any) {
  console.info('headers', JSON.stringify(headers));
  if (headers.realm) {
    return headers.realm;
  } else if (headers.Realm) {
    return headers.Realm;
  } else if (headers.company_id) {
    return headers.company_id;
  } else {
    return null;
  }
}
