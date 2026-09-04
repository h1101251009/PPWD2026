<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profil Saya</title>
  <link rel="stylesheet" href="style.css?v=2">
</head>
<body>
  <header class="header">
    <img src="foto-profil.jpg?v=2" alt="Foto Profil Fahriello" class="foto-profil">
    <h1>Fahriello Ardhyana Saputra</h1>
    <p>Mahasiswa Sistem Informasi — Universitas Tanjungpura</p>
  </header>

  <nav class="nav">
    <a href="#tentang">Tentang</a>
    <a href="#hobi">Hobi</a>
    <a href="#jadwal">Jadwal</a>
    <a href="#kontak">Kontak</a>
  </nav>

  <main class="konten">
    <section id="tentang">
      <h2>Tentang Saya</h2>
      <p>Halo! Saya Fahriello, mahasiswa Sistem Informasi yang sedang
      mempelajari pengembangan web mulai dari CI/CD Pipeline hingga
      penataan tampilan dengan CSS.</p>
      <p>Saya tertarik pada pengembangan web karena memungkinkan ide
      menjadi produk digital yang dapat diakses siapa saja.</p>
    </section>

    <section id="hobi">
      <h2>Daftar Hobi</h2>
      <table>
        <tr><th>Hobi</th><th>Keterangan</th></tr>
        <tr><td>Fotografi</td><td>Memotret pemandangan dan momen sehari-hari</td></tr>
        <tr><td>Membaca</td><td>Novel dan artikel teknologi</td></tr>
        <tr><td>Bermain Game</td><td>Terutama game strategi dan simulasi</td></tr>
        <tr><td>Coding Pribadi</td><td>Membuat proyek kecil untuk belajar</td></tr>
        <tr><td>Olahraga</td><td>Badminton dan jogging</td></tr>
      </table>
    </section>

    <section id="jadwal">
      <h2>Jadwal Kuliah Favorit</h2>
      <table>
        <tr><th>Hari</th><th>Mata Kuliah</th><th>Jam</th></tr>
        <tr><td>Senin</td><td>Pemrograman Web Dasar</td><td>08.00 – 10.30</td></tr>
        <tr><td>Rabu</td><td>Basis Data</td><td>13.00 – 15.30</td></tr>
        <tr><td>Kamis</td><td>Analisis & Perancangan Sistem</td><td>10.00 – 12.30</td></tr>
      </table>
    </section>

    <section id="kontak">
      <h2>Formulir Kontak</h2>
      <form>
        <label for="nama">Nama</label>
        <input type="text" id="nama" placeholder="Tulis nama Anda">

        <label for="email">Email</label>
        <input type="email" id="email" placeholder="nama@email.com">

        <label for="pesan">Pesan</label>
        <textarea id="pesan" rows="4" placeholder="Tulis pesan..."></textarea>

        <button type="submit">Kirim Pesan</button>
      </form>
    </section>
  </main>

  <footer class="footer">
    <p>&copy; 2026 Fahriello Ardhyana Saputra. Dibuat dengan HTML &amp; CSS.</p>
  </footer>
</body>
</html>