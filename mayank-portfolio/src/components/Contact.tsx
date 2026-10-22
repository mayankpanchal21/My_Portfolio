import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Send } from 'lucide-react';
import { useState, type FormEvent, type ReactNode } from 'react';
import { profile } from '../data/profile';
import { PlaceholderBadge } from './ui/Placeholder';
import { Reveal } from './ui/Reveal';
import { ResumeLink } from './ui/ResumeLink';

interface ContactRowProps {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}

function ContactRow({ icon, label, value, href, external }: ContactRowProps) {
  const content = (
    <>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-ink-700 bg-ink-850 text-fg-muted transition-colors group-hover:text-accent-soft">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="eyebrow block">{label}</span>
        <span className="block truncate text-[15px] text-fg">{value}</span>
      </span>
    </>
  );

  if (!href) {
    return (
      <div className="flex items-center gap-4 px-5 py-4">
        {content}
        <PlaceholderBadge />
      </div>
    );
  }

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-ink-850/60"
    >
      {content}
      {external && <span className="sr-only">(opens in a new tab)</span>}
      <ArrowUpRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
      />
    </a>
  );
}

function CopyEmailButton({ email }: { email: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState('copied');
    } catch {
      setState('failed');
    }
    window.setTimeout(() => setState('idle'), 2000);
  };

  return (
    <button type="button" onClick={copy} className="btn-secondary !px-3 !py-1.5 text-xs">
      {state === 'copied' ? (
        <Check aria-hidden="true" className="h-3.5 w-3.5 text-emerald-400" />
      ) : (
        <Copy aria-hidden="true" className="h-3.5 w-3.5" />
      )}
      <span aria-live="polite">
        {state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed' : 'Copy email'}
      </span>
    </button>
  );
}

type Field = 'name' | 'email' | 'message';
type Errors = Partial<Record<Field, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (values.message.trim().length < 10)
    errors.message = 'Please write a message of at least 10 characters.';
  return errors;
}

/**
 * No backend is configured, so the form validates input and then opens the
 * visitor's email client with a pre-filled draft. The status copy says exactly that.
 */
function ContactForm({ email }: { email: string }) {
  const [values, setValues] = useState<Record<Field, string>>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (field: Field, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitted(false);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as Field[])[0];
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }
    const subject = `Portfolio enquiry from ${values.name.trim()}`;
    const body = `${values.message.trim()}\n\n— ${values.name.trim()}\n${values.email.trim()}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const inputClass = (field: Field) =>
    `mt-1.5 w-full rounded-lg border bg-ink-950 px-3.5 py-2.5 text-[15px] text-fg placeholder:text-fg-subtle/70 transition-colors focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-accent/40 ${
      errors[field] ? 'border-red-400/70' : 'border-ink-700 hover:border-ink-600 focus:border-accent/60'
    }`;

  const fieldError = (field: Field) =>
    errors[field] && (
      <p id={`contact-${field}-error`} className="mt-1.5 text-sm text-red-300">
        {errors[field]}
      </p>
    );

  const describedBy = (field: Field) => (errors[field] ? `contact-${field}-error` : undefined);

  return (
    <form noValidate onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-7" aria-labelledby="contact-form-title">
      <div>
        <h3 id="contact-form-title" className="font-medium text-fg">
          Write a message
        </h3>
        <p className="mt-1 text-sm text-fg-subtle">
          This opens your email app with a drafted message — nothing is sent from this website.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm text-fg-muted">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy('name')}
            className={inputClass('name')}
          />
          {fieldError('name')}
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm text-fg-muted">
            Your email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy('email')}
            className={inputClass('email')}
          />
          {fieldError('email')}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm text-fg-muted">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy('message')}
          className={`${inputClass('message')} resize-y`}
        />
        {fieldError('message')}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn-primary">
          <Send aria-hidden="true" className="h-4 w-4" />
          Open in email app
        </button>
        <p role="status" className="text-sm text-fg-subtle">
          {submitted && (
            <>
              Your email app should now be open with the draft. If not, write to{' '}
              <a href={`mailto:${email}`} className="link-underline text-fg">
                {email}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}

export function Contact() {
  const { email, linkedinUrl, githubUrl } = profile;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden border-t border-ink-800 py-20 sm:py-28">
      <div aria-hidden="true" className="bg-grid mask-fade-radial absolute inset-0 -z-10 opacity-70" />
      <div className="container-page">
        <Reveal className="max-w-2xl">
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="text-accent-soft">07</span>
            <span aria-hidden="true" className="h-px w-8 bg-ink-600" />
            Contact
          </p>
          <h2
            id="contact-heading"
            className="text-balance text-4xl font-medium tracking-tight text-fg sm:text-5xl"
          >
            Have a problem{' '}
            <span className="font-serif font-normal italic text-accent-soft">worth solving?</span>
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-fg-muted">
            I'm interested in connecting with people building useful products and solving
            meaningful technical problems.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <Reveal className="flex min-w-0 flex-col gap-4">
            <div className="card divide-y divide-ink-700 overflow-hidden">
              <ContactRow
                icon={<Mail aria-hidden="true" className="h-4 w-4" />}
                label="Email"
                value={email || 'your-email@example.com'}
                href={email ? `mailto:${email}` : undefined}
              />
              <ContactRow
                icon={<Linkedin aria-hidden="true" className="h-4 w-4" />}
                label="LinkedIn"
                value={linkedinUrl ? linkedinUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : 'LinkedIn profile URL'}
                href={linkedinUrl || undefined}
                external
              />
              <ContactRow
                icon={<Github aria-hidden="true" className="h-4 w-4" />}
                label="GitHub"
                value={githubUrl ? githubUrl.replace(/^https?:\/\//, '') : 'GitHub profile URL'}
                href={githubUrl || undefined}
                external
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {email && <CopyEmailButton email={email} />}
              <ResumeLink className="btn-secondary !px-3 !py-1.5 text-xs" label="Download resume" />
              {!profile.resumeUrl && <PlaceholderBadge>Resume pending</PlaceholderBadge>}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="min-w-0">
            {email ? (
              <ContactForm email={email} />
            ) : (
              <div className="card p-6">
                <PlaceholderBadge>Add email in src/data/profile.ts</PlaceholderBadge>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
