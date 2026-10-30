const courseLessons = [
    {
        id: 1,
        name: "1. Hallo & unterwegs",
        description: "Nützliche Wörter für erste Gespräche und unterwegs.",
        words: [
            { thai: "มา", translit: "maa", meaning: "kommen", tone: 0, lesson: 1 },
            { thai: "ไป", translit: "bpai", meaning: "gehen / fahren", tone: 0, lesson: 1 },
            { thai: "ดู", translit: "duu", meaning: "sehen / anschauen", tone: 0, lesson: 1 },
            { thai: "ดี", translit: "dii", meaning: "gut", tone: 0, lesson: 1 },
            { thai: "คน", translit: "khon", meaning: "Person / Mensch", tone: 0, lesson: 1 },
            { thai: "พูด", translit: "phûut", meaning: "sprechen", tone: 2, lesson: 1 },
            { thai: "ใช่", translit: "châi", meaning: "ja / richtig", tone: 2, lesson: 1 },
            { thai: "ใหม่", translit: "mâi", meaning: "neu", tone: 2, lesson: 1 },
            { thai: "เก่า", translit: "kào", meaning: "alt", tone: 1, lesson: 1 },
            { thai: "ข่าว", translit: "khàao", meaning: "Nachricht", tone: 1, lesson: 1 }
        ]
    },
    {
        id: 2,
        name: "2. Essen & Zuhause",
        description: "Wörter rund ums Essen, Zuhause und Befinden.",
        words: [
            { thai: "ไข่", translit: "khài", meaning: "Ei", tone: 1, lesson: 2 },
            { thai: "ข้าว", translit: "khâao", meaning: "Reis", tone: 2, lesson: 2 },
            { thai: "บ้าน", translit: "bâan", meaning: "Haus / Zuhause", tone: 2, lesson: 2 },
            { thai: "กิน", translit: "kin", meaning: "essen", tone: 0, lesson: 2 },
            { thai: "น้ำ", translit: "náam", meaning: "Wasser", tone: 3, lesson: 2 },
            { thai: "หมู", translit: "mǔu", meaning: "Schwein / Schweinefleisch", tone: 4, lesson: 2 },
            { thai: "หิว", translit: "hǐw", meaning: "hungrig", tone: 4, lesson: 2 },
            { thai: "แม่", translit: "mâe", meaning: "Mutter", tone: 2, lesson: 2 },
            { thai: "นอน", translit: "non", meaning: "schlafen / liegen", tone: 0, lesson: 2 },
            { thai: "เล่น", translit: "lên", meaning: "spielen", tone: 2, lesson: 2 }
        ]
    },
    {
        id: 3,
        name: "3. Draußen, Tiere & Dinge",
        description: "Entdecke Tiere, Orte und Dinge in deiner Umgebung.",
        words: [
            { thai: "ป่า", translit: "pàa", meaning: "Wald", tone: 1, lesson: 3 },
            { thai: "รัก", translit: "rák", meaning: "lieben / Liebe", tone: 3, lesson: 3 },
            { thai: "นก", translit: "nók", meaning: "Vogel", tone: 3, lesson: 3 },
            { thai: "รถ", translit: "rót", meaning: "Auto / Fahrzeug", tone: 3, lesson: 3 },
            { thai: "ม้า", translit: "máa", meaning: "Pferd", tone: 3, lesson: 3 },
            { thai: "นั้น", translit: "nán", meaning: "jenes / das dort", tone: 3, lesson: 3 },
            { thai: "ขาว", translit: "khǎao", meaning: "weiß", tone: 4, lesson: 3 },
            { thai: "หมา", translit: "mǎa", meaning: "Hund", tone: 4, lesson: 3 },
            { thai: "ไหน", translit: "nǎi", meaning: "wo / welcher", tone: 4, lesson: 3 },
            { thai: "ปลา", translit: "bplaa", meaning: "Fisch", tone: 0, lesson: 3 }
        ]
    },
    {
        id: 4,
        name: "4. Familie & Menschen",
        description: "Sprich über Familie, Freunde und Menschen in deinem Alltag.",
        words: [
            { thai: "พ่อ", translit: "phɔ̂ɔ", meaning: "Vater", tone: 2, lesson: 4 },
            { thai: "พี่", translit: "phîi", meaning: "älteres Geschwister", tone: 2, lesson: 4 },
            { thai: "น้อง", translit: "nɔ̂ɔng", meaning: "jüngeres Geschwister", tone: 2, lesson: 4 },
            { thai: "ลูก", translit: "lûuk", meaning: "Kind / Sohn / Tochter", tone: 2, lesson: 4 },
            { thai: "เพื่อน", translit: "phûean", meaning: "Freund / Freundin", tone: 2, lesson: 4 },
            { thai: "เด็ก", translit: "dèk", meaning: "Kind", tone: 1, lesson: 4 },
            { thai: "ผู้หญิง", translit: "phûu-yǐng", meaning: "Frau", tone: 2, lesson: 4 },
            { thai: "ผู้ชาย", translit: "phûu-chaai", meaning: "Mann", tone: 2, lesson: 4 },
            { thai: "ครู", translit: "khruu", meaning: "Lehrer / Lehrerin", tone: 0, lesson: 4 },
            { thai: "นักเรียน", translit: "nák-rian", meaning: "Schüler / Schülerin", tone: 3, lesson: 4 }
        ]
    },
    {
        id: 5,
        name: "5. Unterwegs",
        description: "Finde dich mit Verkehrsmitteln und Richtungen zurecht.",
        words: [
            { thai: "ถนน", translit: "thà-nǒn", meaning: "Straße", tone: 1, lesson: 5 },
            { thai: "รถไฟ", translit: "rót-fai", meaning: "Zug", tone: 3, lesson: 5 },
            { thai: "สถานี", translit: "sà-thǎa-nii", meaning: "Bahnhof / Station", tone: 1, lesson: 5 },
            { thai: "สนามบิน", translit: "sà-nǎam-bin", meaning: "Flughafen", tone: 1, lesson: 5 },
            { thai: "โรงแรม", translit: "rooŋ-raem", meaning: "Hotel", tone: 0, lesson: 5 },
            { thai: "ตั๋ว", translit: "dtǔa", meaning: "Fahrkarte / Ticket", tone: 4, lesson: 5 },
            { thai: "ซ้าย", translit: "sáai", meaning: "links", tone: 3, lesson: 5 },
            { thai: "ขวา", translit: "khwǎa", meaning: "rechts", tone: 4, lesson: 5 },
            { thai: "ตรงไป", translit: "dtrong-bpai", meaning: "geradeaus", tone: 0, lesson: 5 },
            { thai: "เดิน", translit: "doen", meaning: "gehen / laufen", tone: 0, lesson: 5 }
        ]
    },
    {
        id: 6,
        name: "6. Essen bestellen",
        description: "Bestelle Essen und beschreibe, was dir schmeckt.",
        words: [
            { thai: "ผัก", translit: "phàk", meaning: "Gemüse", tone: 1, lesson: 6 },
            { thai: "ผลไม้", translit: "phǒn-lá-máai", meaning: "Obst", tone: 4, lesson: 6 },
            { thai: "เนื้อ", translit: "nûea", meaning: "Fleisch", tone: 2, lesson: 6 },
            { thai: "ไก่", translit: "kài", meaning: "Huhn / Hähnchen", tone: 1, lesson: 6 },
            { thai: "เผ็ด", translit: "phèt", meaning: "scharf", tone: 1, lesson: 6 },
            { thai: "หวาน", translit: "wǎan", meaning: "süß", tone: 4, lesson: 6 },
            { thai: "อร่อย", translit: "à-ròi", meaning: "lecker", tone: 1, lesson: 6 },
            { thai: "จาน", translit: "jaan", meaning: "Teller", tone: 0, lesson: 6 },
            { thai: "ช้อน", translit: "chɔ́ɔn", meaning: "Löffel", tone: 3, lesson: 6 },
            { thai: "อิ่ม", translit: "ìim", meaning: "satt", tone: 1, lesson: 6 }
        ]
    },
    {
        id: 7,
        name: "7. Einkaufen & bezahlen",
        description: "Frage nach Preisen und erledige kleine Einkäufe.",
        words: [
            { thai: "ราคา", translit: "raa-khaa", meaning: "Preis", tone: 0, lesson: 7 },
            { thai: "เท่าไร", translit: "thâo-rai", meaning: "wie viel", tone: 2, lesson: 7 },
            { thai: "เงิน", translit: "ngoen", meaning: "Geld", tone: 0, lesson: 7 },
            { thai: "แพง", translit: "phaaeng", meaning: "teuer", tone: 0, lesson: 7 },
            { thai: "ถูก", translit: "thùuk", meaning: "billig / günstig", tone: 1, lesson: 7 },
            { thai: "ซื้อ", translit: "sûe", meaning: "kaufen", tone: 2, lesson: 7 },
            { thai: "ขาย", translit: "khǎai", meaning: "verkaufen", tone: 4, lesson: 7 },
            { thai: "ร้าน", translit: "ráan", meaning: "Geschäft / Laden", tone: 3, lesson: 7 },
            { thai: "ตลาด", translit: "dtà-làat", meaning: "Markt", tone: 1, lesson: 7 },
            { thai: "จ่าย", translit: "jàai", meaning: "bezahlen", tone: 1, lesson: 7 }
        ]
    },
    {
        id: 8,
        name: "8. Zeit & Tagesablauf",
        description: "Sprich über heute, morgen und die Tageszeiten.",
        words: [
            { thai: "วันนี้", translit: "wan-níi", meaning: "heute", tone: 3, lesson: 8 },
            { thai: "พรุ่งนี้", translit: "phrûng-níi", meaning: "morgen", tone: 2, lesson: 8 },
            { thai: "เมื่อวาน", translit: "mûea-waan", meaning: "gestern", tone: 2, lesson: 8 },
            { thai: "เวลา", translit: "wee-laa", meaning: "Zeit / Uhrzeit", tone: 0, lesson: 8 },
            { thai: "ตอนนี้", translit: "dtɔɔn-níi", meaning: "jetzt", tone: 3, lesson: 8 },
            { thai: "เช้า", translit: "châo", meaning: "Morgen (Tageszeit)", tone: 2, lesson: 8 },
            { thai: "บ่าย", translit: "bàai", meaning: "Nachmittag", tone: 1, lesson: 8 },
            { thai: "เย็น", translit: "yen", meaning: "Abend / kühl", tone: 0, lesson: 8 },
            { thai: "กลางคืน", translit: "glaang-khuen", meaning: "Nacht", tone: 0, lesson: 8 },
            { thai: "นาที", translit: "naa-thii", meaning: "Minute", tone: 0, lesson: 8 }
        ]
    },
    {
        id: 9,
        name: "9. Alltag & Tätigkeiten",
        description: "Erzähle, was du jeden Tag machst.",
        words: [
            { thai: "ตื่น", translit: "dtùen", meaning: "aufwachen", tone: 1, lesson: 9 },
            { thai: "อาบน้ำ", translit: "àap-náam", meaning: "duschen / baden", tone: 1, lesson: 9 },
            { thai: "ทำงาน", translit: "tham-ngaan", meaning: "arbeiten", tone: 0, lesson: 9 },
            { thai: "เรียน", translit: "rian", meaning: "lernen / studieren", tone: 0, lesson: 9 },
            { thai: "อ่าน", translit: "àan", meaning: "lesen", tone: 1, lesson: 9 },
            { thai: "เขียน", translit: "khǐan", meaning: "schreiben", tone: 4, lesson: 9 },
            { thai: "ฟัง", translit: "fang", meaning: "hören / zuhören", tone: 0, lesson: 9 },
            { thai: "เปิด", translit: "bpə̀ət", meaning: "öffnen / einschalten", tone: 1, lesson: 9 },
            { thai: "ปิด", translit: "bpìt", meaning: "schließen / ausschalten", tone: 1, lesson: 9 },
            { thai: "ชอบ", translit: "chɔ̂ɔp", meaning: "mögen", tone: 2, lesson: 9 }
        ]
    },
    {
        id: 10,
        name: "10. Orte & Orientierung",
        description: "Beschreibe, wo Dinge und Orte liegen.",
        words: [
            { thai: "ที่นี่", translit: "thîi-nîi", meaning: "hier", tone: 2, lesson: 10 },
            { thai: "ที่นั่น", translit: "thîi-nân", meaning: "dort", tone: 2, lesson: 10 },
            { thai: "ข้างหน้า", translit: "khâang-nâa", meaning: "vorne / davor", tone: 2, lesson: 10 },
            { thai: "ข้างหลัง", translit: "khâang-lǎng", meaning: "hinten / dahinter", tone: 2, lesson: 10 },
            { thai: "ข้างใน", translit: "khâang-nai", meaning: "drinnen / innen", tone: 2, lesson: 10 },
            { thai: "ข้างนอก", translit: "khâang-nɔ̂ɔk", meaning: "draußen / außen", tone: 2, lesson: 10 },
            { thai: "ใกล้", translit: "glâi", meaning: "nah", tone: 2, lesson: 10 },
            { thai: "ไกล", translit: "glai", meaning: "weit / fern", tone: 0, lesson: 10 },
            { thai: "บน", translit: "bon", meaning: "auf / oben", tone: 0, lesson: 10 },
            { thai: "ใต้", translit: "dtâi", meaning: "unter / unten", tone: 2, lesson: 10 }
        ]
    },
    {
        id: 11,
        name: "11. Gefühle & Gesundheit",
        description: "Sag, wie es dir geht und was du brauchst.",
        words: [
            { thai: "สบาย", translit: "sà-baai", meaning: "bequem / wohlauf", tone: 1, lesson: 11 },
            { thai: "เหนื่อย", translit: "nùai", meaning: "müde / erschöpft", tone: 1, lesson: 11 },
            { thai: "ป่วย", translit: "bpùai", meaning: "krank", tone: 1, lesson: 11 },
            { thai: "เจ็บ", translit: "jèp", meaning: "verletzt / schmerzhaft", tone: 1, lesson: 11 },
            { thai: "สุขภาพ", translit: "sùk-khà-phâap", meaning: "Gesundheit", tone: 1, lesson: 11 },
            { thai: "ร้อน", translit: "rɔ́ɔn", meaning: "heiß", tone: 3, lesson: 11 },
            { thai: "หนาว", translit: "nǎao", meaning: "kalt", tone: 4, lesson: 11 },
            { thai: "กลัว", translit: "glǔa", meaning: "Angst haben", tone: 4, lesson: 11 },
            { thai: "ดีใจ", translit: "dii-jai", meaning: "froh / erfreut", tone: 0, lesson: 11 },
            { thai: "เสียใจ", translit: "sǐa-jai", meaning: "traurig / bedauern", tone: 4, lesson: 11 }
        ]
    },
    {
        id: 12,
        name: "12. Fragen & freundlich sein",
        description: "Stelle einfache Fragen und komm höflich ins Gespräch.",
        words: [
            { thai: "อะไร", translit: "à-rai", meaning: "was", tone: 1, lesson: 12 },
            { thai: "ใคร", translit: "khrai", meaning: "wer", tone: 0, lesson: 12 },
            { thai: "ทำไม", translit: "tham-mai", meaning: "warum", tone: 0, lesson: 12 },
            { thai: "เมื่อไร", translit: "mûea-rai", meaning: "wann", tone: 2, lesson: 12 },
            { thai: "ที่ไหน", translit: "thîi-nǎi", meaning: "wo", tone: 2, lesson: 12 },
            { thai: "อย่างไร", translit: "yàang-rai", meaning: "wie", tone: 1, lesson: 12 },
            { thai: "เข้าใจ", translit: "khâo-jai", meaning: "verstehen", tone: 2, lesson: 12 },
            { thai: "ช่วยด้วย", translit: "chûai-dûai", meaning: "Hilfe! / Bitte hilf!", tone: 2, lesson: 12 },
            { thai: "ขอโทษ", translit: "khɔ̌ɔ-thôot", meaning: "Entschuldigung", tone: 4, lesson: 12 },
            { thai: "ขอบคุณ", translit: "khɔ̀ɔp-khun", meaning: "danke", tone: 1, lesson: 12 }
        ]
    }
];

