import { useState, useEffect } from 'react';

export interface GameResult {
  gameId: number;
  score: number;
  total: number;
  completedAt: string;
}

export interface StudentProfile {
  firstName: string;
  lastName: string;
}

const STORAGE_KEY = 'infoquest_results';
const PROFILE_KEY = 'infoquest_profile';

export function useGameStore() {
  const [results, setResults] = useState<GameResult[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch { return []; }
  });

  const [profile, setProfile] = useState<StudentProfile | null>(() => {
    try {
      return JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null');
    } catch { return null; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    if (profile) localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  const saveResult = (gameId: number, score: number, total: number) => {
    setResults(prev => {
      const filtered = prev.filter(r => r.gameId !== gameId);
      return [...filtered, { gameId, score, total, completedAt: new Date().toISOString() }];
    });
  };

  const getResult = (gameId: number) => results.find(r => r.gameId === gameId);

  const getTotalScore = () => results.reduce((sum, r) => sum + r.score, 0);
  const getTotalPossible = () => results.reduce((sum, r) => sum + r.total, 0);
  const getCompletedCount = () => results.length;
  const getAveragePercent = () => {
    if (results.length === 0) return 0;
    const avg = results.reduce((sum, r) => sum + (r.score / r.total) * 100, 0) / results.length;
    return Math.round(avg);
  };

  const saveProfile = (p: StudentProfile) => setProfile(p);
  const clearResults = () => { setResults([]); localStorage.removeItem(STORAGE_KEY); };

  return { results, profile, saveResult, getResult, getTotalScore, getTotalPossible, getCompletedCount, getAveragePercent, saveProfile, clearResults };
}
