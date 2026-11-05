<script>
  import { onMount, onDestroy } from "svelte";
  import { sound } from "../sound.js";

  export let isLetterOpen = false;
  export let musicConfig = {
    bgMusic: {
      title: "Happy Birthday Acoustic Lofi",
      src: "",
    },
    letterMusic: {
      title: "Melody of Heartfelt Wish",
      src: "",
    },
  };

  let bgAudio = null;
  let letterAudio = null;
  let isPlayingBg = false;
  let isPlayingLetter = false;
  let bgSynthInterval = null;
  let letterSynthInterval = null;
  let webAudioGainBg = null;
  let webAudioGainLetter = null;

  onMount(() => {
    initAutoplay();
  });

  onDestroy(() => {
    stopAllAudio();
  });

  function initAutoplay() {
    startBackgroundMusic();
    const unlockEvents = ["click", "touchstart", "scroll", "keydown"];
    const handleUnlock = () => {
      startBackgroundMusic();
      unlockEvents.forEach((evt) =>
        window.removeEventListener(evt, handleUnlock),
      );
    };

    unlockEvents.forEach((evt) =>
      window.addEventListener(evt, handleUnlock, { once: true, passive: true }),
    );
  }

  function startBackgroundMusic() {
    if (musicConfig?.bgMusic?.src && bgAudio) {
      bgAudio.volume = 0.85;
      bgAudio
        .play()
        .then(() => {
          isPlayingBg = true;
        })
        .catch(() => {
          startSynthBg();
        });
    } else {
      startSynthBg();
    }
  }
  $: handleLetterState(isLetterOpen);

  function handleLetterState(open) {
    if (open) {
      if (bgAudio && isPlayingBg) {
        fadeAudioVolume(bgAudio, 0.02, 600);
      } else if (webAudioGainBg) {
        setSynthBgVolume(0.02);
      }
      if (musicConfig?.letterMusic?.src && letterAudio) {
        letterAudio.volume = 1.0;
        letterAudio
          .play()
          .then(() => {
            isPlayingLetter = true;
          })
          .catch(() => {
            startSynthLetter();
          });
      } else {
        startSynthLetter();
      }
    } else {
      if (letterAudio) {
        letterAudio.pause();
        letterAudio.currentTime = 0;
      }
      stopSynthLetter();
      isPlayingLetter = false;
      if (bgAudio && isPlayingBg) {
        fadeAudioVolume(bgAudio, 0.85, 600);
      } else if (webAudioGainBg) {
        setSynthBgVolume(0.85);
      }
    }
  }

  function fadeAudioVolume(audioEl, targetVol, durationMs) {
    if (!audioEl) return;
    const startVol = audioEl.volume;
    const steps = 15;
    const stepTime = durationMs / steps;
    const volStep = (targetVol - startVol) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const nextVol = Math.max(0, Math.min(1, audioEl.volume + volStep));
      audioEl.volume = nextVol;
      if (currentStep >= steps) {
        audioEl.volume = targetVol;
        clearInterval(interval);
      }
    }, stepTime);
  }
  function startSynthBg() {
    if (isPlayingBg) return;
    sound.init();
    isPlayingBg = true;
    webAudioGainBg = 0.85;
    const melody = [
      523.25, 659.25, 783.99, 659.25, 587.33, 783.99, 880.0, 659.25,
    ];
    let step = 0;
    bgSynthInterval = setInterval(() => {
      if (isPlayingBg && sound.ctx) {
        const freq = melody[step % melody.length];
        playSynthNote(freq, 1.4, webAudioGainBg);
        step++;
      }
    }, 1100);
  }

  function startSynthLetter() {
    if (isPlayingLetter) return;
    sound.init();
    isPlayingLetter = true;
    webAudioGainLetter = 1.0;
    const letterMelody = [
      659.25, 783.99, 1046.5, 880.0, 783.99, 659.25, 587.33, 523.25,
    ];
    let step = 0;
    letterSynthInterval = setInterval(() => {
      if (isPlayingLetter && sound.ctx) {
        const freq = letterMelody[step % letterMelody.length];
        playSynthNote(freq, 1.6, webAudioGainLetter, "triangle");
        step++;
      }
    }, 900);
  }

  function stopSynthLetter() {
    if (letterSynthInterval) {
      clearInterval(letterSynthInterval);
      letterSynthInterval = null;
    }
    isPlayingLetter = false;
  }

  function setSynthBgVolume(vol) {
    webAudioGainBg = vol;
  }

  function playSynthNote(freq, duration, gainLevel, type = "sine") {
    if (!sound.ctx || sound.ctx.state === "suspended") return;
    try {
      const osc = sound.ctx.createOscillator();
      const gain = sound.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, sound.ctx.currentTime);

      const now = sound.ctx.currentTime;
      const targetGain = 0.08 * (gainLevel || 1.0);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(targetGain, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(sound.ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
    }
  }

  function stopAllAudio() {
    if (bgAudio) bgAudio.pause();
    if (letterAudio) letterAudio.pause();
    if (bgSynthInterval) clearInterval(bgSynthInterval);
    if (letterSynthInterval) clearInterval(letterSynthInterval);
  }
</script>


{#if musicConfig?.bgMusic?.src}
  <audio bind:this={bgAudio} src={musicConfig.bgMusic.src} loop preload="auto"
  ></audio>
{/if}
{#if musicConfig?.letterMusic?.src}
  <audio
    bind:this={letterAudio}
    src={musicConfig.letterMusic.src}
    loop
    preload="auto"
  ></audio>
{/if}
<aside
  class="fixed top-3.5 left-1/2 -translate-x-1/2 z-50 select-none pointer-events-none"
>
  {#if isLetterOpen}
    
    <div
      class="relative h-11 px-4 sm:px-5 rounded-full liquid-glass-expanded flex items-center gap-3 transition-all duration-500 transform animate-island-pop overflow-hidden shadow-2xl"
    >
      
      <div class="liquid-glass-specular"></div>

      
      <span class="text-sm sm:text-base animate-pulse relative z-10">💌</span>

      
      <div class="flex flex-col text-left relative z-10">
        <span
          class="text-[11px] sm:text-xs font-semibold text-pastel-dark tracking-tight leading-tight"
        >
          {musicConfig?.letterMusic?.title || "Bức thư yêu thương"}
        </span>
        <span class="text-[9px] text-pastel-deep/80 font-mono">
          Nhạc thư 100% • Nền 8%
        </span>
      </div>

      
      <div class="flex gap-0.5 items-end h-3.5 ml-1 relative z-10">
        <span class="w-0.5 bg-rose-500 rounded-full animate-equalizer-1 shadow-[0_0_6px_rgba(244,63,94,0.6)]"></span>
        <span class="w-0.5 bg-rose-400 rounded-full animate-equalizer-2 shadow-[0_0_6px_rgba(251,113,133,0.6)]"></span>
        <span class="w-0.5 bg-rose-500 rounded-full animate-equalizer-3 shadow-[0_0_6px_rgba(244,63,94,0.6)]"></span>
        <span class="w-0.5 bg-rose-400 rounded-full animate-equalizer-4 shadow-[0_0_6px_rgba(251,113,133,0.6)]"></span>
      </div>
    </div>
  {:else}
    
    <div
      class="relative h-8 sm:h-9 px-3.5 sm:px-4 rounded-full liquid-glass-compact flex items-center gap-2.5 transition-all duration-500 overflow-hidden shadow-lg"
    >
      
      <div class="liquid-glass-specular"></div>

      
      <span class="text-xs animate-spin-slow relative z-10">🎵</span>

      
      <span
        class="text-[11px] sm:text-xs font-medium text-pastel-dark tracking-tight max-w-[160px] sm:max-w-[230px] truncate relative z-10"
      >
        {musicConfig?.bgMusic?.title || "Happy Birthday Acoustic Lofi"}
      </span>

      
      <div class="flex gap-0.5 items-end h-3 ml-0.5 relative z-10">
        <span class="w-0.5 bg-rose-500 rounded-full animate-equalizer-1 shadow-[0_0_5px_rgba(232,93,117,0.5)]"></span>
        <span class="w-0.5 bg-rose-400 rounded-full animate-equalizer-2 shadow-[0_0_5px_rgba(255,142,158,0.5)]"></span>
        <span class="w-0.5 bg-rose-500 rounded-full animate-equalizer-3 shadow-[0_0_5px_rgba(232,93,117,0.5)]"></span>
      </div>
    </div>
  {/if}
</aside>

<style>
  .liquid-glass-compact {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.72) 0%,
      rgba(255, 245, 248, 0.52) 50%,
      rgba(255, 255, 255, 0.38) 100%
    );
    backdrop-filter: blur(28px) saturate(190%);
    -webkit-backdrop-filter: blur(28px) saturate(190%);
    border: 1px solid rgba(255, 255, 255, 0.85);
    box-shadow:
      inset 0 1px 1px 0 rgba(255, 255, 255, 0.95),
      inset 0 -1px 1px 0 rgba(232, 93, 117, 0.08),
      0 8px 30px -4px rgba(232, 93, 117, 0.16),
      0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .liquid-glass-expanded {
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.82) 0%,
      rgba(255, 235, 240, 0.62) 50%,
      rgba(255, 255, 255, 0.45) 100%
    );
    backdrop-filter: blur(32px) saturate(200%);
    -webkit-backdrop-filter: blur(32px) saturate(200%);
    border: 1px solid rgba(255, 255, 255, 0.95);
    box-shadow:
      inset 0 1px 1.5px 0 rgba(255, 255, 255, 1),
      inset 0 -1px 1.5px 0 rgba(232, 93, 117, 0.15),
      0 12px 36px -2px rgba(232, 93, 117, 0.25),
      0 4px 12px rgba(0, 0, 0, 0.05);
  }

  .liquid-glass-specular {
    position: absolute;
    top: 0;
    left: 8px;
    right: 8px;
    height: 48%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.7) 0%,
      rgba(255, 255, 255, 0) 100%
    );
    border-radius: 9999px 9999px 0 0;
    pointer-events: none;
    z-index: 1;
  }

  @keyframes spinSlow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .animate-spin-slow {
    animation: spinSlow 6s linear infinite;
  }

  @keyframes islandPop {
    0% {
      transform: scale(0.95);
    }
    50% {
      transform: scale(1.03);
    }
    100% {
      transform: scale(1);
    }
  }

  .animate-island-pop {
    animation: islandPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  @keyframes eq1 {
    0%,
    100% {
      height: 3px;
    }
    50% {
      height: 12px;
    }
  }
  @keyframes eq2 {
    0%,
    100% {
      height: 10px;
    }
    50% {
      height: 4px;
    }
  }
  @keyframes eq3 {
    0%,
    100% {
      height: 5px;
    }
    50% {
      height: 13px;
    }
  }
  @keyframes eq4 {
    0%,
    100% {
      height: 8px;
    }
    50% {
      height: 3px;
    }
  }

  .animate-equalizer-1 {
    animation: eq1 0.8s ease-in-out infinite;
  }
  .animate-equalizer-2 {
    animation: eq2 0.7s ease-in-out infinite 0.15s;
  }
  .animate-equalizer-3 {
    animation: eq3 0.9s ease-in-out infinite 0.3s;
  }
  .animate-equalizer-4 {
    animation: eq4 0.65s ease-in-out infinite 0.2s;
  }
</style>
