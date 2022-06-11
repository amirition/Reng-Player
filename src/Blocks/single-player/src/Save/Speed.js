export default function Speed() {
	// TODO: make it better, delete the style when it's selected

	return (
		<select name="reng-speed" className="reng-speed">
			<option value=".5">.5x</option>
			<option value=".75">.75x</option>
			<option value="1" selected>1x</option>
			<option value="1.25">1.25x</option>
			<option value="1.5">1.5x</option>
			<option value="2">2x</option>
		</select>
	);
}
