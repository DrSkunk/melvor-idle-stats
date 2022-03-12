import { skillNames } from './skillNames'

function getIcon(name) {
	return new Promise((resolve) => {
		const image = new Image()
		image.onload = () => resolve(image)
		image.src = `/static/img/icons/${name}.png`
	})
}

const drawOrder = [
	[
		skillNames.attack,
		skillNames.strength,
		skillNames.defence,
		skillNames.ranged,
		skillNames.prayer,
		skillNames.magic,
		skillNames.runecrafting,
	],

	[
		skillNames.hitpoints,
		skillNames.agility,
		skillNames.herblore,
		skillNames.thieving,
		skillNames.crafting,
		skillNames.fletching,
		skillNames.slayer,
		// skillNames.hunter,
		// skillNames.divination,
		skillNames.astrology,
	],
	[
		skillNames.mining,
		skillNames.smithing,
		skillNames.fishing,
		skillNames.cooking,
		skillNames.firemaking,
		skillNames.woodcutting,
		skillNames.farming,
		skillNames.summoning,
	],
]

export async function drawStats(ctx, width, height, stats) {
	// Clear canvas
	ctx.clearRect(0, 0, width, height)

	// Draw background with top border
	const backgroundMargin = 10
	const backgroundPadding = 10
	ctx.fillStyle = '#BCC0C0'
	roundRect(
		ctx,
		backgroundMargin,
		backgroundMargin,
		width - 2 * backgroundMargin,
		height - 2 * backgroundMargin,
		10
	)
	ctx.fill()

	ctx.shadowColor = 'black'
	ctx.shadowBlur = 8
	ctx.shadowOffsetX = 2
	ctx.shadowOffsetY = 2
	ctx.fillStyle = '#2C343F'
	// ctx.fillRect(padding, padding, width - 2 * padding, height - 2 * padding)
	bgRect(
		ctx,
		backgroundMargin,
		backgroundMargin + backgroundPadding,
		width - 2 * backgroundMargin,
		height - 2 * backgroundMargin - backgroundPadding,
		10
	)
	ctx.fill()
	ctx.shadowColor = 'transparent'
	ctx.shadowOffsetX = 0
	ctx.shadowOffsetY = 0
	ctx.shadowBlur = 0

	// Draw character name
	const topBarHeight = 40
	ctx.fillStyle = 'rgb(245, 245, 245)'
	ctx.font = '28px Inter'
	ctx.textAlign = 'center'
	ctx.fillText(
		stats.name,
		width / 2,
		backgroundMargin + backgroundPadding + topBarHeight - 10
	)

	// Draw icons
	const iconSize = 40
	const iconMargin = 10
	const textPadding = 46
	for (let columnIndex = 0; columnIndex < drawOrder.length; columnIndex++) {
		const column = drawOrder[columnIndex]
		console.log(column)
		for (let skillIndex = 0; skillIndex < column.length; skillIndex++) {
			const skill = column[skillIndex]
			console.log(skill)
			const icon = await getIcon(skill)
			console.log(icon)
			const x =
				backgroundMargin +
				iconMargin +
				columnIndex * (iconSize + iconMargin) +
				columnIndex * textPadding
			const y =
				backgroundMargin +
				backgroundPadding +
				topBarHeight +
				iconMargin +
				skillIndex * (iconSize + iconMargin)
			console.log(y)
			ctx.textAlign = 'start'
			ctx.drawImage(icon, x, y, iconSize, iconSize)
			ctx.fillStyle = 'rgb(245, 245, 245)'
			ctx.font = '20px Inter'
			ctx.fillText(stats.skills[skill].level, x + 50, y + 25)
		}
	}
	// ctx.drawImage(await getIcon('woodcutting'), 0, 0, 50, 50)
}

function bgRect(ctx, x, y, width, height, radius) {
	if (width < 2 * radius) radius = width / 2
	if (height < 2 * radius) radius = height / 2
	ctx.beginPath()
	ctx.moveTo(x, y)
	ctx.lineTo(x + width, y, x + width, y + height)
	ctx.arcTo(x + width, y + height, x, y + height, radius)
	ctx.arcTo(x, y + height, x, y, radius)
	ctx.lineTo(x, y, x + width, y)
	ctx.closePath()
}

// Source: https://codepen.io/simon-wu/pen/ExgLEXQ
function roundRect(ctx, x, y, width, height, radius) {
	if (width < 2 * radius) radius = width / 2
	if (height < 2 * radius) radius = height / 2
	ctx.beginPath()
	ctx.moveTo(x + radius, y)
	ctx.arcTo(x + width, y, x + width, y + height, radius)
	ctx.arcTo(x + width, y + height, x, y + height, radius)
	ctx.arcTo(x, y + height, x, y, radius)
	ctx.arcTo(x, y, x + width, y, radius)
	ctx.closePath()
}

// rgb(245, 245, 245)
