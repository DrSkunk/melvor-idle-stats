import pako from 'pako'
import { xpToLevel } from './xpToLevel'
import { skillList } from './skillNames'
import { calculateCombatLevel } from './combatLevel'

export function parseSave(s) {
	const save = JSON.parse(
		pako.ungzip(
			Uint8Array.from(atob(s), (c) => c.charCodeAt(0)),
			{ to: 'string' }
		)
	)
	const name = JSON.parse(save.o[3])
	const xpList = save.s[7]
	const skillsStats = xpList.reduce((acc, xp, i) => {
		const skillName = skillList[i]
		acc[skillName] = {
			xp,
			level: Math.min(xpToLevel(xp), 99),
			virtualLevel: xpToLevel(xp),
		}
		return acc
	}, {})
	const combatLevel = calculateCombatLevel(skillsStats)
	const totalLevel = skillList.reduce((acc, skillName) => {
		acc += skillsStats[skillName].level
		return acc
	}, 0)
	const stats = {
		skills: skillsStats,
		combatLevel,
		totalLevel,
		name,
	}
	console.log(stats)
	return stats
}
