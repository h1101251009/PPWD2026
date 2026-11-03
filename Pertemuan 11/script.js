$(document).ready(function () {
  // --- FITUR KOMPLEKS 1: PRELOADER (Efek jQuery 1: fadeOut) ---
  $(window).on("load", function () {
    $("#preloader").delay(400).fadeOut(600);
  });

  // --- FITUR KOMPLEKS 2: DARK MODE TOGGLE ---
  const htmlEl = $("html");
  const themeIcon = $("#theme-toggle i");

  // Cek apakah user sebelumnya sudah memilih dark mode (LocalStorage)
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    htmlEl.attr("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
  }

  $("#theme-toggle").on("click", function () {
    let currentTheme = htmlEl.attr("data-theme");
    let newTheme = currentTheme === "light" ? "dark" : "light";

    htmlEl.attr("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Simpan pilihan di browser
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (theme === "dark") {
      themeIcon.removeClass("fa-moon").addClass("fa-sun");
    } else {
      themeIcon.removeClass("fa-sun").addClass("fa-moon");
    }
  }

  // --- EFEK JQUERY: GLASSMORPHISM NAVBAR SCROLL ---
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 50) {
      $("#navbar").addClass("scrolled");
    } else {
      $("#navbar").removeClass("scrolled");
    }
  });

  // --- EFEK JQUERY 2: FADE (Navigasi Tab Katalog) ---
  $(".tab-btn").on("click", function () {
    const target = $(this).data("target");

    $(".tab-btn").removeClass("active");
    $(this).addClass("active");

    // Hide semua konten tab, lalu fadeIn konten yang dipilih
    $(".tab-content").hide();
    $(target).fadeIn(500); // fadeIn lebih halus (500ms)
  });

  // --- EFEK JQUERY 3: ANIMATE (Hover Kartu Produk & Smooth Scroll) ---
  // A. Efek kartu melayang saat di-hover
  $(".card").hover(
    function () {
      $(this).stop().animate({ top: "-12px" }, 250);
    },
    function () {
      $(this).stop().animate({ top: "0px" }, 250);
    },
  );

  // B. Smooth scroll saat klik tombol navbar
  $('a[href^="#"]').on("click", function (e) {
    const href = $(this).attr("href");
    if (href.length > 1) {
      e.preventDefault();
      const target = $(href);
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 80, // Offset agar tidak tertutup sticky navbar
          },
          800,
        );
      }
    }
  });

  // --- JQUERY VALIDATION (Syarat Praktikum Modul 11) ---

  // Custom Rule: Password harus gabungan huruf dan angka (Tantangan Modul)
  $.validator.addMethod(
    "hurufAngka",
    function (value, element) {
      return (
        this.optional(element) ||
        (/[a-zA-Z]/.test(value) && /[0-9]/.test(value))
      );
    },
    "Password minimal harus memiliki kombinasi huruf dan angka.",
  );

  // Eksekusi Validasi Form
  $("#formMember").validate({
    rules: {
      nama: { required: true, minlength: 4 },
      email: { required: true, email: true },
      hp: { required: true, digits: true, minlength: 10, maxlength: 13 },
      alamat: { required: true, minlength: 15 },
      password: { required: true, minlength: 8, hurufAngka: true },
    },
    messages: {
      nama: {
        required: "Mohon isi nama lengkap Anda.",
        minlength: "Nama terlalu pendek (minimal 4 karakter).",
      },
      email: {
        required: "Email dibutuhkan untuk pengiriman resi.",
        email: "Format email tidak valid (contoh: nama@email.com).",
      },
      hp: {
        required: "Nomor WhatsApp aktif wajib diisi.",
        digits: "Format salah. Hanya masukkan angka.",
        minlength: "Nomor HP minimal 10 digit.",
        maxlength: "Nomor HP maksimal 13 digit.",
      },
      alamat: {
        required: "Alamat pengiriman barang wajib diisi.",
        minlength: "Alamat terlalu singkat. Mohon cantumkan RT/RW dan jalan.",
      },
      password: {
        required: "Password wajib diisi untuk keamanan akun.",
        minlength: "Gunakan minimal 8 karakter.",
      },
    },
    submitHandler: function (form) {
      // --- EFEK JQUERY 4: SLIDE (Notifikasi Sukses) ---
      $("#notif-sukses").slideDown(400).delay(4000).slideUp(400);

      // Reset isi form
      form.reset();
    },
  });
});
