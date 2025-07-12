'use client';
import { useEffect, useState } from 'react';

export default function Error() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1000); // ⏱ hide after 2 seconds
    return () => clearTimeout(timer); // cleanup
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg z-50">
      Success
    </div>
  );
}
