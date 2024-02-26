import styled from 'styled-components';

const StyledSelect = styled('select').withConfig({
	shouldForwardProp: prop => !['type'].includes(prop),
})`
	font-size: 1.4rem;
	padding: 0.8rem 1.2rem;
	border: 1px solid
		${props =>
			props.type === 'white' ? 'var(--color-grey-100)' : 'var(--color-grey-300)'};
	border-radius: var(--border-radius-sm);
	background-color: var(--color-grey-0);
	font-weight: 500;
	box-shadow: var(--shadow-sm);
`;

// value is currently active option
// ...props is used to pass all the other props (meant for styling)
// into the styledselect directly
function Select({ options, value, onChange, ...props }) {
	return (
		<StyledSelect value={value} onChange={onChange} {...props}>
			{options.map((option, i) => (
				<option value={option.value} key={i}>
					{option.label}
				</option>
			))}
		</StyledSelect>
	);
}
export default Select;
