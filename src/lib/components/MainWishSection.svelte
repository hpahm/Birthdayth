<script>
  import { fade, scale } from "svelte/transition";
  import { sound } from "../sound.js";

  export let isOpen = false;
  export let onClose = () => {};
  export let recipientName;
  export let birthDate;
  export let wish;

  let cardElement = null;
  let isSaving = false;
  let paragraphsToType = [];
  let displayedParagraphs = [];
  let isTyping = false;
  let typingTimer = null;
  let currentPara = 0;
  let currentChar = 0;
  const fullHappyBirthday = "Happy Birthday to You";
  let typedHappyBirthday = "";
  let hbTimer = null;
  let hbChar = 0;

  $: if (isOpen) {
    startTypewriter();
  } else {
    stopTypewriter();
  }

  function startTypewriter() {
    stopTypewriter();
    const rawParas = wish?.paragraphs || [
      "Thêm một tuổi mới là thêm một trang hành trình ngập tràn những khoảnh khắc tuyệt vời. Chúc bạn luôn giữ nụ cười rạng rỡ trên môi, mỗi ngày thức dậy đều tìm thấy niềm vui trong những điều giản dị nhất.",
      "Mong rằng mọi ước mơ bạn ấp ủ đều sớm nở hoa, trên con đường phía trước luôn có bình yên, tình yêu thương và sự dịu dàng đồng hành cùng bạn.",
      "Cảm ơn bạn vì đã luôn là một món quà đặc biệt và ấm áp của thế giới này. 🌸",
    ];
    paragraphsToType = rawParas;
    displayedParagraphs = rawParas.map(() => "");
    currentPara = 0;
    currentChar = 0;
    isTyping = true;
    typingTimer = setTimeout(typeNextChar, 420);
    typedHappyBirthday = "";
    hbChar = 0;
    hbTimer = setTimeout(typeNextHbChar, 850);
  }

  function typeNextChar() {
    if (!isOpen || currentPara >= paragraphsToType.length) {
      isTyping = false;
      return;
    }

    const targetText = paragraphsToType[currentPara];
    if (currentChar < targetText.length) {
      displayedParagraphs[currentPara] = targetText.slice(0, currentChar + 1);
      displayedParagraphs = [...displayedParagraphs];
      currentChar++;
      typingTimer = setTimeout(typeNextChar, 18);
    } else {
      currentPara++;
      currentChar = 0;
      typingTimer = setTimeout(typeNextChar, 150);
    }
  }

  function typeNextHbChar() {
    if (!isOpen) return;
    if (hbChar < fullHappyBirthday.length) {
      typedHappyBirthday = fullHappyBirthday.slice(0, hbChar + 1);
      hbChar++;
      hbTimer = setTimeout(typeNextHbChar, 50);
    }
  }

  function stopTypewriter() {
    if (typingTimer) {
      clearTimeout(typingTimer);
      typingTimer = null;
    }
    if (hbTimer) {
      clearTimeout(hbTimer);
      hbTimer = null;
    }
    isTyping = false;
  }

  function showAllImmediately() {
    stopTypewriter();
    if (paragraphsToType.length) {
      displayedParagraphs = [...paragraphsToType];
    }
    typedHappyBirthday = fullHappyBirthday;
    hbChar = fullHappyBirthday.length;
  }

  function handleClose() {
    stopTypewriter();
    onClose();
    sound.playChime(440, 0.2);
  }

  async function handleSaveCard() {
    if (!cardElement || isSaving) return;
    showAllImmediately();
    isSaving = true;
    sound.playChime(659.25, 0.4);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const canvas = await html2canvas(cardElement, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: "#FFFFFF",
        logging: false,
      });

      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      const safeName = (recipientName || "Tra_My").replace(/\s+/g, "_");
      link.download = `Thiep_Sinh_Nhat_${safeName}.png`;
      link.href = image;
      link.click();
    } catch (err) {
      console.warn("Lỗi lưu thiệp:", err);
    } finally {
      isSaving = false;
    }
  }
</script>

