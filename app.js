const ROWS = ["a", "k", "s", "t", "n", "h", "m", "y", "r", "w", "n-only"];

const BASE = {
  a: [
    ["a", "あ", "ア"],
    ["i", "い", "イ"],
    ["u", "う", "ウ"],
    ["e", "え", "エ"],
    ["o", "お", "オ"]
  ],
  k: [
    ["ka", "か", "カ"],
    ["ki", "き", "キ"],
    ["ku", "く", "ク"],
    ["ke", "け", "ケ"],
    ["ko", "こ", "コ"]
  ],
  s: [
    [["sa"], "さ", "サ"],
    [["shi", "si"], "し", "シ"],
    [["su"], "す", "ス"],
    [["se"], "せ", "セ"],
    [["so"], "そ", "ソ"]
  ],
  t: [
    [["ta"], "た", "タ"],
    [["chi", "ti"], "ち", "チ"],
    [["tsu", "tu"], "つ", "ツ"],
    [["te"], "て", "テ"],
    [["to"], "と", "ト"]
  ],
  n: [
    ["na", "な", "ナ"],
    ["ni", "に", "ニ"],
    ["nu", "ぬ", "ヌ"],
    ["ne", "ね", "ネ"],
    ["no", "の", "ノ"]
  ],
  h: [
    ["ha", "は", "ハ"],
    ["hi", "ひ", "ヒ"],
    [["fu", "hu"], "ふ", "フ"],
    ["he", "へ", "ヘ"],
    ["ho", "ほ", "ホ"]
  ],
  m: [
    ["ma", "ま", "マ"],
    ["mi", "み", "ミ"],
    ["mu", "む", "ム"],
    ["me", "め", "メ"],
    ["mo", "も", "モ"]
  ],
  y: [
    ["ya", "や", "ヤ"],
    ["yu", "ゆ", "ユ"],
    ["yo", "よ", "ヨ"]
  ],
  r: [
    ["ra", "ら", "ラ"],
    ["ri", "り", "リ"],
    ["ru", "る", "ル"],
    ["re", "れ", "レ"],
    ["ro", "ろ", "ロ"]
  ],
  w: [
    ["wa", "わ", "ワ"],
    [["wo", "o"], "を", "ヲ"]
  ],
  "n-only": [
    [["n", "nn"], "ん", "ン"]
  ]
};

const DAKUTEN = [
  ["ga", "が", "ガ", "k"],
  ["gi", "ぎ", "ギ", "k"],
  ["gu", "ぐ", "グ", "k"],
  ["ge", "げ", "ゲ", "k"],
  ["go", "ご", "ゴ", "k"],
  [["ji", "zi"], "じ", "ジ", "s"],
  ["za", "ざ", "ザ", "s"],
  ["zu", "ず", "ズ", "s"],
  ["ze", "ぜ", "ゼ", "s"],
  ["zo", "ぞ", "ゾ", "s"],
  [["da"], "だ", "ダ", "t"],
  [["de"], "で", "デ", "t"],
  [["do"], "ど", "ド", "t"],
  [["ji", "di"], "ぢ", "ヂ", "t"],
  [["zu", "du"], "づ", "ヅ", "t"],
  ["ba", "ば", "バ", "h"],
  ["bi", "び", "ビ", "h"],
  ["bu", "ぶ", "ブ", "h"],
  ["be", "べ", "ベ", "h"],
  ["bo", "ぼ", "ボ", "h"]
];

const HANDAKUTEN = [
  ["pa", "ぱ", "パ", "h"],
  ["pi", "ぴ", "ピ", "h"],
  ["pu", "ぷ", "プ", "h"],
  ["pe", "ぺ", "ペ", "h"],
  ["po", "ぽ", "ポ", "h"]
];

const SMALL = [
  [["xya", "lya"], "ゃ", "ャ", "y"],
  [["xyu", "lyu"], "ゅ", "ュ", "y"],
  [["xyo", "lyo"], "ょ", "ョ", "y"],
  [["xa", "la"], "ぁ", "ァ", "a"],
  [["xi", "li"], "ぃ", "ィ", "a"],
  [["xu", "lu"], "ぅ", "ゥ", "a"],
  [["xe", "le"], "ぇ", "ェ", "a"],
  [["xo", "lo"], "ぉ", "ォ", "a"]
];

const SOKUON = [
  [["xtsu", "ltsu", "xtu", "ltu"], "っ", "ッ", "t"]
];

const WORDS = [
  { kana: "さくら", answers: ["sakura"], script: "hiragana" },
  { kana: "ねこ", answers: ["neko"], script: "hiragana" },
  { kana: "がっこう", answers: ["gakkou", "gakkō"], script: "hiragana", hasSokuon: true, hasDakuten: true },
  { kana: "きょう", answers: ["kyou", "kyō"], script: "hiragana", hasSmall: true, hasK: true },
  { kana: "ぱん", answers: ["pan"], script: "hiragana", hasHandakuten: true },
  { kana: "きしゃ", answers: ["kisha"], script: "hiragana", hasK: true },
  { kana: "カメラ", answers: ["kamera"], script: "katakana", hasK: true },
  { kana: "ケーキ", answers: ["keeki", "kēki", "ke-ki"], script: "katakana", hasK: true },
  { kana: "コーヒー", answers: ["koohii", "kōhī", "ko-hi-"], script: "katakana", hasK: true },
  { kana: "バッグ", answers: ["baggu"], script: "katakana", hasDakuten: true, hasSokuon: true },
  { kana: "キャット", answers: ["kyatto"], script: "katakana", hasSmall: true, hasSokuon: true, hasK: true },
  { kana: "パン", answers: ["pan"], script: "katakana", hasHandakuten: true }
];

