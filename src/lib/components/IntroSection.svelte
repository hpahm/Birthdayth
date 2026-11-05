<script>
  import { sound } from "../sound.js";
  import confetti from "canvas-confetti";
  import CountdownWidget from "./CountdownWidget.svelte";

  export let recipientName;
  export let targetDate = "2026-10-25T00:00:00";
  export let displayDate = "25 . 10";
  export let onOpen = () => {};

  let isOpen = false;

  function handleOpen() {
    if (!isOpen) {
      isOpen = true;
      sound.playChime(659.25, 0.9);
      setTimeout(() => sound.playChime(880, 1.2), 150);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFB6C1", "#FF8E9E", "#FFF0F3", "#FFD1DC", "#FFE4E1"],
        disableForReducedMotion: true,
        scalar: 0.85,
      });
    }
    setTimeout(() => {
      onOpen();
    }, 320);
  }

  function scrollToNext() {
    sound.playChime(523.25, 0.25);
    const galleryEl = document.getElementById("gallery");
    if (galleryEl) {
      galleryEl.scrollIntoView({ behavior: "smooth" });
    }
  }
</script>

<section
  id="intro"
  class="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-16 text-center select-none"
>
  
  <div class="max-w-xl mx-auto space-y-3 mb-14 sm:mb-20 transition-all duration-700">
    
    <div class="pt-1 pb-1 stagger-row stagger-delay-1">
      <CountdownWidget {targetDate} {displayDate} />
    </div>

    
    <div class="flex flex-col items-center justify-center py-2 stagger-row stagger-delay-2">
      <div
        class="w-full max-w-xs h-14 sm:h-16 flex items-center justify-center"
      >
        <svg class="w-full h-full overflow-visible" viewBox="0 0 350 70">
          <text x="50%" y="70%" text-anchor="middle" class="apple-intro-draw">
            Xin chào,
          </text>
        </svg>
      </div>
      <div
        class="w-full max-w-md h-24 sm:h-28 flex items-center justify-center"
      >
        <svg class="w-full h-full overflow-visible" viewBox="0 0 500 110">
          <text x="50%" y="75%" text-anchor="middle" class="apple-name-draw">
            {recipientName}
          </text>
        </svg>
      </div>
    </div>

    <p
      class="text-sm sm:text-base text-pastel-subtle font-normal tracking-wide max-w-md mx-auto pt-1 leading-relaxed stagger-row stagger-delay-3"
    >
      Có một món quà đặc biệt được gửi riêng cho bạn.
    </p>
  </div>

  
  <div
    class="relative w-72 sm:w-80 h-52 sm:h-56 mx-auto cursor-pointer group mt-6 sm:mt-8 stagger-row stagger-delay-4"
    on:click={handleOpen}
    role="button"
    tabindex="0"
    on:keydown={(e) => (e.key === "Enter" || e.key === " ") && handleOpen()}
  >
    
    <div
      class="absolute inset-0 bg-gradient-to-r from-pastel-peach/30 to-pastel-rose/30 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-60"
    ></div>

    
    <div
      class="relative w-full h-full rounded-2xl glass-panel shadow-glass p-1 border border-white/90 overflow-visible transition-transform duration-500 group-hover:-translate-y-1"
    >
      
      <div
        class="absolute left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-pastel-peach/40 flex flex-col items-center justify-center text-center transition-all duration-700 ease-out z-10"
        style={isOpen
          ? "top: -45px; height: 140px; opacity: 1; transform: scale(1.02);"
          : "top: 15px; height: 120px; opacity: 0.3; transform: scale(0.95);"}
      >
        <span class="text-2xl mb-1">💌</span>
        <span
          class="text-xs font-semibold tracking-wider text-pastel-deep uppercase"
          >Happy Birthday</span
        >
        <span class="text-sm text-pastel-dark font-medium mt-1"
          >Dành trọn yêu thương & bình yên</span
        >
        <span class="text-[11px] text-pastel-subtle mt-1 font-mono"
          >Chạm để đọc lời chúc</span
        >
      </div>

      
      <div
        class="absolute inset-0 z-20 rounded-2xl bg-gradient-to-b from-white/80 via-white/70 to-pastel-light/90 backdrop-blur-md flex flex-col justify-end p-5 overflow-hidden"
      >
        
        <div class="absolute inset-0 pointer-events-none opacity-40">
          <div
            class="absolute inset-0 border-b-[90px] border-l-[160px] border-r-[160px] border-b-pastel-peach/25 border-l-transparent border-r-transparent bottom-0"
          ></div>
        </div>

        
        <div
          class="absolute top-0 left-0 right-0 h-28 origin-top transition-transform duration-700 ease-in-out pointer-events-none z-30"
          style={isOpen
            ? "transform: rotateX(180deg); opacity: 0;"
            : "transform: rotateX(0deg); opacity: 1;"}
        >
          <div
            class="w-full h-full border-t-[80px] border-l-[160px] border-r-[160px] border-t-white/90 border-l-transparent border-r-transparent drop-shadow-sm"
          ></div>
        </div>

        
        <div class="relative z-40 mx-auto -mt-6">
          <button
            type="button"
            class="w-14 h-14 rounded-full bg-gradient-to-tr from-[#660708] via-[#A4161A] to-[#BA181B] text-white flex items-center justify-center shadow-md border-2 border-amber-300/40 transform transition-all duration-300 group-hover:scale-110 active:scale-95"
            aria-label="Mở phong thư chúc mừng"
          >
            {#if isOpen}
              <svg
                class="w-6 h-6 animate-pulse text-amber-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            {:else}
              <span class="text-xl">💌</span>
            {/if}
          </button>
        </div>

        <p
          class="text-center text-xs tracking-wide text-pastel-subtle mt-3 font-medium"
        >
          {isOpen ? "Đang mở quà..." : "Ấn vào đây để mở quà"}
        </p>
      </div>
    </div>
  </div>

  
  <div
    class="mt-10 sm:mt-12 transition-all duration-500 flex flex-col items-center justify-center min-h-[56px]"
    class:opacity-100={isOpen}
    class:opacity-0={!isOpen}
    class:pointer-events-none={!isOpen}
  >
    {#if isOpen}
      <button
        type="button"
        on:click={scrollToNext}
        class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-pill bg-white/85 hover:bg-white text-pastel-deep font-medium text-xs sm:text-sm shadow-sm border border-pastel-peach/40 hover:border-pastel-peach/80 transition-all hover:shadow-glass hover:-translate-y-0.5 active:scale-95 cursor-pointer group"
      >
        <span>Xem thêm</span>
        <svg
          class="w-4 h-4 text-pastel-deep animate-bounce group-hover:translate-y-0.5 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>
    {/if}
  </div>
</section>

<style>
  .apple-intro-draw {
    font-family:
      "Macintosh Skeletal Filled",
      -apple-system,
      sans-serif;
    font-size: 50px;
    fill: transparent;
    stroke: #e85d75;
    stroke-width: 1.8px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1400;
    stroke-dashoffset: 1400;
    filter: drop-shadow(0 2px 8px rgba(232, 93, 117, 0.25));
  }

  .apple-name-draw {
    font-family:
      "Macintosh Skeletal Filled",
      -apple-system,
      sans-serif;
    font-size: 72px;
    fill: transparent;
    stroke: #e85d75;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 2000;
    stroke-dashoffset: 2000;
  }

  :global(.scroll-layer.layer-visible) .apple-intro-draw {
    animation: appleDrawIntro 3s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.1s;
  }

  :global(.scroll-layer:not(.layer-visible)) .apple-intro-draw {
    stroke-dashoffset: 1400;
    fill: transparent;
    animation: none !important;
  }

  :global(.scroll-layer.layer-visible) .apple-name-draw {
    animation: appleDrawName 3.5s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.3s;
  }

  :global(.scroll-layer:not(.layer-visible)) .apple-name-draw {
    stroke-dashoffset: 2000;
    fill: transparent;
    animation: none !important;
  }

  @keyframes appleDrawIntro {
    0% {
      stroke-dashoffset: 1400;
      fill: transparent;
    }
    60% {
      stroke-dashoffset: 0;
      fill: transparent;
    }
    85%,
    100% {
      stroke-dashoffset: 0;
      fill: #ffffff;
    }
  }

  @keyframes appleDrawName {
    0% {
      stroke-dashoffset: 2000;
      fill: transparent;
    }
    60% {
      stroke-dashoffset: 0;
      fill: transparent;
    }
    85%,
    100% {
      stroke-dashoffset: 0;
      fill: #e85d75;
    }
  }
</style>
