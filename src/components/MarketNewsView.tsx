import React, { useState } from 'react';
import { MARKET_NEWS } from '../data/marketData';
import { TransferNewsItem } from '../types';
import { Clock, Search, X, ArrowRight } from 'lucide-react';

export const MarketNewsView: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<TransferNewsItem | null>(null);

  const filteredNews = MARKET_NEWS.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.player.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fromTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.toTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: TransferNewsItem['status']) => {
    switch (status) {
      case 'OFICIAL':
        return (
          <span className="status-pill text-[10px]">
            ● OFICIAL
          </span>
        );
      case 'NEGOCIACAO':
        return (
          <span className="font-mono text-[10px] px-2 py-0.5 bg-[#ececed] text-[#0b0c0d] font-bold uppercase">
            NEGOCIAÇÃO
          </span>
        );
      case 'RENOVACAO':
        return (
          <span className="font-mono text-[10px] px-2 py-0.5 border border-[#00ff88] text-[#00ff88] font-bold uppercase">
            RENOVAÇÃO
          </span>
        );
      case 'SONDAGEM':
        return (
          <span className="font-mono text-[10px] px-2 py-0.5 border border-white/20 text-[#ececed]/80 font-bold uppercase">
            SONDAGEM
          </span>
        );
      case 'ESPECULACAO':
        return (
          <span className="font-mono text-[10px] px-2 py-0.5 bg-white/10 text-[#ececed]/60 font-bold uppercase">
            RUMOR
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="mb-6">
        <div className="label text-[#00ff88] opacity-100 font-bold mb-2">
          [04] MERCADO DA BOLA
        </div>
        <h1 className="font-['Syne'] font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-[#ececed] leading-none mb-3">
          Notícias Exclusivas &amp; Mercado
        </h1>
        <p className="text-sm text-[#ececed]/60 max-w-2xl leading-relaxed">
          Todas as contratações confirmadas, negociações milionárias, sondagens de bastidores e renovações que agitam o futebol nacional e internacional.
        </p>

        {/* Filter Pills */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#ececed]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar atleta, clube de origem ou destino..."
              className="w-full bg-[#141618] border border-white/15 focus:border-[#00ff88] pl-10 pr-3 py-2 font-mono text-xs text-[#ececed] placeholder-[#ececed]/30 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
            {[
              { label: 'TODAS AS NOTÍCIAS', val: 'ALL' },
              { label: 'OFICIAL', val: 'OFICIAL' },
              { label: 'AVANÇADAS', val: 'NEGOCIACAO' },
              { label: 'SONDAGENS', val: 'SONDAGEM' },
              { label: 'RENOVAÇÕES', val: 'RENOVACAO' },
              { label: 'ESPECULAÇÕES', val: 'ESPECULACAO' },
            ].map((st) => (
              <button
                key={st.val}
                onClick={() => setSelectedStatus(st.val)}
                className={`cursor-pointer transition ${
                  selectedStatus === st.val ? 'status-pill' : 'status-pill-muted'
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Transfer News Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredNews.map((news) => (
          <article
            key={news.id}
            id={`market-news-${news.id}`}
            onClick={() => setSelectedArticle(news)}
            className="bg-[#141618] hover:bg-[#1a1c1e] border border-white/10 p-5 transition-colors cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Header Badge & Time */}
              <div className="flex items-center justify-between gap-2 mb-3">
                {getStatusBadge(news.status)}
                <span className="label opacity-60 flex items-center gap-1 font-mono">
                  <Clock className="w-3 h-3" />
                  {news.timeAgo}
                </span>
              </div>

              {/* Title */}
              <h2 className="font-['Syne'] font-extrabold text-base sm:text-lg text-[#ececed] group-hover:text-[#00ff88] transition leading-snug uppercase">
                {news.title}
              </h2>

              {/* Summary */}
              <p className="text-xs text-[#ececed]/70 line-clamp-2 leading-relaxed mt-2">
                {news.summary}
              </p>

              {/* Player Transfer Route Box */}
              <div className="mt-4 p-3 bg-[#0b0c0d] border border-white/10 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-[#ececed]">
                  <span className="truncate">{news.fromTeam}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#00ff88] shrink-0 mx-2" />
                  <span className="truncate text-[#00ff88]">{news.toTeam}</span>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between label opacity-80">
                  <span>
                    CIFRAS: <strong className="text-white font-mono">{news.fee}</strong>
                  </span>
                  <span>
                    CONTRATO: <strong className="text-[#ececed] font-mono">{news.contractYears}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Meta & Read More */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <div className="label opacity-60 truncate">
                FONTE: <strong className="text-[#ececed]">{news.source}</strong>
              </div>

              <span className="font-mono text-xs font-bold text-[#00ff88] group-hover:underline flex items-center gap-1 uppercase tracking-wider">
                <span>Ler Exclusiva</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="bg-[#141618] border border-white/10 p-12 text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-[#ececed]/60">
            Nenhuma notícia encontrada para "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedStatus('ALL');
            }}
            className="mt-4 label text-[#00ff88] opacity-100 font-bold hover:underline cursor-pointer"
          >
            [VER TODAS AS TRANSFERÊNCIAS]
          </button>
        </div>
      )}

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#141618] border border-white/20 max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] flex flex-col text-[#ececed]">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 p-2 bg-[#0b0c0d] border border-white/10 text-[#ececed]/60 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              {getStatusBadge(selectedArticle.status)}
              <span className="label opacity-60">• {selectedArticle.date}</span>
            </div>

            <h2 className="font-['Syne'] font-extrabold text-xl sm:text-2xl text-[#ececed] uppercase leading-snug">
              {selectedArticle.title}
            </h2>

            {/* Transfer Card Preview */}
            <div className="my-4 p-4 bg-[#0b0c0d] border border-white/10 grid grid-cols-2 gap-3 text-xs font-mono">
              <div>
                <p className="text-[10px] text-[#ececed]/50 uppercase font-semibold">Atleta &amp; Posição</p>
                <p className="text-sm font-bold text-white mt-0.5">
                  {selectedArticle.player} ({selectedArticle.position})
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#ececed]/50 uppercase font-semibold">Nacionalidade &amp; Idade</p>
                <p className="text-sm font-bold text-[#ececed] mt-0.5">
                  {selectedArticle.nationality} • {selectedArticle.playerAge} anos
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#ececed]/50 uppercase font-semibold">Valores da Operação</p>
                <p className="text-sm font-bold text-[#00ff88] mt-0.5">
                  {selectedArticle.fee}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#ececed]/50 uppercase font-semibold">Tempo de Vínculo</p>
                <p className="text-sm font-bold text-[#ececed] mt-0.5">
                  {selectedArticle.contractYears}
                </p>
              </div>
            </div>

            {/* Exclusive Quote */}
            {selectedArticle.exclusiveQuote && (
              <div className="mb-4 bg-[#0b0c0d] border-l-2 border-[#00ff88] p-3.5">
                <p className="text-xs text-[#ececed] italic leading-relaxed">
                  "{selectedArticle.exclusiveQuote}"
                </p>
              </div>
            )}

            {/* Full Story Body */}
            <div className="flex-1 overflow-y-auto space-y-3 text-sm text-[#ececed]/80 leading-relaxed pr-2">
              {selectedArticle.fullArticle.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Footer Attribution */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="label opacity-60">FONTES: <strong className="text-white">{selectedArticle.source}</strong></span>
              <span className="text-[#00ff88] font-bold">CONFIABILIDADE: {selectedArticle.confidenceScore}%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