const state = {
  scripts: new Set(["hiragana", "katakana"]),
  scope: "table",
  selectedRows: new Set(ROWS),
  selectedCharIds: new Set(),
  includeDakuten: true,
  includeHandakuten: true,
  includeSokuon: true,
  includeSmall: true,
  kOnly: false,
  pools: {
    single: [],
    words: []
  },
  inputQuestion: null,
  chooseQuestion: null,
  flashQuestion: null,
  flashRevealed: false,
  inputStreak: 0
};

const refs = {
  scriptHiragana: document.getElementById("scriptHiragana"),
  scriptKatakana: document.getElementById("scriptKatakana"),
  scope: [...document.querySelectorAll("input[name='scope']")],
  rowPickerWrap: document.getElementById("rowPickerWrap"),
  rowPicker: document.getElementById("rowPicker"),
  customPickerWrap: document.getElementById("customPickerWrap"),
  customPicker: document.getElementById("customPicker"),
  toggleDakuten: document.getElementById("toggleDakuten"),
  toggleHandakuten: document.getElementById("toggleHandakuten"),
  toggleSokuon: document.getElementById("toggleSokuon"),
  toggleSmall: document.getElementById("toggleSmall"),
  toggleKOnly: document.getElementById("toggleKOnly"),
  poolStats: document.getElementById("poolStats"),
  tabs: [...document.querySelectorAll(".tab")],
  tabBodies: [...document.querySelectorAll(".tabBody")],
  inputModeType: document.getElementById("inputModeType"),
  inputNextBtn: document.getElementById("inputNextBtn"),
  inputPrompt: document.getElementById("inputPrompt"),
  inputForm: document.getElementById("inputForm"),
  inputAnswer: document.getElementById("inputAnswer"),
  inputRevealBtn: document.getElementById("inputRevealBtn"),
  inputFeedback: document.getElementById("inputFeedback"),
  inputStreak: document.getElementById("inputStreak"),
  inputStreakCount: document.getElementById("inputStreakCount"),
  chooseModeType: document.getElementById("chooseModeType"),
  chooseNextBtn: document.getElementById("chooseNextBtn"),
  choosePrompt: document.getElementById("choosePrompt"),
  chooseOptions: document.getElementById("chooseOptions"),
  chooseFeedback: document.getElementById("chooseFeedback"),
  flashModeType: document.getElementById("flashModeType"),
  flashNextBtn: document.getElementById("flashNextBtn"),
  flashCard: document.getElementById("flashCard"),
  flashFront: document.getElementById("flashFront"),
  flashBack: document.getElementById("flashBack"),
  chartScript: document.getElementById("chartScript"),
  chartShowRomaji: document.getElementById("chartShowRomaji"),
  chartHint: document.getElementById("chartHint"),
  chartBody: document.getElementById("chartBody"),
  typingTime: document.getElementById("typingTime"),
  typingWpm: document.getElementById("typingWpm"),
  typingCorrect: document.getElementById("typingCorrect"),
  typingWrong: document.getElementById("typingWrong"),
  typingBest: document.getElementById("typingBest"),
  typingStrip: document.getElementById("typingStrip"),
  typingInput: document.getElementById("typingInput"),
  typingRestart: document.getElementById("typingRestart"),
  typingResult: document.getElementById("typingResult")
};

// ---------- Alphabet chart ----------

const VOWELS = ["a", "i", "u", "e", "o"];

// Layout rows by hiragana; null = empty cell in the gojūon grid.
const CHART_BASIC = [
  ["a", ["あ", "い", "う", "え", "お"]],
  ["k", ["か", "き", "く", "け", "こ"]],
  ["s", ["さ", "し", "す", "せ", "そ"]],
  ["t", ["た", "ち", "つ", "て", "と"]],
  ["n", ["な", "に", "ぬ", "ね", "の"]],
  ["h", ["は", "ひ", "ふ", "へ", "ほ"]],
  ["m", ["ま", "み", "む", "め", "も"]],
  ["y", ["や", null, "ゆ", null, "よ"]],
  ["r", ["ら", "り", "る", "れ", "ろ"]],
  ["w", ["わ", null, null, null, "を"]],
  ["n", ["ん", null, null, null, null]]
];

