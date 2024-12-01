<template>
	<div class="image-slider">
		<img
			v-for="(image, index) in images"
			:key="index"
			:src="image"
			:class="['slider-image', { 'fade-out': index === topIndex }]"
			:style="{ zIndex: getZIndex(index) }"
			alt="Slideshow Image"
		/>
	</div>
</template>

<script>
export default {
	data() {
		return {
			images: [
				'https://via.placeholder.com/600x400?text=Image+1',
				'https://via.placeholder.com/600x400?text=Image+2',
				'https://via.placeholder.com/600x400?text=Image+3',
			],
			topIndex: 0,
		}
	},
	methods: {
		getZIndex(index) {
			const offset = index - this.topIndex
			return offset >= 0 ? this.images.length - offset : -offset
		},
		startSlideShow() {
			setInterval(() => {
				this.topIndex = (this.topIndex + 1) % this.images.length
			}, 3000)
		},
	},
	mounted() {
		this.startSlideShow()
	},
}
</script>

<style scoped>
.image-slider {
	position: relative;
	/* width: 600px; */
	/* height: 400px; */
	overflow: hidden;

	/* max-width: 400px; */
	/* width: 600px; */
	/* max-width: 80%; */
	/* max-width: 100%; */
	width: 100%;
	display: block;
	aspect-ratio: 10 / 7;
	/* height: 500px; */
	/* max-height: 100%; */
	position: relative;
	border-radius: 0.4em;
	background-color: #222;
}

.slider-image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	opacity: 1;
	transition: opacity 1s ease-in-out;
}

.fade-out {
	opacity: 0;
}
</style>