const allCourseWords = courseLessons.flatMap(lesson => lesson.words);
const courseWordByThai = new Map(allCourseWords.map(word => [word.thai, word]));
const legacyStarterWords = new Set(["สวัสดี", "ขอบคุณ", "ไม่", "น้ำ", "กิน", "หิว"]);

function readStoredObject(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key) || "{}");
        return value && typeof value === "object" ? value : {};
    } catch (error) {
        console.error(`Gespeicherte Daten (${key}) konnten nicht gelesen werden:`, error);
        return {};
    }
}

const savedVocabs = readStoredObject("thai_quest_vocabs");
const storedVocabList = Array.isArray(savedVocabs) ? savedVocabs : [];
const customVocabs = [...new Map(storedVocabList
    .filter(word =>
        word &&
        typeof word.thai === "string" &&
        !courseWordByThai.has(word.thai) &&
        !legacyStarterWords.has(word.thai)
    )
    .map(word => {
        const savedLesson = Number.parseInt(word.lesson, 10) || 1;
        const lesson = Math.min(Math.max(savedLesson, 1), courseLessons.length);
        return [word.thai, { ...word, lesson }];
    })
).values()];
const savedDailyLessons = readStoredObject("thai_quest_daily_lessons_v1");
const dailyReviewStorageKey = "thai_quest_daily_review_v1";
const toneDetails = {
    0: { name: "Mittelton (Mid)" },
    1: { name: "Tiefton (Low)" },
    2: { name: "Fallender Ton (Falling)" },
    3: { name: "Hochton (High)" },
    4: { name: "Steigender Ton (Rising)" }
};

