import { useState, useCallback, useRef } from 'react';

export function useToast() {
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const timerRef = useRef(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToast({ message: '', type }), 3500);
  }, []);

  const clearToast = useCallback(() => setToast({ message: '', type: 'success' }), []);

  return { toast, showToast, clearToast };
}
