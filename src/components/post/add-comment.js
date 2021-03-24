import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { addPostComments } from 'services/firebase';
import { useAuth } from 'context/auth.context';

function AddComment({ setPostComments, commentInputRef, postDocId }) {
  const [newCommentValue, setNewCommentValue] = useState('');
  const user = useAuth();

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (newCommentValue.length) {
      const newComment = {
        commentId: uuid(),
        userId: user.uid,
        comment: newCommentValue,
        username: user.displayName,
        photoURL: user.photoURL,
        dateCreated: Date.now(),
      };

      setPostComments((currentComments) => [newComment, ...currentComments]);
      setNewCommentValue('');

      addPostComments(postDocId, newComment);
    }
  };

  return (
    <div className="border-t border-gray-200 mt-2">
      <form
        className="flex justify-between pl-0 px-5"
        method="POST"
        onSubmit={handleSubmitComment}
      >
        <input
          type="text"
          aria-label="Add a new comment"
          autoComplete="off"
          className="text-sm text-gray-base border-none focus:ring-0 w-full mr-3 py-5 px-4"
          name="add-comment"
          placeholder="Add a comment..."
          value={newCommentValue}
          onChange={({ target }) => setNewCommentValue(target.value)}
          ref={commentInputRef}
        />
        <button
          type="submit"
          className={`text-sm font-bold text-blue-medium ${
            newCommentValue.length < 1 && 'opacity-25 cursor-default'
          }`}
          disabled={newCommentValue.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export { AddComment };
