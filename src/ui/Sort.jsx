import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function Sort({ options }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const sortBy = searchParams.get('sort') || options[0].value;

	function handleChange(evt) {
		searchParams.set('sort', evt.target.value);
		setSearchParams(searchParams);
	}

	return (
		<Select options={options} value={sortBy} onChange={handleChange} type="white" />
	);
}
export default Sort;
