import { createClient } from "@/lib/supabase/server";
import CropUpload from "@/components/CropUpload";
import {
  updateHero,
  updateHero2,
  updatePromoBanner,
  updateCategoryTiles,
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

  const { data: promoData } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", "promo_banner")
    .single();

  const { data: categoryData } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", "homepage_categories")
    .single();

  const hero = heroData?.value ?? {};
  const hero2 = hero2Data?.value ?? {};
  const promo = promoData?.value ?? {};
  const categories = categoryData?.value ?? {};

  const categoryDefaults = {
    category1: {
      eyebrow: "Collection",
      title: "Shirts",
      link: "/collections/shirts",
      image_url: "",
    },
    category2: {
      eyebrow: "Collection",
      title: "T-Shirts",
      link: "/collections/tees",
      image_url: "",
    },
    category3: {
      eyebrow: "Collection",
      title: "Premium",
      link: "/collections/premium",
      image_url: "",
    },
  };

  const category1 = {
    ...categoryDefaults.category1,
    ...(categories.category1 ?? {}),
  };

  const category2 = {
    ...categoryDefaults.category2,
    ...(categories.category2 ?? {}),
  };

  const category3 = {
    ...categoryDefaults.category3,
    ...(categories.category3 ?? {}),
  };

  return (
    <div className="space-y-16">

      {/* HERO 1 */}
      <section>
        <h1 className="font-serif text-3xl font-light mb-8">
          Homepage — Hero section
        </h1>

        <form action={updateHero} className="space-y-5 max-w-xl">
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
          campaign, or extraordinary category.
        </p>

        <form action={updateHero2} className="space-y-5 max-w-xl">
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
              defaultValue={hero2.eyebrow ?? "The New Season"}
              className={inputClass}
            />
          </div>

          <div>
            <label className="eyebrow block mb-2">
              Title
            </label>
            <input
              name="title"
              defaultValue={
                hero2.title ?? "Made for the moments that matter."
              }
              className={inputClass}
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
                  hero2.cta_text ?? "Explore the collection"
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
                  hero2.cta_link ?? "/collections/new"
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
          </div>

          <button
            type="submit"
            className="bg-wine hover:bg-wineDeep px-8 py-3 text-sm tracking-wide"
          >
            Save Hero 2
          </button>
        </form>
      </section>

      {/* PROMO BANNER */}
      <section className="border-t border-hairline pt-14">
        <h2 className="font-serif text-3xl font-light mb-2">
          Homepage — Promo Banner
        </h2>

        <p className="text-sand text-sm mb-8 max-w-xl">
          Use this for a new drop, offer, campaign, or seasonal promotion.
          Leave the image empty if you do not want the banner displayed.
        </p>

        <form
          action={updatePromoBanner}
          className="space-y-5 max-w-xl"
        >
          <input
            type="hidden"
            name="existingPromoMediaUrl"
            value={promo.media_url ?? ""}
          />

          <input
            type="hidden"
            name="existingPromoMediaType"
            value={promo.media_type ?? "image"}
          />

          <div>
            <label className="eyebrow block mb-2">
              Eyebrow
            </label>

            <input
              name="eyebrow"
              defaultValue={promo.eyebrow ?? "New Drop"}
              className={inputClass}
            />
          </div>

          <div>
            <label className="eyebrow block mb-2">
              Title
            </label>

            <input
              name="title"
              defaultValue={
                promo.title ?? "Crafted for everyday confidence"
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className="eyebrow block mb-2">
              Button text
            </label>

            <input
              name="cta_text"
              defaultValue={
                promo.cta_text ?? "Shop the collection"
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
                promo.cta_link ?? "/collections/new"
              }
              className={inputClass}
            />
          </div>

          {promo.media_url && (
            <div>
              <label className="eyebrow block mb-2">
                Current promo image/video
              </label>

              {promo.media_type === "video" ? (
                <video
                  src={promo.media_url}
                  className="w-64 aspect-video object-cover"
                  controls
                />
              ) : (
                <img
                  src={promo.media_url}
                  alt="Current promo"
                  className="w-64 aspect-video object-cover"
                />
              )}
            </div>
          )}

          <div>
            <label className="eyebrow block mb-2">
              Upload promo image/video
            </label>

            <input
              type="file"
              name="promoMedia"
              accept="image/*,video/*"
              className="text-sm"
            />

            <p className="text-xs text-sand mt-1">
              If no image is uploaded, the promo banner will not appear
              on the homepage.
            </p>
          </div>

          <button
            type="submit"
            className="bg-wine hover:bg-wineDeep px-8 py-3 text-sm tracking-wide"
          >
            Save Promo Banner
          </button>
        </form>
      </section>

      {/* FEATURED CATEGORIES */}
      <section className="border-t border-hairline pt-14">
        <h2 className="font-serif text-3xl font-light mb-2">
          Homepage — Featured Categories
        </h2>

        <p className="text-sand text-sm mb-10 max-w-xl">
          Edit the three collection tiles shown between the Promo Banner
          and Hero 2 on the homepage.
        </p>

        <form
          action={updateCategoryTiles}
          className="space-y-12"
        >
          {/* CATEGORY 1 */}
          <div className="max-w-xl">
            <h3 className="font-serif text-xl mb-5">
              Category 1
            </h3>

            {category1.image_url && (
              <img
                src={category1.image_url}
                alt={category1.title}
                className="w-full max-w-md aspect-[4/5] object-cover mb-5"
              />
            )}

            <input
              type="hidden"
              name="category1_existing_image"
              value={category1.image_url}
            />

            <div className="space-y-4">
              <div>
                <label className="eyebrow block mb-2">
                  Small text
                </label>
                <input
                  name="category1_eyebrow"
                  defaultValue={category1.eyebrow}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="eyebrow block mb-2">
                  Title
                </label>
                <input
                  name="category1_title"
                  defaultValue={category1.title}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="eyebrow block mb-2">
                  Link
                </label>
                <input
                  name="category1_link"
                  defaultValue={category1.link}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="eyebrow block mb-2">
                  Image
                </label>
                <input
                  type="file"
                  name="category1_image"
                  accept="image/*"
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          {/* CATEGORY 2 */}
          <div className="max-w-xl border-t border-hairline pt-10">
            <h3 className="font-serif text-xl mb-5">
              Category 2
            </h3>

            {category2.image_url && (
              <img
                src={category2.image_url}
                alt={category2.title}
                className="w-full max-w-md aspect-[4/5] object-cover mb-5"
              />
            )}

            <input
              type="hidden"
              name="category2_existing_image"
              value={category2.image_url}
            />

            <div className="space-y-4">
              <div>
                <label className="eyebrow block mb-2">
                  Small text
                </label>
                <input
                  name="category2_eyebrow"
                  defaultValue={category2.eyebrow}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="eyebrow block mb-2">
                  Title
                </label>
                <input
                  name="category2_title"
                  defaultValue={category2.title}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="eyebrow block mb-2">
                  Link
                </label>
                <input
                  name="category2_link"
                  defaultValue={category2.link}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="eyebrow block mb-2">
                  Image
                </label>
                <input
                  type="file"
                  name="category2_image"
                  accept="image/*"
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          {/* CATEGORY 3 */}
          <div className="max-w-xl border-t border-hairline pt-10">
            <h3 className="font-serif text-xl mb-5">
              Category 3
            </h3>

            {category3.image_url && (
              <img
                src={category3.image_url}
                alt={category3.title}
                className="w-full max-w-md aspect-[4/5] object-cover mb-5"
              />
            )}

            <input
              type="hidden"
              name="category3_existing_image"
              value={category3.image_url}
            />

            <div className="space-y-4">
              <div>
                <label className="eyebrow block mb-2">
                  Small text
                </label>
                <input
                  name="category3_eyebrow"
                  defaultValue={category3.eyebrow}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="eyebrow block mb-2">
                  Title
                </label>
                <input
                  name="category3_title"
                  defaultValue={category3.title}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="eyebrow block mb-2">
                  Link
                </label>
                <input
                  name="category3_link"
                  defaultValue={category3.link}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="eyebrow block mb-2">
                  Image
                </label>
                <input
                  type="file"
                  name="category3_image"
                  accept="image/*"
                  className="text-sm"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-wine hover:bg-wineDeep px-8 py-3 text-sm tracking-wide"
          >
            Save Featured Categories
          </button>
        </form>
      </section>
    </div>
  );
}
