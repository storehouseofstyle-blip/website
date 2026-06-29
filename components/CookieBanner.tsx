"use client";
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookies_accepted');
    if (!accepted) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem('cookies_accepted', '1');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed left-4 right-4 bottom-4 z-50 bg-white border border-slate-200 rounded-lg p-4 shadow-lg">
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm text-slate-700">Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre politique.</div>
        <div className="flex items-center gap-2">
          <a href="/parametres-des-cookies" className="text-sm text-slate-600 hover:underline">Paramètres</a>
          <button onClick={accept} className="bg-slate-900 text-white px-3 py-2 rounded">Accepter</button>
        </div>
      </div>
    </div>
  );
}
