<script>
	import ColorfulBorder from "$lib/components/ColorfulBorder.svelte";
	const projects = [
		{
			company: 'artsy',
			type: 'data engineering',
			short: 'Set up data infrastructure with Segment, Redshift, and Looker'
		},
		{
			company: 'artsy',
			type: 'software engineering',
			short: 'Filtered search with Elasticsearch'
		},
		{
			company: 'artsy',
			type: 'management',
			short: 'Managed four analysts'
		},
		{
			company: 'artsy',
			type: 'machine learning',
			short: 'Saved 50 hours/week with ML / automation'
		},
		{
			company: 'howaboutwe',
			type: 'data science',
			short: 'built churn prediction models'
		},
		{
			company: 'better',
			type: 'design',
			short: 'Built Jupyter-based knowledge sharing platform'
		},
		{
			company: 'better',
			type: 'data engineering',
			short: 'Set up Airflow'
		}
	];
</script>

<ColorfulBorder>
	<div class="flex">
		<div class="space-y-8">
			<a class="underline hover:font-bold" href="/">back</a>
			<div>data engineering</div>
			<div>front end development</div>
			<div>backend/systems engineering</div>
			<div>team lead / manager</div>
			<div>design</div>
			<div>cartoons / illustration</div>
		</div>
		<svg class='flex w-full h-full flex-grow' height="100%">
			<path d="M100,300 L100,0" stroke="brown" stroke-width="70"></path>
		</svg>
	</div>
</ColorfulBorder>
