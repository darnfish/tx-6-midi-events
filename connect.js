const noble = require('@abandonware/noble')

const eventMap = require('./events.json')

let peripheral

async function onStateChange(state) {
	if(state !== 'poweredOn')
		return

	await noble.startScanningAsync([], false)

	noble.removeListener('stateChange', this.onStateChange)
}

async function onPeripheralDiscover(_peripheral) {
	if(_peripheral.advertisement.localName !== 'TX-6')
		return

	peripheral = _peripheral

	await noble.stopScanningAsync()

	peripheral.addListener('connect', onPeripheralConnect)
	peripheral.addListener('disconnect', onPeripheralDisconnect)

	await peripheral.connectAsync()
}

async function onPeripheralConnect() {
	console.log('peripheral.uuid', peripheral.uuid)
	const { services } = await peripheral.discoverAllServicesAndCharacteristicsAsync()
	for(const service of services) {
		console.log('service.uuid', service.uuid, service.name)
		if(service.uuid !== '03b80e5aede84b33a7516ce34ec4c700')
			continue

		console.log('got midi service')

		for(const characteristic of service.characteristics) {
			if(characteristic.uuid !== '7772e5db38684112a1a9f2669d106bf3')
				continue

			console.log('got midi characteristic')

			console.log('characteristic.uuid', characteristic.uuid, characteristic.name)

			await characteristic.notifyAsync(true)

			characteristic.addListener('data', data => {
				const header = data[0]
				const timestamp = data[1]
				const midiStatus = data[2]
				const midiEvent = data.readUIntBE(3, 2)

				console.log(eventMap[midiEvent])
			})
		}
	}
}

async function onPeripheralDisconnect() {
	
}

async function main() {
	if(noble.state === 'poweredOn')
		await noble.startScanningAsync([], false)
	else
		noble.on('stateChange', onStateChange)

	noble.on('discover', onPeripheralDiscover)
}

main()
