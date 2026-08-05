import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-hairline mt-24">
      <div className="max-w-7xl mx-auto px-12 py-16 grid gap-12 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="font-serif text-2xl mb-4">DE LAMBORA</h2>

          <p className="text-sand text-sm leading-7">
            Premium apparel crafted for everyday confidence.
            Designed with timeless silhouettes and quality fabrics.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="font-serif text-lg mb-4">Shop</h3>

          <ul className="space-y-2 text-sm text-sand">
            <li><Link href="/collections/tshirts">T-Shirts</Link></li>
            <li><Link href="/collections/polos">Polos</Link></li>
            <li><Link href="/collections/new-arrivals">New Arrivals</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-serif text-lg mb-4">Company</h3>

          <ul className="space-y-2 text-sm text-sand">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/shipping-policy">Shipping</Link></li>
            <li><Link href="/returns-policy">Returns</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-serif text-lg mb-4">Follow Us</h3>

          <ul className="space-y-2 text-sm text-sand">
            <li>
              <a
                href="https://instagram.com/delambora"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>

            <li>
              <a
                href="https://facebook.com/delambora"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-hairline px-12 py-6 flex flex-col md:flex-row justify-between items-center text-xs text-sand gap-3">

        <p>
          © {new Date().getFullYear()} De Lambora. All rights reserved.
        </p>

        <p>
          Visa • Mastercard • UPI • Cash on Delivery
        </p>

      </div>
    </footer>
  );
}