{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-pastel-dark/50 backdrop-blur-md overflow-y-auto select-none"
    transition:fade={{ duration: 280 }}
    on:click={handleClose}
    on:keydown={(e) => e.key === "Escape" && handleClose()}
    role="dialog"
    tabindex="-1"
    aria-modal="true"
  >
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div
      bind:this={cardElement}
      class="relative max-w-2xl w-full my-auto glass-panel bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/95 text-center sm:text-left space-y-6"
      transition:scale={{ duration: 380, start: 0.9, opacity: 0 }}
      on:click|stopPropagation
      role="document"
    >
      
      <button
        type="button"
        on:click={handleClose}
        class="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-pastel-dark shadow-sm border border-pastel-peach/40 flex items-center justify-center text-sm transition-all hover:scale-110 active:scale-95"
        aria-label="Đóng thư"
        data-html2canvas-ignore="true"
      >
        ✕
      </button>
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div
        class="flex items-center justify-between pb-6 border-b border-pastel-peach/25 pr-10"
      >
        <div class="flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-pastel-deep animate-pulse"
          ></span>
          <span
            class="text-xs font-semibold tracking-widest uppercase text-pastel-subtle"
          >
            Special Edition {birthDate}
          </span>
        </div>
      </div>

      
      <div class="space-y-5 text-center sm:text-left pt-2">
        
        <div
          class="text-pastel-peach/50 text-5xl font-serif leading-none select-none -mb-4"
        >
          “
        </div>

        
        <div
          class="w-full max-w-lg h-24 sm:h-28 mx-auto sm:mx-0 flex items-center justify-center sm:justify-start"
        >
          <svg class="w-full h-full overflow-visible" viewBox="0 0 540 100">
            <text x="0" y="42" class="apple-letter-title">
              Chúc mừng sinh nhật,
            </text>
            <text x="0" y="90" class="apple-letter-name">
              {recipientName}!
            </text>
          </svg>
        </div>

        
        
        <div
          class="space-y-4 text-pastel-dark/85 text-base sm:text-lg font-light leading-relaxed tracking-normal cursor-pointer"
          on:click={showAllImmediately}
          role="region"
          aria-label="Nội dung lời chúc (nhấn để hiện toàn bộ)"
        >
          {#each displayedParagraphs as para, i}
            {#if para.length > 0 || (isTyping && i === currentPara)}
              <p
                class={i === displayedParagraphs.length - 1
                  ? "text-pastel-deep font-normal pt-1"
                  : ""}
              >
                {para}
                {#if isTyping && i === currentPara}
                  <span
                    class="inline-block w-1.5 h-4 bg-pastel-deep rounded-full animate-pulse ml-0.5 align-middle"
                  ></span>
                {/if}
              </p>
            {/if}
          {/each}
        </div>

        
        <div
          class="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-pastel-subtle border-t border-pastel-peach/20 gap-4"
        >
          <div class="flex items-center gap-2">
            <span>Made by</span>
            <span class="font-medium text-pastel-dark">{wish?.signature}</span>
          </div>

          
          <div
            class="font-macintosh text-2xl text-pastel-deep tracking-wide min-h-[36px] flex items-center justify-center sm:justify-end"
          >
            <span>{typedHappyBirthday}</span>
            {#if hbChar < fullHappyBirthday.length}
              <span
                class="inline-block w-1.5 h-4 bg-pastel-deep/70 rounded-full animate-pulse ml-1"
              ></span>
            {:else}
              <span class="inline-block text-sm ml-1 animate-bounce">✨</span>
            {/if}
          </div>
        </div>
      </div>

      
      <div
        class="pt-4 flex flex-wrap items-center justify-center gap-3"
        data-html2canvas-ignore="true"
      >
        
        <button
          type="button"
          on:click={handleSaveCard}
          disabled={isSaving}
          class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-pastel-deep to-pastel-rose text-white text-xs sm:text-sm font-medium shadow-md hover:shadow-soft-glow transition-all hover:scale-105 active:scale-95 disabled:opacity-60"
        >
          <span>{isSaving ? "Đang tạo ảnh..." : "Lưu thiệp về máy"}</span>
        </button>

        
        <button
          type="button"
          on:click={handleClose}
          class="px-6 py-2.5 rounded-full bg-pastel-light hover:bg-white text-pastel-dark text-xs sm:text-sm font-medium border border-pastel-peach/50 shadow-xs transition-all hover:scale-105 active:scale-95"
        >
          Đóng lại
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .apple-letter-title {
    font-family:
      "Macintosh Skeletal Filled",
      -apple-system,
      sans-serif;
    font-size: 40px;
    fill: transparent;
    stroke: #e85d75;
    stroke-width: 1.8px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1800;
    stroke-dashoffset: 1800;
    filter: drop-shadow(0 2px 6px rgba(232, 93, 117, 0.25));
    animation: appleDrawLetterTitle 3s cubic-bezier(0.4, 0, 0.2, 1) forwards
      0.2s;
  }

  .apple-letter-name {
    font-family:
      "Macintosh Skeletal Filled",
      -apple-system,
      sans-serif;
    font-size: 48px;
    fill: transparent;
    stroke: #e85d75;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1800;
    stroke-dashoffset: 1800;
    animation: appleDrawLetterName 3.2s cubic-bezier(0.4, 0, 0.2, 1) forwards
      0.35s;
  }

  @keyframes appleDrawLetterTitle {
    0% {
      stroke-dashoffset: 1800;
      fill: transparent;
    }
    65% {
      stroke-dashoffset: 0;
      fill: transparent;
    }
    85%,
    100% {
      stroke-dashoffset: 0;
      fill: #ffffff;
    }
  }

  @keyframes appleDrawLetterName {
    0% {
      stroke-dashoffset: 1800;
      fill: transparent;
    }
    65% {
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
