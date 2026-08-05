import { createClient } from "@/lib/supabase/server";
import { updateHero } from "../homepage-actions";

const inputClass =
  "w-full bg-transparent border border-hairline px-3 py-3 text-sm focus:outline-none focus:border-wineLight";

export default async function AdminHomepagePage() {
  const supabase = createClient();
  const { data } = await supabase.from("site_content").select("value").eq("key", "hero").single();

  const hero = data?.value ?? {};

  return (
    <div>
      <h1 className="font-serif text-3xl font-light mb-8">Homepage — Hero section</h1>

      <form action={updateHero} className="space-y-5 max-w-xl">
        <input type="hidden" name="existingMediaUrl" value={hero.media_url ?? ""} />
        <input type="hidden" name="existingMediaType" value={hero.media_type ?? "image"} />

        <div>
          <label className="eyebrow block mb-2">Headline — line 1</label>
          <input name="headline_line1" defaultValue={hero.headline_line1} className={inputClass} />
        </div>

        <div>
          <label className="eyebrow block mb-2">Headline — emphasis (styled in wine colour)</label>
          <input name="headline_emphasis" defaultValue={hero.headline_emphasis} className={inputClass} />
        </div>

        <div>
          <label className="eyebrow block mb-2">Subtext</label>
          <textarea name="subtext" defaultValue={hero.subtext} rows={3} className={inputClass} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="eyebrow block mb-2">Button text</label>
            <input name="cta_text" defaultValue={hero.cta_text} className={inputClass} />
          </div>
          <div>
            <label className="eyebrow block mb-2">Button link</label>
            <input name="cta_link" defaultValue={hero.cta_link} className={inputClass} />
          </div>
        </div>

        {hero.media_url && (
          <div>
            <label className="eyebrow block mb-2">Current photo/video</label>
            {hero.media_type === "video" ? (
              <video src={hero.media_url} className="w-64 aspect-video object-cover" controls />
            ) : (
              <img src={hero.media_url} className="w-64 aspect-video object-cover" />
            )}
          </div>
        )}

        <div>
          <label className="eyebrow block mb-2">Upload new photo or video</label>
          <input type="file" name="media" accept="image/*,video/*" className="text-sm" />
          <p className="text-xs text-sand mt-1">Uploading a new file replaces the current one.</p>
        </div>

        <button className="bg-wine hover:bg-wineDeep px-8 py-3 text-sm tracking-wide">Save changes</button>
      </form>
    </div>
  );
}
