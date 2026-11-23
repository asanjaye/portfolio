import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { contactCopy, profile } from '../data/content';

emailjs.init('7cMSv_HihjONNrE1P');

const initial = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [formData, setFormData] = useState(initial);
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!status) return undefined;
    const timer = setTimeout(() => setStatus(''), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('');

    try {
      await emailjs.send(
        'service_xfkdj7q',
        'template_qbenub8',
        {
          to_name: 'Ashwin',
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        '7cMSv_HihjONNrE1P'
      );
      setFormData(initial);
      setStatus('Message sent successfully! I will get back to you soon.');
      setStatusType('success');
    } catch {
      setStatus('Failed to send message. Please try again later.');
      setStatusType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Contact</p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {contactCopy.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">
              {contactCopy.body}
            </p>
            <p className="mt-6 text-sm text-slate">
              Direct email:{' '}
              <a
                href={`mailto:${profile.email}`}
                className="font-semibold text-ink hover:text-signal"
              >
                {profile.email}
              </a>
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink hover:border-signal hover:text-signal"
              >
                LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink hover:border-signal hover:text-signal"
              >
                GitHub
              </a>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[1.5rem] border border-line bg-surface p-5 shadow-sm sm:p-7"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" id="name">
                <input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="field"
                  placeholder="Your name"
                />
              </Field>
              <Field label="Email" id="email">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="field"
                  placeholder="you@company.com"
                />
              </Field>
            </div>
            <Field label="Subject" id="subject" className="mt-4">
              <input
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                disabled={isSubmitting}
                className="field"
                placeholder="AI automation project"
              />
            </Field>
            <Field label="Message" id="message" className="mt-4">
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className="field resize-y"
                placeholder="What workflow are you trying to automate?"
              />
            </Field>
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 w-full rounded-full bg-signal px-5 py-3 text-sm font-semibold text-white transition hover:bg-signal-bright disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? 'Sending…' : 'Send message'}
            </button>
            {status && (
              <p
                className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium ${
                  statusType === 'success'
                    ? 'bg-signal/10 text-signal'
                    : 'bg-gate-soft text-gate'
                }`}
                role="status"
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </div>

      <style>{`
        .field {
          width: 100%;
          border-radius: 0.85rem;
          border: 1px solid #d5dde8;
          background: #f7f9fb;
          padding: 0.85rem 1rem;
          color: #0b1220;
          font-size: 0.95rem;
        }
        .field:focus {
          outline: 2px solid #0f766e;
          outline-offset: 1px;
          background: #fff;
        }
        .field:disabled {
          opacity: 0.7;
        }
      `}</style>
    </section>
  );
}

function Field({ label, id, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
    </div>
  );
}
