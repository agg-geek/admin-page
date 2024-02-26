import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledPagination = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const P = styled.p`
	font-size: 1.4rem;
	margin-left: 0.8rem;

	& span {
		font-weight: 600;
	}
`;

const Buttons = styled.div`
	display: flex;
	gap: 0.6rem;
`;

const PaginationButton = styled.button`
	background-color: ${props =>
		props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
	color: ${props => (props.active ? ' var(--color-brand-50)' : 'inherit')};
	border: none;
	border-radius: var(--border-radius-sm);
	font-weight: 500;
	font-size: 1.4rem;

	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	padding: 0.6rem 1.2rem;
	transition: all 0.3s;

	&:has(span:last-child) {
		padding-left: 0.4rem;
	}

	&:has(span:first-child) {
		padding-right: 0.4rem;
	}

	& svg {
		height: 1.8rem;
		width: 1.8rem;
	}

	&:hover:not(:disabled) {
		background-color: var(--color-brand-600);
		color: var(--color-brand-50);
	}
`;

const RESULTS_PER_PAGE = 10;

function Pagination({ cntResults }) {
	const [searchParams, setSearchParams] = useSearchParams();

	const currPage = +searchParams.get('page') || 1;
	const cntPages = Math.ceil(cntResults / RESULTS_PER_PAGE);

	function previousPage() {
		const prevPage = currPage === 1 ? currPage : currPage - 1;
		searchParams.set('page', prevPage);
		setSearchParams(searchParams);
	}

	function nextPage() {
		const nextPage = currPage === cntPages ? currPage : currPage + 1;
		searchParams.set('page', nextPage);
		setSearchParams(searchParams);
	}

	if (cntPages === 0) return null;

	return (
		<StyledPagination>
			{cntPages === 1 && <P>Showing all results</P>}
			{cntPages > 1 && (
				<>
					<P>
						Showing <span>{(currPage - 1) * RESULTS_PER_PAGE + 1}</span> to{' '}
						<span>{Math.min(currPage * RESULTS_PER_PAGE, cntResults)}</span>{' '}
						of <span>{cntResults}</span> results
					</P>

					<Buttons>
						<PaginationButton
							onClick={previousPage}
							disabled={currPage === 1}
						>
							<HiChevronLeft /> <span>Previous</span>
						</PaginationButton>

						<PaginationButton
							onClick={nextPage}
							disabled={currPage === cntPages}
						>
							<span>Next</span> <HiChevronRight />
						</PaginationButton>
					</Buttons>
				</>
			)}
		</StyledPagination>
	);
}
export default Pagination;
