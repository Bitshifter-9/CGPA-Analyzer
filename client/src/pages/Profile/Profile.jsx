import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { FiUser, FiMail, FiBook, FiAward, FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || 'Computer Science Student | CGPA Enthusiast',
    university: user?.university || 'University of Technology',
    graduationYear: user?.graduationYear || '2025'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically call an API to update the user profile
    console.log('Updated profile:', formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-colors duration-200">
          {/* Header / Cover */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
            <div className="absolute -bottom-12 left-8">
              <div className="w-24 h-24 bg-white rounded-2xl p-1 shadow-lg">
                <div className="w-full h-full bg-white rounded-xl flex items-center justify-center text-black text-3xl font-bold border-2 border-gray-200">
                  {user?.username?.slice(0, 2).toUpperCase() || 'US'}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-16 pb-8 px-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{formData.username}</h1>
                <p className="text-gray-500">{formData.email}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isEditing
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    : 'bg-white text-black hover:bg-gray-100'
                  }`}
              >
                {isEditing ? (
                  <>
                    <FiX className="w-4 h-4" /> Cancel
                  </>
                ) : (
                  <>
                    <FiEdit2 className="w-4 h-4" /> Edit Profile
                  </>
                )}
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Username</label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all bg-white text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">University</label>
                    <div className="relative">
                      <FiBook className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        name="university"
                        value={formData.university}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all bg-white text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Graduation Year</label>
                    <div className="relative">
                      <FiAward className="absolute left-3 top-3 text-gray-400" />
                      <input
                        type="text"
                        name="graduationYear"
                        value={formData.graduationYear}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all bg-white text-gray-900"
                      />
                    </div>
                  </div>

                  <div className="col-span-full space-y-2">
                    <label className="text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-white focus:border-transparent outline-none transition-all resize-none bg-white text-gray-900"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm hover:shadow-md"
                  >
                    <FiSave className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">About</h3>
                    <p className="text-gray-700 leading-relaxed">{formData.bio}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Academic Info</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-700">
                        <FiBook className="w-5 h-5 text-gray-400" />
                        <span>{formData.university}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-700">
                        <FiAward className="w-5 h-5 text-gray-400" />
                        <span>Class of {formData.graduationYear}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Account Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-transparent">
                      <div className="text-2xl font-bold text-gray-900">8</div>
                      <div className="text-xs text-gray-500 mt-1">Semesters</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-transparent">
                      <div className="text-2xl font-bold text-gray-900">3.8</div>
                      <div className="text-xs text-gray-500 mt-1">Current CGPA</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-transparent">
                      <div className="text-2xl font-bold text-gray-900">42</div>
                      <div className="text-xs text-gray-500 mt-1">Courses</div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-transparent">
                      <div className="text-2xl font-bold text-gray-900">126</div>
                      <div className="text-xs text-gray-500 mt-1">Credits</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
