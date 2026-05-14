/**
 * Haptic and Audio feedback engine for Spell Heist
 */

// Web Audio Context (lazy initialized)
let audioCtx: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

const playTone = (frequency: number, type: OscillatorType, duration: number, volume = 0.1) => {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    
    // Envelope
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Ignore audio errors (e.g., if user hasn't interacted with page yet)
  }
};

export const Haptics = {
  // Try to vibrate device
  vibrate: (pattern: number | number[]) => {
    try {
      if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
      }
    } catch (e) {
      // Ignore
    }
  },

  // Soft tap for typing
  tap: () => {
    Haptics.vibrate(10);
    playTone(600, 'sine', 0.05, 0.05);
  },

  // Heavier tap for submit/enter
  submit: () => {
    Haptics.vibrate([15, 30, 15]);
    playTone(400, 'square', 0.1, 0.05);
  },

  // Error/Delete
  error: () => {
    Haptics.vibrate([30, 40, 30]);
    playTone(150, 'sawtooth', 0.15, 0.08);
  },

  // Win condition
  success: () => {
    Haptics.vibrate([30, 50, 30, 50, 100]);
    // Arpeggio
    setTimeout(() => playTone(440, 'sine', 0.2, 0.1), 0);
    setTimeout(() => playTone(554, 'sine', 0.2, 0.1), 100);
    setTimeout(() => playTone(659, 'sine', 0.4, 0.1), 200);
  },

  // Alarm increase / warning
  alarm: () => {
    Haptics.vibrate(50);
    playTone(800, 'sawtooth', 0.2, 0.05);
  }
};
