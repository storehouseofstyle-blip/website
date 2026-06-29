"use client";
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Contact</h1>
        <p className="text-slate-600 mb-4">Pour toute question commerciale ou demande presse :</p>
        <ul className="text-slate-600 mb-6">
          <li>Tél : <a href="tel:+33123456789" className="underline">+33 1 23 45 67 89</a></li>
          <li>Email : <a href="mailto:contact@houseofstyle.example" className="underline">contact@houseofstyle.example</a></li>
        </ul>

        <form className="space-y-4 max-w-xl" onSubmit={(e) => { e.preventDefault(); alert('Message envoyé (simulation)'); }}>
          <div>
            <label className="block text-sm text-slate-700 mb-1">Nom</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-slate-200 rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">Email</label>
            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-slate-200 rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">Message</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full border border-slate-200 rounded px-3 py-2 h-32" />
          </div>

          <div>
            <button type="submit" className="bg-slate-900 text-white px-4 py-2 rounded">Envoyer</button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
