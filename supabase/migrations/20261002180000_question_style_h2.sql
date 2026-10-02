-- Question-style H2 subheadings for "People Also Ask" (2 Oct 2026).
-- 554 subheadings across all 303 stories are rephrased as the question the
-- paragraph right below already answers; no facts or answers change. Each
-- heading is updated in blocks (rendered) and in the markdown content copy.
-- Previous headings are kept in h2-question-backup-2026-10-02.json.
--
-- A subheading rewrite is not a revision of the story, so updated_at is left alone.
alter table public.articles disable trigger articles_updated_at;
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4fe406f6-4130-4569-9dd0-86718d2b85b4' then jsonb_set(e, '{content}', to_jsonb('Sejak kapan Gebyar Ketupat Pantai Olalo digelar?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tradisi Gebyar Ketupat sejak 2000', '## Sejak kapan Gebyar Ketupat Pantai Olalo digelar?')
where id = '49dbcaf7-e54d-4d70-be7d-5883673000e7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9c0542e7-c8d5-44c4-9fa5-688556cd8f92' then jsonb_set(e, '{content}', to_jsonb('Berapa perahu yang ikut lomba perahu hias?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Perahu hias dan balap perahu', '## Berapa perahu yang ikut lomba perahu hias?')
where id = '49dbcaf7-e54d-4d70-be7d-5883673000e7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '03544d68-144e-40fc-85cb-9f593bbf4bce' then jsonb_set(e, '{content}', to_jsonb('Kelurahan mana saja yang menggagas Koko’o di Bundaran Saronde?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kompak dari tiga kelurahan', '## Kelurahan mana saja yang menggagas Koko’o di Bundaran Saronde?')
where id = '8eb20099-3045-452b-8224-159c5b698a9d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '1cd8084a-e52b-4b2d-9232-61905218306f' then jsonb_set(e, '{content}', to_jsonb('Apa tema koleksi Karawo di IFW 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tema Karawologi di IFW 2026', '## Apa tema koleksi Karawo di IFW 2026?')
where id = 'd49dd4eb-348e-477d-b1b6-d5b69bdcfb33';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c38785b3-99a8-4615-bdc2-5b50e1084adf' then jsonb_set(e, '{content}', to_jsonb('Kenapa Karawo dinilai siap ekspor?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Karawo dinilai siap ekspor', '## Kenapa Karawo dinilai siap ekspor?')
where id = 'd49dd4eb-348e-477d-b1b6-d5b69bdcfb33';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4f757b7c-275b-410a-91a9-daa07d85cc16' then jsonb_set(e, '{content}', to_jsonb('Apa hubungan Tumbilotohe dengan zakat fitrah?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Makna Tumbilotohe bagi umat Muslim', '## Apa hubungan Tumbilotohe dengan zakat fitrah?')
where id = '91af29ab-6bf8-4779-9030-857d10081a77';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '63e3cbd2-ddba-4a70-82cc-66d7c9719242' then jsonb_set(e, '{content}', to_jsonb('Apa saja tiga level pembinaan UMKM Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tiga level pembinaan UMKM Gorontalo', '## Apa saja tiga level pembinaan UMKM Gorontalo?')
where id = '4d90037f-8fc8-41f9-9f9f-ef74a35afa38';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '46b80f3b-ed10-4084-b478-d86094357e91' then jsonb_set(e, '{content}', to_jsonb('Bagaimana rencana keringanan retribusi untuk UMKM?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kaji keringanan retribusi', '## Bagaimana rencana keringanan retribusi untuk UMKM?')
where id = '4d90037f-8fc8-41f9-9f9f-ef74a35afa38';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '13154928-4914-4805-b2ae-e762de74c733' then jsonb_set(e, '{content}', to_jsonb('Apa itu program Motabi Kambungu?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Motabi Kambungu satukan 117 kegiatan', '## Apa itu program Motabi Kambungu?')
where id = '77cb4cd3-0410-4619-9b84-a17c0c3dc8a4';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c7748552-c037-4448-b854-e9593fe1b80e' then jsonb_set(e, '{content}', to_jsonb('Berapa harga paket sembako di pasar murah Gorontalo Utara?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pasar murah jelang Ramadan', '## Berapa harga paket sembako di pasar murah Gorontalo Utara?')
where id = '77cb4cd3-0410-4619-9b84-a17c0c3dc8a4';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'd77f2a71-f4a4-4fde-9116-377d7d8646a3' then jsonb_set(e, '{content}', to_jsonb('Kenapa model Motabi Kambungu layak ditiru?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa model ini layak ditiru', '## Kenapa model Motabi Kambungu layak ditiru?')
where id = '77cb4cd3-0410-4619-9b84-a17c0c3dc8a4';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2db06a88-c272-42be-bb48-d0a5c0a16dea' then jsonb_set(e, '{content}', to_jsonb('Bagaimana Makara Karawo bertahan saat pandemi?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Bertahan saat pandemi', '## Bagaimana Makara Karawo bertahan saat pandemi?')
where id = 'a5db4c4c-aa23-4217-b62e-6b76cbf0ba5a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b00cb813-29f5-4282-85ee-50dd6217ef7a' then jsonb_set(e, '{content}', to_jsonb('Berapa orang yang dipekerjakan Makara Karawo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pekerjakan 35 orang', '## Berapa orang yang dipekerjakan Makara Karawo?')
where id = 'a5db4c4c-aa23-4217-b62e-6b76cbf0ba5a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '76fbb271-52d7-47ef-9370-8f92b2db5256' then jsonb_set(e, '{content}', to_jsonb('Apa saja program BTN Gorontalo saat ini?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## BTN Gorontalo paparkan program KPR', '## Apa saja program BTN Gorontalo saat ini?')
where id = 'b12c7df1-6199-47c4-8844-592f750938e7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c9ffae6a-74e6-4f87-82ed-64f764c7f000' then jsonb_set(e, '{content}', to_jsonb('Apa masukan Rachmat Gobel untuk BTN Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Masukan Rachmat Gobel soal pariwisata', '## Apa masukan Rachmat Gobel untuk BTN Gorontalo?')
where id = 'b12c7df1-6199-47c4-8844-592f750938e7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9c6fa3e7-5e38-4bdf-8d8d-7d0adf55d949' then jsonb_set(e, '{content}', to_jsonb('Apa saja rangkaian Gorontalo Karnaval Karawo 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rangkaian Gorontalo Karnaval Karawo 2025', '## Apa saja rangkaian Gorontalo Karnaval Karawo 2025?')
where id = 'bd8d49ca-638b-41f3-b6fb-d5a264a88021';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'fdb23fa8-25cf-47ce-8fa9-e78e8d54aa7d' then jsonb_set(e, '{content}', to_jsonb('Kenapa gubernur minta pendekatan berbeda untuk karnaval?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Gubernur minta pendekatan berbeda', '## Kenapa gubernur minta pendekatan berbeda untuk karnaval?')
where id = 'bd8d49ca-638b-41f3-b6fb-d5a264a88021';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '7d96ed3b-16fe-4825-a317-ddb0bc0fd7cf' then jsonb_set(e, '{content}', to_jsonb('Apa hubungan Bongohulawa dengan sejarah Pramuka Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Bongohulawa dan sejarah Pramuka Gorontalo', '## Apa hubungan Bongohulawa dengan sejarah Pramuka Gorontalo?')
where id = '6dbeafbb-de22-409a-86bf-f184bbdf50e7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '83bff25b-5fcc-401b-a00f-ae877ab82fa0' then jsonb_set(e, '{content}', to_jsonb('Apa sejarah di balik Benteng Ulanta?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Sejarah di balik Benteng Ulanta', '## Apa sejarah di balik Benteng Ulanta?')
where id = '9a9542db-4997-4964-bce4-84ea7bff29f0';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '8834a7c8-8cfd-4829-b4a2-eae8b1d8bed6' then jsonb_set(e, '{content}', to_jsonb('Kenapa Benteng Ulanta ditinggalkan pengunjung?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Masalahnya: tidak ada alasan untuk kembali', '## Kenapa Benteng Ulanta ditinggalkan pengunjung?')
where id = '9a9542db-4997-4964-bce4-84ea7bff29f0';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b4eabffa-3bc6-439a-8c46-39b681d38b0f' then jsonb_set(e, '{content}', to_jsonb('Bandara mana saja yang dilayani rute Manado–Gorontalo–Palu?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Bandara yang dilayani rute Manado–Gorontalo–Palu', '## Bandara mana saja yang dilayani rute Manado–Gorontalo–Palu?')
where id = '29c93a8d-32ee-456b-a249-adf0b706eb38';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '7ea4cb97-e27e-4852-aa3f-736fdb125ee6' then jsonb_set(e, '{content}', to_jsonb('Bagaimana cara memesan tiket Wings Air?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pesan tiket dan check-in online', '## Bagaimana cara memesan tiket Wings Air?')
where id = '29c93a8d-32ee-456b-a249-adf0b706eb38';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '39e1aa4b-ebe5-4a23-950c-5517b07e3ad1' then jsonb_set(e, '{content}', to_jsonb('Berapa selisih harga ikan di TPI dan di lapak?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Selisih harga hampir dua kali lipat', '## Berapa selisih harga ikan di TPI dan di lapak?')
where id = '9ec06dbc-a179-42e4-ad1a-9db4d5ce566a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '53cfd9b2-a41a-4310-8a29-0d339863d21b' then jsonb_set(e, '{content}', to_jsonb('Apa tips belanja ikan di TPI?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tips belanja ikan di TPI', '## Apa tips belanja ikan di TPI?')
where id = '9ec06dbc-a179-42e4-ad1a-9db4d5ce566a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '788fd450-a4c1-4c48-89f2-ff00f7dd81e3' then jsonb_set(e, '{content}', to_jsonb('Siapa yang diprioritaskan menerima zakat fitrah?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Prioritas untuk fakir dan miskin', '## Siapa yang diprioritaskan menerima zakat fitrah?')
where id = '60ab7faf-133e-4055-a672-f5d0e88dae40';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3eb910a8-e52c-40ed-a82e-e0c880a90c58' then jsonb_set(e, '{content}', to_jsonb('Siapa yang mengibarkan bendera pada upacara HUT ke-80 RI?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Paskibraka dari sekolah terbaik', '## Siapa yang mengibarkan bendera pada upacara HUT ke-80 RI?')
where id = '37bfafb6-fe64-443c-8d9f-69069cacdb77';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'a352c49c-08de-4076-ac1e-7df448f350e2' then jsonb_set(e, '{content}', to_jsonb('Siapa komandan upacara HUT ke-80 RI di Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Komandan dan perwira upacara', '## Siapa komandan upacara HUT ke-80 RI di Gorontalo?')
where id = '37bfafb6-fe64-443c-8d9f-69069cacdb77';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '7cc2777e-0a96-418c-81b8-22d13ddcd601' then jsonb_set(e, '{content}', to_jsonb('Bagaimana masa muda Rachmat Gobel?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dari Gorontalo ke Jepang', '## Bagaimana masa muda Rachmat Gobel?')
where id = 'f5f78822-968f-404e-89db-a25f17bd7715';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '603fee8a-bb67-40a7-87a2-19ef017c1742' then jsonb_set(e, '{content}', to_jsonb('Bagaimana jejak Rachmat Gobel di politik?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Jejak Rachmat Gobel di politik', '## Bagaimana jejak Rachmat Gobel di politik?')
where id = 'f5f78822-968f-404e-89db-a25f17bd7715';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f1554b84-439e-4e2f-a8b1-4061924f91d5' then jsonb_set(e, '{content}', to_jsonb('Kenapa sulaman Karawo dikerjakan langsung di hotel?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Sulaman Karawo dikerjakan langsung di hotel', '## Kenapa sulaman Karawo dikerjakan langsung di hotel?')
where id = '3e2fe5ab-8a00-423d-b7d9-205065160231';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '44c989df-46ac-4f86-aa71-d22c1a24b80d' then jsonb_set(e, '{content}', to_jsonb('Sampai mana pesanan Karawo dari Hotel Grand Q?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pesanan sampai Makassar dan Jakarta', '## Sampai mana pesanan Karawo dari Hotel Grand Q?')
where id = '3e2fe5ab-8a00-423d-b7d9-205065160231';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '5b834051-7dcf-46ee-bab1-0666cb4ce7ed' then jsonb_set(e, '{content}', to_jsonb('Kenapa kirab bendera pusaka penting bagi generasi muda?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kirab sebagai ruang belajar sejarah', '## Kenapa kirab bendera pusaka penting bagi generasi muda?')
where id = '7e6db9eb-a83a-4e02-9339-ec5a97bfd125';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '1f289a25-8a50-4e03-a25d-9217c8ec3a64' then jsonb_set(e, '{content}', to_jsonb('Siapa yang menyepakati gelar adat Rachmat Gobel?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Disepakati lima negeri adat', '## Siapa yang menyepakati gelar adat Rachmat Gobel?')
where id = '8e71919e-07ea-4d60-a759-a8c38656c1fd';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '88aee45b-2df8-4fed-872f-2b76fdc63477' then jsonb_set(e, '{content}', to_jsonb('Apa arti lengkap gelar Taa Lo’o Lamahe Lipu?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Arti lengkap gelar adat Rachmat Gobel', '## Apa arti lengkap gelar Taa Lo’o Lamahe Lipu?')
where id = '8e71919e-07ea-4d60-a759-a8c38656c1fd';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f4ac90b5-d122-4e9c-8a37-7e85d6b3566c' then jsonb_set(e, '{content}', to_jsonb('Siapa penggagas Gorontalo Half Marathon?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Belajar dari polemik GHM 2025', '## Siapa penggagas Gorontalo Half Marathon?')
where id = '94bc4f59-d01e-4ca6-9f91-688760d8ab7c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6521f83a-739e-401a-b640-46bb4236a75c' then jsonb_set(e, '{content}', to_jsonb('Bagaimana GHM 2026 akan dibiayai?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Cari sponsor swasta untuk GHM 2026', '## Bagaimana GHM 2026 akan dibiayai?')
where id = '94bc4f59-d01e-4ca6-9f91-688760d8ab7c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '169af27d-6198-4eae-84bc-0d3c3c1a163c' then jsonb_set(e, '{content}', to_jsonb('Bagaimana 1.582 kapal akan dikelola?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## 1.582 kapal lewat koperasi nelayan', '## Bagaimana 1.582 kapal akan dikelola?')
where id = '87641536-8cf5-491b-8f00-a2a16102360f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f4f42dcc-e99b-48b7-8a5f-83fdca55d110' then jsonb_set(e, '{content}', to_jsonb('Apa yang perlu dikawal dari janji kapal untuk nelayan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Yang perlu dikawal', '## Apa yang perlu dikawal dari janji kapal untuk nelayan?')
where id = '87641536-8cf5-491b-8f00-a2a16102360f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '762b7496-7ff8-4162-8692-470bfc193570' then jsonb_set(e, '{content}', to_jsonb('Bagaimana warna dan motif Karawo bisa menembus pasar global?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Warna Karawo Gorontalo sudah kuat, motif perlu disesuaikan', '## Bagaimana warna dan motif Karawo bisa menembus pasar global?')
where id = '0d3cb8a5-1f75-4bed-afef-337f7158a59d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '71cb650d-8ab2-4868-90a8-9c87d2434fbe' then jsonb_set(e, '{content}', to_jsonb('Apa peluang Karawo bagi desainer muda?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Peluang untuk desainer muda', '## Apa peluang Karawo bagi desainer muda?')
where id = '0d3cb8a5-1f75-4bed-afef-337f7158a59d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c88cace2-317c-4889-9417-e926e9d53ca6' then jsonb_set(e, '{content}', to_jsonb('Apa istimewanya kabel listrik bawah laut ke Pulau Dudepo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pertama di Sulawesi', '## Apa istimewanya kabel listrik bawah laut ke Pulau Dudepo?')
where id = '1db780c8-3ada-4472-8796-e5a40c41f290';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c8576780-75ea-44e3-a4a2-53197ac871b0' then jsonb_set(e, '{content}', to_jsonb('Kapan listrik PLN menyala di Pulau Dudepo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Target menyala saat 17 Agustus', '## Kapan listrik PLN menyala di Pulau Dudepo?')
where id = '1db780c8-3ada-4472-8796-e5a40c41f290';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f4af0e18-5162-4ba7-9fd7-9e1c5b3200a5' then jsonb_set(e, '{content}', to_jsonb('Apa saja isi paket buka puasa di Fox Hotel Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Isi paket buka puasa di Fox Hotel Gorontalo', '## Apa saja isi paket buka puasa di Fox Hotel Gorontalo?')
where id = 'ed0c3a26-be21-4a3c-9c82-7d25ff595826';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '76449b03-7286-4cba-bf3c-79f8a9a57867' then jsonb_set(e, '{content}', to_jsonb('Apakah menu buka puasa Fox Hotel berganti setiap hari?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Menu utama ganti setiap hari', '## Apakah menu buka puasa Fox Hotel berganti setiap hari?')
where id = 'ed0c3a26-be21-4a3c-9c82-7d25ff595826';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '550f4c8d-e00a-4ebe-8e63-f26fc2808689' then jsonb_set(e, '{content}', to_jsonb('Di mana ASN bisa mendapat pelatihan gratis?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Banyak pelatihan gratis di luar sana', '## Di mana ASN bisa mendapat pelatihan gratis?')
where id = '75201298-8c25-4160-860b-d591684e7d3c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2102a7bb-a148-48dd-8450-f60d29708f46' then jsonb_set(e, '{content}', to_jsonb('Apa pelajaran dari pemangkasan anggaran BKPSDM?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pelajaran dari efisiensi', '## Apa pelajaran dari pemangkasan anggaran BKPSDM?')
where id = '75201298-8c25-4160-860b-d591684e7d3c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '99c6bfb8-81ae-49e7-a22b-87eb7e42dc2c' then jsonb_set(e, '{content}', to_jsonb('Bagaimana perjalanan RSUD Aloei Saboe selama 100 tahun?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dari balai pengobatan ke rumah sakit rujukan', '## Bagaimana perjalanan RSUD Aloei Saboe selama 100 tahun?')
where id = 'd6206ebf-2a92-46ea-b8f8-c3c5a21139ea';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '355aacbd-290b-4183-ad3c-c69c70788449' then jsonb_set(e, '{content}', to_jsonb('Kisah apa saja yang dimuat dalam buku 100 tahun RSAS?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kisah dokter Anisa di RSUD Aloei Saboe', '## Kisah apa saja yang dimuat dalam buku 100 tahun RSAS?')
where id = 'd6206ebf-2a92-46ea-b8f8-c3c5a21139ea';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2699fca8-2184-4625-93f1-dc1359df7566' then jsonb_set(e, '{content}', to_jsonb('Apa arti ramainya takjil bagi pedagang?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tanda ekonomi musiman mulai bergerak', '## Apa arti ramainya takjil bagi pedagang?')
where id = '08e6cc5a-de40-42a4-b823-e68deb23e51c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3870bdcc-f704-45ac-80e8-a693673fe22e' then jsonb_set(e, '{content}', to_jsonb('Siapa penggerak tradisi Koko’o 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Digerakkan anak muda Talumolo', '## Siapa penggerak tradisi Koko’o 2026?')
where id = '30e533e5-c8b2-495b-9f80-16c7d44a6313';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'eae5df22-9993-4b29-808d-38b806a47fd5' then jsonb_set(e, '{content}', to_jsonb('Kenapa Koko’o diusulkan jadi event wisata?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Diusulkan jadi event wisata', '## Kenapa Koko’o diusulkan jadi event wisata?')
where id = '30e533e5-c8b2-495b-9f80-16c7d44a6313';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'e4a96369-5582-40d4-b3b6-82dba3423d21' then jsonb_set(e, '{content}', to_jsonb('Bagaimana lampu Tumbilotohe berubah dari masa ke masa?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dari damar ke listrik', '## Bagaimana lampu Tumbilotohe berubah dari masa ke masa?')
where id = '69465a4f-2d03-4ecc-b5ba-b91bc458a3ca';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9ccca1d7-b255-4228-a7c0-69ba401727b7' then jsonb_set(e, '{content}', to_jsonb('Kapan waktu terbaik menikmati Tumbilotohe?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tips menikmati Tumbilotohe', '## Kapan waktu terbaik menikmati Tumbilotohe?')
where id = '69465a4f-2d03-4ecc-b5ba-b91bc458a3ca';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'a8abd166-5f57-4cd9-95f6-fd107e4232ca' then jsonb_set(e, '{content}', to_jsonb('Apa konsep UMKM Street Food Kota Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Konsep UMKM Street Food', '## Apa konsep UMKM Street Food Kota Gorontalo?')
where id = '1211e772-3e6e-40b7-adf7-fb58e1b60fb3';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6a052224-4b60-4ad9-8720-9ba7433456f7' then jsonb_set(e, '{content}', to_jsonb('Apa saja yang bisa dinikmati di UMKM Street Food?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Bukan cuma kuliner', '## Apa saja yang bisa dinikmati di UMKM Street Food?')
where id = '1211e772-3e6e-40b7-adf7-fb58e1b60fb3';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'adbb9c36-4081-4c1e-99d0-e33ed9f8cbdb' then jsonb_set(e, '{content}', to_jsonb('Berapa bangunan yang berdiri di atas lahan Pemkot di Terminal 42?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## 19 bangunan di atas lahan pemerintah', '## Berapa bangunan yang berdiri di atas lahan Pemkot di Terminal 42?')
where id = '1ff9f248-6bb9-4806-ba5b-1ea822d68f91';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6c492c80-bd3c-43c2-9621-a49468f0781b' then jsonb_set(e, '{content}', to_jsonb('Kenapa sengketa lahan Terminal 42 bisa terjadi?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Administrasi lama yang berantakan', '## Kenapa sengketa lahan Terminal 42 bisa terjadi?')
where id = '1ff9f248-6bb9-4806-ba5b-1ea822d68f91';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9c43cf60-d119-4863-9b34-a76edf6b0233' then jsonb_set(e, '{content}', to_jsonb('Berapa pengunjung dan transaksi BAHAGIA QRISFest 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Angka-angka BAHAGIA QRISFest 2026', '## Berapa pengunjung dan transaksi BAHAGIA QRISFest 2026?')
where id = 'b2b03a2e-6d30-4acd-9a41-cba8bce2873f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '73b4dc61-1ff7-497a-8307-f57fbae882ac' then jsonb_set(e, '{content}', to_jsonb('Bagaimana cara mendapat tiket konser di QRISFest?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Strategi tiket konser lewat QRIS', '## Bagaimana cara mendapat tiket konser di QRISFest?')
where id = 'b2b03a2e-6d30-4acd-9a41-cba8bce2873f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '53f00c9b-d942-4ba7-a1a0-af0b5fb4eef8' then jsonb_set(e, '{content}', to_jsonb('Kenapa penunjukan Rania Riris Ismail disorot?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Sorotan soal hubungan keluarga', '## Kenapa penunjukan Rania Riris Ismail disorot?')
where id = '0dfe127a-eebc-4cb9-a063-0c9078c1d3e7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'e2a3dd0a-0288-4859-b384-ca2a09491272' then jsonb_set(e, '{content}', to_jsonb('Berapa pengunjung Pesona Serligo 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pengunjung PESONA SERLIGO 2026 melonjak', '## Berapa pengunjung Pesona Serligo 2026?')
where id = '7a7f0fbd-def2-4042-bc5e-f9ada724a190';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ed5ef2ea-397e-4564-9f70-495e5b912225' then jsonb_set(e, '{content}', to_jsonb('Apa saja acara di Pesona Serligo 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Talkshow sampai QRIS Jelajah Indonesia', '## Apa saja acara di Pesona Serligo 2026?')
where id = '7a7f0fbd-def2-4042-bc5e-f9ada724a190';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'a4084112-59b2-4900-bfdb-82fed73ae513' then jsonb_set(e, '{content}', to_jsonb('Sampah dari daerah mana saja yang masuk TPA Talumelito?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Sampah dari tiga daerah', '## Sampah dari daerah mana saja yang masuk TPA Talumelito?')
where id = '362fe8c7-c05f-4a55-bdd7-2a6dd888b7fd';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '43ce0e83-268e-4662-8a4c-82f9f378692c' then jsonb_set(e, '{content}', to_jsonb('Kenapa TPA Talumelito cepat penuh?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## TPST 3R tak berjalan', '## Kenapa TPA Talumelito cepat penuh?')
where id = '362fe8c7-c05f-4a55-bdd7-2a6dd888b7fd';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '5524f061-37b2-483d-9ec9-18d8a16758ee' then jsonb_set(e, '{content}', to_jsonb('Apa yang bisa dilakukan warga untuk mengurangi sampah?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Yang bisa dilakukan dari rumah', '## Apa yang bisa dilakukan warga untuk mengurangi sampah?')
where id = '362fe8c7-c05f-4a55-bdd7-2a6dd888b7fd';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '0f252297-1e33-435c-9f43-ed662d8c761e' then jsonb_set(e, '{content}', to_jsonb('Seperti apa kebaya Karawo yang dipakai Wagub Idah?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Detail kebaya Karawo yang dipakai', '## Seperti apa kebaya Karawo yang dipakai Wagub Idah?')
where id = 'ce04a754-d61c-41fb-aa43-f775ed925703';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '991f511d-5ba8-4080-8093-a219bfaf6b15' then jsonb_set(e, '{content}', to_jsonb('Bagaimana Karawo dibuat?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Karawo untuk generasi muda', '## Bagaimana Karawo dibuat?')
where id = 'ce04a754-d61c-41fb-aa43-f775ed925703';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '5e646da0-9f71-4f6c-b7c6-ae00d9628a11' then jsonb_set(e, '{content}', to_jsonb('Koleksi apa saja yang dibawakan tiga model cilik Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Koleksi yang dibawakan', '## Koleksi apa saja yang dibawakan tiga model cilik Gorontalo?')
where id = 'feb6fb9c-be12-47f3-806d-28db1c3fd622';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '65c2b705-eb2d-46da-9734-1c1d7b036a79' then jsonb_set(e, '{content}', to_jsonb('Bagaimana model cilik membagi waktu dengan sekolah?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Sekolah tetap nomor satu', '## Bagaimana model cilik membagi waktu dengan sekolah?')
where id = 'feb6fb9c-be12-47f3-806d-28db1c3fd622';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '551c766b-529c-4d7d-80b3-8c756f5e90e7' then jsonb_set(e, '{content}', to_jsonb('Kenapa Gorontalo layak jadi embarkasi haji penuh?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Alasan Gorontalo layak jadi embarkasi haji penuh', '## Kenapa Gorontalo layak jadi embarkasi haji penuh?')
where id = '10a0108b-7075-4c7c-8847-2021e0c5d2fc';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '429740bd-38bd-426d-b4cb-9a0f69556734' then jsonb_set(e, '{content}', to_jsonb('Berapa anggaran pembangunan apron Bandara Djalaluddin?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Bandara Djalaluddin dapat Rp45 miliar untuk apron', '## Berapa anggaran pembangunan apron Bandara Djalaluddin?')
where id = '10a0108b-7075-4c7c-8847-2021e0c5d2fc';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b15c2ae2-d232-4608-8033-2331648e72e5' then jsonb_set(e, '{content}', to_jsonb('Kenapa PAD dari wisata hiu paus belum optimal?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Uang miliaran, PAD belum optimal', '## Kenapa PAD dari wisata hiu paus belum optimal?')
where id = '34341802-c768-4882-986f-2ee2f48b6fba';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '20722e46-46a0-4649-8baf-46d436f27bc1' then jsonb_set(e, '{content}', to_jsonb('Bagaimana destinasi lain membatasi pengunjung?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Belajar dari destinasi lain', '## Bagaimana destinasi lain membatasi pengunjung?')
where id = '34341802-c768-4882-986f-2ee2f48b6fba';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '64999b38-e712-41fb-9ed8-9b412909731a' then jsonb_set(e, '{content}', to_jsonb('Bagaimana hubungan Ismet Mile dan Rachmat Gobel?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Sahabat seperjuangan', '## Bagaimana hubungan Ismet Mile dan Rachmat Gobel?')
where id = '01ccc25c-15b4-4f50-9e74-e06b1ebf99a6';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '8ccf1fd6-c5c9-462e-9780-1a3f91cc76cf' then jsonb_set(e, '{content}', to_jsonb('Kenapa Kota Tua Gorontalo direvitalisasi?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Revitalisasi Kota Tua Gorontalo', '## Kenapa Kota Tua Gorontalo direvitalisasi?')
where id = '6aa72e96-8d64-41a4-bb03-7543025e5011';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'abd21a15-0c5c-47c1-9cc5-307e5d085192' then jsonb_set(e, '{content}', to_jsonb('Kenapa kawasan Kota Tua istimewa?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa Kota Tua istimewa', '## Kenapa kawasan Kota Tua istimewa?')
where id = '6aa72e96-8d64-41a4-bb03-7543025e5011';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ec82d1e8-7681-423f-9f94-582c8f736189' then jsonb_set(e, '{content}', to_jsonb('Bagaimana pandangan warga terhadap Karawo dulu dan kini?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dulu malu, kini bangga', '## Bagaimana pandangan warga terhadap Karawo dulu dan kini?')
where id = '10dee3ee-a676-4757-b906-d4f67c36f843';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'fa34af18-789f-4253-9b2b-799681979c93' then jsonb_set(e, '{content}', to_jsonb('Apa hubungan HACF 2025 dengan Kharisma Event Nusantara?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Bagian dari Kharisma Event Nusantara', '## Apa hubungan HACF 2025 dengan Kharisma Event Nusantara?')
where id = '10dee3ee-a676-4757-b906-d4f67c36f843';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '8e450af3-96a4-4107-b239-0dbb4110df78' then jsonb_set(e, '{content}', to_jsonb('Berapa finalis PPIB ke-IX Kota Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## 18 finalis PPIB ke-IX Kota Gorontalo', '## Berapa finalis PPIB ke-IX Kota Gorontalo?')
where id = '3745c42a-cd0a-4472-970d-ff7254db9f8b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '1b21d439-cf4f-43af-b04e-6a7aac66a337' then jsonb_set(e, '{content}', to_jsonb('Apa dampak PPIB bagi pedagang sekitar?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pedagang ikut untung', '## Apa dampak PPIB bagi pedagang sekitar?')
where id = '3745c42a-cd0a-4472-970d-ff7254db9f8b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2d6e365b-b4c9-4435-8b23-2296ce3f7086' then jsonb_set(e, '{content}', to_jsonb('Berapa saham Pemprov Gorontalo di Bank SulutGo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Saham Pemprov Gorontalo di Bank SulutGo', '## Berapa saham Pemprov Gorontalo di Bank SulutGo?')
where id = '38a6208e-cb48-44bf-976c-dc1916be0b86';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '134f02fa-89cd-430d-9eac-6bbb9bf00547' then jsonb_set(e, '{content}', to_jsonb('Apakah investasi Pemprov di Bank SulutGo sudah balik modal?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Sudah balik modal', '## Apakah investasi Pemprov di Bank SulutGo sudah balik modal?')
where id = '38a6208e-cb48-44bf-976c-dc1916be0b86';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '1d05971a-5636-41f9-b250-e8793f7c5128' then jsonb_set(e, '{content}', to_jsonb('Kenapa pasien jantung tak perlu lagi dirujuk ke Jakarta?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tidak lagi dirujuk ke Harapan Kita', '## Kenapa pasien jantung tak perlu lagi dirujuk ke Jakarta?')
where id = '28cbd69a-6dd1-4738-9dbc-88d53cc5c5eb';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9305a48b-3a07-46e5-9fc4-e1a06f609830' then jsonb_set(e, '{content}', to_jsonb('Apa arti layanan bedah jantung bagi RSAS sebagai rujukan regional?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## RSAS sebagai rujukan regional', '## Apa arti layanan bedah jantung bagi RSAS sebagai rujukan regional?')
where id = '28cbd69a-6dd1-4738-9dbc-88d53cc5c5eb';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '8187699d-05fb-49aa-8ea2-ad5ee01e9868' then jsonb_set(e, '{content}', to_jsonb('Berapa harga menu bakery di Food Festival 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Menu dan harga', '## Berapa harga menu bakery di Food Festival 2025?')
where id = '6ce5aa39-ad3d-47bb-b2cd-924bbac427ca';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '89d325d0-071f-4d37-99fa-bac5000c9421' then jsonb_set(e, '{content}', to_jsonb('Apakah lapak Food Festival Indogrosir gratis untuk UMKM?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Lapak gratis untuk UMKM', '## Apakah lapak Food Festival Indogrosir gratis untuk UMKM?')
where id = '6ce5aa39-ad3d-47bb-b2cd-924bbac427ca';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '297202ce-5432-48d6-bd76-24e22d4680f7' then jsonb_set(e, '{content}', to_jsonb('Dari daerah mana saja 218 jemaah Kloter 30 berasal?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rincian jemaah yang pulang', '## Dari daerah mana saja 218 jemaah Kloter 30 berasal?')
where id = 'e6b88879-9253-4af1-9fd2-c37c72336df9';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ed06f6d4-6a8c-4c6e-bc1d-42b0056d6a17' then jsonb_set(e, '{content}', to_jsonb('Apakah jumlah 3.000 pendaftar sesuai perkiraan panitia?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Di luar perkiraan panitia', '## Apakah jumlah 3.000 pendaftar sesuai perkiraan panitia?')
where id = '8f8dcd73-0467-4da0-a9a8-cd7591704d04';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c07a17de-2df9-4619-a4b0-34445668fc9e' then jsonb_set(e, '{content}', to_jsonb('Apa tiga permintaan Gusnar untuk Labkesmas?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tiga permintaan untuk Labkesmas Provinsi Gorontalo', '## Apa tiga permintaan Gusnar untuk Labkesmas?')
where id = '2b9f68fe-b835-43c2-aa74-2318adbc04df';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '69eb5c41-1576-4434-b678-934c0aa61cba' then jsonb_set(e, '{content}', to_jsonb('Sudah berapa lantai gedung Labkesmas yang selesai?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Baru satu lantai', '## Sudah berapa lantai gedung Labkesmas yang selesai?')
where id = '2b9f68fe-b835-43c2-aa74-2318adbc04df';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f836ff0e-de2e-4ddb-92e8-b85f58ab8bb0' then jsonb_set(e, '{content}', to_jsonb('Apa syarat utama pengajuan program LAUTRA?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kunci ada di desa', '## Apa syarat utama pengajuan program LAUTRA?')
where id = '4ccf7695-0dc3-409a-adf0-313534d7a076';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'e2c6d17b-b68b-4e88-a036-87593c2c830f' then jsonb_set(e, '{content}', to_jsonb('Kenapa warga Botubarani perlu terlibat dalam LAUTRA?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa warga perlu terlibat', '## Kenapa warga Botubarani perlu terlibat dalam LAUTRA?')
where id = '4ccf7695-0dc3-409a-adf0-313534d7a076';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ad81650a-3891-4195-84ec-94ddcd35913c' then jsonb_set(e, '{content}', to_jsonb('Berapa cadangan emas dan target produksi Pani Gold Project?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Cadangan dan target produksi Pani Gold Project', '## Berapa cadangan emas dan target produksi Pani Gold Project?')
where id = '367ca684-def7-4710-82cd-c124a3d89b40';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'd41fbbc1-961d-4ed4-811d-c329074feeed' then jsonb_set(e, '{content}', to_jsonb('Berapa potensi pendapatan negara dari Pani Gold Project?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Potensi royalti dan pajak Rp15 triliun', '## Berapa potensi pendapatan negara dari Pani Gold Project?')
where id = '367ca684-def7-4710-82cd-c124a3d89b40';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2a456772-6c1b-48ec-98ef-543e1131bdb0' then jsonb_set(e, '{content}', to_jsonb('Apa persoalan tali asih bagi penambang tradisional?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Persoalan tali asih', '## Apa persoalan tali asih bagi penambang tradisional?')
where id = '367ca684-def7-4710-82cd-c124a3d89b40';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ee92e09b-7ef7-410b-a8e7-19c56dd8022b' then jsonb_set(e, '{content}', to_jsonb('Kenapa Gusnar diminta berbagi pengalaman ke gubernur lain?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Gusnar diminta berbagi pengalaman', '## Kenapa Gusnar diminta berbagi pengalaman ke gubernur lain?')
where id = 'c9c747cb-4a5a-47d7-946d-c84d5e3f8da2';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'cd7d63ea-96ae-4b10-8777-8839967f573d' then jsonb_set(e, '{content}', to_jsonb('Bisakah model BSPS dan sertifikat gratis ditiru daerah lain?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Bisa ditiru daerah lain', '## Bisakah model BSPS dan sertifikat gratis ditiru daerah lain?')
where id = 'c9c747cb-4a5a-47d7-946d-c84d5e3f8da2';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4c29c51f-ce6b-4005-88c2-d2fa073f1554' then jsonb_set(e, '{content}', to_jsonb('Bagaimana jejak Rustam Akili sebagai pendidik?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Jejak Rustam Akili sebagai pendidik', '## Bagaimana jejak Rustam Akili sebagai pendidik?')
where id = 'cd9a1a3b-1aa8-4924-bb81-acb18cec4ee7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'e9ee7b59-e838-4f70-9dc0-7f4e74506796' then jsonb_set(e, '{content}', to_jsonb('Bagaimana karier politik Rustam Akili?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Karier politik yang panjang', '## Bagaimana karier politik Rustam Akili?')
where id = 'cd9a1a3b-1aa8-4924-bb81-acb18cec4ee7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c5594de9-dca0-487f-9427-c601b2912c29' then jsonb_set(e, '{content}', to_jsonb('Sejak kapan gagasan Masjid Raya Gorontalo muncul?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Perjalanan panjang Masjid Raya Gorontalo', '## Sejak kapan gagasan Masjid Raya Gorontalo muncul?')
where id = '50f3068a-4749-4da4-acc4-8380cb536d39';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '8103556b-3399-4e7e-b9b1-5482b97baf22' then jsonb_set(e, '{content}', to_jsonb('Dari mana dana pembangunan Masjid Raya Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tanpa APBD, murni dari infak', '## Dari mana dana pembangunan Masjid Raya Gorontalo?')
where id = '50f3068a-4749-4da4-acc4-8380cb536d39';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '99a58bf7-92a8-4242-9998-7c5d6e5853d1' then jsonb_set(e, '{content}', to_jsonb('Apa saja yang ditinjau dalam persiapan PENAS 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Yang ditinjau', '## Apa saja yang ditinjau dalam persiapan PENAS 2026?')
where id = '0f5f9f7f-14ed-4d82-8fad-6045beda7c1c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'e66995ba-9428-4d27-b782-83640c1fc70c' then jsonb_set(e, '{content}', to_jsonb('Berapa rumah warga yang disiapkan jadi homestay PENAS?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## 6.000 rumah warga jadi homestay', '## Berapa rumah warga yang disiapkan jadi homestay PENAS?')
where id = '0f5f9f7f-14ed-4d82-8fad-6045beda7c1c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'a32c6416-8806-4c71-90b0-5ea6e7d25829' then jsonb_set(e, '{content}', to_jsonb('Apa saja isi kawasan Masjid Raya Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Isi kawasan Masjid Raya', '## Apa saja isi kawasan Masjid Raya Gorontalo?')
where id = '313b4313-22ee-4276-8945-b775dc10ce90';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '270d2ae9-21ed-43ef-9ad3-dfd5d00c0a25' then jsonb_set(e, '{content}', to_jsonb('Bagaimana cara berinfak untuk Gorontalo Islamic Center?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Infak lewat QRIS dan sedekah ASN', '## Bagaimana cara berinfak untuk Gorontalo Islamic Center?')
where id = '313b4313-22ee-4276-8945-b775dc10ce90';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '240347a6-9598-4ab6-b5f0-801a3a20d383' then jsonb_set(e, '{content}', to_jsonb('Bagaimana menghindari QRIS palsu infak Islamic Center?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Waspada QRIS palsu', '## Bagaimana menghindari QRIS palsu infak Islamic Center?')
where id = '313b4313-22ee-4276-8945-b775dc10ce90';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'db3f3117-769e-48f8-99b2-bf844040d0c7' then jsonb_set(e, '{content}', to_jsonb('Apa yang berubah dari zakat fitrah Boalemo tahun ini?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Zakat fitrah Boalemo tahun ini hanya satu golongan', '## Apa yang berubah dari zakat fitrah Boalemo tahun ini?')
where id = 'fdb50dfa-74eb-4db4-9add-cef84cb96bf7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3267cab0-2686-40a0-8808-f7481b499a62' then jsonb_set(e, '{content}', to_jsonb('Berapa fidyah di Boalemo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Fidyah Rp20.000 per hari', '## Berapa fidyah di Boalemo?')
where id = 'fdb50dfa-74eb-4db4-9add-cef84cb96bf7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'd5e0e937-98f9-4c32-b1ec-30bed1661cb2' then jsonb_set(e, '{content}', to_jsonb('Ke mana zakat fitrah Boalemo disalurkan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Disalurkan lewat UPZ di tiap desa', '## Ke mana zakat fitrah Boalemo disalurkan?')
where id = 'fdb50dfa-74eb-4db4-9add-cef84cb96bf7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '511853cf-4d2d-4afd-a68b-bb7c6722f073' then jsonb_set(e, '{content}', to_jsonb('Berapa uang tunai yang disiapkan BI Gorontalo untuk Nataru?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rincian uang yang disiapkan BI Gorontalo', '## Berapa uang tunai yang disiapkan BI Gorontalo untuk Nataru?')
where id = 'e6ac1b31-bed5-4e25-9b63-826a778b9739';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3b6ee680-11ce-46a4-88a1-2ee935ecb0f9' then jsonb_set(e, '{content}', to_jsonb('Bagaimana cara menukar uang baru dengan aman?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tips menukar uang dengan aman', '## Bagaimana cara menukar uang baru dengan aman?')
where id = 'e6ac1b31-bed5-4e25-9b63-826a778b9739';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '11bba7ca-dda6-46aa-86b8-ea0772245420' then jsonb_set(e, '{content}', to_jsonb('Apa saja rangkaian Ramadan Run Festival?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rangkaian Ramadan Run Festival', '## Apa saja rangkaian Ramadan Run Festival?')
where id = 'a38111d5-3629-4304-98f5-f739074691ce';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '0afff64c-c4ac-49bd-9209-9a49ccbcc84a' then jsonb_set(e, '{content}', to_jsonb('Kenapa donor darah di bulan Ramadan penting?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Donor darah di bulan Ramadan', '## Kenapa donor darah di bulan Ramadan penting?')
where id = 'a38111d5-3629-4304-98f5-f739074691ce';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f32c2d10-4546-4ea5-a634-451c394ba4f1' then jsonb_set(e, '{content}', to_jsonb('Bagaimana perkembangan IPM dan stunting Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## HUT ke-25 Provinsi Gorontalo: IPM, kemiskinan, dan stunting', '## Bagaimana perkembangan IPM dan stunting Gorontalo?')
where id = '7873c097-649e-4e0c-b349-8d69bd87101b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3d8da36a-3ff7-49bc-82eb-e7555dc79051' then jsonb_set(e, '{content}', to_jsonb('Bagaimana capaian reformasi birokrasi dan layanan digital Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Birokrasi dan layanan digital', '## Bagaimana capaian reformasi birokrasi dan layanan digital Gorontalo?')
where id = '7873c097-649e-4e0c-b349-8d69bd87101b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '8caedec4-226d-4531-aad0-206fd8c2aff7' then jsonb_set(e, '{content}', to_jsonb('Kenapa 87 blok WPR belum bisa diurus IPR?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## 87 dari 97 blok WPR masih jadi pekerjaan rumah', '## Kenapa 87 blok WPR belum bisa diurus IPR?')
where id = 'c3ef9d82-ce74-4964-bf36-7fe78fceabad';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'aca4c396-b57f-4744-b178-07eb1f0c82fe' then jsonb_set(e, '{content}', to_jsonb('Kenapa IPR penting bagi penambang rakyat?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa IPR penting', '## Kenapa IPR penting bagi penambang rakyat?')
where id = 'c3ef9d82-ce74-4964-bf36-7fe78fceabad';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '7cc84172-04c8-4a2e-bab5-2e7732414f87' then jsonb_set(e, '{content}', to_jsonb('Apa yang bisa dipelajari pelajar dari PENAS?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Belajar di luar kelas', '## Apa yang bisa dipelajari pelajar dari PENAS?')
where id = '30eb79ec-5a98-4cb5-85a3-399314c60ede';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'a43da121-f161-4b63-91f8-29647585bbfb' then jsonb_set(e, '{content}', to_jsonb('Bagaimana cara jadi duta keramahan PENAS?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Cara jadi duta keramahan', '## Bagaimana cara jadi duta keramahan PENAS?')
where id = '30eb79ec-5a98-4cb5-85a3-399314c60ede';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '91f2a1a0-ef65-43b0-a6ca-39ad70c3c379' then jsonb_set(e, '{content}', to_jsonb('Apa itu Biliu?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Mengenal Biliu', '## Apa itu Biliu?')
where id = '9fcd92b0-01e8-4c87-828d-635fb8c1f912';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b8b6c363-0155-4b77-acdf-67264ba03960' then jsonb_set(e, '{content}', to_jsonb('Apa itu Makuta?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Mengenal Makuta', '## Apa itu Makuta?')
where id = '9fcd92b0-01e8-4c87-828d-635fb8c1f912';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '1b8cd18e-0f27-47d2-ac9f-d4dee32c8bec' then jsonb_set(e, '{content}', to_jsonb('Apa itu Tumbilotohe Underwater?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tumbilotohe Underwater sebagai kampanye laut', '## Apa itu Tumbilotohe Underwater?')
where id = '552f81a5-8611-43b5-8994-65d651149cfe';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '49bc1709-bccc-4021-904e-52c5470cfae6' then jsonb_set(e, '{content}', to_jsonb('Berapa lampu yang dipasang di bawah laut tahun ini?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## 30 lampu di bawah laut', '## Berapa lampu yang dipasang di bawah laut tahun ini?')
where id = '552f81a5-8611-43b5-8994-65d651149cfe';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '585a773d-49d6-4561-816f-97d99b5d01f1' then jsonb_set(e, '{content}', to_jsonb('Apakah bedah jantung terbuka ditanggung BPJS Kesehatan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Menunggu kepastian BPJS Kesehatan', '## Apakah bedah jantung terbuka ditanggung BPJS Kesehatan?')
where id = 'd49d6cb9-43a0-4267-8f3f-0ecb9dff9cd0';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '49ad6f43-f8a2-4acd-b736-7f568ac0c5f7' then jsonb_set(e, '{content}', to_jsonb('Bagaimana kondisi pasien operasi perdana?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tantangan setelah operasi perdana', '## Bagaimana kondisi pasien operasi perdana?')
where id = 'd49d6cb9-43a0-4267-8f3f-0ecb9dff9cd0';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6e82f8d7-a510-44f0-aec0-62b3d2f88d97' then jsonb_set(e, '{content}', to_jsonb('Seperti apa alikusu Tumbilotohe 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Alikusu seragam setinggi dua meter', '## Seperti apa alikusu Tumbilotohe 2025?')
where id = 'ea9e7fa9-66f9-44f1-bb7b-2a8289975ffd';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f78fed2b-21cc-4790-908e-800caeecf498' then jsonb_set(e, '{content}', to_jsonb('Apa aturan keselamatan selama Tumbilotohe?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Aturan keselamatan selama Tumbilotohe', '## Apa aturan keselamatan selama Tumbilotohe?')
where id = 'ea9e7fa9-66f9-44f1-bb7b-2a8289975ffd';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f4793142-2317-4440-bee3-1164731e0b41' then jsonb_set(e, '{content}', to_jsonb('Bagaimana hasil tinjauan Menteri Trenggono di KNMP Leato Selatan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## KNMP Leato Selatan sesuai spesifikasi', '## Bagaimana hasil tinjauan Menteri Trenggono di KNMP Leato Selatan?')
where id = '78368464-15c5-4f65-b36b-63b9a10fc66a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2f831f1c-5d79-43e2-b138-49b5cadbfc74' then jsonb_set(e, '{content}', to_jsonb('Fasilitas apa saja yang ada di KNMP Leato Selatan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pabrik es, bengkel, hingga cold storage', '## Fasilitas apa saja yang ada di KNMP Leato Selatan?')
where id = '78368464-15c5-4f65-b36b-63b9a10fc66a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'a69fcd6d-d67b-4a39-a38a-d23cc9c754e9' then jsonb_set(e, '{content}', to_jsonb('Kenapa es penting bagi nelayan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa es penting bagi nelayan', '## Kenapa es penting bagi nelayan?')
where id = '78368464-15c5-4f65-b36b-63b9a10fc66a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2f48cca6-7568-4dc7-97f6-41898a41685c' then jsonb_set(e, '{content}', to_jsonb('Siapa yang menyiapkan kolak ubi gratis?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kolak ubi dari swadaya warga', '## Siapa yang menyiapkan kolak ubi gratis?')
where id = 'caea0a5b-7ac2-41dd-b874-3dfaa734e8df';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '57c8291f-9109-491d-bad2-ac711e4728a4' then jsonb_set(e, '{content}', to_jsonb('Kenapa pawai obor digelar di pertengahan Ramadan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Makna Pawai Obor di pertengahan Ramadan', '## Kenapa pawai obor digelar di pertengahan Ramadan?')
where id = 'caea0a5b-7ac2-41dd-b874-3dfaa734e8df';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3b1e7c03-0867-499d-aa16-e00eef4cfaa9' then jsonb_set(e, '{content}', to_jsonb('Fasilitas apa yang direnovasi di Masjid Agung Baiturrahim?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tempat wudu dan kamar mandi direnovasi', '## Fasilitas apa yang direnovasi di Masjid Agung Baiturrahim?')
where id = '651c791b-e5f3-47ae-a840-9fd1e9556191';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2490bcdf-a107-401d-b7ce-35f3a54c6fed' then jsonb_set(e, '{content}', to_jsonb('Kenapa sembilan makam ini dipindahkan pemerintah?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Makam tanpa ahli waris', '## Kenapa sembilan makam ini dipindahkan pemerintah?')
where id = '1538fbf5-de8b-451f-81ac-97e896291b13';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b5ac13f4-db18-4beb-a6d5-d9af9e26800f' then jsonb_set(e, '{content}', to_jsonb('Berapa makam yang masih tersisa di eks Terminal 42?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Masih ada 43 makam', '## Berapa makam yang masih tersisa di eks Terminal 42?')
where id = '1538fbf5-de8b-451f-81ac-97e896291b13';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '472e2907-a40e-4b42-baac-915762c0943d' then jsonb_set(e, '{content}', to_jsonb('Siapa saja tamu PENAS XVII yang disambut Gusnar?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tamu PENAS XVII dari berbagai daerah', '## Siapa saja tamu PENAS XVII yang disambut Gusnar?')
where id = '4e5b934d-886d-4e9e-b431-0772d28e7cf9';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'd425ff33-a12e-48e9-a084-2f39a98598ee' then jsonb_set(e, '{content}', to_jsonb('Bagaimana urutan prosesi Mopotilolo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Urutan prosesi', '## Bagaimana urutan prosesi Mopotilolo?')
where id = '4e5b934d-886d-4e9e-b431-0772d28e7cf9';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2dcbe55b-00c6-4e5b-ad9e-e232d0b0bcd6' then jsonb_set(e, '{content}', to_jsonb('Bagaimana rangkaian upacara HUT ke-81 RI di Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rangkaian Upacara: Dari Pengibaran Bendera Sampai Doa Bersama', '## Bagaimana rangkaian upacara HUT ke-81 RI di Gorontalo?')
where id = 'c1fa04b7-8c7d-4330-a900-21567c537b15';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '1dae0c09-8d27-454e-8931-10668969932e' then jsonb_set(e, '{content}', to_jsonb('Siapa saja anggota Paskibraka yang bertugas?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Deretan Anak Muda di Balik Suksesnya Pengibaran Bendera', '## Siapa saja anggota Paskibraka yang bertugas?')
where id = 'c1fa04b7-8c7d-4330-a900-21567c537b15';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b97688be-8d5c-4662-9ab2-52dba3b7a828' then jsonb_set(e, '{content}', to_jsonb('Program dokter spesialis apa saja yang dibuka UNG?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Program dokter spesialis yang dibuka', '## Program dokter spesialis apa saja yang dibuka UNG?')
where id = 'ed73810c-5d14-400c-8f18-ea4de6f54039';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '450bedf2-bd16-48ae-b705-aeaa6906bb52' then jsonb_set(e, '{content}', to_jsonb('Apa tantangan terbesar pendidikan dokter spesialis di Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Gusnar: tantangannya pembiayaan', '## Apa tantangan terbesar pendidikan dokter spesialis di Gorontalo?')
where id = 'ed73810c-5d14-400c-8f18-ea4de6f54039';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4e500d81-8db0-4ccf-b415-82778cf0325e' then jsonb_set(e, '{content}', to_jsonb('Apa saja kategori Insan Parekraf Gorontalo Awards 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kategori penghargaan', '## Apa saja kategori Insan Parekraf Gorontalo Awards 2025?')
where id = '6af8543c-3d5c-4a76-afbe-127009a1a572';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9526a805-fdc1-4fa0-bd3a-ab43dc849637' then jsonb_set(e, '{content}', to_jsonb('Kenapa Karawo makin disukai anak muda?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Karawo makin disukai anak muda', '## Kenapa Karawo makin disukai anak muda?')
where id = '6af8543c-3d5c-4a76-afbe-127009a1a572';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b2038f8f-e1b4-4f44-963e-04fb0b82c827' then jsonb_set(e, '{content}', to_jsonb('Bagaimana perjalanan karier Syafrin Liputo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Karier Syafrin Liputo yang naik turun', '## Bagaimana perjalanan karier Syafrin Liputo?')
where id = '73307209-a289-483d-893e-e3433b8d0c86';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '76e970e9-dbca-4c20-a562-39c358b17c95' then jsonb_set(e, '{content}', to_jsonb('Apa tantangan Syafrin Liputo di Jakarta Selatan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tantangan di Jakarta Selatan', '## Apa tantangan Syafrin Liputo di Jakarta Selatan?')
where id = '73307209-a289-483d-893e-e3433b8d0c86';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '78805d79-3036-43f7-bfdb-1bb60580018c' then jsonb_set(e, '{content}', to_jsonb('Apa saja menu Korea di Aston Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Isi menu Korea di Aston Gorontalo', '## Apa saja menu Korea di Aston Gorontalo?')
where id = '0d484a59-cf7b-4f1f-9339-45a5774f5ef1';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'bb88a9cd-e88c-4b70-b4ec-d946e67f3bb3' then jsonb_set(e, '{content}', to_jsonb('Lomba apa saja yang khas di Festival Jaton?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Lomba-lomba khas Jaton', '## Lomba apa saja yang khas di Festival Jaton?')
where id = 'f6cd2b13-ea12-4037-a6b0-aa40f03553ba';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ad0afaa4-48ba-49a5-9737-1ab344559013' then jsonb_set(e, '{content}', to_jsonb('Kenapa budaya Jaton menarik?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa Jaton menarik', '## Kenapa budaya Jaton menarik?')
where id = 'f6cd2b13-ea12-4037-a6b0-aa40f03553ba';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b575dec3-0aac-4f45-97ce-0c0e46c49c0c' then jsonb_set(e, '{content}', to_jsonb('Bagaimana sejarah awal Tumbilotohe?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Berawal dari masuknya Islam', '## Bagaimana sejarah awal Tumbilotohe?')
where id = '07046004-d7e9-4234-b18f-1656c7fc5bf0';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9d184e2b-1de6-41db-b030-1da463823cdb' then jsonb_set(e, '{content}', to_jsonb('Apa fungsi sosial lampu Tumbilotohe dulu?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tanda sudah bayar zakat fitrah', '## Apa fungsi sosial lampu Tumbilotohe dulu?')
where id = '07046004-d7e9-4234-b18f-1656c7fc5bf0';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'a264753c-e81f-46bd-aa91-e3dd3245ab81' then jsonb_set(e, '{content}', to_jsonb('Sudah berapa polopalo yang dibuat untuk PENAS?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Progres pembuatan polopalo', '## Sudah berapa polopalo yang dibuat untuk PENAS?')
where id = '7341d069-ff51-48b5-b759-a70ac81191b7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9b644484-10e3-4345-9e77-8505b4fbe39f' then jsonb_set(e, '{content}', to_jsonb('Apa itu polopalo dan bagaimana cara memainkannya?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Mengenal polopalo', '## Apa itu polopalo dan bagaimana cara memainkannya?')
where id = '7341d069-ff51-48b5-b759-a70ac81191b7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'caa9d60c-ab07-4ecd-b94e-789eaa5f7b08' then jsonb_set(e, '{content}', to_jsonb('Apa itu Run Tumbilotohe?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Inovasi baru: Run Tumbilotohe', '## Apa itu Run Tumbilotohe?')
where id = '5bd289a4-9ecc-44bb-a380-a8509d43e2d4';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '1e714b5b-97ca-4923-9796-6e9acc825c4e' then jsonb_set(e, '{content}', to_jsonb('Apa itu tradisi Tumbilotohe?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tradisi tiga malam terakhir Ramadan', '## Apa itu tradisi Tumbilotohe?')
where id = '5bd289a4-9ecc-44bb-a380-a8509d43e2d4';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '645f56a3-18b1-419d-9fbc-42df32343793' then jsonb_set(e, '{content}', to_jsonb('Apa saja rangkaian Haul ke-58 Guru Tua?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rangkaian haul', '## Apa saja rangkaian Haul ke-58 Guru Tua?')
where id = 'ec390a93-490a-4266-8927-a75f1e13bfca';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2ed7fc2a-3b96-4ffa-ad08-a082becb4860' then jsonb_set(e, '{content}', to_jsonb('Apa relevansi Alkhairaat bagi Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Relevansi untuk Gorontalo', '## Apa relevansi Alkhairaat bagi Gorontalo?')
where id = 'ec390a93-490a-4266-8927-a75f1e13bfca';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'd99fa034-adf4-4d61-9397-2337c004353f' then jsonb_set(e, '{content}', to_jsonb('Berapa luas lahan Islamic Centre yang diratakan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Luas dan volume pekerjaan', '## Berapa luas lahan Islamic Centre yang diratakan?')
where id = '47040b2d-ce6b-407e-8421-d735fa76c1d5';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '22960108-1836-47c1-a636-a199f5d61c31' then jsonb_set(e, '{content}', to_jsonb('Berapa donasi Masjid Raya Gorontalo yang terkumpul?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Donasi Rp1,73 miliar', '## Berapa donasi Masjid Raya Gorontalo yang terkumpul?')
where id = '47040b2d-ce6b-407e-8421-d735fa76c1d5';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '0889eb19-01ce-4b22-9448-3aba1867b0b9' then jsonb_set(e, '{content}', to_jsonb('Kenapa uji tanah penting sebelum membangun masjid raya?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa uji tanah penting', '## Kenapa uji tanah penting sebelum membangun masjid raya?')
where id = '47040b2d-ce6b-407e-8421-d735fa76c1d5';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'd63dd32e-b086-4971-a8d6-e762e149abb4' then jsonb_set(e, '{content}', to_jsonb('Berapa lama pengerjaan ruas jalan Inpres?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Selesai dalam dua bulan', '## Berapa lama pengerjaan ruas jalan Inpres?')
where id = 'b97152e5-ed03-41fe-943f-8fc695192d00';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '96a77e8b-d294-4425-b8d0-5f28b3173599' then jsonb_set(e, '{content}', to_jsonb('Kenapa APBN di Gorontalo bergantung pada transfer pusat?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Ketergantungan pada transfer pusat', '## Kenapa APBN di Gorontalo bergantung pada transfer pusat?')
where id = 'ae242958-2d29-446c-bb9f-caeb48761a7f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f9aa4f94-a3fc-455d-9c22-01b3b2576d73' then jsonb_set(e, '{content}', to_jsonb('Berapa pertumbuhan ekonomi Gorontalo 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Ekonomi tetap tumbuh', '## Berapa pertumbuhan ekonomi Gorontalo 2025?')
where id = 'ae242958-2d29-446c-bb9f-caeb48761a7f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '18fd6f64-4bf9-4613-ae2b-28d007b236dd' then jsonb_set(e, '{content}', to_jsonb('Berapa realisasi investasi Gorontalo 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Realisasi 2025 lampaui target', '## Berapa realisasi investasi Gorontalo 2025?')
where id = '402d627b-5d85-4398-828c-3f89b898a5c1';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '1bb5616f-b568-4203-81f0-abcf8d5d7ced' then jsonb_set(e, '{content}', to_jsonb('Bagaimana target investasi dibagi per daerah?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pembagian target investasi Gorontalo per daerah', '## Bagaimana target investasi dibagi per daerah?')
where id = '402d627b-5d85-4398-828c-3f89b898a5c1';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9b898055-758d-4f4b-8080-5243193967cd' then jsonb_set(e, '{content}', to_jsonb('Apa kendala investasi di kabupaten dan kota?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tantangan di daerah', '## Apa kendala investasi di kabupaten dan kota?')
where id = '402d627b-5d85-4398-828c-3f89b898a5c1';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '50a7527b-87ff-4959-a19a-37b1d60d5014' then jsonb_set(e, '{content}', to_jsonb('Di dinas mana aset Pemprov Gorontalo terbesar?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Aset Pemprov Gorontalo terbesar di dua dinas', '## Di dinas mana aset Pemprov Gorontalo terbesar?')
where id = 'ac907fad-8c99-4ee7-9b7f-3279b170fe55';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2c9b486f-2f7a-4ef2-b014-161b4a73e0e3' then jsonb_set(e, '{content}', to_jsonb('Kenapa sensus aset daerah penting?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa sensus aset penting', '## Kenapa sensus aset daerah penting?')
where id = 'ac907fad-8c99-4ee7-9b7f-3279b170fe55';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '71fe4635-c4f5-4797-be3c-101f78659a86' then jsonb_set(e, '{content}', to_jsonb('Program apa saja yang sudah dijalankan Kementerian HAM di Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Program yang sudah berjalan', '## Program apa saja yang sudah dijalankan Kementerian HAM di Gorontalo?')
where id = '9bb510eb-ccc4-4779-b581-c49c335a1ac1';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b458381b-bdad-4d39-82a6-c4866c895b25' then jsonb_set(e, '{content}', to_jsonb('Kenapa kantor Kementerian HAM Gorontalo diusulkan jadi kanwil sendiri?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Usulan jadi kanwil sendiri', '## Kenapa kantor Kementerian HAM Gorontalo diusulkan jadi kanwil sendiri?')
where id = '9bb510eb-ccc4-4779-b581-c49c335a1ac1';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6165b24f-501b-4f8b-98b7-fba228e3ef91' then jsonb_set(e, '{content}', to_jsonb('Berapa kasus korupsi yang melibatkan ASN menurut KPK?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## 25 persen kasus libatkan ASN', '## Berapa kasus korupsi yang melibatkan ASN menurut KPK?')
where id = '9bcc79ce-af33-48e8-9f0a-22559f37c7d2';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ea54485c-7966-49f0-b674-92b6cdd8ed3c' then jsonb_set(e, '{content}', to_jsonb('Kenapa keluarga pejabat jadi sasaran edukasi antikorupsi?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa keluarga jadi sasaran', '## Kenapa keluarga pejabat jadi sasaran edukasi antikorupsi?')
where id = '9bcc79ce-af33-48e8-9f0a-22559f37c7d2';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '405a1ce6-b169-490b-b205-45acfbdc4f8d' then jsonb_set(e, '{content}', to_jsonb('Bagaimana pejabat pimpinan tinggi pratama dipilih?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Lewat manajemen talenta', '## Bagaimana pejabat pimpinan tinggi pratama dipilih?')
where id = '0704c406-4be1-4743-9c0f-3577fbdef4be';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'a7dd6d6b-a8b5-4431-8771-711b36e6ba54' then jsonb_set(e, '{content}', to_jsonb('Kenapa pelantikan pejabat ini perlu dipantau?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa perlu dipantau', '## Kenapa pelantikan pejabat ini perlu dipantau?')
where id = '0704c406-4be1-4743-9c0f-3577fbdef4be';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4ec9c5d2-6854-4fe4-80ed-a228bd9704e0' then jsonb_set(e, '{content}', to_jsonb('Bagaimana tren kasus HIV-AIDS di Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kasus masih naik, termasuk di usia muda', '## Bagaimana tren kasus HIV-AIDS di Gorontalo?')
where id = 'd96daaca-e478-4b79-b590-6b08140e2641';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9ce3085a-3de9-4afd-8f96-bc660620b4a1' then jsonb_set(e, '{content}', to_jsonb('Bagaimana HIV menular dan tidak menular?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Yang perlu diketahui remaja', '## Bagaimana HIV menular dan tidak menular?')
where id = 'd96daaca-e478-4b79-b590-6b08140e2641';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ba765710-6438-4930-b137-817239f79d70' then jsonb_set(e, '{content}', to_jsonb('Di mana tim gabungan mengawasi peredaran rokok ilegal?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Sasaran: kios di sekitar sekolah', '## Di mana tim gabungan mengawasi peredaran rokok ilegal?')
where id = 'd13b8624-9be7-4540-93d6-1e3831bec351';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2c4b6f92-bfe7-4eb4-a51c-7864bfaf3aa3' then jsonb_set(e, '{content}', to_jsonb('Bagaimana cara mengenali rokok ilegal?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Cara mengenali rokok ilegal', '## Bagaimana cara mengenali rokok ilegal?')
where id = 'd13b8624-9be7-4540-93d6-1e3831bec351';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '7dd4802b-6360-43a4-9e67-f24c2e516102' then jsonb_set(e, '{content}', to_jsonb('Bagaimana omzet UMKM di malam tahun baru?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kata pelaku UMKM soal omzet malam tahun baru', '## Bagaimana omzet UMKM di malam tahun baru?')
where id = '086b5e2e-5309-4412-ac5e-c4eb65bf6699';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ae842f09-8fe4-4317-b3f8-57b3a312cb41' then jsonb_set(e, '{content}', to_jsonb('Apa makna tema Karawology?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Makna tema Karawology', '## Apa makna tema Karawology?')
where id = '79c608a3-f3c5-4167-bb98-9ac38df1394f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3fe96136-ad4e-4bbb-ab37-046256ae3a4e' then jsonb_set(e, '{content}', to_jsonb('UMKM Gorontalo mana saja yang ikut pameran IFW 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Empat UMKM ikut pameran', '## UMKM Gorontalo mana saja yang ikut pameran IFW 2026?')
where id = '79c608a3-f3c5-4167-bb98-9ac38df1394f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '57a4670e-c8fd-475e-92c6-1989bd5be11b' then jsonb_set(e, '{content}', to_jsonb('Apa dampak Karawo di IFW bagi perajin?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dampak ke perajin dan ekonomi', '## Apa dampak Karawo di IFW bagi perajin?')
where id = 'a15a32f2-3ec6-4afb-aeec-7713d301d09a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '8e493310-89fc-48c2-a377-a74e1b5e05fc' then jsonb_set(e, '{content}', to_jsonb('Apa tantangan utama perajin Karawo ke depan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tantangan: kapasitas produksi', '## Apa tantangan utama perajin Karawo ke depan?')
where id = 'a15a32f2-3ec6-4afb-aeec-7713d301d09a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '33e6e25f-f6d1-4c8a-b9c2-8a4e25b5cf74' then jsonb_set(e, '{content}', to_jsonb('Kapan kunjungan Prabowo sebelumnya ke Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kunjungan kedua dalam 45 hari', '## Kapan kunjungan Prabowo sebelumnya ke Gorontalo?')
where id = 'a4d88e4d-e1d3-40e2-8514-6609067dd3ca';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c008f974-55bd-4929-827f-74008416901b' then jsonb_set(e, '{content}', to_jsonb('Apa arti pesan hilirisasi Presiden bagi petani jagung Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Apa artinya buat petani Gorontalo', '## Apa arti pesan hilirisasi Presiden bagi petani jagung Gorontalo?')
where id = 'a4d88e4d-e1d3-40e2-8514-6609067dd3ca';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'dc649c11-7c16-4dd8-95a6-78bf180467da' then jsonb_set(e, '{content}', to_jsonb('Apa itu sembahyang Cau Kun Kong?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Memohon restu sebelum turun ke jalan', '## Apa itu sembahyang Cau Kun Kong?')
where id = '69e3eaff-4484-41c6-8ef2-ec67f43ab552';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b6ec174d-2a8e-4d63-b421-9021c108d517' then jsonb_set(e, '{content}', to_jsonb('Bagaimana jadwal rangkaian Cap Go Meh Gorontalo 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Jadwal rangkaian Cap Go Meh Gorontalo 2026', '## Bagaimana jadwal rangkaian Cap Go Meh Gorontalo 2026?')
where id = '69e3eaff-4484-41c6-8ef2-ec67f43ab552';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '68ab93e2-2594-4652-ae7d-6b61ef9f81c6' then jsonb_set(e, '{content}', to_jsonb('Ke mana saja 8.500 kupon daging kurban dibagikan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## 8.500 kupon ke seluruh Gorontalo', '## Ke mana saja 8.500 kupon daging kurban dibagikan?')
where id = 'b324d100-b50d-4a1c-8928-60bc8ee1de75';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4f02eb8a-c8d8-4f43-a8a6-5dc541b473dc' then jsonb_set(e, '{content}', to_jsonb('Apa dampak ekonomi dari kurban 101 sapi ini?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dampak ekonomi', '## Apa dampak ekonomi dari kurban 101 sapi ini?')
where id = 'b324d100-b50d-4a1c-8928-60bc8ee1de75';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3ba075a5-3253-4c64-b1cf-e08a307d84e6' then jsonb_set(e, '{content}', to_jsonb('Berapa luas lahan kantor wali kota baru di Terminal 42?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Lahan 1,8 hektare di Terminal 42', '## Berapa luas lahan kantor wali kota baru di Terminal 42?')
where id = '5e7677ed-c377-40fa-8d36-0564e09ae5a2';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'bb46b3db-5e7f-4b4f-b6f3-b7b5a0cda6ba' then jsonb_set(e, '{content}', to_jsonb('Bagaimana nasib kantor wali kota yang lama?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Nasib kantor wali kota lama', '## Bagaimana nasib kantor wali kota yang lama?')
where id = '5e7677ed-c377-40fa-8d36-0564e09ae5a2';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9d0e94a5-407b-4f0b-bbd2-c8e9bad29187' then jsonb_set(e, '{content}', to_jsonb('Apa makna kue apangi bagi warga Padengo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kue apangi bukan sekadar kue', '## Apa makna kue apangi bagi warga Padengo?')
where id = 'f0fd5fd9-b3d6-494e-96d9-e0a6f881b198';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '1ed2e758-c8f7-40cb-b121-5d2a0d9d2da5' then jsonb_set(e, '{content}', to_jsonb('Bagaimana apangi dibuat cocok untuk generasi muda?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Varian baru untuk generasi muda', '## Bagaimana apangi dibuat cocok untuk generasi muda?')
where id = 'f0fd5fd9-b3d6-494e-96d9-e0a6f881b198';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '42de000d-a836-4be4-9f87-2f8e3442c38f' then jsonb_set(e, '{content}', to_jsonb('Bagaimana cara daftar penukaran uang baru lewat BI PINTAR?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Cara daftar penukaran uang baru lewat BI PINTAR', '## Bagaimana cara daftar penukaran uang baru lewat BI PINTAR?')
where id = 'b2e5a7af-716a-4cb0-a031-f715de70d326';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '24c80528-e4aa-460e-af4d-68ebc0751dbc' then jsonb_set(e, '{content}', to_jsonb('Pecahan berapa saja yang bisa ditukar?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pecahan dan batas maksimal', '## Pecahan berapa saja yang bisa ditukar?')
where id = 'b2e5a7af-716a-4cb0-a031-f715de70d326';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '59700a34-d6f7-4ad1-aa19-f084628a4674' then jsonb_set(e, '{content}', to_jsonb('Di mana posisi hilal Gorontalo saat matahari terbenam?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Posisi hilal di Gorontalo', '## Di mana posisi hilal Gorontalo saat matahari terbenam?')
where id = '62858a99-438c-43d8-80a2-76b1e0c3049a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '02ef62b1-1db9-4180-a9af-10529bb8426b' then jsonb_set(e, '{content}', to_jsonb('Kenapa awal Ramadan bisa berbeda?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Perbedaan itu biasa', '## Kenapa awal Ramadan bisa berbeda?')
where id = '62858a99-438c-43d8-80a2-76b1e0c3049a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6a4f969b-b74b-4326-868c-36022d927040' then jsonb_set(e, '{content}', to_jsonb('Apa saja cabang lomba MTQ Provinsi Gorontalo 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Delapan cabang lomba MTQ Provinsi Gorontalo 2026', '## Apa saja cabang lomba MTQ Provinsi Gorontalo 2026?')
where id = '69fc5d80-c07c-429e-ac7b-d2f3ce4cf8ac';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9dc40715-8be2-4b21-89d5-d9fb4fe492e1' then jsonb_set(e, '{content}', to_jsonb('Apa langkah pemenang MTQ provinsi selanjutnya?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Jalan menuju MTQ nasional', '## Apa langkah pemenang MTQ provinsi selanjutnya?')
where id = '69fc5d80-c07c-429e-ac7b-d2f3ce4cf8ac';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '61bb0701-5ccc-44bb-b7db-6a409db455de' then jsonb_set(e, '{content}', to_jsonb('Apa yang diminta dari kabupaten dan kota saat kemarau?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Patroli karhutla dan cadangan air bersih', '## Apa yang diminta dari kabupaten dan kota saat kemarau?')
where id = '1cb23a59-8f56-42ea-a614-e5c188337665';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '92a10d57-76f5-46dc-a49d-7c2ee6f54bca' then jsonb_set(e, '{content}', to_jsonb('Apa yang bisa dilakukan warga saat musim kemarau?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Yang bisa dilakukan warga', '## Apa yang bisa dilakukan warga saat musim kemarau?')
where id = '1cb23a59-8f56-42ea-a614-e5c188337665';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'fa7083d3-673f-4dd4-a7dd-fb77990fd90f' then jsonb_set(e, '{content}', to_jsonb('Bagaimana BI mengenalkan pembayaran digital di fun run?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pembayaran digital dikenalkan langsung di lapangan', '## Bagaimana BI mengenalkan pembayaran digital di fun run?')
where id = '78e5a5d2-877b-45d5-9717-f14ecc098b69';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6b41ac1e-a6c1-45cc-8431-97b2df22072b' then jsonb_set(e, '{content}', to_jsonb('Apa tujuan master plan kawasan Masjid Hunto?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pusat edukasi dan kebudayaan', '## Apa tujuan master plan kawasan Masjid Hunto?')
where id = '2902f811-3345-4766-8f01-702c93bd943b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '09b4e994-4012-4424-8da0-b9223633a364' then jsonb_set(e, '{content}', to_jsonb('Apa makna Cap Go Meh bagi warga Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tradisi syukur yang jadi simbol toleransi', '## Apa makna Cap Go Meh bagi warga Gorontalo?')
where id = '49b45307-5eb5-470b-9ecb-ca8b4d3a3a9d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c43f529d-6328-44b1-8877-29410172ed71' then jsonb_set(e, '{content}', to_jsonb('Apa itu atraksi Tatung?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Atraksi Tatung', '## Apa itu atraksi Tatung?')
where id = '49b45307-5eb5-470b-9ecb-ca8b4d3a3a9d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '868f62fe-40a4-4c3b-873b-a152a3aea33d' then jsonb_set(e, '{content}', to_jsonb('Apa maskot Peran Saka Nasional 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Maskot Peran Saka Nasional 2025: hiu paus', '## Apa maskot Peran Saka Nasional 2025?')
where id = 'eea6abec-139d-4929-9997-21194f085eef';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9d36de7a-0a33-4b40-b42a-658b9fd0fb0b' then jsonb_set(e, '{content}', to_jsonb('Apa makna logo Peran Saka Nasional 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Makna logo', '## Apa makna logo Peran Saka Nasional 2025?')
where id = 'eea6abec-139d-4929-9997-21194f085eef';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '10486963-815a-456d-b1a7-fd325c5f550a' then jsonb_set(e, '{content}', to_jsonb('Siapa yang boleh menikmati nasi bulu Hutabohu?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Terbuka untuk siapa saja', '## Siapa yang boleh menikmati nasi bulu Hutabohu?')
where id = 'ab2db527-9282-4614-8301-56130e383592';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '8db3894d-6875-4017-8391-6db4e12e97d4' then jsonb_set(e, '{content}', to_jsonb('Berapa banyak nasi bulu dibuat dalam sehari?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Ratusan batang dalam sehari', '## Berapa banyak nasi bulu dibuat dalam sehari?')
where id = 'ab2db527-9282-4614-8301-56130e383592';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '21a69d50-ecc7-4695-b014-c3dbe8b6b74c' then jsonb_set(e, '{content}', to_jsonb('Infrastruktur apa yang diusulkan untuk PENAS XVII?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Usulan infrastruktur PENAS XVII 2026', '## Infrastruktur apa yang diusulkan untuk PENAS XVII?')
where id = 'ba5b8a7b-d227-4b6e-8079-8addb012ed18';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f9d1e285-2597-431d-882b-3bebfb76f2b5' then jsonb_set(e, '{content}', to_jsonb('Bagaimana dukungan Kementerian PU untuk PENAS?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kementerian PU siap mendukung', '## Bagaimana dukungan Kementerian PU untuk PENAS?')
where id = 'ba5b8a7b-d227-4b6e-8079-8addb012ed18';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c91edcb7-c582-4469-8bf2-66af79bb1cf4' then jsonb_set(e, '{content}', to_jsonb('Destinasi apa yang dipromosikan Idah ke peserta KTNA?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Promosi wisata hiu paus', '## Destinasi apa yang dipromosikan Idah ke peserta KTNA?')
where id = '8ca821ea-7216-4348-b40c-f892bdcb66bc';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c9bdb15f-4efa-4c8f-a741-2f07598f003c' then jsonb_set(e, '{content}', to_jsonb('Kenapa promosi daerah lewat obrolan santai efektif?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Promosi daerah ala obrolan santai', '## Kenapa promosi daerah lewat obrolan santai efektif?')
where id = '8ca821ea-7216-4348-b40c-f892bdcb66bc';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '978ac00d-b627-4242-a123-b8665f94a136' then jsonb_set(e, '{content}', to_jsonb('Kapan Festival Obor Molosipat digelar?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Festival obor setiap 15 Ramadan', '## Kapan Festival Obor Molosipat digelar?')
where id = '1df25541-2e29-4beb-b239-9a75fe3f1a19';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '44c37a6f-2bc7-4ad5-ba7b-a8cc42fe4554' then jsonb_set(e, '{content}', to_jsonb('Apa yang bisa dinikmati pengunjung Festival Obor Molosipat?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kolak gratis dan UMKM', '## Apa yang bisa dinikmati pengunjung Festival Obor Molosipat?')
where id = '1df25541-2e29-4beb-b239-9a75fe3f1a19';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '13554ad7-5995-499e-9759-581b2ff682cb' then jsonb_set(e, '{content}', to_jsonb('Bagaimana perkembangan desain Karawo Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Desain Karawo Gorontalo makin modern', '## Bagaimana perkembangan desain Karawo Gorontalo?')
where id = 'ac270c5e-cb0d-4c65-9dd4-f7b04db1d7e9';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '7c9eb9b5-61b9-4790-a722-94164416688b' then jsonb_set(e, '{content}', to_jsonb('Apa itu KKI 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tentang KKI 2025', '## Apa itu KKI 2025?')
where id = 'ac270c5e-cb0d-4c65-9dd4-f7b04db1d7e9';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '0d180782-b659-4ffb-9723-c30dd0d5aace' then jsonb_set(e, '{content}', to_jsonb('Apa makna desain Sumbu Bahtera Demokrasi?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Makna Sumbu Bahtera Demokrasi', '## Apa makna desain Sumbu Bahtera Demokrasi?')
where id = '93d9e62c-87f3-446c-99c0-342f2f662e56';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b1e4452d-8bd2-435c-a5e4-9db7213a98d5' then jsonb_set(e, '{content}', to_jsonb('Apa tiga prinsip desain kantor wali kota baru?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tiga prinsip desain', '## Apa tiga prinsip desain kantor wali kota baru?')
where id = '93d9e62c-87f3-446c-99c0-342f2f662e56';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6659ae0f-549b-4eeb-a4c2-3929c8b282db' then jsonb_set(e, '{content}', to_jsonb('Apakah Bandara Djalaludin siap didarati Boeing 777?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Bandara Djalaludin siap untuk Boeing 777', '## Apakah Bandara Djalaludin siap didarati Boeing 777?')
where id = 'af4fe156-588f-43ce-b424-ddf83d2d2611';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '898a4762-d39d-4d1d-8bed-f44e3eeed29e' then jsonb_set(e, '{content}', to_jsonb('Bagaimana simulasi pergerakan jemaah haji di Makassar?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Simulasi pergerakan jemaah', '## Bagaimana simulasi pergerakan jemaah haji di Makassar?')
where id = 'bc4da29a-8f1e-4dc2-8a6f-73cd3d7a8126';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '8a56293e-55f6-494e-bb13-6b65569e4bab' then jsonb_set(e, '{content}', to_jsonb('Apa manfaat Fast Track bagi jemaah lansia?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kabar baik untuk jemaah lansia', '## Apa manfaat Fast Track bagi jemaah lansia?')
where id = 'bc4da29a-8f1e-4dc2-8a6f-73cd3d7a8126';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '5f4f77a1-7c70-40b5-82e1-d07f45cca6cb' then jsonb_set(e, '{content}', to_jsonb('Apa potensi ekosistem halal Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Potensi halal Gorontalo', '## Apa potensi ekosistem halal Gorontalo?')
where id = '89c6cb3d-b1e7-4dfb-b504-d2eca938b43c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '7691415f-ce32-4ff6-926f-f70208de4748' then jsonb_set(e, '{content}', to_jsonb('Apa itu QRIS Jelajah Kuliner Indonesia?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Misi QRIS Jelajah Kuliner Indonesia', '## Apa itu QRIS Jelajah Kuliner Indonesia?')
where id = '4f346bb1-61e0-4c52-86b9-812db0cd276e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4b2f5d62-9203-4d7c-80d5-a4b1d1a30940' then jsonb_set(e, '{content}', to_jsonb('Apa fungsi Galeri UMKM Olaku?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Fungsi Galeri UMKM Olaku', '## Apa fungsi Galeri UMKM Olaku?')
where id = '1bbbcf5e-a705-48cc-ab7a-9ceefeaf3971';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f4c72723-e2df-4095-9ab0-59f325bbeb0b' then jsonb_set(e, '{content}', to_jsonb('Apa makna Tahun Kuda Api?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Makna Tahun Kuda Api', '## Apa makna Tahun Kuda Api?')
where id = 'f6e1d5bf-a8e9-47ed-9b2b-03915747af5c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4c1a3c40-e8fc-4259-8a2c-9593fdd10082' then jsonb_set(e, '{content}', to_jsonb('Siapa saja yang ikut merayakan Imlek di Klenteng Tulus Harapan Kita?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Barongsai dan warga yang ikut menonton', '## Siapa saja yang ikut merayakan Imlek di Klenteng Tulus Harapan Kita?')
where id = 'f6e1d5bf-a8e9-47ed-9b2b-03915747af5c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3aaa8ee0-f0af-4b85-84e3-73959d07669d' then jsonb_set(e, '{content}', to_jsonb('Di mana saja lokasi QRIS Jelajah Budaya Indonesia 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tiga pantai jadi lokasi QRIS Jelajah Budaya Indonesia 2025', '## Di mana saja lokasi QRIS Jelajah Budaya Indonesia 2025?')
where id = '0e3f6799-0a77-4824-a227-1036b1c00190';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2700ed63-15fe-4543-ab9b-670df605c0d6' then jsonb_set(e, '{content}', to_jsonb('Apa tujuan QRIS Jelajah Indonesia?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kompetisi literasi pembayaran digital', '## Apa tujuan QRIS Jelajah Indonesia?')
where id = '0e3f6799-0a77-4824-a227-1036b1c00190';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'e9f58444-2623-4199-9720-6e7a35ea52fa' then jsonb_set(e, '{content}', to_jsonb('Apa jejak Kilat Wartabone di Bone Bolango?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Jejak Kilat Wartabone di Bone Bolango', '## Apa jejak Kilat Wartabone di Bone Bolango?')
where id = 'fa73e338-32ed-4234-a3ce-81a96b6a9f84';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '112837b8-a746-4deb-b89a-4f13f32da2ae' then jsonb_set(e, '{content}', to_jsonb('Apa itu Mopotilolo dan untuk siapa?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Mopotilolo untuk Abdul Kadir Karding', '## Apa itu Mopotilolo dan untuk siapa?')
where id = '4525e2da-a461-4116-a924-ffef73c099a3';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c06f2d62-0ac6-4b3e-b508-2cdcab47224a' then jsonb_set(e, '{content}', to_jsonb('Bagaimana rincian pendapatan Pemprov Gorontalo semester I 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rincian pendapatan Pemprov Gorontalo', '## Bagaimana rincian pendapatan Pemprov Gorontalo semester I 2026?')
where id = 'e3cdf0d9-c852-426f-914e-e36829d64d23';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'a978f7d4-9660-4b75-9eb0-dd08f2a3f982' then jsonb_set(e, '{content}', to_jsonb('Kenapa angka pendapatan dan belanja daerah penting bagi warga?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa angka ini penting untuk warga', '## Kenapa angka pendapatan dan belanja daerah penting bagi warga?')
where id = 'e3cdf0d9-c852-426f-914e-e36829d64d23';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c80f84ce-392f-48f6-b4e2-18d6098e1839' then jsonb_set(e, '{content}', to_jsonb('Lomba apa saja yang digelar di Fesbud Jaton?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Lomba yang digelar', '## Lomba apa saja yang digelar di Fesbud Jaton?')
where id = '49678489-95f3-411d-af6a-a7b58961c514';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '187953d2-15c8-49f4-a0b1-ee0166bcfbd6' then jsonb_set(e, '{content}', to_jsonb('Kenapa Fesbud Jaton menarik didatangi?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa menarik didatangi', '## Kenapa Fesbud Jaton menarik didatangi?')
where id = '49678489-95f3-411d-af6a-a7b58961c514';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'e04f4c8c-cd4c-412f-a9dc-29afdf293001' then jsonb_set(e, '{content}', to_jsonb('Berapa harga minyak tanah untuk lampu Tumbilotohe?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Jual minyak tanah juga', '## Berapa harga minyak tanah untuk lampu Tumbilotohe?')
where id = 'bb753c08-3bbd-451b-a133-bfaa4c8f379f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '86c224c0-6d03-4665-aa14-58971cd412d4' then jsonb_set(e, '{content}', to_jsonb('Apa arti Tumbilotohe bagi pedagang musiman?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rezeki musiman dari tradisi', '## Apa arti Tumbilotohe bagi pedagang musiman?')
where id = 'bb753c08-3bbd-451b-a133-bfaa4c8f379f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'a8fb64a1-6b89-4249-a9c5-a12f6b6d4193' then jsonb_set(e, '{content}', to_jsonb('Apa pelajaran dari semangat Nani Wartabone?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Semangat Nani Wartabone di kehidupan sehari-hari', '## Apa pelajaran dari semangat Nani Wartabone?')
where id = 'ca41fe69-31c0-4c73-9489-852de5671b4e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'd6ca9c90-1a67-4a1f-acc5-5a5cb7c2b24c' then jsonb_set(e, '{content}', to_jsonb('Bagaimana Pelindo menyiapkan kedatangan KRI Teluk Banten?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pelindo siapkan dermaga', '## Bagaimana Pelindo menyiapkan kedatangan KRI Teluk Banten?')
where id = 'b8c54cca-bdfd-4bc6-be85-44d32743b0c9';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6ba5635e-bb3a-41b5-a564-feaa3b62b43b' then jsonb_set(e, '{content}', to_jsonb('Siapa yang dibawa pulang KRI Teluk Banten 516?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Bawa pulang 450 prajurit Yonif 715', '## Siapa yang dibawa pulang KRI Teluk Banten 516?')
where id = 'b8c54cca-bdfd-4bc6-be85-44d32743b0c9';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c0f1b507-facc-48f6-9b77-1bbb39cef734' then jsonb_set(e, '{content}', to_jsonb('Bagaimana Kabupaten Gorontalo meraih Rekor MURI?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rekor MURI dari 57.936 akseptor IUD', '## Bagaimana Kabupaten Gorontalo meraih Rekor MURI?')
where id = '66119d02-cb88-4dd3-b1f1-de0b280a4243';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f6d51e8a-25d7-43cc-9b6e-4dfef2653cbb' then jsonb_set(e, '{content}', to_jsonb('Siapa yang berperan dalam capaian 57.936 akseptor IUD?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kata Bupati Sofyan Puhi', '## Siapa yang berperan dalam capaian 57.936 akseptor IUD?')
where id = '66119d02-cb88-4dd3-b1f1-de0b280a4243';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f0a8f2b8-6af9-44ef-bb83-42e9e6e147ec' then jsonb_set(e, '{content}', to_jsonb('Rumah ibadah mana saja yang ikut arak-arakan Cap Go Meh 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kio joli dari tiga rumah ibadah', '## Rumah ibadah mana saja yang ikut arak-arakan Cap Go Meh 2025?')
where id = '42944022-4abf-47c9-9552-117e87cdc170';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '0d982158-9a87-431b-a4f0-8aec655c12d8' then jsonb_set(e, '{content}', to_jsonb('Apa itu Tapikong?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tapikong, tradisi yang dinanti lintas warga', '## Apa itu Tapikong?')
where id = '42944022-4abf-47c9-9552-117e87cdc170';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '31d9eae5-0efd-4a1a-b41a-afd6973aefbf' then jsonb_set(e, '{content}', to_jsonb('Bagaimana cara ke Air Terjun Huila?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Cara ke Air Terjun Huila', '## Bagaimana cara ke Air Terjun Huila?')
where id = 'bc304676-5a0d-4615-924b-b30d878cd851';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'be54aa19-84dc-4e67-b6e1-0a1f23d0907a' then jsonb_set(e, '{content}', to_jsonb('Apa yang perlu disiapkan sebelum ke Air Terjun Huila?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tips berkunjung', '## Apa yang perlu disiapkan sebelum ke Air Terjun Huila?')
where id = 'bc304676-5a0d-4615-924b-b30d878cd851';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ad091fcc-6cfc-4a59-91f1-c222ec09d210' then jsonb_set(e, '{content}', to_jsonb('Bagaimana hasil pengecekan destinasi widya wisata PENAS?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Hasil pengecekan destinasi widya wisata', '## Bagaimana hasil pengecekan destinasi widya wisata PENAS?')
where id = 'a27e696a-7a50-4480-92ea-c1d8bc2d8d8b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '353d5afd-9445-40e3-bd0e-c63d1ef9ac28' then jsonb_set(e, '{content}', to_jsonb('Destinasi apa saja yang diusulkan Kota Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Usulan dari Kota Gorontalo', '## Destinasi apa saja yang diusulkan Kota Gorontalo?')
where id = 'a27e696a-7a50-4480-92ea-c1d8bc2d8d8b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f76ee818-f3d2-4739-a9ab-36a09d0fa964' then jsonb_set(e, '{content}', to_jsonb('Apa arti tema “Mololo” di Hulondalo Mopuasa Fest 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tema “Mololo” di Hulondalo Mopuasa Fest 2026', '## Apa arti tema “Mololo” di Hulondalo Mopuasa Fest 2026?')
where id = 'd901d1c5-8e86-44b7-a6bc-751109cdfb92';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '8232d39b-a5ad-4bca-80ef-a54d21bb7efa' then jsonb_set(e, '{content}', to_jsonb('Siapa penggerak Hulondalo Mopuasa Fest?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Digerakkan anak muda lewat Spekol', '## Siapa penggerak Hulondalo Mopuasa Fest?')
where id = 'd901d1c5-8e86-44b7-a6bc-751109cdfb92';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6bc8f66c-0d52-45db-979d-290babe59f72' then jsonb_set(e, '{content}', to_jsonb('Apa pesan Mentan Amran soal hilirisasi di IAIN Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Hilirisasi jadi kunci', '## Apa pesan Mentan Amran soal hilirisasi di IAIN Gorontalo?')
where id = '634331ec-ee23-4aff-8176-c6ae60648f01';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '90e30bb5-83c3-446f-8018-0ef272e44e02' then jsonb_set(e, '{content}', to_jsonb('Apa isi buku Binthe Molamahu?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Isi buku Binthe Molamahu', '## Apa isi buku Binthe Molamahu?')
where id = '634331ec-ee23-4aff-8176-c6ae60648f01';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '998370a9-f26a-473b-9385-eb8b698b2a03' then jsonb_set(e, '{content}', to_jsonb('Bagaimana jejak prestasi Zaskia Putri Salurante?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Jejak prestasi Zaskia Putri Salurante', '## Bagaimana jejak prestasi Zaskia Putri Salurante?')
where id = 'a1b433f4-7af0-4813-9194-e8c48e82fe9d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f2ab7115-d32a-4a1b-8a25-f2032091f975' then jsonb_set(e, '{content}', to_jsonb('Bolehkah zakat fitrah dibayar dengan uang?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Beras atau uang, sama-sama sah', '## Bolehkah zakat fitrah dibayar dengan uang?')
where id = '1645d01d-e6ad-4617-b7c4-1fc73c4f68d5';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '5b7f5909-9e40-4c95-b319-3c0f92f26d4a' then jsonb_set(e, '{content}', to_jsonb('Kapan batas waktu penyerahan zakat fitrah?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Batas waktu penyerahan zakat fitrah Kota Gorontalo', '## Kapan batas waktu penyerahan zakat fitrah?')
where id = '1645d01d-e6ad-4617-b7c4-1fc73c4f68d5';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'df6949e5-cde3-420b-89ad-7d5a93d264c0' then jsonb_set(e, '{content}', to_jsonb('Siapa Sherli, hiu paus Botubarani?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Gubernur Sherly Tjoanda bertemu Sherli', '## Siapa Sherli, hiu paus Botubarani?')
where id = 'd29c99a6-46d1-49a5-82b6-f5d15aed0c44';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '40eab1b9-fd30-41c5-8950-76ebda6b5cdf' then jsonb_set(e, '{content}', to_jsonb('Apa aturan berenang dengan hiu paus?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tips berenang dengan hiu paus', '## Apa aturan berenang dengan hiu paus?')
where id = 'd29c99a6-46d1-49a5-82b6-f5d15aed0c44';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'a5848caf-0869-4e06-b7d7-13d958afdb09' then jsonb_set(e, '{content}', to_jsonb('Apa keunggulan riset UNG menurut Stella Christie?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Riset UNG sejalan dengan Diktisaintek Berdampak', '## Apa keunggulan riset UNG menurut Stella Christie?')
where id = '48736da2-d301-45ec-b008-e342679f4c5c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '91d5dfe2-b27d-4892-8927-21f5d458cb57' then jsonb_set(e, '{content}', to_jsonb('Apa agenda rapat perdana Komite Audit Bank SulutGo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Agenda rapat perdana', '## Apa agenda rapat perdana Komite Audit Bank SulutGo?')
where id = 'c2c38c97-1d93-489c-872b-25a16511a8e8';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2334e626-d60f-442b-9e48-d0b2e06a2683' then jsonb_set(e, '{content}', to_jsonb('Bagaimana Pangdam XIII meninjau kawasan tambang?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pantauan dari view point dan drone', '## Bagaimana Pangdam XIII meninjau kawasan tambang?')
where id = '7dd93147-17f5-4824-b5e4-ca7c8b7c1b42';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4a0a7e7f-ffcd-4d81-b8d3-afd977ca95e6' then jsonb_set(e, '{content}', to_jsonb('Bagaimana pengelolaan di dalam area Pani Gold Mine?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pengelolaan di dalam area Pani Gold Mine', '## Bagaimana pengelolaan di dalam area Pani Gold Mine?')
where id = '7dd93147-17f5-4824-b5e4-ca7c8b7c1b42';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6eeac49a-23b6-4702-b49a-a33414cde45f' then jsonb_set(e, '{content}', to_jsonb('Kenapa Buyung Hamzah Hunto berlari dengan seragam Pramuka?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pramuka lebih dari semaphore', '## Kenapa Buyung Hamzah Hunto berlari dengan seragam Pramuka?')
where id = '61b02f49-2264-4c74-9ca1-52f30be2d197';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'aa707554-4f5a-4568-aab5-de075664d86b' then jsonb_set(e, '{content}', to_jsonb('Apa makna Atupato bagi warga Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Makna Atupato bagi warga', '## Apa makna Atupato bagi warga Gorontalo?')
where id = '1db69ab5-2df5-4bb5-9e90-62aefecfe3eb';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '03852c1e-fc63-4088-9892-717bc5e3ae29' then jsonb_set(e, '{content}', to_jsonb('Kapan Lebaran Atupato dirayakan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa layak dikunjungi', '## Kapan Lebaran Atupato dirayakan?')
where id = '1db69ab5-2df5-4bb5-9e90-62aefecfe3eb';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '78ada166-7808-418f-8f36-9186e5948fa3' then jsonb_set(e, '{content}', to_jsonb('Berapa nilai business matching di Gebyar UMKM 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Business matching Rp3,5 miliar', '## Berapa nilai business matching di Gebyar UMKM 2026?')
where id = 'd68f0dfa-f631-4f5a-b578-7943b890aa1c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '1231e237-75f6-4fbf-9f27-b46dfa3d065d' then jsonb_set(e, '{content}', to_jsonb('Apa yang dibutuhkan UMKM Gorontalo untuk tumbuh?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## UMKM Gorontalo sebagai motor ekonomi', '## Apa yang dibutuhkan UMKM Gorontalo untuk tumbuh?')
where id = 'd68f0dfa-f631-4f5a-b578-7943b890aa1c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '370bae53-269e-49d4-acee-4df0f3e74faf' then jsonb_set(e, '{content}', to_jsonb('Apa itu program Pesantren 1000 Cahaya?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Program nasional di 233 kampus', '## Apa itu program Pesantren 1000 Cahaya?')
where id = '9ecb96a3-2f30-405a-b2f0-28b8c7fefa78';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'd2f50f9b-5649-4ba5-96da-d8bbdfe4c0c1' then jsonb_set(e, '{content}', to_jsonb('Apa saja kegiatan Pesantren 1000 Cahaya di UNG?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Isi kegiatan Pesantren 1000 Cahaya di UNG', '## Apa saja kegiatan Pesantren 1000 Cahaya di UNG?')
where id = '9ecb96a3-2f30-405a-b2f0-28b8c7fefa78';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6f4df478-6ea9-4c87-b167-7286e042adb8' then jsonb_set(e, '{content}', to_jsonb('Apa yang dibutuhkan Botubarani untuk jadi destinasi dunia?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Fasilitas perlu ditingkatkan', '## Apa yang dibutuhkan Botubarani untuk jadi destinasi dunia?')
where id = '302becf3-0d8e-4eb6-a21c-e26be2919efe';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '11810758-737b-4016-b22c-6aa6146cc3dc' then jsonb_set(e, '{content}', to_jsonb('Apa etika melihat hiu paus di Botubarani?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Etika melihat hiu paus', '## Apa etika melihat hiu paus di Botubarani?')
where id = '302becf3-0d8e-4eb6-a21c-e26be2919efe';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '076b6efa-f2e5-441e-8cd0-79eb15251a25' then jsonb_set(e, '{content}', to_jsonb('Ke mana saja Wamentrans Viva Yoga berkunjung?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Agenda di kawasan transmigrasi', '## Ke mana saja Wamentrans Viva Yoga berkunjung?')
where id = '1b95d333-e09e-4ce2-a1fe-696d432e5bd7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '89d905b7-ba86-472a-9e17-ca2a2b7d04fe' then jsonb_set(e, '{content}', to_jsonb('Kenapa kawasan transmigrasi masih relevan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa transmigrasi masih relevan', '## Kenapa kawasan transmigrasi masih relevan?')
where id = '1b95d333-e09e-4ce2-a1fe-696d432e5bd7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9a8a333c-9cd1-4f27-afc7-b22267901470' then jsonb_set(e, '{content}', to_jsonb('Apa saja yang ada di stan UMKM Gebyar UMKM 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dari panggung ke stan UMKM', '## Apa saja yang ada di stan UMKM Gebyar UMKM 2026?')
where id = '78c129ff-6ea6-42dd-ba36-c9a166e89859';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '7da156ee-a12b-4035-a050-5f3f0c85e8fe' then jsonb_set(e, '{content}', to_jsonb('Bagaimana BI dan TPID memastikan pasokan pangan Ramadan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## K2: memastikan pasokan cukup', '## Bagaimana BI dan TPID memastikan pasokan pangan Ramadan?')
where id = 'fabfb69a-1773-406b-bc38-f1904760db89';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '5ec4a5d6-4b81-4573-83f8-73e045c38398' then jsonb_set(e, '{content}', to_jsonb('Apa imbauan BI untuk warga selama Ramadan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pesan BI untuk warga', '## Apa imbauan BI untuk warga selama Ramadan?')
where id = 'fabfb69a-1773-406b-bc38-f1904760db89';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '98b3a698-6b1e-49ae-b5e7-d144da6afb8b' then jsonb_set(e, '{content}', to_jsonb('Apa daya tarik Pantai Minanga?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pesona Pantai Minanga yang tertutup sampah', '## Apa daya tarik Pantai Minanga?')
where id = '9b04b5b2-902c-410e-baf0-7f070950ba8f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'd30bee35-bdd1-4297-9cb3-b008c4f70746' then jsonb_set(e, '{content}', to_jsonb('Apa usulan pengunjung untuk mengatasi sampah di Pantai Minanga?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Usulan: tempat sampah dan petugas kebersihan', '## Apa usulan pengunjung untuk mengatasi sampah di Pantai Minanga?')
where id = '9b04b5b2-902c-410e-baf0-7f070950ba8f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6b211a84-9406-4503-ab29-8b5ab6cd6ce5' then jsonb_set(e, '{content}', to_jsonb('Kapan Dinas Pariwisata, Ekonomi Kreatif, dan Kebudayaan dibentuk?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dinas baru pada 2026', '## Kapan Dinas Pariwisata, Ekonomi Kreatif, dan Kebudayaan dibentuk?')
where id = '60cf93e0-84f1-4e60-bd49-ebb491de0047';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '8ee90457-60e9-4f75-a9b3-77e29b3cde77' then jsonb_set(e, '{content}', to_jsonb('Kopi Gorontalo dari mana saja yang tampil di HACF?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kopi Gorontalo ikut dilirik', '## Kopi Gorontalo dari mana saja yang tampil di HACF?')
where id = '60cf93e0-84f1-4e60-bd49-ebb491de0047';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3b5fe60b-b989-46e8-87c6-e4eca7c2db96' then jsonb_set(e, '{content}', to_jsonb('Bagaimana jenazah Serda Rein Pasau dipulangkan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Serda Rein Pasau pulang ke Bone Bolango', '## Bagaimana jenazah Serda Rein Pasau dipulangkan?')
where id = '1b8d149b-be53-49fb-8a34-750e539b9a44';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4ccc5770-0b59-4c4e-bdfa-328de6f815b2' then jsonb_set(e, '{content}', to_jsonb('Siapa saja pengurus inti Lamahu periode 2026–2031?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Susunan pengurus inti', '## Siapa saja pengurus inti Lamahu periode 2026–2031?')
where id = '9fe61f52-683f-43f7-bd0a-bb24c3725f7c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'be5c3455-00ce-4834-825f-12b278779a5f' then jsonb_set(e, '{content}', to_jsonb('Apa lima tugas untuk anggota KPID Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Lima tugas untuk anggota KPID Gorontalo', '## Apa lima tugas untuk anggota KPID Gorontalo?')
where id = 'f9fe5208-146d-4d05-830c-ce5899326662';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '580b8810-6a1d-4c7f-ac58-6c08475cc9ea' then jsonb_set(e, '{content}', to_jsonb('Berapa takaran zakat fitrah Bone Bolango?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Zakat fitrah Bone Bolango setara 2,5 kg beras', '## Berapa takaran zakat fitrah Bone Bolango?')
where id = '33f1349e-cc2a-49ee-9a62-14bc58d1b01b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '25d700d0-47cf-40a5-9869-bb24e0b7355d' then jsonb_set(e, '{content}', to_jsonb('Ke mana warga Bone Bolango menyalurkan zakat?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Disalurkan lewat UPZ desa', '## Ke mana warga Bone Bolango menyalurkan zakat?')
where id = '33f1349e-cc2a-49ee-9a62-14bc58d1b01b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '02eb61e1-3643-4d0b-9239-7fa1890b568c' then jsonb_set(e, '{content}', to_jsonb('Siapa penulis buku Indonesia Merdeka di Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kisah Nani Wartabone dalam edisi terbaru', '## Siapa penulis buku Indonesia Merdeka di Gorontalo?')
where id = '0d0d2283-9fe3-42dc-b7c0-0ff5ec0aabdb';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'cd364f2e-948e-4405-8225-7c01cbdeae4f' then jsonb_set(e, '{content}', to_jsonb('Kenapa buku ini layak dibaca anak muda?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa buku ini layak dibaca anak muda', '## Kenapa buku ini layak dibaca anak muda?')
where id = '0d0d2283-9fe3-42dc-b7c0-0ff5ec0aabdb';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9bbdcdff-9dcb-4997-80cc-195fc426b8ec' then jsonb_set(e, '{content}', to_jsonb('Apa saja menu takjil di depan Kampus 1 UNG?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Menu takjil depan Kampus 1 UNG', '## Apa saja menu takjil di depan Kampus 1 UNG?')
where id = 'b6835ecf-c4c3-4510-b1db-b4103f6cfb02';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'd7e7bb65-4c4e-45b5-abd5-9e68a3469930' then jsonb_set(e, '{content}', to_jsonb('Apa tips berburu takjil di depan UNG?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tips berburu takjil', '## Apa tips berburu takjil di depan UNG?')
where id = 'b6835ecf-c4c3-4510-b1db-b4103f6cfb02';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '427735d0-494c-4d20-a1f2-fbd8f2132a0c' then jsonb_set(e, '{content}', to_jsonb('Apa pesan Gusnar untuk pimpinan baru Gorontalo Utara?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pesan Gusnar: berkolaborasi', '## Apa pesan Gusnar untuk pimpinan baru Gorontalo Utara?')
where id = 'aec83611-a19b-47bf-8c88-45a923c6d212';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b8b68ea2-2a00-4d72-badf-0b3be46a140a' then jsonb_set(e, '{content}', to_jsonb('Apa langkah pertama Thariq Modanggu dan Nurjanah setelah dilantik?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Program prioritas Thariq Modanggu', '## Apa langkah pertama Thariq Modanggu dan Nurjanah setelah dilantik?')
where id = 'aec83611-a19b-47bf-8c88-45a923c6d212';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'a6a02aea-2007-4e38-ab08-a4267f9c1010' then jsonb_set(e, '{content}', to_jsonb('Apa itu ikrar Dharma Mulia Putera Indonesia?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Ikrar Dharma Mulia Putera Indonesia, Bukan Sekadar Formalitas', '## Apa itu ikrar Dharma Mulia Putera Indonesia?')
where id = '0c0a3f53-70bc-4980-95a8-9e0b9505258b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '49c23968-e85a-42a3-ab78-3ea2f225945f' then jsonb_set(e, '{content}', to_jsonb('Apa harapan gubernur dari pengukuhan Paskibraka?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Harapan di Balik Pengukuhan: Jiwa Korsa dan Kebangsaan', '## Apa harapan gubernur dari pengukuhan Paskibraka?')
where id = '0c0a3f53-70bc-4980-95a8-9e0b9505258b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '8fa7716b-2eb8-421b-bf72-9f9818f922dc' then jsonb_set(e, '{content}', to_jsonb('Apa tujuan Pesona Tameto 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tiga tujuan Pesona Tameto 2025', '## Apa tujuan Pesona Tameto 2025?')
where id = '5de93a04-cbd1-4a66-b6c9-6c32f40849a0';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '0864ac27-c053-42f4-9bf9-7ad559aeb107' then jsonb_set(e, '{content}', to_jsonb('Apa itu Pesona Tameto?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Booth UMKM halal', '## Apa itu Pesona Tameto?')
where id = '5de93a04-cbd1-4a66-b6c9-6c32f40849a0';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '7f24ee81-fe56-4df2-a73f-0585bf28277e' then jsonb_set(e, '{content}', to_jsonb('Apa itu tenggeyamo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Mengenal tenggeyamo', '## Apa itu tenggeyamo?')
where id = 'ba380813-af3d-4547-8dde-c850eb5cc467';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'de09de5c-bc4e-4a6f-820f-dc41df7b8ae5' then jsonb_set(e, '{content}', to_jsonb('Apa yang terjadi setelah penetapan 1 Syawal?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa unik', '## Apa yang terjadi setelah penetapan 1 Syawal?')
where id = 'ba380813-af3d-4547-8dde-c850eb5cc467';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2aed1424-32fd-40dc-b313-cc6d7315ed37' then jsonb_set(e, '{content}', to_jsonb('Apa makna parade kostum pahlawan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Bukan Sekadar Kostum, Tapi Refleksi Perjuangan', '## Apa makna parade kostum pahlawan?')
where id = '9087e005-73e4-4d05-a5a4-492376eee227';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '40b6ab7d-6f3d-4cae-a033-fd36f014a693' then jsonb_set(e, '{content}', to_jsonb('Siapa pemenang lomba parade kostum pahlawan tingkat OPD?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Daftar Pemenang Lomba Parade Kostum Pahlawan Tingkat OPD', '## Siapa pemenang lomba parade kostum pahlawan tingkat OPD?')
where id = '9087e005-73e4-4d05-a5a4-492376eee227';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '89e33756-f356-4306-ab34-e6a0c65178aa' then jsonb_set(e, '{content}', to_jsonb('Apa harapan Mendikdasmen untuk Fakultas Kedokteran UMGO?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Berharap segera punya rumah sakit pendidikan', '## Apa harapan Mendikdasmen untuk Fakultas Kedokteran UMGO?')
where id = 'b5512f11-5a4c-4b6f-b023-92ee78d65a61';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b88fe4d2-4521-414b-8116-106cedeb7189' then jsonb_set(e, '{content}', to_jsonb('Apa capaian Kajati sebelumnya, I Dewa Gede Wirajana?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Warisan kasus dari Wirajana', '## Apa capaian Kajati sebelumnya, I Dewa Gede Wirajana?')
where id = 'e41c0a04-6aaf-4eeb-a54c-263794fd252c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ac874d71-b98b-4765-aa82-913200c496d5' then jsonb_set(e, '{content}', to_jsonb('Bagaimana rekam jejak Riyono?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rekam jejak Riyono', '## Bagaimana rekam jejak Riyono?')
where id = 'e41c0a04-6aaf-4eeb-a54c-263794fd252c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '04b12422-4831-46f7-8a60-960f659f8450' then jsonb_set(e, '{content}', to_jsonb('Bagaimana tanggapan Menpora atas proposal Stadion Pemuda?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Menunggu pembahasan di Kemenpora', '## Bagaimana tanggapan Menpora atas proposal Stadion Pemuda?')
where id = '3d51be6e-1387-468d-9eec-46a7fc607fee';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '630bd71c-97e7-479e-b227-5d447a69fede' then jsonb_set(e, '{content}', to_jsonb('Apa target Rachmat Gobel untuk Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Target: keluar dari lima provinsi termiskin', '## Apa target Rachmat Gobel untuk Gorontalo?')
where id = 'a2659f85-1e82-4972-8a7d-fac162a60aa9';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3e4bdb2e-762b-4441-b158-8e0ea9a6b63c' then jsonb_set(e, '{content}', to_jsonb('Tokoh Gorontalo siapa saja yang hadir?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tokoh Gorontalo yang hadir', '## Tokoh Gorontalo siapa saja yang hadir?')
where id = '78d5cc47-0d99-4f75-8956-5010b98361ae';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9dc8cf3b-16fa-4b2e-801b-08f8acfb0ebb' then jsonb_set(e, '{content}', to_jsonb('Apa yang dibahas soal pariwisata dalam pertemuan tokoh?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pariwisata ikut dibahas', '## Apa yang dibahas soal pariwisata dalam pertemuan tokoh?')
where id = '78d5cc47-0d99-4f75-8956-5010b98361ae';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'e834a241-65c5-4063-9e54-150dd3172f17' then jsonb_set(e, '{content}', to_jsonb('Bagaimana jadwal sayembara desain kantor wali kota?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Jadwal sayembara desain Kantor Wali Kota Gorontalo', '## Bagaimana jadwal sayembara desain kantor wali kota?')
where id = '59a266d6-a7de-4880-bc0a-8deff778e07f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'af986e1b-ea95-4d55-a87e-e78ef3889dcb' then jsonb_set(e, '{content}', to_jsonb('Bagaimana besaran hadiah sayembara dihitung?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rincian hadiah', '## Bagaimana besaran hadiah sayembara dihitung?')
where id = '59a266d6-a7de-4880-bc0a-8deff778e07f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ff7b15ac-e06c-4cf5-b947-8d6cd0939196' then jsonb_set(e, '{content}', to_jsonb('Apa tanggapan Dispora soal tudingan plagiat logo GHM?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dispora membantah', '## Apa tanggapan Dispora soal tudingan plagiat logo GHM?')
where id = '26b7218e-ef2a-456d-b4fa-d7827a1bbf7e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6c05ebb0-c4b8-4c6c-ab12-103d13234e2b' then jsonb_set(e, '{content}', to_jsonb('Apakah logo Gorontalo Half Marathon 2025 akan diubah?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Logo Gorontalo Half Marathon 2025 ditinjau ulang', '## Apakah logo Gorontalo Half Marathon 2025 akan diubah?')
where id = '26b7218e-ef2a-456d-b4fa-d7827a1bbf7e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ea190acc-d3a0-45e2-9fff-d51b339281e2' then jsonb_set(e, '{content}', to_jsonb('Apa pesan Sugondo Makmur setelah dilantik?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pesan Sugondo Makmur untuk ASN', '## Apa pesan Sugondo Makmur setelah dilantik?')
where id = 'db1f1be3-4de9-4d87-8a45-a2f3b707eedb';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '01b0132f-7378-4807-886a-9236584d73d4' then jsonb_set(e, '{content}', to_jsonb('Apa peran Sekda dalam pemerintahan daerah?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Peran penting Sekda', '## Apa peran Sekda dalam pemerintahan daerah?')
where id = 'db1f1be3-4de9-4d87-8a45-a2f3b707eedb';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6747ed90-b1af-48bb-a58b-64c4efee5bb0' then jsonb_set(e, '{content}', to_jsonb('Berapa booth UMKM yang disiapkan untuk PENAS XVII?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## 80 booth UMKM untuk PENAS XVII', '## Berapa booth UMKM yang disiapkan untuk PENAS XVII?')
where id = '5c7773fb-513e-4b0c-b193-ed937956a1f2';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '16ec310a-5b30-415a-9db8-fbabdd72cab0' then jsonb_set(e, '{content}', to_jsonb('Apa saja agenda Gebyar UMKM 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Agenda Gebyar UMKM 2026', '## Apa saja agenda Gebyar UMKM 2026?')
where id = '5c7773fb-513e-4b0c-b193-ed937956a1f2';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'd322939b-079e-488a-8dae-6b534c678ed9' then jsonb_set(e, '{content}', to_jsonb('Apa yang bisa dipelajari dari Danau Biwa di Jepang?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Belajar dari Danau Biwa', '## Apa yang bisa dipelajari dari Danau Biwa di Jepang?')
where id = '829145a8-8ef0-4030-8feb-9191c5df8342';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '21fda2fa-e348-4636-8bd9-de4c22a9ba21' then jsonb_set(e, '{content}', to_jsonb('Apa tiga fokus pemulihan Danau Limboto bersama JICA?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tiga fokus untuk Danau Limboto', '## Apa tiga fokus pemulihan Danau Limboto bersama JICA?')
where id = '829145a8-8ef0-4030-8feb-9191c5df8342';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '38b8a579-698d-462b-8b5f-beb6cee6f907' then jsonb_set(e, '{content}', to_jsonb('Apa saja agenda Wamen ATR/BPN Ossy Dermawan di Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dua peran, dua agenda', '## Apa saja agenda Wamen ATR/BPN Ossy Dermawan di Gorontalo?')
where id = 'ab45736b-c59b-4d2d-9b32-64e83c40e592';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'e4401c0a-4481-4e64-86a8-e40ebef6290b' then jsonb_set(e, '{content}', to_jsonb('Bagaimana prosesi Mopotilolo untuk Ossy Dermawan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Mopotilolo untuk Ossy Dermawan', '## Bagaimana prosesi Mopotilolo untuk Ossy Dermawan?')
where id = 'ab45736b-c59b-4d2d-9b32-64e83c40e592';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6ad0a793-026e-4578-adb6-18967ae29124' then jsonb_set(e, '{content}', to_jsonb('Bagaimana cara kerja aplikasi SEARAH?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Cara kerja aplikasi SEARAH', '## Bagaimana cara kerja aplikasi SEARAH?')
where id = '65d5843f-6a9f-44bd-ba2d-f8ea4c8cced6';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'd942d151-45dc-4c9e-88e0-dfd8c0f348d1' then jsonb_set(e, '{content}', to_jsonb('Berapa tarif sewa Gedung Dulohupa?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tarif sewa Gedung Dulohupa', '## Berapa tarif sewa Gedung Dulohupa?')
where id = '65d5843f-6a9f-44bd-ba2d-f8ea4c8cced6';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6e8ed7ee-2a68-4aeb-9803-b4c2cd1d58a7' then jsonb_set(e, '{content}', to_jsonb('Bagaimana cara membayar sewa lewat SEARAH?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Bayar nontunai', '## Bagaimana cara membayar sewa lewat SEARAH?')
where id = '65d5843f-6a9f-44bd-ba2d-f8ea4c8cced6';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6eda792d-8624-4d74-ba99-68dac91dcd68' then jsonb_set(e, '{content}', to_jsonb('Polemik apa saja yang mengiringi GHM 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rentetan polemik sebelum lomba', '## Polemik apa saja yang mengiringi GHM 2025?')
where id = 'd44d8b12-b784-4e6c-9c14-5b4cf2b8f9a7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'fea3f67c-be3b-43db-8cfe-aedb69576db2' then jsonb_set(e, '{content}', to_jsonb('Bagaimana izin jalan GHM 2025 akhirnya keluar?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Izin jalan keluar setelah satu telepon', '## Bagaimana izin jalan GHM 2025 akhirnya keluar?')
where id = 'd44d8b12-b784-4e6c-9c14-5b4cf2b8f9a7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '71892133-fa7a-44bb-a78e-a570d2171e35' then jsonb_set(e, '{content}', to_jsonb('Bagaimana rincian 56 pejabat fungsional yang dilantik?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rincian 56 pejabat fungsional', '## Bagaimana rincian 56 pejabat fungsional yang dilantik?')
where id = 'bad73465-bcc4-4493-ae7b-9aa123ee09b4';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'e138069e-44c2-4050-8dc3-e36a0618354c' then jsonb_set(e, '{content}', to_jsonb('Apa tiga hal penting pesan Gubernur Gusnar?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pesan Gubernur Gusnar: tiga hal penting', '## Apa tiga hal penting pesan Gubernur Gusnar?')
where id = 'bad73465-bcc4-4493-ae7b-9aa123ee09b4';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '64f2438b-0920-48a4-8ba9-8c301de2558a' then jsonb_set(e, '{content}', to_jsonb('Apa saja sektor unggulan ekonomi kreatif Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Sektor unggulan pelaku ekonomi kreatif Gorontalo', '## Apa saja sektor unggulan ekonomi kreatif Gorontalo?')
where id = 'b275ca03-173d-42cf-b6fc-dfcb1e575858';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b5a2a0c8-08e0-4066-b803-865f7e5a84ff' then jsonb_set(e, '{content}', to_jsonb('Kenapa kreator muda perlu mendaftarkan merek sejak dini?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Buat kreator muda', '## Kenapa kreator muda perlu mendaftarkan merek sejak dini?')
where id = 'b275ca03-173d-42cf-b6fc-dfcb1e575858';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '06c47b74-3831-4278-8948-20063bd1c02c' then jsonb_set(e, '{content}', to_jsonb('Berapa peserta GHM 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Angka-angka GHM 2025', '## Berapa peserta GHM 2025?')
where id = 'c6f17460-265b-4a39-8127-eb1c60a6cc2b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'abf97aae-39f8-4484-bec4-5e97deb92083' then jsonb_set(e, '{content}', to_jsonb('Apa polemik medali finisher GHM 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Drama sebelum garis start', '## Apa polemik medali finisher GHM 2025?')
where id = 'c6f17460-265b-4a39-8127-eb1c60a6cc2b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ef5e0a82-bcc2-4ffb-b8d2-70d39b628d00' then jsonb_set(e, '{content}', to_jsonb('Bagaimana skema UMKM naik kelas ala Gusnar?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Skema UMKM naik kelas ala Gusnar', '## Bagaimana skema UMKM naik kelas ala Gusnar?')
where id = '3a7b4adc-8544-4532-adf6-a44e73342b56';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '7bcf3f41-509d-4f46-8407-a58763463dcb' then jsonb_set(e, '{content}', to_jsonb('Kenapa PENAS jadi peluang besar bagi UMKM Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Penas jadi peluang besar', '## Kenapa PENAS jadi peluang besar bagi UMKM Gorontalo?')
where id = '3a7b4adc-8544-4532-adf6-a44e73342b56';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c7413744-6291-4f44-8674-a4101ae5632b' then jsonb_set(e, '{content}', to_jsonb('Bagaimana minat baca warga Gorontalo saat ini?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Minat baca Gorontalo mulai tumbuh', '## Bagaimana minat baca warga Gorontalo saat ini?')
where id = '9e2bcf28-1251-4404-a3d6-d1a3943bd27c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'cc49d546-d341-4c01-b73f-82ace441965f' then jsonb_set(e, '{content}', to_jsonb('Apa agenda hari pertama Festival Literasi 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Seminar literasi keluarga di hari pertama', '## Apa agenda hari pertama Festival Literasi 2025?')
where id = '9e2bcf28-1251-4404-a3d6-d1a3943bd27c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3038a98f-237b-4c95-b140-866fec440153' then jsonb_set(e, '{content}', to_jsonb('Apa saja bahan berbahaya yang diuji BBPOM?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenali empat bahan berbahaya', '## Apa saja bahan berbahaya yang diuji BBPOM?')
where id = '67aa005f-054c-4b69-b8e5-06d94aa8476b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'e4633206-edbe-49d8-9d05-0b4d5f338dc9' then jsonb_set(e, '{content}', to_jsonb('Bagaimana cara melaporkan jajanan yang mencurigakan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Cara lapor jajanan mencurigakan', '## Bagaimana cara melaporkan jajanan yang mencurigakan?')
where id = '67aa005f-054c-4b69-b8e5-06d94aa8476b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '85181c49-ac9f-4c64-9558-ca1b64750012' then jsonb_set(e, '{content}', to_jsonb('Bagaimana rute Fun Run 5K UMGO?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rute Fun Run 5K UMGO', '## Bagaimana rute Fun Run 5K UMGO?')
where id = '9a98be1d-db55-473c-8798-36e45cce6d39';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '28bf7aa7-02fc-4f53-9d51-1bc8c19f63c4' then jsonb_set(e, '{content}', to_jsonb('Berapa hadiah untuk juara Fun Run 5K UMGO?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Hadiah untuk juara', '## Berapa hadiah untuk juara Fun Run 5K UMGO?')
where id = '9a98be1d-db55-473c-8798-36e45cce6d39';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'e0cec38b-4e45-4793-93fa-be6019562a99' then jsonb_set(e, '{content}', to_jsonb('Apa tips untuk pelari pemula?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tips untuk pelari pemula', '## Apa tips untuk pelari pemula?')
where id = '9a98be1d-db55-473c-8798-36e45cce6d39';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '368bd621-2561-41ae-a591-93f82e9bdad2' then jsonb_set(e, '{content}', to_jsonb('Bagaimana Adhan menanggapi laporan pemilik bangunan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Adhan Dambea tak gentar meski satu partai', '## Bagaimana Adhan menanggapi laporan pemilik bangunan?')
where id = 'dbf8a77c-65b9-41f1-8ed2-8ffb1fff278c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '7bbc831d-a53c-41df-9208-ec78218436d5' then jsonb_set(e, '{content}', to_jsonb('Kenapa Pemkot menertibkan bangunan di Jalan S. Parman?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Bagian dari penataan kawasan pertokoan', '## Kenapa Pemkot menertibkan bangunan di Jalan S. Parman?')
where id = 'dbf8a77c-65b9-41f1-8ed2-8ffb1fff278c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '33826950-466a-4b00-a334-cea9c0a21a59' then jsonb_set(e, '{content}', to_jsonb('Gorontalo Fun Run 5K bagian dari acara apa?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Bagian dari Festival Karawo', '## Gorontalo Fun Run 5K bagian dari acara apa?')
where id = '020b5a15-bba2-4de0-940c-5fdc47dc30b2';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4d450066-6529-4964-8274-6f234e4c9f6f' then jsonb_set(e, '{content}', to_jsonb('Berapa biaya daftar Gorontalo Fun Run 5K?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Cara daftar Gorontalo Fun Run 5K', '## Berapa biaya daftar Gorontalo Fun Run 5K?')
where id = '020b5a15-bba2-4de0-940c-5fdc47dc30b2';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c39e7744-10e1-4872-85f6-27fbb8d19cfa' then jsonb_set(e, '{content}', to_jsonb('Apa hubungan Kilat Wartabone dengan Nani Wartabone?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Cucu pejuang Nani Wartabone', '## Apa hubungan Kilat Wartabone dengan Nani Wartabone?')
where id = 'efe2c971-16aa-4ff1-8ae4-468ba0150e4c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '8d7e1fb2-3e2d-4d44-896a-92e0a45a6d2d' then jsonb_set(e, '{content}', to_jsonb('Bagaimana perjalanan Kilat Wartabone di pemerintahan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Perjalanan Kilat Wartabone di pemerintahan', '## Bagaimana perjalanan Kilat Wartabone di pemerintahan?')
where id = 'efe2c971-16aa-4ff1-8ae4-468ba0150e4c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '40bdeb08-71bf-4fc6-b244-316bc4eefa6f' then jsonb_set(e, '{content}', to_jsonb('Bagaimana UMKM mendapat ruang berjualan di Tabligh Akbar UAS?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Omzet UMKM naik berlipat', '## Bagaimana UMKM mendapat ruang berjualan di Tabligh Akbar UAS?')
where id = 'eec43fe2-6329-499c-b171-73d385e4392d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ea09d4f1-e855-437c-b212-177fe162d97f' then jsonb_set(e, '{content}', to_jsonb('Bagaimana menentukan warna Karawo untuk pasar global?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Warna Karawo harus ikut target pasar', '## Bagaimana menentukan warna Karawo untuk pasar global?')
where id = '76bd5c9b-3869-4453-85e0-1e1d0c5ee3be';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f02fcf51-c0f8-4e47-8d37-9785dd34780d' then jsonb_set(e, '{content}', to_jsonb('Apa kunci Karawo tembus pasar global?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Desainer dan perajin harus kolaborasi', '## Apa kunci Karawo tembus pasar global?')
where id = '76bd5c9b-3869-4453-85e0-1e1d0c5ee3be';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6ace87c1-8e58-410c-9f4b-56dec1bccb12' then jsonb_set(e, '{content}', to_jsonb('Apa saja fasilitas perumahan ASN di Dulomo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dibangun bertahap', '## Apa saja fasilitas perumahan ASN di Dulomo?')
where id = 'e887958a-69d0-4a48-9692-06a2841eba42';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '06855774-3bb5-42d8-b1d9-1b895a4fe1d0' then jsonb_set(e, '{content}', to_jsonb('Bagaimana tanggapan Komisi II DPR RI soal perluasan wilayah?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tanggapan Komisi II DPR RI', '## Bagaimana tanggapan Komisi II DPR RI soal perluasan wilayah?')
where id = '5b1d4831-b841-4243-bfef-6efecd7745f7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ad2e0f1f-d270-4350-b894-70c8667b6446' then jsonb_set(e, '{content}', to_jsonb('Kenapa UU pembentukan Kota Gorontalo perlu diperbarui?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## UU lama sejak 1959', '## Kenapa UU pembentukan Kota Gorontalo perlu diperbarui?')
where id = '5b1d4831-b841-4243-bfef-6efecd7745f7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'e711aa01-5d7c-4861-b1b8-89735fbfa8be' then jsonb_set(e, '{content}', to_jsonb('Berapa angka pengangguran Pohuwato?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pengangguran dan kemiskinan turun', '## Berapa angka pengangguran Pohuwato?')
where id = '5649986f-2cc9-4bec-850c-7065bed48910';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '90ca3a2f-96a2-4feb-af44-7a2e8b6f406a' then jsonb_set(e, '{content}', to_jsonb('Apa tantangan Pohuwato setelah ekonomi tumbuh cepat?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tantangan berikutnya: tata ruang', '## Apa tantangan Pohuwato setelah ekonomi tumbuh cepat?')
where id = '5649986f-2cc9-4bec-850c-7065bed48910';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'e686a97b-05f4-45bd-bd6f-21fcba1bddaf' then jsonb_set(e, '{content}', to_jsonb('Sejak kapan Koko’o Gorontalo 2025 dipersiapkan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Persiapan Koko’o Gorontalo 2025 sejak Desember', '## Sejak kapan Koko’o Gorontalo 2025 dipersiapkan?')
where id = 'c55122af-af51-4cd5-8d7c-ed886e28600e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '5c120bb3-0349-44d4-aa3d-1f11abe9abcb' then jsonb_set(e, '{content}', to_jsonb('Bagaimana rute Koko’o Gorontalo 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rute dan dua puncak keramaian', '## Bagaimana rute Koko’o Gorontalo 2025?')
where id = 'c55122af-af51-4cd5-8d7c-ed886e28600e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'e8b005b6-679d-4d77-b032-15b39e49f4d0' then jsonb_set(e, '{content}', to_jsonb('Apa manfaat Festival Dionumo bagi UMKM Gorontalo Utara?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Ramai pengunjung, UMKM ikut bergerak', '## Apa manfaat Festival Dionumo bagi UMKM Gorontalo Utara?')
where id = '62e7c762-53bb-4cb7-b5bb-e28db1b26e12';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '954634ab-4169-42ce-90f0-aab89f5276f3' then jsonb_set(e, '{content}', to_jsonb('Bagaimana cara membayar pajak kendaraan di Gerai GIIS?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Bayar pajak kendaraan di GIIS', '## Bagaimana cara membayar pajak kendaraan di Gerai GIIS?')
where id = '5d7e3248-5a5d-4d42-9fad-a62fea8346d1';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'fc9c1197-967a-475f-b34b-d0bc6c27d546' then jsonb_set(e, '{content}', to_jsonb('Apa tips membayar pajak kendaraan agar tidak kena denda?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tips buat pemilik kendaraan', '## Apa tips membayar pajak kendaraan agar tidak kena denda?')
where id = '5d7e3248-5a5d-4d42-9fad-a62fea8346d1';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'df3278a0-d421-4f89-8e79-84b93caf5b06' then jsonb_set(e, '{content}', to_jsonb('Bagaimana cara mendapat tiket Toton Caribo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tiket Toton Caribo lewat belanja QRIS', '## Bagaimana cara mendapat tiket Toton Caribo?')
where id = '848cf595-2b6f-4b6c-8482-a53fae048485';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ec0c5b95-ae33-4509-94c0-dd622e2e6cc8' then jsonb_set(e, '{content}', to_jsonb('Berapa omzet UMKM kuliner selama QRIS Jelajah Kuliner?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Omzet UMKM kuliner Rp1,26 miliar', '## Berapa omzet UMKM kuliner selama QRIS Jelajah Kuliner?')
where id = '848cf595-2b6f-4b6c-8482-a53fae048485';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'bae235bb-615c-460e-a084-59f39319c3df' then jsonb_set(e, '{content}', to_jsonb('Berapa harga lampu minyak Tumbilotohe?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Harga lampu minyak Tumbilotohe', '## Berapa harga lampu minyak Tumbilotohe?')
where id = '873e4f1d-92f3-4fe0-9e3d-3cbd01c003c0';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'd0f94fdb-e239-43f8-ae18-becc3442377e' then jsonb_set(e, '{content}', to_jsonb('Kapan pembeli lampu minyak paling ramai?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Ramai jelang H-2', '## Kapan pembeli lampu minyak paling ramai?')
where id = '873e4f1d-92f3-4fe0-9e3d-3cbd01c003c0';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'dac574db-b7e8-4eec-a0d9-7dfabd373026' then jsonb_set(e, '{content}', to_jsonb('Kenapa revitalisasi sekolah penting?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa revitalisasi sekolah penting', '## Kenapa revitalisasi sekolah penting?')
where id = '8c81f94f-a8cd-4601-81c6-5001d4df7edf';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '54ed1e98-0c4b-4011-83e9-11e4ec053476' then jsonb_set(e, '{content}', to_jsonb('Bagaimana rute satu arah Jalan HB Jassin?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rute satu arah Jalan HB Jassin', '## Bagaimana rute satu arah Jalan HB Jassin?')
where id = 'd2a40362-d94c-439a-a6ef-90e2c46977cd';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'd1ae3953-fd26-43c3-9990-ee93987f4c14' then jsonb_set(e, '{content}', to_jsonb('Jam berapa uji coba satu arah berlaku?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Jam uji coba', '## Jam berapa uji coba satu arah berlaku?')
where id = 'd2a40362-d94c-439a-a6ef-90e2c46977cd';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4cd7ca87-292c-4f15-9e08-eda0c78defc2' then jsonb_set(e, '{content}', to_jsonb('Kenapa kinerja BUMD Gorontalo belum optimal?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kondisi BUMD Gorontalo selama ini', '## Kenapa kinerja BUMD Gorontalo belum optimal?')
where id = 'b8af33ed-d6d9-490c-9e64-ac334887a74a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ecd6dab5-4fc4-4581-a785-a79074ce94db' then jsonb_set(e, '{content}', to_jsonb('Sektor apa yang jadi fokus BUMD Gorontalo Fitrah Mandiri?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Fokus pada tiga sektor', '## Sektor apa yang jadi fokus BUMD Gorontalo Fitrah Mandiri?')
where id = 'b8af33ed-d6d9-490c-9e64-ac334887a74a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f5f24e97-782c-4a62-813d-7ba7203b7657' then jsonb_set(e, '{content}', to_jsonb('Desa mana saja yang terdampak banjir bandang Biau?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Data desa terdampak banjir bandang', '## Desa mana saja yang terdampak banjir bandang Biau?')
where id = '23279df4-4a76-4633-8ab3-d58a21c2b2a5';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f805cba6-ef0d-4d9a-9b73-8544088bb89b' then jsonb_set(e, '{content}', to_jsonb('Bagaimana cara membantu korban banjir Biau?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Cara membantu', '## Bagaimana cara membantu korban banjir Biau?')
where id = '23279df4-4a76-4633-8ab3-d58a21c2b2a5';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b2d0ef20-debf-424b-9a14-80ae0304d1e8' then jsonb_set(e, '{content}', to_jsonb('Apa itu iuran pertambangan rakyat?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Iuran pertambangan rakyat', '## Apa itu iuran pertambangan rakyat?')
where id = '0792dd18-edd4-4f29-ac8c-1101725ca4c8';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '54ffe740-0f94-4dc7-9840-4a62c95093f9' then jsonb_set(e, '{content}', to_jsonb('Bagaimana struktur pendapatan Pemprov Gorontalo 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Struktur pendapatan Pemprov', '## Bagaimana struktur pendapatan Pemprov Gorontalo 2026?')
where id = '0792dd18-edd4-4f29-ac8c-1101725ca4c8';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6a86b092-051b-486a-830c-cac6b53ccecb' then jsonb_set(e, '{content}', to_jsonb('Apa target Andi Ilham untuk Kadin Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kadin Gorontalo sebagai mitra pemerintah dan rumah UMKM', '## Apa target Andi Ilham untuk Kadin Gorontalo?')
where id = 'e659ee2a-78d9-4b2b-b4f7-854361f7226d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'aa6eba6c-ccfd-47a8-b245-f67ea519e0af' then jsonb_set(e, '{content}', to_jsonb('Apa tiga pilar kepemimpinan yang disiapkan Andi Ilham?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tiga pilar yang disiapkan Andi Ilham', '## Apa tiga pilar kepemimpinan yang disiapkan Andi Ilham?')
where id = 'e659ee2a-78d9-4b2b-b4f7-854361f7226d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9c41ce76-566c-4add-8aa1-720807966cc8' then jsonb_set(e, '{content}', to_jsonb('Bagaimana proses pengurusan paspor di Eazy Paspor?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Proses di Eazy Paspor', '## Bagaimana proses pengurusan paspor di Eazy Paspor?')
where id = 'd97ae1a1-23d0-47d7-8b82-aa89230d94a6';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '899e90e2-68e7-411a-8a7a-01e28c4b164f' then jsonb_set(e, '{content}', to_jsonb('Kenapa literasi ekonomi di sekolah dinilai kurang?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Paham teori, gagap praktik', '## Kenapa literasi ekonomi di sekolah dinilai kurang?')
where id = '3188dc58-91e3-461a-89e7-bb5f8f59538d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '83ecae41-09db-484b-b4fa-01b369349d5d' then jsonb_set(e, '{content}', to_jsonb('Apa dampak gagal bayar pinjol bagi skor kredit?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Skor kredit adalah reputasi finansial', '## Apa dampak gagal bayar pinjol bagi skor kredit?')
where id = '3188dc58-91e3-461a-89e7-bb5f8f59538d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '340aa888-804d-4eb5-93bd-e18ee62d73c3' then jsonb_set(e, '{content}', to_jsonb('Apa catatan BPK untuk Pemprov Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Catatan BPK untuk Pemprov Gorontalo', '## Apa catatan BPK untuk Pemprov Gorontalo?')
where id = 'ea6a230b-abf5-4d62-90da-5a8756f5bdf6';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '140b9c86-d2ba-405f-95c7-655350e3f76e' then jsonb_set(e, '{content}', to_jsonb('Apakah WTP berarti bebas masalah?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## WTP bukan berarti bebas masalah', '## Apakah WTP berarti bebas masalah?')
where id = 'ea6a230b-abf5-4d62-90da-5a8756f5bdf6';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '577ede4c-ba64-46f3-83bf-ea6ecbb7eb6b' then jsonb_set(e, '{content}', to_jsonb('Siapa saja yang mendukung Karawo di IFW 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dukungan banyak pihak', '## Siapa saja yang mendukung Karawo di IFW 2026?')
where id = '24f2602a-1028-48a3-bd4a-5e068a83fdac';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b0ac5399-23a6-4a09-8140-7bd101ae7641' then jsonb_set(e, '{content}', to_jsonb('Siapa bintang tamu AIR Fun Run Gorontalo 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Wulan Guritno akan hadir', '## Siapa bintang tamu AIR Fun Run Gorontalo 2025?')
where id = '0f07d0c8-a51d-45d2-8319-529105187c11';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2f2e17b0-fc79-4e74-ae48-4aca5fa3e48a' then jsonb_set(e, '{content}', to_jsonb('Kapan dan bagaimana cara daftar AIR Fun Run Gorontalo 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Cara daftar AIR Fun Run Gorontalo 2025', '## Kapan dan bagaimana cara daftar AIR Fun Run Gorontalo 2025?')
where id = '0f07d0c8-a51d-45d2-8319-529105187c11';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4d460712-6a9c-4854-b336-b0b640240294' then jsonb_set(e, '{content}', to_jsonb('Apa nasib lahan Gelar Teknologi PENAS di Kayubulan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Menjawab pertanyaan warga', '## Apa nasib lahan Gelar Teknologi PENAS di Kayubulan?')
where id = 'f7ff9966-f24d-4c40-b7cb-32201e20d20b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'fc54943e-45f0-46ce-b6f7-dc7237bafcff' then jsonb_set(e, '{content}', to_jsonb('Kenapa agrowisata Kayubulan menarik untuk keluarga?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa agrowisata menarik', '## Kenapa agrowisata Kayubulan menarik untuk keluarga?')
where id = 'f7ff9966-f24d-4c40-b7cb-32201e20d20b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '1b2ce277-347f-4b67-a525-d124e9575df5' then jsonb_set(e, '{content}', to_jsonb('Apa pondasi ekonomi Gorontalo saat ini?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## UMKM Gorontalo jadi pondasi ekonomi', '## Apa pondasi ekonomi Gorontalo saat ini?')
where id = '030bb6d5-2f2f-4c6e-a130-4a11179d450e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'efd94487-fede-4058-8526-5b23c40072b8' then jsonb_set(e, '{content}', to_jsonb('Apa yang perlu dihitung sebelum mengajukan kredit usaha?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Sebelum mengajukan kredit', '## Apa yang perlu dihitung sebelum mengajukan kredit usaha?')
where id = '030bb6d5-2f2f-4c6e-a130-4a11179d450e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'fa549185-2396-4965-9c80-f2e3d91a362d' then jsonb_set(e, '{content}', to_jsonb('Siapa saja yang hadir di halal bihalal KKIG Makassar?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Siapa saja yang hadir di halal bihalal KKIG Makassar', '## Siapa saja yang hadir di halal bihalal KKIG Makassar?')
where id = 'b25654d0-58ca-4541-9dbb-240beeb88c73';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '09b806b1-c075-43ba-88df-4a4c6e5d0ab5' then jsonb_set(e, '{content}', to_jsonb('Apa isi deklarasi gerakan infak KKIG Makassar?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Deklarasi gerakan infak', '## Apa isi deklarasi gerakan infak KKIG Makassar?')
where id = 'b25654d0-58ca-4541-9dbb-240beeb88c73';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c695daf8-4698-4ecb-b741-cd0a8c554f0e' then jsonb_set(e, '{content}', to_jsonb('Dari mana asal ungkapan “Sekali ke Djokja, Tetap ke Djokja”?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Asal usul “Sekali ke Djokja, Tetap ke Djokja”', '## Dari mana asal ungkapan “Sekali ke Djokja, Tetap ke Djokja”?')
where id = 'cd6d66da-bb9a-43c3-9265-13129f75c8bc';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '010f28cf-52e2-4b2e-82c4-93c9e07de907' then jsonb_set(e, '{content}', to_jsonb('Siapa saja pembicara diskusi buku Ajoeba Wartabone?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Para pembicara', '## Siapa saja pembicara diskusi buku Ajoeba Wartabone?')
where id = 'cd6d66da-bb9a-43c3-9265-13129f75c8bc';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9f8c8b87-8dba-4792-b315-acad79b06c6b' then jsonb_set(e, '{content}', to_jsonb('Kenapa pemberitaan tarif hiu paus memicu salah paham?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Hiu Paus Botubarani dan judul yang memicu salah paham', '## Kenapa pemberitaan tarif hiu paus memicu salah paham?')
where id = '166c8337-0875-4942-82e7-da0d2743f60f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3245b6ac-97fe-44ee-ae7f-3cedeab51a4a' then jsonb_set(e, '{content}', to_jsonb('Berapa dana LAUTRA yang diusulkan untuk Botubarani?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Usulan dana LAUTRA Rp3 miliar lebih', '## Berapa dana LAUTRA yang diusulkan untuk Botubarani?')
where id = '166c8337-0875-4942-82e7-da0d2743f60f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f1d79d13-1123-4405-8a5b-fde48ed6c926' then jsonb_set(e, '{content}', to_jsonb('Apa peran istri pejabat dalam pencegahan korupsi?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Perempuan sebagai corong antikorupsi', '## Apa peran istri pejabat dalam pencegahan korupsi?')
where id = '78e8a7d9-5994-441c-be18-1b7228ae2667';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '984de633-67b6-475f-b16e-648457db3a72' then jsonb_set(e, '{content}', to_jsonb('Kenapa keluarga pejabat perlu berhati-hati di media sosial?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Idah Syahidah berpikir dua kali sebelum posting', '## Kenapa keluarga pejabat perlu berhati-hati di media sosial?')
where id = '78e8a7d9-5994-441c-be18-1b7228ae2667';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '0d629ec6-79d3-47ee-9912-3f5a1348280b' then jsonb_set(e, '{content}', to_jsonb('Kenapa hanya 90 dari 781 pendaftar yang diterima?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## 781 pendaftar, 90 diterima', '## Kenapa hanya 90 dari 781 pendaftar yang diterima?')
where id = 'e75b8b19-2771-4bc7-90b3-2e13a7c8558d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'be5628dc-9d7e-48d5-b131-2a9bdb413fac' then jsonb_set(e, '{content}', to_jsonb('Apa tips supaya magang berbuah pekerjaan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tips supaya magang berbuah kerja', '## Apa tips supaya magang berbuah pekerjaan?')
where id = 'e75b8b19-2771-4bc7-90b3-2e13a7c8558d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'a37cf617-07ed-453a-baa9-c464d4ed8b99' then jsonb_set(e, '{content}', to_jsonb('Seperti apa wajah baru Taman Menara Pakaya?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Wajah baru Taman Menara Pakaya', '## Seperti apa wajah baru Taman Menara Pakaya?')
where id = 'a6dfcf28-f335-4328-8c92-41d9befca463';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '1d457327-f340-41c7-9c8c-97f5c7ebb796' then jsonb_set(e, '{content}', to_jsonb('Siapa yang membiayai revitalisasi Taman Menara Pakaya?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tidak membebani APBD', '## Siapa yang membiayai revitalisasi Taman Menara Pakaya?')
where id = 'a6dfcf28-f335-4328-8c92-41d9befca463';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4c5a07b7-ba43-4daa-adc2-f5c11f1469b2' then jsonb_set(e, '{content}', to_jsonb('Kapan revitalisasi Taman Menara Pakaya ditargetkan selesai?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Target rampung sebelum PENAS KTNA', '## Kapan revitalisasi Taman Menara Pakaya ditargetkan selesai?')
where id = 'a6dfcf28-f335-4328-8c92-41d9befca463';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '21f0fd6f-c20d-451a-ada4-b5d42df8bd43' then jsonb_set(e, '{content}', to_jsonb('Apa solusi murah agar tarian Karawo tetap beridentitas?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Solusi murah: kipas Karawo', '## Apa solusi murah agar tarian Karawo tetap beridentitas?')
where id = 'd1ecaff5-3d06-4e35-913f-a89557d0c63d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'cc31b52d-cda0-4c46-ac7b-64a26d826f31' then jsonb_set(e, '{content}', to_jsonb('Seperti apa keranda adat Gorontalo yang dipakai?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Keranda khas adat Gorontalo', '## Seperti apa keranda adat Gorontalo yang dipakai?')
where id = 'cfb6783c-7632-419c-87c4-1014c7a89209';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f424b991-9e8a-45d0-9bb2-d2e2aa772571' then jsonb_set(e, '{content}', to_jsonb('Apa warisan Rachmat Gobel untuk Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Warisan untuk Gorontalo', '## Apa warisan Rachmat Gobel untuk Gorontalo?')
where id = 'cfb6783c-7632-419c-87c4-1014c7a89209';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'e87fcb34-cd1b-4f0c-9b98-0add6f4906ff' then jsonb_set(e, '{content}', to_jsonb('Dari mana dana bantuan modal UMKM ini?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Uangnya dari zakat ASN', '## Dari mana dana bantuan modal UMKM ini?')
where id = '3fc2462a-268a-4a9d-8f6c-dc0f459c2637';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9519dd5c-b3d2-441b-b45e-367be32635fa' then jsonb_set(e, '{content}', to_jsonb('Untuk apa bantuan modal Rp1,2 juta sebaiknya dipakai?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Contoh pemakaian yang tepat', '## Untuk apa bantuan modal Rp1,2 juta sebaiknya dipakai?')
where id = '3fc2462a-268a-4a9d-8f6c-dc0f459c2637';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'a44bed5c-5f6d-4a37-804b-1c2aa491b1bb' then jsonb_set(e, '{content}', to_jsonb('Apa fokus Program SKALA di Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Fokus pada kelompok rentan', '## Apa fokus Program SKALA di Gorontalo?')
where id = 'bb2bd4b7-f232-4d33-b8d6-dbd811090a20';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f4ac0116-9164-417b-8417-b9554c9509e9' then jsonb_set(e, '{content}', to_jsonb('Kenapa kenaikan muka air laut relevan bagi Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa kenaikan muka air laut relevan', '## Kenapa kenaikan muka air laut relevan bagi Gorontalo?')
where id = 'bb2bd4b7-f232-4d33-b8d6-dbd811090a20';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f7c9c581-2f32-410e-b198-6f9e20def8a4' then jsonb_set(e, '{content}', to_jsonb('Kenapa bahasa daerah makin terpinggirkan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Bahasa daerah makin terpinggirkan', '## Kenapa bahasa daerah makin terpinggirkan?')
where id = 'f46f9ac0-226f-4c3c-bbbe-c78d524d8fee';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '989c3e4d-6cec-4b0f-a165-0f5829643820' then jsonb_set(e, '{content}', to_jsonb('Apa tugas pemenang Duta Bahasa setelah terpilih?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Bukan sekadar ikon', '## Apa tugas pemenang Duta Bahasa setelah terpilih?')
where id = 'f46f9ac0-226f-4c3c-bbbe-c78d524d8fee';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '733a7af7-13f6-4283-b308-6a1c9541c3b3' then jsonb_set(e, '{content}', to_jsonb('Berapa OKP yang ikut Kirab Bendera Pusaka?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## 18 OKP ikut Kirab Bendera Pusaka', '## Berapa OKP yang ikut Kirab Bendera Pusaka?')
where id = '47b0fbbc-a03f-4e85-a6ab-a73b1db3f5e9';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '58ddd720-89f3-48f8-929a-2ef6a38bfdb9' then jsonb_set(e, '{content}', to_jsonb('Bagaimana rute Kirab Bendera Pusaka 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rute kirab', '## Bagaimana rute Kirab Bendera Pusaka 2026?')
where id = '47b0fbbc-a03f-4e85-a6ab-a73b1db3f5e9';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b9a94cdf-6e79-4ce0-9d6d-7da8a3b1bb29' then jsonb_set(e, '{content}', to_jsonb('Berapa biaya dan lama pembangunan Gedung BKAD?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dibangun dua tahun', '## Berapa biaya dan lama pembangunan Gedung BKAD?')
where id = '44b23e2b-af40-4dbf-add4-1aa7a00b7372';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'db659a48-d12a-480f-8c90-6ede918c307f' then jsonb_set(e, '{content}', to_jsonb('Apa tugas Badan Pendapatan Daerah yang baru?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Badan pendapatan terpisah', '## Apa tugas Badan Pendapatan Daerah yang baru?')
where id = '44b23e2b-af40-4dbf-add4-1aa7a00b7372';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '5700ea36-ca4d-40ff-93e5-2c71de29d1aa' then jsonb_set(e, '{content}', to_jsonb('Kapan puasa dimulai di Bone Bolango?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Menunggu keputusan pusat', '## Kapan puasa dimulai di Bone Bolango?')
where id = '13822f65-bb47-450b-ae8a-12af3f0c4ec8';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ffd52c43-2213-4a1e-bd19-7a624922e375' then jsonb_set(e, '{content}', to_jsonb('Apa saja rincian bantuan Rp53 miliar dari Mentan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rincian bantuan dari Mentan', '## Apa saja rincian bantuan Rp53 miliar dari Mentan?')
where id = '0e9afb41-821e-466f-8c31-48a1f08fed4e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'dfc6f9c0-ee32-43b8-bd51-96830ee8e0e2' then jsonb_set(e, '{content}', to_jsonb('Apa itu teknologi PM-AAS dari Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Teknologi PM-AAS dari Gorontalo', '## Apa itu teknologi PM-AAS dari Gorontalo?')
where id = '0e9afb41-821e-466f-8c31-48a1f08fed4e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6b7161e9-77eb-489c-a00b-d8aa6df40ad6' then jsonb_set(e, '{content}', to_jsonb('Bagaimana asal-usul tradisi Malam Qunut?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Asal-usul Malam Qunut', '## Bagaimana asal-usul tradisi Malam Qunut?')
where id = 'e2909bb6-b737-4d40-9984-83ee54f9c007';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '68771ee8-1543-4a78-a806-4b170da2b18d' then jsonb_set(e, '{content}', to_jsonb('Berapa harga kacang dan pisang saat Malam Qunut?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Harga kacang dan pisang', '## Berapa harga kacang dan pisang saat Malam Qunut?')
where id = 'e2909bb6-b737-4d40-9984-83ee54f9c007';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'bfd8ef8e-fcd1-4013-9da4-05afc4decdf3' then jsonb_set(e, '{content}', to_jsonb('Siapa pengunjung paling disorot di Botubarani saat PENAS?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Efek Gubernur Sherly', '## Siapa pengunjung paling disorot di Botubarani saat PENAS?')
where id = '6b3e3044-8a29-46b8-9b93-51876cfcd776';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '908f0789-3cfa-48aa-9c62-d4f88df81440' then jsonb_set(e, '{content}', to_jsonb('Apa tantangan Botubarani setelah lonjakan pengunjung?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tantangan setelah ramai', '## Apa tantangan Botubarani setelah lonjakan pengunjung?')
where id = '6b3e3044-8a29-46b8-9b93-51876cfcd776';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '8c42051b-1cc8-48fc-9a08-e4e3aec1397f' then jsonb_set(e, '{content}', to_jsonb('Apa peran Balai Pelestarian Kebudayaan menurut Fadli Zon?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Balai Pelestarian Kebudayaan sebagai kantong budaya', '## Apa peran Balai Pelestarian Kebudayaan menurut Fadli Zon?')
where id = 'c37e3a8f-c85e-4dfd-a522-6da43085de36';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '600329c5-026f-43c8-81d8-103e9fcb7f5a' then jsonb_set(e, '{content}', to_jsonb('Berapa warisan budaya takbenda Indonesia saat ini?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## 2.300 lebih warisan budaya takbenda', '## Berapa warisan budaya takbenda Indonesia saat ini?')
where id = 'c37e3a8f-c85e-4dfd-a522-6da43085de36';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '291c1c3b-b861-4ef6-995e-7cbf14ff48f6' then jsonb_set(e, '{content}', to_jsonb('Siapa Rania Riris Ismail?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Latar belakang Rania Riris Ismail', '## Siapa Rania Riris Ismail?')
where id = 'ff8fab80-7a0c-4ed5-86f6-3f35aa6ad25c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'a1843286-0497-4b86-97b5-3e7784f81d51' then jsonb_set(e, '{content}', to_jsonb('Bagaimana tanggapan soal tudingan nepotisme?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tanggapan suami soal tudingan nepotisme', '## Bagaimana tanggapan soal tudingan nepotisme?')
where id = 'ff8fab80-7a0c-4ed5-86f6-3f35aa6ad25c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4ad40acb-a91f-4aea-b08b-872419ce5b6e' then jsonb_set(e, '{content}', to_jsonb('Kenapa keluarga Warno datang ke Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenalkan budaya leluhur', '## Kenapa keluarga Warno datang ke Gorontalo?')
where id = '7d847f52-8bac-4073-9c99-b6f61af3e0e8';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b1b5925b-06cb-4296-8b42-6f19573d79ee' then jsonb_set(e, '{content}', to_jsonb('Bagaimana prosesi adat pembeatan dijalani?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Prosesi pembeatan yang berat', '## Bagaimana prosesi adat pembeatan dijalani?')
where id = '7d847f52-8bac-4073-9c99-b6f61af3e0e8';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4342d304-c83d-4b01-9e2f-1e4f9369595d' then jsonb_set(e, '{content}', to_jsonb('Bagaimana perjalanan Sharon Evangeline Tentero?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Perjalanan Sharon Evangeline Tentero', '## Bagaimana perjalanan Sharon Evangeline Tentero?')
where id = '952028f5-00b5-49ac-9441-43d55fd91679';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f4189fca-dfaf-49f0-a90c-525741807c38' then jsonb_set(e, '{content}', to_jsonb('Apa misi Sharon untuk perempuan muda Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Misi untuk perempuan muda Gorontalo', '## Apa misi Sharon untuk perempuan muda Gorontalo?')
where id = '952028f5-00b5-49ac-9441-43d55fd91679';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '979b0e68-566b-46e9-8039-3a8ae3d74838' then jsonb_set(e, '{content}', to_jsonb('Provinsi mana yang mengirim peserta terbanyak ke PENAS XVII?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tiga provinsi peserta terbanyak', '## Provinsi mana yang mengirim peserta terbanyak ke PENAS XVII?')
where id = '3ddc83da-569c-42d0-8cde-ec434556e70a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '5b4b5d09-56c5-43d2-980b-5740617e739e' then jsonb_set(e, '{content}', to_jsonb('Bagaimana PENAS XVII dibuka?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dibuka dengan polopalo', '## Bagaimana PENAS XVII dibuka?')
where id = '3ddc83da-569c-42d0-8cde-ec434556e70a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6f1437be-6e4e-4161-aa1c-16dc03220a1b' then jsonb_set(e, '{content}', to_jsonb('Apa dasar pencabutan status cagar budaya Rumah Tinggi?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Berawal dari gugatan perdata', '## Apa dasar pencabutan status cagar budaya Rumah Tinggi?')
where id = '5a87ef35-1bb7-4bee-b7da-b9ff4ca65d97';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f56c55b1-78df-48fa-9649-791c0ac9b72d' then jsonb_set(e, '{content}', to_jsonb('Apakah menu Jakarta Pecinan Halal benar-benar halal?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Nuansa Imlek, menu halal', '## Apakah menu Jakarta Pecinan Halal benar-benar halal?')
where id = '58bd0895-252b-4cc0-b26f-dca5f0a697d8';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '05a6f99b-95c7-4b7f-a057-0e60f975fa02' then jsonb_set(e, '{content}', to_jsonb('Apa tips datang ke festival kuliner Jakarta Pecinan Halal?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tips datang ke festival', '## Apa tips datang ke festival kuliner Jakarta Pecinan Halal?')
where id = '58bd0895-252b-4cc0-b26f-dca5f0a697d8';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '74625c2a-d664-4dfe-b1ac-850b82c7693b' then jsonb_set(e, '{content}', to_jsonb('Bagaimana Adrian bisa berhaji di usia 19 tahun?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Didaftarkan sejak kecil', '## Bagaimana Adrian bisa berhaji di usia 19 tahun?')
where id = '2b1d8021-98a7-4f4e-8378-0474ef7ac633';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3f813710-271e-406d-8bcb-05b5bb9593e5' then jsonb_set(e, '{content}', to_jsonb('Bagaimana rute Fun Run 5K UMGO 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rute Fun Run 5K UMGO 2026', '## Bagaimana rute Fun Run 5K UMGO 2026?')
where id = '0b99eaad-9c45-4d3a-80df-f0e87abc9601';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '66d711eb-b91b-4310-a309-0407c429992d' then jsonb_set(e, '{content}', to_jsonb('Berapa total hadiah Fun Run 5K UMGO 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Total hadiah untuk para juara', '## Berapa total hadiah Fun Run 5K UMGO 2026?')
where id = '0b99eaad-9c45-4d3a-80df-f0e87abc9601';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2a958290-c344-4848-84a8-1f2867cf25fd' then jsonb_set(e, '{content}', to_jsonb('Kenapa kolaborasi lintas sektor penting untuk Karawo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kolaborasi lintas sektor', '## Kenapa kolaborasi lintas sektor penting untuk Karawo?')
where id = '3c5cead2-dd87-4639-a24d-463fd9e785da';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3ce84915-16a9-4b35-9b3b-6c5092616f81' then jsonb_set(e, '{content}', to_jsonb('Siapa Sumurung Simaremare, Kajati Gorontalo yang baru?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Profil Kajati Gorontalo baru', '## Siapa Sumurung Simaremare, Kajati Gorontalo yang baru?')
where id = '35948b64-4fa4-49b3-aecc-b71d7e5663d5';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'daacc9ae-5418-4287-9439-cc1f8e9a2587' then jsonb_set(e, '{content}', to_jsonb('Bagaimana tahapan prosesi Mopotilolo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tahapan prosesi Mopotilolo', '## Bagaimana tahapan prosesi Mopotilolo?')
where id = '35948b64-4fa4-49b3-aecc-b71d7e5663d5';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '8ff58c1e-4610-4638-a38c-83792dbbb193' then jsonb_set(e, '{content}', to_jsonb('Di mana calon lokasi Sekolah Garuda di Boalemo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tiga calon lokasi Sekolah Garuda', '## Di mana calon lokasi Sekolah Garuda di Boalemo?')
where id = '3e1259ea-07e9-4e03-8625-f1c7852fcde9';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'a2d5286a-2315-4739-9ff6-4716192e342e' then jsonb_set(e, '{content}', to_jsonb('Apa arti Sekolah Garuda bagi pelajar Boalemo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Harapan untuk pendidikan Boalemo', '## Apa arti Sekolah Garuda bagi pelajar Boalemo?')
where id = '3e1259ea-07e9-4e03-8625-f1c7852fcde9';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '89cb304a-5538-4ac7-93cf-4195dfeeea06' then jsonb_set(e, '{content}', to_jsonb('Apa isi instruksi Adhan Dambea soal bansos?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Isi instruksi Adhan Dambea soal bansos', '## Apa isi instruksi Adhan Dambea soal bansos?')
where id = '5004d443-4621-47b8-8120-650bd0a4608e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2f118f65-2930-40c6-952f-3e85a07e799b' then jsonb_set(e, '{content}', to_jsonb('Apa saja yang dibahas dalam Rakorev?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Agenda lain dalam Rakorev', '## Apa saja yang dibahas dalam Rakorev?')
where id = '5004d443-4621-47b8-8120-650bd0a4608e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c921962e-a599-4432-af39-1a223b66b6d1' then jsonb_set(e, '{content}', to_jsonb('Apa saja fasilitas glamping di Bohulo Camp?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pilihan glamping dan fasilitas', '## Apa saja fasilitas glamping di Bohulo Camp?')
where id = 'aefe85d0-0e0c-4f9f-9fbb-69cc1f06b23a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '7a8c8e17-6482-43f2-b1b2-038fbf3c8afb' then jsonb_set(e, '{content}', to_jsonb('Bagaimana akses ke Bohulo Camp di Dulamayo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Akses dan tips perjalanan', '## Bagaimana akses ke Bohulo Camp di Dulamayo?')
where id = 'aefe85d0-0e0c-4f9f-9fbb-69cc1f06b23a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c538efec-5f83-4ca2-8a4b-011f7070798a' then jsonb_set(e, '{content}', to_jsonb('Burung air apa saja yang tercatat di Danau Limboto?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Burung air yang tercatat di Danau Limboto', '## Burung air apa saja yang tercatat di Danau Limboto?')
where id = '4e93282d-b41d-4d6c-bb46-ea7850463b5f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6a15c00d-6164-4212-990d-2b1df8c824a1' then jsonb_set(e, '{content}', to_jsonb('Siapa saja yang terlibat dalam sensus AWC?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## 80 relawan dari kampus sampai jurnalis', '## Siapa saja yang terlibat dalam sensus AWC?')
where id = '4e93282d-b41d-4d6c-bb46-ea7850463b5f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '0bc197ab-67f7-4b89-96f7-1916549de6d9' then jsonb_set(e, '{content}', to_jsonb('Berapa omzet hotel di Gorontalo selama PENAS XVII?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Omzet hotel selama PENAS XVII', '## Berapa omzet hotel di Gorontalo selama PENAS XVII?')
where id = 'abcbe761-d9f8-4ad8-be0c-a7ea532377cb';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '38f12054-c697-4abb-921d-8e356e341737' then jsonb_set(e, '{content}', to_jsonb('Di mana peserta PENAS menginap saat hotel penuh?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rumah sewa dan kos-kosan ikut untung', '## Di mana peserta PENAS menginap saat hotel penuh?')
where id = 'abcbe761-d9f8-4ad8-be0c-a7ea532377cb';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '24f202ba-5ec7-46a1-b549-f2b1bc7ab164' then jsonb_set(e, '{content}', to_jsonb('Apa pelajaran dari penuhnya hotel saat PENAS?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pelajaran untuk event berikutnya', '## Apa pelajaran dari penuhnya hotel saat PENAS?')
where id = 'abcbe761-d9f8-4ad8-be0c-a7ea532377cb';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '678f0a36-f3eb-4f60-96eb-32ba5b61e161' then jsonb_set(e, '{content}', to_jsonb('Siapa pejabat yang tidak lagi disambut Mopotilolo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Yang tidak lagi disambut Mopotilolo', '## Siapa pejabat yang tidak lagi disambut Mopotilolo?')
where id = 'e758a3cc-b424-4ea3-95ac-7434acf15825';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c9aec1f2-6f09-4df2-9f3d-773dffb2cff4' then jsonb_set(e, '{content}', to_jsonb('Apa manfaat Waduk Bulango Ulu?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Manfaat Waduk Bulango Ulu', '## Apa manfaat Waduk Bulango Ulu?')
where id = '8e251045-ac8c-496e-8506-0bb65b804c54';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'a8837cf7-f1a4-4e9d-bea0-3fd9e287bf0f' then jsonb_set(e, '{content}', to_jsonb('Berapa kapasitas kapal perintis saat arus mudik?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kapasitas ditambah jadi 554 penumpang', '## Berapa kapasitas kapal perintis saat arus mudik?')
where id = '3db2c3cd-6a8f-4790-879b-7058b51738c5';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3cd46afd-d659-4dba-801c-7ebf9f54e6b2' then jsonb_set(e, '{content}', to_jsonb('Apa tips mudik naik kapal perintis?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tips mudik naik kapal perintis', '## Apa tips mudik naik kapal perintis?')
where id = '3db2c3cd-6a8f-4790-879b-7058b51738c5';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '39a328d0-1059-4ef8-b5b0-32526ebd6169' then jsonb_set(e, '{content}', to_jsonb('Kenapa Garuda Indonesia memundurkan jadwal terbang Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Supaya pelari luar daerah bisa langsung pulang', '## Kenapa Garuda Indonesia memundurkan jadwal terbang Gorontalo?')
where id = '14f2fc91-6261-4907-9584-60db39cf3f65';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f0606ab9-dae1-40b7-ac41-a8b227125c90' then jsonb_set(e, '{content}', to_jsonb('Apakah ada tambahan penerbangan saat GHM 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tambahan penerbangan menyesuaikan penumpang', '## Apakah ada tambahan penerbangan saat GHM 2025?')
where id = '14f2fc91-6261-4907-9584-60db39cf3f65';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'bf9f9607-24b4-4109-bbb1-771492e75963' then jsonb_set(e, '{content}', to_jsonb('Apa tujuan kamus digital bahasa Gorontalo untuk siswa SD?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Ponsel untuk belajar, bukan hanya main', '## Apa tujuan kamus digital bahasa Gorontalo untuk siswa SD?')
where id = '805ee1ee-e157-4662-902e-7488e807013e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ce0903a9-bad0-4390-b2b4-cff537b99abc' then jsonb_set(e, '{content}', to_jsonb('Kosakata apa saja yang dipelajari siswa?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Belajar bahasa Gorontalo dari kosakata sehari-hari', '## Kosakata apa saja yang dipelajari siswa?')
where id = '805ee1ee-e157-4662-902e-7488e807013e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '957b9b8e-137a-4366-a7e1-91000330e645' then jsonb_set(e, '{content}', to_jsonb('Kapan Gerakan Pangan Murah digelar?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Gerakan Pangan Murah', '## Kapan Gerakan Pangan Murah digelar?')
where id = 'a83d70c9-1b54-41d7-b7a4-ec8d97faf6ab';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '67fc7120-e814-4634-84bd-8c292ddcf3db' then jsonb_set(e, '{content}', to_jsonb('Kenapa Bazar Ramadan BI layak dikunjungi?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa perlu mampir', '## Kenapa Bazar Ramadan BI layak dikunjungi?')
where id = 'a83d70c9-1b54-41d7-b7a4-ec8d97faf6ab';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4cf1fc25-8de4-4467-a7b6-86bb842eed62' then jsonb_set(e, '{content}', to_jsonb('Bagaimana Dubes Australia disambut di Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Disambut adat Mopotilolo', '## Bagaimana Dubes Australia disambut di Gorontalo?')
where id = '4a3efd2c-380e-4947-9c65-db65e803eb9c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '94c44973-0f10-40c7-8474-a38818b0a97a' then jsonb_set(e, '{content}', to_jsonb('Apa visi pembangunan Gorontalo yang dipaparkan Gusnar?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Gusnar Ismail paparkan visi Gorontalo', '## Apa visi pembangunan Gorontalo yang dipaparkan Gusnar?')
where id = '4a3efd2c-380e-4947-9c65-db65e803eb9c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '31f1fbc0-be52-4d41-b59d-b5233530b561' then jsonb_set(e, '{content}', to_jsonb('Maskapai apa saja yang melayani rute ke Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Baru empat maskapai', '## Maskapai apa saja yang melayani rute ke Gorontalo?')
where id = '0af1edd6-8c95-4e5c-967f-57a0ee41fa53';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9279806e-b758-458c-9c61-4031dfe16aa3' then jsonb_set(e, '{content}', to_jsonb('Bagaimana tanggapan AirAsia soal rute Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## AirAsia lihat potensi Gorontalo', '## Bagaimana tanggapan AirAsia soal rute Gorontalo?')
where id = '0af1edd6-8c95-4e5c-967f-57a0ee41fa53';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '90834ad9-179f-4c0a-afbf-1c3c475a15e8' then jsonb_set(e, '{content}', to_jsonb('Dari mana saja jemaah Kloter 30 UPG?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Profil jemaah Kloter 30 UPG', '## Dari mana saja jemaah Kloter 30 UPG?')
where id = 'c46f2f2e-a7df-4d11-acbe-67a5ef83aa52';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6265a30b-0b2d-438e-ab4e-3126fff11554' then jsonb_set(e, '{content}', to_jsonb('Kenapa status embarkasi haji penuh penting bagi Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa status embarkasi penting', '## Kenapa status embarkasi haji penuh penting bagi Gorontalo?')
where id = 'c46f2f2e-a7df-4d11-acbe-67a5ef83aa52';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'aec72e27-65b5-4a80-b936-4c984b1d03f7' then jsonb_set(e, '{content}', to_jsonb('Apa makna pisang dan kacang di Festival Qunut?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Makna pisang dan kacang di Festival Qunut', '## Apa makna pisang dan kacang di Festival Qunut?')
where id = '865bb8bc-1d4e-41d9-803a-93a4f54f36e4';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '58c2279c-c554-4064-b7b6-cf5a767b9cf9' then jsonb_set(e, '{content}', to_jsonb('Seberapa besar dampak Festival Qunut bagi UMKM?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## UMKM naik dua kali lipat', '## Seberapa besar dampak Festival Qunut bagi UMKM?')
where id = '865bb8bc-1d4e-41d9-803a-93a4f54f36e4';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '87ee8b4f-bca9-4c75-a6f7-34d44e875c2c' then jsonb_set(e, '{content}', to_jsonb('Kenapa anak muda mulai jauh dari adat?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Generasi muda mulai jauh dari adat', '## Kenapa anak muda mulai jauh dari adat?')
where id = '488a4371-d466-4473-88d5-8bbe48c20b06';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b9b85edd-efb4-4b1a-b49d-030e68aa82de' then jsonb_set(e, '{content}', to_jsonb('Bagaimana cara sederhana menghidupkan bahasa daerah?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Mulai dari hal kecil', '## Bagaimana cara sederhana menghidupkan bahasa daerah?')
where id = '488a4371-d466-4473-88d5-8bbe48c20b06';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c845d4aa-3c0d-4603-b5e8-77b48975ab11' then jsonb_set(e, '{content}', to_jsonb('Apa saja tiga nama jalan baru di Kota Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Daftar tiga nama jalan baru', '## Apa saja tiga nama jalan baru di Kota Gorontalo?')
where id = 'ebd5359d-4825-4504-814d-8abe26f667f9';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '65f36b38-e192-4c74-920f-34db87fec857' then jsonb_set(e, '{content}', to_jsonb('Siapa Ajoeba Wartabone?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Jalan Ajoeba Wartabone paling disorot', '## Siapa Ajoeba Wartabone?')
where id = 'ebd5359d-4825-4504-814d-8abe26f667f9';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '77dbbbff-1b1e-44d9-a968-71dd8ed50ce7' then jsonb_set(e, '{content}', to_jsonb('Minuman apa yang menemani Mujair Bilentango?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Ditemani dua minuman spesial', '## Minuman apa yang menemani Mujair Bilentango?')
where id = '89649601-3c6a-4cce-9c4f-c493365a2c90';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4bed4be8-2eab-4d7a-81ec-4a3263bf81a4' then jsonb_set(e, '{content}', to_jsonb('Bagaimana awal mula Limboto Coffee Street?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Awal mula Limboto Coffee Street', '## Bagaimana awal mula Limboto Coffee Street?')
where id = '1297f847-2c4e-4e0f-b933-9dfab5df6e66';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '605d28c3-76a6-4cf1-b635-798178661912' then jsonb_set(e, '{content}', to_jsonb('Siapa saja pedagang di Limboto Coffee Street?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dari gabut jadi cuan', '## Siapa saja pedagang di Limboto Coffee Street?')
where id = '1297f847-2c4e-4e0f-b933-9dfab5df6e66';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '5e6a296b-40eb-437c-b0ad-bc751f0c3942' then jsonb_set(e, '{content}', to_jsonb('Di mana saja Green Tumbilotohe 2025 digelar?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Digelar serentak di enam daerah', '## Di mana saja Green Tumbilotohe 2025 digelar?')
where id = 'eb0351a7-797d-4a37-ab10-45d7a0ad158d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c7f80143-8d97-4503-9fa1-e8c9d286c58e' then jsonb_set(e, '{content}', to_jsonb('Apa yang dibutuhkan untuk jadi Duta Bahasa?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Duta Bahasa bukan soal penampilan', '## Apa yang dibutuhkan untuk jadi Duta Bahasa?')
where id = '26bf6892-d2c4-49ef-ac21-82694dc60c62';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '00ddf682-b115-4083-a596-033ad17a2029' then jsonb_set(e, '{content}', to_jsonb('Berapa peserta UNG Half Marathon 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Peserta UNG Half Marathon 2025', '## Berapa peserta UNG Half Marathon 2025?')
where id = 'ce580312-1770-4e18-ad7d-31f779748b96';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '52d4c269-b691-4c93-83c0-2c05222f68dc' then jsonb_set(e, '{content}', to_jsonb('Bagaimana realisasi anggaran dibanding tahun lalu?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Lebih baik dari tahun lalu', '## Bagaimana realisasi anggaran dibanding tahun lalu?')
where id = '62b6eb59-9704-48fd-8fa3-7d3f1ceaad13';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '5df2fbb7-ddb3-4e67-85ca-3023d9f960cf' then jsonb_set(e, '{content}', to_jsonb('Apa masalah aset setelah penggabungan OPD?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Masalah aset pascamerger OPD', '## Apa masalah aset setelah penggabungan OPD?')
where id = '62b6eb59-9704-48fd-8fa3-7d3f1ceaad13';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '0a8eb6f0-6fda-4953-93b0-dacd2c9433e8' then jsonb_set(e, '{content}', to_jsonb('Kenapa realisasi anggaran di awal tahun penting?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa realisasi awal tahun penting', '## Kenapa realisasi anggaran di awal tahun penting?')
where id = '62b6eb59-9704-48fd-8fa3-7d3f1ceaad13';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3e34d9a5-d06a-4590-aa46-7c3947da65e8' then jsonb_set(e, '{content}', to_jsonb('Apa pesan Gusnar Ismail untuk jemaah haji ASN?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pesan Gusnar Ismail: siapkan mental', '## Apa pesan Gusnar Ismail untuk jemaah haji ASN?')
where id = '4fcd718d-a495-42ae-a42d-3e95c00cb374';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '55cc45a7-587d-498d-a044-451f6b7d689d' then jsonb_set(e, '{content}', to_jsonb('Berapa jemaah haji Gorontalo tahun 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Jadwal keberangkatan haji 2026', '## Berapa jemaah haji Gorontalo tahun 2026?')
where id = '4fcd718d-a495-42ae-a42d-3e95c00cb374';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '65c5d139-8403-4052-9d06-5c91027f3d93' then jsonb_set(e, '{content}', to_jsonb('Apa saja materi edukasi ekonomi syariah untuk santri?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Santri tanya soal bank syariah dan koin Rp200', '## Apa saja materi edukasi ekonomi syariah untuk santri?')
where id = '0c64d309-b63c-41f1-b1bd-fb7d1d032a9e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2de6d7d9-8e8a-4c9c-ae8a-3a9c4816e043' then jsonb_set(e, '{content}', to_jsonb('Pesantren mana saja yang ikut hadir?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tiga pesantren ikut hadir', '## Pesantren mana saja yang ikut hadir?')
where id = '0c64d309-b63c-41f1-b1bd-fb7d1d032a9e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2529b270-0548-44c7-8ab0-6bd7dcc9dfb7' then jsonb_set(e, '{content}', to_jsonb('Berapa UMKM yang ikut HACF 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## 139 UMKM ikut HACF 2025', '## Berapa UMKM yang ikut HACF 2025?')
where id = '37dfaac7-8aeb-420e-9ca7-8310bad081d2';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '5c059c94-bff2-4367-872e-e94878eff911' then jsonb_set(e, '{content}', to_jsonb('Apa saja rangkaian acara HACF 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rangkaian acara HACF 2025', '## Apa saja rangkaian acara HACF 2025?')
where id = '37dfaac7-8aeb-420e-9ca7-8310bad081d2';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '36a41978-67b7-4977-baaf-a3192c9c1ade' then jsonb_set(e, '{content}', to_jsonb('Bagaimana berbelanja tanpa uang tunai di Green Tumbilotohe?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Belanja tanpa uang tunai', '## Bagaimana berbelanja tanpa uang tunai di Green Tumbilotohe?')
where id = 'a67ff7a2-e18e-4786-9c5c-1a860924d672';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '0a2a0540-d024-4695-bafa-8db5eabf66e3' then jsonb_set(e, '{content}', to_jsonb('Produk UMKM Gorontalo apa saja yang sudah diekspor?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Produk UMKM Gorontalo yang sudah diekspor', '## Produk UMKM Gorontalo apa saja yang sudah diekspor?')
where id = '72154c1a-d76b-4b05-88ee-86dd2bac6600';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'de4da492-d0b8-49ae-8df4-8f8b4e79d6fb' then jsonb_set(e, '{content}', to_jsonb('Bagaimana BI mengelompokkan UMKM binaan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Empat kategori UMKM binaan BI', '## Bagaimana BI mengelompokkan UMKM binaan?')
where id = '72154c1a-d76b-4b05-88ee-86dd2bac6600';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'abf7757b-b5c7-49d1-9a4a-47645a0f52c0' then jsonb_set(e, '{content}', to_jsonb('Bagaimana rute baru sistem satu arah?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rute baru sistem satu arah', '## Bagaimana rute baru sistem satu arah?')
where id = '9b485863-63d2-4edb-9a4f-7d248a9bd1c7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '91f85bbc-b567-487c-be1e-73800097eda8' then jsonb_set(e, '{content}', to_jsonb('Di mana kendaraan harus parkir saat satu arah berlaku?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Parkir di sisi kiri', '## Di mana kendaraan harus parkir saat satu arah berlaku?')
where id = '9b485863-63d2-4edb-9a4f-7d248a9bd1c7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'fde9b52c-ecbb-4c81-9d72-b0ad5b4d7cf0' then jsonb_set(e, '{content}', to_jsonb('Apa pesan Wagub Idah untuk pelaku UMKM?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pesan Wagub untuk pelaku UMKM', '## Apa pesan Wagub Idah untuk pelaku UMKM?')
where id = 'b2c4d44a-9c9f-4eae-933f-ed8a0749d418';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '8eb5e6fc-eaac-4a17-9771-7a677282d3e4' then jsonb_set(e, '{content}', to_jsonb('Apa manfaat Bazar Ramadan BI untuk warga?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Manfaat untuk warga', '## Apa manfaat Bazar Ramadan BI untuk warga?')
where id = 'b2c4d44a-9c9f-4eae-933f-ed8a0749d418';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '218cb100-9342-465d-8b69-c367a7cdb3f0' then jsonb_set(e, '{content}', to_jsonb('Apa itu metode spider reef untuk terumbu karang Botutonuo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Terumbu karang Botutonuo dan metode spider reef', '## Apa itu metode spider reef untuk terumbu karang Botutonuo?')
where id = '2fcb3ee9-cfc3-44ea-bba3-fe673c056e57';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'cdee34ee-7c11-4d57-8352-e96b43c9b3bc' then jsonb_set(e, '{content}', to_jsonb('Siapa Alinton Pisuna?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Alinton Pisuna, local hero dari pesisir', '## Siapa Alinton Pisuna?')
where id = '2fcb3ee9-cfc3-44ea-bba3-fe673c056e57';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '712f14e6-499e-46dd-9671-84f28e2eb633' then jsonb_set(e, '{content}', to_jsonb('Apa kesamaan Jusuf Kalla dan Rachmat Gobel?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Sama-sama pengusaha dan politisi', '## Apa kesamaan Jusuf Kalla dan Rachmat Gobel?')
where id = '5bfab256-0cad-4b6a-803f-f500564d3e9b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '4cd13e06-8475-44ee-bce4-906759ac4ae4' then jsonb_set(e, '{content}', to_jsonb('Lomba apa saja di Festival Ketupat Jaton 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Karapan roda sapi dan dua lomba lainnya', '## Lomba apa saja di Festival Ketupat Jaton 2025?')
where id = '2fecf243-70a0-4bef-bc91-5c563e8bb7ac';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ef40e691-e27e-4c19-960c-6c1ddefc973c' then jsonb_set(e, '{content}', to_jsonb('Apa harapan panitia untuk Festival Ketupat Jaton?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Harapan jadi agenda tahunan', '## Apa harapan panitia untuk Festival Ketupat Jaton?')
where id = '2fecf243-70a0-4bef-bc91-5c563e8bb7ac';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'da4b07a6-f8bf-480a-b4a0-5d192797dfab' then jsonb_set(e, '{content}', to_jsonb('Sejak kapan Waduk Bulango Ulu dibangun?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Fakta Waduk Bulango Ulu', '## Sejak kapan Waduk Bulango Ulu dibangun?')
where id = 'af863c5d-226f-4e1e-8fff-8acb08c59617';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '18749322-0aa6-4e5c-8640-bab9d78d3569' then jsonb_set(e, '{content}', to_jsonb('Apa arti anggaran yang masih dibintangi?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Anggaran masih dibintangi', '## Apa arti anggaran yang masih dibintangi?')
where id = 'af863c5d-226f-4e1e-8fff-8acb08c59617';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ee5b7288-0cd5-4730-b50b-ce8874f7f842' then jsonb_set(e, '{content}', to_jsonb('Sudah sejauh mana persiapan PENAS KTNA XVII?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Persiapan PENAS KTNA sudah 90 persen', '## Sudah sejauh mana persiapan PENAS KTNA XVII?')
where id = 'd0a8ba48-59df-4c11-a2cb-8100b9e5bfec';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f1bfbc13-246a-412d-97f2-849cecec0ab8' then jsonb_set(e, '{content}', to_jsonb('Apa saja yang dibenahi di Pentadio Resort?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Wajah baru Pentadio Resort', '## Apa saja yang dibenahi di Pentadio Resort?')
where id = 'd0a8ba48-59df-4c11-a2cb-8100b9e5bfec';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '64690da1-57a8-4964-8021-7d06bc395687' then jsonb_set(e, '{content}', to_jsonb('Apa dasar pengangkatan 39 pejabat fungsional?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tiga jalur pengangkatan', '## Apa dasar pengangkatan 39 pejabat fungsional?')
where id = 'db6cd997-843c-4591-9dbd-ca4841f8dd12';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '074ee4c8-6e84-4e94-8f80-7a207286d503' then jsonb_set(e, '{content}', to_jsonb('Apa tiga hal yang harus dikuasai pejabat fungsional?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Teori, regulasi, dan responsif', '## Apa tiga hal yang harus dikuasai pejabat fungsional?')
where id = 'db6cd997-843c-4591-9dbd-ca4841f8dd12';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b3fc681f-8199-40b5-a212-7b9a660908b8' then jsonb_set(e, '{content}', to_jsonb('Apa catatan Komisi I soal anggaran KIP dan KPID?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Catatan soal anggaran KIP dan KPID', '## Apa catatan Komisi I soal anggaran KIP dan KPID?')
where id = 'e4f7cdc6-101c-4155-bc2a-6d64631f710d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '15a0b0df-4219-4cfb-9572-f7a469039a5f' then jsonb_set(e, '{content}', to_jsonb('Apa isi edaran Pemkot Gorontalo soal malam tahun baru?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Edaran Pemkot Gorontalo', '## Apa isi edaran Pemkot Gorontalo soal malam tahun baru?')
where id = 'c2988b96-9241-4bc5-99c7-0cdd7465392d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'bbb86753-e8bc-4620-9eca-9c796d01dbea' then jsonb_set(e, '{content}', to_jsonb('Berapa harga rumput laut di Ilodulunga sekarang?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dari Rp39.000 ke Rp10.000', '## Berapa harga rumput laut di Ilodulunga sekarang?')
where id = 'df43330e-3556-4fc2-be43-8439cbb2ef42';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'adeff200-674f-4d5a-b7a2-866bb3d1fa56' then jsonb_set(e, '{content}', to_jsonb('Kenapa warga Ilodulunga meminta pemecah ombak baru?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pemecah ombak rusak', '## Kenapa warga Ilodulunga meminta pemecah ombak baru?')
where id = 'df43330e-3556-4fc2-be43-8439cbb2ef42';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '463e2a3e-205b-4280-9503-09d2ac4fd53a' then jsonb_set(e, '{content}', to_jsonb('Bagaimana perkembangan RSAS setelah satu abad?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Satu abad RSAS, layanan makin lengkap', '## Bagaimana perkembangan RSAS setelah satu abad?')
where id = 'ea2d3520-9214-4d45-8f64-385fa3f4461c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '5e2a2fa0-f7df-493d-b26c-59f151b0692d' then jsonb_set(e, '{content}', to_jsonb('Berapa kali RSAS meraih akreditasi paripurna?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tiga kali akreditasi paripurna', '## Berapa kali RSAS meraih akreditasi paripurna?')
where id = 'ea2d3520-9214-4d45-8f64-385fa3f4461c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9cdb1f42-17f4-4f5a-83fd-bd8200337f7e' then jsonb_set(e, '{content}', to_jsonb('Kenapa maskapai menambah extra flight jelang PENAS?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Enam extra flight jelang PENAS XVII', '## Kenapa maskapai menambah extra flight jelang PENAS?')
where id = '5821ab13-4bc6-49e6-bf47-a7e315d209a0';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ac3e2513-4402-4095-8a37-edfb59865411' then jsonb_set(e, '{content}', to_jsonb('Apakah Bandara Djalaludin siap beroperasi 24 jam?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Bandara siap 24 jam', '## Apakah Bandara Djalaludin siap beroperasi 24 jam?')
where id = '5821ab13-4bc6-49e6-bf47-a7e315d209a0';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '605c8ae3-abba-4f6e-a2eb-907d5ebc2df9' then jsonb_set(e, '{content}', to_jsonb('Apa bahan dodol khas Lebaran Ketupat?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Bahan dodol khas Lebaran Ketupat', '## Apa bahan dodol khas Lebaran Ketupat?')
where id = '10d86f57-5ac6-48fb-a555-c9741e0614a1';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'fc208f36-db46-4bf0-bcdc-88fe81dcee68' then jsonb_set(e, '{content}', to_jsonb('Berapa lama dodol Lebaran Ketupat dimasak?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dimasak 7–8 jam', '## Berapa lama dodol Lebaran Ketupat dimasak?')
where id = '10d86f57-5ac6-48fb-a555-c9741e0614a1';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'd77ebf79-4b37-40f3-aa97-e2a768a7cc8e' then jsonb_set(e, '{content}', to_jsonb('Di mana Natalius Pigai disambut Mopotilolo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Mopotilolo di rumah jabatan', '## Di mana Natalius Pigai disambut Mopotilolo?')
where id = '54fd7dc9-f825-4329-9968-5376d271bc3d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ed685d94-3976-449a-9312-c13eaca6b02b' then jsonb_set(e, '{content}', to_jsonb('Kenapa penguatan HAM untuk 5.000 warga penting?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa penguatan HAM penting', '## Kenapa penguatan HAM untuk 5.000 warga penting?')
where id = '54fd7dc9-f825-4329-9968-5376d271bc3d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'ce972c2a-ecc0-4cde-8fdb-332fb79858a5' then jsonb_set(e, '{content}', to_jsonb('Apa pesan Rachmat Gobel untuk kader NasDem?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Pesan Rachmat Gobel: stop inflasi kata-kata', '## Apa pesan Rachmat Gobel untuk kader NasDem?')
where id = 'ce94909c-b83d-4f65-bfce-09fae45b09c1';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'e8c1fe45-2367-41ab-8b50-fdd5e38bf0e9' then jsonb_set(e, '{content}', to_jsonb('Apa tema Rakerwil NasDem Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tema “Membangun dari Desa”', '## Apa tema Rakerwil NasDem Gorontalo?')
where id = 'ce94909c-b83d-4f65-bfce-09fae45b09c1';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '60f3fe47-502c-424e-9b37-4596c8051bd1' then jsonb_set(e, '{content}', to_jsonb('Kategori apa saja di Lifestyle Run Fest 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kategori dan pelepasan peserta Lifestyle Run Fest 2026', '## Kategori apa saja di Lifestyle Run Fest 2026?')
where id = '2371c9af-2aa0-4635-b62d-8b334c559a8d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2e5b088f-0d85-4a42-9a6c-fd0defdd0526' then jsonb_set(e, '{content}', to_jsonb('Berapa UMKM yang ikut Pesona Serligo 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Angka-angka Pesona Serligo 2026', '## Berapa UMKM yang ikut Pesona Serligo 2026?')
where id = '53e1e169-a697-4415-be50-d7cd000b46b0';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '9199abd3-550e-4222-9cb6-be69505490fa' then jsonb_set(e, '{content}', to_jsonb('Berapa nilai business matching Pesona Serligo 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Business matching Rp3,69 miliar', '## Berapa nilai business matching Pesona Serligo 2026?')
where id = '53e1e169-a697-4415-be50-d7cd000b46b0';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '633cceab-106e-486e-a1f8-681e1f027418' then jsonb_set(e, '{content}', to_jsonb('Bagaimana karier Irwan Hamzah di birokrasi?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Karier Irwan Hamzah di birokrasi', '## Bagaimana karier Irwan Hamzah di birokrasi?')
where id = '319ed84b-64ba-4aa8-afa6-dcc714b1171a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'b5313a55-cfa9-48b8-b12a-818485815e17' then jsonb_set(e, '{content}', to_jsonb('Apa kiprah Irwan Hamzah di bidang budaya?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Penjaga budaya dan pelantun “Dunia Dipo Kiama”', '## Apa kiprah Irwan Hamzah di bidang budaya?')
where id = '319ed84b-64ba-4aa8-afa6-dcc714b1171a';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'aed66e53-e140-4c72-aeca-f0d72d082739' then jsonb_set(e, '{content}', to_jsonb('Siapa saja yang memakai upiah karanji di PENAS?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Upiah karanji dan seragam Karawo', '## Siapa saja yang memakai upiah karanji di PENAS?')
where id = '68c6609d-540a-4cb6-a235-19500914483c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '215bba35-0854-4742-933f-85b0bd02e907' then jsonb_set(e, '{content}', to_jsonb('Dari apa upiah karanji dibuat?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenali kerajinan lokal', '## Dari apa upiah karanji dibuat?')
where id = '68c6609d-540a-4cb6-a235-19500914483c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '5966701c-3180-4c76-876a-61b6905d9ac3' then jsonb_set(e, '{content}', to_jsonb('Apa pesan Wagub Idah soal kerukunan umat?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kerukunan umat sebagai modal sosial', '## Apa pesan Wagub Idah soal kerukunan umat?')
where id = '09daca42-1955-49bb-a627-e755a6d99c3c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '943f305e-73c6-411b-84e8-fa5db5dc8381' then jsonb_set(e, '{content}', to_jsonb('Apa peran gereja menurut Pemprov Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Gereja sebagai mitra pembinaan karakter', '## Apa peran gereja menurut Pemprov Gorontalo?')
where id = '09daca42-1955-49bb-a627-e755a6d99c3c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '5287814b-3e2c-437b-8c5b-583c827fcf95' then jsonb_set(e, '{content}', to_jsonb('Apa itu Tonggeyamo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tonggeyamo sejak zaman kerajaan', '## Apa itu Tonggeyamo?')
where id = '3fb54728-716d-4b2b-a7ab-073443e0103c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'e1945ee3-f35e-47ad-ac48-0ec4d06d61f6' then jsonb_set(e, '{content}', to_jsonb('Apa dasar penetapan awal Ramadan 1447 H?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dasar penetapan awal Ramadan', '## Apa dasar penetapan awal Ramadan 1447 H?')
where id = '3fb54728-716d-4b2b-a7ab-073443e0103c';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c4e4aa38-bf74-4e50-b3b6-02351d5709c2' then jsonb_set(e, '{content}', to_jsonb('Apa tujuh kebiasaan anak hebat?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Tujuh kebiasaan anak hebat', '## Apa tujuh kebiasaan anak hebat?')
where id = 'b832c714-df7f-4d30-9738-05c1a0f55e81';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '74024551-3f32-4ecc-a460-eda6529e730b' then jsonb_set(e, '{content}', to_jsonb('Kenapa kuliner lokal perlu dikenalkan sejak kecil?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenalkan kuliner lokal sejak kecil', '## Kenapa kuliner lokal perlu dikenalkan sejak kecil?')
where id = 'b832c714-df7f-4d30-9738-05c1a0f55e81';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f446e96d-f9ac-4a10-aed1-c4f9aee8f1bd' then jsonb_set(e, '{content}', to_jsonb('Berapa peserta dan cabang MTQ Provinsi Gorontalo 2026?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## MTQ Provinsi Gorontalo 2026: 214 peserta, delapan cabang', '## Berapa peserta dan cabang MTQ Provinsi Gorontalo 2026?')
where id = '709642a3-43b6-444b-b079-764b7c62933b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '90499eab-b2c1-44fc-96b5-075747f77ae9' then jsonb_set(e, '{content}', to_jsonb('Apa langkah kafilah Gorontalo menuju MTQ Nasional?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Menuju NTT', '## Apa langkah kafilah Gorontalo menuju MTQ Nasional?')
where id = '709642a3-43b6-444b-b079-764b7c62933b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '379734a0-424f-476c-93be-a8ac88895134' then jsonb_set(e, '{content}', to_jsonb('Berapa rumah warga yang disiapkan untuk peserta PENAS?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Rumah warga jadi penginapan', '## Berapa rumah warga yang disiapkan untuk peserta PENAS?')
where id = '1efd4c87-6ba3-4af9-933b-908828091904';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'baa97b83-ffcb-468c-9a38-9ba864e7b19d' then jsonb_set(e, '{content}', to_jsonb('Bagaimana warga bisa memanfaatkan peluang PENAS?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Peluang yang bisa dimanfaatkan', '## Bagaimana warga bisa memanfaatkan peluang PENAS?')
where id = '1efd4c87-6ba3-4af9-933b-908828091904';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3b81eb38-4640-435f-af68-142373a1c03b' then jsonb_set(e, '{content}', to_jsonb('Siapa Mayjen TNI Mirza Agus?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Profil Mayjen TNI Mirza Agus', '## Siapa Mayjen TNI Mirza Agus?')
where id = '58e365f7-882a-41e4-a637-a8bad240b77b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'aba9be7c-df9e-450a-b935-e2e7c50a7786' then jsonb_set(e, '{content}', to_jsonb('Wilayah mana saja yang dibawahi Kodam XIII/Merdeka?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Peran Kodam XIII/Merdeka', '## Wilayah mana saja yang dibawahi Kodam XIII/Merdeka?')
where id = '58e365f7-882a-41e4-a637-a8bad240b77b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'a75ef693-3171-4876-9149-511c055900f8' then jsonb_set(e, '{content}', to_jsonb('Bagaimana indikator ekonomi Gorontalo Utara 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Indikator ekonomi Gorontalo Utara membaik', '## Bagaimana indikator ekonomi Gorontalo Utara 2025?')
where id = '3e61215c-e038-443c-95c8-c3d0af8a8c4e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '7e89f58a-4903-47df-904b-7c5b72572d55' then jsonb_set(e, '{content}', to_jsonb('Apa pekerjaan rumah Gorontalo Utara yang belum selesai?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## PR yang masih menunggu', '## Apa pekerjaan rumah Gorontalo Utara yang belum selesai?')
where id = '3e61215c-e038-443c-95c8-c3d0af8a8c4e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c52e5836-c0a0-4eea-b90a-063f18f349ff' then jsonb_set(e, '{content}', to_jsonb('Kenapa OPD ini dipilih jadi calon nominator EPSS?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa dua OPD ini dipilih', '## Kenapa OPD ini dipilih jadi calon nominator EPSS?')
where id = '6302291e-f51b-4e7b-a1ce-e2f25e8da7c9';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'df4a923e-0f0e-406c-9a59-d7d634eef0fc' then jsonb_set(e, '{content}', to_jsonb('Kenapa data statistik penting buat warga?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa data penting buat warga', '## Kenapa data statistik penting buat warga?')
where id = '6302291e-f51b-4e7b-a1ce-e2f25e8da7c9';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '2d47b7b5-9711-44f6-968b-b85ff93a7837' then jsonb_set(e, '{content}', to_jsonb('Bagaimana RKPD 2027 harus disusun?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## RKPD 2027 libatkan pegawai fungsional', '## Bagaimana RKPD 2027 harus disusun?')
where id = '1c287af8-d3c6-49e8-a638-1ac0048ffe73';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '68116fc5-b9d6-4f08-bacf-0b8a3bb7eb5e' then jsonb_set(e, '{content}', to_jsonb('Kenapa RKPD penting untuk warga?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa RKPD penting untuk warga', '## Kenapa RKPD penting untuk warga?')
where id = '1c287af8-d3c6-49e8-a638-1ac0048ffe73';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '5aaa9e45-d31b-4505-917b-1a556d34b841' then jsonb_set(e, '{content}', to_jsonb('Berapa warga yang bisa dilayani air minum Bendungan Bulango Ulu?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Air minum untuk 800 ribu orang', '## Berapa warga yang bisa dilayani air minum Bendungan Bulango Ulu?')
where id = '08f3a4d0-e36a-4627-82fc-67bb77c4762f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '78d1e894-3523-4cb8-9323-25c9de6cb932' then jsonb_set(e, '{content}', to_jsonb('Kenapa air minum dari Bulango Ulu jadi kabar besar?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa air minum jadi kabar besar', '## Kenapa air minum dari Bulango Ulu jadi kabar besar?')
where id = '08f3a4d0-e36a-4627-82fc-67bb77c4762f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '08bf1921-bde7-4b15-ae6e-dcf9205240a6' then jsonb_set(e, '{content}', to_jsonb('Kenapa Jalan Lakeya-Mohiyolo tidak bisa dikerjakan pada 2025?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Sempat terganjal aturan', '## Kenapa Jalan Lakeya-Mohiyolo tidak bisa dikerjakan pada 2025?')
where id = 'b268643a-bd32-4e8a-9d89-f769bed3db3b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'cc985506-8bd6-4153-a395-277c9fc9d05d' then jsonb_set(e, '{content}', to_jsonb('Berapa panjang jalan yang dikerjakan tahun ini?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Baru 797 meter', '## Berapa panjang jalan yang dikerjakan tahun ini?')
where id = 'b268643a-bd32-4e8a-9d89-f769bed3db3b';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '3bf11cb9-54e1-403e-a4b0-9b7625891eeb' then jsonb_set(e, '{content}', to_jsonb('Dokumen apa saja yang diserahkan ke Kemensos?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dokumen yang diserahkan', '## Dokumen apa saja yang diserahkan ke Kemensos?')
where id = '88c2fb46-7b3c-4642-a357-9575e123322f';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '6d627e2b-f68b-454f-89ac-e236d4953a54' then jsonb_set(e, '{content}', to_jsonb('Apa makna Emil Dardak menyanyikan Hulonthalo Lipu''u?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Lebih dari sekadar nyanyian', '## Apa makna Emil Dardak menyanyikan Hulonthalo Lipu''u?')
where id = '48106676-5ce7-43c0-927f-3e41ece0221e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '5e92c84d-6204-4ea7-90ae-758a7d64aea6' then jsonb_set(e, '{content}', to_jsonb('Kenapa momen ini penting bagi diaspora Gorontalo?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa momen ini viral-able', '## Kenapa momen ini penting bagi diaspora Gorontalo?')
where id = '48106676-5ce7-43c0-927f-3e41ece0221e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '0e8b2556-fc59-49c9-8204-de1e1bc170a2' then jsonb_set(e, '{content}', to_jsonb('Kapan pertemuan terakhir Gusnar dan Rachmat Gobel?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Disiplin sampai pesawat terbang', '## Kapan pertemuan terakhir Gusnar dan Rachmat Gobel?')
where id = '9b10afc4-a844-4ee0-bc1a-cc3c129ab623';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'bd203dd6-8986-46e6-9800-5ffd61e65999' then jsonb_set(e, '{content}', to_jsonb('Apa isi telepon empat hari sebelum Rachmat Gobel wafat?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Telepon empat hari sebelum wafat', '## Apa isi telepon empat hari sebelum Rachmat Gobel wafat?')
where id = '9b10afc4-a844-4ee0-bc1a-cc3c129ab623';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '0c5cf36b-3253-4a8e-807c-d7f78805c64d' then jsonb_set(e, '{content}', to_jsonb('Berapa luas lahan bantuan benih dari Kementan?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Gusnar Ismail bawa bantuan benih 16.000 hektare', '## Berapa luas lahan bantuan benih dari Kementan?')
where id = '1f9f08ff-1fa4-4f41-9a6c-cec9f385ed9e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'bc32f4da-953f-4aaa-8513-4caf3015509e' then jsonb_set(e, '{content}', to_jsonb('Apa empat agenda agro-maritim Gusnar Ismail?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Empat agenda agro-maritim', '## Apa empat agenda agro-maritim Gusnar Ismail?')
where id = '1f9f08ff-1fa4-4f41-9a6c-cec9f385ed9e';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'f446ee0c-2142-43fe-8734-bc6328bf2add' then jsonb_set(e, '{content}', to_jsonb('OPD mana yang belum mencapai target?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Dua OPD belum capai target', '## OPD mana yang belum mencapai target?')
where id = 'bf897e72-9788-4a23-8fe7-99cc891f31b7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '06d7afc8-bcb2-47e3-868f-facf6768b472' then jsonb_set(e, '{content}', to_jsonb('Kenapa SMA Pinogu penting?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Kenapa SMA Pinogu penting', '## Kenapa SMA Pinogu penting?')
where id = 'bf897e72-9788-4a23-8fe7-99cc891f31b7';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = 'c00a5667-aae9-4a59-9032-b684e09d0de3' then jsonb_set(e, '{content}', to_jsonb('Dari mana bantuan implan koklea ini berasal?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Hasil kerja sama dengan swasta', '## Dari mana bantuan implan koklea ini berasal?')
where id = 'e595368b-9b39-450a-abc7-110769d5084d';
update public.articles set
  blocks = (select jsonb_agg(case when e->>'id' = '1998dacf-9fb1-46af-bde7-aa6a5dbe09b1' then jsonb_set(e, '{content}', to_jsonb('Apa tantangan lain dalam penanganan gangguan pendengaran?'::text)) else e end order by ord)
            from jsonb_array_elements(blocks) with ordinality as t(e, ord)),
  content = replace(content, '## Keluarga masih ragu', '## Apa tantangan lain dalam penanganan gangguan pendengaran?')
where id = 'e595368b-9b39-450a-abc7-110769d5084d';
alter table public.articles enable trigger articles_updated_at;