const CHART_VOICED = [
  ["g", ["が", "ぎ", "ぐ", "げ", "ご"]],
  ["z", ["ざ", "じ", "ず", "ぜ", "ぞ"]],
  ["d", ["だ", "ぢ", "づ", "で", "ど"]],
  ["b", ["ば", "び", "ぶ", "べ", "ぼ"]],
  ["p", ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ"]]
];

const CHART_SMALL = [
  ["", ["ぁ", "ぃ", "ぅ", "ぇ", "ぉ"]],
  ["", ["ゃ", null, "ゅ", null, "ょ"]],
  ["", [null, null, "っ", null, null]]
];

const YOON_BASES = [
  ["き", "ky"], ["し", "sh"], ["ち", "ch"], ["に", "ny"], ["ひ", "hy"],
  ["み", "my"], ["り", "ry"], ["ぎ", "gy"], ["じ", "j"], ["び", "by"], ["ぴ", "py"]
];

const CHART_YOON = YOON_BASES.map(([base, prefix]) => [
  prefix,
  [base + "ゃ", base + "ゅ", base + "ょ"],
  ["a", "u", "o"].map((v) => prefix + v)
]);

const toKatakana = (hira) => [...hira].map((ch) => String.fromCharCode(ch.charCodeAt(0) + 0x60)).join("");

const HIRA_TO_ROMAJI = (() => {
  const map = new Map();
  const add = (raw) => map.set(raw[1], Array.isArray(raw[0]) ? raw[0][0] : raw[0]);
  Object.values(BASE).flat().forEach(add);
  [...DAKUTEN, ...HANDAKUTEN, ...SMALL, ...SOKUON].forEach(add);
  return map;
})();

const chartState = { script: "hiragana", showRomaji: true };
const canSpeak = "speechSynthesis" in window && typeof SpeechSynthesisUtterance === "function";

function makeKanaCell(hira, romaji) {
  if (!hira) {
    const empty = document.createElement("div");
    empty.className = "kanaCell empty";
    empty.setAttribute("aria-hidden", "true");
    return empty;
  }

  const kata = toKatakana(hira);
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "kanaCell";

  const kana = document.createElement("span");
  kana.className = "kana";
  if (chartState.script === "hiragana") kana.textContent = hira;
  else if (chartState.script === "katakana") kana.textContent = kata;
  else {
    kana.textContent = hira;
    const alt = document.createElement("span");
    alt.className = "alt";
    alt.textContent = kata;
    kana.appendChild(alt);
  }

  const ro = document.createElement("span");
  ro.className = "romaji";
  ro.textContent = romaji;

  btn.append(kana, ro);
  btn.setAttribute("aria-label", `${hira} ${kata} ${romaji}`);
  btn.addEventListener("click", () => speakKana(hira, btn));
  return btn;
}

function makeChartSection(title, rows, { cols = 5, header = VOWELS, romajiFor } = {}) {
  const section = document.createElement("div");
  section.className = "chartSection";
  const h = document.createElement("h3");
  h.textContent = title;
  section.appendChild(h);

  const grid = document.createElement("div");
  grid.className = "kanaGrid";
  grid.style.setProperty("--cols", cols);

  grid.appendChild(document.createElement("span"));
  header.forEach((label) => {
    const axis = document.createElement("span");
    axis.className = "axis";
    axis.textContent = label;
    grid.appendChild(axis);
  });

  rows.forEach((row) => {
    const axis = document.createElement("span");
    axis.className = "axis";
    axis.textContent = row[0];
    grid.appendChild(axis);
    row[1].forEach((hira, i) => grid.appendChild(makeKanaCell(hira, romajiFor(row, hira, i))));
  });

  section.appendChild(grid);
  return section;
}

function renderChart() {
  const lookup = (_row, hira) => (hira ? HIRA_TO_ROMAJI.get(hira) : "");
  refs.chartBody.replaceChildren(
    makeChartSection("Âm cơ bản (Gojūon)", CHART_BASIC, { romajiFor: lookup }),
    makeChartSection("Âm đục (Dakuten) & âm bán đục (Handakuten)", CHART_VOICED, { romajiFor: lookup }),
    makeChartSection("Âm ghép (Yōon)", CHART_YOON, {
      cols: 3,
      header: ["ya", "yu", "yo"],
      romajiFor: (row, _hira, i) => row[2][i]
    }),
    makeChartSection("Chữ nhỏ", CHART_SMALL, { romajiFor: lookup })
  );
  refs.chartBody.classList.toggle("hideRomaji", !chartState.showRomaji);
}

let jaVoice = null;
function pickJaVoice() {
  if (!canSpeak) return;
  jaVoice = speechSynthesis.getVoices().find((v) => v.lang && v.lang.toLowerCase().startsWith("ja")) || null;
}

function speakKana(hira, btn) {
  if (!canSpeak) return;
  // っ alone has no sound; read its name instead.
  const text = hira === "っ" ? "ちいさいつ" : hira;
  speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "ja-JP";
  if (jaVoice) utter.voice = jaVoice;
  utter.rate = 0.8;
  btn.classList.add("playing");
  utter.onend = utter.onerror = () => btn.classList.remove("playing");
  speechSynthesis.speak(utter);
}

function bindChart() {
  [...refs.chartScript.querySelectorAll("button")].forEach((btn) => {
    btn.addEventListener("click", () => {
      chartState.script = btn.dataset.script;
      [...refs.chartScript.children].forEach((b) => b.classList.toggle("active", b === btn));
      renderChart();
    });
  });
  refs.chartShowRomaji.addEventListener("change", () => {
    chartState.showRomaji = refs.chartShowRomaji.checked;
    refs.chartBody.classList.toggle("hideRomaji", !chartState.showRomaji);
  });
  if (canSpeak) {
    pickJaVoice();
    speechSynthesis.addEventListener?.("voiceschanged", pickJaVoice);
  } else {
    refs.chartHint.textContent = "Trình duyệt không hỗ trợ đọc phát âm.";
  }
  renderChart();
}

function toEntry(raw, row, script) {
  const answers = Array.isArray(raw[0]) ? raw[0] : [raw[0]];
  const kana = script === "hiragana" ? raw[1] : raw[2];
  return {
    id: `${script}-${kana}`,
    script,
    row,
    kana,
    answers
  };
}

function makeAllEntries() {
  const all = [];

  for (const row of Object.keys(BASE)) {
    for (const item of BASE[row]) {
      all.push(toEntry(item, row, "hiragana"));
      all.push(toEntry(item, row, "katakana"));
    }
  }

  for (const item of DAKUTEN) {
    all.push(toEntry(item, item[3], "hiragana"));
    all.push(toEntry(item, item[3], "katakana"));
  }

  for (const item of HANDAKUTEN) {
    all.push(toEntry(item, item[3], "hiragana"));
    all.push(toEntry(item, item[3], "katakana"));
  }

  for (const item of SMALL) {
    all.push(toEntry(item, item[3], "hiragana"));
    all.push(toEntry(item, item[3], "katakana"));
  }

  for (const item of SOKUON) {
    all.push(toEntry(item, item[3], "hiragana"));
    all.push(toEntry(item, item[3], "katakana"));
  }

  return all;
}

const ALL_ENTRIES = makeAllEntries();

function sanitizeRomaji(text) {
  return text
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[\u30fc\u2010-\u2015\u2212]/g, "-");
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function pickN(list, n) {
  const cloned = [...list];
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned.slice(0, n);
}

function buildRowPicker() {
  refs.rowPicker.innerHTML = "";
  for (const row of ROWS) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = row;
    input.checked = true;
    input.addEventListener("change", () => {
      if (input.checked) {
        state.selectedRows.add(row);
      } else {
        state.selectedRows.delete(row);
      }
      refreshPools();
    });
    label.appendChild(input);
    label.append(` ${row}`);
    refs.rowPicker.appendChild(label);
  }
}

