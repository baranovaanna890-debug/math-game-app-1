import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGameById, Question } from '@/data/games';
import { useGameStore } from '@/store/gameStore';
import Icon from '@/components/ui/icon';

type Phase = 'intro' | 'playing' | 'result';

export default function GamePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const game = getGameById(Number(id));
  const { saveResult, getResult } = useGameStore();

  const [phase, setPhase] = useState<Phase>('intro');
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [matchState, setMatchState] = useState<Record<string, string>>({});
  const [matchSelected, setMatchSelected] = useState<string | null>(null);
  const [sortItems, setSortItems] = useState<string[]>([]);
  const [binaryAnswer, setBinaryAnswer] = useState<string | null>(null);

  const prevResult = getResult(Number(id));

  useEffect(() => {
    if (game && phase === 'playing') {
      const q = game.questions[qIndex];
      if (q.type === 'sort' && q.items) setSortItems([...q.items].sort(() => Math.random() - 0.5));
      if (q.type === 'match') { setMatchState({}); setMatchSelected(null); }
      setBinaryAnswer(null);
      setSelected(null);
      setAnswered(false);
    }
  }, [qIndex, phase, game]);

  if (!game) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-muted-foreground">Игра не найдена</p>
    </div>
  );

  const q = game.questions[qIndex];
  const total = game.questions.length;

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correct) setScore(s => s + 1);
  };

  const handleBinary = (answer: string) => {
    if (answered) return;
    setBinaryAnswer(answer);
    setAnswered(true);
    if (answer === q.answer) setScore(s => s + 1);
  };

  const handleMatch = (side: 'left' | 'right', val: string) => {
    if (answered) return;
    if (side === 'left') {
      setMatchSelected(val);
    } else {
      if (matchSelected) {
        const newState = { ...matchState, [matchSelected]: val };
        setMatchState(newState);
        setMatchSelected(null);
        const pairs = q.pairs || [];
        if (Object.keys(newState).length === pairs.length) {
          setAnswered(true);
          const correct = pairs.every(p => newState[p.left] === p.right);
          if (correct) setScore(s => s + 1);
        }
      }
    }
  };

  const moveSort = (fromIdx: number, dir: -1 | 1) => {
    const toIdx = fromIdx + dir;
    if (toIdx < 0 || toIdx >= sortItems.length) return;
    const arr = [...sortItems];
    [arr[fromIdx], arr[toIdx]] = [arr[toIdx], arr[fromIdx]];
    setSortItems(arr);
  };

  const checkSort = () => {
    if (answered) return;
    setAnswered(true);
    const correct = q.items!.every((item, i) => item === sortItems[i]);
    if (correct) setScore(s => s + 1);
  };

  const next = () => {
    if (qIndex + 1 < total) {
      setQIndex(i => i + 1);
    } else {
      saveResult(game.id, score + (answered && isCorrect() ? 0 : 0), total);
      const finalScore = score;
      saveResult(game.id, finalScore, total);
      setPhase('result');
    }
  };

  const isCorrect = () => {
    if (q.type === 'single') return selected === q.correct;
    if (q.type === 'binary') return binaryAnswer === q.answer;
    if (q.type === 'match') return (q.pairs || []).every(p => matchState[p.left] === p.right);
    if (q.type === 'sort') return (q.items || []).every((item, i) => item === sortItems[i]);
    return false;
  };

  const percent = Math.round((score / total) * 100);

  // INTRO
  if (phase === 'intro') return (
    <div className="min-h-screen flex flex-col p-4 pt-12">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 text-muted-foreground mb-6">
        <Icon name="ArrowLeft" size={18} />
        <span className="text-sm">Назад</span>
      </button>

      <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${game.color} flex items-center justify-center text-3xl mb-6 mx-auto animate-scale-in`}>
        {game.icon.length <= 3 ? <span className="text-white font-bold text-sm">{game.icon}</span> : game.icon}
      </div>

      <h1 className="text-2xl font-bold text-center mb-2">{game.title}</h1>
      <p className="text-muted-foreground text-center text-sm mb-2">{game.description}</p>
      <div className="flex justify-center gap-2 mb-8">
        <span className="glass px-3 py-1 rounded-full text-xs border border-border">{game.grade} класс</span>
        <span className="glass px-3 py-1 rounded-full text-xs border border-border">{total} заданий</span>
        <span className="glass px-3 py-1 rounded-full text-xs border border-border">{game.topic}</span>
      </div>

      {prevResult && (
        <div className="glass rounded-2xl p-4 border border-border mb-6 text-center">
          <p className="text-xs text-muted-foreground mb-1">Предыдущий результат</p>
          <p className="text-2xl font-bold neon-green">{prevResult.score}/{prevResult.total}</p>
          <p className="text-xs text-muted-foreground">{Math.round((prevResult.score / prevResult.total) * 100)}% верно</p>
        </div>
      )}

      <button
        onClick={() => { setPhase('playing'); setQIndex(0); setScore(0); }}
        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base animate-pulse-glow"
      >
        {prevResult ? 'Играть снова' : 'Начать игру'}
      </button>
    </div>
  );

  // RESULT
  if (phase === 'result') return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="text-6xl mb-4">
        {percent >= 80 ? '🏆' : percent >= 60 ? '👍' : '📚'}
      </div>
      <h2 className="text-2xl font-bold mb-2">
        {percent >= 80 ? 'Отлично!' : percent >= 60 ? 'Хорошо!' : 'Попробуй ещё раз'}
      </h2>
      <p className="text-muted-foreground text-sm mb-6">{game.title}</p>

      <div className="glass rounded-3xl p-6 border border-border w-full max-w-xs mb-8">
        <div className="text-5xl font-bold mb-1" style={{ color: percent >= 80 ? 'hsl(142 71% 45%)' : percent >= 60 ? 'hsl(38 92% 50%)' : 'hsl(0 84% 60%)' }}>
          {score}/{total}
        </div>
        <div className="text-muted-foreground text-sm mb-4">{percent}% правильных ответов</div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{
              width: `${percent}%`,
              background: percent >= 80 ? 'hsl(142 71% 45%)' : percent >= 60 ? 'hsl(38 92% 50%)' : 'hsl(0 84% 60%)'
            }}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={() => { setPhase('playing'); setQIndex(0); setScore(0); }}
          className="py-3 rounded-2xl bg-primary text-primary-foreground font-semibold"
        >
          Сыграть ещё раз
        </button>
        <button
          onClick={() => navigate('/')}
          className="py-3 rounded-2xl glass border border-border text-foreground font-semibold"
        >
          К каталогу
        </button>
        {percent >= 80 && (
          <button
            onClick={() => navigate('/certificate')}
            className="py-3 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-semibold"
          >
            🏅 Получить сертификат
          </button>
        )}
      </div>
    </div>
  );

  // PLAYING
  return (
    <div className="min-h-screen flex flex-col p-4 pt-10">
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate('/')} className="p-1">
          <Icon name="X" size={20} className="text-muted-foreground" />
        </button>
        <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full progress-bar rounded-full transition-all"
            style={{ width: `${((qIndex) / total) * 100}%` }}
          />
        </div>
        <span className="text-sm text-muted-foreground font-mono">{qIndex + 1}/{total}</span>
      </div>

      {/* Score */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-xs text-muted-foreground">Очки: {score}</span>
        <span className={`text-xs font-medium px-2 py-1 rounded-full glass border border-border ${
          game.type === 'quiz' ? 'text-blue-400' :
          game.type === 'match' ? 'text-purple-400' :
          game.type === 'binary' ? 'text-red-400' :
          game.type === 'sort' ? 'text-orange-400' : 'text-green-400'
        }`}>
          {game.type === 'quiz' ? 'Викторина' :
           game.type === 'match' ? 'Сопоставление' :
           game.type === 'binary' ? 'Верно/Неверно' :
           game.type === 'sort' ? 'Сортировка' : 'Игра'}
        </span>
      </div>

      {/* Question */}
      <div className="glass rounded-2xl p-4 border border-border mb-6 animate-scale-in">
        <p className="text-base font-semibold leading-snug">{q.text}</p>
      </div>

      {/* SINGLE CHOICE */}
      {q.type === 'single' && (
        <div className="flex flex-col gap-3 flex-1">
          {q.options?.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className={`w-full text-left py-3 px-4 rounded-2xl border transition-all font-medium text-sm ${
                !answered ? 'glass border-border active:scale-95' :
                i === q.correct ? 'bg-green-500/20 border-green-500 text-green-300' :
                i === selected && i !== q.correct ? 'bg-red-500/20 border-red-500 text-red-300' :
                'glass border-border opacity-50'
              }`}
            >
              <span className="text-muted-foreground mr-2 font-mono text-xs">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* BINARY */}
      {q.type === 'binary' && (
        <div className="flex gap-3 flex-1">
          {['Верно', 'Неверно'].map(opt => (
            <button
              key={opt}
              onClick={() => handleBinary(opt)}
              className={`flex-1 py-6 rounded-2xl border text-base font-bold transition-all ${
                !answered ? 'glass border-border active:scale-95' :
                opt === q.answer ? 'bg-green-500/20 border-green-500 text-green-300' :
                opt === binaryAnswer && opt !== q.answer ? 'bg-red-500/20 border-red-500 text-red-300' :
                'glass border-border opacity-50'
              }`}
            >
              {opt === 'Верно' ? '✅' : '❌'}
              <br />{opt}
            </button>
          ))}
        </div>
      )}

      {/* MATCH */}
      {q.type === 'match' && q.pairs && (
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              {q.pairs.map(p => (
                <button
                  key={p.left}
                  onClick={() => handleMatch('left', p.left)}
                  className={`py-3 px-2 rounded-xl border text-xs font-medium transition-all ${
                    matchSelected === p.left ? 'border-primary bg-primary/20 text-primary' :
                    matchState[p.left] ? 'border-green-500 bg-green-500/10 text-green-300' :
                    'glass border-border'
                  }`}
                >
                  {p.left}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {q.pairs.map(p => (
                <button
                  key={p.right}
                  onClick={() => handleMatch('right', p.right)}
                  className={`py-3 px-2 rounded-xl border text-xs font-medium transition-all ${
                    Object.values(matchState).includes(p.right) ? 'border-green-500 bg-green-500/10 text-green-300' :
                    matchSelected ? 'border-primary/50 bg-primary/10 active:scale-95' : 'glass border-border'
                  }`}
                >
                  {p.right}
                </button>
              ))}
            </div>
          </div>
          {answered && (
            <div className={`mt-4 p-3 rounded-xl text-sm text-center font-medium ${
              (q.pairs || []).every(p => matchState[p.left] === p.right)
                ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
            }`}>
              {(q.pairs || []).every(p => matchState[p.left] === p.right) ? '✅ Верно!' : '❌ Неверно'}
            </div>
          )}
        </div>
      )}

      {/* SORT */}
      {q.type === 'sort' && (
        <div className="flex-1">
          <div className="flex flex-col gap-2 mb-4">
            {sortItems.map((item, i) => (
              <div key={item} className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs w-4">{i + 1}.</span>
                <div className="flex-1 glass border border-border rounded-xl py-2 px-3 text-sm font-medium">
                  {item}
                </div>
                <div className="flex flex-col gap-1">
                  <button onClick={() => moveSort(i, -1)} disabled={i === 0 || answered} className="p-1 disabled:opacity-30">
                    <Icon name="ChevronUp" size={14} className="text-muted-foreground" />
                  </button>
                  <button onClick={() => moveSort(i, 1)} disabled={i === sortItems.length - 1 || answered} className="p-1 disabled:opacity-30">
                    <Icon name="ChevronDown" size={14} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {!answered && (
            <button onClick={checkSort} className="w-full py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm">
              Проверить порядок
            </button>
          )}
          {answered && (
            <div className={`p-3 rounded-xl text-sm text-center font-medium ${
              (q.items || []).every((item, i) => item === sortItems[i])
                ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
            }`}>
              {(q.items || []).every((item, i) => item === sortItems[i])
                ? '✅ Порядок верный!' : `❌ Верный порядок: ${(q.items || []).join(' → ')}`}
            </div>
          )}
        </div>
      )}

      {/* Next button */}
      {answered && (
        <button
          onClick={next}
          className="mt-4 w-full py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base animate-fade-in"
        >
          {qIndex + 1 < total ? 'Следующий вопрос →' : 'Завершить'}
        </button>
      )}
    </div>
  );
}
