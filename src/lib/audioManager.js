// Audio Manager - Gestisce TTS e beep

class AudioManager {
  constructor() {
    this.audioContext = null;
    this.isSpeaking = false;
  }

  // Inizializza Audio Context (per beep)
  initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  // Text-to-Speech
  speak(text, settings = { voiceEnabled: true }) {
    if (!settings.voiceEnabled || this.isSpeaking) return;

    // Cancella eventuali speech in corso
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'it-IT';
    utterance.rate = 0.9; // Voce calma
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => {
      this.isSpeaking = true;
    };

    utterance.onend = () => {
      this.isSpeaking = false;
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
    };

    window.speechSynthesis.speak(utterance);
  }

  // Beep di completamento (tono gentile)
  playBeep(settings = { audioEnabled: true }) {
    if (!settings.audioEnabled) return;

    this.initAudioContext();

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Tono gentile: 800Hz
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    // Fade out dolce
    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.3
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.3);
  }

  // Beep doppio per completamento routine
  playCompletionSound(settings = { audioEnabled: true }) {
    if (!settings.audioEnabled) return;

    this.playBeep(settings);
    setTimeout(() => this.playBeep(settings), 200);
  }

  // Ferma tutti i suoni
  stopAll() {
    window.speechSynthesis.cancel();
    this.isSpeaking = false;
  }
}

export default new AudioManager();
