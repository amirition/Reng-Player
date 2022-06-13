export default function Speed( props ) {
	// TODO: make it better, delete the "when it's selected" style.
	const selectStyle = {
		background: 'none',
		color: props.color
	}
	const optionStyle = {
		backgroundColor: props.backgroundColor,
		color: props.color
	}
	return (
		<select style={selectStyle} name="reng-speed" className="reng-speed">
			<option style={optionStyle} value=".5">.5x</option>
			<option style={optionStyle} value=".75">.75x</option>
			<option style={optionStyle} value="1" selected>1x</option>
			<option style={optionStyle} value="1.25">1.25x</option>
			<option style={optionStyle} value="1.5">1.5x</option>
			<option style={optionStyle} value="2">2x</option>
		</select>
	);
}
