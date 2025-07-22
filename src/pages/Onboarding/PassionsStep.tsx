import { useGetPassionQuery } from "@/features/passion-query/api/getPassionQuery";
import { useOnboardingStore } from "@/shared/stores";
import { Button, Loader, Tag } from "@/shared/ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PassionsStep = () => {
  const [selectedPassions, setSelectedPassions] = useState<string[]>([]);

  const navigate = useNavigate();
  const setPassions = useOnboardingStore((state) => state.setPassions);

  const { data: passions, isLoading } = useGetPassionQuery();

  useEffect(() => {
    if (selectedPassions.length > 5) {
      setSelectedPassions(selectedPassions.slice(0, 5));
    }
  }, [selectedPassions]);

  const onContinue = () => {
    setPassions(selectedPassions);
    navigate("/onboarding/media");
  };

  const onSelectPassion = (name: string) => {
    setSelectedPassions((prev) => {
      if (prev.includes(name) && prev.length <= 5) {
        return prev.filter((passionName) => passionName !== name);
      }
      return [...prev, name].slice(0, 5);
    });
  };

  return (
    <div className="w-screen h-screen">
      <div className="h-4 w-full bg-gray-200">
        <div className="h-full w-3/4 bg-gradient-to-r from-pink-500 to-red-500" />
      </div>

      <div className="flex-1 flex flex-col pb-24">
        <div className="p-6">
          <div className="w-full flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="cursor-pointer">
              <img src="/icons/back.svg" alt="back" />
            </button>

            <button
              onClick={() => navigate("/onboarding/media")}
              className="cursor-pointer"
            >
              Skip
            </button>
          </div>

          <div className="mt-5">
            <h1 className="text-[28px] font-bold">Passions</h1>

            <p className="mt-2">
              Let everyone know what you’re passionate about, by adding it to
              your profile.
            </p>
          </div>
        </div>

        <div className="w-full">
          {isLoading ? (
            <Loader />
          ) : passions && passions.length > 0 ? (
            <div className="p-6 flex items-center justify-center gap-2 flex-wrap">
              {passions.map((passion) => (
                <Tag
                  key={passion.id}
                  text={passion.name}
                  isActive={selectedPassions.includes(passion.name)}
                  onClick={() => onSelectPassion(passion.name)}
                />
              ))}
            </div>
          ) : (
            <p>No passions found</p>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-[#D4D8DE]">
        <Button onClick={onContinue} disabled={selectedPassions.length === 0}>
          Continue ({selectedPassions.length}/5)
        </Button>
      </div>
    </div>
  );
};
