const Gpio = require("onoff").Gpio;
const io = require('socket.io')(8080, {
path: '/interface'
});

const createButton = function (pin) {

	const button = new Gpio(pin, 'in', 'both');
	let lastValue = 0;
	button.watch(function (err, value) {
		if (lastValue !== value) {
lastValue = value;
		io.emit('button', {
		'button1': value
		})
    		console.log(value)

}
})

	return button;

}


const button1 = createButton(18);

