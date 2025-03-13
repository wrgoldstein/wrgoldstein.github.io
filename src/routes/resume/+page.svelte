<script>
	import ColorfulBorder from '$lib/components/ColorfulBorder.svelte';
	import { innerWidth, innerHeight } from 'svelte/reactivity/window';

	const companies = [
		{
			name: 'self-employed',
			roles: [{ period: '2024-Present', title: 'Consultant', focus: "data" }],
		},
		{
			name: 'twirldata.com',
			roles: [{ period: '2023-2024', title: 'Growth Lead', focus: "growth" }],
		},
		{
			name: 'fairing.co',
			roles: [{ period: '2022-2023', title: 'Senior Software Engineer', focus: "software" }],
		},
		{
			name: 'better.com',
			roles: [
				{ period: '2020-2021', title: 'Senior Software Engineer', focus: "data" },
				{ period: '2021-2022', title: 'Team Lead, Data Platform', focus: "data" }
			],
		},
		{
			degree: 'MBA',
			institution: 'Yale School of Management',
			roles: [{ period: '2018-2020', title: 'Student', focus: "school" }],
		},
		{
			name: 'artsy.net',
			roles: [
				{ period: '2014-2015', title: 'Data Analyst', focus: "data" },
				{ period: '2015-2016', title: 'Software Engineer', focus: "software" },
				{ period: '2016-2018', title: 'Analytics Lead', focus: "data" }
			],
		},
		{
			name: 'howaboutwe.com',
			roles: [{ period: '2013-2014', title: 'Data Scientist', focus: "data" }],
		},
		{
			degree: 'MS, Data Science',
			institution: 'University of San Francisco',
			roles: [{ period: '2012-2013', title: 'Student', focus: "school" }],
		},
		{
			name: 'Cottonwood Ranch',
			roles: [{ period: '2011-2012', title: 'Ranch Hand & Cowboy', focus: "ranching" }],
		},
		{
			degree: 'BA, Mathematics',
			institution: 'Macalester College',
			roles: [{ period: '2007-2011', title: 'Student', focus: "school" }],
		}
	]

	const focusColors = {
		school: 'bg-purple-300',
		data: 'bg-orange-300',
		ranching: 'bg-red-300',
		software: 'bg-blue-300',
		growth: 'bg-green-300'
	}

	const education = [];

	const expertise = [
		{
			category: 'Data',
			skills: ['Statistical Inference', 'Data Visualization', 'Machine Learning']
		},
		{
			category: 'Engineering',
			skills: ['Data Infrastructure', 'Database Internals', 'DevOps', 'Systems']
		},
		{ category: 'Development', skills: ['Front-end', 'Software Architecture'] },
		{ category: 'Leadership', skills: ['Team Management', 'Growth Strategy', 'Marketing'] }
	];

	const years = $derived(
		Array.from({ length: new Date().getFullYear() - 2006 }, (_, i) => 2007 + i)
	)

	const widthMultiplier = $derived(
		innerWidth.current / 400
	)

	const yearsWithLabels = $derived(
		innerWidth.current > 1000 ? years
		: innerWidth.current > 800 ? years.filter(year => year % 2 === 0)
		: years.filter(year => year % 5 === 0)
	)

	let hovered = $state(null);
	let clicked = $state(false);

	function customStringify(obj) {
		if (!obj) return '';
		
		const json = JSON.stringify(obj, null, 2);
		
		// Replace specific values with styled spans
		return json
		.replace(/"focus":\s*"([^"]+)"/g, function(match, capturedValue) {
			const color = focusColors[capturedValue].replace('300', '200')
			return `"focus": <span class="${color}">"${capturedValue}"</span>`;
		});
	}
</script>



<section class="p-8">
	<header class="mb-8">
		<nav class="mb-6">
			<a href="/" class="text-gray-500 hover:text-gray-700">← Back</a>
		</nav>
		<h1 class="">Resume</h1>
	</header>
	<div class="mx-auto font-sans mt-12">
		<!-- Experience Gantt Chart -->
		<section class="mb-12">
			<!-- <svg class="w-full h-72 border-black border-2"> -->
			 <div style="margin-left: {widthMultiplier}rem;" class="flex w-fit">
					{#each years as year}
						<div class="year" style="width: {widthMultiplier}rem;">
							{#if yearsWithLabels.includes(year)}
								<div data-label={year}></div>
							{/if}
						</div>
					{/each}
			</div>
			{#each companies.reverse() as company, i}
				{@const lastYearOfPreviousCompany =
					companies[i - 1]?.roles[companies[i - 1].roles.length - 1].period.split('-')[1] || '2007'}
				{@const yearOffset = lastYearOfPreviousCompany - 2006}
				<div style="margin-left: {widthMultiplier * yearOffset}rem;" class="flex">
					{#each company.roles as role, j}
						{@const yearStart = +role.period.split('-')[0]}
						{@const yearEndDirty = role.period.split('-')[1]}
						{@const yearEnd = yearEndDirty === 'Present' ? new Date().getFullYear() : +yearEndDirty}
						<div
							onmouseenter={() => (hovered = company.name || company.institution)}
							onmouseleave={() => (hovered = null)}
							onclick={() => (clicked = company.name || company.institution)}
							style="width: {widthMultiplier * (yearEnd - yearStart)}rem;"
							class="hover:cursor-pointer transition-all duration-300 {focusColors[role.focus]} {j === 0 ? 'rounded-l' : ''} {j === company.roles.length - 1 ? 'rounded-r' : ''} h-6 text-xs"
						>
						</div>
					{/each}
				</div>
			{/each}

			<div class="legend ml-8 mt-[-5rem]">
				{#each Object.entries(focusColors) as [focus, color]}
					<div class="flex items-center">
						<div class="w-4 h-4 {color}"></div>
						<span class="ml-2">{focus}</span>
					</div>
				{/each}
			</div>
			
			<div class="json-container ml-8 mt-8">
				{#snippet content(hovered)}
					{@const content = customStringify(companies.find(c => c.name === hovered || c.institution === hovered), null, 2)}
					<pre style="font-size: 0.75rem;">{@html content}</pre>
				{/snippet}

				{#if clicked || hovered}
					{@const c = hovered || clicked}
					<div class="w-96 ml-4">
						<pre>{c}</pre>
						{@render content(c)}
					</div>
				{/if}
			</div>
		</section>
	</div>
</section>

<style>
	.year > div {
		position: relative
	}

	.year > div::before {
		content: attr(data-label);
		position: absolute;
		top: -40px;
		left: 0;
		font-size: 0.75rem;
		white-space: nowrap;
		transform: translateX(-50%);
	}
	[data-label]::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 0;
		width: 1px;
		height: 10px;
		background-color: #000;
		transform: translateY(-150%);
	}
</style>