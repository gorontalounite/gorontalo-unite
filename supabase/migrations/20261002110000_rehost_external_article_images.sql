-- Three August stories still pointed their only image at
-- berita.gorontaloprov.go.id, which answers 403 to anything but a browser and
-- served multi-megabyte WhatsApp JPEGs as the homepage hero. The photos are
-- now copies in our own storage (WebP, 1600px overlay + 800px card); the
-- original URL stays in image_url as the record of the source.
--
-- Swapping an asset is not an editorial revision, so updated_at is left alone.
alter table public.articles disable trigger articles_updated_at;
update public.articles set image_thumb_url = 'https://vtpzbvlingnymqkwtxmn.supabase.co/storage/v1/object/public/media/articles/rehost-2026-10-02/thumb/upacara-hut-ke-81-ri-di-gorontalo.webp', image_overlay_url = 'https://vtpzbvlingnymqkwtxmn.supabase.co/storage/v1/object/public/media/articles/rehost-2026-10-02/overlay/upacara-hut-ke-81-ri-di-gorontalo.webp' where slug = 'upacara-hut-ke-81-ri-di-gorontalo' and image_thumb_url is null;
update public.articles set image_thumb_url = 'https://vtpzbvlingnymqkwtxmn.supabase.co/storage/v1/object/public/media/articles/rehost-2026-10-02/thumb/25-putra-putri-terbaik-gorontalo-resmi-dikukuhkan-jadi-paskibraka-2026.webp', image_overlay_url = 'https://vtpzbvlingnymqkwtxmn.supabase.co/storage/v1/object/public/media/articles/rehost-2026-10-02/overlay/25-putra-putri-terbaik-gorontalo-resmi-dikukuhkan-jadi-paskibraka-2026.webp' where slug = '25-putra-putri-terbaik-gorontalo-resmi-dikukuhkan-jadi-paskibraka-2026' and image_thumb_url is null;
update public.articles set image_thumb_url = 'https://vtpzbvlingnymqkwtxmn.supabase.co/storage/v1/object/public/media/articles/rehost-2026-10-02/thumb/gorontalo-rayakan-hut-ke-81-ri-dengan-cara-beda.webp', image_overlay_url = 'https://vtpzbvlingnymqkwtxmn.supabase.co/storage/v1/object/public/media/articles/rehost-2026-10-02/overlay/gorontalo-rayakan-hut-ke-81-ri-dengan-cara-beda.webp' where slug = 'gorontalo-rayakan-hut-ke-81-ri-dengan-cara-beda' and image_thumb_url is null;
alter table public.articles enable trigger articles_updated_at;
