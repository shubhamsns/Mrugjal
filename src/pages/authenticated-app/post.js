import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

import { useAuth } from 'context/auth.context';
import { getPostWithMetaByPostId } from 'services/firebase';

import { Post } from 'components/timeline/post';

function PostPage() {
  const { postId } = useParams();
  const user = useAuth();

  const [postState, setPost] = useState(null);

  useEffect(() => {
    async function getPostData() {
      let post;

      if (user) {
        post = await getPostWithMetaByPostId(postId, user.uid);
      } else {
        post = await getPostWithMetaByPostId(postId, null);
      }

      if (post.user.userId) {
        setPost(post);

        document.title = `${post.user.userInfo.fullName} on Instagram: "${post.post.caption}"`;
      }
    }

    if (postId) {
      getPostData();
    }
  }, [postId, user]);

  return (
    <>
      <div className="container max-w-screen-lg px-3 mx-auto">
        {postState?.user.userId ? (
          <Post postData={postState} />
        ) : (
          <Skeleton count={1} height={550} />
        )}
      </div>
      {/* <BottomNavigation /> */}
    </>
  );
}

export { PostPage };
