<script>
  import { sound } from "../sound.js";
  import confetti from "canvas-confetti";
  import { birthdayConfig } from "../../birthday.config.js";

  let candlesLit = true;
  let wishText = "";
  let senderName = birthdayConfig.recipient.name;
  let isSending = false;
  let isWishSent = false;
  let sendError = "";

  async function handleSendWish() {
    if (!wishText.trim()) {
      sendError = "Hãy viết một điều ước trước khi gửi nhé!";
      return;
    }
    sendError = "";
    isSending = true;

    const wishMessage = `🎂 ĐIỀU ƯỚC SINH NHẬT TỪ ${senderName}!\n\n✨ Lời ước: "${wishText.trim()}"\n\n⏰ Thời gian: ${new Date().toLocaleString("vi-VN")}`;

    let sentSuccessfully = false;
    const tg = birthdayConfig.wishReceiver?.telegram;
    if (tg?.enabled && tg?.botToken && tg?.chatId) {
      try {
        const tgUrl = `https://api.telegram.org/bot${tg.botToken}/sendMessage`;
        const res = await fetch(tgUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: tg.chatId,
            text: wishMessage,
          }),
        });
        if (res.ok) sentSuccessfully = true;
      } catch (err) {
        console.warn("Lỗi gửi Telegram:", err);
      }
    }
    isSending = false;
    candlesLit = false;
    isWishSent = true;

    sound.playBlowOut();
    setTimeout(() => {
      sound.playCelebration();
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.65 },
        colors: [
          "#FFB6C1",
          "#FF8E9E",
          "#FFF0F3",
          "#FFD1DC",
          "#E85D75",
          "#FFE4E1",
          "#FFD700",
        ],
        scalar: 1.1,
      });
    }, 350);
  }

  function relightCandles() {
    candlesLit = true;
    isWishSent = false;
    wishText = "";
    sound.playChime(783.99, 0.5);
  }
</script>

<section
  id="interactive"
  class="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center select-none"
