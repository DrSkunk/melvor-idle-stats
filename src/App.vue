<template>
	<div>
		<div
			v-if="error"
			class="absolute inset-0 bg-slate-500/50 backdrop-blur flex items-center justify-center"
		>
			<div
				class="bg-gray-100 border shadow p-4 inline-flex flex-col gap-4"
			>
				<span class="text-red-600">Error while parsing savefile</span>
				<button
					class="px-4 py-2 border hover:bg-slate-100"
					@click="error = null"
				>
					Close
				</button>
			</div>
		</div>
		<div class="flex items-center justify-center p-4">
			<div class="flex flex-col justify-center gap-2">
				<textarea
					placeholder="Paste your exported save here"
					ref="saveInput"
				></textarea>

				<button
					class="bg-slate-200 px-4 py-2 hover:ring"
					@click="drawStats"
				>
					Draw stats
				</button>
				<a
					v-show:if="hasImage"
					class="border-2 bg-slate-200 px-4 py-2 text-center hover:ring cursor-pointer disabled:bg-white"
					@click="openImageInTab"
					ref="newTabLink"
					target="_blank"
					rel="noopener noreferrer"
					>Open image in new tab
				</a>
				<a
					v-show:if="hasImage"
					class="border-2 bg-slate-200 px-4 py-2 text-center hover:ring cursor-pointer"
					@click="downloadImage"
					ref="downloadLink"
					download="stats.png"
				>
					Download image
				</a>
				<canvas
					ref="canvas"
					class="border"
					width="340"
					height="500"
				></canvas>
				<footer
					class="p-2 mt-4 flex flex-col gap-1 items-center text-slate-700 bg-slate-100"
				>
					<a
						class="hover:underline"
						href="https://sebastiaanjansen.be"
						target="_blank"
						rel="noopener noreferrer"
						>Made with ❤️ by DrSkunk</a
					>
					<a
						class="hover:underline"
						href="https://github.com/DrSkunk/melvor-stats"
						>Source code</a
					>
				</footer>
			</div>
		</div>
	</div>
</template>

<script>
import { parseSave } from './lib/parseSave'
import { drawStats } from './lib/drawStats'

export default {
	mounted() {
		const input = new URLSearchParams(window.location.search).get('input')
		if (input) {
			this.$refs.saveInput.value = input
			this.drawStats()
		}
	},
	data() {
		return {
			hasImage: false,
			error: false,
		}
	},
	methods: {
		async drawStats() {
			const saveInput = this.$refs.saveInput.value
			try {
				const stats = parseSave(saveInput)
				const ctx = this.$refs.canvas.getContext('2d')
				const width = this.$refs.canvas.width
				const height = this.$refs.canvas.height
				await drawStats(ctx, width, height, stats)
				this.hasImage = true
			} catch (error) {
				this.error = true
			}
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
