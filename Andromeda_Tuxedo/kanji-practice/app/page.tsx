'use client';

import { useState } from 'react';

type KanjiInfo = {
  kanji: string;
  readings: {
    onyomi: string[];
    kunyomi: string[];
  };
  examples: string[];
};

const kanjiData: KanjiInfo[] = [
  {
    kanji: '日',
    readings: {
      onyomi: ['ニチ', 'ジツ'],
      kunyomi: ['ひ', 'び', 'か'],
    },
    examples: ['日本 (にほん)', '日曜日 (にちようび)', '日記 (にっき)'],
  },
  {
    kanji: '水',
    readings: {
      onyomi: ['スイ'],
      kunyomi: ['みず'],
    },
    examples: ['水曜日 (すいようび)', '水道 (すいどう)', '水着 (みずぎ)'],
  },
  {
    kanji: '学',
    readings: {
      onyomi: ['ガク'],
      kunyomi: ['まな.ぶ'],
    },
    examples: ['学生 (がくせい)', '学校 (がっこう)', '学問 (がくもん)'],
  },
  {
    kanji: '人',
    readings: {
      onyomi: ['ジン', 'ニン'],
      kunyomi: ['ひと'],
    },
    examples: ['日本人 (にほんじん)', '人口 (じんこう)', '人気 (にんき)'],
  },
];

const KanjiSelector = ({
  selectedKanji,
  onSelect,
}: {
  selectedKanji: KanjiInfo;
  onSelect: (kanji: KanjiInfo) => void;
}) => (
  <div className="lg:w-1/3">
    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
      Choose a kanji
    </h2>
    <div className="grid grid-cols-4 gap-4">
      {kanjiData.map((kanji) => (
        <button
          key={kanji.kanji}
          className={`text-4xl w-16 h-16 flex items-center justify-center rounded-xl border-2 font-medium shadow-sm transition hover:bg-green-100 dark:hover:bg-green-900 ${
            selectedKanji.kanji === kanji.kanji
              ? 'bg-green-200 dark:bg-green-800 border-green-500'
              : 'border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600'
          }`}
          onClick={() => onSelect(kanji)}
        >
          {kanji.kanji}
        </button>
      ))}
    </div>
  </div>
);

const KanjiDetails = ({ kanji }: { kanji: KanjiInfo }) => (
  <div className="lg:w-2/3">
    <div className="bg-green-50 dark:bg-gray-800 border border-green-100 dark:border-gray-700 rounded-xl p-6 shadow-inner">
      <h2 className="text-3xl font-bold text-green-600 dark:text-green-300 mb-4">
        {kanji.kanji}
      </h2>
      <div className="space-y-2 text-lg">
        <p>
          <span className="font-semibold text-gray-700 dark:text-gray-200">Onyomi:</span>{' '}
          {kanji.readings.onyomi.join(', ')}
        </p>
        <p>
          <span className="font-semibold text-gray-700 dark:text-gray-200">Kunyomi:</span>{' '}
          {kanji.readings.kunyomi.join(', ')}
        </p>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Example words
        </h3>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
          {kanji.examples.map((example, i) => (
            <li key={i}>{example}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const App = () => {
  const [selectedKanji, setSelectedKanji] = useState<KanjiInfo>(kanjiData[0]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto shadow-lg bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl font-bold text-center mb-10 text-green-700 dark:text-green-400">
          Kanji practice
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          <KanjiSelector selectedKanji={selectedKanji} onSelect={setSelectedKanji} />
          <KanjiDetails kanji={selectedKanji} />
        </div>
      </div>
    </main>
  );
};

export default App;
