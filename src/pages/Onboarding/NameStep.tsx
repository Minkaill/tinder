import { ROUTES_PATHS } from "@/app/router/routes";
import { useOnboardingStore } from "@/shared/stores";
import { Button } from "@/shared/ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NameStep = () => {
  const navigate = useNavigate();
  const name = useOnboardingStore((state) => state.name);
  const setName = useOnboardingStore((state) => state.setName);

  const [localName, setLocalName] = useState(name);

  useEffect(() => {
    setLocalName(name);
  }, [name]);

  const onContinue = () => {
    setName(localName);
    navigate(ROUTES_PATHS.onboardingPassions);
  };

  return (
    <div className="w-screen h-screen">
      <div className="h-4 w-full bg-gray-200">
        <div className="h-full w-1/4 bg-gradient-to-r from-pink-500 to-red-500" />
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <img src="/icons/close.svg" alt="close" />
        </button>

        <h1 className="mt-4 text-[28px] font-bold">My first name is</h1>

        <div className="mt-9">
          <input
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            type="text"
            className="border border-[#7C8591] rounded-lg py-3 px-3.5 text-lg bg-[#F0F2F4] w-full h-12"
            placeholder="Your name..."
          />

          <div className="mt-6">
            <p className="text-[#505965]">
              This is how it will appear in Tinder.
            </p>
            <Button disabled={!localName.trim()} onClick={onContinue}>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
