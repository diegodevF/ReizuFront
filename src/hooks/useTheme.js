import { useState, useEffect } from 'react';

const getTheme = () => {
  if (typeof document !== 'undefined') {
    return document.documentElement.getAttribute('data-bs-theme') || 'light';
  }
  return 'light';
};

export default function useTheme() {
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(getTheme());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-bs-theme'],
    });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';
  return { theme, isDark };
}
