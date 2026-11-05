<script>
  import { onMount } from 'svelte';

  let canvas;

  onMount(() => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    const petalCount = 28;
    const colors = [
      'rgba(255, 182, 193, 0.45)',
      'rgba(255, 192, 203, 0.4)',
      'rgba(255, 218, 224, 0.5)',
      'rgba(255, 240, 245, 0.6)',
    ];

    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 8 + 6,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 0.8 - 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 1.5 - 0.75,
      color: colors[Math.floor(Math.random() * colors.length)],
      swing: Math.random() * 2,
      swingSpeed: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.angle += p.swingSpeed;
        p.x += Math.sin(p.angle) * p.swing + p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, 0, p.size);
        ctx.bezierCurveTo(-p.size, 0, -p.size / 2, -p.size / 2, 0, 0);
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<canvas
  bind:this={canvas}
  class="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-70"
  aria-hidden="true"
></canvas>
