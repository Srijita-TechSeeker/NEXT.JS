'use client';

import React from 'react';
import EditProfileForm from './editprofile-form';
import ChangePasswordForm from './changepassword-form';
import DeleteAccountForm from './deleteaccount-form';

const SettingsPage = () => {
  const userId = 1; // Temporary fallback

  return (
    <div
      className="min-h-screen p-6 bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200 flex items-start justify-center"
    >
      <div className="w-full max-w-4xl space-y-10 bg-white/30 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-white/40">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg text-center">⚙️ Settings</h1>

        <div className="space-y-8">
          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-md border border-white/30">
            <EditProfileForm />
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-md border border-white/30">
            <ChangePasswordForm />
          </div>

          <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg shadow-md border border-white/30">
            <DeleteAccountForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
