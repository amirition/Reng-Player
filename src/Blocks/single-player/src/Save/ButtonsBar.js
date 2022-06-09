import Speed from './Speed';
import FastSeek from './FastSeek';
import PlayButton from './PlayButton';

export default function ButtonsBar( props ) {
	return(
		<div className="buttons-bar" style={{backgroundColor: props.backgroundColor }}>
			<Speed />
			<FastSeek />
			<PlayButton />
		</div>
	)
}