function buildCustomPickerOptions() {
  refs.customPicker.innerHTML = "";

  const scriptFiltered = ALL_ENTRIES.filter((entry) => state.scripts.has(entry.script));

  const advancedFiltered = scriptFiltered.filter((entry) => {
    const isDakuten = DAKUTEN.some((it) => (entry.script === "hiragana" ? it[1] : it[2]) === entry.kana);
    const isHandakuten = HANDAKUTEN.some((it) => (entry.script === "hiragana" ? it[1] : it[2]) === entry.kana);
    const isSmall = SMALL.some((it) => (entry.script === "hiragana" ? it[1] : it[2]) === entry.kana);
    const isSokuon = SOKUON.some((it) => (entry.script === "hiragana" ? it[1] : it[2]) === entry.kana);

    if (!state.includeDakuten && isDakuten) return false;
    if (!state.includeHandakuten && isHandakuten) return false;
    if (!state.includeSmall && isSmall) return false;
    if (!state.includeSokuon && isSokuon) return false;
    if (state.kOnly && entry.row !== "k") return false;
    return true;
  });

  for (const entry of advancedFiltered) {
    const option = document.createElement("option");
    option.value = entry.id;
    option.textContent = `${entry.kana} (${entry.answers[0]}) - ${entry.script}`;
    option.selected = state.selectedCharIds.has(entry.id);
    refs.customPicker.appendChild(option);
  }
}

function isInBase(entry) {
  return Object.values(BASE).flat().some((it) => (entry.script === "hiragana" ? it[1] : it[2]) === entry.kana);
}

function matchesAdvanced(entry) {
  const matchIn = (group) => group.some((it) => (entry.script === "hiragana" ? it[1] : it[2]) === entry.kana);
  const isDakuten = matchIn(DAKUTEN);
  const isHandakuten = matchIn(HANDAKUTEN);
  const isSmall = matchIn(SMALL);
  const isSokuon = matchIn(SOKUON);

  if (!state.includeDakuten && isDakuten) return false;
  if (!state.includeHandakuten && isHandakuten) return false;
  if (!state.includeSmall && isSmall) return false;
  if (!state.includeSokuon && isSokuon) return false;
  if (state.kOnly && entry.row !== "k") return false;

  return true;
}

function buildSinglePool() {
  let pool = ALL_ENTRIES.filter((entry) => state.scripts.has(entry.script) && matchesAdvanced(entry));

  if (state.scope === "table") {
    return pool;
  }

  if (state.scope === "row") {
    pool = pool.filter((entry) => state.selectedRows.has(entry.row));
    return pool;
  }

  pool = pool.filter((entry) => state.selectedCharIds.has(entry.id));
  return pool;
}

function buildWordPool() {
  // In row / custom scope, a word only qualifies if every kana in it is in the
  // currently allowed single-character pool (the long-vowel mark ー is always allowed).
  const restrictToChars = state.scope !== "table";
  const allowedKana = new Set(state.pools.single.map((entry) => entry.kana));

  return WORDS.filter((word) => {
    if (restrictToChars && ![...word.kana].every((ch) => ch === "ー" || allowedKana.has(ch))) return false;
    if (!state.scripts.has(word.script)) return false;
    if (!state.includeDakuten && word.hasDakuten) return false;
    if (!state.includeHandakuten && word.hasHandakuten) return false;
    if (!state.includeSmall && word.hasSmall) return false;
    if (!state.includeSokuon && word.hasSokuon) return false;
    if (state.kOnly && !word.hasK) return false;
    return true;
  });
}

function updateStats() {
  refs.poolStats.textContent = `Chữ khả dụng: ${state.pools.single.length} | Từ khả dụng: ${state.pools.words.length}`;
}

function ensureSelections() {
  if (state.scope !== "custom") return;
  const optionValues = new Set([...refs.customPicker.options].map((opt) => opt.value));
  state.selectedCharIds = new Set([...state.selectedCharIds].filter((id) => optionValues.has(id)));
}

