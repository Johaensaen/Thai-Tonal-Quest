let defaultVocabs = [
    { thai: "สวัสดี", translit: "sà-wàt-dee", meaning: "Hallo / Guten Tag", tone: 3, lesson: 1 },
    { thai: "ขอบคุณ", translit: "kàwp-kun", meaning: "Danke", tone: 2, lesson: 1 },
    { thai: "ใช่", translit: "châi", meaning: "Ja", tone: 2, lesson: 1 },
    { thai: "ไม่", translit: "mâi", meaning: "Nein / Nicht", tone: 2, lesson: 1 },
    { thai: "น้ำ", translit: "náam", meaning: "Wasser", tone: 3, lesson: 2 },
    { thai: "กิน", translit: "gin", meaning: "essen", tone: 0, lesson: 2 },
    { thai: "หิว", translit: "hǐw", meaning: "hungrig", tone: 4, lesson: 2 }
];

let vocabs = JSON.parse(localStorage.getItem('thai_quest_vocabs'));
if (!vocabs || !Array.isArray(vocabs) || vocabs.length === 0) {
    vocabs = defaultVocabs;
    localStorage.setItem('thai_quest_vocabs', JSON.stringify(vocabs));
}

let lessons = JSON.parse(localStorage.getItem('thai_quest_lessons')) || {
    1: { name: "Lektion 1: Grundlagen & Begrüßung", completed: false },
    2: { name: "Lektion 2: Essen, Trinken & Alltag", completed: false }
};

const toneDetails = {
    0: { name: "Mittelton (Mid)" },
    1: { name: "Tiefton (Low)" },
    2: { name: "Fallender Ton (Falling)" },
    3: { name: "Hochton (High)" },
    4: { name: "Steigender Ton (Rising)" }
};
