<template>
	<!--标签云-->
	<div class="ui segments m-box">
		<div class="ui secondary segment"><i class="tags icon"></i>标签云</div>
		<div class="ui yellow segment m-padding-small">
			<router-link :to="`/tag/${tag.name}`" class="ui label m-text-500 teal" v-for="(tag,index) in tagList" :key="index">
				{{ tag.name }}
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Tags",
		props: {
			tagList: {
				type: Array,
				required: true
			},
		},
	}
</script>

<style scoped>
	.secondary.segment {
		padding: 10px;
	}

	.m-padding-small {
		padding: 7px;
	}

	.label {
		margin: 3px !important;
	}

	.m-box{
		    margin: 0 0 15px !important
	}
</style>