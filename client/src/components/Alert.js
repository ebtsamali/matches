import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../styles/alert.scss';

function AlertMessage (props) {
	const [show, setShow] = useState(true);
	const { message, style } = props;

	if (show) {
		return (
			<Alert 
				variant={style === 'success'? 'success' : 'danger'}
				onClose={() => setShow(false)} dismissible
				id='alert'
			>
				{message}
			</Alert>
		);
	}
	return <div></div>
}

Alert.propTypes = {
	message: PropTypes.string,
	style: PropTypes.string
}

export default AlertMessage;