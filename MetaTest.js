
// META Egészségtervező Teszt (teljesebb változat webes formában)
import React, { useState } from "react";

const questions = [
  // Életmód
  {
    id: 1,
    category: "Életmód",
    text: "Milyen gyakran sportol fizikai aktivitás céljából?",
    options: [
      { text: "Naponta", score: 0 },
      { text: "Hetente többször", score: 1 },
      { text: "Hetente egyszer", score: 2 },
      { text: "Ritkábban vagy soha", score: 3 },
    ],
  },
  {
    id: 2,
    category: "Életmód",
    text: "Dohányzik?",
    options: [
      { text: "Nem, soha", score: 0 },
      { text: "Korábban dohányoztam, de leszoktam", score: 1 },
      { text: "Igen, ritkán", score: 2 },
      { text: "Igen, rendszeresen", score: 3 },
    ],
  },
  {
    id: 3,
    category: "Életmód",
    text: "Milyen gyakran fogyaszt alkoholt?",
    options: [
      { text: "Soha vagy évente pár alkalommal", score: 0 },
      { text: "Havonta pár alkalommal", score: 1 },
      { text: "Hetente pár alkalommal", score: 2 },
      { text: "Naponta", score: 3 },
    ],
  },
  {
    id: 4,
    category: "Életmód",
    text: "Hogyan jellemezné jelenlegi táplálkozási szokásait?",
    options: [
      { text: "Többnyire egészséges, változatos étrendet követek", score: 0 },
      { text: "Figyelek az étkezésre, de nem mindig sikerül", score: 1 },
      { text: "Nem különösebben figyelek rá", score: 2 },
      { text: "Nagyon rendszertelenül és egészségtelenül étkezem", score: 3 },
    ],
  },
  {
    id: 5,
    category: "Életmód",
    text: "Mennyire érzi magát stresszesnek a mindennapokban?",
    options: [
      { text: "Egyáltalán nem", score: 0 },
      { text: "Néha stresszelek", score: 1 },
      { text: "Gyakran stresszes vagyok", score: 2 },
      { text: "Állandóan stresszelek", score: 3 },
    ],
  },
  // Családi anamnézis
  {
    id: 6,
    category: "Családi anamnézis",
    text: "Fordult elő az Ön közvetlen családjában (szülők, testvérek) szív- és érrendszeri betegség?",
    options: [
      { text: "Nem", score: 0 },
      { text: "Igen, 60 éves kor felett", score: 1 },
      { text: "Igen, 60 éves kor előtt", score: 2 },
    ],
  },
  {
    id: 7,
    category: "Családi anamnézis",
    text: "Volt a családjában 2-es típusú cukorbetegség?",
    options: [
      { text: "Nem", score: 0 },
      { text: "Igen, egy családtagnál", score: 1 },
      { text: "Igen, több családtagnál", score: 2 },
    ],
  },
  // Mini mentális egészségfelmérés (rövidített MET)
  {
    id: 8,
    category: "Mentális egészség",
    text: "Milyen gyakran érzi magát lehangoltnak vagy érdektelennek?",
    options: [
      { text: "Soha", score: 0 },
      { text: "Ritkán", score: 1 },
      { text: "Gyakran", score: 2 },
      { text: "Szinte mindig", score: 3 },
    ],
  },
  {
    id: 9,
    category: "Mentális egészség",
    text: "Érezte úgy az elmúlt hónapban, hogy nem tudja irányítani az életét?",
    options: [
      { text: "Soha", score: 0 },
      { text: "Néha", score: 1 },
      { text: "Gyakran", score: 2 },
      { text: "Állandóan", score: 3 },
    ],
  },
];

const getResult = (score) => {
  if (score <= 5) return "Kiváló egészségi állapot. Jelenleg alacsony kockázat!";
  if (score <= 10) return "Átlagos kockázat – kis változtatások ajánlottak.";
  if (score <= 15) return "Emelkedett kockázat – érdemes konzultálni szakemberrel.";
  return "Magas kockázat – javasolt orvosi és életmódbeli beavatkozás.";
};

export default function MetaTest() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (questionId, score) => {
    setAnswers({ ...answers, [questionId]: score });
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      setSubmitted(true);
    } else {
      alert("Kérlek válaszolj minden kérdésre!");
    }
  };

  const totalScore = Object.values(answers).reduce((acc, val) => acc + val, 0);
  const resultText = getResult(totalScore);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">META Egészségtervező Teszt</h1>
      {questions.map((q) => (
        <div key={q.id} className="mb-4">
          <p className="font-medium mb-2">{q.text}</p>
          <div className="space-y-1">
            {q.options.map((opt, idx) => (
              <label key={idx} className="block">
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={opt.score}
                  onChange={() => handleAnswer(q.id, opt.score)}
                  checked={answers[q.id] === opt.score}
                  className="mr-2"
                />
                {opt.text}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
      >
        Eredmény megtekintése
      </button>
      {submitted && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-xl">
          <h2 className="text-lg font-semibold mb-2">Összpontszám: {totalScore}</h2>
          <p>{resultText}</p>
        </div>
      )}
    </div>
  );
}
