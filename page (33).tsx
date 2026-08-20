import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AboutPage() {
  const supabase = createClient();
  const { data } = await supabase.from("site_content").select("value").eq("key", "about").single();

  const about = data?.value ?? {
    heading: "Our story",
    body: "Add your brand story in Admin → About.",
    image_url: null
  };

  const paragraphs = String(about.body || "").split("\n\n").filter(Boolean);

  return (
    <div className="grid md:grid-cols-2 gap-10 md:gap-16 px-5 md:px-12 py-12 md:py-20 items-start">
      <div>
        <div className="aspect-[4/5] w-full overflow-hidden bg-bgElev flex items-center justify-center">
          {about.image_url ? (
            <img src={about.image_url} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center text-sand">
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" className="w-14 h-14 mx-auto mb-3">
                <rect x="15" y="25" width="70" height="50" rx="2" />
                <circle cx="35" cy="42" r="6" />
                <path d="M15 65 L38 48 L55 60 L70 45 L85 60" />
              </svg>
              <p className="font-mono text-xs">Add a photo in Admin → About</p>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="eyebrow mb-4">About</div>
        <h1 className="font-serif text-4xl md:text-5xl font-light mb-8">{about.heading}</h1>
        <div className="space-y-5 max-w-md">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-sm text-sand leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
