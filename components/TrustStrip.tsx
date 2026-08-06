export default function TrustStrip() {
  const items = [
    {
      title: "Free Shipping",
      subtitle: "On orders above ₹999",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-8 h-8 mx-auto">
          <rect x="4" y="14" width="24" height="18" rx="1.5" />
          <path d="M28 20h9l6 7v5h-15v-12Z" />
          <circle cx="14" cy="35" r="3.2" />
          <circle cx="35" cy="35" r="3.2" />
        </svg>
      )
    },
    {
      title: "7-Day Returns",
      subtitle: "Easy exchanges & returns",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-8 h-8 mx-auto">
          <path d="M10 20a14 14 0 1 1 2.4 12.4" />
          <path d="M10 12v8h8" />
        </svg>
      )
    },
    {
      title: "Premium Cotton",
      subtitle: "240 GSM heavyweight fabric",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-8 h-8 mx-auto">
          <path d="M18 8l6-3 6 3 -2 8h-8Z" />
          <path d="M18 8l-8 4 3 6 3-1v23h16V17l3 1 3-6-8-4" />
        </svg>
      )
    },
    {
      title: "Cash on Delivery",
      subtitle: "Available across India",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-8 h-8 mx-auto">
          <rect x="5" y="13" width="38" height="24" rx="2" />
          <circle cx="24" cy="25" r="6" />
          <path d="M5 20h4M39 20h4M5 30h4M39 30h4" />
        </svg>
      )
    }
  ];

  return (
    <section className="border-y border-hairline py-12 px-6 md:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((item) => (
          <div key={item.title} className="text-center text-sand">
            <div className="mb-3">{item.icon}</div>

            <h3 className="font-serif text-lg mb-1 text-bone">
              {item.title}
            </h3>

            <p className="text-sm text-sand">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
