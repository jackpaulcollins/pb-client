import Link from "next/link";
import { Disclosure } from '@headlessui/react';

function PublicNav() {

  const activeLink = (linkIdentifier) => {
    const path  = window.location.pathname;
    return (linkIdentifier === path);
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  href="/login"
                  className={activeLink('/dashboard/my-path') ? 'bg-gray-900 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white' : 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={activeLink('/register') ? 'bg-gray-900 rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white' : 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}

export default PublicNav;