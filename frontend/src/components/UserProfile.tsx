import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { logout } from '../redux/authSlice';

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) {
    return null;
  }

  return (
    <div className="bg-slate-800/70 border-b border-slate-700">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-9 h-9 flex items-center justify-center text-white font-bold mr-3 shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-white font-medium text-sm">{user.name}</p>
            <p className="text-slate-400 text-xs">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-slate-300 hover:text-white text-sm bg-slate-700 hover:bg-slate-600 px-4 py-1.5 rounded-md transition-colors shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile; 