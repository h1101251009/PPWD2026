// ===== 1. Mode gelap / terang (diingat di browser) =====
const tombolTema = document.getElementById("tombol-tema");
const root = document.documentElement;

function perbaruiTombol() {
  tombolTema.textContent = root.classList.contains("gelap") ? "Mode terang" : "Mode gelap";
}
perbaruiTombol();

tombolTema.addEventListener("click", function () {
  root.classList.toggle("gelap");
  perbaruiTombol();
  try {
    localStorage.setItem("tema", root.classList.contains("gelap") ? "gelap" : "terang");
  } catch (e) {}
});

// ===== 2. Pencarian + filter kategori =====
const kotakCari = document.getElementById("cari");
const semuaKartu = document.querySelectorAll(".kartu");
const semuaChip = document.querySelectorAll(".chip");
const pesanKosong = document.getElementById("pesan-kosong");
const jumlah = document.getElementById("jumlah");
let kategoriAktif = "semua";

function terapkanFilter() {
  const kataKunci = kotakCari.value.toLowerCase().trim();
  let banyak = 0;

  semuaKartu.forEach(function (kartu) {
    const cocokTeks = kartu.textContent.toLowerCase().includes(kataKunci);
    const cocokKategori = kategoriAktif === "semua" || kartu.dataset.kategori === kategoriAktif;
    const tampil = cocokTeks && cocokKategori;
    kartu.style.display = tampil ? "flex" : "none";
    if (tampil) banyak++;
  });

  jumlah.textContent = "(" + banyak + ")";
  pesanKosong.style.display = banyak === 0 ? "block" : "none";
}

kotakCari.addEventListener("input", terapkanFilter);

semuaChip.forEach(function (chip) {
  chip.addEventListener("click", function () {
    semuaChip.forEach(function (c) { c.classList.remove("aktif"); });
    chip.classList.add("aktif");
    kategoriAktif = chip.dataset.filter;
    terapkanFilter();
  });
});

// Tekan "/" untuk langsung mengetik di kotak pencarian
document.addEventListener("keydown", function (e) {
  const sedangMengetik = /input|textarea|select/i.test(document.activeElement.tagName);
  if (e.key === "/" && !sedangMengetik) {
    e.preventDefault();
    kotakCari.focus();
  }
});

terapkanFilter();

// ===== 3. Tahun otomatis di footer =====
document.getElementById("tahun").textContent = new Date().getFullYear();
