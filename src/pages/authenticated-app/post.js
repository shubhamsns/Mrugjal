import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';

import { useAuth } from 'context/auth.context';
import { getPostWithMetaByPostId } from 'services/firebase';

import { useQuery } from 'react-query';
import { Post } from 'components/post';

function PostPage() {
  const { postId } = useParams();
  const user = useAuth();

  const { isLoading, data } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => getPostWithMetaByPostId(postId, user.uid),
  });

  useEffect(() => {
    document.title = 'instagram';
  }, []);

  return (
    <div className="container max-w-screen-lg px-3 mx-auto">
      {isLoading ? (
        <Skeleton count={1} height={550} />
      ) : (
        <Post postData={data} />
      )}
    </div>
  );
}

export { PostPage };
