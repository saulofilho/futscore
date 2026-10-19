// High-Fidelity Web Audio API Sound Synthesizer for FutScore PRO
// Provides realistic stadium sounds, authentic referee whistles, goal horns, ball kicks, and UI chimes

class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private enabled: boolean = true;

  constructor() {
    // Lazy initialization on first user interaction
  }

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (AudioCtx) {
        this.ctx = new AudioCtx();

        // Master dynamics compressor to prevent clipping and deliver punchy stadium dynamics
        this.compressor = this.ctx.createDynamicsCompressor();
        this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
        this.compressor.knee.setValueAtTime(12, this.ctx.currentTime);
        this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
        this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
        this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);

        this.compressor.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Helper to generate a burst of shaped noise (simulating breath, air turbulence, crowd murmur, or net rustle)
   */
  private createNoiseBuffer(ctx: AudioContext, durationSeconds: number): AudioBuffer {
    const bufferSize = ctx.sampleRate * durationSeconds;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink/Brown noise approximation for acoustic realism
      lastOut = (lastOut + 0.02 * white) / 1.02;
      data[i] = lastOut * 3.5;
    }
    return buffer;
  }

  /**
   * Authentic Referee Whistle (Fox 40 pea-less style)
   * Real whistles have two dominant resonant frequencies (~2750 Hz and ~3050 Hz)
   * with air turbulence and a rapid flutter (30Hz vibrato) that gives the iconic piercing timbre.
   */
  playWhistle(type: 'single' | 'double' | 'final' = 'double') {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx || !this.compressor) return;

    try {
      const now = ctx.currentTime;

      const blast = (startTime: number, duration: number, peakVol: number) => {
        // Frequency 1 (Lower harmonic)
        const osc1 = ctx.createOscillator();
        // Frequency 2 (Upper discordant harmonic creating the acoustic beating)
        const osc2 = ctx.createOscillator();

        // Flutter LFO to simulate turbulent air vortex in the chamber
        const flutter = ctx.createOscillator();
        const flutterGain = ctx.createGain();
        flutter.frequency.setValueAtTime(32, startTime); // 32 Hz trill
        flutterGain.gain.setValueAtTime(80, startTime);

        osc1.type = 'sine';
        osc2.type = 'triangle';

        osc1.frequency.setValueAtTime(2780, startTime);
        osc1.frequency.exponentialRampToValueAtTime(3120, startTime + duration * 0.7);

        osc2.frequency.setValueAtTime(3080, startTime);
        osc2.frequency.exponentialRampToValueAtTime(3420, startTime + duration * 0.7);

        flutter.connect(flutterGain);
        flutterGain.connect(osc1.frequency);
        flutterGain.connect(osc2.frequency);

        // Breath / Air rush noise layer
        const noiseBuf = this.createNoiseBuffer(ctx, duration + 0.05);
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuf;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(2900, startTime);
        noiseFilter.Q.setValueAtTime(3.0, startTime);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0, startTime);
        noiseGain.gain.linearRampToValueAtTime(peakVol * 0.35, startTime + 0.02);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        noiseSource.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(this.compressor!);

        // Whistle tone gain envelope
        const toneGain = ctx.createGain();
        toneGain.gain.setValueAtTime(0, startTime);
        toneGain.gain.linearRampToValueAtTime(peakVol, startTime + 0.025);
        toneGain.gain.setValueAtTime(peakVol * 0.9, startTime + duration * 0.75);
        toneGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc1.connect(toneGain);
        osc2.connect(toneGain);
        toneGain.connect(this.compressor!);

        flutter.start(startTime);
        flutter.stop(startTime + duration);
        osc1.start(startTime);
        osc1.stop(startTime + duration);
        osc2.start(startTime);
        osc2.stop(startTime + duration);
        noiseSource.start(startTime);
        noiseSource.stop(startTime + duration);
      };

      if (type === 'single') {
        blast(now, 0.28, 0.28);
      } else if (type === 'double') {
        // Short blast followed by sustained authoritative blast
        blast(now, 0.14, 0.22);
        blast(now + 0.2, 0.38, 0.3);
      } else if (type === 'final') {
        // Triple whistle: short, short, long
        blast(now, 0.15, 0.25);
        blast(now + 0.22, 0.15, 0.25);
        blast(now + 0.45, 0.65, 0.35);
      }
    } catch {
      // Audio autoplay policy catch
    }
  }

  /**
   * Immersive Goal Celebration: Stadium Horn + Crowd Roar + Fanfare Chime
   * Sounds like being right in the arena when the ball hits the net!
   */
  playGoalHorn() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx || !this.compressor) return;

    try {
      const now = ctx.currentTime;

      // 1. Deep Stadium Arena Horn (Multi-oscillator brass blast: Low C, F, G, High C)
      const hornFrequencies = [130.81, 164.81, 196.0, 261.63, 329.63]; // C3 / E3 / G3 / C4 / E4 power chord
      hornFrequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const oscDetune = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        oscDetune.type = 'triangle';

        osc.frequency.setValueAtTime(freq, now);
        oscDetune.frequency.setValueAtTime(freq * 1.006, now); // Slight chorus detune

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now);
        filter.frequency.exponentialRampToValueAtTime(2200, now + 0.3);
        filter.frequency.exponentialRampToValueAtTime(750, now + 1.6);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.08);
        gain.gain.setValueAtTime(0.11, now + 0.9);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

        osc.connect(filter);
        oscDetune.connect(filter);
        filter.connect(gain);
        gain.connect(this.compressor!);

        osc.start(now);
        osc.stop(now + 1.85);
        oscDetune.start(now);
        oscDetune.stop(now + 1.85);
      });

      // 2. Crowd Roar / Stadium Echo Simulation (Surging filtered pink noise)
      const crowdBuffer = this.createNoiseBuffer(ctx, 2.8);
      const crowdSource = ctx.createBufferSource();
      crowdSource.buffer = crowdBuffer;

      const crowdFilter = ctx.createBiquadFilter();
      crowdFilter.type = 'bandpass';
      crowdFilter.frequency.setValueAtTime(600, now);
      crowdFilter.frequency.linearRampToValueAtTime(1100, now + 0.6);
      crowdFilter.frequency.exponentialRampToValueAtTime(400, now + 2.5);
      crowdFilter.Q.setValueAtTime(1.2, now);

      const crowdGain = ctx.createGain();
      crowdGain.gain.setValueAtTime(0, now);
      crowdGain.gain.linearRampToValueAtTime(0.22, now + 0.4);
      crowdGain.gain.setValueAtTime(0.18, now + 1.4);
      crowdGain.gain.exponentialRampToValueAtTime(0.001, now + 2.7);

      crowdSource.connect(crowdFilter);
      crowdFilter.connect(crowdGain);
      crowdGain.connect(this.compressor!);

      crowdSource.start(now + 0.1);
      crowdSource.stop(now + 2.8);

      // 3. Celebratory High Harmonic Shimmer
      const chimes = [523.25, 659.25, 783.99, 1046.5, 1318.5]; // C5 E5 G5 C6 E6
      chimes.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + 0.1 + i * 0.08);

        gain.gain.setValueAtTime(0, now + 0.1 + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.15 + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9 + i * 0.08);

        osc.connect(gain);
        gain.connect(this.compressor!);

        osc.start(now + 0.1 + i * 0.08);
        osc.stop(now + 1.0 + i * 0.08);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Clean, Futuristic Notification Chime / Alert Ping
   * Modern bell tone with dual harmonic overtones
   */
  playAlertPing() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx || !this.compressor) return;

    try {
      const now = ctx.currentTime;

      // Base bell harmonic
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(987.77, now); // B5
      osc1.frequency.exponentialRampToValueAtTime(1318.51, now + 0.08); // E6

      osc2.frequency.setValueAtTime(1975.53, now); // B6 overtone
      osc2.frequency.exponentialRampToValueAtTime(2637.02, now + 0.08);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.24, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.compressor);

      osc1.start(now);
      osc1.stop(now + 0.48);
      osc2.start(now);
      osc2.stop(now + 0.48);
    } catch {
      // Ignore
    }
  }

  /**
   * Ball Kick / Impact on Leather
   * Low punchy thud with acoustic snap, perfect for event simulation and interactions
   */
  playKickSound() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx || !this.compressor) return;

    try {
      const now = ctx.currentTime;

      // Bass boom (pitch dropping 160Hz -> 35Hz)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(170, now);
      osc.frequency.exponentialRampToValueAtTime(38, now + 0.12);

      oscGain.gain.setValueAtTime(0.35, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(oscGain);
      oscGain.connect(this.compressor);

      // Noise snap (the boot impact)
      const noise = this.createNoiseBuffer(ctx, 0.06);
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noise;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(300, now + 0.05);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.25, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      noiseSource.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.compressor);

      osc.start(now);
      osc.stop(now + 0.2);
      noiseSource.start(now);
      noiseSource.stop(now + 0.07);
    } catch {
      // Ignore
    }
  }

  /**
   * Subtle UI Tap / Haptic feedback for team selection, filter tabs and buttons
   */
  playTap() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx || !this.compressor) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(210, now + 0.04);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.compressor);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Ignore
    }
  }

  /**
   * Yellow/Red Card Warning Tone
   */
  playCardWarning() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx || !this.compressor) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.setValueAtTime(520, now + 0.09);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.compressor);

      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Ignore
    }
  }
}

export const soundFx = new SoundEngine();
