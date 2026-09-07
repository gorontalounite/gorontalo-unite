-- Demo City Guide entry used to review the detail-page redesign live.
-- Danau Limboto is a real place in Gorontalo; content here is a starting
-- draft, not fabricated data, and can be edited freely from
-- /admin/city-guide afterwards.

insert into public.tourism_places (
  name, slug, description, category, subcategory, location, address,
  opening_hours, price_range, latitude, longitude, tags, image_url,
  gallery, published, featured, listing_details
) values (
  'Danau Limboto',
  'danau-limboto',
  E'Danau Limboto adalah danau tektonik terbesar di Provinsi Gorontalo, membentang di antara Kabupaten Gorontalo dan Kota Gorontalo. Dulunya berukuran jauh lebih luas, danau ini kini menjadi destinasi favorit untuk menikmati matahari terbenam sambil menyusuri dermaga kayu di tepiannya.\n\nPengunjung bisa menyewa perahu nelayan untuk berkeliling danau, mengunjungi keramba ikan warga, atau sekadar duduk di warung-warung tepi danau sambil menikmati jagung bakar khas Gorontalo.',
  'Atraksi & Wisata',
  'Danau & Perairan',
  'Limboto, Kabupaten Gorontalo',
  'Jl. Trans Sulawesi, Limboto, Kabupaten Gorontalo',
  '06.00-18.00',
  'Gratis (sewa perahu mulai Rp50.000)',
  0.560643,
  122.984558,
  array['keluarga', 'fotogenik'],
  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1600&auto=format&fit=crop',
  array[
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1502790671504-542ad42d5189?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=900&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=900&auto=format&fit=crop'
  ],
  true,
  false,
  '{}'::jsonb
)
on conflict (slug) do nothing;