function refreshPools({ rebuildPicker = true } = {}) {
  if (rebuildPicker) buildCustomPickerOptions();
  ensureSelections();
  state.pools.single = buildSinglePool();
  state.pools.words = buildWordPool();
  updateStats();
  renderCurrentTabQuestion();
}

function getPoolForMode(mode) {
  if (mode === "single") return { type: "single", pool: state.pools.single };
  if (mode === "word") return { type: "word", pool: state.pools.words };
  const canSingle = state.pools.single.length > 0;
  const canWord = state.pools.words.length > 0;
  if (!canSingle && !canWord) return { type: "none", pool: [] };
  if (!canSingle) return { type: "word", pool: state.pools.words };
  if (!canWord) return { type: "single", pool: state.pools.single };
  return Math.random() > 0.5
    ? { type: "single", pool: state.pools.single }
    : { type: "word", pool: state.pools.words };
}

function setFeedback(node, msg, ok) {
  node.textContent = msg;
  node.classList.remove("ok", "bad");
  if (!msg) return;
  node.classList.add(ok ? "ok" : "bad");
}

function nextInputQuestion() {
  const mode = refs.inputModeType.value;
  const picked = getPoolForMode(mode);

  if (picked.type === "none" || picked.pool.length === 0) {
    state.inputQuestion = null;
    refs.inputPrompt.textContent = "Không có dữ liệu theo bộ lọc";
    setFeedback(refs.inputFeedback, "Hãy nới bộ lọc để có câu hỏi.", false);
    return;
  }

  // Never show the same kana twice in a row (when there is anything else to show).
  const lastKana = state.inputQuestion?.display;
  const fresh = picked.pool.filter((item) => item.kana !== lastKana);
  let q = fresh.length ? pickRandom(fresh) : null;
  if (!q && mode === "mixed") {
    // Current pool only holds the last item; try the other pool.
    const other = picked.type === "single" ? state.pools.words : state.pools.single;
    const otherFresh = other.filter((item) => item.kana !== lastKana);
    if (otherFresh.length) {
      q = pickRandom(otherFresh);
      picked.type = picked.type === "single" ? "word" : "single";
    }
  }
  if (!q) q = pickRandom(picked.pool);
  state.inputQuestion = picked.type === "single"
    ? { type: "single", display: q.kana, answers: q.answers, revealed: false }
    : { type: "word", display: q.kana, answers: q.answers, revealed: false };

  refs.inputPrompt.textContent = state.inputQuestion.display;
  refs.inputAnswer.value = "";
  setFeedback(refs.inputFeedback, "", true);
}

function setInputStreak(value) {
  const increased = value > state.inputStreak;
  state.inputStreak = value;
  refs.inputStreakCount.textContent = value;
  refs.inputStreak.classList.toggle("hot", value > 0);
  refs.inputStreak.classList.remove("bump");
  if (increased) {
    void refs.inputStreak.offsetWidth; // restart animation
    refs.inputStreak.classList.add("bump");
  }
}

function submitInputAnswer(event) {
  event.preventDefault();
  if (!state.inputQuestion) return;

  const user = sanitizeRomaji(refs.inputAnswer.value);
  const valid = state.inputQuestion.answers.map(sanitizeRomaji);
  const ok = valid.includes(user);

  if (ok) {
    if (!state.inputQuestion.revealed) setInputStreak(state.inputStreak + 1);
    nextInputQuestion();
    setFeedback(refs.inputFeedback, "Đúng rồi!", true);
  } else {
    setInputStreak(0);
    setFeedback(refs.inputFeedback, "Chưa đúng. Thử lại hoặc bấm Ra đáp án.", false);
    refs.inputAnswer.focus();
    refs.inputAnswer.select();
  }
}

function revealInputAnswer() {
  if (!state.inputQuestion) return;
  state.inputQuestion.revealed = true;
  setInputStreak(0);
  const answerText = state.inputQuestion.answers.join(" / ");
  setFeedback(refs.inputFeedback, `Đáp án: ${answerText}`, true);
  refs.inputAnswer.value = state.inputQuestion.answers[0];
  refs.inputAnswer.focus();
  refs.inputAnswer.select();
}

function nextChooseQuestion() {
  const mode = refs.chooseModeType.value;
  const picked = getPoolForMode(mode);

  const showNotEnough = () => {
    state.chooseQuestion = null;
    refs.choosePrompt.textContent = "Không đủ dữ liệu";
    refs.chooseOptions.innerHTML = "";
    setFeedback(refs.chooseFeedback, "Cần ít nhất 4 mục để tạo trắc nghiệm.", false);
  };

  if (picked.type === "none" || picked.pool.length < 4) {
    showNotEnough();
    return;
  }

  // Distractors must not share any romaji with the correct answer (e.g. じ/ぢ "ji", ぱん/パン "pan"),
  // and must not duplicate each other's kana.
  const correct = pickRandom(picked.pool);
  const correctAnswers = new Set(correct.answers.map(sanitizeRomaji));
  const seenKana = new Set([correct.kana]);
  const candidates = pickN(picked.pool, picked.pool.length).filter((item) => {
    if (item === correct || seenKana.has(item.kana)) return false;
    if (item.answers.some((a) => correctAnswers.has(sanitizeRomaji(a)))) return false;
    seenKana.add(item.kana);
    return true;
  });

  if (candidates.length < 3) {
    showNotEnough();
    return;
  }

  const options = pickN(candidates, 3).concat(correct);
  const shuffled = pickN(options, options.length);

  state.chooseQuestion = {
    type: picked.type,
    prompt: correct.answers[0],
    options: shuffled.map((item) => ({
      label: picked.type === "single" ? item.kana : item.kana,
      isCorrect: item === correct
    }))
  };

  refs.choosePrompt.textContent = state.chooseQuestion.prompt;
  refs.chooseOptions.innerHTML = "";

  state.chooseQuestion.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `optionBtn ${state.chooseQuestion.type === "word" ? "word" : ""}`;
    btn.textContent = opt.label;
    btn.addEventListener("click", () => {
      if (opt.isCorrect) {
        nextChooseQuestion();
        if (state.chooseQuestion) setFeedback(refs.chooseFeedback, "Chính xác!", true);
      } else {
        [...refs.chooseOptions.children].forEach((choiceBtn) => {
          choiceBtn.classList.remove("optionBtnWrong");
        });
        btn.classList.add("optionBtnWrong");
        setFeedback(refs.chooseFeedback, "Sai rồi, thử lại.", false);
      }
    });
    refs.chooseOptions.appendChild(btn);
  });

  setFeedback(refs.chooseFeedback, "", true);
}

