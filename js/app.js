const decoded = document.getElementById("decoded")
const encoded = document.getElementById("encoded")

function decodedBoxUpdate(value) {
	let splitted = splitString(value);
	encoded.value = "";
	for (let i = 0; i < splitted.length; i++) {
		encoded.value += pairing(splitted[i]);
	}
}

function encodedBoxUpdate(value) {
	decoded.value = "";
	for (let i = 0; i < value.length; i++) {
		let val = value[i];
		let pair = depairing(val);
		decoded.value += pair[0];
		if (pair[1] !== "\u0000") {
			decoded.value += pair[1];
		}
	}
}



function splitString(string) {
	const result = [];
	for (let i = 0; i < string.length; i += 2) {
		result.push(string.slice(i, i + 2));
	}
	return result;
}

function depairing(char) {
	let z = char.codePointAt(0);
	let w = Math.floor((Math.sqrt(8 * z + 1) - 1) / 2);
	let t = (w * w + w) / 2;
	let y = z - t;
	let x = w - y;
	return String.fromCodePoint(x, y);

}

function pairing(str) {
	let aC = str[0];
	let bC = str[1];
	if (bC === undefined) {
		bC = "\u0000"
	}

	// f(m, n) = (m + n)(m + n + 1) / 2 + n
	let a = aC.codePointAt(0);
	let b = bC.codePointAt(0);

	let prod = (a + b) * (a + b + 1);
	return String.fromCodePoint(prod/2 + b)

}

const acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
	acc[i].addEventListener("click", function() {
		console.log("it happened!")
		this.classList.toggle("active");
		let panel = this.nextElementSibling;
		if (panel.style.maxHeight) {
			panel.style.maxHeight = null;
		} else {
			panel.style.maxHeight = panel.scrollHeight + "px";
		}
	});
}