const firstIncompleteLesson = courseLessons.findIndex(lesson => !savedDailyLessons[lesson.id]?.completed);
let completedLessonCount = firstIncompleteLesson === -1 ? courseLessons.length : firstIncompleteLesson;
const unlockedLessonCount = Math.min(completedLessonCount + 1, courseLessons.length);
const lessons = Object.fromEntries(courseLessons.map((lesson, index) => {
    const saved = savedDailyLessons[lesson.id] || {};
    return [lesson.id, {
        name: lesson.name,
        completed: index < completedLessonCount && saved.completed === true,
        completedAt: typeof saved.completedAt === "string" ? saved.completedAt : "",
        progress: Number.isInteger(saved.progress) ? Math.min(Math.max(saved.progress, 0), lesson.words.length) : 0,
        examWords: Array.isArray(saved.examWords) ? saved.examWords.filter(word => typeof word === "string") : [],
        examProgress: Number.isInteger(saved.examProgress) ? Math.min(Math.max(saved.examProgress, 0), 5) : 0,
        examScore: Number.isInteger(saved.examScore) ? Math.min(Math.max(saved.examScore, 0), 5) : 0
    }];
}));
let vocabs = [
    ...courseLessons.slice(0, unlockedLessonCount).flatMap(lesson => lesson.words),
    ...customVocabs.filter(word => word.lesson <= unlockedLessonCount)
];

