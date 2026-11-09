let defaultVocabs = [
    // Lektion 1: Urlaub & Alltag (Grundlagen für den Start)
    { thai: "สวัสดี", translit: "sà-wàt-dee", meaning: "Hallo / Guten Tag", tone: 3, lesson: 1, emoji: "👋" },
    { thai: "ขอบคุณ", translit: "kàwp-kun", meaning: "Danke", tone: 2, lesson: 1, emoji: "🙏" },
    { thai: "ใช่", translit: "châi", meaning: "Ja", tone: 2, lesson: 1, emoji: "✅" },
    { thai: "ไม่", translit: "mâi", meaning: "Nein / Nicht", tone: 2, lesson: 1, emoji: "❌" },
    { thai: "ห้องน้ำ", translit: "hɔ̂ng-náam", meaning: "Toilette / WC", tone: 2, lesson: 1, emoji: "🚻" },
    { thai: "เท่าไหร่", translit: "thâo-ràai", meaning: "Wieviel kostet das?", tone: 1, lesson: 1, emoji: "💰" },

    // Lektion 2: Essen, Trinken & Restaurant
    { thai: "น้ำ", translit: "náam", meaning: "Wasser", tone: 3, lesson: 2, emoji: "💧" },
    { thai: "กิน", translit: "gin", meaning: "essen", tone: 0, lesson: 2, emoji: "🍚" },
    { thai: "หิว", translit: "hǐw", meaning: "hungrig", tone: 4, lesson: 2, emoji: "😋" },
    { thai: "อร่อย", translit: "à-rɔ̀y", meaning: "Lecker!", tone: 1, lesson: 2, emoji: "🍲" },
    { thai: "เผ็ด", translit: "phèt", meaning: "Scharf", tone: 1, lesson: 2, emoji: "🔥" },
    { thai: "ไม่เผ็ด", translit: "mâi-phèt", meaning: "Nicht scharf", tone: 2, lesson: 2, emoji: "🥛" },

    // Lektion 3: Familie, Freunde & Unterhaltung
    { thai: "เพื่อน", translit: "phûan", meaning: "Freund / Freundin", tone: 2, lesson: 3, emoji: "🧑‍🤝‍🧑" },
    { thai: "ครอบครัว", translit: "krɔ̀ːp-krūa", meaning: "Familie", tone: 1, lesson: 3, emoji: "👨‍👩‍👧‍👦" },
    { thai: "สบายดีไหม", translit: "sà-baai-dee mǎai", meaning: "Wie geht es dir?", tone: 0, lesson: 3, emoji: "💬" },
    { thai: "สบายดี", translit: "sà-baai-dee", meaning: "Mir geht es gut", tone: 0, lesson: 3, emoji: "😊" },
    { thai: "รัก", translit: "rák", meaning: "Liebe / Lieben", tone: 4, lesson: 3, emoji: "❤️" }
];

let vocabs = JSON.parse(localStorage.getItem('thai_quest_vocabs'));
if (!vocabs || !Array.isArray(vocabs) || vocabs.length === 0) {
    vocabs = defaultVocabs;
    localStorage.setItem('thai_quest_vocabs', JSON.stringify(vocabs));
}

let lessons = JSON.parse(localStorage.getItem('thai_quest_lessons')) || {
    1: { name: "1. Urlaub & Begrüßung", completed: false },
    2: { name: "2. Essen & Restaurant", completed: false },
    3: { name: "3. Familie & Freunde", completed: false }
};

let dialogues = [
    {
        title: "Im Restaurant bestellen",
        context: "Du kommst in ein Restaurant, bestellst Wasser und besprichst die Schärfe.",
        lines: [
            { speaker: "Kellner", thai: "สวัสดีครับ", translit: "sà-wàt-dee kráp", meaning: "Guten Tag!" },
            { speaker: "Du", thai: "ขอ N น้ำครับ", translit: "kǎw náam kráp", meaning: "Ich hätte gerne Wasser, bitte." },
            { speaker: "Kellner", thai: "กินเผ็ดไหม", translit: "gin phèt mǎai", meaning: "Isst du scharf?" },
            { speaker: "Du", thai: "ไม่เผ็ดครับ", translit: "mâi phèt kráp", meaning: "Nicht scharf, bitte." }
        ],
        question: "Was bestellt und verlangt der Gast?",
        options: [
            { text: "Wasser und Essen ohne Schärfe", correct: true },
            { text: "Sehr scharfe Suppe und Cola", correct: false },
            { text: "Die Rechnung für die Toilette", correct: false }
        ]
    },
    {
        title: "Wiedersehen unter Freunden",
        context: "Du triffst einen alten Bekannten und wirst nach deinem Befinden gefragt.",
        lines: [
            { speaker: "Freund", thai: "สวัสดีครับเพื่อน", translit: "sà-wàt-dee kráp phûan", meaning: "Hallo mein Freund!" },
            { speaker: "Freund", thai: "สบายดีไหม", translit: "sà-baai-dee mǎai", meaning: "Wie geht es dir?" },
            { speaker: "Du", thai: "สบายดี ขอบคุณครับ", translit: "sà-baai-dee kàwp-kun kráp", meaning: "Mir geht es gut, danke." },
            { speaker: "Freund", thai: "ดีมากครับ", translit: "dee mâak kráp", meaning: "Sehr gut!" }
        ],
        question: "Worüber unterhalten sich die beiden zu Beginn?",
        options: [
            { text: "Wie es dem anderen geht", correct: true },
            { text: "Wo es das beste Restaurant gibt", correct: false },
            { text: "Wie viel das Wasser kostet", correct: false }
        ]
    }
];

const toneDetails = {
    0: { name: "Mittelton (Mid)", path: "M 10 35 L 90 35" },
    1: { name: "Tiefton (Low)", path: "M 10 20 L 90 60" },
    2: { name: "Fallender Ton (Falling)", path: "M 10 50 Q 50 10 90 55" },
    3: { name: "Hochton (High)", path: "M 10 20 L 90 20" },
    4: { name: "Steigender Ton (Rising)", path: "M 10 55 Q 50 55 90 15" }
};
