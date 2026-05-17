import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import { GAMES } from '@/data/games';
import Icon from '@/components/ui/icon';

export default function Stats() {
  const navigate = useNavigate();
  const { results, getTotalScore, getTotalPossible, getCompletedCount, getAveragePercent, clearResults } = useGameStore();

  const completed = getCompletedCount();
  const totalScore = getTotalScore();
  const totalPossible = getTotalPossible();
  const avg = getAveragePercent();

  const byGrade = [7, 8, 9].map(grade => {
    const gradeGames = GAMES.filter(g => g.grade === grade);
    const gradeResults = results.filter(r => gradeGames.some(g => g.id === r.gameId));
    const done = gradeResults.length;
    const total = gradeGames.length;
    const score = gradeResults.reduce((s, r) => s + r.score, 0);
    const possible = gradeResults.reduce((s, r) => s + r.total, 0);
    return { grade, done, total, score, possible, percent: possible > 0 ? Math.round((score / possible) * 100) : 0 };
  });

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 pt-10 pb-4 flex items-center gap-3">
        <button onClick={() => navigate('/')} className="p-1">
          <Icon name="ArrowLeft" size={20} className="text-muted-foreground" />
        </button>
        <h1 className="text-lg font-bold">Моя статистика</h1>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-2xl p-4 border border-border text-center">
            <div className="text-3xl font-bold neon-blue">{completed}/30</div>
            <div className="text-xs text-muted-foreground mt-1">игр пройдено</div>
          </div>
          <div className="glass rounded-2xl p-4 border border-border text-center">
            <div className="text-3xl font-bold neon-green">{avg}%</div>
            <div className="text-xs text-muted-foreground mt-1">средний балл</div>
          </div>
          <div className="glass rounded-2xl p-4 border border-border text-center">
            <div className="text-3xl font-bold text-[hsl(var(--orange))]">{totalScore}</div>
            <div className="text-xs text-muted-foreground mt-1">правильных ответов</div>
          </div>
          <div className="glass rounded-2xl p-4 border border-border text-center">
            <div className="text-3xl font-bold text-[hsl(var(--purple))]">{totalPossible - totalScore}</div>
            <div className="text-xs text-muted-foreground mt-1">ошибок</div>
          </div>
        </div>

        {/* Overall progress */}
        <div className="glass rounded-2xl p-4 border border-border">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Общий прогресс</span>
            <span className="text-muted-foreground">{Math.round((completed / 30) * 100)}%</span>
          </div>
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full progress-bar rounded-full transition-all duration-1000"
              style={{ width: `${(completed / 30) * 100}%` }}
            />
          </div>
        </div>

        {/* By grade */}
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">По классам</h2>
        {byGrade.map(({ grade, done, total, percent }) => (
          <div key={grade} className="glass rounded-2xl p-4 border border-border">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">{grade} класс</span>
              <span className="text-sm text-muted-foreground">{done}/{total} игр</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden mb-1">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(done / total) * 100}%`,
                  background: grade === 7 ? 'hsl(217 91% 60%)' : grade === 8 ? 'hsl(142 71% 45%)' : 'hsl(271 81% 65%)'
                }}
              />
            </div>
            <div className="text-xs text-muted-foreground">{done > 0 ? `Средний балл: ${percent}%` : 'Ещё не начато'}</div>
          </div>
        ))}

        {/* Recent results */}
        {results.length > 0 && (
          <>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Последние результаты</h2>
            <div className="space-y-2">
              {[...results].reverse().slice(0, 10).map(r => {
                const game = GAMES.find(g => g.id === r.gameId);
                const p = Math.round((r.score / r.total) * 100);
                return (
                  <div key={r.gameId} className="glass rounded-xl p-3 border border-border flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${game?.color} flex items-center justify-center text-sm flex-shrink-0`}>
                      {game?.icon && game.icon.length <= 2 ? <span className="text-white font-bold text-[10px]">{game.icon}</span> : game?.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{game?.title}</p>
                      <p className="text-xs text-muted-foreground">{game?.grade} класс</p>
                    </div>
                    <span className={`text-sm font-bold flex-shrink-0 ${p >= 80 ? 'neon-green' : p >= 60 ? 'text-[hsl(var(--orange))]' : 'text-destructive'}`}>
                      {r.score}/{r.total}
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {results.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-4xl mb-3">📊</div>
            <p>Пока нет результатов.</p>
            <p className="text-sm">Пройди несколько игр!</p>
          </div>
        )}

        {results.length > 0 && (
          <button
            onClick={() => { if (confirm('Сбросить всю статистику?')) clearResults(); }}
            className="w-full py-3 rounded-2xl border border-destructive text-destructive text-sm font-medium glass"
          >
            Сбросить статистику
          </button>
        )}
      </div>
    </div>
  );
}
