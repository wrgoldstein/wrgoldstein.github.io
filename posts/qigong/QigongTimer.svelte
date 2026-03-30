<script>
  const movements = [
    {
      name: "Tiger",
      chinese: "虎戏",
      emoji: "🐯",
      element: "Lung · Metal",
      cue: "Raise arms overhead, fingers spread like claws. Inhale, rise onto toes, stretch upward. Exhale, draw the claws down with force, bending the knees. Powerful and expansive — open the chest, strengthen the sinews.",
    },
    {
      name: "Deer",
      chinese: "鹿戏",
      emoji: "🦌",
      element: "Kidney · Water",
      cue: "Arms raised, elbows bent, fingers spread like antlers. Rotate gently from the waist — left, then right — hips relatively still. Graceful and fluid; the twist wrings out the lower back and nourishes the kidneys.",
    },
    {
      name: "Bear",
      chinese: "熊戏",
      emoji: "🐻",
      element: "Spleen · Earth",
      cue: "Shift weight onto one foot, let the opposite shoulder drop heavily, arm swinging low. Shift and swing the other side — slow, lumbering, from the hips. Let the arms be dead weight. Massages the digestive organs.",
    },
    {
      name: "Monkey",
      chinese: "猿戏",
      emoji: "🐒",
      element: "Heart · Fire",
      cue: "Step forward, reach both hands out as if snatching fruit — quick, curious, alert. Pull hands to chest, step back, look side to side. Quick and playful but never tense. Alternate sides. Opens the heart.",
    },
    {
      name: "Bird",
      chinese: "鸟戏",
      emoji: "🦢",
      element: "Liver · Wood",
      cue: "Stand on one leg. Raise both arms slowly like wings, inhaling as you rise onto your toes. Hold — still, balanced. Exhale as arms float down. Switch legs. Cultivates balance and lightness. End here.",
    },
  ];

  const COUNTDOWN_SECS = 5;
  const MOVEMENT_SECS = 60;

  let phase = $state("idle");
  let countdownLeft = $state(COUNTDOWN_SECS);
  let secondsLeft = $state(MOVEMENT_SECS);
  let currentIdx = $state(0);
  let completed = $state([]);

  let intervalId = null;

  function playBell() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(528, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.8);
      gain.gain.setValueAtTime(0.6, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.5);
    } catch (e) {}
  }

  function playStart() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    } catch (e) {}
  }

  function start() {
    phase = "countdown";
    countdownLeft = COUNTDOWN_SECS;
    currentIdx = 0;
    secondsLeft = MOVEMENT_SECS;
    completed = Array(movements.length).fill(false);

    clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (phase === "countdown") {
        countdownLeft -= 1;
        if (countdownLeft <= 0) {
          phase = "running";
          secondsLeft = MOVEMENT_SECS;
          playStart();
        }
      } else if (phase === "running") {
        secondsLeft -= 1;
        if (secondsLeft <= 0) {
          completed[currentIdx] = true;
          playBell();
          currentIdx += 1;
          if (currentIdx >= movements.length) {
            phase = "done";
            clearInterval(intervalId);
          } else {
            secondsLeft = MOVEMENT_SECS;
          }
        }
      }
    }, 1000);
  }

  function reset() {
    clearInterval(intervalId);
    phase = "idle";
    countdownLeft = COUNTDOWN_SECS;
    secondsLeft = MOVEMENT_SECS;
    currentIdx = 0;
    completed = [];
  }

  let progressPercent = $derived(
    phase === "running" ? Math.round(((MOVEMENT_SECS - secondsLeft) / MOVEMENT_SECS) * 100) : 0
  );
</script>

<div class="not-prose font-sans flex flex-col gap-3">

  <!-- Central timer -->
  <div class="flex flex-col items-center justify-center py-4 min-h-[7rem]">
    {#if phase === "idle"}
      <button
        onclick={start}
        class="px-10 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold text-xl shadow-md transition-colors"
      >
        Go 🐉
      </button>
      <p class="text-gray-400 text-xs mt-2">5 sec countdown · 1 min per animal</p>

    {:else if phase === "countdown"}
      <div class="text-7xl font-bold tabular-nums text-green-400 leading-none">{countdownLeft}</div>
      <div class="text-gray-400 text-xs mt-2 tracking-widest uppercase">get ready</div>
      <button onclick={reset} class="text-gray-300 text-xs mt-3 hover:text-gray-500 underline">cancel</button>

    {:else if phase === "running"}
      <div class="text-7xl font-bold tabular-nums text-gray-800 leading-none">{secondsLeft}</div>
      <div class="text-gray-400 text-xs mt-2 tracking-widest uppercase">
        {movements[currentIdx].name} · {currentIdx + 1} / {movements.length}
      </div>
      <div class="w-40 h-1 rounded-full bg-gray-200 mt-3 overflow-hidden">
        <div
          class="h-full rounded-full bg-green-400 transition-all duration-1000"
          style="width: {progressPercent}%"
        ></div>
      </div>
      <button onclick={reset} class="text-gray-300 text-xs mt-3 hover:text-gray-500 underline">reset</button>

    {:else if phase === "done"}
      <div class="text-4xl mb-1">🌿</div>
      <div class="font-medium text-gray-600">Have a great day.</div>
      <button
        onclick={start}
        class="mt-3 px-10 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold text-xl shadow-md transition-colors"
      >
        Again
      </button>
    {/if}
  </div>

  <!-- Movement tiles -->
  <div class="flex flex-col gap-1.5">
    {#each movements as movement, i}
      {@const isDone = completed[i] === true}
      {@const isActive = phase === "running" && currentIdx === i}
      <div
        class="rounded-lg px-3 py-2 transition-all duration-500 border"
        style="
          background-color: {isDone ? '#bbf7d0' : isActive ? '#f0fdf4' : '#f3f4f6'};
          border-color: {isDone ? '#4ade80' : isActive ? '#86efac' : '#e5e7eb'};
        "
      >
        <div class="flex items-start gap-2.5">
          <span class="text-lg leading-tight mt-0.5">{movement.emoji}</span>
          <div class="flex-1 min-w-0">
            <div class="flex items-baseline gap-1.5">
              <span class="font-semibold text-gray-800 text-xs">{movement.name}</span>
              <span class="text-gray-400 text-xs">{movement.chinese}</span>
              <span class="text-gray-400 text-xs ml-auto">{movement.element}</span>
            </div>
            {#if isActive}
              <div class="text-gray-500 text-xs mt-1 leading-relaxed">{movement.cue}</div>
            {/if}
          </div>
          <div class="flex-shrink-0 ml-1 self-center">
            {#if isDone}
              <span class="text-green-500 font-bold text-sm">✓</span>
            {:else if !isActive}
              <span class="text-gray-300 text-sm">○</span>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>

</div>
