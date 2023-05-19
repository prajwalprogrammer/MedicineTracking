import { useState } from 'react';
import QRCode from 'react-qr-code';
const kk={
	"red" :"#f44336",
	"pink": "#e91e63",
	"purple": "#9c27b0",
	"deeppurple": "#673ab7",
	"indigo": "#3f51b5",
	"blue": "#2196f3",
	"lightblue": "#03a9f4",
	"cyan": "#00bcd4",
	"teal": "#009688",
	"green": "#4caf50",
	"lightgreen": "#8bc34a",
	"lime": "#cddc39",
	"yellow": "#ffeb3b",
	"amber": "#ffc107",
	"orange": "#ff9800",
	"deeporange": "#ff5722",
	"brown": "#795548",
	"grey": "#9e9e9e",
	"black": "#000000",
	"white": "#ffffff",}
function QR() {
const [value, setValue] = useState(kk);
const [back, setBack] = useState('#FFFFFF');
const [fore, setFore] = useState('#000000');
const [size, setSize] = useState(256);

return (
	<div className="App">
	<center>
		<br />
		<br />
		<input
		type="text"
		onChange={(e) => setValue(e.target.value)}
		placeholder="Value of Qr-code"
		/>
		<br />
		<br />
		<input
		type="text"
		onChange={(e) => setBack(e.target.value)}
		placeholder="Background color"
		/>
		<br />
		<br />
		<input
		type="text"
		onChange={(e) => setFore(e.target.value)}
		placeholder="Foreground color"
		/>
		<br />
		<br />
		<input
		type="number"
		onChange={(e) => setSize(parseInt(e.target.value ===
						'' ? 0 : e.target.value, 10))}
		placeholder="Size of Qr-code"
		/>
		<br />
		<br />
		<br />
		
		<QRCode
			title="FakeMedicineDetection"
			value={value}
			bgColor={back}
			fgColor={fore}
			size={size === '' ? 0 : size}
		/>
	</center>
	</div>
);
}

export default QR;
