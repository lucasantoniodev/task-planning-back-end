import * as admin from 'firebase-admin';
import { getEnv } from '../commons/get-env';

admin.initializeApp({
  credential: admin.credential.cert({
    privateKey: getEnv('FIREBASE_PRIVATE_KEY'),
    clientEmail: getEnv('FIREBASE_CLIENT_EMAIL'),
    projectId: getEnv('FIREBASE_PROJECT_ID'),
  }),
});

export { admin };
