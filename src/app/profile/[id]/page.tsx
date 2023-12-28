import apiClient from '@/libs/apiClient';
import { ProfileProps } from '@/types';

export const getProfile = async (userId: string) => {
  try {
    const profileResponse = await apiClient.get(`/users/profile/${userId}`);
    return profileResponse.data;
  } catch (error) {
    console.error(error);
    throw new Response('Not Found', { status: 404 });
  }
}

const Profile = async ({ params }: ProfileProps) => {
  const profile = await getProfile(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex items-center">
            <img className="w-20 h-20 rounded-full mr-4" alt="User Avatar" src={profile.profileImageUrl} />
            <div>
              <h2 className="text-2xl font-semibold mb-1">{profile.user.username}</h2>
              <p className="text-gray-600">{profile.bio}</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded p-4 mb-4" >
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <img className="w-10 h-10 rounded-full mr-2" alt="User Avatar" src={profile.profileImageUrl} />
              <div>
                <h2 className="font-semibold text-md">{profile.user.username}</h2>
                <p className="text-gray-500 text-sm">2023/05/08</p>
              </div>
            </div>
            <p className="text-gray-700">はじめての投稿です。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

