import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiTrash2, FiShield } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useModal } from '../../hooks/useModal';

const Settings = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const deleteModal = useModal();
  const changePasswordModal = useModal();

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deletePassword, setDeletePassword] = useState('');

  // Change password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setDeleteLoading(true);
      setDeleteError('');

      // Validate password is entered
      if (!deletePassword) {
        setDeleteError('Please enter your password to confirm');
        setDeleteLoading(false);
        return;
      }

      const response = await fetch('/api/users/delete-account', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          password: deletePassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete account');
      }

      // Logout and redirect to home
      await logout();
      navigate('/');
    } catch (error) {
      setDeleteError(error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    setPasswordError('');
    setPasswordSuccess(false);

    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    try {
      setPasswordLoading(true);

      const response = await fetch('/api/users/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to change password');
      }

      setPasswordSuccess(true);

      // Close modal after 1.5 seconds
      setTimeout(() => {
        handleClosePasswordModal();
      }, 1500);

    } catch (error) {
      setPasswordError(error.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleClosePasswordModal = () => {
    changePasswordModal.close();
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setPasswordError('');
    setPasswordSuccess(false);
  };

  const Section = ({ title, icon, children }) => (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
        <div className="p-2 bg-white rounded-lg shadow-sm text-gray-600">
          {icon}
        </div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="p-6 space-y-6">
        {children}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your application preferences and account settings</p>
        </div>

        <Section title="Privacy & Security" icon={<FiShield className="w-5 h-5" />}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Change Password</h3>
              <p className="text-xs text-gray-500 mt-1">Update your account password</p>
            </div>
            <button
              onClick={changePasswordModal.open}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Update
            </button>
          </div>
        </Section>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="bg-red-50 rounded-xl p-6 border border-red-100">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <FiTrash2 className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-red-900">Delete Account</h3>
                <p className="text-sm text-red-700 mt-1">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <div className="mt-2 text-xs text-red-600">
                  Warning: This will permanently delete all your data including semester records and grades.
                </div>
                <button
                  onClick={deleteModal.open}
                  className="mt-4 px-4 py-2 bg-white border border-red-200 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Change Password Modal */}
      <Modal
        isOpen={changePasswordModal.isOpen}
        onClose={handleClosePasswordModal}
        title="Change Password"
        size="md"
      >
        {passwordError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
            {passwordError}
          </div>
        )}

        {passwordSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">
            Password changed successfully!
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            value={passwordData.currentPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
            placeholder="Enter your current password"
            required
            autoFocus
          />

          <Input
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
            placeholder="Enter new password (min 6 characters)"
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
            placeholder="Confirm new password"
            required
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClosePasswordModal}
              disabled={passwordLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={passwordLoading}
              disabled={passwordLoading || passwordSuccess}
              className="flex-1"
            >
              {passwordLoading ? 'Updating...' : 'Change Password'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Account Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => {
          deleteModal.close();
          setDeletePassword('');
          setDeleteError('');
        }}
        title="Delete Account"
        size="md"
      >
        <div className="space-y-4">
          {deleteError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {deleteError}
            </div>
          )}

          <div className="space-y-3">
            <p className="text-gray-900 font-medium">Are you absolutely sure?</p>
            <p className="text-sm text-gray-600">
              This action cannot be undone. This will permanently delete your account and remove all your data from our servers including:
            </p>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1 ml-2">
              <li>All your semester records</li>
              <li>Subject grades and CGPA history</li>
              <li>Profile information</li>
              <li>Account credentials</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
            <p className="text-sm text-yellow-800 font-medium">⚠️ Verification Required</p>
            <p className="text-xs text-yellow-700 mt-1">Enter your password to confirm account deletion</p>
          </div>

          <Input
            label="Password"
            type="password"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            placeholder="Enter your password to confirm"
            required
            autoFocus
          />

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => {
                deleteModal.close();
                setDeletePassword('');
                setDeleteError('');
              }}
              disabled={deleteLoading}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              disabled={deleteLoading || !deletePassword}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {deleteLoading ? 'Deleting...' : 'Yes, Delete My Account'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Settings;
