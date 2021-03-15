import { firebaseApp, FieldValue } from 'lib/firebase';

async function doesUsernameExist(username) {
  const result = await firebaseApp
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

  return result.docs.map((user) => user.data().length > 0);
}

async function getUserByUserId(userId) {
  const result = await firebaseApp
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

async function getSuggestedProfiles(userId, following) {
  const result = await firebaseApp
    .firestore()
    .collection('users')
    .limit(10)
    .get();

  const suggestions = result.docs
    .map((item) => ({ ...item.data(), docId: item.id }))
    .filter(
      (item) => item.userId !== userId && !following.includes(item.userId),
    );

  return suggestions;
}

async function updateLoggedInUserFollowing(
  loggedInUserId,
  profileId,
  isFollowingProfile,
) {
  return firebaseApp
    .firestore()
    .collection('users')
    .doc(loggedInUserId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

async function updateFollowedUserFollowers(
  suggestedProfileDocId,
  loggedInUserDocId,
  isFollowingProfile,
) {
  return firebaseApp
    .firestore()
    .collection('users')
    .doc(suggestedProfileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    });
}

export {
  doesUsernameExist,
  getUserByUserId,
  getSuggestedProfiles,
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
};
