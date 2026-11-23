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
    ["fu", "ふ", "フ"],
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
    ["wo", "を", "ヲ"]
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
  [["xtsu", "ltsu"], "っ", "ッ", "t"]
];

const WORDS = [
  { kana: "さくら", answers: ["sakura"], script: "hiragana" },
  { kana: "ねこ", answers: ["neko"], script: "hiragana" },
  { kana: "がっこう", answers: ["gakkou", "gakko"], script: "hiragana", hasSokuon: true, hasDakuten: true },
  { kana: "きょう", answers: ["kyou", "kyo"], script: "hiragana", hasSmall: true, hasK: true },
  { kana: "ぱん", answers: ["pan"], script: "hiragana", hasHandakuten: true },
  { kana: "きしゃ", answers: ["kisha"], script: "hiragana", hasK: true },
  { kana: "カメラ", answers: ["kamera"], script: "katakana", hasK: true },
  { kana: "ケーキ", answers: ["keeki", "keki"], script: "katakana", hasK: true },
  { kana: "コーヒー", answers: ["koohii", "ko-hi-", "kohii"], script: "katakana", hasK: true },
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
  flashRevealed: false
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
  chooseModeType: document.getElementById("chooseModeType"),
  chooseNextBtn: document.getElementById("chooseNextBtn"),
  choosePrompt: document.getElementById("choosePrompt"),
  chooseOptions: document.getElementById("chooseOptions"),
  chooseFeedback: document.getElementById("chooseFeedback"),
  flashModeType: document.getElementById("flashModeType"),
  flashNextBtn: document.getElementById("flashNextBtn"),
  flashCard: document.getElementById("flashCard"),
  flashFront: document.getElementById("flashFront"),
  flashBack: document.getElementById("flashBack")
};

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
  return text.trim().toLowerCase().replace(/\s+/g, "").replace(/[\u30fc]/g, "-");
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
  return WORDS.filter((word) => {
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

function refreshPools() {
  buildCustomPickerOptions();
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

  const q = pickRandom(picked.pool);
  state.inputQuestion = picked.type === "single"
    ? { type: "single", display: q.kana, answers: q.answers }
    : { type: "word", display: q.kana, answers: q.answers };

  refs.inputPrompt.textContent = state.inputQuestion.display;
  refs.inputAnswer.value = "";
  setFeedback(refs.inputFeedback, "", true);
}

function submitInputAnswer(event) {
  event.preventDefault();
  if (!state.inputQuestion) return;

  const user = sanitizeRomaji(refs.inputAnswer.value);
  const valid = state.inputQuestion.answers.map(sanitizeRomaji);
  const ok = valid.includes(user);

  if (ok) {
    setFeedback(refs.inputFeedback, "Đúng rồi!", true);
    nextInputQuestion();
  } else {
    setFeedback(refs.inputFeedback, "Chưa đúng. Thử lại hoặc bấm Ra đáp án.", false);
    refs.inputAnswer.focus();
    refs.inputAnswer.select();
  }
}

function revealInputAnswer() {
  if (!state.inputQuestion) return;
  const answerText = state.inputQuestion.answers.join(" / ");
  setFeedback(refs.inputFeedback, `Đáp án: ${answerText}`, true);
  refs.inputAnswer.value = state.inputQuestion.answers[0];
  refs.inputAnswer.focus();
  refs.inputAnswer.select();
}

function nextChooseQuestion() {
  const mode = refs.chooseModeType.value;
  const picked = getPoolForMode(mode);

  if (picked.type === "none" || picked.pool.length < 4) {
    state.chooseQuestion = null;
    refs.choosePrompt.textContent = "Không đủ dữ liệu";
    refs.chooseOptions.innerHTML = "";
    setFeedback(refs.chooseFeedback, "Cần ít nhất 4 mục để tạo trắc nghiệm.", false);
    return;
  }

  const correct = pickRandom(picked.pool);
  const candidates = picked.pool.filter((item) => item !== correct);
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
        setFeedback(refs.chooseFeedback, "Chính xác!", true);
        nextChooseQuestion();
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

function renderCurrentTabQuestion() {
  const activeTab = document.querySelector(".tab.active")?.dataset.tab;
  if (activeTab === "input") nextInputQuestion();
  if (activeTab === "choose") nextChooseQuestion();
  if (activeTab === "flash") nextFlashQuestion();
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
    refreshPools();
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
  refreshPools();
  switchTab("input");
}

init();
