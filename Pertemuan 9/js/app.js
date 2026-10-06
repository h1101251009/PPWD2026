const produk = [
  { id: 1, nama: 'Beras 5 kg', emoji: '🍚', harga: 68000 },
  { id: 2, nama: 'Minyak 1 L', emoji: '🛢️', harga: 18000 },
  { id: 3, nama: 'Telur 1 kg', emoji: '🥚', harga: 28000 },
  { id: 4, nama: 'Kopi sachet', emoji: '☕', harga: 2500 }
];
let cart = [];

const rp = n => 'Rp ' + n.toLocaleString('id-ID');

// ----- Tampilan keranjang (+ Latihan 1: diskon) -----
function updateCartUI() {
  $('#cartItems').empty();
  if (cart.length === 0) $('#cartItems').text('Keranjang kosong.');

  cart.forEach(item => {
    $('#cartItems').append(`
      <div class="baris">
        <span>${item.nama} (${rp(item.harga)})</span>
        <span>
          <button class="kurang" data-id="${item.id}">-</button>
          ${item.qty}
          <button class="tambah" data-id="${item.id}">+</button>
        </span>
      </div>`);
  });

  let totalHarga = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);

  if (totalHarga > 100000) {
    const diskon = totalHarga * 0.1;
    totalHarga -= diskon;
    $('#cartTotal').html(`
      <span class="coret">${rp(totalHarga + diskon)}</span>
      ${rp(totalHarga)}`);
  } else {
    $('#cartTotal').text(rp(totalHarga));
  }

  $('#btnCheckout').prop('disabled', cart.length === 0);
}

function hitungTotal() {
  const total = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);
  return total > 100000 ? total * 0.9 : total;
}

// ----- Latihan 2: riwayat di localStorage -----
function simpanRiwayat(total, qty) {
  const riwayat = JSON.parse(localStorage.getItem('riwayat')) || [];
  riwayat.push({ tanggal: new Date().toISOString(), total, qty });
  localStorage.setItem('riwayat', JSON.stringify(riwayat));
}

function tampilRiwayat() {
  const riwayat = JSON.parse(localStorage.getItem('riwayat')) || [];
  $('#riwayatList').empty();
  if (riwayat.length === 0) $('#riwayatList').html('<li>Belum ada pesanan.</li>');
  riwayat.forEach(r => {
    const tgl = new Date(r.tanggal).toLocaleString('id-ID');
    $('#riwayatList').prepend(`<li>${tgl}: ${r.qty} barang, ${rp(r.total)}</li>`);
  });
}

// ----- Latihan 3: validasi form pembeli -----
function cek(kondisi, input, pesan) {
  $(input).toggleClass('salah', !kondisi);
  $(pesan).toggle(!kondisi);
  return kondisi;
}

$(function () {
  produk.forEach(p => {
    $('#produkList').append(`
      <div class="produk">
        <div class="emoji">${p.emoji}</div>
        <b>${p.nama}</b>
        <span class="harga">${rp(p.harga)}</span>
        <button class="beli" data-id="${p.id}">Tambah</button>
      </div>`);
  });

  $('#produkList').on('click', '.beli', function () {
    const p = produk.find(x => x.id == $(this).data('id'));
    const ada = cart.find(x => x.id === p.id);
    if (ada) ada.qty++; else cart.push({ ...p, qty: 1 });
    updateCartUI();
  });

  $('#cartItems').on('click', 'button', function () {
    const id = $(this).data('id');
    const item = cart.find(x => x.id == id);
    item.qty += $(this).hasClass('tambah') ? 1 : -1;
    if (item.qty <= 0) cart = cart.filter(x => x.id != id);
    updateCartUI();
  });

  $('#btnCheckout').click(() => $('#modal').css('display', 'flex'));
  $('#btnBatal').click(() => $('#modal').hide());

  $('#formPembeli').submit(function (e) {
    e.preventDefault();
    const hp = $('#hp').val().replace(/[\s-]/g, '');
    const a = cek($('#nama').val().trim().length >= 3, '#nama', '#errNama');
    const b = cek($('#alamat').val().trim().length >= 10, '#alamat', '#errAlamat');
    const c = cek(/^(\+62|62|0)8\d{8,11}$/.test(hp), '#hp', '#errHp');
    if (!(a && b && c)) return;

    const qty = cart.reduce((sum, item) => sum + item.qty, 0);
    simpanRiwayat(hitungTotal(), qty);
    alert('Terima kasih, ' + $('#nama').val().trim() + '! Pesanan berhasil.');

    cart = [];
    this.reset();
    $('#modal').hide();
    updateCartUI();
    tampilRiwayat();
  });

  updateCartUI();
  tampilRiwayat();
});
