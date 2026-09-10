import React, { useState } from 'react';
import { Match } from '../types';
import { Calendar, ChevronLeft, ChevronRight, CalendarDays, X } from 'lucide-react';

interface MatchCalendarProps {
  matches: Match[];
  selectedDate: string; // 'ALL' or 'YYYY-MM-DD'
  onSelectDate: (date: string) => void;
}

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const WEEKDAYS_SHORT = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

interface DateMatchStats {
  total: number;
  live: number;
  finished: number;
  scheduled: number;
}

export const MatchCalendar: React.FC<MatchCalendarProps> = ({
  matches,
  selectedDate,
  onSelectDate,
}) => {
  const [isFullCalendarOpen, setIsFullCalendarOpen] = useState(false);
  
  // Calendar month state (defaults to September 2026)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(8); // 0-indexed, 8 is September

  const todayIso = '2026-09-09';

  // Map of matches count by dateIso
  const initialDateStats: Record<string, DateMatchStats> = {};
  const matchesByDate = matches.reduce((acc, match) => {
    const iso = match.dateIso || todayIso;
    if (!acc[iso]) {
      acc[iso] = { total: 0, live: 0, finished: 0, scheduled: 0 };
    }
    acc[iso].total += 1;
    if (match.status === 'LIVE') acc[iso].live += 1;
    else if (match.status === 'FINISHED') acc[iso].finished += 1;
    else acc[iso].scheduled += 1;
    return acc;
  }, initialDateStats);

  // Pre-defined relative days around today
  const dayPills = [
    { iso: '2026-09-07', label: 'Seg 07/09', subtitle: 'Anteontem' },
    { iso: '2026-09-08', label: 'Ter 08/09', subtitle: 'Ontem' },
    { iso: '2026-09-09', label: 'Qua 09/09', subtitle: 'Hoje' },
    { iso: '2026-09-10', label: 'Qui 10/09', subtitle: 'Amanhã' },
    { iso: '2026-09-11', label: 'Sex 11/09', subtitle: 'Sexta' },
    { iso: '2026-09-12', label: 'Sáb 12/09', subtitle: 'Sábado' },
    { iso: '2026-09-13', label: 'Dom 13/09', subtitle: 'Domingo' },
  ];

  // Navigate to previous day
  const handlePrevDay = () => {
    if (selectedDate === 'ALL') {
      onSelectDate(todayIso);
      return;
    }
    const current = new Date(selectedDate + 'T12:00:00');
    current.setDate(current.getDate() - 1);
    const prevIso = current.toISOString().slice(0, 10);
    onSelectDate(prevIso);
  };

  // Navigate to next day
  const handleNextDay = () => {
    if (selectedDate === 'ALL') {
      onSelectDate(todayIso);
      return;
    }
    const current = new Date(selectedDate + 'T12:00:00');
    current.setDate(current.getDate() + 1);
    const nextIso = current.toISOString().slice(0, 10);
    onSelectDate(nextIso);
  };

  // Format date readable for display
  const getReadableDate = (iso: string) => {
    if (iso === 'ALL') return 'Todas as Partidas';
    if (iso === '2026-09-08') return 'Ontem (08/09/2026)';
    if (iso === '2026-09-09') return 'Hoje (09/09/2026)';
    if (iso === '2026-09-10') return 'Amanhã (10/09/2026)';
    
    const [year, month, day] = iso.split('-');
    return `${day}/${month}/${year}`;
  };

  // Build calendar matrix for current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 is Sun

  const calendarDays: Array<{ dayNumber: number | null; iso: string | null }> = [];
  
  // Empty leading days
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push({ dayNumber: null, iso: null });
  }

  // Days of month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayStr = day.toString().padStart(2, '0');
    const monthStr = (currentMonth + 1).toString().padStart(2, '0');
    const iso = `${currentYear}-${monthStr}-${dayStr}`;
    calendarDays.push({ dayNumber: day, iso });
  }

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  return (
    <div className="bg-[#141618] border border-white/10 p-4 mb-6">
      {/* Top Header of Calendar Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#00ff88]" />
          <span className="label text-[#00ff88] opacity-100 font-bold uppercase tracking-wider">
            FILTRAR POR CALENDÁRIO
          </span>
          <span className="text-[#ececed]/40 text-xs font-mono">•</span>
          <span className="font-mono text-xs font-bold text-[#ececed]">
            {getReadableDate(selectedDate)}
          </span>
          {selectedDate !== 'ALL' && matchesByDate[selectedDate] && (
            <span className="font-mono text-[11px] bg-[#0b0c0d] px-2 py-0.5 border border-white/10 text-[#00ff88]">
              {matchesByDate[selectedDate].total} {matchesByDate[selectedDate].total === 1 ? 'jogo' : 'jogos'}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          {/* Day stepping buttons */}
          <button
            onClick={handlePrevDay}
            title="Dia anterior"
            id="btn-calendar-prev-day"
            className="p-1.5 bg-[#0b0c0d] border border-white/10 text-[#ececed]/70 hover:text-white hover:border-[#00ff88] transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => onSelectDate('2026-09-09')}
            id="btn-calendar-jump-today"
            className={`font-mono text-[11px] px-2.5 py-1 uppercase font-bold transition cursor-pointer border ${
              selectedDate === todayIso
                ? 'bg-[#00ff88] text-[#0b0c0d] border-[#00ff88]'
                : 'bg-[#0b0c0d] text-[#ececed]/70 border-white/10 hover:text-white hover:border-white/30'
            }`}
          >
            HOJE (09/09)
          </button>

          <button
            onClick={handleNextDay}
            title="Próximo dia"
            id="btn-calendar-next-day"
            className="p-1.5 bg-[#0b0c0d] border border-white/10 text-[#ececed]/70 hover:text-white hover:border-[#00ff88] transition cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Full monthly calendar toggle */}
          <button
            onClick={() => setIsFullCalendarOpen(true)}
            id="btn-open-monthly-calendar"
            className="flex items-center gap-1.5 font-mono text-[11px] px-2.5 py-1 bg-[#0b0c0d] border border-white/15 hover:border-[#00ff88] text-[#ececed] uppercase font-bold transition cursor-pointer ml-1"
          >
            <CalendarDays className="w-3.5 h-3.5 text-[#00ff88]" />
            <span>Mês Completo</span>
          </button>
        </div>
      </div>

      {/* Quick Day-by-Day Horizontal Strip */}
      <div className="mt-3 flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        {/* All Dates option */}
        <button
          onClick={() => onSelectDate('ALL')}
          id="filter-date-all"
          className={`shrink-0 flex flex-col items-center justify-center px-3 py-2 border font-mono transition cursor-pointer min-w-[90px] ${
            selectedDate === 'ALL'
              ? 'bg-[#00ff88] text-[#0b0c0d] font-bold border-[#00ff88]'
              : 'bg-[#0b0c0d] text-[#ececed]/70 border-white/10 hover:border-white/30 hover:text-white'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider">TODOS</span>
          <span className="text-[9px] opacity-75">{matches.length} partidas</span>
        </button>

        {dayPills.map(day => {
          const stats = matchesByDate[day.iso];
          const isSelected = selectedDate === day.iso;
          const isToday = day.iso === todayIso;

          return (
            <button
              key={day.iso}
              onClick={() => onSelectDate(day.iso)}
              id={`filter-date-${day.iso}`}
              className={`shrink-0 flex flex-col items-center justify-center px-3 py-1.5 border font-mono transition cursor-pointer min-w-[95px] relative ${
                isSelected
                  ? 'bg-[#00ff88] text-[#0b0c0d] font-bold border-[#00ff88]'
                  : isToday
                  ? 'bg-[#0b0c0d] border-[#00ff88]/50 text-[#ececed] hover:border-[#00ff88]'
                  : 'bg-[#0b0c0d] text-[#ececed]/70 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {/* Day Label */}
              <div className="flex items-center gap-1 text-[11px] font-bold uppercase">
                <span>{day.label}</span>
                {isToday && (
                  <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#0b0c0d]' : 'bg-[#00ff88] animate-ping'}`} />
                )}
              </div>

              {/* Subtitle / Count */}
              <div className="flex items-center gap-1 text-[9px] opacity-80 mt-0.5">
                {stats ? (
                  <>
                    <span>{stats.total} {stats.total === 1 ? 'jogo' : 'jogos'}</span>
                    {stats.live > 0 && (
                      <span className={`px-1 text-[8px] font-black uppercase ${isSelected ? 'bg-[#0b0c0d] text-[#00ff88]' : 'bg-[#00ff88] text-[#0b0c0d]'}`}>
                        LIVE
                      </span>
                    )}
                  </>
                ) : (
                  <span className="opacity-40">Sem jogos</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Filter Active Reset Notice */}
      {selectedDate !== 'ALL' && (
        <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs font-mono">
          <span className="text-[#ececed]/60">
            Filtro ativo: <strong className="text-[#ececed]">{getReadableDate(selectedDate)}</strong>
          </span>
          <button
            onClick={() => onSelectDate('ALL')}
            className="label text-[#00ff88] opacity-100 font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <X className="w-3 h-3" />
            <span>EXIBIR TODAS AS DATAS</span>
          </button>
        </div>
      )}

      {/* Full Monthly Calendar Modal */}
      {isFullCalendarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#141618] border border-white/20 max-w-md w-full p-6 shadow-2xl text-[#ececed] relative">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-[#00ff88]" />
                <h3 className="font-['Syne'] font-extrabold text-lg uppercase text-[#ececed]">
                  Calendário de Partidas
                </h3>
              </div>
              <button
                onClick={() => setIsFullCalendarOpen(false)}
                className="p-1.5 bg-[#0b0c0d] border border-white/10 text-[#ececed]/60 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Month Header Controller */}
            <div className="flex items-center justify-between my-4 font-mono">
              <button
                onClick={prevMonth}
                className="p-1.5 bg-[#0b0c0d] border border-white/10 text-[#ececed]/80 hover:text-white hover:border-[#00ff88] cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-['Syne'] font-extrabold text-base uppercase text-[#ececed] tracking-wide">
                {MONTH_NAMES[currentMonth]} {currentYear}
              </span>

              <button
                onClick={nextMonth}
                className="p-1.5 bg-[#0b0c0d] border border-white/10 text-[#ececed]/80 hover:text-white hover:border-[#00ff88] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] text-[#ececed]/50 font-bold mb-2">
              {WEEKDAYS_SHORT.map(wd => (
                <div key={wd} className="py-1">{wd}</div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1 font-mono text-xs">
              {calendarDays.map((cell, idx) => {
                if (!cell.dayNumber || !cell.iso) {
                  return <div key={`empty-${idx}`} className="h-12 bg-transparent" />;
                }

                const stats = matchesByDate[cell.iso];
                const isSelected = selectedDate === cell.iso;
                const isToday = cell.iso === todayIso;

                return (
                  <button
                    key={cell.iso}
                    onClick={() => {
                      onSelectDate(cell.iso!);
                      setIsFullCalendarOpen(false);
                    }}
                    className={`h-12 flex flex-col items-center justify-center border transition cursor-pointer relative p-0.5 ${
                      isSelected
                        ? 'bg-[#00ff88] text-[#0b0c0d] font-bold border-[#00ff88]'
                        : isToday
                        ? 'bg-[#0b0c0d] border-[#00ff88] text-white'
                        : stats
                        ? 'bg-[#0b0c0d] border-white/20 text-[#ececed] hover:border-[#00ff88]'
                        : 'bg-white/5 border-transparent text-[#ececed]/30 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-xs font-bold leading-none">
                      {cell.dayNumber}
                    </span>

                    {stats && (
                      <div className="flex items-center gap-0.5 mt-1">
                        <span
                          className={`text-[9px] font-mono font-black px-1 leading-tight ${
                            isSelected
                              ? 'bg-[#0b0c0d] text-[#00ff88]'
                              : stats.live > 0
                              ? 'bg-[#00ff88] text-[#0b0c0d]'
                              : 'bg-white/15 text-[#ececed]'
                          }`}
                        >
                          {stats.total}
                        </span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer Legend & Reset */}
            <div className="mt-5 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono">
              <div className="flex items-center gap-3 text-[#ececed]/60">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#00ff88]" />
                  <span>Com Jogos</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 border border-[#00ff88]" />
                  <span>Hoje</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onSelectDate('ALL');
                    setIsFullCalendarOpen(false);
                  }}
                  className="px-2.5 py-1 bg-[#0b0c0d] border border-white/20 text-[#ececed]/70 hover:text-white uppercase"
                >
                  Todas as Datas
                </button>
                <button
                  onClick={() => {
                    onSelectDate(todayIso);
                    setIsFullCalendarOpen(false);
                  }}
                  className="px-2.5 py-1 bg-[#00ff88] text-[#0b0c0d] font-bold uppercase"
                >
                  Ir para Hoje
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
