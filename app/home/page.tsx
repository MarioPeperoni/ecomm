'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleRedirect = (e: any) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.replace(
        process.env.NEXT_PUBLIC_VERCEL_ENV
          ? `https://${inputValue}`
          : `http://${inputValue}.localhost:3000`
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleRedirect}>
        <input
          type="text"
          placeholder="Enter subdomain"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Go</button>
      </form>
    </div>
  );
}
