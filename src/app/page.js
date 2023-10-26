'use client'

import Link from 'next/link';
import Navbar from '@/components/Navbar';

function Public() {
  const content = (
    <section>
      <header>
        <h1>Welcome to Path Buddy!</h1>
      </header>
      <main>
        <p>Your one-stop shop for crafting and executing your path!</p>
      </main>
      <Link href="/login">
        Login
      </Link>
    </section>
  );

  return content;
}

export default Public;
