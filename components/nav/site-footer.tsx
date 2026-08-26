import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';

import { PHONE, TEL_HREF, business, formattedAddress, googleProfileUrl, yearsInBusiness } from '@/data/business';
import { allCityLinks, allServiceLinks, companyLinks, legalLinks } from '@/lib/nav';

/**
 * Site footer.
 *
 * This carries the COMPLETE service list and the COMPLETE city list on every
 * single page. That is not decorative — it is what guarantees zero orphan pages
 * and puts every route within two clicks of the homepage (Phase 4B). Trimming
 * these lists to "top 6" would break that guarantee.
 *
 * Server component: no interactivity, so none of this costs client JS.
 */
export function SiteFooter() {
  const years = yearsInBusiness();

  return (
    <footer className="mt-auto border-t border-ink-200 bg-brand-900 text-ink-200">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Services — all of them */}
          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className="mb-4 text-caption font-semibold uppercase tracking-wide text-brand-50">
              Services
            </h2>
            <ul className="space-y-2">
              {allServiceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-caption text-ink-200/80 transition-colors hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Service areas — all of them */}
          <nav aria-labelledby="footer-areas">
            <h2 id="footer-areas" className="mb-4 text-caption font-semibold uppercase tracking-wide text-brand-50">
              Service Areas
            </h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {allCityLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-caption text-ink-200/80 transition-colors hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company">
            <h2 id="footer-company" className="mb-4 text-caption font-semibold uppercase tracking-wide text-brand-50">
              Company
            </h2>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-caption text-ink-200/80 transition-colors hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* NAP block — must match the JSON-LD and the Google Business Profile */}
          <div>
            <Link href="/" className="mb-4 flex min-h-[44px] items-center gap-2.5">
              <Image
                src="/images/logo.png"
                alt=""
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="font-display text-lg text-white">Blue Landscaping</span>
            </Link>

            <address className="space-y-3 not-italic">
              <p className="flex items-start gap-2.5 text-caption text-ink-200/80">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-50" aria-hidden="true" />
                <span>{formattedAddress}</span>
              </p>
              <p className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-50" aria-hidden="true" />
                <a href={TEL_HREF} className="text-caption text-ink-200/80 transition-colors hover:text-white">
                  {PHONE.display}
                </a>
              </p>
              <p className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-50" aria-hidden="true" />
                <a
                  href={`mailto:${business.email}`}
                  className="break-all text-caption text-ink-200/80 transition-colors hover:text-white"
                >
                  {business.email}
                </a>
              </p>
            </address>

            <div className="mt-5 border-t border-ink-800 pt-4">
              <p className="text-caption text-ink-200/80">
                We take {business.paymentMethods.join(', ')}.
              </p>
            </div>

            <div className="mt-5 border-t border-ink-800 pt-4">
              <p className="flex items-start gap-2.5 text-caption text-ink-200/80">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-50" aria-hidden="true" />
                <span>
                  WA Lic.{' '}
                  <a
                    href={business.license.lookupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-ink-500 underline-offset-2 transition-colors hover:text-white"
                  >
                    {business.license.number}
                  </a>
                  <br />
                  Licensed, bonded &amp; insured
                  {googleProfileUrl && (
                    <>
                      <br />
                      <a
                        href={googleProfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline decoration-ink-500 underline-offset-2 transition-colors hover:text-white"
                      >
                        Google listing
                      </a>
                    </>
                  )}
                </span>
              </p>
            </div>

            <h2 className="mb-2 mt-5 text-caption font-semibold uppercase tracking-wide text-brand-50">Hours</h2>
            <ul className="space-y-1">
              {business.hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4 text-caption text-ink-200/70">
                  <span>{h.day.slice(0, 3)}</span>
                  <span>{h.opens && h.closes ? `${to12h(h.opens)} – ${to12h(h.closes)}` : 'Closed'}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <div className="shell pb-action-bar flex flex-col gap-3 pt-6 text-caption text-ink-500 md:flex-row md:items-center md:justify-between md:pb-6">
          <p>
            © {new Date().getFullYear()} {business.legalName}. Serving Greater Seattle from Kent, WA
            {years > 0 ? ` since ${business.foundedYear}.` : '.'}
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-ink-200">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function to12h(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const period = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour}${period}` : `${hour}:${String(m).padStart(2, '0')}${period}`;
}