function nextFlashQuestion() {
  const mode = refs.flashModeType.value;
  const picked = getPoolForMode(mode);

  if (picked.type === "none" || picked.pool.length === 0) {
    state.flashQuestion = null;
    refs.flashFront.textContent = "Không có dữ liệu";
    refs.flashBack.textContent = "Hãy nới bộ lọc";
    refs.flashBack.classList.add("hidden");
    return;
  }

  const card = pickRandom(picked.pool);
  state.flashQuestion = picked.type === "single"
    ? { front: card.kana, back: card.answers.join(" / ") }
    : { front: card.kana, back: card.answers.join(" / ") };

  state.flashRevealed = false;
  refs.flashFront.textContent = state.flashQuestion.front;
  refs.flashBack.textContent = state.flashQuestion.back;
  refs.flashBack.classList.add("hidden");
}

function flipFlashCard() {
  if (!state.flashQuestion) return;
  state.flashRevealed = !state.flashRevealed;
  refs.flashBack.classList.toggle("hidden", !state.flashRevealed);
}

// ---------- Typing test ----------

const TYPING_WORDS = (
  "さくら ねこ いぬ やま かわ うみ そら あめ ゆき はな みず ひと くち みみ あし あたま かお こころ " +
  "ともだち せんせい がっこう でんしゃ くるま じてんしゃ ほん えんぴつ つくえ いす まど いえ へや まち " +
  "くに にほん ことば なまえ じかん きょう あした きのう あさ ひる よる なつ ふゆ はる あき たべもの " +
  "のみもの ごはん さかな にく やさい くだもの りんご みかん おちゃ ぎゅうにゅう しゃしん りょこう " +
  "びょういん おかね かいもの しごと べんきょう しゅくだい おんがく えいが うた げんき ありがとう " +
  "すみません おはよう さようなら いただきます かぞく おかあさん おとうさん こども あかちゃん きっぷ " +
  "ざっし きって はっぱ にっき ちいさい おおきい あたらしい たのしい おいしい かわいい しずか にぎやか " +
  "ひこうき ちかてつ てんき でんわ ふね とけい めがね かばん くつ ぼうし つめたい あつい さむい " +
  "ほんや きんようび おんな ぱんや きゃく ちょっと"
).split(" ");

const TYPING_DURATION = 60;

const SYLLABLES = (() => {
  const map = new Map();
  const add = (raw) => map.set(raw[1], Array.isArray(raw[0]) ? raw[0] : [raw[0]]);
  Object.values(BASE).flat().forEach(add);
  [...DAKUTEN, ...HANDAKUTEN, ...SMALL, ...SOKUON].forEach(add);
  return map;
})();

const YOON_PREFIX = {
  き: ["ky"], し: ["sh", "sy"], ち: ["ch", "ty", "cy"], に: ["ny"], ひ: ["hy"], み: ["my"],
  り: ["ry"], ぎ: ["gy"], じ: ["j", "zy", "jy"], ぢ: ["dy", "j"], び: ["by"], ぴ: ["py"]
};
const YOON_VOWEL = { ゃ: "a", ゅ: "u", ょ: "o" };

// Turns a hiragana word into tokens; each token is the list of accepted romaji spellings.
function tokenizeKana(word) {
  const chars = [...word];
  const tokens = [];
  let sokuon = false;

  for (let i = 0; i < chars.length; i += 1) {
    const ch = chars[i];
    const next = chars[i + 1];
    let alts;

    if (YOON_PREFIX[ch] && YOON_VOWEL[next]) {
      alts = YOON_PREFIX[ch].map((p) => p + YOON_VOWEL[next]);
      for (const a of SYLLABLES.get(ch)) for (const s of SYLLABLES.get(next)) alts.push(a + s);
      i += 1;
    } else if (ch === "っ") {
      sokuon = true;
      continue;
    } else if (ch === "ん") {
      tokens.push({ nasal: true, alts: [] });
      continue;
    } else {
      alts = SYLLABLES.get(ch) || [ch];
    }

    if (sokuon) {
      const doubled = alts.flatMap((a) => {
        if (/^[aeiou]/.test(a)) return [];
        const out = [a[0] + a];
        if (a.startsWith("ch")) out.push("t" + a);
        return out;
      });
      const spelledOut = SYLLABLES.get("っ").flatMap((s) => alts.map((a) => s + a));
      alts = [...doubled, ...spelledOut];
      sokuon = false;
    }
    tokens.push({ alts });
  }

  if (sokuon) tokens.push({ alts: SYLLABLES.get("っ") });

  // ん: "nn" / "n'" always work; a single "n" only when not followed by a vowel or y.
  tokens.forEach((tok, i) => {
    if (!tok.nasal) return;
    const after = tokens[i + 1];
    const ambiguous = after && after.alts.some((a) => /^[aeiouy]/.test(a));
    tok.alts = ambiguous ? ["nn", "n'"] : ["n", "nn", "n'"];
  });

  return tokens.map((t) => t.alts);
}

