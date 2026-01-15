'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteAccountForm() {
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch('/api/settings/delete', { method: 'DELETE' });

    if (res.ok) {
      alert('Account deleted');
      router.push('/signup'); // or home page
    } else {
      alert('Error deleting account');
    }
  };

  return (
    <div className="mt-6 bg-red-50 p-4 rounded border border-red-300">
      <h2 className="text-xl font-semibold text-red-800">Delete Account</h2>
      <p className="text-sm text-red-700 mb-2">This action cannot be undone.</p>
      {!confirm ? (
        <button
          onClick={() => setConfirm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete my account
        </button>
      ) : (
        <button
          onClick={handleDelete}
          className="bg-red-800 text-white px-4 py-2 rounded"
        >
          Confirm Delete
        </button>
      )}
    </div>
  );
}
