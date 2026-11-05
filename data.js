let defaultVocabs = [
    { thai: "สวัสดี", translit: "sà-wàt-dee", meaning: "Hallo / Guten Tag", tone: 3, lesson: 1, image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=300" },
    { thai: "ขอบคุณ", translit: "kàwp-kun", meaning: "Danke", tone: 2, lesson: 1, image: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=300" },
    { thai: "ใช่", translit: "châi", meaning: "Ja", tone: 2, lesson: 1, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300" },
    { thai: "ไม่", translit: "mâi", meaning: "Nein / Nicht", tone: 2, lesson: 1, image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=300" },
    { thai: "น้ำ", translit: "náam", meaning: "Wasser", tone: 3, lesson: 2, image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300" },
    { thai: "กิน", translit: "gin", meaning: "essen", tone: 0, lesson: 2, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300" },
    { thai: "หิว", translit: "hǐw", meaning: "hungrig", tone: 4, lesson: 2, image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=300" }
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
    0: { name: "Mittelton (Mid)", path: "M 10 35 L 90 35" },
    1: { name: "Tiefton (Low)", path: "M 10 20 L 90 60" },
    2: { name: "Fallender Ton (Falling)", path: "M 10 50 Q 50 10 90 55" },
    3: { name: "Hochton (High)", path: "M 10 20 L 90 20" },
    4: { name: "Steigender Ton (Rising)", path: "M 10 55 Q 50 55 90 15" }
};
