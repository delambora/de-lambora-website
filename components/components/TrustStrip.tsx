export default function TrustStrip() {
  const items = [
    {
      icon: "🚚",
      title: "Free Shipping",
      subtitle: "On orders above ₹999",
    },
    {
      icon: "↩️",
      title: "7-Day Returns",
      subtitle: "Easy exchanges & returns",
    },
    {
      icon: "🌿",
      title: "Premium Cotton",
      subtitle: "240 GSM heavyweight fabric",
    },
    {
      icon: "💳",
      title: "Cash on Delivery",
      subtitle: "Available across India",
    },
  ];

  return (
    <section className="border-y border-hairline py-12 px-6 md:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((item) => (
          <div key={item.title} className="text-center">
            <div className="text-3xl mb-3">{item.icon}</div>

            <h3 className="font-serif text-lg mb-1">
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
