'use client';

import { useEffect, useState } from 'react';

export default function DomainTestPage() {
  const [subdomain, setSubdomain] = useState('');
  useEffect(() => {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');

    setSubdomain(parts[0]);
  });

  return <div>Witaj na stronie {subdomain}!</div>;
}
