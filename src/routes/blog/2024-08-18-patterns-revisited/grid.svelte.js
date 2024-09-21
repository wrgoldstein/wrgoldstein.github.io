export function createGrid(size) {
	const initial = []

	for (let i of Array(size).keys()){
		initial.push(Array(size).keys().map(_ => 0))
	}

	let value = $state(initial);

	function get(){
		return value
	}

	function set(x, y, v) {
		console.log(value)
		let row = value[x]
		row[y] = v
		value[x] = row
	}

	return {
		get,
		set,
	}
}
