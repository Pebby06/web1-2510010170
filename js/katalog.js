// ========================================================= 
// katalog.js  Modul 3: menampilkan katalog dengan DOM 
// Praktikum Pemrograman Web 1 · Sasirangan Banua 
// ========================================================= 

	 
// 1. Data katalog kini disimpan di data/katalog.json.
// Awalnya kosong, lalu diisi oleh fungsi muatKatalog().
let katalog = [];


[ 
  { 
    "id": 1, 
    "nama": "Kain Motif Gigi Haruan", 
    "kategori": "kain", 
    "harga": 185000, 
    "gambar": "img/gigi-haruan.jpg", 
    "deskripsi": "Kain katun 2 meter bermotif zig-zag menyerupai gigi ikan haruan." 
  }, 
     { 
    "id": 2, 
    "nama": "Kain Motif Kambang Kacang", 
    "kategori": "kain", 
    "harga": 175000, 
    "gambar": "img/kambang-kacang.jpg", 
    "deskripsi": "Motif bunga kacang yang melambangkan keakraban dan kerukunan." 
  },  	  
    {
  "id": 3,
  "nama": "Selendang Iris Pudak",
  "kategori": "aksesoris",
  "harga": 120000,
  "gambar": "img/iris-pudak.jpg",
  "deskripsi": "Selendang ringan bermotif irisan daun pudak (pandan)."
},
{
  "id": 6,
  "nama": "Kain Motif Naga Balimbur",
  "kategori": "kain",
  "harga": 200000,
  "gambar": "img/naga-balimbur.jpg",
  "deskripsi": "Kain sasirangan dengan motif Naga Balimbur khas Banjar."
},
{
  "id": 7,
  "nama": "Kain Motif Sasirangan Tradisional",
  "kategori": "kain",
  "harga": 180000,
  "gambar": "img/bayam-raja.jpg",
  "deskripsi": "Kain sasirangan dengan motif tradisional khas Banjar."
},
{
  "id": 8,
  "nama": "Selendang Sasirangan Banua",
  "kategori": "aksesoris",
  "harga": 125000,
  "gambar": "img/ombak-sinapur.jpg",
  "deskripsi": "Selendang sasirangan dengan motif khas Kalimantan Selatan."
},
{
  "id": 9,
  "nama": "Baju Sasirangan Motif Kombinasi Hitam Putih",
  "kategori": "pakaian",
  "harga": 250000,
  "gambar": "img/kemeja-pria-lengan-pendek.jpg",
  "deskripsi": "Baju sasirangan khas Banjar dengan kombinasi warna hitam dan abu-abu serta motif hias putih yang unik dan menarik."
},
{
  "id": 10,
  "nama": "Baju Sasirangan Motif Intan",
  "kategori": "pakaian",
  "harga": 275000,
  "gambar": "img/kemeja-pria-lengan-panjang.jpg",
  "deskripsi": "Baju sasirangan lengan panjang khas Banjar dengan kombinasi warna hitam, merah marun, dan abu-abu serta motif geometris dan hiasan khas sasirangan yang elegan."
}
]
    // 2. Ambil elemen-elemen HTML yang akan dimanipulasi 
const daftarKatalog = document.querySelector("#daftar-katalog"); const inputCari = document.querySelector("#cari"); 
const tombolFilter = document.querySelectorAll(".tombol-filter"); const infoJumlah = document.querySelector("#info-jumlah");  
/// 3. Status filter yang sedang aktif
let kategoriAktif = "semua";

// 4. Mengubah angka menjadi format Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(angka);
}
 // 5. Membuat elemen <article> untuk satu produk
function buatKartu(produk) {
    const kartu = document.createElement("article");
    kartu.className = "kartu";

    const gambar = document.createElement("img");
    gambar.src = produk.gambar;
    gambar.alt = produk.nama;
    gambar.width = 600;
    gambar.height = 400;
    gambar.loading = "lazy";

    const isi = document.createElement("div");
    isi.className = "kartu-isi";

    const label = document.createElement("span");
    label.className = "label-kategori";
    label.textContent = produk.kategori;

    const judul = document.createElement("h3");
    judul.textContent = produk.nama;

    const deskripsi = document.createElement("p");
    deskripsi.textContent = produk.deskripsi;
    const harga = document.createElement("p");
    harga.className = "harga";
    harga.textContent = formatRupiah(produk.harga);

    isi.append(label, judul, deskripsi, harga);
    kartu.append(gambar, isi);
    return kartu;
    }
   // 6. Menampilkan sekumpulan produk ke dalam #daftar-katalog
function tampilkanKatalog(daftarProduk) {
    daftarKatalog.replaceChildren(); // kosongkan isi sebelumnya

    if (daftarProduk.length === 0) {
        const kosong = document.createElement("p");
        kosong.textContent = "Produk tidak ditemukan. Coba kata kunci lain.";
        daftarKatalog.append(kosong);
    }

    daftarProduk.forEach((produk) => {
        daftarKatalog.append(buatKartu(produk));
    });

    infoJumlah.textContent = `Menampilkan ${daftarProduk.length} dari ${katalog.length} produk`;
}

// 10. Memuat data katalog dari file JSON secara asinkron
async function muatKatalog() {
    infoJumlah.textContent = "Memuat katalog...";

    try {
        const respons = await fetch("data/katalog.json");

        if (!respons.ok) {
            throw new Error(`Gagal memuat katalog (HTTP ${respons.status})`);
        }

        katalog = await respons.json();
        tampilkanKatalog(katalog);

    } catch (galat) {
        console.error(galat);
        infoJumlah.textContent =
            "Maaf, katalog gagal dimuat. Periksa koneksi Anda lalu muat ulang halaman.";
    }
}

muatKatalog();
// 7. Menyaring katalog berdasarkan kata kunci dan kategori
function saringKatalog() {
    const kataKunci = inputCari.value.trim().toLowerCase();

    const hasil = katalog.filter((produk) => {
        const cocokKategori =
            kategoriAktif === "semua" ||
            produk.kategori === kategoriAktif;

        const cocokKata =
            produk.nama.toLowerCase().includes(kataKunci) ||
            produk.deskripsi.toLowerCase().includes(kataKunci);

        return cocokKategori && cocokKata;
    });

    tampilkanKatalog(hasil);
}

// 8. Event pencarian produk
inputCari.addEventListener("input", saringKatalog);

// 9. Event filter kategori
tombolFilter.forEach((tombol) => {
    tombol.addEventListener("click", () => {
        kategoriAktif = tombol.dataset.kategori;

        tombolFilter.forEach((t) => {
            t.classList.remove("aktif");
            t.setAttribute("aria-pressed", "false");
        });

        tombol.classList.add("aktif");
        tombol.setAttribute("aria-pressed", "true");

        saringKatalog();
    });
});
