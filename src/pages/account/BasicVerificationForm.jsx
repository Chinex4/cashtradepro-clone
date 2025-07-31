import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Listbox } from '@headlessui/react';
import { useState } from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import CountrySelector from '../../components/ui/CountrySelector';
import IdentityPrepModal from '../../components/ui/modals/IdentityPrepModal';
import UploadIDPage from './UploadIDPage';
import { getDateYearsAgo } from '../../utils/getDateYearsAgo';
import GoBack from '../../components/ui/GoBack';

const documentTypes = ['ID Card', 'Driver’s License', 'Passport', 'Others'];

const schema = Yup.object().shape({
	country: Yup.object({
		name: Yup.string().required('Country name is required'),
		flag: Yup.string().required('Flag is required'),
	}).required('Country is required'),
	documentType: Yup.string().required('Document type is required'),
	idNumber: Yup.string().required('ID number is required'),
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required'),
	dateOfBirth: Yup.string().required('Date of birth is required'),
});

export default function BasicVerificationForm() {
	const [touched, setTouched] = useState(false);
	const [showPrepModal, setShowPrepModal] = useState(false);
	const [proceedToUpload, setProceedToUpload] = useState(false);
	const [formData, setFormData] = useState(null);

	const {
		control,
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues: {
			country: '',
			documentType: '',
			idNumber: '',
			firstName: '',
			lastName: '',
			dateOfBirth: '',
		},
	});

	const selectedDocType = watch('documentType');

	const onSubmit = (data) => {
		setFormData(data);
		if (data.documentType === 'ID Card') {
			setShowPrepModal(true); // open modal
		} else {
			setProceedToUpload(true); // skip modal
		}
	};

	if (proceedToUpload) {
		return (
			<UploadIDPage
				formData={formData}
				onBack={() => {
					setProceedToUpload(false);
				}}
			/>
		);
	}

	return (
		<div className='max-w-6xl mx-auto text-white px-4 py-6 space-y-6'>
			<GoBack />
			<h2 className='text-2xl font-bold'>Basic Verification</h2>
			<div className='bg-[#1a1a1a] p-3 text-sm text-gray-400 rounded-md'>
				⚠ Make sure that the information entered matches the documents to be
				uploaded, otherwise they will be rejected.
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className='space-y-4'>
				<CountrySelector
					control={control}
					errors={errors}
					setTouched={setTouched}
				/>

				{/* Document Type */}
				<div>
					<label className='block text-sm mb-1'>Document Type</label>
					<Controller
						name='documentType'
						control={control}
						render={({ field }) => (
							<Listbox
								value={field.value}
								onChange={(value) => {
									field.onChange(value);
									setTouched(true);
								}}>
								<div className='relative'>
									<Listbox.Button className='w-full bg-zinc-900 border border-gray-700 text-left px-4 py-2 rounded-md text-sm'>
										{field.value || 'Select your document'}
										<ChevronUpDownIcon className='w-4 h-4 absolute right-2 top-2.5 text-gray-400' />
									</Listbox.Button>
									<Listbox.Options className='absolute z-10 mt-1 w-full bg-zinc-800 border border-gray-700 rounded-md text-sm'>
										{documentTypes.map((doc) => (
											<Listbox.Option
												key={doc}
												value={doc}
												className='px-4 py-2 hover:bg-zinc-700 cursor-pointer'>
												{doc}
											</Listbox.Option>
										))}
									</Listbox.Options>
								</div>
							</Listbox>
						)}
					/>
					{errors.documentType && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.documentType.message}
						</p>
					)}
				</div>

				{/* ID Fields */}
				<div>
					<label className='block text-sm mb-1'>ID Number</label>
					<input
						{...register('idNumber', { onChange: () => setTouched(true) })}
						className='w-full bg-zinc-900 border border-gray-700 px-4 py-2 rounded-md text-sm'
						placeholder='Enter your ID number'
					/>
					{errors.idNumber && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.idNumber.message}
						</p>
					)}
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<div>
						<label className='block text-sm mb-1'>First Name</label>
						<input
							{...register('firstName', { onChange: () => setTouched(true) })}
							className='w-full bg-zinc-900 border border-gray-700 px-4 py-2 rounded-md text-sm'
							placeholder='Enter your first name'
						/>
						{errors.firstName && (
							<p className='text-red-500 text-sm mt-1'>
								{errors.firstName.message}
							</p>
						)}
					</div>
					<div>
						<label className='block text-sm mb-1'>Last Name</label>
						<input
							{...register('lastName', { onChange: () => setTouched(true) })}
							className='w-full bg-zinc-900 border border-gray-700 px-4 py-2 rounded-md text-sm'
							placeholder='Enter your last name'
						/>
						{errors.lastName && (
							<p className='text-red-500 text-sm mt-1'>
								{errors.lastName.message}
							</p>
						)}
					</div>
				</div>

				<div>
					<label className='block text-sm mb-1'>Date of Birth</label>
					<input
						type='date'
						{...register('dateOfBirth', { onChange: () => setTouched(true) })}
						className='w-full bg-zinc-900 border border-gray-700 px-4 py-2 rounded-md text-sm'
						max={getDateYearsAgo(18)} // no younger than 18
						min={getDateYearsAgo(120)} // no older than 120
					/>
					{errors.dateOfBirth && (
						<p className='text-red-500 text-sm mt-1'>
							{errors.dateOfBirth.message}
						</p>
					)}
				</div>

				<button
					type='submit'
					disabled={!isValid || !touched}
					className={`w-full lg:w-auto lg:px-8 py-2 rounded-md font-semibold ${
						!isValid || !touched
							? 'bg-zinc-700 text-gray-400 cursor-not-allowed'
							: 'bg-lime-500 text-black hover:bg-lime-600'
					}`}>
					Next
				</button>
			</form>

			<IdentityPrepModal
				isOpen={showPrepModal}
				onClose={() => setShowPrepModal(false)}
				onProceed={() => {
					setShowPrepModal(false);
					setProceedToUpload(true);
				}}
			/>
		</div>
	);
}
