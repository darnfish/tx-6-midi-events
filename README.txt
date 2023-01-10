This repository includes decoded MIDI event signals for teenage engineering TX-6.

Use events.json to map the incoming MIDI event to appropriate event and metadata.

events.json file is built by build.js, which uses parameters.json to create the complete map.

You can use connect.js to connect to your TX-6 (once it is in BLE ACCEPT and MIDI OUT mode), and log recieved events.

Available Events and Metadata:
* input1.slider - { progress: 0 - 1 }
* input2.slider - { progress: 0 - 1 }
* input3.slider - { progress: 0 - 1 }
* input4.slider - { progress: 0 - 1 }
* input5.slider - { progress: 0 - 1 }
* input6.slider - { progress: 0 - 1 }
* input1.eq1 - { progress: 0 - 1 }
* input2.eq1 - { progress: 0 - 1 }
* input3.eq1 - { progress: 0 - 1 }
* input4.eq1 - { progress: 0 - 1 }
* input5.eq1 - { progress: 0 - 1 }
* input6.eq1 - { progress: 0 - 1 }
* input1.eq2 - { progress: 0 - 1 }
* input2.eq2 - { progress: 0 - 1 }
* input3.eq2 - { progress: 0 - 1 }
* input4.eq2 - { progress: 0 - 1 }
* input5.eq2 - { progress: 0 - 1 }
* input6.eq2 - { progress: 0 - 1 }
* input1.eq3 - { progress: 0 - 1 }
* input2.eq3 - { progress: 0 - 1 }
* input3.eq3 - { progress: 0 - 1 }
* input4.eq3 - { progress: 0 - 1 }
* input5.eq3 - { progress: 0 - 1 }
* input6.eq3 - { progress: 0 - 1 }
* input1.button - { pressed: true | false }
* input2.button - { pressed: true | false }
* input3.button - { pressed: true | false }
* input4.button - { pressed: true | false }
* input5.button - { pressed: true | false }
* input6.button - { pressed: true | false }
* select.encoder - { direction: left | right }
* select.button - { pressed: true | false }
* fx1 - { pressed: true | false }
* fx2 - { pressed: true | false }
* shift - { pressed: true | false }
* aux - { pressed: true | false }
* cue - { pressed: true | false }
