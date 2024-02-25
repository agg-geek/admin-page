import styled, { css } from 'styled-components';

const Form = styled.form`
	/*  different styling for props.type === 'regular' 
        and not modal are already given */
	${props =>
		props.type == 'regular' &&
		css`
			padding: 2.4rem 4rem;

			/* Box */
			background-color: var(--color-grey-0);
			border: 1px solid var(--color-grey-100);
			border-radius: var(--border-radius-md);
		`}

	${props =>
		props.type === 'modal' &&
		css`
			width: 80rem;
		`}
    
  overflow: hidden;
	font-size: 1.4rem;
`;

// .defaultProps is a React feature to specify default props
// otherwise you used to do it as Form({ type = 'regular' })
Form.defaultProps = {
	type: 'regular',
};

export default Form;
