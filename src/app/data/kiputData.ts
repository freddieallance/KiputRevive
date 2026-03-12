export interface Word {
  id: string;
  kiput: string;
  english: string;
  pronunciation: string;
  audio: string;
  image?: string;
}

export interface Unit {
  id: number;
  title: string;
  description: string;
  color: string;
  words: Word[];
}

export interface StoryPage {
  id: string;
  text: string;
  audio: string;
  image: string;
}

export interface Story {
  id: string;
  title: string;
  excerpt: string;
  duration: string;
  coverImage: string;
  pages: StoryPage[];
}

let wordIdCount = 1;
const getWordId = () => `w${wordIdCount++}`;

// --- AI Chatbot Helper Dictionary ---
export const allKiputWords = () => kiputUnits.flatMap(u => u.words);

// --- The Vocabulary structured in 4-word units ---
export const kiputUnits: Unit[] = [
  // FAMILY
  {
    id: 1, title: "Family 1", description: "Immediate family", color: "bg-emerald-500",
    words: [
      { id: getWordId(), english: "Father", kiput: "Tamah", pronunciation: "Ta-mah", audio: "/audio/tamah.mp3" },
      { id: getWordId(), english: "Mother", kiput: "Tinah", pronunciation: "Ti-nah", audio: "/audio/tinah.mp3" },
      { id: getWordId(), english: "Brother", kiput: "Ark", pronunciation: "Ark", audio: "/audio/ark.mp3" },
      { id: getWordId(), english: "Sister", kiput: "Tukah", pronunciation: "Tu-kah", audio: "/audio/tukah.mp3" }
    ]
  },
  {
    id: 2, title: "Family 2", description: "Extended family", color: "bg-emerald-600",
    words: [
      { id: getWordId(), english: "Baby", kiput: "Anak eti", pronunciation: "A-nak e-ti", audio: "/audio/anaketi.mp3" },
      { id: getWordId(), english: "Grandfather", kiput: "Ulai", pronunciation: "U-lai", audio: "/audio/ulai.mp3" },
      { id: getWordId(), english: "Grandmother", kiput: "Uyi", pronunciation: "U-yi", audio: "/audio/uyi.mp3" },
      { id: getWordId(), english: "Family", kiput: "Kelargek", pronunciation: "Ke-lar-gek", audio: "/audio/kelargek.mp3" }
    ]
  },
  {
    id: 3, title: "Family 3", description: "Relatives", color: "bg-emerald-700",
    words: [
      { id: getWordId(), english: "Uncle", kiput: "Dik", pronunciation: "Dik", audio: "/audio/dik.mp3" },
      { id: getWordId(), english: "Aunty", kiput: "Not", pronunciation: "Not", audio: "/audio/not.mp3" }
    ]
  },

  // ANIMALS
  {
    id: 4, title: "Animals 1", description: "Pets & Birds", color: "bg-sky-500",
    words: [
      { id: getWordId(), english: "Dog", kiput: "Asau", pronunciation: "A-sau", audio: "/audio/asau.mp3" },
      { id: getWordId(), english: "Cat", kiput: "Usair", pronunciation: "U-sair", audio: "/audio/usair.mp3" },
      { id: getWordId(), english: "Bird", kiput: "Manuka", pronunciation: "Ma-nu-ka", audio: "/audio/manuka.mp3" },
      { id: getWordId(), english: "Fish", kiput: "Putak", pronunciation: "Pu-tak", audio: "/audio/putak.mp3" }
    ]
  },
  {
    id: 5, title: "Animals 2", description: "Farm Animals", color: "bg-sky-600",
    words: [
      { id: getWordId(), english: "Chicken", kiput: "An", pronunciation: "An", audio: "/audio/an_animal.mp3" },
      { id: getWordId(), english: "Duck", kiput: "Edik", pronunciation: "E-dik", audio: "/audio/edik.mp3" },
      { id: getWordId(), english: "Cow", kiput: "Kedau", pronunciation: "Ke-dau", audio: "/audio/kedau.mp3" },
      { id: getWordId(), english: "Goat", kiput: "Meak", pronunciation: "Me-ak", audio: "/audio/meak.mp3" }
    ]
  },
  {
    id: 6, title: "Animals 3", description: "Wild Animals", color: "bg-sky-700",
    words: [
      { id: getWordId(), english: "Monkey", kiput: "Ucit", pronunciation: "U-cit", audio: "/audio/ucit.mp3" },
      { id: getWordId(), english: "Snake", kiput: "Lipah", pronunciation: "Li-pah", audio: "/audio/lipah.mp3" },
      { id: getWordId(), english: "Frog", kiput: "Katak", pronunciation: "Ka-tak", audio: "/audio/katak.mp3" },
      { id: getWordId(), english: "Turtle", kiput: "Kurak", pronunciation: "Ku-rak", audio: "/audio/kurak.mp3" }
    ]
  },

  // FOOD & DRINK
  {
    id: 7, title: "Food & Drink 1", description: "Basics", color: "bg-amber-500",
    words: [
      { id: getWordId(), english: "Rice", kiput: "Kanan", pronunciation: "Ka-nan", audio: "/audio/kanan.mp3" },
      { id: getWordId(), english: "Water", kiput: "Sik", pronunciation: "Sik", audio: "/audio/sik.mp3" },
      { id: getWordId(), english: "Fish", kiput: "Putak", pronunciation: "Pu-tak", audio: "/audio/putak.mp3" },
      { id: getWordId(), english: "Banana", kiput: "Putai", pronunciation: "Pu-tai", audio: "/audio/putai_banana.mp3" }
    ]
  },
  {
    id: 8, title: "Food & Drink 2", description: "Meals & Ingredients", color: "bg-amber-600",
    words: [
      { id: getWordId(), english: "Coconut", kiput: "Butin", pronunciation: "Bu-tin", audio: "/audio/butin.mp3" },
      { id: getWordId(), english: "Chicken", kiput: "An", pronunciation: "An", audio: "/audio/an_food.mp3" },
      { id: getWordId(), english: "Soup", kiput: "Sup", pronunciation: "Sup", audio: "/audio/sup.mp3" },
      { id: getWordId(), english: "Sugar", kiput: "Gulak", pronunciation: "Gu-lak", audio: "/audio/gulak.mp3" }
    ]
  },
  {
    id: 9, title: "Food & Drink 3", description: "Spices", color: "bg-amber-700",
    words: [
      { id: getWordId(), english: "Salt", kiput: "Uek", pronunciation: "U-ek", audio: "/audio/uek.mp3" }
    ]
  },

  // NATURE
  {
    id: 10, title: "Nature 1", description: "Landscape", color: "bg-lime-500",
    words: [
      { id: getWordId(), english: "River", kiput: "Cau", pronunciation: "Cau", audio: "/audio/cau.mp3" },
      { id: getWordId(), english: "Tree", kiput: "Kacaul", pronunciation: "Ka-caul", audio: "/audio/kacaul.mp3" },
      { id: getWordId(), english: "Leaf", kiput: "Dun", pronunciation: "Dun", audio: "/audio/dun.mp3" },
      { id: getWordId(), english: "Flower", kiput: "Buek", pronunciation: "Bu-ek", audio: "/audio/buek.mp3" }
    ]
  },
  {
    id: 11, title: "Nature 2", description: "Sky", color: "bg-lime-600",
    words: [
      { id: getWordId(), english: "Mountain", kiput: "Lat", pronunciation: "Lat", audio: "/audio/lat.mp3" },
      { id: getWordId(), english: "Sun", kiput: "Matah arau", pronunciation: "Ma-tah a-rau", audio: "/audio/mataharau.mp3" },
      { id: getWordId(), english: "Moon", kiput: "Bulin", pronunciation: "Bu-lin", audio: "/audio/bulin.mp3" },
      { id: getWordId(), english: "Star", kiput: "Patak", pronunciation: "Pa-tak", audio: "/audio/patak.mp3" }
    ]
  },
  {
    id: 12, title: "Nature 3", description: "Weather", color: "bg-lime-700",
    words: [
      { id: getWordId(), english: "Rain", kiput: "Perak", pronunciation: "Pe-rak", audio: "/audio/perak.mp3" },
      { id: getWordId(), english: "Wind", kiput: "Baroi", pronunciation: "Ba-roi", audio: "/audio/baroi.mp3" }
    ]
  },

  // NUMBERS
  {
    id: 13, title: "Numbers 1", description: "1 to 4", color: "bg-violet-500",
    words: [
      { id: getWordId(), english: "One", kiput: "Silang", pronunciation: "Si-lang", audio: "/audio/silang.mp3" },
      { id: getWordId(), english: "Two", kiput: "Dufih", pronunciation: "Du-fih", audio: "/audio/dufih.mp3" },
      { id: getWordId(), english: "Three", kiput: "Terlau", pronunciation: "Ter-lau", audio: "/audio/terlau.mp3" },
      { id: getWordId(), english: "Four", kiput: "Pat", pronunciation: "Pat", audio: "/audio/pat.mp3" }
    ]
  },
  {
    id: 14, title: "Numbers 2", description: "5 to 8", color: "bg-violet-600",
    words: [
      { id: getWordId(), english: "Five", kiput: "Limah", pronunciation: "Li-mah", audio: "/audio/limah.mp3" },
      { id: getWordId(), english: "Six", kiput: "Nem", pronunciation: "Nem", audio: "/audio/nem.mp3" },
      { id: getWordId(), english: "Seven", kiput: "Tucuk", pronunciation: "Tu-cuk", audio: "/audio/tucuk.mp3" },
      { id: getWordId(), english: "Eight", kiput: "Marai", pronunciation: "Ma-rai", audio: "/audio/marai.mp3" }
    ]
  },
  {
    id: 15, title: "Numbers 3", description: "9 to 10", color: "bg-violet-700",
    words: [
      { id: getWordId(), english: "Nine", kiput: "Pai", pronunciation: "Pai", audio: "/audio/pai.mp3" },
      { id: getWordId(), english: "Ten", kiput: "Pulau", pronunciation: "Pu-lau", audio: "/audio/pulau.mp3" }
    ]
  },

  // DAILY WORDS
  {
    id: 16, title: "Daily 1", description: "Greetings", color: "bg-rose-500",
    words: [
      { id: getWordId(), english: "Hello", kiput: "Hello", pronunciation: "Hel-lo", audio: "/audio/hello.mp3" },
      { id: getWordId(), english: "Goodbye", kiput: "Bye", pronunciation: "Bye", audio: "/audio/bye.mp3" },
      { id: getWordId(), english: "Thank you", kiput: "Terima kasih", pronunciation: "Te-ri-ma ka-sih", audio: "/audio/terimakasih.mp3" },
      { id: getWordId(), english: "Please", kiput: "Tulur", pronunciation: "Tu-lur", audio: "/audio/tulur.mp3" }
    ]
  },
  {
    id: 17, title: "Daily 2", description: "Common Responses", color: "bg-rose-600",
    words: [
      { id: getWordId(), english: "Yes", kiput: "Ai", pronunciation: "Ai", audio: "/audio/ai.mp3" },
      { id: getWordId(), english: "No", kiput: "Endeh", pronunciation: "En-deh", audio: "/audio/endeh.mp3" },
      { id: getWordId(), english: "Come", kiput: "Liteh", pronunciation: "Li-teh", audio: "/audio/liteh.mp3" },
      { id: getWordId(), english: "Go", kiput: "Umau", pronunciation: "U-mau", audio: "/audio/umau.mp3" }
    ]
  },
  {
    id: 18, title: "Daily 3", description: "Actions", color: "bg-rose-700",
    words: [
      { id: getWordId(), english: "Eat", kiput: "Kuman", pronunciation: "Ku-man", audio: "/audio/kuman.mp3" },
      { id: getWordId(), english: "Drink", kiput: "Misap", pronunciation: "Mi-sap", audio: "/audio/misap.mp3" }
    ]
  },

  // COLORS
  {
    id: 19, title: "Colors 1", description: "Primary Colors", color: "bg-fuchsia-500",
    words: [
      { id: getWordId(), english: "Red", kiput: "Mang", pronunciation: "Mang", audio: "/audio/mang.mp3" },
      { id: getWordId(), english: "Blue", kiput: "Biruk", pronunciation: "Bi-ruk", audio: "/audio/biruk.mp3" },
      { id: getWordId(), english: "Green", kiput: "Gadur", pronunciation: "Ga-dur", audio: "/audio/gadur.mp3" },
      { id: getWordId(), english: "Yellow", kiput: "Kunei", pronunciation: "Ku-nei", audio: "/audio/kunei.mp3" }
    ]
  },
  {
    id: 20, title: "Colors 2", description: "More Colors", color: "bg-fuchsia-600",
    words: [
      { id: getWordId(), english: "Black", kiput: "Mitam", pronunciation: "Mi-tam", audio: "/audio/mitam.mp3" },
      { id: getWordId(), english: "White", kiput: "Putai", pronunciation: "Pu-tai", audio: "/audio/putai_white.mp3" },
      { id: getWordId(), english: "Orange", kiput: "Oren", pronunciation: "O-ren", audio: "/audio/orange.mp3" }
    ]
  },

  // SENTENCES
  {
    id: 21, title: "Family Sentences 1", description: "Basic family phrases", color: "bg-teal-500",
    words: [
      { id: getWordId(), english: "This is my father.", kiput: "Te tamah kau.", pronunciation: "Te ta-mah kau", audio: "/audio/te_tamah_kau.mp3" },
      { id: getWordId(), english: "This is my mother.", kiput: "Te tinah kau.", pronunciation: "Te ti-nah kau", audio: "/audio/te_tinah_kau.mp3" },
      { id: getWordId(), english: "I love my family.", kiput: "kau sayang keluarge kau.", pronunciation: "Kau sa-yang ke-luar-ge kau", audio: "/audio/kau_sayang_keluarge_kau.mp3" },
      { id: getWordId(), english: "My father is here.", kiput: "Tamah kau liteh.", pronunciation: "Ta-mah kau li-teh", audio: "/audio/tamah_kau_liteh.mp3" }
    ]
  },
  {
    id: 22, title: "Family Sentences 2", description: "More family phrases", color: "bg-teal-600",
    words: [
      { id: getWordId(), english: "My mother is happy.", kiput: "tinah kau gembira.", pronunciation: "Ti-nah kau gem-bi-ra", audio: "/audio/tinah_kau_gembira.mp3" },
      { id: getWordId(), english: "My brother is playing.", kiput: "Ark kau sumak.", pronunciation: "Ark kau su-mak", audio: "/audio/ark_kau_sumak.mp3" },
      { id: getWordId(), english: "My sister is laughing.", kiput: "not kau ngesel.", pronunciation: "Not kau nge-sel", audio: "/audio/not_kau_ngesel.mp3" }
    ]
  },
  {
    id: 23, title: "Daily Activity 1", description: "Morning routine", color: "bg-blue-500",
    words: [
      { id: getWordId(), english: "I wake up early.", kiput: "kau mikat awin.", pronunciation: "Kau mi-kat a-win", audio: "/audio/kau_mikat_awin.mp3" },
      { id: getWordId(), english: "I brush my teeth.", kiput: "kau merus lipan.", pronunciation: "Kau me-rus li-pan", audio: "/audio/kau_merus_lipan.mp3" },
      { id: getWordId(), english: "I wash my hands.", kiput: "kau surek ngan.", pronunciation: "Kau su-rek ngan", audio: "/audio/kau_surek_ngan.mp3" },
      { id: getWordId(), english: "I eat breakfast.", kiput: "kau kuman serapan pagi.", pronunciation: "Kau ku-man se-ra-pan pa-gi", audio: "/audio/kau_kuman_serapan_pagi.mp3" }
    ]
  },
  {
    id: 24, title: "Daily Activity 2", description: "School and reading", color: "bg-blue-600",
    words: [
      { id: getWordId(), english: "I go to school.", kiput: "kau umau sekulah.", pronunciation: "Kau u-mau se-ku-lah", audio: "/audio/kau_umau_sekulah.mp3" },
      { id: getWordId(), english: "I read a book.", kiput: "kau maceh book.", pronunciation: "Kau ma-ceh book", audio: "/audio/kau_maceh_book.mp3" },
      { id: getWordId(), english: "I drink water.", kiput: "kau misap sik.", pronunciation: "Kau mi-sap sik", audio: "/audio/kau_misap_sik.mp3" }
    ]
  },
  {
    id: 25, title: "Nature Sentences 1", description: "Around us", color: "bg-emerald-500",
    words: [
      { id: getWordId(), english: "The sun is bright.", kiput: "matah arau yang kesen.", pronunciation: "Ma-tah a-rau yang ke-sen", audio: "/audio/matah_arau_yang_kesen.mp3" },
      { id: getWordId(), english: "The sky is blue.", kiput: "langet yang biruk.", pronunciation: "La-nget yang bi-ruk", audio: "/audio/langet_yang_biruk.mp3" },
      { id: getWordId(), english: "The river is big.", kiput: "cau yang derceh.", pronunciation: "Cau yang der-ceh", audio: "/audio/cau_yang_derceh.mp3" },
      { id: getWordId(), english: "The tree is tall.", kiput: "kacau yang sequl.", pronunciation: "Ka-cau yang se-qul", audio: "/audio/kacau_yang_sequl.mp3" }
    ]
  },
  {
    id: 26, title: "Nature Sentences 2", description: "Animals and weather", color: "bg-emerald-600",
    words: [
      { id: getWordId(), english: "The bird can fly.", kiput: "manuk mecik tulok.", pronunciation: "Ma-nuk me-cik tu-lok", audio: "/audio/manuk_mecik_tulok.mp3" },
      { id: getWordId(), english: "The fish swims in water.", kiput: "putak pelangau alam sik.", pronunciation: "Pu-tak pe-la-ngau a-lam sik", audio: "/audio/putak_pelangau_alam_sik.mp3" },
      { id: getWordId(), english: "The wind is strong.", kiput: "baroi yang kesen.", pronunciation: "Ba-roi yang ke-sen", audio: "/audio/baroi_yang_kesen.mp3" }
    ]
  },
  {
    id: 27, title: "Animal Sentences 1", description: "Pets & Farm", color: "bg-orange-500",
    words: [
      { id: getWordId(), english: "The cat is small.", kiput: "usair ye etit.", pronunciation: "U-sair ye e-tit", audio: "/audio/usair_ye_etit.mp3" },
      { id: getWordId(), english: "The bird sings.", kiput: "manuk belaguk.", pronunciation: "Ma-nuk be-la-guk", audio: "/audio/manuk_belaguk.mp3" },
      { id: getWordId(), english: "The cow eats grass.", kiput: "kebau kuman rumput.", pronunciation: "Ke-bau ku-man rum-put", audio: "/audio/kebau_kuman_rumput.mp3" }
    ]
  },
  {
    id: 28, title: "Animal Sentences 2", description: "Wild Animals", color: "bg-orange-600",
    words: [
      { id: getWordId(), english: "The chicken walks.", kiput: "an makau.", pronunciation: "An ma-kau", audio: "/audio/an_makau.mp3" },
      { id: getWordId(), english: "The fish swims.", kiput: "putak pelangau.", pronunciation: "Pu-tak pe-la-ngau", audio: "/audio/putak_pelangau.mp3" },
      { id: getWordId(), english: "The monkey climbs the tree.", kiput: "ucit minat kacaul.", pronunciation: "U-cit mi-nat ka-caul", audio: "/audio/ucit_minat_kacaul.mp3" }
    ]
  },
  {
    id: 29, title: "Emotion Sentences 1", description: "Feelings", color: "bg-pink-500",
    words: [
      { id: getWordId(), english: "I am happy.", kiput: "kau gembira.", pronunciation: "Kau gem-bi-ra", audio: "/audio/kau_gembira.mp3" },
      { id: getWordId(), english: "I am sad.", kiput: "kau sedih.", pronunciation: "Kau se-dih", audio: "/audio/kau_sedih.mp3" },
      { id: getWordId(), english: "I am tired.", kiput: "kau darai.", pronunciation: "Kau da-rai", audio: "/audio/kau_darai.mp3" }
    ]
  },
  {
    id: 30, title: "Emotion Sentences 2", description: "Needs", color: "bg-pink-600",
    words: [
      { id: getWordId(), english: "I am hungry.", kiput: "kau bucen.", pronunciation: "Kau bu-cen", audio: "/audio/kau_bucen.mp3" },
      { id: getWordId(), english: "I am sleepy.", kiput: "kau pudek.", pronunciation: "Kau pu-dek", audio: "/audio/kau_pudek.mp3" }
    ]
  },
  {
    id: 31, title: "School Sentences 1", description: "Learning", color: "bg-indigo-500",
    words: [
      { id: getWordId(), english: "I like my school.", kiput: "kau suka sekulah kau.", pronunciation: "Kau su-ka se-ku-lah kau", audio: "/audio/kau_suka_sekulah_kau.mp3" },
      { id: getWordId(), english: "My teacher is kind.", kiput: "guruk kau cek.", pronunciation: "Gu-ruk kau cek", audio: "/audio/guruk_kau_cek.mp3" },
      { id: getWordId(), english: "I learn new words.", kiput: "kau belajen ayat barau.", pronunciation: "Kau be-la-jen a-yat ba-rau", audio: "/audio/kau_belajen_ayat_barau.mp3" }
    ]
  },
  {
    id: 32, title: "School Sentences 2", description: "Activities", color: "bg-indigo-600",
    words: [
      { id: getWordId(), english: "I write in my book.", kiput: "kau nulis alam book kau.", pronunciation: "Kau nu-lis a-lam book kau", audio: "/audio/kau_nulis_alam_book_kau.mp3" },
      { id: getWordId(), english: "I draw a picture.", kiput: "kau lukis gamber.", pronunciation: "Kau lu-kis gam-ber", audio: "/audio/kau_lukis_gamber.mp3" },
      { id: getWordId(), english: "I play with my friends.", kiput: "kau sumak ron kaueng kau.", pronunciation: "Kau su-mak ron kau-eng kau", audio: "/audio/kau_sumak_ron_kaueng_kau.mp3" }
    ]
  },
  {
    id: 33, title: "Questions", description: "Simple Questions", color: "bg-purple-500",
    words: [
      { id: getWordId(), english: "What is your name?", kiput: "Padin adin nau?", pronunciation: "Pa-din a-din nau?", audio: "/audio/padin_adin_nau.mp3" },
      { id: getWordId(), english: "Where are you going?", kiput: "linek nau?", pronunciation: "Li-nek nau?", audio: "/audio/linek_nau.mp3" },
      { id: getWordId(), english: "Can you read this word?", kiput: "adi nau macek ayat teh?", pronunciation: "A-di nau ma-cek a-yat teh?", audio: "/audio/adi_nau_macek_ayat_teh.mp3" },
      { id: getWordId(), english: "Who is your friend?", kiput: "sapa kaueng nau?", pronunciation: "Sa-pa kau-eng nau?", audio: "/audio/sapa_kaueng_nau.mp3" }
    ]
  },
  
  // NEW DAILY WORDS
  {
    id: 34, title: "Daily 4", description: "People & Questions", color: "bg-rose-500",
    words: [
      { id: getWordId(), english: "I / Me", kiput: "Kau", pronunciation: "Kau", audio: "/audio/kau.mp3" },
      { id: getWordId(), english: "You", kiput: "Nau", pronunciation: "Nau", audio: "/audio/nau.mp3" },
      { id: getWordId(), english: "Who", kiput: "Sapa", pronunciation: "Sa-pa", audio: "/audio/sapa.mp3" },
      { id: getWordId(), english: "Friend", kiput: "Kaueng", pronunciation: "Kau-eng", audio: "/audio/kaueng.mp3" }
    ]
  },
  {
    id: 35, title: "Daily 5", description: "Feelings", color: "bg-rose-600",
    words: [
      { id: getWordId(), english: "Sad", kiput: "Sedih", pronunciation: "Se-dih", audio: "/audio/sedih.mp3" },
      { id: getWordId(), english: "Tired", kiput: "Darai", pronunciation: "Da-rai", audio: "/audio/darai.mp3" },
      { id: getWordId(), english: "Hungry", kiput: "Bucen", pronunciation: "Bu-cen", audio: "/audio/bucen.mp3" },
      { id: getWordId(), english: "Sleepy", kiput: "Pudek", pronunciation: "Pu-dek", audio: "/audio/pudek.mp3" }
    ]
  },
  {
    id: 36, title: "Daily 6", description: "Learning & Play", color: "bg-rose-700",
    words: [
      { id: getWordId(), english: "Play", kiput: "Sumak", pronunciation: "Su-mak", audio: "/audio/sumak.mp3" },
      { id: getWordId(), english: "Learn", kiput: "Belajen", pronunciation: "Be-la-jen", audio: "/audio/belajen.mp3" },
      { id: getWordId(), english: "Read", kiput: "Maceh", pronunciation: "Ma-ceh", audio: "/audio/maceh.mp3" },
      { id: getWordId(), english: "Book", kiput: "Buk", pronunciation: "Buk", audio: "/audio/buk.mp3" }
    ]
  },
  {
    id: 37, title: "Daily 7", description: "Routine", color: "bg-rose-800",
    words: [
      { id: getWordId(), english: "Wake up", kiput: "Mikat", pronunciation: "Mi-kat", audio: "/audio/mikat.mp3" },
      { id: getWordId(), english: "Early", kiput: "Awin", pronunciation: "A-win", audio: "/audio/awin.mp3" },
      { id: getWordId(), english: "Teeth", kiput: "Lipan", pronunciation: "Li-pan", audio: "/audio/lipan.mp3" },
      { id: getWordId(), english: "New", kiput: "Barau", pronunciation: "Ba-rau", audio: "/audio/barau.mp3" }
    ]
  }
];

