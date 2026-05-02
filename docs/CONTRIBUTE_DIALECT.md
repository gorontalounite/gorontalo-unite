# Panduan Kontribusi Bahasa & Dialek Gorontalo

> Bantu AI kami berbicara seperti orang Gorontalo sungguhan! 🌿

---

## Mengapa Ini Penting?

AI Gorontalo Unite harus bisa:
1. **Memahami** pertanyaan yang ditulis dalam dialek atau bahasa Gorontalo
2. **Merespons** dengan gaya bahasa yang terasa akrab bagi masyarakat Gorontalo
3. **Menggunakan** kosakata dan ungkapan lokal yang tepat konteks
4. **Tidak salah tafsir** ekspresi khas Gorontalo sebagai bahasa Indonesia biasa

Tanpa data dari penutur asli, AI hanya bisa menebak-nebak. **Kamu yang tahu, kamu yang mengajarkan.**

---

## Jenis Kontribusi

### 1. 📚 Kosakata (Kamus Hulontalo–Indonesia)

Format yang kami butuhkan:

```
kata_gorontalo | arti_indonesia | catatan/konteks
```

**Contoh:**
```
wawu          | dan, juga            | digunakan di akhir kalimat untuk penekanan
otahuta       | mau ke mana          | sering disingkat jadi "otahu"
mopiyohu      | baik-baik saja       | jawaban umum untuk "apa kabar"
bo'o          | kamu / kau           | informal, hanya digunakan kepada teman sebaya
tete          | kakek                | panggilan sayang untuk kakek
nene          | nenek                | panggilan sayang untuk nenek
mohutu        | memasak              | kata kerja
pohutu        | acara / upacara      | bisa formal maupun informal
hulontalo     | Gorontalo            | nama asli dalam bahasa daerah
```

**Yang kami butuhkan:**
- Kata benda (nama benda, tempat, orang)
- Kata kerja (aktivitas sehari-hari)
- Kata sifat (deskripsi)
- Kata tanya (di mana, kapan, siapa, dll)
- Sapaan dan salam
- Ekspresi emosi (senang, marah, kaget, dll)
- Kata gaul / slang anak muda Gorontalo

---

### 2. 💬 Contoh Percakapan

Format percakapan yang berguna untuk AI:

```markdown
## Konteks
[Deskripsi situasi: siapa yang bicara, di mana, suasana formal/santai]

## Percakapan

A: [teks dalam dialek/bahasa Gorontalo]
   (terjemahan: [arti dalam Indonesia])

B: [teks balasan]
   (terjemahan: [arti dalam Indonesia])

## Catatan
[Penjelasan ekspresi khusus, nada, atau konteks budaya yang perlu diketahui]
```

**Contoh Percakapan:**
```markdown
## Konteks
Dua teman lama bertemu di pasar, sapaan santai.

## Percakapan

A: "Wonu bo'o lo ito, Paulo?"
   (terjemahan: "Mau ke mana kamu, Paulo?")

B: "Mao moli binte. Binte lo ami woluwo mao."
   (terjemahan: "Mau beli jagung. Jagung kami sudah habis.")

A: "Eeeh, olo woluwo ami, mo'oto mao."
   (terjemahan: "Eeeh, kalau ada, nanti saya kasih.")

## Catatan
- "binte" = jagung (kata khas Gorontalo, jagung adalah makanan pokok)
- "woluwo mao" = sudah tidak ada / sudah habis
- "olo" digunakan sebagai kata penghubung kondisional
- Nada ramah dan santai, ekspresi "Eeeh" menunjukkan antusiasme/empati
```

---

### 3. 🔄 Pasangan Terjemahan (untuk Fine-tuning)

Format khusus untuk melatih AI memahami dialek:

```
[INPUT - cara orang Gorontalo menulis/berbicara]
[OUTPUT - apa yang sebenarnya dimaksud]
```

**Contoh:**

