<script>
  import { onMount } from "svelte";

  export let targetDate = "2026-10-25T00:00:00";
  export let displayDate = "25 . 10";

  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let isBirthdayToday = false;

  function calculateTime() {
    const now = new Date();
    const target = new Date(targetDate);
    const diff = target - now;

    if (diff <= 0) {
      isBirthdayToday = true;
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
      return;
    }

    days = Math.floor(diff / (1000 * 60 * 60 * 24));
    hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    minutes = Math.floor((diff / 1000 / 60) % 60);
    seconds = Math.floor((diff / 1000) % 60);
  }

  onMount(() => {
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  });
</script>

<div
  class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-panel shadow-glass border border-white/90 select-none"
>
  <div
    class="flex items-center gap-1.5 text-pastel-deep text-xs font-semibold uppercase tracking-wider"
  >
    <span class="w-2 h-2 rounded-full bg-pastel-deep animate-ping"></span>
    <span
      >{isBirthdayToday
        ? "Hôm nay là sinh nhật!"
        : `Đếm ngược • ${displayDate}`}</span
    >
  </div>

  <div class="h-4 w-px bg-pastel-peach/40"></div>

  <div
    class="flex items-center gap-2 font-mono text-xs text-pastel-dark font-medium"
  >
    {#if isBirthdayToday}
      <span class="text-pastel-deep font-semibold">Happy Birthday!</span>
    {:else}
      <div class="flex items-center gap-1">
        <span class="text-pastel-deep font-semibold">{days}</span>
        <span class="text-[10px] text-pastel-subtle">ngày</span>
      </div>
      <span>:</span>
      <div class="flex items-center gap-1">
        <span class="text-pastel-deep font-semibold"
          >{hours.toString().padStart(2, "0")}</span
        >
        <span class="text-[10px] text-pastel-subtle">giờ</span>
      </div>
      <span>:</span>
      <div class="flex items-center gap-1">
        <span class="text-pastel-deep font-semibold"
          >{minutes.toString().padStart(2, "0")}</span
        >
        <span class="text-[10px] text-pastel-subtle">phút</span>
      </div>
      <span>:</span>
      <div class="flex items-center gap-1">
        <span class="text-pastel-deep font-semibold"
          >{seconds.toString().padStart(2, "0")}</span
        >
        <span class="text-[10px] text-pastel-subtle">giây</span>
      </div>
    {/if}
  </div>
</div>
