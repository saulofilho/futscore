import React, { useEffect, useRef, useState } from 'react';
import { 
  getAdSenseClientId, 
  isAdSenseConfigured, 
  initAdSense, 
  pushAdUnit, 
  isTestMode 
} from '../utils/adsense';
import { Sparkles, Info, HelpCircle, ExternalLink, CheckCircle2 } from 'lucide-react';

interface AdSenseBannerProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle' | 'in-feed';
  layoutKey?: string;
  className?: string;
  label?: string;
  forceShowPlaceholder?: boolean;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  slotId,
  format = 'auto',
  layoutKey,
  className = '',
  label = 'Publicidade',
  forceShowPlaceholder = false,
}) => {
  const adRef = useRef<HTMLModElement | null>(null);
  const [adPushed, setAdPushed] = useState(false);
  const [showConfigHelper, setShowConfigHelper] = useState(false);

  const clientId = getAdSenseClientId();
  const configured = isAdSenseConfigured();
  const testMode = isTestMode() || forceShowPlaceholder;

  useEffect(() => {
    if (configured && !testMode) {
      initAdSense();
      if (!adPushed && adRef.current) {
        // Delay ad push slightly for DOM stabilization
        const timer = setTimeout(() => {
          pushAdUnit();
          setAdPushed(true);
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [configured, testMode, adPushed]);

  // Height and dimensions depending on format
  const getFormatClasses = () => {
    switch (format) {
      case 'horizontal':
        return 'min-h-[90px] md:min-h-[100px] w-full';
      case 'rectangle':
        return 'min-h-[250px] w-full max-w-[340px] mx-auto';
      case 'in-feed':
        return 'min-h-[120px] w-full';
      case 'auto':
      default:
        return 'min-h-[90px] md:min-h-[110px] w-full';
    }
  };

  // If live AdSense is active and configured
  if (configured && !testMode && slotId) {
    return (
      <aside 
        aria-label={label} 
        className={`relative my-4 overflow-hidden rounded-xl border border-white/10 bg-[#0e1117] p-2 text-center transition-all ${className}`}
      >
        <div className="mb-1 flex items-center justify-between px-2 text-[10px] font-mono uppercase tracking-wider text-white/35">
          <span>{label}</span>
          <span>Google AdSense</span>
        </div>
        <div className={`flex items-center justify-center ${getFormatClasses()}`}>
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', width: '100%' }}
            data-ad-client={clientId}
            data-ad-slot={slotId}
            data-ad-format={format === 'horizontal' ? 'horizontal' : format === 'rectangle' ? 'rectangle' : 'auto'}
            data-full-width-responsive="true"
            {...(layoutKey ? { 'data-ad-layout-key': layoutKey } : {})}
          />
        </div>
      </aside>
    );
  }

  // Placeholder preview / Test Mode UI
  return (
    <aside 
      aria-label={`${label} (Demonstração)`}
      className={`relative my-4 overflow-hidden rounded-xl border border-dashed border-emerald-500/30 bg-gradient-to-r from-[#0b1015]/90 via-[#0d141c]/90 to-[#0b1015]/90 p-3.5 backdrop-blur-sm transition-all hover:border-emerald-500/50 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2 text-[10px] font-mono tracking-wider text-emerald-400/80">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
          <span className="font-bold uppercase text-white/70">{label}</span>
          <span className="text-white/40">• Google AdSense Pronto</span>
        </div>
        <div className="flex items-center gap-2">
          {slotId ? (
            <span className="rounded bg-white/5 px-2 py-0.5 text-white/50">Slot: {slotId}</span>
          ) : (
            <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-emerald-300">Responsivo Automático</span>
          )}
          <button
            type="button"
            onClick={() => setShowConfigHelper(!showConfigHelper)}
            className="flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
            title="Como configurar este anúncio"
          >
            <HelpCircle className="h-3 w-3" />
            <span>Configurar</span>
          </button>
        </div>
      </div>

      <div className={`flex flex-col items-center justify-center py-4 text-center ${getFormatClasses()}`}>
        <div className="relative mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-inner">
          <Sparkles className="h-5 w-5" />
        </div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-white/90">
          Espaço Reservado para Google AdSense
        </h4>
        <p className="mt-1 max-w-md text-[11px] text-white/50 leading-relaxed">
          {configured 
            ? `ID do editor ativo (${clientId.slice(0, 10)}...). Alterne VITE_ADSENSE_TEST_MODE para false no ambiente de produção.` 
            : 'Pronto para receber anúncios. Configure suas variáveis VITE_ADSENSE_CLIENT_ID e VITE_ADSENSE_SLOT_* na Vercel.'}
        </p>
      </div>

      {showConfigHelper && (
        <div className="mt-2 rounded-lg border border-emerald-500/20 bg-[#06090e]/95 p-3 text-xs text-white/80 animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center justify-between pb-1 text-emerald-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5" />
              Guia Rápido de Ativação do Google AdSense
            </span>
            <button 
              onClick={() => setShowConfigHelper(false)}
              className="text-white/40 hover:text-white text-xs px-1"
            >
              ✕
            </button>
          </div>
          <ol className="mt-2 space-y-1.5 text-[11px] text-white/70 list-decimal list-inside">
            <li>Acesse o painel do <strong>Google AdSense</strong> e copie seu <em>Publisher ID</em> (ex: <code className="bg-white/10 px-1 py-0.5 rounded text-emerald-300">ca-pub-1234567890123456</code>).</li>
            <li>No arquivo <code className="text-white/90">public/ads.txt</code>, substitua <code className="text-emerald-300">pub-0000000000000000</code> pelo seu número de editor.</li>
            <li>Nas configurações de ambiente da Vercel (ou no arquivo <code className="text-white/90">.env</code>), defina:
              <div className="mt-1 p-2 bg-black/40 rounded font-mono text-[10px] text-emerald-300 space-y-0.5">
                <div>VITE_ADSENSE_CLIENT_ID="ca-pub-SEU_NUMERO"</div>
                <div>VITE_ADSENSE_SLOT_TOP_BANNER="SEU_SLOT_ID"</div>
                <div>VITE_ADSENSE_TEST_MODE="false"</div>
              </div>
            </li>
            <li>Faça o deploy na <strong>Vercel</strong> e solicite a revisão do site no painel do AdSense.</li>
          </ol>
        </div>
      )}
    </aside>
  );
};
