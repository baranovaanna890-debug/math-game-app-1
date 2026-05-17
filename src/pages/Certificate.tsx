import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/store/gameStore';
import Icon from '@/components/ui/icon';

export default function Certificate() {
  const navigate = useNavigate();
  const { profile, saveProfile, getCompletedCount, getAveragePercent, getTotalScore, getTotalPossible } = useGameStore();

  const [firstName, setFirstName] = useState(profile?.firstName || '');
  const [lastName, setLastName] = useState(profile?.lastName || '');
  const [showCert, setShowCert] = useState(!!profile);
  const certRef = useRef<HTMLDivElement>(null);

  const completed = getCompletedCount();
  const avg = getAveragePercent();
  const totalScore = getTotalScore();
  const totalPossible = getTotalPossible();

  const today = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });

  const getLevel = () => {
    if (avg >= 90) return 'Эксперт по информатике';
    if (avg >= 75) return 'Продвинутый пользователь';
    if (avg >= 60) return 'Уверенный пользователь';
    return 'Начинающий пользователь';
  };

  const handleGenerate = () => {
    if (!firstName.trim() || !lastName.trim()) return;
    saveProfile({ firstName: firstName.trim(), lastName: lastName.trim() });
    setShowCert(true);
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 pt-10 pb-4 flex items-center gap-3">
        <button onClick={() => navigate('/')} className="p-1">
          <Icon name="ArrowLeft" size={20} className="text-muted-foreground" />
        </button>
        <h1 className="text-lg font-bold">Сертификат</h1>
      </div>

      <div className="p-4 space-y-4">
        {!showCert ? (
          <>
            <div className="text-center py-6">
              <div className="text-5xl mb-3">🏅</div>
              <h2 className="text-xl font-bold mb-1">Получи сертификат</h2>
              <p className="text-sm text-muted-foreground">Введи своё имя и фамилию для генерации официального сертификата об обучении</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Имя</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  placeholder="Например: Иван"
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Фамилия</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  placeholder="Например: Иванов"
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary text-sm"
                />
              </div>
            </div>

            <div className="glass rounded-2xl p-4 border border-border">
              <h3 className="text-sm font-semibold mb-3">Твои достижения</h3>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="text-2xl font-bold neon-blue">{completed}</div>
                  <div className="text-[10px] text-muted-foreground">игр</div>
                </div>
                <div>
                  <div className="text-2xl font-bold neon-green">{avg}%</div>
                  <div className="text-[10px] text-muted-foreground">точность</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[hsl(var(--orange))]">{totalScore}</div>
                  <div className="text-[10px] text-muted-foreground">баллов</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!firstName.trim() || !lastName.trim()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold text-base disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Создать сертификат
            </button>
          </>
        ) : (
          <>
            {/* Certificate */}
            <div ref={certRef} className="cert-appear">
              <div className="rounded-3xl border-2 border-yellow-500/50 bg-gradient-to-br from-slate-900 via-background to-slate-900 p-6 relative overflow-hidden">
                {/* Decorative */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500" />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-amber-400 to-yellow-500" />
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-yellow-500/5 blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-blue-500/5 blur-2xl" />

                <div className="text-center relative z-10">
                  <div className="text-3xl mb-2">🏆</div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Образовательный сертификат</p>
                  <h2 className="text-lg font-bold text-yellow-400 mb-1">ИнфоКвест</h2>
                  <p className="text-xs text-muted-foreground mb-4">Курс информатики для 7–9 классов</p>

                  <div className="border-t border-border my-3" />

                  <p className="text-xs text-muted-foreground mb-1">Настоящим подтверждается, что</p>
                  <h3 className="text-2xl font-bold text-foreground mb-1">
                    {lastName} {firstName}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">успешно прошёл(а) образовательный курс</p>

                  <div className="glass rounded-2xl p-4 border border-yellow-500/20 mb-4">
                    <div className="text-xl font-bold text-yellow-400 mb-1">{getLevel()}</div>
                    <div className="grid grid-cols-3 gap-2 text-center mt-3">
                      <div>
                        <div className="text-lg font-bold neon-blue">{completed}/30</div>
                        <div className="text-[10px] text-muted-foreground">уроков</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold neon-green">{avg}%</div>
                        <div className="text-[10px] text-muted-foreground">точность</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-[hsl(var(--orange))]">{totalScore}/{totalPossible}</div>
                        <div className="text-[10px] text-muted-foreground">баллов</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border my-3" />

                  <div className="flex justify-between items-end text-xs text-muted-foreground">
                    <div className="text-left">
                      <p className="font-mono text-[10px]">№ IQ-{String(completed).padStart(3, '0')}-2025</p>
                    </div>
                    <div className="text-right">
                      <p>{today}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => { setShowCert(false); setFirstName(profile?.firstName || ''); setLastName(profile?.lastName || ''); }}
                className="w-full py-3 rounded-2xl glass border border-border text-sm font-medium"
              >
                Изменить данные
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full py-3 rounded-2xl bg-primary text-primary-foreground text-sm font-semibold"
              >
                Вернуться к играм
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
