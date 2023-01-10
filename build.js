const parameters = require('./parameters.json')

function mapButton(final, input, prefix) {
	if(typeof prefix === 'string')
		prefix = [prefix]

	final[input.pressed] = { event: prefix.join('.'), pressed: true }
	final[input.released] = { event: prefix.join('.'), pressed: false }
}

function createEventMap(parameters) {
	const final = {}

	// Channels
	for(let i = 0; i < 6; i++) {
		const no = i + 1
		const key = `input${no}`
		const input = parameters[key]

		// EQ Knobs
		for(let eq = 0; eq < 3; eq++) {
			const eqNo = eq + 1
			const eqKey = `eq${eqNo}`
			const eqDetails = input[eqKey]

			for(let step = eqDetails.start; step <= eqDetails.end; step++)
				final[step] = { event: [key, eqKey].join('.'), progress: (step - eqDetails.start) / 127 }
		}

		// Volume Slider
		for(let step = input.slider.end; step <= input.slider.start; step++)
			final[step] = { event: [key, 'slider'].join('.'), progress: (input.slider.start - step) / 127 }

		// Mute Button
		mapButton(final, input.button, [key, 'button'])
	}

	// Select Button
	mapButton(final, parameters.select.button, ['select', 'button'])
	// Select Encoder
	final[parameters.select.encoder.turnedLeft] = { event: ['select', 'encoder'].join('.'), direction: 'left' }
	final[parameters.select.encoder.turnedRight] = { event: ['select', 'encoder'].join('.'), direction: 'right' }

	// FX1
	mapButton(final, parameters.fx1, 'fx1')
	// FX2
	mapButton(final, parameters.fx2, 'fx2')
	// Shift
	mapButton(final, parameters.shift, 'shift')
	// Aux
	mapButton(final, parameters.aux, 'aux')
	// Cue
	mapButton(final, parameters.cue, 'cue')

	return final
}

const eventMap = createEventMap(parameters)
require('fs').writeFileSync('./events.json', JSON.stringify(eventMap, null, 2), 'utf8')

console.log(Array.from(new Set(Object.values(eventMap).map(e => e.event))).join('\n* '))