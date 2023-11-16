import { useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToHashElement = () => {
  const location = useLocation();

  const hashElement = useMemo(() => {
    const { hash } = location;
    const removeHashCharacter = (str: string) => {
      return str.slice(1);
    };

    if (hash) {
      return document.getElementById(removeHashCharacter(hash));
    }
    return null;
  }, [location]);

  useEffect(() => {
    if (hashElement) {
      hashElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest',
      });
    }
  }, [hashElement]);

  return null;
};
