import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import {
	HiGlobeEuropeAfrica,
	HiOutlineChatBubbleBottomCenterText,
	HiOutlineCheckCircle,
	HiOutlineCurrencyRupee,
} from 'react-icons/hi2';

import DataItem from '../../ui/DataItem';
import { UserPhoto } from '../../ui/UserPhoto';

import { formatDistanceFromNow, formatCurrency } from '../../utils/helpers';

const StyledBookingDataBox = styled.section`
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	overflow: hidden;
`;

const Header = styled.header`
	background-color: var(--color-brand-500);
	padding: 2rem 4rem;
	color: #e0e7ff;
	font-size: 1.8rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: space-between;

	svg {
		height: 3.2rem;
		width: 3.2rem;
	}

	& div:first-child {
		display: flex;
		align-items: center;
		gap: 1.6rem;
		font-weight: 600;
		font-size: 1.8rem;
	}

	& span {
		font-family: 'Sono';
		font-size: 2rem;
		margin-left: 4px;
	}
`;

const Section = styled.section`
	padding: 3.2rem 4rem 1.2rem;
`;

const Traveller = styled.div`
	display: flex;
	align-items: center;
	gap: 1.2rem;
	margin-bottom: 1.6rem;
	color: var(--color-grey-500);

	& p:first-of-type {
		font-weight: 500;
		color: var(--color-grey-700);
	}
`;

const Price = styled('div').withConfig({
	shouldForwardProp: prop => !['isFoodPaid'].includes(prop),
})`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1.6rem 3.2rem;
	border-radius: var(--border-radius-sm);
	margin-top: 2.4rem;

	background-color: ${props =>
		props.isFoodPaid ? 'var(--color-green-100)' : 'var(--color-yellow-100)'};
	color: ${props =>
		props.isFoodPaid ? 'var(--color-green-700)' : 'var(--color-yellow-700)'};

	& p {
		text-transform: uppercase;
		font-size: 2rem;
		font-weight: 600;
	}

	svg {
		height: 2.4rem;
		width: 2.4rem;
		color: currentColor !important;
	}
`;

const Footer = styled.footer`
	padding: 1.6rem 4rem;
	font-size: 1.2rem;
	color: var(--color-grey-500);
	text-align: right;
`;

function BookingDataBox({ booking }) {
	const {
		created_at,
		startDate,
		endDate,
		numDays,
		numTravellers,
		tourPrice,
		addedPrice,
		totalPrice,
		hasFood,
		observations,
		isFoodPaid,
		travellers: { fullName: travellerName, email, country, userPhoto, nationalId },
		tours: { name: tourName },
	} = booking;

	return (
		<StyledBookingDataBox>
			<Header>
				<div>
					<HiGlobeEuropeAfrica />
					<p>
						{tourName}, {numDays} day tour
					</p>
				</div>

				<p>
					{format(new Date(startDate), 'EEE, MMM dd yyyy')} (
					{isToday(new Date(startDate))
						? 'Today'
						: formatDistanceFromNow(startDate)}
					) &mdash; {format(new Date(endDate), 'EEE, MMM dd yyyy')}
				</p>
			</Header>

			<Section>
				<Traveller>
					{userPhoto && (
						<UserPhoto src={userPhoto} alt={`UserPhoto of ${country}`} />
					)}
					<p>
						{travellerName}{' '}
						{numTravellers > 1 ? `+ ${numTravellers - 1} travellers` : ''}
					</p>
					<span>&bull;</span>
					<p>{email}</p>
					<span>&bull;</span>
					<p>National ID: {nationalId}</p>
				</Traveller>

				{observations && (
					<DataItem
						icon={<HiOutlineChatBubbleBottomCenterText />}
						label="Notes"
					>
						{observations}
					</DataItem>
				)}

				<DataItem icon={<HiOutlineCheckCircle />} label="Food booked?">
					{hasFood ? 'Yes' : 'No'}
				</DataItem>

				<Price isFoodPaid={isFoodPaid}>
					<div>
						<DataItem icon={<HiOutlineCurrencyRupee />} label="Tour price">
							{formatCurrency(tourPrice)} (Paid)
						</DataItem>

						{hasFood && (
							<DataItem
								icon={<HiOutlineCurrencyRupee />}
								label="Food price"
							>
								{formatCurrency(addedPrice)} (
								{isFoodPaid ? 'Paid' : 'Unpaid'})
							</DataItem>
						)}
					</div>

					<p>
						<DataItem icon={<HiOutlineCurrencyRupee />} label={`Total price`}>
							{formatCurrency(totalPrice)}
						</DataItem>
					</p>
				</Price>
			</Section>

			<Footer>
				<p>Booked {format(new Date(created_at), 'EEE, MMM dd yyyy, p')}</p>
			</Footer>
		</StyledBookingDataBox>
	);
}

export default BookingDataBox;
