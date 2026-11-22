import { useState } from 'react';
import api, { getApiError } from '../services/api';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ error: '', success: '' });
  const [busy, setBusy] = useState(false);
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  async function handleSubmit(event) {
    event.preventDefault(); setStatus({ error: '', success: '' });
    const payload = { name: form.name.trim(), email: form.email.trim().toLowerCase(), message: form.message.trim() };
    if (payload.name.length < 2 || payload.name.length > 80) return setStatus({ error: 'Name must be between 2 and 80 characters.', success: '' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email) || payload.email.length > 254) return setStatus({ error: 'Please enter a valid email address.', success: '' });
    if (payload.message.length < 10 || payload.message.length > 2000) return setStatus({ error: 'Message must be between 10 and 2000 characters.', success: '' });
    setBusy(true);
    try { await api.post('/contact', payload); setForm({ name: '', email: '', message: '' }); setStatus({ error: '', success: 'Your message has been sent successfully.' }); }
    catch (error) { setStatus({ error: getApiError(error), success: '' }); }
    finally { setBusy(false); }
  }
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-4 py-12">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-10 transition duration-300 ease-in-out">
        <h1 className="text-4xl font-extrabold text-center text-blue-600 dark:text-blue-400 mb-3">Contact Us</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-8">We'd love to hear from you. Let us know how we can help.</p>
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div><label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Full Name</label><input id="name" name="name" type="text" autoComplete="name" minLength={2} maxLength={80} required value={form.name} onChange={change} placeholder="Your full name" className="mt-2 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" /></div>
          <div><label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email Address</label><input id="email" name="email" type="email" autoComplete="email" maxLength={254} required value={form.email} onChange={change} placeholder="you@example.com" className="mt-2 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none transition" /></div>
          <div><label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Message</label><textarea id="message" name="message" minLength={10} maxLength={2000} required value={form.message} onChange={change} placeholder="Write your message..." className="mt-2 w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 h-32 resize-y focus:ring-2 focus:ring-blue-500 focus:outline-none transition" /></div>
          {status.error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{status.error}</p>}{status.success && <p role="status" className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">{status.success}</p>}
          <button disabled={busy} type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-sm transition disabled:opacity-60">{busy ? 'Sending…' : 'Send Message'}</button>
        </form>
        <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6 text-sm text-center text-gray-500 dark:text-gray-400"><p><strong>Email:</strong> <a href="mailto:support@storehub.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@storehub.com</a></p><p><strong>Phone:</strong> +249 912 345 678</p><p><strong>Address:</strong> Sudan</p></div>
      </div>
    </div>
  );
};
export default Contact;
