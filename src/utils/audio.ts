// Realistic High-Fidelity Web Audio API Sound Synthesizer for OmniScore PRO
// Provides authentic stadium acoustics, Fox 40 referee whistles, arena horns,
// vocal crowd roars, basketball buzzers & swishes, ringside combat bells, and leather ball impacts.

export type WhistlePattern = 'single' | 'double' | 'final' | 'foul';
export type SportSoundType = 'futebol' | 'basquete' | 'hockey' | 'volei' | 'natacao' | 'jiujitsu' | 'judo' | 'mma' | 'tenis';

class RealisticSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private stadiumReverb: ConvolverNode | null = null;
  private reverbGain: GainNode | null = null;
  private dryGain: GainNode | null = null;
  private enabled: boolean = true;

  constructor() {
    // Lazy initialized on first user interaction to comply with browser autoplay policies
  }

  /**
   * Initializes the AudioContext, master compressor, and realistic stadium convolution reverb
   */
  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;

    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      if (AudioCtx) {
        this.ctx = new AudioCtx();

        // Master dynamics compressor to deliver punchy stadium dynamics without digital clipping
        this.compressor = this.ctx.createDynamicsCompressor();
        this.compressor.threshold.setValueAtTime(-14, this.ctx.currentTime);
        this.compressor.knee.setValueAtTime(10, this.ctx.currentTime);
        this.compressor.ratio.setValueAtTime(5, this.ctx.currentTime);
        this.compressor.attack.setValueAtTime(0.002, this.ctx.currentTime);
        this.compressor.release.setValueAtTime(0.2, this.ctx.currentTime);

        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.9, this.ctx.currentTime);

        // Dry / Wet Routing for Stadium Reverberation
        this.dryGain = this.ctx.createGain();
        this.dryGain.gain.setValueAtTime(0.75, this.ctx.currentTime);

        this.reverbGain = this.ctx.createGain();
        this.reverbGain.gain.setValueAtTime(0.35, this.ctx.currentTime); // Stadium cavernous reflection

        // Synthesize an authentic acoustic impulse response for a large outdoor/indoor sports stadium
        try {
          this.stadiumReverb = this.ctx.createConvolver();
          this.stadiumReverb.buffer = this.createStadiumImpulseResponse(this.ctx, 2.4, 2.2);
          this.stadiumReverb.connect(this.reverbGain);
          this.reverbGain.connect(this.compressor);
        } catch {
          // Fallback if convolution not supported
          this.stadiumReverb = null;
        }

        this.dryGain.connect(this.compressor);
        this.compressor.connect(this.masterGain);
        this.masterGain.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    return this.ctx;
  }

  /**
   * Connects an audio node into both dry path and stadium reverb path for spatial depth
   */
  private routeToMix(node: AudioNode, reverbSend: number = 0.4) {
    if (!this.dryGain) return;
    node.connect(this.dryGain);

    if (this.stadiumReverb && reverbSend > 0) {
      if (this.ctx) {
        const send = this.ctx.createGain();
        send.gain.setValueAtTime(reverbSend, this.ctx.currentTime);
        node.connect(send);
        send.connect(this.stadiumReverb);
      }
    }
  }

  /**
   * Generates a stereo algorithmic impulse response modeling a 50,000-seat stadium with early wall reflections
   */
  private createStadiumImpulseResponse(ctx: AudioContext, duration: number, decay: number): AudioBuffer {
    const rate = ctx.sampleRate;
    const length = rate * duration;
    const buffer = ctx.createBuffer(2, length, rate);
    const left = buffer.getChannelData(0);
    const right = buffer.getChannelData(1);

    // Early reflection delays (seconds) corresponding to stadium tiers and canopy
    const earlyDelays = [0.024, 0.048, 0.075, 0.112, 0.165];
    const earlyAmps = [0.65, 0.45, 0.35, 0.25, 0.18];

    for (let i = 0; i < length; i++) {
      const t = i / rate;
      // Exponential decay envelope
      const env = Math.exp(-t * decay);
      // High frequency dampening (air absorption)
      const hfDamp = Math.exp(-t * 2.8);

      const noiseL = (Math.random() * 2 - 1) * env * hfDamp;
      const noiseR = (Math.random() * 2 - 1) * env * hfDamp;

      left[i] = noiseL * 0.7;
      right[i] = noiseR * 0.7;
    }

    // Inject early discrete reflections
    earlyDelays.forEach((delay, idx) => {
      const sampleIdx = Math.floor(delay * rate);
      if (sampleIdx < length) {
        left[sampleIdx] += earlyAmps[idx] * (idx % 2 === 0 ? 0.9 : -0.7);
        right[sampleIdx] += earlyAmps[idx] * (idx % 2 === 1 ? 0.9 : -0.7);
      }
    });

    return buffer;
  }

  public setEnabled(val: boolean) {
    this.enabled = val;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Helper to generate shaped acoustic noise (air friction, crowd murmur, net swish)
   */
  private createNoiseBuffer(ctx: AudioContext, durationSeconds: number): AudioBuffer {
    const bufferSize = ctx.sampleRate * durationSeconds;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink/Brown noise approximation for acoustic realism
      lastOut = (lastOut + 0.025 * white) / 1.025;
      data[i] = lastOut * 3.8;
    }
    return buffer;
  }

  /**
   * Authentic Referee Whistle (Fox 40 Classic Pea-less)
   * Real whistles have two dominant discordant resonant frequencies (~2820 Hz and ~3140 Hz)
   * with high-speed air turbulence flutter (32Hz trill) and initial breath chiff.
   */
  playWhistle(pattern: WhistlePattern = 'double') {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      const blast = (startTime: number, duration: number, peakVol: number) => {
        // Dual resonant whistle chamber harmonics
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();

        // 30Hz flutter LFO simulating air turbulence inside the sound chamber
        const flutter = ctx.createOscillator();
        const flutterGain = ctx.createGain();
        flutter.frequency.setValueAtTime(32, startTime);
        flutterGain.gain.setValueAtTime(95, startTime);

        osc1.type = 'sine';
        osc2.type = 'triangle';

        // Frequency contour: quick pitch rise at attack then steady piercing tone
        osc1.frequency.setValueAtTime(2780, startTime);
        osc1.frequency.linearRampToValueAtTime(2950, startTime + 0.03);
        osc1.frequency.setValueAtTime(2920, startTime + duration * 0.85);

        osc2.frequency.setValueAtTime(3120, startTime);
        osc2.frequency.linearRampToValueAtTime(3320, startTime + 0.03);
        osc2.frequency.setValueAtTime(3290, startTime + duration * 0.85);

        flutter.connect(flutterGain);
        flutterGain.connect(osc1.frequency);
        flutterGain.connect(osc2.frequency);

        // Breath / Air Chiff Attack Noise
        const noiseBuf = this.createNoiseBuffer(ctx, duration + 0.05);
        const noiseSource = ctx.createBufferSource();
        noiseSource.buffer = noiseBuf;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'bandpass';
        noiseFilter.frequency.setValueAtTime(3000, startTime);
        noiseFilter.Q.setValueAtTime(3.5, startTime);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0, startTime);
        noiseGain.gain.linearRampToValueAtTime(peakVol * 0.45, startTime + 0.015);
        noiseGain.gain.setValueAtTime(peakVol * 0.28, startTime + duration * 0.7);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        noiseSource.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        this.routeToMix(noiseGain, 0.45);

        // Main whistle acoustic envelope
        const toneGain = ctx.createGain();
        toneGain.gain.setValueAtTime(0, startTime);
        toneGain.gain.linearRampToValueAtTime(peakVol, startTime + 0.02);
        toneGain.gain.setValueAtTime(peakVol * 0.92, startTime + duration * 0.8);
        toneGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc1.connect(toneGain);
        osc2.connect(toneGain);
        this.routeToMix(toneGain, 0.5);

        flutter.start(startTime);
        flutter.stop(startTime + duration);
        osc1.start(startTime);
        osc1.stop(startTime + duration);
        osc2.start(startTime);
        osc2.stop(startTime + duration);
        noiseSource.start(startTime);
        noiseSource.stop(startTime + duration);
      };

      if (pattern === 'single') {
        blast(now, 0.26, 0.3);
      } else if (pattern === 'double') {
        // Classic referee double blast: short warning chirp + sustained blast
        blast(now, 0.12, 0.24);
        blast(now + 0.18, 0.36, 0.32);
      } else if (pattern === 'foul') {
        // Sharp, urgent trill
        blast(now, 0.42, 0.35);
      } else if (pattern === 'final') {
        // Three whistles signaling full time: short, short, long
        blast(now, 0.14, 0.26);
        blast(now + 0.2, 0.14, 0.26);
        blast(now + 0.42, 0.65, 0.36);
      }
    } catch {
      // Audio autoplay policy fallback
    }
  }

  /**
   * Immersive Goal Horn & Arena Crowd Explosion
   * Powerful brass foghorn (power chord) + massive vocal crowd roar sweeping into stadium reverb
   */
  playGoalHorn() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // 1. Deep Arena Foghorn Power Chord (Tuned to D2, A2, D3, F#3, A3)
      const hornFrequencies = [73.42, 110.0, 146.83, 185.0, 220.0, 293.66];
      hornFrequencies.forEach((freq, idx) => {
        const osc1 = ctx.createOscillator();
        const oscDetune = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc1.type = 'sawtooth';
        oscDetune.type = 'sawtooth';

        osc1.frequency.setValueAtTime(freq, now);
        oscDetune.frequency.setValueAtTime(freq * 1.008, now); // Realistic chorus beating

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, now);
        filter.frequency.linearRampToValueAtTime(1800, now + 0.25);
        filter.frequency.exponentialRampToValueAtTime(650, now + 1.8);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.14, now + 0.08);
        gain.gain.setValueAtTime(0.12, now + 1.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

        osc1.connect(filter);
        oscDetune.connect(filter);
        filter.connect(gain);
        this.routeToMix(gain, 0.65); // Generous stadium echo

        osc1.start(now);
        osc1.stop(now + 2.05);
        oscDetune.start(now);
        oscDetune.stop(now + 2.05);
      });

      // 2. Realistic Sub-Bass Chest Thump
      const sub = ctx.createOscillator();
      const subGain = ctx.createGain();
      sub.type = 'sine';
      sub.frequency.setValueAtTime(58, now);
      sub.frequency.exponentialRampToValueAtTime(42, now + 0.5);

      subGain.gain.setValueAtTime(0.28, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      sub.connect(subGain);
      this.routeToMix(subGain, 0.2);
      sub.start(now);
      sub.stop(now + 0.85);

      // 3. Realistic Vocal Stadium Crowd Roar (Vocal Formant Swept Noise)
      const crowdDuration = 3.2;
      const crowdBuffer = this.createNoiseBuffer(ctx, crowdDuration);
      const crowdSource = ctx.createBufferSource();
      crowdSource.buffer = crowdBuffer;

      // Dual formant filters to simulate human vocal tract screaming "OOH -> GOOOL"
      const formant1 = ctx.createBiquadFilter();
      formant1.type = 'bandpass';
      formant1.frequency.setValueAtTime(480, now + 0.05);
      formant1.frequency.linearRampToValueAtTime(820, now + 0.7);
      formant1.Q.setValueAtTime(1.8, now);

      const formant2 = ctx.createBiquadFilter();
      formant2.type = 'bandpass';
      formant2.frequency.setValueAtTime(1100, now + 0.05);
      formant2.frequency.linearRampToValueAtTime(1750, now + 0.7);
      formant2.Q.setValueAtTime(2.2, now);

      const crowdGain = ctx.createGain();
      crowdGain.gain.setValueAtTime(0, now);
      crowdGain.gain.linearRampToValueAtTime(0.28, now + 0.35); // Rapid crowd surge
      crowdGain.gain.setValueAtTime(0.24, now + 1.8);
      crowdGain.gain.exponentialRampToValueAtTime(0.001, now + crowdDuration);

      crowdSource.connect(formant1);
      formant1.connect(crowdGain);
      crowdSource.connect(formant2);
      formant2.connect(crowdGain);

      this.routeToMix(crowdGain, 0.7); // Full stadium immersion

      crowdSource.start(now + 0.05);
      crowdSource.stop(now + crowdDuration);

      // 4. Celebratory High Harmonic Shimmer Chime
      const chimes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
      chimes.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + 0.15 + i * 0.07);

        gain.gain.setValueAtTime(0, now + 0.15 + i * 0.07);
        gain.gain.linearRampToValueAtTime(0.07, now + 0.2 + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1 + i * 0.07);

        osc.connect(gain);
        this.routeToMix(gain, 0.55);

        osc.start(now + 0.15 + i * 0.07);
        osc.stop(now + 1.15 + i * 0.07);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Authentic Basketball Arena Buzzer (Electric 120Hz shot-clock / period horn)
   */
  playBasketballBuzzer() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'square';

      // Authentic 120Hz buzzer tone with 240Hz overtone
      osc1.frequency.setValueAtTime(120, now);
      osc2.frequency.setValueAtTime(242, now);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1600, now);
      filter.Q.setValueAtTime(1.2, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.32, now + 0.015);
      gain.gain.setValueAtTime(0.3, now + 0.85);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      this.routeToMix(gain, 0.6);

      osc1.start(now);
      osc1.stop(now + 1.0);
      osc2.start(now);
      osc2.stop(now + 1.0);
    } catch {
      // Ignore
    }
  }

  /**
   * Realistic Basketball Net Swish & Rim Shake
   * High-velocity friction brush through nylon net cords
   */
  playBasketballSwish() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // 1. Friction Cord Swish (Filtered white noise downward swoop)
      const buffer = this.createNoiseBuffer(ctx, 0.22);
      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3600, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.16);
      filter.Q.setValueAtTime(3.8, now);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      source.connect(filter);
      filter.connect(gain);
      this.routeToMix(gain, 0.35);

      source.start(now);
      source.stop(now + 0.22);

      // 2. Leather bounce on hardwood floor
      const bounce = ctx.createOscillator();
      const bounceGain = ctx.createGain();
      bounce.type = 'sine';
      bounce.frequency.setValueAtTime(130, now + 0.18);
      bounce.frequency.exponentialRampToValueAtTime(45, now + 0.28);

      bounceGain.gain.setValueAtTime(0, now + 0.18);
      bounceGain.gain.linearRampToValueAtTime(0.2, now + 0.19);
      bounceGain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      bounce.connect(bounceGain);
      this.routeToMix(bounceGain, 0.25);

      bounce.start(now + 0.18);
      bounce.stop(now + 0.32);
    } catch {
      // Ignore
    }
  }

  /**
   * Authentic Ringside Boxing / Combat Bell (Ding Ding Ding)
   * High-metallic cast bronze bell with natural inharmonic partials and long acoustic decay
   */
  playFightBell(strikes: number = 3) {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const strikeInterval = 0.32;

      for (let s = 0; s < strikes; s++) {
        const strikeTime = now + s * strikeInterval;

        // Cast bronze bell partials: fundamental at ~840 Hz, plus inharmonics
        const partials = [
          { freq: 840, vol: 0.35, decay: 1.2 },
          { freq: 1540, vol: 0.18, decay: 0.7 },
          { freq: 2420, vol: 0.12, decay: 0.45 },
          { freq: 4100, vol: 0.09, decay: 0.25 },
        ];

        partials.forEach(p => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(p.freq, strikeTime);

          gain.gain.setValueAtTime(0, strikeTime);
          gain.gain.linearRampToValueAtTime(p.vol, strikeTime + 0.004); // Instant hammer strike
          gain.gain.exponentialRampToValueAtTime(0.001, strikeTime + p.decay);

          osc.connect(gain);
          this.routeToMix(gain, 0.6); // Ringside venue reverb

          osc.start(strikeTime);
          osc.stop(strikeTime + p.decay + 0.05);
        });

        // Metal hammer tap transient
        const tap = ctx.createOscillator();
        const tapGain = ctx.createGain();
        tap.type = 'triangle';
        tap.frequency.setValueAtTime(3200, strikeTime);
        tap.frequency.exponentialRampToValueAtTime(600, strikeTime + 0.015);

        tapGain.gain.setValueAtTime(0.2, strikeTime);
        tapGain.gain.exponentialRampToValueAtTime(0.001, strikeTime + 0.02);

        tap.connect(tapGain);
        this.routeToMix(tapGain, 0.3);

        tap.start(strikeTime);
        tap.stop(strikeTime + 0.025);
      }
    } catch {
      // Ignore
    }
  }

  /**
   * Realistic Leather Ball Kick / Impact
   * Low punchy chest thump with authentic acoustic leather pop
   */
  playKickSound() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Bass boom (air inside ball compressing 160Hz -> 38Hz)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(175, now);
      osc.frequency.exponentialRampToValueAtTime(38, now + 0.13);

      oscGain.gain.setValueAtTime(0.38, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.19);

      osc.connect(oscGain);
      this.routeToMix(oscGain, 0.25);

      // Leather friction snap (boot strike)
      const noise = this.createNoiseBuffer(ctx, 0.07);
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noise;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1300, now);
      filter.frequency.exponentialRampToValueAtTime(280, now + 0.05);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.28, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

      noiseSource.connect(filter);
      filter.connect(noiseGain);
      this.routeToMix(noiseGain, 0.35);

      osc.start(now);
      osc.stop(now + 0.2);
      noiseSource.start(now);
      noiseSource.stop(now + 0.08);
    } catch {
      // Ignore
    }
  }

  /**
   * Realistic Hockey Puck Slap / Carbon Stick Impact
   */
  playPuckSlap() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1800, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.06);

      gain.gain.setValueAtTime(0.36, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      this.routeToMix(gain, 0.4);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch {
      // Ignore
    }
  }

  /**
   * Clean, Futuristic Notification Chime / Alert Ping
   * Modern marimba/bell tone with dual harmonic overtones
   */
  playAlertPing() {
    if (!this.enabled) return;
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      osc1.frequency.setValueAtTime(987.77, now); // B5
      osc1.frequency.exponentialRampToValueAtTime(1318.51, now + 0.07); // E6

      osc2.frequency.setValueAtTime(1975.53, now); // B6 overtone
      osc2.frequency.exponentialRampToValueAtTime(2637.02, now + 0.07);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.24, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.48);

      osc1.connect(gain);
      osc2.connect(gain);
      this.routeToMix(gain, 0.4);

      osc1.start(now);
      osc1.stop(now + 0.5);
      osc2.start(now);
      osc2.stop(now + 0.5);
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
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.035);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.038);

      osc.connect(gain);
      this.routeToMix(gain, 0.15);

      osc.start(now);
      osc.stop(now + 0.04);
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
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.setValueAtTime(540, now + 0.09);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      this.routeToMix(gain, 0.35);

      osc.start(now);
      osc.stop(now + 0.32);
    } catch {
      // Ignore
    }
  }

  /**
   * Sport-Aware Realistic Audio Event Dispatcher
   * Automatically plays the authentic audio package depending on the sport!
   */
  playCelebrationForSport(sport?: SportSoundType) {
    if (!this.enabled) return;

    switch (sport) {
      case 'basquete':
        this.playBasketballSwish();
        setTimeout(() => this.playBasketballBuzzer(), 120);
        break;
      case 'hockey':
        this.playPuckSlap();
        setTimeout(() => this.playGoalHorn(), 90);
        break;
      case 'jiujitsu':
      case 'judo':
      case 'mma':
        this.playFightBell(3);
        break;
      case 'volei':
        this.playWhistle('single');
        setTimeout(() => this.playGoalHorn(), 140);
        break;
      case 'natacao':
        this.playWhistle('single');
        break;
      case 'tenis':
        this.playWhistle('single');
        break;
      case 'futebol':
      default:
        this.playKickSound();
        setTimeout(() => this.playGoalHorn(), 140);
        break;
    }
  }
}

export const soundFx = new RealisticSoundEngine();
