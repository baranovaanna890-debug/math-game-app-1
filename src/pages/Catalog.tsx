import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GAMES } from '@/data/games';
import { useGameStore } from '@/store/gameStore';
import Icon from '@/components/ui/icon';

const GRADES = [7, 8, 9] as const;

const GRADE_LABELS: Record<number, string> = {
  7: '7 класс — Основы',
  8: '8 класс — Углублённый',
  9: '9 класс — Профессионал',
};

const GRADE_DESC: Record<number, string> = {
  7: 'Информация, устройства, сети',
  8: 'Логика, БД, программирование',
  9: 'Python, алгоритмы, ИИ',
};

export default function Catalog() {
  const navigate = useNavigate();
  const [activeGrade, setActiveGrade] = useState<7 | 8 | 9>(7);
  const { getResult, getCompletedCount, getAveragePercent } = useGameStore();

  const games = GAMES.filter(g => g.grade === activeGrade);
  const completed = getCompletedCount();
  const avg = getAveragePercent();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="grid-bg sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur px-4 pt-10 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-bold neon-blue">ИнфоКвест</h1>
            <p className="text-xs text-muted-foreground">Информатика 7–9 класс</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/stats')}
              className="glass rounded-xl p-2 border border-border"
            >
              <Icon name="BarChart2" size={20} className="text-primary" />
            </button>
            <button
              onClick={() => navigate('/certificate')}
              className="glass rounded-xl p-2 border border-border"
            >
              <Icon name="Award" size={20} className="text-yellow-400" />
            </button>
          </div>
        </div>

        {/* Mini stats */}
        <div className="flex gap-2 mb-3">
          <div className="glass rounded-xl px-3 py-2 flex-1 text-center border border-border">
            <div className="text-lg font-bold text-primary">{completed}/30</div>
            <div className="text-[10px] text-muted-foreground">пройдено</div>
          </div>
          <div className="glass rounded-xl px-3 py-2 flex-1 text-center border border-border">
            <div className="text-lg font-bold neon-green">{avg}%</div>
            <div className="text-[10px] text-muted-foreground">средний балл</div>
          </div>
          <div className="glass rounded-xl px-3 py-2 flex-1 text-center border border-border">
            <div className="text-lg font-bold text-[hsl(var(--orange))]">
              {Math.round((completed / 30) * 100)}%
            </div>
            <div className="text-[10px] text-muted-foreground">прогресс</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full progress-bar rounded-full transition-all duration-500"
            style={{ width: `${(completed / 30) * 100}%` }}
          />
        </div>
      </div>

      {/* Grade tabs */}
      <div className="px-4 pt-4">
        <div className="flex gap-2 mb-4">
          {GRADES.map(grade => (
            <button
              key={grade}
              onClick={() => setActiveGrade(grade)}
              className={`flex-1 rounded-xl py-2 text-sm font-medium transition-all border ${
                activeGrade === grade
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'glass border-border text-muted-foreground'
              }`}
            >
              {grade} кл.
            </button>
          ))}
        </div>

        {/* Grade header */}
        <div className="mb-4">
          <h2 className="text-base font-bold text-foreground">{GRADE_LABELS[activeGrade]}</h2>
          <p className="text-xs text-muted-foreground">{GRADE_DESC[activeGrade]}</p>
        </div>

        {/* Games grid */}
        <div className="grid grid-cols-1 gap-3">
          {games.map((game, i) => {
            const result = getResult(game.id);
            const isDone = !!result;
            const percent = result ? Math.round((result.score / result.total) * 100) : 0;

            return (
              <button
                key={game.id}
                onClick={() => navigate(`/game/${game.id}`)}
                className="glass border border-border rounded-2xl p-4 text-left transition-all active:scale-95 animate-fade-in"
                style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-xl flex-shrink-0`}>
                    {game.icon.length <= 2 ? (
                      <span className="text-white font-bold text-xs leading-tight text-center">{game.icon}</span>
                    ) : game.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-semibold text-sm text-foreground truncate">{game.title}</h3>
                      {isDone && (
                        <span className={`text-xs font-bold flex-shrink-0 ${percent >= 80 ? 'neon-green' : percent >= 60 ? 'text-[hsl(var(--orange))]' : 'text-destructive'}`}>
                          {percent}%
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{game.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] glass px-2 py-0.5 rounded-full border border-border text-muted-foreground">
                        {game.topic}
                      </span>
                      {isDone ? (
                        <span className="text-[10px] flex items-center gap-1 text-green-400">
                          <Icon name="CheckCircle2" size={10} />
                          {result.score}/{result.total}
                        </span>
                      ) : (
                        <span className="text-[10px] flex items-center gap-1 text-muted-foreground">
                          <Icon name="Circle" size={10} />
                          5 заданий
                        </span>
                      )}
                    </div>
                    {isDone && (
                      <div className="mt-2 h-1 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${percent}%`,
                            background: percent >= 80 ? 'hsl(142 71% 45%)' : percent >= 60 ? 'hsl(38 92% 50%)' : 'hsl(0 84% 60%)'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
