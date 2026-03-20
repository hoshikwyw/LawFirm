"use client";

const VIBER_NUMBER = process.env.NEXT_PUBLIC_VIBER_NUMBER; // e.g. "15551234567"
const EMAIL_ADDRESS = process.env.NEXT_PUBLIC_EMAIL_ADDRESS ?? "contact@lawfirm.com";
const MESSENGER_USERNAME = process.env.NEXT_PUBLIC_MESSENGER_USERNAME; // e.g. "yourpage"

function ViberIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M11.4 0C5.5.3.8 5.3.8 11.3c0 2.8 1 5.4 2.8 7.4v3.5l3.2-1.8c1 .3 2.1.4 3.2.4h.2C16 20.8 20.8 16 20.8 10S16.2 0 11.4 0zm.2 18.7h-.2c-.9 0-1.9-.2-2.7-.5l-.4-.1-2 1.1.5-2-.3-.3C5.3 15.5 4.3 13.5 4.3 11.3 4.3 7 7.5 3.5 11.6 3.5s7.3 3.5 7.3 7.8c0 4.3-3.3 7.4-7.3 7.4zm4-5.6c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1-.1.2-.6.7-.7.9-.1.1-.3.2-.5.1-.2-.1-1-.4-1.8-1.1-.7-.6-1.1-1.4-1.3-1.6-.1-.2 0-.3.1-.5l.3-.4c.1-.1.1-.2.2-.3 0-.1 0-.2-.1-.3-.1-.1-.5-1.1-.6-1.5-.2-.4-.3-.4-.5-.4h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.1 1.6 2.6 4 3.6.6.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
}

function MessengerIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.652V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963-3.055-3.26-5.963 3.26L10.732 8l3.131 3.26L19.752 8l-6.561 6.963z" />
    </svg>
  );
}

export function ContactForm() {
  const viberHref = VIBER_NUMBER
    ? `viber://chat?number=${VIBER_NUMBER}`
    : "viber://";

  const messengerHref = MESSENGER_USERNAME
    ? `https://m.me/${MESSENGER_USERNAME}`
    : "https://www.messenger.com/";

  return (
    <div className="flex flex-col gap-4">
      {/* Viber */}
      <a
        href={viberHref}
        className="flex items-center gap-4 rounded-xl border border-deep-charcoal/[0.08] bg-white px-6 py-4 shadow-premium transition-all hover:shadow-premium-lg hover:border-[#7360F2]/30 group"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#7360F2]/10 text-[#7360F2] group-hover:bg-[#7360F2] group-hover:text-white transition-colors">
          <ViberIcon />
        </span>
        <div>
          <p className="font-sans text-sm font-semibold text-deep-charcoal">Send message in Viber</p>
          <p className="font-sans text-xs text-deep-charcoal/50">Chat with us directly on Viber</p>
        </div>
        <svg className="ml-auto size-4 text-deep-charcoal/30 group-hover:text-deep-charcoal/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>

      {/* Email */}
      <a
        href={`mailto:${EMAIL_ADDRESS}`}
        className="flex items-center gap-4 rounded-xl border border-deep-charcoal/[0.08] bg-white px-6 py-4 shadow-premium transition-all hover:shadow-premium-lg hover:border-muted-gold/30 group"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted-gold/10 text-muted-gold group-hover:bg-muted-gold group-hover:text-white transition-colors">
          <EmailIcon />
        </span>
        <div>
          <p className="font-sans text-sm font-semibold text-deep-charcoal">Send message in Email</p>
          <p className="font-sans text-xs text-deep-charcoal/50">{EMAIL_ADDRESS}</p>
        </div>
        <svg className="ml-auto size-4 text-deep-charcoal/30 group-hover:text-deep-charcoal/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>

      {/* Messenger */}
      <a
        href={messengerHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-4 rounded-xl border border-deep-charcoal/[0.08] bg-white px-6 py-4 shadow-premium transition-all hover:shadow-premium-lg hover:border-[#0084FF]/30 group"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0084FF]/10 text-[#0084FF] group-hover:bg-[#0084FF] group-hover:text-white transition-colors">
          <MessengerIcon />
        </span>
        <div>
          <p className="font-sans text-sm font-semibold text-deep-charcoal">Send message in Messenger</p>
          <p className="font-sans text-xs text-deep-charcoal/50">Chat with us on Facebook Messenger</p>
        </div>
        <svg className="ml-auto size-4 text-deep-charcoal/30 group-hover:text-deep-charcoal/60 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}
