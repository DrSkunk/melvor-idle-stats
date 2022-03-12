function equate(xp) {
	return Math.floor(xp + 300 * Math.pow(2, xp / 7))
}

function levelToXP(level) {
	let xp = 0

	for (var i = 1; i < level; i++) xp += equate(i)

	return Math.floor(xp / 4)
}

export function xpToLevel(xp) {
	if (xp === 0) {
		return 1
	}
	let level = 1

	while (levelToXP(level) < xp) level++

	return level - 1
}
