<script>
  import { fade } from 'svelte/transition';
  import { Tween } from 'svelte/motion';
  export const { title, debits = [], credits = [], colorize = false, size='md', showTotal = false } = $props();

  const width = size === 'sm' ? 'w-32' : size === 'lg' ? 'w-96' : 'w-72';
  const text = size === 'sm' ? 'text-xs' : 'text-base';

  function getColor(entry, type) {
    if (!colorize) return '';
    const base = type === 'debit' ? 'bg-red-200' : 'bg-green-200';
    const alternate = type === 'debit' ? 'bg-green-200' : 'bg-red-200';
    if ((typeof entry === 'string' && entry.startsWith('-')) || (typeof entry === 'number' && entry < 0)) {
      return base;
    } else {
      return alternate;
    }
  }
  const numberRegex = /(\$?\d+(,\d+)?(\.\d+)?)/;
  const customParseFloat = (entry) => {
    if (typeof entry === 'number') return entry;
    const match = entry.match(numberRegex);
    if (match && match[1]) {
      return parseFloat(match[1].replace(/,/g, '').replace('$', ''));
    } else {
      return entry;
    }
  };
  const debitsAsNumbers = $derived(debits.map(customParseFloat));
  const creditsAsNumbers = $derived(credits.map(customParseFloat));

  const totalDebits = $derived(debitsAsNumbers.reduce((acc, entry) => {
    if (typeof entry === 'number') return acc + entry;
    return acc;
  }, 0))

  const totalCredits = $derived(creditsAsNumbers.reduce((acc, entry) => {
    if (typeof entry === 'number') return acc + entry;
    return acc;
  }, 0))

  let netTotal = $state(new Tween(0))

  $effect(() => {
    netTotal.target = totalDebits + totalCredits
  })
</script>

<div class="mt-4 border-2 border-black max-w-xs {width}">
  <div class="text-center border-b-2 border-black p-1 font-bold">
    {title}
  </div>
  <div class="flex h-[calc(100%-2.5rem)]">
    <div class="min-w-12 w-1/2 border-r-2 border-black p-2 flex flex-col gap-2 ">
      {#each debits as entry}
        <div transition:fade style="inline-size: fit-content;" class="{getColor(entry, 'debit')} {text} px-2 py-1 rounded-md">{entry}</div>
      {/each}
    </div>
    <div class="min-w-12 w-1/2 p-2 flex flex-col gap-2">
      {#each credits as entry}
        <div transition:fade style="inline-size: fit-content;" class={`${getColor(entry, 'credit')} ${text} px-2 py-1 rounded-md`}>{entry}</div>
      {/each}
    </div>
  </div>
  {#if showTotal}
    <div class="text-center p-2 font-bold {text}">Net Total: {Math.round(netTotal.current)}</div>
  {/if}
</div>
