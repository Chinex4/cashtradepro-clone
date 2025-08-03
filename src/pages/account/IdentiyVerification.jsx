import { FileText, Briefcase, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import useFetchLoggedInUser from "../../hooks/useFetchedLoggedInUser";

const IdentityVerification = () => {
  const { user: fetchedUser } = useFetchLoggedInUser();

    // const isKycVerified = fetchedUser?.message?.userDetails?.kyc;
  const isKycVerified = "Verified";

  return (
    <div className="text-white p-4 md:p-6 lg:p-10 space-y-8 text-xs">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="space-y-2">
          <h2 className="text-2xl lg:text-3xl font-bold">Verification</h2>
          <p className="text-sm text-gray-400 lg:w-[600px]">
            The same user can only verify with one identity type
            (personal/business), and cannot change the identity type after
            verification.
            <br />
            According to the regulatory requirements, for the safety of your
            account and funds, please verify your identity truthfully.
            <br />
            KYC must be completed by the account owner.{" "}
            {/* <span className="text-lime-400 underline cursor-pointer">
              Disclaimer
            </span>
            <br />
            Description of Interests,{" "}
            <span className="text-lime-400 underline cursor-pointer">
              KYC Level Benefits
            </span> */}
          </p>
        </div>
        <div>
          <img
            className="w-[300px]"
            src="/verification-image.webp"
            alt="identity verification"
          />
        </div>
      </div>

      {/* Basic Verification */}
      <div className="border border-[#333] rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold">Basic Verification</h3>
        <div className="grid md:grid-cols-3 text-sm text-gray-300">
          <div>
            <p className="font-medium mb-1">Support</p>
            <p>Daily Withdrawal Limit</p>
            <p>Operational events and activites</p>
          </div>
          <div>
            <p className="font-medium mb-1">Unverified</p>
            <p>500,000 USDT</p>
            <p>-</p>
          </div>
          <div>
            <p className="text-lime-400 font-medium mb-1">
              Benefit for Lv1 KYC
            </p>
            <p className="text-lime-400">2,000,000 USDT</p>
            <p className="text-lime-400">Selected events and activities</p>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 lg:gap-0">
          <div className="text-sm text-gray-300 space-y-2">
            <p className="flex items-center gap-2">
              <FileText size={16} className="text-lime-400" />
              Personal information
            </p>
            <p className="flex items-center gap-2">
              <FileText size={16} className="text-lime-400" />
              ID
            </p>
          </div>

          {isKycVerified === "Verified" ? (
            <button className="px-8 bg-zinc-700 text-gray-400 rounded-md py-2 cursor-not-allowed">
              Already Verified
            </button>
          ) : isKycVerified === "Pending" ? (
            <button className="px-8 bg-zinc-700 text-gray-400 rounded-md py-2 cursor-not-allowed">
              Pending... Awaiting Verification
            </button>
          ) : (
            <Link
              to={"/account/basic-verification"}
              className="px-8 bg-lime-400 hover:bg-lime-500 text-black rounded-md py-2 text-center"
            >
              Verify
            </Link>
          )}
        </div>
      </div>

      {/* Advanced Verification */}
      <div className="border border-[#333] rounded-lg p-4 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Lock size={16} /> Advanced Verification
        </h3>
        <div className="grid md:grid-cols-3 text-sm text-gray-300">
          <div>
            <p className="font-medium mb-1">Support</p>
            <p>Daily Withdrawal Limit</p>
            <p>Operational events and activites</p>
          </div>
          <div>
            <p className="font-medium mb-1">Unverified</p>
            <p>2,000,000 USDT</p>
            <p>Selected events and activities</p>
          </div>
          <div>
            <p className="text-lime-400 font-medium mb-1">
              Benefit for Lv2 KYC
            </p>
            <p className="text-lime-400">5,000,000 USDT</p>
            <p className="text-lime-400">More exclusive campaigns</p>
          </div>
        </div>

        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 lg:gap-0">
          <div className="text-sm text-gray-300">
            <p className="flex items-center gap-2">
              <FileText size={16} className="text-lime-400" />
              Proof of address
            </p>
          </div>

          {isKycVerified === "Verified" ? (
            <Link
              to={"/account/advanced-verification"}
              className="px-8 bg-lime-400 hover:bg-lime-500 text-black rounded-md py-2 text-center"
            >
              Verify
            </Link>
          ) : isKycVerified === null || "Pending" ? (
            <button className="px-8 bg-zinc-700 text-gray-400 rounded-md py-2 cursor-not-allowed">
              Basic Verification Required
            </button>
          ) : (
            <button className="px-8 bg-zinc-700 text-gray-400 rounded-md py-2 cursor-not-allowed">
              Pending... Awaiting Verification
            </button>
          )}
        </div>
      </div>

      {/* Institutional Verification */}
      <div className="border border-[#333] rounded-lg p-4 space-y-4 text-white">
        <h3 className="text-lg font-semibold">Institutional certification</h3>
        <p className="text-sm text-gray-400">
          Level up your trading experience with Cashtradepro business account
        </p>

        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 lg:gap-0">
          <div className="mt-2 text-sm text-gray-300 space-y-2">
            <p className="font-medium text-gray-400">Requirements</p>
            <p className="flex items-center gap-2">
              <Briefcase size={16} className="text-lime-400" />
              Institution information
            </p>
          </div>

          <button className="bg-lime-400 hover:bg-lime-500 text-black rounded-md py-2 px-8">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdentityVerification;
