<template>
	<div id="overlay">
		<circle-progress
			id="progress"
			:percent="props.percent"
			:size="100"
			unit="%"
			:border-width="5"
			:border-bg-width="10"
			:show-percent="true"
		/>
	</div>
</template>
<script>
import 'vue3-circle-progress/dist/circle-progress.css';
import CircleProgress from 'vue3-circle-progress';
export default {
	name: 'LoadingSearch',
	components: {
		CircleProgress,
	},
	props: [{ percent: 0 }],
};
</script>

<style scoped>
#overlay {
	position: fixed; /* Sit on top of the page content */
	display: none; /* Hidden by default */
	width: 100%; /* Full width (cover the whole page) */
	height: 100%; /* Full height (cover the whole page) */
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(39, 39, 39, 0.5); /* Black background with opacity */
	z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
	cursor: pointer; /* Add a pointer on hover */
}
</style>
