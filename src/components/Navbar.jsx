'use client'

import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/app/contexts/AuthProvider';
import { useNotificationContext } from '@/app/contexts/NotificationProvider';
import AuthenticatedNav from './AuthenticatedNav'
import PublicNav from './PublicNav';


function Navbar() {
  const { user } = useAuthContext();

  if (user) {
    return (
      <AuthenticatedNav user={user} />
    );
  } else {
    return (
      <PublicNav />
    )
  }
}

export default Navbar;
