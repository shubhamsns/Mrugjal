import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Header } from './header';

function Post({ postData }) {
  console.log(postData);
  // const {
  //   imageSrc,
  //   caption,
  //   comments,
  //   docId,
  //   photoId,
  //   likes,
  //   dateCreated,
  // } = postData.post;
  // header
  // image
  // actions (like and commets)

  return (
    <div>
      <Header />
      {/* <img src={content.imageSrc} alt="imgae" /> */}
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.shape({
    caption: PropTypes.string,
    comments: PropTypes.array,
    dateCreated: PropTypes.number,
    docId: PropTypes.string,
    imageSrc: PropTypes.string,
    likes: PropTypes.array,
    photoId: PropTypes.string,
    saved: PropTypes.array,
    user: PropTypes.shape({
      username: PropTypes.string,
      docId: PropTypes.string,
    }),
    userId: '3',
    userLikedPhoto: PropTypes.bool,
  }),
};

export { Post };