function localDateKey(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function saveDailyLessons() {
    try {
        localStorage.setItem("thai_quest_daily_lessons_v1", JSON.stringify(lessons));
        const savedWords = [...new Map([...vocabs, ...customVocabs]
            .map(word => [word.thai, word])).values()];
        localStorage.setItem("thai_quest_vocabs", JSON.stringify(savedWords));
    } catch (error) {
        console.error("Der Tagesfortschritt konnte nicht gespeichert werden:", error);
        alert("Dein Fortschritt konnte nicht gespeichert werden. Prüfe den freien Gerätespeicher.");
    }
}

function saveDailyReview(review) {
    try {
        localStorage.setItem(dailyReviewStorageKey, JSON.stringify(review));
    } catch (error) {
        console.error("Die Tageswiederholung konnte nicht gespeichert werden:", error);
        alert("Dein Wiederholungsfortschritt konnte nicht gespeichert werden. Prüfe den freien Gerätespeicher.");
    }
}

function getDailyReview() {
    const today = localDateKey();
    const saved = readStoredObject(dailyReviewStorageKey);
    if (saved.date === today && Array.isArray(saved.words)) {
        return {
            date: today,
            words: saved.words,
            progress: Number.isInteger(saved.progress) ? Math.min(Math.max(saved.progress, 0), 10) : 0,
            completed: saved.completed === true
        };
    }

    const pool = [...vocabs];
    for (let index = pool.length - 1; index > 0; index--) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
    }
    return {
        date: today,
        words: pool.slice(0, 10).map(word => word.thai),
        progress: 0,
        completed: false
    };
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
    })[character]);
}

