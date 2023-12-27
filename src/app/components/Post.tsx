import { PostProps, PostType } from '@/types';
import Image from "next/image";


const Post = (props: PostProps) => {
  const { post } = props

  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Image
            className="w-10 h-10 rounded-full mr-2"
            src="https://via.placeholder.com/150"
            alt="User Avatar"
            width={40}
            height={40}
            layout="fixed"
          />
          <div>
            <h2 className="font-semibold text-md">{post.author?.username}</h2>
            <p className="text-gray-500 text-sm">{post.createAt}</p>
          </div>
        </div>
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
