const supported = {
	values: {
		ignore: [
			'initial',
			'inherit',
			'unset',
			'revert',
			'revert-layer',
			'none', // outline-offset can be set to none
			// Currently the DST opinion is that 0 is valid.
			0,
			'0',
			'0px',
			'0em',
			'0rem',
		],
	},
};

export default supported;
