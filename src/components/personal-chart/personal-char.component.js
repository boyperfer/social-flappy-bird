/* App.js */
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import CanvasJSReact from '@canvasjs/react-charts';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {checkUserSession} from '../../redux/user/user.actions';
import {ChartContainer} from './personal-chart.styles';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PersonalChart = () => {
	const [dataPoints, setDataPoints] = useState([]);
	const currentUser = useSelector(selectCurrentUser);
	const dispatch = useDispatch();
	console.log(currentUser);

	useEffect(() => {
		dispatch(checkUserSession());
		const points = currentUser.score.map((score, i) => ({
			x: Number.parseInt(i, 10),
			y: score,
		}));
		setDataPoints(points);
	}, []); // The empty array makes this effect run only once, similar to componentDidMount

	const options = {
		theme: 'light2',
		title: {
		  text: 'Personal score',
		},
		responsive: true,
		axisX: {
			title: 'Attemps', // Label for the y-axis
			minimum: 0,
			interval: 1,
			ticks: {
				beginAtZero: true,
				  callback(value) {
					if (value % 1 === 0) {
						return value;
					}
				},
				precision: 0,
			},
		},
		data: [{
			type: 'line',
			dataPoints,
		}],
	};

	return (
		<ChartContainer>
			<CanvasJSChart options={options} />
			{/* The chart will automatically re-render when dataPoints state changes */}
		</ChartContainer>
	);
};

export default PersonalChart;
