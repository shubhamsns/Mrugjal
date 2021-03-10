import { firebaseApp, FieldValue } from 'lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebaseApp
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}
