<script>
  import { onMount } from "svelte";
  import { birthdayConfig } from "./birthday.config.js";
  import FloatingPetals from "./lib/components/FloatingPetals.svelte";
  import MusicPlayer from "./lib/components/MusicPlayer.svelte";
  import IntroSection from "./lib/components/IntroSection.svelte";
  import MainWishSection from "./lib/components/MainWishSection.svelte";
  import InteractiveSection from "./lib/components/InteractiveSection.svelte";

  let isLetterOpen = false;

  function handleOpenLetter() {
    isLetterOpen = true;
  }

  function handleCloseLetter() {
    isLetterOpen = false;
  }

  onMount(() => {
    const revealElements = document.querySelectorAll(".scroll-layer");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("layer-visible");
          } else {
            entry.target.classList.remove("layer-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
</script>

<MusicPlayer musicConfig={birthdayConfig.music} {isLetterOpen} />

<MainWishSection
  isOpen={isLetterOpen}
  onClose={handleCloseLetter}
  recipientName={birthdayConfig.recipient.name}
  birthDate={birthdayConfig.recipient.displayDate}
  wish={birthdayConfig.wish}
/>

<main
  class="relative min-h-screen bg-pastel-bg text-pastel-dark font-sans selection:bg-pastel-peach selection:text-pastel-dark overflow-x-hidden"
>
  <FloatingPetals />

  <div
    class="fixed top-1/4 -left-32 w-96 h-96 bg-pastel-peach/25 rounded-full blur-3xl pointer-events-none -z-10"
  ></div>
  <div
    class="fixed bottom-1/3 -right-32 w-96 h-96 bg-pastel-rose/20 rounded-full blur-3xl pointer-events-none -z-10"
  ></div>

  <div class="scroll-layer layer-visible">
    <IntroSection
      recipientName={birthdayConfig.recipient.name}
      targetDate={birthdayConfig.recipient.birthDate}
      displayDate={birthdayConfig.recipient.displayDate}
      onOpen={handleOpenLetter}
    />
  </div>

  <div class="section-divider-container" aria-hidden="true">
    <div class="section-divider">
      <div class="divider-line"></div>
      <div class="divider-gem">
        <span class="text-xs text-pastel-rose/60">✦</span>
      </div>
      <div class="divider-line"></div>
    </div>
  </div>

  <div class="scroll-layer">
    <InteractiveSection />
  </div>

  <div class="section-divider-container" aria-hidden="true">
    <div class="section-divider">
      <div class="divider-line"></div>
      <div class="divider-gem">
        <span class="text-xs text-pastel-rose/60">✦</span>
      </div>
      <div class="divider-line"></div>
    </div>
  </div>

  <footer
    class="py-8 text-center text-xs text-pastel-subtle space-y-2 relative z-10"
  >
    <p>
      Designed by <a href="https://hpahm.top" class="underline">hpahm</a>
    </p>
  </footer>
</main>

<style>
  .section-divider-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 1.5rem;
    position: relative;
    z-index: 10;
  }

  .section-divider {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    width: 100%;
    max-width: 26rem;
    opacity: 0.85;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(232, 93, 117, 0.35),
      transparent
    );
  }

  .divider-gem {
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    transform: translateY(-0.5px);
  }

  :global(.scroll-layer) {
    opacity: 0;
    transform: translateY(36px);
    transition:
      opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: opacity, transform;
  }

  :global(.scroll-layer.layer-visible) {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1),
      transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  :global(.scroll-layer .stagger-row) {
    opacity: 0;
    transform: translateY(22px);
    transition:
      opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
      transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: opacity, transform;
  }

  :global(.scroll-layer.layer-visible .stagger-row) {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 1.3s cubic-bezier(0.16, 1, 0.3, 1),
      transform 1.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  :global(.scroll-layer.layer-visible .stagger-delay-1) {
    transition-delay: 0.12s;
  }
  :global(.scroll-layer.layer-visible .stagger-delay-2) {
    transition-delay: 0.32s;
  }
  :global(.scroll-layer.layer-visible .stagger-delay-3) {
    transition-delay: 0.52s;
  }
  :global(.scroll-layer.layer-visible .stagger-delay-4) {
    transition-delay: 0.72s;
  }
  :global(.scroll-layer.layer-visible .stagger-delay-5) {
    transition-delay: 0.92s;
  }
</style>
