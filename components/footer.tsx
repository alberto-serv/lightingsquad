import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-[#4a6a7a] text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div className="space-y-3 max-w-sm">
            <div className="text-xl font-bold">Dryer Vent Superheroes</div>
            <p className="text-white/80 text-sm text-pretty">
              Professional dryer vent cleaning services that protect your home from fire hazards and improve dryer
              efficiency.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-1 text-white/80 text-sm">
              <li>(615) 632-2980</li>
              <li>Mon-Sat: 7AM-6PM</li>
              <li>Emergency Services</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <p className="text-white/70 text-sm">
            &copy; 2026 Dryer Vent Superheroes. All rights reserved. | Licensed & Insured | Privacy Policy
          </p>
          <a
            href="https://www.goserv.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/70 text-sm hover:text-white transition-colors"
          >
            <span>Powered by</span>
            <Image src="/serv-logo.png" alt="Serv" width={60} height={24} className="h-5 w-auto" />
          </a>
        </div>
      </div>
    </footer>
  )
}
