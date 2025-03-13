<script>
	import ColorfulBorder from '$lib/components/ColorfulBorder.svelte';

	const companies = [
		{
			name: 'self-employed',
			roles: [{ period: '2024-Present', title: 'Consultant' }],
		},
		{
			name: 'twirldata.com',
			roles: [{ period: '2023-2024', title: 'Growth Lead' }],
		},
		{
			name: 'fairing.co',
			roles: [{ period: '2022-2023', title: 'Senior Software Engineer' }],
		},
		{
			name: 'better.com',
			roles: [
				{ period: '2020-2021', title: 'Senior Software Engineer' },
				{ period: '2021-2022', title: 'Team Lead, Data Platform' }
			],
		},
		{
			degree: 'MBA',
			institution: 'Yale School of Management',
			roles: [{ period: '2018-2020', title: 'Student' }],
		},
		{
			name: 'artsy.net',
			roles: [
				{ period: '2014-2015', title: 'Data Analyst' },
				{ period: '2015-2016', title: 'Software Engineer' },
				{ period: '2016-2018', title: 'Analytics Lead' }
			],
		},
		{
			name: 'howaboutwe.com',
			roles: [{ period: '2013-2014', title: 'Data Scientist' }],
		},
		{
			degree: 'MS, Data Science',
			institution: 'University of San Francisco',
			roles: [{ period: '2011-2013', title: 'Student' }],
		},
		{
			degree: 'BA, Mathematics',
			institution: 'Macalester College',
			roles: [{ period: '2007-2011', title: 'Student' }],
		}
	];

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


	const widthMultiplier = 1.5;

	let hovered = $state(null);
</script>



<section class="p-8">
	<header class="mb-8">
		<nav class="mb-6">
			<a href="/" class="text-gray-500 hover:text-gray-700">← Back</a>
		</nav>
		<h1 class="">Resume</h1>
	</header>
	<div class="max-w-5xl mx-auto font-sans">
		<!-- Experience Gantt Chart -->
		<section class="mb-12">
			<!-- <svg class="w-full h-72 border-black border-2"> -->
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
							style="width: {widthMultiplier * (yearEnd - yearStart)}rem;"
							class="transition-all duration-300 bg-gray-300 {j === 0 ? 'rounded-l' : ''} {j === company.roles.length - 1 ? 'rounded-r' : ''} h-6 text-xs"
						>
						</div>
					{/each}
				</div>
			{/each}
			
			{#if hovered}
				<div class="">
					<pre>
						{hovered}
					</pre>
					<pre style="font-size: 0.75rem;">
						{JSON.stringify(companies.find(c => c.name === hovered || c.institution === hovered), null, 2)}
					</pre>
				</div>
			{/if}

		</section>
	</div>
</section>