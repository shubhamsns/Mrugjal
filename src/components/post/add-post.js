/* eslint-disable camelcase */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useMutation } from 'react-query';

import { Modal } from 'components/modal';
import { uploadUnsignedImage } from 'services/cloudinary';
import { createPost } from 'services/firebase';
import useDisclosure from 'hooks/use-disclosure';
import { CloudinaryImage } from 'components/cloudinary-image';

function AddPost({ userData }) {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const history = useHistory();

  const [uploadedImage, setUploadedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [postMessage, setPostMessage] = useState('');

  function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    setUploadedImage(file);

    reader.readAsDataURL(file);
    reader.onload = () => {
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readyState
      if (reader.readyState === 2) {
        setPreviewImage(reader.result);
      }
    };
  }

  function handleModalClose() {
    setPreviewImage(null);
    setUploadedImage(null);
    setPostMessage('');
    onClose();
  }

  const uploadPostDataMutation = useMutation((data) => createPost(data), {
    onSuccess: (_, variables) => {
      handleModalClose();
      history.push(`/p/${variables.photoId}`);
    },
  });

  const uploadImageMutation = useMutation(
    () => uploadUnsignedImage(uploadedImage, userData.username, 'post'),
    {
      onSuccess: ({ public_id, secure_url }) => {
        const postId = uuid();
        uploadPostDataMutation.mutate({
          caption: postMessage,
          comments: [],
          dateCreated: Date.now(),
          imageSrc: public_id,
          sourceURL: secure_url,
          likes: [],
          saved: [],
          photoId: postId,
          userId: userData.userId,
        });
      },
    },
  );

  const isUploadingImage =
    uploadImageMutation.isLoading || uploadPostDataMutation.isLoading;

  const isDisabled =
    postMessage.length < 1 || isUploadingImage || !previewImage;

  const handleNewPostSubmit = () => {
    uploadImageMutation.mutate();
  };

  return (
    <>
      <button
        title="add post"
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onToggle();
        }}
        type="button"
        aria-label="upload image"
        className="sm:mr-3.5 mr-2"
      >
        <svg
          className="w-7 text-black-light cursor-pointer active:text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </button>

      <Modal isOpen={isOpen} onClose={onClose} maxW="md">
        <div className="flex p-2 px-3.5">
          {userData.photoURL ? (
            <div className=" flex mr-5 min-w-max">
              <CloudinaryImage
                className="rounded-full h-12 w-12"
                src={userData.photoURL}
                alt={`${userData.username} profile`}
                size="80"
                type="profile"
              />
            </div>
          ) : (
            <svg
              className="w-8 mb-auto mx-2 mt-2 text-black-light cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
          <form
            className="w-full flex flex-col items-start"
            onSubmit={handleNewPostSubmit}
          >
            <textarea
              name="message"
              rows={3}
              placeholder="What's happening?"
              className="w-full focus:outline-none border-none focus:ring-0 pb-3 mt-2 text-lg overflow-y-hidden resize-none"
              onChange={({ target }) => setPostMessage(target.value)}
              value={postMessage}
            />
            {previewImage && (
              <img
                className="rounded-2xl mb-2 min-w-full max-h-80 object-contain bg-gray-100 shadow-sm"
                src={previewImage}
                alt="Uploaded preview"
              />
            )}
            <div className="pt-2 flex justify-between items-center w-full border-t border-gray-primary">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white"
              >
                <svg
                  className="w-7 text-black-light"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <input
                  id="file-upload"
                  name="file-upload"
                  accept="image/jpeg,image/png"
                  type="file"
                  className="sr-only"
                  onInput={handleImageUpload}
                />
              </label>

              <button
                type="submit"
                className={`font-bold text-blue-medium ${
                  isDisabled && 'opacity-25 cursor-default'
                } mr-1`}
                disabled={isDisabled}
                onClick={handleNewPostSubmit}
              >
                {isUploadingImage ? 'Uploading Post' : 'Post'}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

export { AddPost };
