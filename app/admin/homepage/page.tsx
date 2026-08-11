import { createClient } from "@/lib/supabase/server";
import {
  updateHero,
  updateHero2,
} from "../homepage-actions";

const inputClass =
  "w-full bg-transparent border border-hairline px-3 py-3 text-sm focus:outline-none focus:border-wineLight";

export default async function AdminHomepagePage() {
  const supabase = createClient();

  const { data: heroData } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", "hero")
    .single();

  const { data: hero2Data } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", "hero_2")
    .single();

  const hero = heroData?.value ?? {};
  const hero2 = hero2Data?.value ?? {};

  return (
    <div className="space-y-16">

      {/* HERO 1 */}
      <section>
        <h1 className="font-serif text-3xl font-light mb-8">
          Homepage — Hero section
        </h1>

        <form
          action={updateHero}
          className="space-y-5 max-w-xl"
        >
          <input
            type="hidden"
            name="existingMediaUrl"
            value={hero.media_url ?? ""}
          />

          <input
            type="hidden"
            name="existingMediaType"
            value={hero.media_type ?? "image"}
          />

          <div>
            <label className="eyebrow block mb-2">
              Headline — line 1
            </label>

            <input
              name="headline_line1"
              defaultValue={hero.headline_line1}
              className={inputClass}
            />
          </div>

          <div>
            <label className="eyebrow block mb-2">
              Headline — emphasis
            </label>

            <input
              name="headline_emphasis"
              defaultValue={hero.headline_emphasis}
              className={inputClass}
            />
          </div>

          <div>
            <label className="eyebrow block mb-2">
              Subtext
            </label>

            <textarea
              name="subtext"
              defaultValue={hero.subtext}
              rows={3}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="eyebrow block mb-2">
                Button text
              </label>

              <input
                name="cta_text"
                defaultValue={hero.cta_text}
                className={inputClass}
              />
            </div>

            <div>
              <label className="eyebrow block mb-2">
                Button link
              </label>

              <input
                name="cta_link"
                defaultValue={hero.cta_link}
                className={inputClass}
              />
            </div>
          </div>

          {hero.media_url && (
            <div>
              <label className="eyebrow block mb-2">
                Current photo/video
              </label>

              {hero.media_type === "video" ? (
                <video
                  src={hero.media_url}
                  className="w-64 aspect-video object-cover"
                  controls
                />
              ) : (
                <img
                  src={hero.media_url}
                  alt="Current hero"
                  className="w-64 aspect-video object-cover"
                />
              )}
            </div>
          )}

          <div>
            <label className="eyebrow block mb-2">
              Upload new photo or video
            </label>

            <input
              type="file"
              name="media"
              accept="image/*,video/*"
              className="text-sm"
            />

            <p className="text-xs text-sand mt-1">
              Uploading a new file replaces the current one.
            </p>
          </div>

          <button
            type="submit"
            className="bg-wine hover:bg-wineDeep px-8 py-3 text-sm tracking-wide"
          >
            Save Hero
          </button>
        </form>
      </section>


      {/* HERO 2 */}
      <section className="border-t border-hairline pt-14">
        <h2 className="font-serif text-3xl font-light mb-2">
          Homepage — Hero 2
        </h2>

        <p className="text-sand text-sm mb-8 max-w-xl">
          Use this section for a new collection, special offer,
          campaign, or an extraordinary category.
        </p>

        <form
          action={updateHero2}
          className="space-y-5 max-w-xl"
        >
          <input
            type="hidden"
            name="existingHero2MediaUrl"
            value={hero2.media_url ?? ""}
          />

          <input
            type="hidden"
            name="existingHero2MediaType"
            value={hero2.media_type ?? "image"}
          />

          <div>
            <label className="eyebrow block mb-2">
              Eyebrow
            </label>

            <input
              name="eyebrow"
              defaultValue={
                hero2.eyebrow ?? "The New Season"
              }
              className={inputClass}
              placeholder="The New Season"
            />
          </div>

          <div>
            <label className="eyebrow block mb-2">
              Title
            </label>

            <input
              name="title"
              defaultValue={
                hero2.title ??
                "Made for the moments that matter."
              }
              className={inputClass}
              placeholder="Your campaign title"
            />
          </div>

          <div>
            <label className="eyebrow block mb-2">
              Subtitle
            </label>

            <textarea
              name="subtitle"
              defaultValue={
                hero2.subtitle ??
                "A considered collection of everyday essentials, crafted with intention."
              }
              rows={3}
              className={inputClass}
              placeholder="Short supporting text"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="eyebrow block mb-2">
                Button text
              </label>

              <input
                name="cta_text"
                defaultValue={
                  hero2.cta_text ??
                  "Explore the collection"
                }
                className={inputClass}
              />
            </div>

            <div>
              <label className="eyebrow block mb-2">
                Button link
              </label>

              <input
                name="cta_link"
                defaultValue={
                  hero2.cta_link ??
                  "/collections/new"
                }
                className={inputClass}
              />
            </div>
          </div>

          {hero2.media_url && (
            <div>
              <label className="eyebrow block mb-2">
                Current Hero 2 photo/video
              </label>

              {hero2.media_type === "video" ? (
                <video
                  src={hero2.media_url}
                  className="w-64 aspect-video object-cover"
                  controls
                />
              ) : (
                <img
                  src={hero2.media_url}
                  alt="Current Hero 2"
                  className="w-64 aspect-video object-cover"
                />
              )}
            </div>
          )}

          <div>
            <label className="eyebrow block mb-2">
              Upload Hero 2 photo or video
            </label>

            <input
              type="file"
              name="hero2Media"
              accept="image/*,video/*"
              className="text-sm"
            />

            <p className="text-xs text-sand mt-1">
              Recommended: wide landscape image. Uploading a
              new file replaces the current Hero 2 media.
            </p>
          </div>

          <button
            type="submit"
            className="bg-wine hover:bg-wineDeep px-8 py-3 text-sm tracking-wide"
          >
            Save Hero 2
          </button>
        </form>
      </section>

    </div>
  );
}
