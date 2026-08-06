import { createClient } from "@/lib/supabase/server";
import { updateAbout } from "../about-actions";

const inputClass =
  "w-full bg-transparent border border-hairline px-3 py-3 text-sm focus:outline-none focus:border-wineLight";

export default async function AdminAboutPage() {
  const supabase = createClient();
  const { data } = await supabase.from("site_content").select("value").eq("key", "about").single();

  const about = data?.value ?? {};

  return (
    <div>
      <h1 className="font-serif text-3xl font-light mb-8">About page</h1>

      <form action={updateAbout} className="space-y-5 max-w-xl">
        <input type="hidden" name="existingImageUrl" value={about.image_url ?? ""} />

        <div>
          <label className="eyebrow block mb-2">Heading</label>
          <input name="heading" defaultValue={about.heading} className={inputClass} />
        </div>

        <div>
          <label className="eyebrow block mb-2">Story (leave a blank line between paragraphs)</label>
          <textarea name="body" defaultValue={about.body} rows={10} className={inputClass} />
        </div>

        {about.image_url && (
          <div>
            <label className="eyebrow block mb-2">Current photo</label>
            <img src={about.image_url} className="w-64 aspect-[4/5] object-cover" />
          </div>
        )}

        <div>
          <label className="eyebrow block mb-2">Upload photo</label>
          <input type="file" name="image" accept="image/*" className="text-sm" />
          <p className="text-xs text-sand mt-1">Uploading a new photo replaces the current one.</p>
        </div>

        <button className="bg-wine hover:bg-wineDeep px-8 py-3 text-sm tracking-wide">Save changes</button>
      </form>
    </div>
  );
}