// Full match, or (prefix=true) "input could still become a valid answer".
function matchRomaji(tokens, input, prefix = false) {
  const walk = (ti, pos) => {
    if (pos === input.length) return prefix || ti === tokens.length;
    if (ti === tokens.length) return false;
    const rest = input.slice(pos);
    return tokens[ti].some((alt) =>
      rest.startsWith(alt) ? walk(ti + 1, pos + alt.length) : prefix && alt.startsWith(rest)
    );
  };
  return walk(0, 0);
}

const primaryRomaji = (tokens) => tokens.map((alts) => alts[0]).join("");

const typing = {
  words: [],
  index: 0,
  results: [],
  startedAt: 0,
  timer: null,
  finished: false,
  best: 0
};

function loadBestWpm() {
  try {
    typing.best = Number(localStorage.getItem("kanaTypingBest")) || 0;
  } catch {
    typing.best = 0;
  }
}

function saveBestWpm(wpm) {
  if (wpm <= typing.best) return false;
  typing.best = wpm;
  try {
    localStorage.setItem("kanaTypingBest", String(wpm));
  } catch {
    /* storage unavailable: keep in memory only */
  }
  return true;
}

function nextTypingWord() {
  const last = typing.words[typing.words.length - 1];
  let word;
  do {
    word = pickRandom(TYPING_WORDS);
  } while (word === last);
  typing.words.push({ kana: word, tokens: tokenizeKana(word) });
}

function typingStats(elapsedSec) {
  const correct = typing.results.filter((r) => r.ok);
  // Standard WPM: 5 characters (incl. the space) = 1 word.
  const correctChars = correct.reduce((sum, r) => sum + r.typed.length + 1, 0);
  const minutes = Math.max(elapsedSec, 1) / 60;
  return {
    wpm: Math.round(correctChars / 5 / minutes),
    correct: correct.length,
    wrong: typing.results.length - correct.length
  };
}

function renderTypingStrip() {
  const strip = refs.typingStrip;
  strip.replaceChildren();
  const from = Math.max(0, typing.index - 2);
  for (let i = from; i < typing.index + 7; i += 1) {
    while (typing.words.length <= i) nextTypingWord();
    const span = document.createElement("span");
    span.className = "w";
    span.textContent = typing.words[i].kana;
    if (i < typing.index) span.classList.add(typing.results[i].ok ? "ok" : "bad");
    if (i === typing.index) span.classList.add("current");
    strip.appendChild(span);
  }
}

function renderTypingStats() {
  const elapsed = typing.startedAt ? (performance.now() - typing.startedAt) / 1000 : 0;
  const left = Math.max(0, Math.ceil(TYPING_DURATION - elapsed));
  const s = typingStats(Math.min(elapsed, TYPING_DURATION));
  refs.typingTime.textContent = left;
  refs.typingTime.classList.toggle("low", typing.startedAt > 0 && left <= 10);
  refs.typingWpm.textContent = typing.startedAt ? s.wpm : 0;
  refs.typingCorrect.textContent = s.correct;
  refs.typingWrong.textContent = s.wrong;
  refs.typingBest.textContent = typing.best || "–";
}

function resetTyping() {
  clearInterval(typing.timer);
  Object.assign(typing, { words: [], index: 0, results: [], startedAt: 0, timer: null, finished: false });
  refs.typingInput.value = "";
  refs.typingInput.disabled = false;
  refs.typingInput.classList.remove("bad");
  refs.typingResult.classList.add("hidden");
  renderTypingStrip();
  renderTypingStats();
  refs.typingInput.focus();
}

function startTyping() {
  typing.startedAt = performance.now();
  typing.timer = setInterval(() => {
    if ((performance.now() - typing.startedAt) / 1000 >= TYPING_DURATION) finishTyping();
    else renderTypingStats();
  }, 100);
}

function submitTypingWord() {
  const typed = sanitizeRomaji(refs.typingInput.value);
  if (!typed || typing.finished) return;
  const word = typing.words[typing.index];
  typing.results.push({ kana: word.kana, typed, ok: matchRomaji(word.tokens, typed), expected: primaryRomaji(word.tokens) });
  typing.index += 1;
  refs.typingInput.value = "";
  refs.typingInput.classList.remove("bad");
  renderTypingStrip();
  renderTypingStats();
}

