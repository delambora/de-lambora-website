import { submitContactForm } from "./contact-actions";

const inputClass =
  "w-full bg-transparent border border-hairline px-3 py-3 text-sm focus:outline-none focus:border-wineLight";

export default function ContactPage({
  searchParams
}: {
  searchParams: { sent?: string; error?: string };
}) {
  return (
    <div className="grid md:grid-cols-2 gap-10 md:gap-16 px-5 md:px-12 py-12 md:py-20 items-start">
      <div>
        <div className="eyebrow mb-4">Contact</div>
        <h1 className="font-serif text-4xl font-light mb-8">Get in touch</h1>

        <div className="space-y-6 text-sm text-sand leading-relaxed">
          <div>
            <div className="font-serif text-bone text-base mb-1">De Lambora</div>
            <div>Palani - 624601</div>
            <div>Bagayam, Vellore - 632002</div>
          </div>

          <div>
            <div className="eyebrow mb-1">Email</div>
            <a href="mailto:info@delambora.com" className="hover:text-wineLight">
              info@delambora.com
            </a>
          </div>

          <div>
            <div className="eyebrow mb-1">Phone</div>
            <a href="tel:+917708920031" className="hover:text-wineLight">
              +91 77089 20031
            </a>
          </div>

          <div>
            <div className="eyebrow mb-1">WhatsApp</div>
            
              href="https://wa.me/917708920031"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-wineLight"
            >
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div>
        {searchParams.sent && (
          <div className="border border-wineLight text-wineLight text-sm px-4 py-3 mb-6">
            Thanks — your message has been sent. We'll get back to you soon.
          </div>
        )}
        {searchParams.error && (
          <div className="border border-wineLight text-wineLight text-sm px-4 py-3 mb-6">
            Something went wrong — please fill in every field and try again.
          </div>
        )}

        <form action={submitContactForm} className="space-y-4 max-w-md">
          <input required name="name" placeholder="Your name" className={inputClass} />
          <input required type="email" name="email" placeholder="Your email" className={inputClass} />
          <textarea required name="message" placeholder="Your message" rows={6} className={inputClass} />
          <button className="bg-wine hover:bg-wineDeep px-8 py-3.5 text-sm tracking-wide">
            Send message
          </button>
        </form>
      </div>
    </div>
  );
}