>
  <div class="max-w-xl w-full mx-auto text-center space-y-10">
    
    <div class="space-y-2 stagger-row stagger-delay-1">
      <div
        class="w-full max-w-md h-20 sm:h-24 mx-auto flex items-center justify-center px-2"
      >
        <svg class="w-full h-full overflow-visible" viewBox="0 0 460 95">
          <text x="50%" y="72%" text-anchor="middle" class="apple-title-draw">
            Điều ước...!!!
          </text>
        </svg>
      </div>
    </div>

    
    <div
      class="glass-panel rounded-3xl p-6 sm:p-10 shadow-glass border border-white/90 relative overflow-hidden stagger-row stagger-delay-2"
    >
      
      <div
        class="relative w-64 h-48 mx-auto flex flex-col items-center justify-end select-none"
      >
        
        <div class="flex justify-center gap-8 mb-1 relative z-20">
          {#each [1, 2, 3] as candle}
            <div class="flex flex-col items-center">
              
              <div
                class="w-3.5 h-6 rounded-full transition-all duration-500 origin-bottom"
                class:animate-flicker={candlesLit}
                class:opacity-100={candlesLit}
                class:opacity-0={!candlesLit}
                class:scale-0={!candlesLit}
                style="background: radial-gradient(circle at 50% 70%, #FFE699 0%, #FFB347 50%, #FF8E9E 100%); box-shadow: 0 0 16px rgba(255, 179, 71, 0.8);"
              ></div>

              
              {#if !candlesLit}
                <div
                  class="w-1.5 h-4 bg-gray-300/60 rounded-full animate-ping -mt-4 opacity-50"
                ></div>
              {/if}

              
              <div
                class="w-2.5 h-9 rounded-sm bg-gradient-to-b from-white via-pastel-peach to-pastel-rose shadow-sm mt-0.5 border border-white/60"
              ></div>
            </div>
          {/each}
        </div>

        
        <div
          class="w-36 h-10 bg-white/90 rounded-t-2xl shadow-inner border-t-4 border-pastel-peach relative flex items-center justify-center"
        >
          
          <div class="absolute -bottom-1 flex justify-around w-full px-2">
            <span class="w-3 h-3 bg-white/90 rounded-full"></span>
            <span class="w-4 h-4 bg-white/90 rounded-full"></span>
            <span class="w-3 h-3 bg-white/90 rounded-full"></span>
            <span class="w-4 h-4 bg-white/90 rounded-full"></span>
          </div>
        </div>

        
        <div
          class="w-48 h-14 bg-gradient-to-r from-pastel-light via-white to-pastel-light rounded-t-xl shadow-md border-t-4 border-pastel-rose/40 relative flex items-center justify-center"
        >
          <span
            class="text-xs tracking-widest uppercase font-mono text-pastel-deep/70 font-semibold"
            >★ Make a Wish ★</span
          >
        </div>

        
        <div
          class="w-56 h-3 bg-white/80 rounded-full shadow-md border border-pastel-peach/30 -mt-0.5"
        ></div>
      </div>

      
      <div class="mt-8 pt-6 border-t border-pastel-peach/25 space-y-4">
        {#if !isWishSent}
          <div class="space-y-3 max-w-md mx-auto text-left">
            <label
              for="wish-input"
              class="block text-xs font-semibold text-pastel-dark uppercase tracking-wider text-center"
            >
              Viết điều ước của bạn vào đây:
            </label>

            <textarea
              id="wish-input"
              bind:value={wishText}
              rows="3"
              placeholder="Điều bạn muốn..."
              class="w-full px-4 py-3 rounded-2xl bg-white/80 focus:bg-white border border-pastel-peach/50 focus:border-pastel-deep outline-none text-xs sm:text-sm text-pastel-dark placeholder-pastel-subtle/70 shadow-inner resize-none transition-all"
            ></textarea>

            {#if sendError}
              <p class="text-xs text-rose-500 font-medium text-center">
                {sendError}
              </p>
            {/if}

            <div class="pt-2 flex justify-center">
              <button
                type="button"
                on:click={handleSendWish}
                disabled={isSending}
                class="px-8 py-3 rounded-full bg-gradient-to-r from-pastel-deep to-pastel-rose hover:from-pastel-rose hover:to-pastel-deep text-white text-xs sm:text-sm font-semibold shadow-md hover:shadow-soft-glow hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50"
              >
                {isSending ? "Đang gửi điều ước..." : "Gửi điều ước"}
              </button>
            </div>
          </div>
        {:else}
          
          <div class="space-y-4 py-4 max-w-md mx-auto">
            <span class="text-4xl inline-block animate-bounce">✨</span>
            <h3
              class="text-lg font-medium text-pastel-deep font-macintosh text-2xl"
            >
              Điều ước đã được gửi đi!
            </h3>
            <p
              class="text-xs sm:text-sm text-pastel-dark/85 leading-relaxed bg-white/60 p-4 rounded-2xl border border-pastel-peach/30"
            >
              "{wishText}"
            </p>
            <p class="text-xs text-pastel-subtle font-medium">
              Mong rằng mọi ước mơ bạn gửi gắm đều sẽ sớm trở thành hiện thực!
              🌸
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  .apple-title-draw {
    font-family:
      "Macintosh Skeletal Filled",
      -apple-system,
      sans-serif;
    font-size: 56px;
    fill: transparent;
    stroke: #e85d75;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1800;
    stroke-dashoffset: 1800;
    filter: drop-shadow(0 2px 10px rgba(232, 93, 117, 0.28));
  }

  :global(.scroll-layer.layer-visible) .apple-title-draw {
    animation: appleDrawWishTitle 3.5s cubic-bezier(0.4, 0, 0.2, 1) forwards 0.15s;
  }

  :global(.scroll-layer:not(.layer-visible)) .apple-title-draw {
    stroke-dashoffset: 1800;
    fill: transparent;
    animation: none !important;
  }

  @keyframes appleDrawWishTitle {
    0% {
      stroke-dashoffset: 1800;
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
</style>
