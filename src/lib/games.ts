export type AccountField = {
  name: string;
  label: string;
  placeholder: string;
  /** Jika diisi, field dirender sebagai dropdown. */
  options?: string[];
  inputMode?: "numeric" | "text";
};

export type Product = {
  id: string;
  /** Jumlah item, mis. "86". Kosongkan untuk paket/membership. */
  amount?: string;
  label: string;
  /** Teks kecil di bawah label, mis. "Bonus 110". */
  note?: string;
  price: number;
  /** Harga coret (sebelum diskon). */
  originalPrice?: number;
  hot?: boolean;
  /** Kelompok tab di halaman topup. */
  group: string;
};

export type CurrencyKind = "diamond" | "crystal" | "coin";

export type Game = {
  slug: string;
  name: string;
  publisher: string;
  currency: string;
  currencyKind: CurrencyKind;
  genre: "MOBA" | "RPG" | "Sandbox";
  description: string;
  images: {
    icon: string;
    /** Banner lebar ~2.16:1 untuk hero. */
    banner: string;
    /** Gambar 4:3 untuk kartu katalog. */
    card: string;
    /** object-position untuk crop banner. */
    focus?: string;
    /** object-position untuk crop kartu. */
    cardFocus?: string;
  };
  /** Warna aksen (hex) untuk glow & highlight. */
  accent: string;
  fields: AccountField[];
  howToFindId: string;
  products: Product[];
};

export const games: Game[] = [
  {
    slug: "mobile-legends",
    name: "Mobile Legends",
    publisher: "Moonton",
    currency: "Diamonds",
    currencyKind: "diamond",
    genre: "MOBA",
    description:
      "Topup Diamond Mobile Legends: Bang Bang termurah. Cukup masukkan User ID & Zone ID, pilih nominal, bayar, dan diamond langsung masuk ke akunmu.",
    images: {
      icon: "/games/ml-icon.jpg",
      banner: "/games/ml-banner.jpg",
      card: "/games/ml-banner.jpg",
      focus: "60% 30%",
      cardFocus: "52% 20%",
    },
    accent: "#38bdf8",
    fields: [
      { name: "userId", label: "User ID", placeholder: "123456789", inputMode: "numeric" },
      { name: "zoneId", label: "Zone ID", placeholder: "1234", inputMode: "numeric" },
    ],
    howToFindId:
      "Buka profil di Mobile Legends. User ID dan Zone ID tertera di bawah nama akun, contoh: 123456789 (1234).",
    products: [
      { id: "ml-5", amount: "5", label: "5 Diamonds", price: 1_500, group: "Diamonds" },
      { id: "ml-12", amount: "12", label: "12 Diamonds", price: 3_500, group: "Diamonds" },
      { id: "ml-28", amount: "28", label: "28 Diamonds", price: 8_000, group: "Diamonds" },
      { id: "ml-44", amount: "44", label: "44 Diamonds", price: 12_500, group: "Diamonds" },
      { id: "ml-86", amount: "86", label: "86 Diamonds", price: 23_500, originalPrice: 25_000, hot: true, group: "Diamonds" },
      { id: "ml-172", amount: "172", label: "172 Diamonds", price: 46_500, originalPrice: 50_000, hot: true, group: "Diamonds" },
      { id: "ml-257", amount: "257", label: "257 Diamonds", price: 69_500, group: "Diamonds" },
      { id: "ml-344", amount: "344", label: "344 Diamonds", price: 92_500, group: "Diamonds" },
      { id: "ml-429", amount: "429", label: "429 Diamonds", price: 115_500, group: "Diamonds" },
      { id: "ml-514", amount: "514", label: "514 Diamonds", price: 138_000, group: "Diamonds" },
      { id: "ml-706", amount: "706", label: "706 Diamonds", price: 185_000, originalPrice: 199_000, group: "Diamonds" },
      { id: "ml-1412", amount: "1412", label: "1412 Diamonds", price: 368_000, group: "Diamonds" },
      { id: "ml-wdp", label: "Weekly Diamond Pass", note: "Bonus diamond harian 7 hari", price: 27_000, hot: true, group: "Pass" },
      { id: "ml-wdp3", label: "Weekly Diamond Pass x3", note: "21 hari", price: 80_000, group: "Pass" },
      { id: "ml-twilight", label: "Twilight Pass", note: "Skin eksklusif + hadiah", price: 145_000, group: "Pass" },
    ],
  },
  {
    slug: "genshin-impact",
    name: "Genshin Impact",
    publisher: "HoYoverse",
    currency: "Genesis Crystals",
    currencyKind: "crystal",
    genre: "RPG",
    description:
      "Topup Genesis Crystal & Blessing of the Welkin Moon Genshin Impact. Masukkan UID dan pilih server, proses instan 24 jam.",
    images: {
      icon: "/games/gi-icon.jpg",
      banner: "/games/gi-banner.jpg",
      card: "/games/gi-banner.jpg",
      focus: "50% 25%",
      cardFocus: "80% 10%",
    },
    accent: "#fbbf24",
    fields: [
      { name: "userId", label: "UID", placeholder: "812345678", inputMode: "numeric" },
      {
        name: "server",
        label: "Server",
        placeholder: "Pilih server",
        options: ["Asia", "America", "Europe", "TW, HK, MO"],
      },
    ],
    howToFindId:
      "UID tertera di pojok kanan bawah layar saat bermain, atau buka menu Paimon lalu lihat di bawah nama karakter.",
    products: [
      { id: "gi-60", amount: "60", label: "60 Genesis Crystals", price: 15_000, group: "Genesis Crystals" },
      { id: "gi-330", amount: "330", label: "300 + 30 Genesis Crystals", note: "Bonus 30", price: 75_000, group: "Genesis Crystals" },
      { id: "gi-1090", amount: "1090", label: "980 + 110 Genesis Crystals", note: "Bonus 110", price: 230_000, originalPrice: 245_000, hot: true, group: "Genesis Crystals" },
      { id: "gi-2240", amount: "2240", label: "1980 + 260 Genesis Crystals", note: "Bonus 260", price: 465_000, group: "Genesis Crystals" },
      { id: "gi-3880", amount: "3880", label: "3280 + 600 Genesis Crystals", note: "Bonus 600", price: 740_000, group: "Genesis Crystals" },
      { id: "gi-8080", amount: "8080", label: "6480 + 1600 Genesis Crystals", note: "Bonus 1600", price: 1_475_000, originalPrice: 1_550_000, group: "Genesis Crystals" },
      { id: "gi-welkin", label: "Blessing of the Welkin Moon", note: "90 Primogem / hari selama 30 hari", price: 75_000, hot: true, group: "Membership" },
    ],
  },
  {
    slug: "roblox",
    name: "Roblox",
    publisher: "Roblox Corporation",
    currency: "Robux",
    currencyKind: "coin",
    genre: "Sandbox",
    description:
      "Beli Robux murah dan aman untuk akun Roblox kamu. Cukup masukkan username Roblox, pilih nominal, dan selesaikan pembayaran.",
    images: {
      icon: "/games/roblox-icon.jpg",
      banner: "/games/roblox-banner.jpg",
      card: "/games/roblox-card.jpg",
      focus: "50% 50%",
    },
    accent: "#34d399",
    fields: [
      { name: "username", label: "Username Roblox", placeholder: "hulaplayer", inputMode: "text" },
    ],
    howToFindId:
      "Username terlihat di halaman profil Roblox (bukan Display Name). Pastikan penulisan huruf sesuai.",
    products: [
      { id: "rbx-80", amount: "80", label: "80 Robux", price: 15_000, group: "Robux" },
      { id: "rbx-160", amount: "160", label: "160 Robux", price: 29_000, group: "Robux" },
      { id: "rbx-400", amount: "400", label: "400 Robux", price: 72_000, hot: true, group: "Robux" },
      { id: "rbx-800", amount: "800", label: "800 Robux", price: 142_000, originalPrice: 150_000, hot: true, group: "Robux" },
      { id: "rbx-1700", amount: "1700", label: "1700 Robux", price: 295_000, group: "Robux" },
      { id: "rbx-4500", amount: "4500", label: "4500 Robux", price: 745_000, originalPrice: 789_000, group: "Robux" },
      { id: "rbx-10000", amount: "10000", label: "10000 Robux", price: 1_480_000, group: "Robux" },
      { id: "rbx-premium-450", label: "Roblox Premium 450", note: "450 Robux / bulan", price: 79_000, group: "Premium" },
      { id: "rbx-premium-1000", label: "Roblox Premium 1000", note: "1000 Robux / bulan", price: 155_000, group: "Premium" },
    ],
  },
];

