import { useEffect, useRef, useState } from "react";
import { useAppearAnimation } from "../hooks/use-appear-animation";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  ChevronDown,
  X,
  Menu,
  RefreshCw,
  LayoutDashboard,
  CalendarDays,
  BedDouble,
  Globe,
  Settings,
  TrendingUp,
  ShieldCheck,
  Zap,
  Plus,
  Minus,
  Play,
  Download,
  Hotel,
  CircleCheck,
  Radio,
} from "lucide-react";

const channels = [
  "Booking.com",
  "Agoda",
  "Traveloka",
  "Tiket.com",
  "Expedia",
  "Website hotel",
];
const faqs = [
  [
    "Apa itu hotel channel manager?",
    "Channel manager membantu mengelola ketersediaan kamar, harga, dan reservasi dari berbagai kanal penjualan melalui satu sistem. Ketika reservasi masuk, inventori diperbarui di kanal lain agar kamar yang sama tidak terjual dua kali.",
  ],
  [
    "Bagaimana StaySync membantu mencegah overbooking?",
    "StaySync dirancang untuk menggunakan satu inventori bersama. Saat kamar terakhir dipesan, penjualan untuk kamar dan tanggal tersebut ditutup di kanal lain. Efektivitasnya tetap bergantung pada koneksi, pemetaan kamar, dan dukungan API setiap kanal.",
  ],
  [
    "Kanal apa saja yang dapat dihubungkan?",
    "Booking.com, Agoda, Traveloka, Tiket.com, Expedia, dan website hotel adalah contoh kanal yang ditampilkan. Website ini merupakan demo produk; koneksi operasional dan ketersediaan integrasi perlu dikonfirmasi sebelum implementasi.",
  ],
  [
    "Apakah harga dapat berbeda di setiap kanal?",
    "Ya, konsep pengelolaan harga mendukung rate plan dan penyesuaian harga per kanal. Gunakan satu harga dasar lalu tentukan strategi distribusi sesuai kebutuhan properti Anda.",
  ],
  [
    "Apakah demo ini terhubung ke OTA secara langsung?",
    "Tidak. Seluruh dashboard dan simulasi di website ini memakai data contoh yang berjalan di browser Anda. Tidak ada reservasi atau perubahan harga yang dikirim ke OTA.",
  ],
  [
    "Bagaimana cara memulai?",
    "Klik “Jadwalkan demo”, isi kebutuhan properti Anda, lalu simpan dan unduh ringkasan. Formulir ini belum mengirimkan permintaan ke tim penjualan; ringkasan tersimpan hanya di perangkat Anda.",
  ],
];

function Brand({ small = false }: { small?: boolean }) {
  return (
    <a
      href="#top"
      className={`brand ${small ? "small" : ""}`}
      aria-label="StaySync beranda"
    >
      <span className="brand-icon">
        <Hotel size={20} />
      </span>
      StaySync<span className="brand-dot">.</span>
    </a>
  );
}

