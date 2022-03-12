<template>
	<div>
		<div class="flex align-middle justify-center">
			<div class="flex flex-col justify-center">
				<textarea ref="saveInput"></textarea>
				<canvas
					ref="canvas"
					class="border"
					width="340"
					height="500"
				></canvas>
				<button
					class="border-2 bg-slate-200 px-4 py-2"
					@click="drawStats"
				>
					Draw stats
				</button>
				<a
					class="border-2 bg-slate-200 px-4 py-2"
					@click="openImageInTab"
					ref="newTabLink"
					target="_blank"
					rel="noopener noreferrer"
				>
					Open image in new tab
				</a>
				<a
					class="border-2 bg-slate-200 px-4 py-2"
					@click="downloadImage"
					ref="downloadLink"
					download="stats.png"
				>
					Download image
				</a>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { parseSave } from './lib/parseSave'
import { drawStats } from './lib/drawStats'

export default {
	setup() {
		const canvas = ref(null)
		const newTabLink = ref(null)
		const downloadLink = ref(null)
		return {
			canvas,
			newTabLink,
			downloadLink,
		}
	},
	methods: {
		async drawStats() {
			const saveInput = this.$refs.saveInput.value
			console.log(saveInput)
			const stats = parseSave(saveInput)
			const ctx = this.$refs.canvas.getContext('2d')
			const width = this.$refs.canvas.width
			const height = this.$refs.canvas.height
			await drawStats(ctx, width, height, stats)
		},
		downloadImage() {
			this.$refs.downloadLink.href =
				this.$refs.canvas.toDataURL('image/png')
		},
		openImageInTab() {
			this.$refs.newTabLink.href =
				this.$refs.canvas.toDataURL('image/png')
		},
	},
}
</script>
