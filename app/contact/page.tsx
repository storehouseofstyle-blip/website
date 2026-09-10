"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Contact</h1>
        <p className="text-slate-600 leading-relaxed mb-10">
          Pour toute question ou assistance, envoyez-nous un message en utilisant le formulaire ci-dessous.
        </p>

        {submitted ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-slate-700">
            Merci pour votre message ! Nous reviendrons vers vous sous 48h.
          </div>
        ) : (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-slate-700">Nom</label>
              <input
                value={formState.name}
                onChange={(event) => setFormState({ ...formState, name: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                type="text"
                placeholder="Votre nom"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                value={formState.email}
                onChange={(event) => setFormState({ ...formState, email: event.target.value })}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                type="email"
                placeholder="contact@exemple.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Message</label>
              <textarea
                value={formState.message}
                onChange={(event) => setFormState({ ...formState, message: event.target.value })}
                className="mt-2 h-36 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none"
                placeholder="Votre message"
                required
              />
            </div>
            <button
              type="submit"
              className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-slate-800"
            >
              Envoyer
            </button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}
