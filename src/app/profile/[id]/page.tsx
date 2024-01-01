import apiClient from '@/libs/apiClient';
import { ProfileProps, PostType } from '@/types';
import Image from "next/image";

// SSR
const getProfile = async (userId: string) => {
  try {
    const profileResponse = await apiClient.get(`/users/profile/${userId}`);
    const postsResponse = await apiClient.get(`/posts/${userId}`);
    return {
      profile: profileResponse.data,
      posts: postsResponse.data
    };
  } catch (error) {
    throw new Response('Not Found', { status: 404 });
  }
}

const Profile = async ({ params }: ProfileProps) => {
  const userData = await getProfile(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex items-center">
            <Image
              className="w-20 h-20 rounded-full mr-4"
              alt="User Avatar"
              src={userData.profile.profileImageUrl}
              width={40}
              height={40}
            />
            <div>
              <h2 className="text-2xl font-semibold mb-1">{userData.profile.user.username}</h2>
              <p className="text-gray-600">{userData.profile.bio}</p>
            </div>
          </div>
        </div>
        {userData.posts.map((post: PostType) => (
          <div className="bg-white shadow-md rounded p-4 mb-4" key={post.id}>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Image
                  className="w-10 h-10 rounded-full mr-2"
                  alt="User Avatar"
                  src={userData.profile.profileImageUrl}
                  width={40}
                  height={40}
                />
                <div>
                  <h2 className="font-semibold text-md">{post.author.username}</h2>
                  <p className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</p>
                </div>
              </div>
              <p className="text-gray-700">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;

