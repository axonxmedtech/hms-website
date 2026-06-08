import { Activity, Mail, Phone, MapPin } from "lucide-react";
import { FOOTER_LINKS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="bg-healthcare-text text-white" role="contentinfo">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-healthcare-accent text-white">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-xl font-heading font-bold text-white">
                AxonX <span className="text-healthcare-accent">Medtech</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs mb-6">
              The operating system for modern hospitals. Unifying patient care, operations, and
              revenue management into one intelligent platform.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:hello@axonx.health"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-healthcare-accent transition-colors"
              >
                <Mail className="h-4 w-4 flex-shrink-0" />
                hello@axonx.health
              </a>
              <a
                href="tel:+18001234567"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-healthcare-accent transition-colors"
              >
                <Phone className="h-4 w-4 flex-shrink-0" />
                1-800-AXONX
              </a>
              <div className="flex items-center gap-2.5 text-sm text-slate-400">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                San Francisco, CA
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Product
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-healthcare-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-healthcare-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-healthcare-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Legal
            </h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-healthcare-accent transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} AxonX Medtech Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-healthcare-success animate-pulse" />
              All systems operational
            </span>
            <span className="text-xs text-slate-600">|</span>
            <span className="text-xs text-slate-500">HIPAA Compliant</span>
            <span className="text-xs text-slate-600">|</span>
            <span className="text-xs text-slate-500">SOC 2 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