function Dashboard() {
  const [tab, setTab] = useState("Ringkasan");
  return (
    <div className="dashboard-wrap">
      <div className="floating-alert">
        <span className="alert-icon">
          <Check size={16} />
        </span>
        <div>
          <strong>Reservasi baru dari Booking.com</strong>
          <small>Inventori di 6 kanal telah diperbarui</small>
        </div>
        <span className="alert-time">Baru saja</span>
      </div>
      <div className="dashboard">
        <aside className="dash-sidebar">
          <Brand small />
          <span className="property-label">PROPERTI CONTOH</span>
          <div className="property">
            <span className="property-icon">
              <Hotel size={17} />
            </span>
            <div>
              Villa Senja Bali<small>Ubud, Indonesia</small>
            </div>
            <ChevronDown size={12} />
          </div>
          <nav>
            {[
              { name: "Ringkasan", icon: LayoutDashboard },
              { name: "Kalender", icon: CalendarDays },
              { name: "Reservasi", icon: BedDouble },
              { name: "Kanal", icon: Globe },
            ].map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setTab(name)}
                className={tab === name ? "active" : ""}
              >
                <Icon size={15} />
                {name}
                {name === "Reservasi" && <span className="nav-counter">8</span>}
              </button>
            ))}
          </nav>
          <div className="dash-help">
            <span className="live-dot" /> Semua kanal tersinkron
          </div>
          <button className="settings" onClick={() => setTab("Pengaturan")}>
            <Settings size={14} />
            Pengaturan
          </button>
        </aside>
        <div className="dash-content">
          <div className="dash-top">
            <div>
              <h3>
                {tab === "Ringkasan" ? "Selamat pagi, tim Villa Senja" : tab}
              </h3>
              <p>
                {tab === "Ringkasan"
                  ? "Semua kanal terhubung. Semua dalam kendali."
                  : "Pratinjau data properti — mode demonstrasi"}
              </p>
            </div>
            <span className="dash-avatar">VS</span>
          </div>
          <div className="dash-title">
            <b>
              {tab === "Ringkasan"
                ? "Ringkasan properti"
                : `Pratinjau ${tab.toLowerCase()}`}
            </b>
            <span>
              <CalendarDays size={12} /> 7 Oktober 2026{" "}
              <ChevronDown size={11} />
            </span>
          </div>
          {tab === "Ringkasan" ? (
            <>
              <div className="stats">
                <div>
                  <span>
                    Okupansi hari ini <BedDouble size={14} />
                  </span>
                  <strong>
                    84<em>%</em>
                  </strong>
                  <small>
                    <TrendingUp size={10} /> +12% dari bulan lalu
                  </small>
                  <div className="tiny-bars">
                    {[30, 45, 35, 55, 45, 70, 80, 60, 85, 70, 90, 100].map(
                      (n, i) => (
                        <i key={i} style={{ height: n / 3 }} />
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <span>
                    Reservasi bulan ini <CalendarDays size={14} />
                  </span>
                  <strong>128</strong>
                  <small>
                    <TrendingUp size={10} /> +18 reservasi baru
                  </small>
                  <div className="stat-line" />
                </div>
                <div>
                  <span>
                    Pendapatan bulan ini <TrendingUp size={14} />
                  </span>
                  <strong>
                    <em>Rp</em> 96,4<em> jt</em>
                  </strong>
                  <small>
                    <TrendingUp size={10} /> +24% dari bulan lalu
                  </small>
                  <div className="stat-line second" />
                </div>
              </div>
              <div className="channel-heading">
                <b>Status kanal</b>
                <span>
                  <span className="live-dot" /> Sinkronisasi aktif
                </span>
              </div>
            </>
          ) : (
            <div className="preview-note">
              <Radio size={21} />
              <div>
                <b>
                  {tab === "Kalender"
                    ? "Ketersediaan 7 Oktober 2026"
                    : tab === "Reservasi"
                      ? "8 reservasi terkonfirmasi"
                      : tab === "Pengaturan"
                        ? "Villa Senja Bali · 24 kamar"
                        : "6 kanal dalam satu inventori"}
                </b>
                <p>
                  Data contoh. Jelajahi simulasi di bawah untuk mencoba
                  sinkronisasi.
                </p>
              </div>
            </div>
          )}
          <div className="dash-channel-grid">
            {channels.map((c, i) => (
              <div key={c}>
                <span className={`channel-symbol cs-${i}`}>
                  {i === 5 ? <Globe size={13} /> : c.charAt(0)}
                </span>
                <b>{c}</b>
                <span className="channel-connected">
                  <span /> Terhubung
                </span>
              </div>
            ))}
          </div>
          <div className="dash-bottom">
            <ShieldCheck size={12} /> Tidak ada konflik reservasi
            <span>Terakhir diperbarui 2 detik lalu</span>
          </div>
        </div>
      </div>
      <div className="sync-float">
        <span>
          <RefreshCw size={17} />
        </span>
        <div>
          <strong>Satu inventori. Selalu sinkron.</strong>
          <small>Ketersediaan diperbarui otomatis</small>
        </div>
        <span className="check-round">
          <Check size={13} />
        </span>
      </div>
    </div>
  );
}

export default function Home() {
  const appearScope = useAppearAnimation();
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [plan, setPlan] = useState("Growth");
  const [saved, setSaved] = useState(false);
  const [rooms, setRooms] = useState(1);
  const [rate, setRate] = useState(850000);
  const [channel, setChannel] = useState("Booking.com");
  const [event, setEvent] = useState(
    "Menunggu reservasi. Coba pesan kamar terakhir.",
  );
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    hotel: "",
    rooms: "",
    phone: "",
  });
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (modal) dialog.current?.showModal();
    else dialog.current?.close();
  }, [modal]);
  const openDemo = (p = "Growth") => {
    setPlan(p);
    setSaved(false);
    setModal(true);
    setMenu(false);
  };
  const book = () => {
    if (rooms > 0) {
      setRooms(rooms - 1);
      setEvent(
        `Reservasi ${channel} diterima. ${rooms === 1 ? "Kamar terakhir terjual. Seluruh kanal otomatis ditutup." : `Sisa ${rooms - 1} kamar di seluruh kanal.`}`,
      );
    }
  };
  const download = () => {
    const blob = new Blob(
      [
        JSON.stringify(
          {
            brand: "StaySync",
            ...form,
            plan,
            status: "Draft lokal — belum dikirim",
          },
          null,
          2,
        ),
      ],
      { type: "application/json" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "staysync-permintaan-demo.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav className={menu ? "open" : ""}>
            <a href="#fitur" onClick={() => setMenu(false)}>
              Fitur
            </a>
            <a href="#integrasi" onClick={() => setMenu(false)}>
              Integrasi
            </a>
            <a href="#cara-kerja" onClick={() => setMenu(false)}>
              Cara kerja
            </a>
            <a href="#paket" onClick={() => setMenu(false)}>
              Paket
            </a>
          </nav>
          <button
            className="button yellow small-button header-cta"
            onClick={() => openDemo()}
          >
            Jadwalkan demo <ArrowUpRight size={15} />
          </button>
          <button
            className="mobile-menu"
            onClick={() => setMenu(!menu)}
            aria-label="Buka navigasi"
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="top" ref={appearScope}>
        <section className="hero">
          <div className="hero-grid" />
          <div className="spotlight" />
          <div className="container hero-content">
            <div className="eyebrow">
              <span className="live-dot" /> HOTEL CHANNEL MANAGER, SIMPLIFIED
            </div>
            <h1>
              Semua kanal.
              <br />
              Satu kendali<span className="yellow-text">.</span>{" "}
              <span className="headline-star">✳</span>
            </h1>
            <p className="hero-description">
              Sinkronkan kamar, harga, dan reservasi di semua kanal.
              <br className="desktop-break" /> Lebih sedikit pekerjaan manual.
              Tanpa drama double booking.
            </p>
            <div className="hero-actions">
              <button className="button yellow" onClick={() => openDemo()}>
                Jadwalkan demo gratis <ArrowUpRight size={17} />
              </button>
              <a className="button outline" href="#simulasi">
                <span className="play-circle">
                  <Play size={11} fill="currentColor" />
                </span>
                Lihat cara kerjanya
              </a>
            </div>
            <div className="hero-checks">
              <span>
                <Check size={13} /> Satu dashboard
              </span>
              <span>
                <Check size={13} /> Sinkronisasi real-time
              </span>
              <span>
                <Check size={13} /> Kendali penuh
              </span>
            </div>
            <Dashboard />
            <div className="demo-caption">
              PRATINJAU PRODUK · DATA ILUSTRATIF, BUKAN KONEKSI OTA LIVE
            </div>
          </div>
          <div className="container partners" id="integrasi">
            <p>Satu tempat untuk semua kanal penjualan Anda</p>
            <div className="partner-logos">
              <span className="booking">Booking.com</span>
              <span className="agoda">
                agoda<span className="agoda-dots">● ● ● ● ●</span>
              </span>
              <span className="traveloka">
                traveloka <span className="bird">↗</span>
              </span>
              <span className="tiket">
                tiket<span className="ticket-dot">.</span>com
              </span>
              <span className="expedia">
                <span>✈</span> Expedia
              </span>
              <span className="own-website">
                <Globe size={20} /> Website Anda
              </span>
            </div>
            <small>
              Kanal ditampilkan sebagai contoh integrasi. Ketersediaan koneksi
              perlu dikonfirmasi.
            </small>
          </div>
        </section>
        <section className="light-section" id="fitur">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">
                LEBIH SEDIKIT RIBET. LEBIH BANYAK RESERVASI.
              </span>
              <h2>
                Hospitality untuk tamu Anda.
                <br />
                Kemudahan untuk tim Anda.
              </h2>
              <p>
                Tinggalkan pembaruan satu per satu. Fokus pada pengalaman
                menginap,
                <br className="desktop-break" /> sementara StaySync menjaga
                distribusi Anda tetap selaras.
              </p>
            </div>
            <div className="feature-grid">
              <article className="feature-card">
                <span className="feature-icon">
                  <RefreshCw size={21} />
                </span>
                <h3>
                  Selalu sinkron.
                  <br />
                  Di setiap kanal.
                </h3>
                <p>
                  Satu perubahan, langsung terdistribusi.
                  <br />
                  Ketersediaan kamar selalu selaras.
                </p>
                <div className="mini-sync">
                  <span className="mini-source">
                    <Hotel size={19} />
                  </span>
                  <div className="sync-lines" />
                  <div className="mini-targets">
                    {["B.", "a", "t"].map((c) => (
                      <span key={c}>
                        {c}
                        <Check size={10} />
                      </span>
                    ))}
                  </div>
                  <span className="synced-tag">
                    <span className="live-dot" /> Tersinkron
                  </span>
                </div>
              </article>
              <article className="feature-card">
                <span className="feature-icon">
                  <ShieldCheck size={21} />
                </span>
                <h3>
                  Selamat tinggal,
                  <br />
                  double booking.
                </h3>
                <p>
                  Kamar terjual di satu kanal?
                  <br />
                  Otomatis ditutup di kanal lainnya.
                </p>
                <div className="sold-preview">
                  <div>
                    <span>
                      <BedDouble size={17} /> Deluxe Room
                    </span>
                    <span className="sold-tag">Terjual</span>
                  </div>
                  <div>
                    <Check size={14} /> Semua kanal diperbarui
                  </div>
                  <div className="closed-row">
                    Booking.com{" "}
                    <span>
                      Ditutup <Check size={10} />
                    </span>
                  </div>
                </div>
              </article>
              <article className="feature-card dark-card">
                <span className="feature-icon">
                  <TrendingUp size={21} />
                </span>
                <h3>
                  Harga tepat.
                  <br />
                  Peluang lebih besar.
                </h3>
                <p>
                  Kelola rate plan dan harga per kanal
                  <br />
                  dari satu dashboard yang intuitif.
                </p>
                <div className="rate-preview">
                  <span>
                    Deluxe Room <small>Harga dasar</small>
                  </span>
                  <b>Rp850.000</b>
                  <div>
                    {[24, 35, 30, 50, 45, 65, 60, 85, 76, 100].map((h, i) => (
                      <i key={i} style={{ height: h * 0.65 }} />
                    ))}
                  </div>
                  <small>
                    Strategi harga, dalam kendali Anda{" "}
                    <ArrowUpRight size={12} />
                  </small>
                </div>
              </article>
            </div>
            <div className="simulation" id="simulasi">
              <div className="simulation-copy">
                <span className="section-kicker">COBA SENDIRI</span>
                <h2>
                  Satu kamar terjual.
                  <br />
                  Semua kanal tahu.
                </h2>
                <p>
                  Lihat bagaimana satu reservasi memperbarui ketersediaan di
                  setiap kanal. Tanpa klik berulang. Tanpa kamar terjual dua
                  kali.
                </p>
                <ol>
                  <li>
                    <span>01</span> Pilih kanal masuknya reservasi
                  </li>
                  <li>
                    <span>02</span> Pesan kamar yang tersedia
                  </li>
                  <li>
                    <span>03</span> Lihat semua kanal tersinkron
                  </li>
                </ol>
                <a href="#cara-kerja" className="text-link">
                  Kenali cara kerja StaySync <ArrowUpRight size={16} />
                </a>
              </div>
              <div className="simulation-panel">
                <div className="sim-top">
                  <span>
                    <Radio size={14} /> Sinkronisasi langsung
                  </span>
                  <span className="demo-label">MODE DEMO</span>
                </div>
                <div className="sim-room">
                  <div>
                    <small>KAMAR CONTOH · 7 OKT 2026</small>
                    <h3>Deluxe Room</h3>
                  </div>
                  <div className="room-count">
                    <strong>{rooms}</strong>
                    <span>kamar tersedia</span>
                  </div>
                </div>
                <div className="sim-controls">
                  <label>
                    Harga dasar (Rp)
                    <input
                      aria-label="Harga dasar"
                      type="number"
                      step="50000"
                      min="50000"
                      value={rate}
                      onChange={(e) =>
                        setRate(Math.max(50000, Number(e.target.value)))
                      }
                    />
                  </label>
                  <div>
                    <span>Inventori</span>
                    <div className="stepper">
                      <button
                        aria-label="Kurangi kamar"
                        disabled={rooms === 0}
                        onClick={() => setRooms(Math.max(0, rooms - 1))}
                      >
                        <Minus size={13} />
                      </button>
                      <b>{rooms}</b>
                      <button
                        aria-label="Tambah kamar"
                        disabled={rooms >= 10}
                        onClick={() => setRooms(Math.min(10, rooms + 1))}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="sim-channels">
                  {channels.map((c, i) => (
                    <div key={c}>
                      <span className={`channel-symbol cs-${i}`}>
                        {c.charAt(0)}
                      </span>
                      <span>{c}</span>
                      <span
                        className={
                          rooms ? "availability" : "availability closed"
                        }
                      >
                        {rooms ? `${rooms} tersedia` : "Ditutup"}{" "}
                        <Check size={11} />
                      </span>
                      <small>Rp{rate.toLocaleString("id-ID")}</small>
                    </div>
                  ))}
                </div>
                <div className="booking-controls">
                  <label className="sr-only" htmlFor="booking-channel">
                    Kanal reservasi
                  </label>
                  <select
                    id="booking-channel"
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                  >
                    {channels.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <button
                    className="button yellow"
                    onClick={book}
                    disabled={!rooms}
                  >
                    {rooms ? "Simulasikan reservasi" : "Semua kamar terjual"}
                    {rooms ? <ArrowRight size={14} /> : <Check size={14} />}
                  </button>
                </div>
                <p className="sim-event" aria-live="polite">
                  <CircleCheck size={14} />
                  {event}
                </p>
                <button
                  className="reset-button"
                  onClick={() => {
                    setRooms(1);
                    setRate(850000);
                    setEvent(
                      "Simulasi direset. Satu kamar tersedia di seluruh kanal.",
                    );
                  }}
                >
                  <RefreshCw size={11} /> Ulangi simulasi
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="workflow section-dark" id="cara-kerja">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">
                SETUP SEDERHANA. DAMPAK NYATA.
              </span>
              <h2>
                Dari banyak dashboard,
                <br />
                jadi satu alur yang rapi.
              </h2>
              <p>
                Dirancang agar tim Anda bisa bekerja lebih tenang, setiap hari.
              </p>
            </div>
            <div className="workflow-grid">
              {[
                {
                  title: "Hubungkan kanal Anda",
                  desc: "Petakan tipe kamar dan rate plan dari setiap OTA ke inventori properti Anda.",
                  icon: Globe,
                },
                {
                  title: "Kelola dari satu tempat",
                  desc: "Perbarui ketersediaan dan harga sekali. Distribusikan ke seluruh kanal terhubung.",
                  icon: LayoutDashboard,
                },
                {
                  title: "Biarkan StaySync bekerja",
                  desc: "Reservasi masuk, inventori diperbarui. Tim Anda cukup fokus menyambut tamu.",
                  icon: Zap,
                },
              ].map(({ title, desc, icon: Icon }, i) => (
                <article key={title}>
                  <div className="workflow-number">
                    0{i + 1}
                    <Icon size={22} />
                  </div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                  {i < 2 && (
                    <span className="workflow-arrow">
                      <ArrowRight size={20} />
                    </span>
                  )}
                </article>
              ))}
            </div>
            <div className="trust-strip">
              <ShieldCheck size={19} />
              <span>
                Distribusi yang teratur. Operasional yang lebih tenang.
              </span>
              <span className="yellow-text">Itulah StaySync.</span>
            </div>
          </div>
        </section>
        <section className="pricing section-dark" id="paket">
          <div className="container">
            <div className="section-heading">
              <span className="section-kicker">
                TUMBUH BERSAMA PROPERTI ANDA
              </span>
              <h2>
                Kebutuhan berbeda.
                <br />
                Kendali yang sama.
              </h2>
              <p>
                Pilih pendekatan yang tepat. Diskusikan paket dan harga saat
                demo.
              </p>
            </div>
            <div className="pricing-grid">
              {[
                {
                  name: "Starter",
                  label: "UNTUK PROPERTI INDEPENDEN",
                  desc: "Langkah pertama menuju distribusi yang lebih rapi.",
                  features: [
                    "Sinkronisasi ketersediaan & harga",
                    "Manajemen reservasi terpusat",
                    "Dashboard kanal",
                    "Panduan onboarding",
                  ],
                },
                {
                  name: "Growth",
                  label: "UNTUK HOTEL YANG BERKEMBANG",
                  desc: "Lebih banyak kanal. Lebih banyak peluang.",
                  features: [
                    "Semua fitur Starter",
                    "Pengelolaan beberapa rate plan",
                    "Ringkasan performa kanal",
                    "Pendampingan konfigurasi",
                  ],
                },
                {
                  name: "Portfolio",
                  label: "UNTUK MULTI-PROPERTI",
                  desc: "Satu pandangan untuk seluruh portofolio Anda.",
                  features: [
                    "Semua fitur Growth",
                    "Pengelolaan multi-properti",
                    "Perencanaan integrasi khusus",
                    "Onboarding sesuai kebutuhan",
                  ],
                },
              ].map((p) => (
                <article
                  className={`pricing-card ${p.name === "Growth" ? "recommended" : ""}`}
                  key={p.name}
                >
                  {p.name === "Growth" && (
                    <span className="recommended-label">
                      UNTUK DISTRIBUSI LEBIH OPTIMAL <Zap size={11} />
                    </span>
                  )}
                  <span className="plan-kicker">{p.label}</span>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="plan-price">
                    Sesuai kebutuhan
                    <small>Penawaran disesuaikan dengan properti</small>
                  </div>
                  <button
                    className={`button ${p.name === "Growth" ? "yellow" : "outline"}`}
                    onClick={() => openDemo(p.name)}
                  >
                    Diskusikan paket <ArrowUpRight size={16} />
                  </button>
                  <div className="plan-divider" />
                  {p.features.map((f) => (
                    <div className="plan-feature" key={f}>
                      <Check size={14} />
                      {f}
                    </div>
                  ))}
                </article>
              ))}
            </div>
            <p className="pricing-note">
              Konsep paket untuk demo produk. Detail fitur, integrasi, dan harga
              final perlu dikonfirmasi.
            </p>
          </div>
        </section>
        <section className="faq section-dark" id="faq">
          <div className="container faq-layout">
            <div>
              <span className="section-kicker">ADA YANG INGIN DITANYAKAN?</span>
              <h2>
                Jawaban singkat.
                <br />
                Biar makin yakin.
              </h2>
              <p>
                Hal-hal yang perlu Anda tahu
                <br />
                sebelum memulai dengan StaySync.
              </p>
              <button className="text-link" onClick={() => openDemo()}>
                Diskusikan kebutuhan Anda <ArrowUpRight size={16} />
              </button>
            </div>
            <div className="faq-list">
              {faqs.map(([q, a], i) => (
                <div
                  className={`faq-item ${openFaq === i ? "expanded" : ""}`}
                  key={q}
                >
                  <button
                    aria-expanded={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {q}
                    {openFaq === i ? <Minus size={17} /> : <Plus size={17} />}
                  </button>
                  {openFaq === i && <p>{a}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="cta-section">
          <div className="container">
            <div className="cta-box">
              <div className="cta-lines" />
              <span className="section-kicker">
                LEBIH SINKRON. LEBIH TENANG.
              </span>
              <h2>
                Kamar Anda di banyak tempat.
                <br />
                Kendalinya tetap di tangan Anda.
              </h2>
              <p>Saatnya bekerja lebih cerdas bersama StaySync.</p>
              <button className="button black" onClick={() => openDemo()}>
                Jadwalkan demo gratis <ArrowUpRight size={16} />
              </button>
              <span className="cta-footnote">
                Jelajahi produk · Sesuaikan kebutuhan properti
              </span>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container">
          <div className="footer-main">
            <div>
              <Brand />
              <p>Satu koneksi untuk setiap kesempatan menginap.</p>
            </div>
            <div>
              <a href="#fitur">Fitur</a>
              <a href="#integrasi">Integrasi</a>
              <a href="#paket">Paket</a>
              <a href="#faq">FAQ</a>
              <a href="#simulasi">
                Coba demo <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 StaySync. All rights reserved.</span>
            <span>Dirancang untuk hospitality yang lebih baik.</span>
          </div>
        </div>
      </footer>
      <dialog
        ref={dialog}
        onCancel={() => setModal(false)}
        aria-label="Permintaan demo StaySync"
        className="demo-dialog"
      >
        <button
          className="dialog-close"
          aria-label="Tutup"
          onClick={() => setModal(false)}
        >
          <X size={20} />
        </button>
        {saved ? (
          <div className="saved-view">
            <span className="saved-icon">
              <Check size={30} />
            </span>
            <h2>Ringkasan demo tersimpan.</h2>
            <p>
              Draft untuk {form.hotel} tersimpan di browser ini.{" "}
              <strong>Belum dikirim ke tim StaySync.</strong> Unduh ringkasannya
              untuk dibagikan atau disimpan.
            </p>
            <button className="button yellow" onClick={download}>
              <Download size={16} /> Unduh ringkasan
            </button>
            <button className="text-link" onClick={() => setSaved(false)}>
              Edit informasi <ArrowRight size={14} />
            </button>
          </div>
        ) : (
          <>
            <span className="section-kicker">MARI KENALI PROPERTI ANDA</span>
            <h2>
              Lebih tenang,
              <br />
              mulai dari sini.
            </h2>
            <p>Siapkan ringkasan kebutuhan untuk demo StaySync.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                localStorage.setItem(
                  "staysync-demo-request",
                  JSON.stringify({ ...form, plan }),
                );
                setSaved(true);
              }}
            >
              <div className="form-grid">
                <label>
                  Nama lengkap
                  <input
                    autoComplete="name"
                    required
                    aria-label="Nama lengkap"
                      value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nama Anda"
                  />
                </label>
                <label>
                  Email kerja
                  <input
                    autoComplete="email"
                    type="email"
                    required
                    aria-label="Email kerja"
                      value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="nama@hotel.com"
                  />
                </label>
                <label>
                  Nama properti
                  <input
                    required
                    aria-label="Nama properti"
                      value={form.hotel}
                    onChange={(e) =>
                      setForm({ ...form, hotel: e.target.value })
                    }
                    placeholder="Hotel / villa Anda"
                  />
                </label>
                <label>
                  Jumlah kamar
                  <input
                    required
                    min="1"
                    max="10000"
                    type="number"
                    aria-label="Jumlah kamar"
                      value={form.rooms}
                    onChange={(e) =>
                      setForm({ ...form, rooms: e.target.value })
                    }
                    placeholder="24"
                  />
                </label>
              </div>
              <label>
                Nomor WhatsApp (opsional)
                <input
                  autoComplete="tel"
                  type="tel"
                  aria-label="Nomor WhatsApp"
                      value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+62"
                />
              </label>
              <label>
                Paket yang diminati
                <select value={plan} onChange={(e) => setPlan(e.target.value)}>
                  <option>Starter</option>
                  <option>Growth</option>
                  <option>Portfolio</option>
                </select>
              </label>
              <p className="form-disclaimer">
                Mode demo: data hanya disimpan di browser Anda, tidak dikirim ke
                server atau tim penjualan.
              </p>
              <button type="submit" className="button yellow">
                Simpan permintaan demo <ArrowUpRight size={16} />
              </button>
            </form>
          </>
        )}
      </dialog>
    </>
  );
}
