// components/UserAgreementModal.jsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const UserAgreementModal = ({ isOpen, onClose }) => {
	return (
		<Transition
			show={isOpen}
			as={Fragment}>
			<Dialog
				as='div'
				className='relative z-50'
				onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-200'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-150'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'>
					<div className='fixed inset-0 bg-black/40' />
				</Transition.Child>

				<div className='fixed inset-0 flex items-center justify-center p-4'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-200'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='ease-in duration-150'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'>
						<Dialog.Panel className='w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded bg-stone-900 p-6 text-sm text-gray-800 shadow-xl'>
							<Dialog.Title className='text-xl text-lime-400 font-semibold mb-4'>
								Cashtradepro User Agreement
							</Dialog.Title>
							<button
								className='absolute top-4 right-6 text-lg text-gray-400 hover:text-black'
								onClick={onClose}>
								×
							</button>
							<div className='space-y-4 text-justify'>
								{/* Paste full agreement content here */}
								<p className='text-white'>
									Cashtradepro operates in
									conjunction with its affiliates (hereinafter jointly referred
									to as the “Company” or “Cashtradepro”) the website
									https://www.Cashtradepro.com (hereinafter referred to as “Site”)
									and related mobile applications (hereinafter referred to as
									the “Platforms” which expression, for the avoidance of doubt,
									shall include the “Site”) to provide users digital assets-only
									transaction and related services. For the purpose of these
									Terms, affiliate means another entity that directly, or
									indirectly through one or more intermediaries, controls or is
									controlled by or is under common control with Cashtradepro By
									completing the registration as a user of our Platforms, you
									agree with and accept these Terms of Service (hereinafter
									referred to as the “Terms”) and all policies published on this
									website. IF YOU DO NOT ACCEPT THESE TERMS OF USE, DO NOT
									ACCESS THIS SITE AND DO NOT USE ANY OF Cashtradepro’S SERVICES,
									PRODUCTS AND CONTENT. 1. Acceptance of Terms 1.1 You are at
									least 18 years of age and have the full capacity to accept
									these Terms and enter into a transaction involving digital
									assets. You are not deprived the right to use our service and
									have the full capacity for legal action. If you do not meet
									the above condition, please do not register at our Platforms,
									otherwise the Company may suspend or terminate your account at
									any time. 1.2 Your entering into and performing these Terms
									are not prohibited by the laws and regulations of the country
									or region to which you belong, reside, pay tax or carry out
									business activities or other business. If you do not meet the
									above conditions, you should immediately terminate the
									registration or stop using our Platforms’ services. 1.3 By
									completing the full registration process or continuing to use
									our Platforms' related services from time to time, you fully
									understand and accept the entirety of these Terms, as amended
									and published from time to time on the Platforms. The contents
									of these Terms include all the terms of these Terms and the
									various rules that have been released by our Platforms or may
									be released in the future. All the rules published on the
									Platforms from time to time are hereby expressly incorporated
									and form an integral part of these Terms and have the same
									legal effect as the body of these Terms. 1.4 Our Platforms
									have the right to modify these Terms from time to time or to
									formulate and modify various specific rules according to these
									Terms and publish them in the relevant system sections of
									Platforms without separately notifying you. You should pay
									attention to the changes in these Terms and the specific rules
									from time to time. If you continue to use the services after
									the changes in the content of these Terms and the specific
									rules, you are deemed to have fully read, understood and
									accepted the amended Terms and the specific rules and to use
									the services of our Platforms in accordance therewith. 1.5 By
									accepting these Terms and/or accessing the services of our
									Platforms from your account (either personally or through
									another person) in accordance with these Terms and the
									relevant rules and instructions of our Platforms, these Terms
									shall have legal effect between you and Cashtradepro. These Terms
									do not cover legal relationships or legal disputes between you
									and other users of our Platforms as a result of network
									services or transactions, if any. 1.6 You also agree that
									Cashtradepro may, by giving notice, at its sole discretion
									immediately terminate your access to our Platforms and to your
									account. You agree and acknowledge our right to limit, suspend
									or terminate the service and your user account, prohibit your
									access to our Platforms and their content, services and tools,
									delay or remove hosted content, and take technical and legal
									steps to keep you off our Platforms or any further steps to
									recover any loss or damages caused if we determine at our sole
									discretion that you are or may be in breach of any laws,
									regulations, the rights of third parties, or any of these
									Terms or Platform’s policies. Cashtradepro shall not be liable for
									any loss or damage caused to you or any third party as a
									result of exercising our rights under this clause. 2. Scope of
									Service and Your Rights and Obligations 2.1 Cashtradepro provides
									you with the service of trading one type of digital asset for
									another type of digital asset. We do not purchase or sell
									digital assets directly from or to users as principal. Our
									services do not provide users with the ability to trade one
									form of fiat currency for another form of fiat currency. 2.1.1
									Users have the right to browse the digital currency real-time
									market and transaction information on our Platforms, and have
									the right to submit digital currency trading instructions and
									complete digital currency trading through our Platforms. 2.1.2
									Users have the right to view the information regarding their
									accounts on our Platforms, and have the right to operate the
									functions provided by our Platforms. 2.1.3 Users have the
									right to participate in the website activities organized by
									our Platforms in accordance with the activity rules published
									by our Platforms and other services undertaken by our
									Platforms. 2.2 The user understands and agrees that our
									Platforms can adjust the service content, service type and
									service form on the Platforms at any time according to the
									actual situation at our sole discretion. Our Platforms are not
									responsible for any negative impact or loss caused to you or
									any third party due to Platforms adjustments. 2.3 Depending on
									your country of residence, you may not be able to use all the
									functions of our Platforms. Without prejudice to our right of
									suspending certain services to users from a specific country,
									it is your responsibility to ensure that in accessing our
									Platforms and services, you are complying with the laws and
									regulations in your country of residence and/or the country
									from which you access our Platforms and services. 2.4 In order
									to access and use our services, you must create an account
									with Cashtradepro. You agree to: （1）provide accurate, current and
									complete information when creating the account; （2）maintain
									and promptly update your account information to keep it
									accurate, complete, and current; （3）maintain the security
									and confidentiality of your login credentials and restrict
									access to your account and your computer; （4）promptly notify
									Cashtradepro if you discover or otherwise suspect any security
									breaches related to our Platforms; （5）take responsibility
									for all activities that occur under your account and accept
									all risks of unauthorized access. 2.5 In order to provide
									services to users, our Platforms may use user’s personal
									information, non-personal information, and information
									provided by third parties (hereinafter collectively referred
									to as "user information"). Once the user registers, logs in,
									and uses our Platforms’ services, the user will be deemed to
									fully understand, agree and accept the reasonable use of the
									user information by the Company including but not limited to
									collection, statistics and analysis thereof. 2.6 You
									acknowledge that the status of the transaction confirmed by
									you on our Platforms in accordance with our Platforms’ service
									processes would be an explicit direction for our Platforms to
									conduct related transactions or operations for you. You agree
									that our Platforms have the right to deal with related matters
									in accordance with these Terms and/or relevant documents and
									rules in accordance with the relevant directions. 2.7 You are
									responsible for any disputes or losses caused by your failure
									to promptly modify or confirm the status of the transaction or
									failure to submit the relevant application. Our Platforms do
									not assume any responsibility. 3. Risks Disclosures and
									Acknowledgements 3.1 Perpetual Contract Risk Disclosures and
									Acknowledgements 3.1.1 Digital assets themselves are risky.
									The price of digital assets is prone to fluctuate, there is no
									limit for prices to go up and down, and there are unlimited
									transactions 24 hours a day, 7 days a week worldwide. Prices
									are easily affected by the control of the dealer and global
									news events, national policies, market demand and other
									factors. It may happen that prices rise several times a day,
									and prices may fall by half in one day. Due to the high
									leverage of the perpetual contract, you may suffer a large
									loss, so we strongly recommend that participate in trading
									within the risk range that you can afford. 3.1.2 Due to
									unexpected problems such as system failure, network reasons,
									denial-of-service attacks and other hacking attacks, abnormal
									transactions, market interruptions, or other possible abnormal
									conditions, we have the right to cancel the abnormal
									transaction results and roll back all the deals during a
									certain period of time according to the actual situation at
									our sole discretion without any liability whatsoever to you or
									any third party. 3.1.3 We strictly prohibit any unfair trading
									practices. We have the right to warn against all unscrupulous
									behaviors such as maliciously manipulating prices, maliciously
									affecting trading systems, and, when necessary, to restrict
									transactions, suspend transactions, cancel transactions,
									reverse closed transactions, freeze accounts, rollback time
									transactions, etc., to eliminate adverse effects at our sole
									discretion without any liability whatsoever to you or any
									third party. 3.1.4 When your position margin cannot meet the
									Platform’s requirements, your position will be forced to
									close. If the price fluctuates drastically and loss is
									incurred after using all risk control methods, we shall have
									the right to recover the loss from you. 3.1.5 When the number
									of positions or the number of orders is too large and we
									believe that there may be serious risks to the system and
									other users, you understand and agree that we have the right
									to ask you to take measures such as cancellation, closing and
									other risk control measures. In addition, when we deem it
									necessary, we have the right to control the risk of individual
									accounts by limiting the total number of positions, limiting
									the total number of orders, limiting the opening of positions,
									withdrawing orders or forcibly closing positions at our sole
									discretion without any liability whatsoever to you or any
									third party. 4. Transaction & Fees 4.1 Our Platforms will
									provide services for your transactions, and collect necessary
									services or management fees, in accordance with these Terms,
									relevant documents, agreements and/or relevant rules and
									instructions on our Platforms during the service process.
									Please refer to the relevant documents and the rules and
									descriptions of the relevant pages of our Platforms which are
									hereby expressly incorporated into these Terms and may be
									amended from time to time. 4.2You agree that our Platforms
									reserve the right to adjust the specific types and amounts of
									the aforementioned services or management fees from time to
									time and to make announcements and amendments in accordance
									with the Terms and related rules, and your continued access to
									our services constitutes your acceptance to the relevant rules
									in their latest forms. 5. Modification/Suspension/Termination
									of Service 5.1 These Terms shall remain in force unless
									unilaterally terminated by our Platforms or upon your
									application to terminate these Terms and with the consent of
									our Platforms. In the event that you violate these Terms,
									relevant rules, any laws or regulations, or we reasonably
									suspect that you are involved in illegal or inappropriate
									conduct in using our services, or at the request of government
									authorities, our Platforms reserve the right to, at our sole
									discretion and without any liability whatsoever to you,
									terminate these Terms, close your account, or restrict your
									use of our Platforms. However, our termination does not
									relieve you of your obligations under these Terms or other
									agreements generated on our Platforms. 5.2 If you find that a
									third person fraudulently misappropriated or misappropriated
									your user account and password, or any other circumstances
									that are not legally authorized, you should immediately notify
									our Platforms in an effective manner, requesting our Platforms
									to suspend the related services. All the liabilities, losses,
									damages, claims, costs or expenses arising from or in
									connection with use of your account, whether authorized or
									unauthorized, shall be borne by you. 5.3 In view of the
									particularity of the network service, you agree that our
									Platforms have the right to change, discontinue or terminate
									some or all of the network services at any time without prior
									notification nor any liability whatsoever to you or any third
									party. 5.4 You understand that our Platforms need to be
									repaired or maintained on a platform that provides network
									services (such as Internet sites, mobile networks, etc.) or
									related equipment on a regular or irregular basis. If such a
									situation causes the network service to be interrupted within
									a reasonable period of time, our Platforms shall provide
									notice as soon as practicable but shall not be responsible for
									any loss, damage, claim or liability otherwise arising
									therefrom. 5.5 Our Platforms have the right to stop, suspend
									or terminate all or part of the services under these Terms
									without notice, to take any mitigation or interlocutory
									measures (including without limitation to canceling or
									reversing transactions and freezing accounts), and to remove
									or delete the registration data, at our sole discretion
									without any liability whatsoever to you or any third party.
									Without prejudice to the generality of the above, we may seek
									to enforce our right in the following scenarios: （1）Our
									Platforms believe that the personal data you provide is not
									authentic, valid or complete; （2）Our Platforms discover or
									suspect an abnormal or illegal transaction or unusual
									activities on your part; （3）Our Platforms consider that your
									account is suspected of money laundering, cashing, pyramid
									schemes, fraudulent use or other situations that our Platforms
									consider to be risky; （4）Our Platforms believe that you have
									violated these Terms; （5）If you use the fee-based network
									service, you do not pay the corresponding service fee to our
									Platforms as required; （6）We detect unauthorized access to
									your account, or your account is subject to a governmental
									proceeding, criminal/regulatory investigation or any pending
									litigation; （7）Other circumstances in which at our
									Platforms’ sole discretion, it is necessary to suspend,
									interrupt or terminate all or part of the services under these
									Terms and remove or delete the registration data. 5.6 You
									agree that the suspension, interruption or termination of your
									account or any other measures taken by us pursuant to the
									preceding clause does not release you from your liability, and
									you shall be liable for possible breach of contract or damages
									or any other cause of action during your use of the Platform's
									services, and our Platforms may retain your information. 5.7
									If the account of the free network service you registered is
									not actually used for any consecutive 90 days, our Platforms
									have the right to delete the account and stop providing
									relevant network services for you. 6. Rules of Use 6.1
									[Account Information Content Specification] （1）When applying
									for the Platforms’ service, you should provide accurate
									personal information in accordance with the relevant rules of
									the platform. If there is any change in personal data, you
									should update it in time. （2）You should not transfer or lend
									your account number or password to others. If you find that
									others have illegally used your account, you should
									immediately notify the Platforms. Our Platforms do not assume
									any responsibility for the illegal use of accounts and
									passwords due to viruses, hacking or negligence of users. 6.2
									[Service Operation Specifications] 6.2.1 Users shall abide by
									the provisions of laws, regulations, rules, regulatory
									documents and policy requirements to ensure the legality of
									all digital currency sources in the account. You may not
									engage in the following acts during the use of our Platforms
									and related services, except as permitted by law or with the
									written permission of the Platforms: （1）Use the Platforms’
									service to conduct any behavior that may adversely affect the
									normal operation of the internet or mobile network;
									（2）Upload, display or disseminate any false, harassing,
									slanderous, abusive, intimidating, vulgar information or
									speeches or any other information or speeches in violation of
									laws and regulations, by using the web services provided by
									the Platforms. （3）Use the Platforms’ service system to
									conduct any behavior that is not conducive to the Platforms;
									（4）Infringe on the legal rights of third parties, such as
									reputation rights, portrait rights, intellectual property
									rights, trade secrets, etc. or infringe on the commercial
									interests of anyone; （5）Induce other users to click on the
									link page or share information, or use the Platforms’ accounts
									and any features, as well as third-party operating platforms,
									for promotional purposes without written permission from the
									Platforms, or to publish commercials that are not licensed by
									the Platforms; （6）Produce or publish methods or tools
									related to the above acts, or operate or disseminate the
									methods or tools, whether or not they are for commercial
									purposes; （7）Other breach or potential breach of laws and
									regulations, rights of any third party, interference with the
									normal operation of the Platforms. 6.2.2 The user promises to
									comply with all the digital currency trading rules of the
									Platforms including but not limited to the following:
									（1）Browse transaction information When users browse digital
									currency transaction information on the Platforms, they should
									carefully read all the content contained in the transaction
									information, including but not limited to digital currency
									price, request amount, handling fee, buying or selling
									direction, and the users shall fully accept all the content
									contained in the transaction information before entering into
									a transaction by clicking the button. （2）Submit a request
									The user can submit a transaction request after checking and
									confirming the transaction information. After the user submits
									the transaction request, that is, the user authorizes our
									Platforms to perform the corresponding matching transaction on
									behalf of the user, our Platforms will automatically complete
									the matching transaction when there is a transaction
									satisfying the user’s requested price without notifying the
									user in advance. （3）View transaction details The user can
									view the corresponding transaction record through the account
									transaction details to confirm their detailed transaction
									records. （4）Cancellation / modification of request The user
									has the right to revoke or modify the request at any time
									before the matching transaction is executed. 6.3 Our Platforms
									have the right to review and supervise your use of the
									Platforms’ services (including but not limited to approving
									the content stored on our Platforms by you). If you use the
									Platforms’ services in violation of any of the above
									provisions, our Platforms have the right to ask you to remedy
									your breach (if possible) or directly take all necessary
									measures (including but not limited to changing or deleting
									the content you posted, suspending or terminating your right
									to use the services) to mitigate the impact of your conduct.
									6.4 Orders you place on Cashtradepro during regular operation will
									normally be executed if the market price is at a point within
									the limits of your order. However, we do not guarantee that
									your order will be filled even if the market price was within
									your limit at the time such order was placed or was otherwise
									open. Orders you place on Cashtradepro during planned or unplanned
									downtime will be processed on a commercially reasonable
									efforts basis once we resume operations. Cashtradepro reserves the
									right to reject or cancel orders made and/or pending during
									downtime. 6.5 Orders may be subject to, and Cashtradepro shall have
									no liability for, delays, difficulties, and/or conditions
									affecting transmission or execution of orders over which
									Cashtradepro has no control, including, but not limited to,
									mechanical or electronic failure or market congestion. 7.
									Intellectual Property 7.1 All content on our Platforms are the
									property of Cashtradepro and is protected by copyright, patent,
									trademark and any other applicable laws, unless otherwise
									specified hereby. 7.2 The trademarks, trade names, service
									marks and logos of Cashtradepro and others used on our Platforms
									are the property of Cashtradepro and its respective owners. The
									software, applications, text, images, graphics, data, prices,
									trades, charts, graphs, video and audio materials used on our
									Platforms belong to Cashtradepro. The trademarks and other content
									on our Platforms should not be copied, reproduced, modified,
									republished, uploaded, posted, transmitted, scraped, collected
									or distributed in any form or by any means, no matter manual
									or automated. 7.3 The use of any content from our Platforms on
									any other site or a networked computer environment for any
									other purpose is strictly prohibited; any such unauthorized
									use may violate copyright, patent, trademark and any other
									applicable laws and could result in criminal or civil
									penalties. 7.4 Cashtradepro is a trademark owned by the Company and
									allows no unauthorized use by any user or third parties. 7.5
									Cashtradepro supports the protection of intellectual property. If
									you would like to submit (i) a trademark claim for violation
									of a mark on which you hold a valid, registered trademark or
									service mark, or (ii) a copyright claim for material on which
									you hold a bona fide copyright, please send us an email to
									support@Cashtradepro.com. 8. Privacy Policy Once the user
									registers, logs in, and uses our Platforms’ services, the user
									will be deemed to fully understand, agree and accept our
									Platforms’ privacy agreement. 9. Disclaimer of Liability Our
									Platforms are not giving investment advice, tax advice, legal
									advice, or other professional advice by allowing you to use
									our services or providing the services herein, the ability to
									purchase or sell digital assets or the storage of digital
									assets, and we do not recommend, or endorse that you purchase
									or sell digital assets, or make any investment. Before
									engaging in any transaction or investment activity, you should
									consult a qualified professional. The services that we provide
									through Cashtradepro are provided to you on a strictly “as is,”
									“where is” and “where available” basis. The company does not
									represent or warrant to the accuracy, completeness,
									currentness, non-infringement, merchantability, or fitness for
									a particular purpose of Cashtradepro or the information contained
									therein or services contained thereon. The company shall not
									be liable to you or anyone else for any loss or injury
									resulting directly or indirectly from your use of Cashtradepro or
									any services provided by Cashtradepro, including any loss caused in
									whole or part by any inaccuracies or incompleteness, delays,
									interruptions, errors or omissions, including, but not limited
									to, those arising from the negligence of the company or
									contingencies beyond their control in procuring, compiling,
									interpreting, computing, reporting, or delivering Cashtradepro, the
									services thereon or the information therein. In no event will
									the company be liable to you or anyone else for any decision
									made or action taken by you in reliance on, or in connection
									with your use of Cashtradepro, the services thereon or the
									information therein. In no event will the company be liable to
									you, whether in contract or tort, for any direct, special,
									indirect, consequential or incidental damages or any other
									damages of any kind even if the company has been advised of
									the possibility thereof. This limitation on liability
									includes, but is not limited to, the transmission of any
									viruses which may infect a user’s equipment, failure of
									mechanical or electronic equipment or communication lines,
									telephone or other interconnect problem, unauthorized access,
									theft, operator errors, strikes or other labor problems or any
									force majeure. We cannot and do not guarantee continuous,
									uninterrupted or secure access to Cashtradepro. 10. Risks 10.1
									Digital assets transaction may be subject to high risks.
									10.1.1 The risk of loss in trading digital assets may be
									substantial and losses may occur over a short period of time.
									10.1.2 The price and liquidity of digital assets have been
									subject to large fluctuations in the past and may be subject
									to large fluctuations in the future. 10.2 You acknowledge that
									you are solely responsible for determining the nature,
									potential value, suitability, and appropriateness of these
									risks for you, and that Cashtradepro does not give advice or
									recommendations. 10.3 Legislative and regulatory changes or
									actions at the state, federal or international level may
									adversely affect the use, transfer, exchange and value of
									digital assets. 11. Indemnity You agree to defend, indemnify
									and hold harmless Cashtradepro from any claim, demand, action,
									damage, loss, cost or expense, including without limitation
									reasonable attorneys’ fees, arising out or relating to your
									violation of these Terms; or your violation of any laws, rules
									or regulations; or your violation of any rights of any other
									person or entity; or your use of all or part of the services
									provided by the Platforms. 12. Notifications 12.1 Notices
									under these Terms are made by way of public notice and are
									deemed to have been served as soon as they are published on
									our Platforms. In addition, other proprietary notices that are
									posted to you personally will be provided by our Platforms to
									the email address provided by you at the time of registration,
									or the in-site message in your personal account, or to the
									mobile phone provided to our Platforms after your
									registration. Once sent, it will be deemed to have been
									delivered. Please pay close attention to your email address,
									emails in the message system of the site, messages and SMS
									messages in your mobile phone. 12.2 You understand and agree
									that all communication with you will be via electronic
									communication, including emails, site messages and SMS, and we
									will use those means to provide you with account-related
									notices and order receipts. To ensure that you receive all of
									our communications, you agree to keep your email address
									up-to-date and notify us immediately if there is any change.
									Delivery of any notice to the email address/mobile number on
									record with your user account will be considered valid. If any
									email is returned as undeliverable, we retain the right to
									block access to your user account until you provide and
									confirm a new email address. 13. Disclosures to Legal
									Authorities and Authorized Financial Institutions 13.1 We may
									share your personal data with law enforcement agents, data
									protection authorities, government officials, and other
									authorities when: 13.1.1 required by law; 13.1.2 compelled by
									subpoena, court order, or other legal procedure; 13.1.3 we
									believe that disclosure is necessary to prevent damage or
									financial loss; 13.1.4 disclosure is necessary to report
									suspected illegal activity; 13.1.5 disclosure is necessary to
									investigate violations of these terms. 14. Jurisdiction These
									Terms shall be governed by and construed in accordance with
									the laws of Saint Vincent and the Grenadines. Cashtradepro Fintech
									LLC, a company incorporated under the laws of Saint Vincent
									and the Grenadines with its registered address at Euro House,
									Richmond Hill Road, Kingstown, St. Vincent and the Grenadines,
									shall be the contracting entity under these Terms. The courts
									of Saint Vincent and the Grenadines shall have exclusive
									jurisdiction to settle any dispute arising from or connected
									with these Terms (including a dispute relating to the
									existence, validity or termination of these Terms or the
									consequences of their nullity or any non-contractual
									obligation arising out of or in connection with these Terms).
									15. Miscellaneous Our Platforms reserve the right of final
									interpretation of these Terms within the scope permitted by
									law. These Terms and related pages of our Platforms may refer
									to each other. If there is any conflict, these Terms shall
									prevail. In addition, if some of the provisions in these Terms
									are deemed invalid or unenforceable, the other provisions in
									these Terms will remain in effect. In the event of any
									conflict between these Terms and any other agreement you may
									have with Cashtradepro, the terms of that other agreement will
									prevail only if these Terms are specifically identified and
									declared to be overridden by such other agreement. Any failure
									or delay by Cashtradepro to enforce any of these Terms or to
									exercise any right hereunder shall not be construed as a
									waiver to any extent of our rights.
								</p>
								{/* Repeat rest of the sections here */}
							</div>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};

export default UserAgreementModal;