function finishTyping() {
  clearInterval(typing.timer);
  typing.finished = true;
  // Count a fully correct word that was still in the box when time ran out.
  const pending = sanitizeRomaji(refs.typingInput.value);
  if (pending && matchRomaji(typing.words[typing.index].tokens, pending)) submitTypingWord();
  refs.typingInput.disabled = true;
  renderTypingStats();

  const s = typingStats(TYPING_DURATION);
  const total = s.correct + s.wrong;
  const accuracy = total ? Math.round((s.correct / total) * 100) : 0;
  const isRecord = saveBestWpm(s.wpm);
  renderTypingStats();

  const box = refs.typingResult;
  box.replaceChildren();
  const h = document.createElement("h3");
  h.textContent = isRecord ? "Hết giờ! Kỷ lục mới 🎉" : "Hết giờ!";
  const big = document.createElement("div");
  big.className = "big";
  big.textContent = `${s.wpm} WPM`;
  const info = document.createElement("p");
  info.textContent = `Độ chính xác ${accuracy}% · ${s.correct} từ đúng · ${s.wrong} từ sai`;
  box.append(h, big, info);

  const mistakes = typing.results.filter((r) => !r.ok);
  if (mistakes.length) {
    const t = document.createElement("strong");
    t.textContent = "Từ gõ sai:";
    const ul = document.createElement("ul");
    mistakes.forEach((r) => {
      const li = document.createElement("li");
      const k = document.createElement("span");
      k.className = "kana";
      k.textContent = r.kana;
      li.append(k, ` → đáp án ${r.expected}, bạn gõ ${r.typed}`);
      ul.appendChild(li);
    });
    box.append(t, ul);
  }
  box.classList.remove("hidden");
  refs.typingRestart.focus();
}

function bindTyping() {
  loadBestWpm();
  refs.typingInput.addEventListener("input", () => {
    if (typing.finished) return;
    if (!typing.startedAt && refs.typingInput.value.trim()) startTyping();
    // Space (also on mobile keyboards) submits the word.
    if (/\s/.test(refs.typingInput.value)) {
      refs.typingInput.value = refs.typingInput.value.replace(/\s+/g, "");
      submitTypingWord();
      return;
    }
    const typed = sanitizeRomaji(refs.typingInput.value);
    const word = typing.words[typing.index];
    refs.typingInput.classList.toggle("bad", Boolean(typed) && !matchRomaji(word.tokens, typed, true));
  });
  refs.typingInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitTypingWord();
    } else if (e.key === "Escape") {
      resetTyping();
    }
  });
  refs.typingRestart.addEventListener("click", resetTyping);
  resetTyping();
}

function renderCurrentTabQuestion() {
  const activeTab = document.querySelector(".tab.active")?.dataset.tab;
  if (activeTab === "input") nextInputQuestion();
  if (activeTab === "choose") nextChooseQuestion();
  if (activeTab === "flash") nextFlashQuestion();
  if (activeTab === "typing") refs.typingInput.focus();
}

function switchTab(tabName) {
  refs.tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === tabName));
  refs.tabBodies.forEach((body) => body.classList.toggle("active", body.id === `tab-${tabName}`));
  renderCurrentTabQuestion();
}

function bindEvents() {
  refs.scriptHiragana.addEventListener("change", () => {
    refs.scriptHiragana.checked ? state.scripts.add("hiragana") : state.scripts.delete("hiragana");
    if (state.scripts.size === 0) {
      state.scripts.add("hiragana");
      refs.scriptHiragana.checked = true;
    }
    refreshPools();
  });

  refs.scriptKatakana.addEventListener("change", () => {
    refs.scriptKatakana.checked ? state.scripts.add("katakana") : state.scripts.delete("katakana");
    if (state.scripts.size === 0) {
      state.scripts.add("katakana");
      refs.scriptKatakana.checked = true;
    }
    refreshPools();
  });

  refs.scope.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (!radio.checked) return;
      state.scope = radio.value;
      refs.rowPickerWrap.classList.toggle("hidden", state.scope !== "row");
      refs.customPickerWrap.classList.toggle("hidden", state.scope !== "custom");
      refreshPools();
    });
  });

  refs.toggleDakuten.addEventListener("change", () => {
    state.includeDakuten = refs.toggleDakuten.checked;
    refreshPools();
  });

  refs.toggleHandakuten.addEventListener("change", () => {
    state.includeHandakuten = refs.toggleHandakuten.checked;
    refreshPools();
  });

  refs.toggleSokuon.addEventListener("change", () => {
    state.includeSokuon = refs.toggleSokuon.checked;
    refreshPools();
  });

  refs.toggleSmall.addEventListener("change", () => {
    state.includeSmall = refs.toggleSmall.checked;
    refreshPools();
  });

  refs.toggleKOnly.addEventListener("change", () => {
    state.kOnly = refs.toggleKOnly.checked;
    refreshPools();
  });

  refs.customPicker.addEventListener("change", () => {
    state.selectedCharIds = new Set([...refs.customPicker.selectedOptions].map((opt) => opt.value));
    refreshPools({ rebuildPicker: false });
  });

  refs.tabs.forEach((tab) => tab.addEventListener("click", () => switchTab(tab.dataset.tab)));

  refs.inputNextBtn.addEventListener("click", nextInputQuestion);
  refs.inputModeType.addEventListener("change", nextInputQuestion);
  refs.inputForm.addEventListener("submit", submitInputAnswer);
  refs.inputRevealBtn.addEventListener("click", revealInputAnswer);

  refs.chooseNextBtn.addEventListener("click", nextChooseQuestion);
  refs.chooseModeType.addEventListener("change", nextChooseQuestion);

  refs.flashNextBtn.addEventListener("click", nextFlashQuestion);
  refs.flashModeType.addEventListener("change", nextFlashQuestion);
  refs.flashCard.addEventListener("click", flipFlashCard);
}

function init() {
  buildRowPicker();
  bindEvents();
  bindChart();
  bindTyping();
  refreshPools();
}

init();
