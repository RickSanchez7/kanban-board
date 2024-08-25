import { useEffect, useRef } from 'react';

export function useOutsideClick(
  handler: () => void,
  listeningCapturing = true
) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(e: Event) {
      if (ref.current && !ref.current?.contains(e.target as Node | null)) {
        handler();
      }
    }

    document.addEventListener('click', handleClick, listeningCapturing);

    return () =>
      document.removeEventListener('click', handleClick, listeningCapturing);
  }, [handler, listeningCapturing]);

  return { ref };
}