// --- STORY DATA ---
export const kiputStories: Story[] = [
  {
    id: 's0',
    title: "The Story of the Kiput People and the Baram River",
    excerpt: "Origin: The Kiput people live on the banks of the Baram River. They are great warriors and farmers.",
    duration: "4 pages",
    coverImage: "https://images.unsplash.com/photo-1768701162087-85ee9dcda8b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpZ2Vub3VzJTIwcGVvcGxlJTIwYm9ybmVvfGVufDF8fHx8MTc3MzI4MjA4MHww&ixlib=rb-4.1.0&q=80&w=1080",
    pages: [
      {
        id: "s0_p1",
        text: "Origin: The Kiput people live on the banks of the Baram River. They are great warriors and farmers. The name “Kiput” is said to come from the name of a small river in their original area.",
        audio: "/audio/stories/kiput_page1.mp3",
        image: "/pictures/baram2.jpg"
      },
      {
        id: "s0_p2",
        text: "Their Life: They are skilled at building longhouses. Their houses are very strong and tall to avoid floods and enemy attacks. The men hunt in the forest, while the women are skilled in making handicrafts.",
        audio: "/audio/stories/kiput_page2.mp3",
        image: "https://images.unsplash.com/photo-1559972501-fbf85ed4c375?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25naG91c2UlMjBib3JuZW98ZW58MXx8fHwxNzczMjgyMDkwfDA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        id: "s0_p3",
        text: "Language Uniqueness: The Kiput language is very unique and different from other tribes in Sarawak. Although they are a small group, they are very proud of their heritage. They preserve their customs so they are not lost over time.",
        audio: "/audio/stories/kiput_page3.mp3",
        image: "https://images.unsplash.com/photo-1731946605621-1c552e3fe1b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMHdlYXZpbmclMjBoYW5kaWNyYWZ0c3xlbnwxfHx8fDE3NzMyODIwOTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
      },
      {
        id: "s0_p4",
        text: "Core Values: The Kiput people value cooperation (gotong-royong). They believe that if everyone works together, heavy work becomes light.",
        audio: "/audio/stories/kiput_page4.mp3",
        image: "https://images.unsplash.com/photo-1598015132635-131afe3ba07f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JraW5nJTIwdG9nZXRoZXIlMjB0ZWFtJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzczMjgyMDkwfDA&ixlib=rb-4.1.0&q=80&w=1080"
      }
    ]
  },
  {
    id: 's1',
    title: "Princess Santubong & Princess Sejinjang",
    excerpt: "Long ago, there were two beautiful princesses: Princess Santubong and Princess Sejinjang.",
    duration: "8 pages",
    coverImage: "/pictures/stories/psps1.png",
    pages: [
      {
        id: "p1",
        text: "Long ago, there were two beautiful princesses: Princess Santubong and Princess Sejinjang.",
        audio: "/audio/stories/santubong_page1.mp3",
        image: "/pictures/stories/psps1.png"
      },
      {
        id: "p2",
        text: "Santubong was skilled at weaving cloth, while Sejinjang was skilled at pounding rice.",
        audio: "/audio/stories/santubong_page2.mp3",
        image: "/pictures/stories/psps3.png"
      },
      {
        id: "p3",
        text: "Over time, they became arrogant. They argued about who was greater.",
        audio: "/audio/stories/santubong_page3.mp3",
        image: "/pictures/stories/psps4.png"
      },
      {
        id: "p4",
        text: "\"My cloth is more beautiful!\" said Santubong.\n\"My rice is more important!\" replied Sejinjang.",
        audio: "/audio/stories/santubong_page4.mp3",
        image: "/pictures/stories/psps4.png"
      },
      {
        id: "p5",
        text: "They became very angry. Sejinjang threw a pestle (a wooden tool used for pounding rice) at Santubong’s face.",
        audio: "/audio/stories/santubong_page5.mp3",
        image: "/pictures/stories/psps5.png"
      },
      {
        id: "p6",
        text: "Santubong then threw her weaving tool at Sejinjang.",
        audio: "/audio/stories/santubong_page6.mp3",
        image: "/pictures/stories/psps5.png"
      },
      {
        id: "p7",
        text: "A curse took effect. Santubong turned into Mount Santubong.",
        audio: "/audio/stories/santubong_page7.mp3",
        image: "/pictures/stories/psps6.png"
      },
      {
        id: "p8",
        text: "Sejinjang turned into small islands.\n\Let us not be arrogant and quarrelsome!.",
        audio: "/audio/stories/santubong_page8.mp3",
        image: "/pictures/stories/psps7.png"
      }
    ]
  }
];
