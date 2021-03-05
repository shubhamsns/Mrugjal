/* eslint-disable no-plusplus */
function seedDatabase(firebase) {
  const users = [
    {
      userId: '1',
      username: 'tanjiro',
      fullName: 'Kamado Tanjiro',
      emailAddress: 'kamadotanjiro@kny.com',
      following: ['fo6a3TmYKkSE6EaLR25JN0rJjyu2'],
      followers: ['2', '3', '4'],
      dateCreated: Date.now(),
    },
    {
      userId: '2',
      username: 'nezuko',
      fullName: 'Nezuko Kamado',
      emailAddress: 'nezukokamado@kny.com',
      following: [],
      followers: ['fo6a3TmYKkSE6EaLR25JN0rJjyu2'],
      dateCreated: Date.now(),
    },
    {
      userId: 'fo6a3TmYKkSE6EaLR25JN0rJjyu2',
      username: 'zenitsu',
      fullName: 'Zenitsu Agatsuma',
      emailAddress: 'zenitsuagatsuma@kny.com',
      following: [],
      followers: ['1'],
      dateCreated: Date.now(),
    },
    {
      userId: '4',
      username: 'giyu',
      fullName: 'Giyu Tomioka',
      emailAddress: 'gityutomioka@kny.com',
      following: [],
      followers: ['fo6a3TmYKkSE6EaLR25JN0rJjyu2'],
      dateCreated: Date.now(),
    },
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection('users').add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection('photos')
      .add({
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/tanjiro/${i}.jpg`,
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'giyu',
            comment: 'stop making faces!',
          },
          {
            displayName: 'nezuko',
            comment: 'Stay safe.',
          },
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now(),
      });
  }
}

export { seedDatabase };
