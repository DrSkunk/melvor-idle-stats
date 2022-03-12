import { skillNames } from './skillNames'

// Source https://wiki.melvoridle.com/w/Combat
export function calculateCombatLevel(skillsStats) {
	const baseCombatLevel =
		0.25 *
		(skillsStats[skillNames.defence].level +
			skillsStats[skillNames.hitpoints].level +
			0.5 * skillsStats[skillNames.prayer].level)

	const meleeCombatLevel =
		skillsStats[skillNames.attack].level +
		skillsStats[skillNames.strength].level
	const rangedCombatLevel = 1.5 * skillsStats[skillNames.ranged].level
	const magicCombatLevel = 1.5 * skillsStats[skillNames.magic].level

	const combatLevel = Math.floor(
		baseCombatLevel +
			0.325 *
				Math.max(meleeCombatLevel, rangedCombatLevel, magicCombatLevel)
	)

	return combatLevel
}