let activeDailySession = null;
function installProgressiveCourse() {
    const container = document.getElementById("lessons-container");
    const style = document.createElement("style");
    style.textContent = `
        .course-intro { margin: 0 0 16px; color: #cbd5e1; line-height: 1.6; }
        .course-lesson { margin: 12px 0; padding: 18px; border: 1px solid #334155; border-radius: 14px; background: #0f172a; }
        .course-lesson.is-current { border-color: #38bdf8; }
        .course-lesson.is-locked { opacity: .68; }
        .course-lesson-heading { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
        .course-lesson h3 { margin: 0 0 6px; color: #f8fafc; font-size: 1.05rem; }
        .course-lesson p { margin: 5px 0 12px; color: #cbd5e1; }
        .course-tone { color: #38bdf8; font-size: .78rem; font-weight: 700; text-transform: uppercase; }
        .course-words { display: flex; flex-wrap: wrap; gap: 6px; margin: 12px 0; }
        .course-word { padding: 5px 8px; border-radius: 8px; background: #1e293b; color: #e2e8f0; }
        .course-status { white-space: nowrap; color: #94a3b8; font-size: .82rem; }
        .course-progress { color: #94a3b8; font-size: .9rem; }
        .daily-question { margin-top: 12px; text-align: center; }
        .daily-question-word { margin: 18px 0 4px; color: #f8fafc; font-size: 3rem; }
        .daily-question-hint { color: #94a3b8; }
        .daily-choices { display: grid; gap: 9px; margin-top: 20px; }
        .daily-choice { padding: 12px; border: 1px solid #475569; border-radius: 10px; background: #1e293b; color: #f8fafc; font: inherit; cursor: pointer; }
        .daily-choice:hover { border-color: #38bdf8; }
        .daily-answer-input { box-sizing: border-box; width: 100%; margin-top: 16px; padding: 12px; border: 1px solid #475569; border-radius: 10px; background: #0f172a; color: #f8fafc; font: inherit; }
        .daily-answer-actions { display: grid; gap: 8px; margin-top: 10px; }
        .daily-answer-switch { padding: 8px; border: 0; background: transparent; color: #38bdf8; font: inherit; cursor: pointer; }
        .daily-exam-result { margin: 18px 0; padding: 14px; border-radius: 10px; background: #1e293b; }
        .daily-feedback { margin: 18px 0; padding: 12px; border-radius: 10px; background: #1e293b; }
        .daily-feedback.is-correct { color: #86efac; }
        .daily-feedback.is-incorrect { color: #fca5a5; }
        .daily-progress-track { height: 7px; margin: 8px 0 16px; border-radius: 8px; background: #334155; }
        .daily-progress-fill { height: 100%; border-radius: inherit; background: #38bdf8; }
        .daily-session-title { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        @media (max-width: 480px) { .course-lesson-heading { flex-direction: column; } }
    `;
    document.head.appendChild(style);

    window.renderLessons = function renderCourseLessons() {
        const subtitle = document.getElementById("mode-subtitle");
        if (subtitle) subtitle.innerText = "Dein geführter Lernpfad für heute";
        const today = localDateKey();
        const currentIndex = courseLessons.findIndex(lesson => !lessons[lesson.id].completed);
        const allComplete = currentIndex === -1;
        const currentLesson = allComplete ? null : courseLessons[currentIndex];
        const currentProgress = currentLesson ? lessons[currentLesson.id].progress : 0;
        const previousLesson = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
        const availableToday = !previousLesson ||
            (lessons[previousLesson.id].completedAt && lessons[previousLesson.id].completedAt < today);
        const review = allComplete ? getDailyReview() : null;
        const lastCourseLesson = courseLessons[courseLessons.length - 1];
        const canReviewToday = allComplete &&
            lessons[lastCourseLesson.id].completedAt < today &&
            !review.completed;
        const reviewCompletedToday = allComplete &&
            lessons[lastCourseLesson.id].completedAt < today &&
            review.completed;

        container.innerHTML = `
            <p class="course-intro">Dein Pfad umfasst ${courseLessons.length} Themen mit jeweils 10 neuen Wörtern. Lerne täglich ein Thema, tippe Antworten selbst ein oder wähle aus. Am Themenende wartet automatisch eine kurze Prüfung ohne Hinweise; danach geht es am nächsten Tag weiter. Training und die freie Prüfung bleiben zusätzlich optional.</p>
            ${courseLessons.map((lesson, index) => {
                const state = lessons[lesson.id];
                const completed = state.completed;
                const isCurrent = index === currentIndex;
                const isAvailable = isCurrent && availableToday;
                const toneNames = [...new Set(lesson.words.map(word => toneDetails[word.tone].name.split(" ")[0]))].join(" · ");
                const status = completed
                    ? "✓ Abgeschlossen"
                    : isAvailable
                        ? state.progress >= lesson.words.length
                            ? `Themenprüfung (${state.examProgress}/5)`
                            : "Heute verfügbar"
                        : isCurrent
                            ? "Morgen geht's weiter"
                            : "🔒 Noch gesperrt";
                const words = completed || isCurrent
                    ? `<div class="course-words">${lesson.words.map(word => `
                        <span class="course-word" lang="th">${escapeHtml(word.thai)}</span>`).join("")}</div>`
                    : "";
                const action = isAvailable
                    ? `<button class="action-btn btn-primary" type="button" onclick="startDailyLesson(${lesson.id})">${state.progress >= lesson.words.length ? `Prüfung fortsetzen (${state.examProgress}/5)` : state.progress ? `Weiterlernen (${state.progress}/10)` : "Tageslektion starten"}</button>`
                    : `<span class="course-status">${status}</span>`;
                return `<article class="course-lesson ${completed ? "is-complete" : isCurrent ? "is-current" : "is-locked"}">
                    <div class="course-lesson-heading"><div>
                        <span class="course-tone">${toneNames} · 10 Wörter</span>
                        <h3>${escapeHtml(lesson.name)}</h3>
                    </div>${action}</div>
                    <p>${escapeHtml(lesson.description)}</p>
                    ${isCurrent && !completed ? `<p class="course-progress">${state.progress < 10 ? `${state.progress} von 10 Wörtern gelernt` : `Themenprüfung: ${state.examProgress} von 5 Fragen`}</p>` : ""}
                    ${words}
                </article>`;
            }).join("")}
            ${allComplete ? `
                <article class="course-lesson ${canReviewToday ? "is-current" : "is-locked"}">
                    <div class="course-lesson-heading"><div>
                        <span class="course-tone">Alle Themen · gemischte Töne</span>
                        <h3>Tägliche Wiederholung</h3>
                    </div>${canReviewToday
                        ? `<button class="action-btn btn-primary" type="button" onclick="startDailyLesson('review')">${review.progress ? `Weiterlernen (${review.progress}/10)` : "10 Wörter wiederholen"}</button>`
                        : `<span class="course-status">${reviewCompletedToday ? "✓ Heute erledigt" : "Morgen wieder verfügbar"}</span>`}</div>
                    <p>${reviewCompletedToday
                        ? "Stark! Morgen wartet eine neue gemischte Runde auf dich."
                        : "Wiederhole jeden Tag zehn zufällig gemischte Wörter und Töne."}</p>
                    ${canReviewToday && review.progress ? `<p class="course-progress">${review.progress} von 10 Wörtern gelernt</p>` : ""}
                </article>
            ` : ""}
            <p class="course-progress">Dein Fortschritt bleibt auf diesem Gerät gespeichert.</p>
        `;
    };

    window.getDailyLessonSession = function getCourseLessonSession(id) {
        if (String(id) === "review") {
            const review = getDailyReview();
            const lastLesson = courseLessons[courseLessons.length - 1];
            if (completedLessonCount !== courseLessons.length ||
                lessons[lastLesson.id].completedAt >= localDateKey() ||
                review.completed) return null;

            const reviewWords = review.words
                .map(thai => vocabs.find(word => word.thai === thai))
                .filter(Boolean);
            if (reviewWords.length !== 10) return null;
            saveDailyReview(review);
            return { id: "review", name: "Tägliche Wiederholung", words: reviewWords, progress: review.progress };
        }

        const lesson = courseLessons.find(item => item.id === Number(id));
        const index = courseLessons.indexOf(lesson);
        if (!lesson || index !== completedLessonCount) return null;
        const previous = index > 0 ? lessons[courseLessons[index - 1].id] : null;
        const progress = lessons[lesson.id].progress;
        if (previous && (!previous.completed || (!progress && previous.completedAt >= localDateKey()))) return null;
        const state = lessons[lesson.id];
        if (progress >= lesson.words.length && state.examWords.length !== 5) {
            state.examWords = chooseTopicExamWords(lesson.words);
            state.examProgress = 0;
            state.examScore = 0;
            saveDailyLessons();
        }
        const savedExamWords = state.examWords
            .map(thai => lesson.words.find(word => word.thai === thai))
            .filter(Boolean);
        return {
            id: lesson.id,
            name: lesson.name,
            words: lesson.words,
            progress,
            phase: progress >= lesson.words.length ? "exam" : "learn",
            examWords: savedExamWords.length === 5 ? savedExamWords : [],
            examProgress: state.examProgress,
            examScore: state.examScore,
            answerMode: "typed"
        };
    };

    function updateLearningStreak() {
        const today = localDateKey();
        const lastStudyDate = localStorage.getItem("thai_quest_last_study_date");
        if (lastStudyDate === today) return;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        streak = !lastStudyDate || lastStudyDate === localDateKey(yesterday) ? streak + 1 : 1;
        localStorage.setItem("thai_quest_last_study_date", today);
    }

    function chooseTopicExamWords(words) {
        const shuffled = [...words];
        for (let index = shuffled.length - 1; index > 0; index--) {
            const swapIndex = Math.floor(Math.random() * (index + 1));
            [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
        }
        return shuffled.slice(0, 5).map(word => word.thai);
    }

    window.recordDailyLessonAnswer = function recordCourseLessonAnswer(id, nextProgress, correct = false) {
        if (!activeDailySession || String(activeDailySession.id) !== String(id)) return false;
        if (activeDailySession.id === "review") {
            if (nextProgress !== activeDailySession.progress + 1 ||
                nextProgress > activeDailySession.words.length) return false;
            activeDailySession.progress = nextProgress;
            const review = getDailyReview();
            review.progress = nextProgress;
            if (nextProgress === 10) review.completed = true;
            saveDailyReview(review);
            if (nextProgress === 10) {
                xp += 50;
                updateLearningStreak();
                updateHUD();
            }
            return nextProgress === 10;
        }

        const state = lessons[id];
        if (activeDailySession.phase === "exam") {
            if (nextProgress !== state.examProgress + 1 || nextProgress > 5) return false;
            state.examProgress = nextProgress;
            if (correct) state.examScore += 1;
            activeDailySession.examProgress = nextProgress;
            activeDailySession.examScore = state.examScore;
            if (nextProgress === 5 && state.examScore >= 4) {
                state.completed = true;
                state.completedAt = localDateKey();
                completedLessonCount = Math.min(completedLessonCount + 1, courseLessons.length);
                xp += 50;
                updateLearningStreak();
                const newlyUnlocked = courseLessons[id];
                if (newlyUnlocked) {
                    const existing = new Set(vocabs.map(word => word.thai));
                    const newlyUnlockedWords = [
                        ...newlyUnlocked.words,
                        ...customVocabs.filter(word => word.lesson === newlyUnlocked.id)
                    ];
                    newlyUnlockedWords.forEach(word => {
                        if (!existing.has(word.thai)) {
                            vocabs.push(word);
                            existing.add(word.thai);
                        }
                    });
                    if (lessonSelect) {
                        lessonSelect.innerHTML = courseLessons.slice(0, completedLessonCount + 1).map(lesson =>
                            `<option value="${lesson.id}">${escapeHtml(lesson.name)}</option>`
                        ).join("");
                    }
                }
                updateHUD();
            } else if (nextProgress === 5) {
                state.examProgress = 0;
                state.examScore = 0;
                state.examWords = chooseTopicExamWords(courseLessons[id - 1].words);
            }
            saveDailyLessons();
            return nextProgress === 5 && state.completed;
        }

        if (nextProgress !== state.progress + 1 || nextProgress > activeDailySession.words.length) return false;
        state.progress = nextProgress;
        activeDailySession.progress = nextProgress;
        if (nextProgress === activeDailySession.words.length) {
            state.examWords = chooseTopicExamWords(activeDailySession.words);
            state.examProgress = 0;
            state.examScore = 0;
            activeDailySession.phase = "exam";
            activeDailySession.examWords = state.examWords
                .map(thai => activeDailySession.words.find(word => word.thai === thai))
                .filter(Boolean);
        }
        saveDailyLessons();
        return false;
    };

    window.startDailyLesson = function startCourseLesson(id) {
        const session = window.getDailyLessonSession(id);
        if (!session) {
            window.renderLessons();
            return;
        }
        activeDailySession = session;
        renderDailyQuestion(session.phase === "exam" ? session.examProgress : session.progress);
    };

    function renderDailyQuestion(index, feedback = null) {
        const isExam = activeDailySession.phase === "exam";
        const questionWords = isExam ? activeDailySession.examWords : activeDailySession.words;
        const word = questionWords[index];
        if (!word) {
            renderDailyCompletion();
            return;
        }

        const title = isExam ? "🎓 Themenprüfung · ohne Hinweise" : "📚 Neues Wort lernen";
        const candidates = [...new Map(vocabs
            .filter(candidate => candidate.meaning !== word.meaning)
            .map(candidate => [candidate.meaning, candidate.meaning])).values()];
        for (let i = candidates.length - 1; i > 0; i--) {
            const swapIndex = Math.floor(Math.random() * (i + 1));
            [candidates[i], candidates[swapIndex]] = [candidates[swapIndex], candidates[i]];
        }
        const options = [word.meaning, ...candidates.slice(0, 3)];
        for (let i = options.length - 1; i > 0; i--) {
            const swapIndex = Math.floor(Math.random() * (i + 1));
            [options[i], options[swapIndex]] = [options[swapIndex], options[i]];
        }

        container.innerHTML = `
            <div class="daily-session-title">
                <span class="course-tone">${title}</span>
                <span class="course-status">${index + 1} / ${isExam ? 5 : 10}</span>
            </div>
            <div class="daily-progress-track"><div class="daily-progress-fill" style="width:${index / (isExam ? 5 : 10) * 100}%"></div></div>
            <div class="daily-question">
                <div class="word-row" style="justify-content:center">
                    <div class="daily-question-word" lang="th">${escapeHtml(word.thai)}</div>
                    <button class="audio-btn" type="button" data-daily-audio="${escapeHtml(word.thai)}" aria-label="Wort anhören">🔊</button>
                </div>
                ${!isExam ? `<p class="daily-question-hint">${escapeHtml(word.translit)} · ${escapeHtml(toneDetails[word.tone].name)}</p>` : ""}
                <p>${isExam ? "Schreibe die Bedeutung aus dem Gedächtnis auf." : "Was bedeutet dieses Wort?"}</p>
                ${feedback ? `
                    <div class="daily-feedback ${feedback.correct ? "is-correct" : "is-incorrect"}">
                        ${feedback.correct ? "Richtig! Gut gemacht." : `Noch nicht ganz. Die richtige Bedeutung ist: ${escapeHtml(word.meaning)}.`}
                        ${!isExam ? `<p>Ton: ${escapeHtml(toneDetails[word.tone].name)}</p>` : ""}
                    </div>
                    ${feedback.examFinished ? `<div class="daily-exam-result">${feedback.passed
                        ? "Themenprüfung bestanden! Du kannst morgen mit dem nächsten Thema weitermachen."
                        : `Noch nicht bestanden: ${feedback.score} von 5 richtig. Versuch es gleich noch einmal.`}</div>` : ""}
                    <button class="action-btn btn-primary" type="button" onclick="continueDailyLesson()">Weiter ➔</button>
                ` : isExam || activeDailySession.answerMode === "typed" ? `
                    <form class="daily-answer-actions" onsubmit="submitDailyTypedAnswer(event, ${index})">
                        <input class="daily-answer-input" type="text" name="answer" autocomplete="off" required
                            aria-label="Deine Antwort" placeholder="Deine Antwort auf Deutsch">
                        <button class="action-btn btn-primary" type="submit">Antwort prüfen</button>
                    </form>
                    ${!isExam ? `<button class="daily-answer-switch" type="button" onclick="setDailyAnswerMode('choices', ${index})">Lieber eine Antwort auswählen</button>` : ""}
                ` : `
                    <div class="daily-choices">${options.map((option, optionIndex) => `
                        <button class="daily-choice" type="button" onclick="answerDailyLesson(${index}, ${optionIndex})">${escapeHtml(option)}</button>`).join("")}</div>
                    <button class="daily-answer-switch" type="button" onclick="setDailyAnswerMode('typed', ${index})">Antwort selbst eintippen</button>
                `}
            </div>
        `;
        container.querySelector("[data-daily-audio]")?.addEventListener("click", event => {
            playAudio(event.currentTarget.dataset.dailyAudio);
        });
        activeDailySession.options = options;
    }

    function normalizeMeaning(value) {
        return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase("de").replace(/[.,!?]/g, "").trim();
    }

    function meaningMatches(answer, meaning) {
        const normalizedAnswer = normalizeMeaning(answer);
        return normalizedAnswer === normalizeMeaning(meaning) ||
            meaning.split("/").some(alias => normalizeMeaning(alias) === normalizedAnswer);
    }

    window.setDailyAnswerMode = function setCourseAnswerMode(mode, index) {
        if (!activeDailySession || activeDailySession.phase === "exam" ||
            !["typed", "choices"].includes(mode)) return;
        activeDailySession.answerMode = mode;
        renderDailyQuestion(index);
    };

    window.submitDailyTypedAnswer = function submitCourseTypedAnswer(event, index) {
        event.preventDefault();
        const answer = new FormData(event.currentTarget).get("answer");
        if (typeof answer === "string") window.answerDailyLesson(index, answer);
    };

    window.answerDailyLesson = function answerCourseLesson(index, answer) {
        if (!activeDailySession) return;
        const isExam = activeDailySession.phase === "exam";
        const expectedIndex = isExam ? activeDailySession.examProgress : activeDailySession.progress;
        if (index !== expectedIndex) return;
        const word = isExam ? activeDailySession.examWords[index] : activeDailySession.words[index];
        if (!word) return;
        const selectedMeaning = typeof answer === "number"
            ? activeDailySession.options[answer]
            : answer;
        if (typeof selectedMeaning !== "string") return;
        const correct = meaningMatches(selectedMeaning, word.meaning);
        if (correct && !isExam) {
            xp += 5;
            updateHUD();
        }
        const nextProgress = index + 1;
        const completed = window.recordDailyLessonAnswer(activeDailySession.id, nextProgress, correct);
        if (completed) {
            renderDailyCompletion();
            return;
        }
        if (!isExam && activeDailySession.phase === "exam") {
            renderDailyQuestion(0);
            return;
        }
        const examFinished = isExam && nextProgress === 5;
        renderDailyQuestion(index, {
            correct,
            examFinished,
            passed: examFinished && lessons[activeDailySession.id].completed,
            score: activeDailySession.examScore
        });
    };

    window.continueDailyLesson = function continueCourseLesson() {
        if (!activeDailySession) return;
        window.startDailyLesson(activeDailySession.id);
    };

    function renderDailyCompletion() {
        const isReview = activeDailySession?.id === "review";
        const title = isReview ? "Tageswiederholung geschafft!" : "Themenprüfung bestanden!";
        container.innerHTML = `
            <div class="daily-question">
                <div style="font-size:3rem">🎉</div>
                <h3>${title}</h3>
                <p>${isReview ? "Du hast alle 10 Wörter wiederholt." : "Du hast 10 neue Wörter gelernt und die Prüfung bestanden."} +50 XP Bonus!</p>
                <button class="action-btn btn-primary" type="button" onclick="finishDailyLesson()">Weiter zum Lernpfad</button>
            </div>
        `;
    }

    window.finishDailyLesson = function finishCourseLesson() {
        activeDailySession = null;
        window.renderLessons();
    };

    window.completeLesson = function completeCourseLesson(id) {
        console.warn("Lektionen werden automatisch nach zehn beantworteten Wörtern abgeschlossen.", id);
    };

    const lessonSelect = document.getElementById("input-lesson");
    if (lessonSelect) {
        lessonSelect.innerHTML = courseLessons.slice(0, unlockedLessonCount).map(lesson =>
            `<option value="${lesson.id}">${escapeHtml(lesson.name)}</option>`
        ).join("");
    }

    const navButtons = Array.from(document.querySelectorAll(".nav-btn"));
    const lessonTab = navButtons.find(button => button.getAttribute("onclick") === "switchTab('lessons')");
    const addTab = navButtons.find(button => button.getAttribute("onclick") === "switchTab('add')");
    const lessonsTitle = document.querySelector("#section-lessons h3");
    const addTitle = document.querySelector("#section-add h3, #section-add h2");
    if (lessonTab) lessonTab.textContent = "🗺️ Lernpfad";
    if (addTab) addTab.textContent = "+ Eigene Wörter";
    if (lessonsTitle) lessonsTitle.textContent = `Dein täglicher Lernpfad · ${courseLessons.length} Themen`;
    if (addTitle) addTitle.textContent = "Eigenes Wort hinzufügen (optional)";

    if (container) {
        window.renderLessons();
        window.switchTab("lessons");
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installProgressiveCourse, { once: true });
} else {
    installProgressiveCourse();
}
