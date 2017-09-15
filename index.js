const Gpio = require("onoff").Gpio;
const io = require('socket.io')(8080, {
	path: '/interface'
});

const createButton = function (pin, name) {

	const button = new Gpio(pin, 'in', 'both');
	let lastValue = 0;
	button.watch(function (err, value) {
		if (lastValue !== value) {
		lastValue = value;
		const message = {
			[name]: value
		};
		io.emit('button', message)
    		console.log(`Button on pin ${pin}`, value, message)

}
})

	return button;

}


const button1 = createButton(18, 'button1');
const button2 = createButton(17, 'button2');