export function getGame(slug: string) {
  return games.find((g) => g.slug === slug);
}

export function startingPrice(game: Game) {
  return Math.min(...game.products.map((p) => p.price));
}

export function discountPercent(p: Product) {
  return p.originalPrice ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
}

/** Produk diskon yang tampil di section Flash Sale beranda. */
export const flashSale = games.flatMap((game) =>
  game.products.filter((p) => p.originalPrice).map((product) => ({ game, product })),
);

export type PaymentGroup = "QRIS" | "E-Wallet" | "Virtual Account" | "Gerai Retail";

export type PaymentMethod = {
  id: string;
  name: string;
  group: PaymentGroup;
  /** Biaya admin tetap (Rp). */
  fee: number;
};

export const paymentMethods: PaymentMethod[] = [
  { id: "qris", name: "QRIS", group: "QRIS", fee: 0 },
  { id: "dana", name: "DANA", group: "E-Wallet", fee: 500 },
  { id: "ovo", name: "OVO", group: "E-Wallet", fee: 500 },
  { id: "gopay", name: "GoPay", group: "E-Wallet", fee: 500 },
  { id: "shopeepay", name: "ShopeePay", group: "E-Wallet", fee: 500 },
  { id: "bca", name: "BCA Virtual Account", group: "Virtual Account", fee: 4_000 },
  { id: "bri", name: "BRI Virtual Account", group: "Virtual Account", fee: 3_500 },
  { id: "mandiri", name: "Mandiri Virtual Account", group: "Virtual Account", fee: 3_500 },
  { id: "bni", name: "BNI Virtual Account", group: "Virtual Account", fee: 3_500 },
  { id: "alfamart", name: "Alfamart", group: "Gerai Retail", fee: 2_500 },
  { id: "indomaret", name: "Indomaret", group: "Gerai Retail", fee: 2_500 },
];
