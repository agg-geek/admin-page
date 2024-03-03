import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
	border: 1px solid var(--color-grey-100);
	background-color: var(--color-grey-0);
	box-shadow: var(--shadow-sm);
	border-radius: var(--border-radius-sm);
	padding: 0.4rem;
	display: flex;
	gap: 0.4rem;
`;

const FilterButton = styled('button').withConfig({
	shouldForwardProp: prop => !['active'].includes(prop),
})`
	background-color: var(--color-grey-0);
	border: none;

	${props =>
		props.active &&
		css`
			background-color: var(--color-brand-600);
			color: var(--color-brand-50);
		`}

	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;
	/* To give the same height as select */
	padding: 0.44rem 0.8rem;
	transition: all 0.3s;

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;

function Filter({ filterField, options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const currFilter = searchParams.get(filterField) || options[0].value;

	function handleClick(filterBy) {
		searchParams.set(filterField, filterBy);
		if (searchParams.get('page')) searchParams.set('page', 1);
		setSearchParams(searchParams);
	}

	return (
		<StyledFilter>
			{options.map((option, idx) => (
				<FilterButton
					onClick={() => handleClick(option.value)}
					active={option.value === currFilter}
					disabled={option.value === currFilter}
					key={idx}
				>
					{option.label}
				</FilterButton>
			))}
		</StyledFilter>
	);
}
export default Filter;
