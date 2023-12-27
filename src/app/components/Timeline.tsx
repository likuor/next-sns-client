'use client'

import apiClient from '@/libs/apiClient';
import Post from './Post';
import { useEffect, useState } from 'react';
import { PostType } from '@/types';

const Timeline = () => {
  const [postText, setPostText] = useState<string>('')
  const [latestPosts, setLatestPosts] = useState<PostType[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const newpost = await apiClient.post("/posts/post", {
        content: postText,
      });
      setLatestPosts((prevPosts) => [newpost.data, ...prevPosts])
      setPostText('')

    } catch (error) {
      alert('Please login first')
    }
  }

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await apiClient.get('posts/get_latest_post')
        setLatestPosts(response.data)
      } catch (error) {
        console.error(error);
      }
    }

    fetchLatestPosts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="What's on your mind?"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPostText(e.target.value)}
              value={postText}
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
            >
              Post
            </button>
          </form>
        </div>
      </main>
      {latestPosts.map((post: PostType) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Timeline;
