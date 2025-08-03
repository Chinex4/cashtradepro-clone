import { Routes, Route, Navigate } from 'react-router-dom';
import AccountHeader from '../../components/AccountHeader';

import Security from '../account/Security';
import IdentityVerification from '../account/IdentiyVerification';
import Settings from '../account/Settings';
import BasicVerificationForm from '../account/BasicVerificationForm';
import ChangeEmail from '../account/ChangeEmail';
import ChangePassword from '../account/ChangePassword';
import SetAntiPhishingCode from '../account/SetAntiPhishingCode';
import DeviceManagement from '../account/Devicemanagement';
import AccountActivity from '../account/AcountActivity';
import BindGoogleAuthenticator from '../account/BindGoogleAuthentication';
import DisableAccount from '../account/DisableAccount';
import BindMobile from '../account/BindMobile';
import AdvancedVerificationForm from '../account/AdvancedVerificationForm';
import InstitutionalVerificationForm from '../account/InstitutionalVerificationForm';

// import other components...

const AccountRoutes = () => {
	return (
		<div className='min-h-screen bg-[#0F0F0F] text-white flex flex-col lg:flex-row'>
			<AccountHeader />
			<div className='flex-1 px-4 py-6 max-w-full lg:max-w-6xl lg:mx-auto'>
				<Routes>
					<Route
						path='/'
						element={
							<Navigate
								to='settings'
								replace
							/>
						}
					/>
					<Route
						path='security'
						element={<Security />}
					/>
					<Route
						path='identity-verification'
						element={<IdentityVerification />}
					/>
					<Route
						path='basic-verification'
						element={<BasicVerificationForm />}
					/>
					<Route
						path='advanced-verification'
						element={<AdvancedVerificationForm />}
					/>
					<Route
						path='institutional-verification'
						element={<InstitutionalVerificationForm />}
					/>
					<Route
						path='/security/bind-google-auth'
						element={<BindGoogleAuthenticator />}
					/>
					<Route
						path='/security/bind-mobile'
						element={<BindMobile />}
					/>
					<Route
						path='/security/modify-email'
						element={<ChangeEmail />}
					/>
					<Route
						path='/security/modify-password'
						element={<ChangePassword />}
					/>
					<Route
						path='/security/set-phish-code'
						element={<SetAntiPhishingCode />}
					/>
					<Route
						path='/security/disable-account'
						element={<DisableAccount />}
					/>
					<Route
						path='/security/device-management'
						element={<DeviceManagement />}
					/>
					<Route
						path='/security/account-activity'
						element={<AccountActivity />}
					/>
					<Route
						path='settings'
						element={<Settings />}
					/>
					
				</Routes>
			</div>
		</div>
	);
};

export default AccountRoutes;