| Input (Dialek Gorontalo) | Makna Sebenarnya |
|---|---|
| "AI, otahuta ito?" | "AI, mau ke mana kamu?" atau "AI, kamu bisa apa?" |
| "Ceritakan tentang binte biluhuta dong" | Pertanyaan tentang kuliner khas Gorontalo (binte biluhuta = milu siram) |
| "Di mana makan enak di Kota?" | "Di mana makan enak di Kota Gorontalo?" |
| "Hulontalo tuh gimana sih?" | Pertanyaan umum tentang Gorontalo |
| "Saya orang Bone" | Orang dari Kabupaten Bone Bolango, Gorontalo (bukan Bone Sulsel) |

---

### 4. 📝 Peribahasa & Ungkapan Adat

```markdown
## Ungkapan
"[teks dalam bahasa Gorontalo]"

## Transliterasi
"[cara baca / romanisasi]"

## Terjemahan Harfiah
"[terjemahan kata per kata]"

## Makna
[Makna sebenarnya dan konteks penggunaannya]

## Digunakan Ketika
[Situasi di mana ungkapan ini biasa diucapkan]
```

---

### 5. 🎙️ Koreksi AI

Pernah tanya sesuatu ke AI Gorontalo Unite dan jawabannya salah atau aneh? Laporkan!

```markdown
## Yang Saya Tanyakan
[Pertanyaan atau kalimat yang ditulis]

## Jawaban AI (Salah)
[Apa yang AI jawab]

## Jawaban yang Benar
[Apa yang seharusnya AI jawab]

## Mengapa Salah?
[Penjelasan: AI salah paham kata/ekspresi apa?]
```

---

## Cara Mengirim Kontribusi

### Cara Termudah: GitHub Issue
1. Buka tab **Issues**
2. Klik **New Issue**
3. Pilih template **"🗣️ Kontribusi Bahasa & Dialek Gorontalo"**
4. Tempel data kamu di kolom yang tersedia

### Cara Massal: Pull Request
Kalau punya banyak kosakata (100+), buat file CSV:

```csv
kata_gorontalo,arti_indonesia,kategori,daerah,catatan
wawu,dan juga,konjungsi,umum,digunakan di akhir kalimat
otahuta,mau ke mana,frasa tanya,umum,bisa disingkat otahu
```

Upload file ke `data/dialect/kosakata-[namamu]-[bulan-tahun].csv`

---

## Struktur Data yang Sudah Ada

```
data/
├── knowledge/          ← Data RAG (fakta tentang Gorontalo)
│   ├── wisata/
│   ├── kuliner/
│   ├── budaya/
│   └── sejarah/
└── dialect/            ← Data bahasa & dialek
    ├── kosakata.csv    ← Kamus utama
    ├── percakapan/     ← Contoh dialog
    ├── peribahasa.md   ← Ungkapan & peribahasa
    └── koreksi-ai/     ← Laporan salah jawab AI
```

*(Folder ini akan dibuat saat kontribusi pertama masuk)*

---

## Panduan Transliterasi Bahasa Gorontalo

Untuk membantu konsistensi penulisan:

| Bunyi | Transliterasi | Contoh |
|---|---|---|
| Vokal panjang | ditulis dobel | `aa`, `ii`, `uu` |
| Glottal stop | apostrof `'` | `bo'o` (kamu) |
| Ng velar | `ng` | `ngango` (mulut) |
| Palatalisasi | `y` | `yilahe` (Allah) |

*Jika tidak yakin cara penulisan, tuliskan saja sesuai cara kamu biasa menulisnya — tim kami akan menstandarkan.*

---

## Daftar Kontributor Bahasa

Kontributor yang mengirim 10+ item kosakata atau 5+ percakapan akan dicantumkan di:
- Halaman `/about` website
- File `CONTRIBUTORS.md` di repository
- Credit di model AI (future)

---

*Ada pertanyaan? Buka [GitHub Discussions](https://github.com/gorontalounite/gorontalo-unite/discussions) atau tag maintainer di Issue.*
