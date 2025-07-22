import { useGetUserQuery } from "@/features";
import { Loader, Tag } from "@/shared/ui";
import { useRef, useState, useCallback, useEffect } from "react";

export const Home = () => {
  const [userIndex, setUserIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const { data: users, isLoading } = useGetUserQuery();

  const media = users?.[userIndex]?.media ?? [];
  const currentUser = users?.[userIndex];

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(false);
  }, [photoIndex, userIndex]);

  useEffect(() => {
    setPhotoIndex(0);
  }, [userIndex]);

  const handleClickByCoordinate = useCallback(
    (clientX: number) => {
      if (!containerRef.current || media.length <= 1) return;

      const { left, width } = containerRef.current.getBoundingClientRect();
      const clickX = clientX - left;

      setPhotoIndex((i) =>
        clickX < width / 2
          ? Math.max(0, i - 1)
          : Math.min(media.length - 1, i + 1)
      );
    },
    [media.length]
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    const isSwipe = Math.abs(dx) > 10 || Math.abs(dy) > 10;

    if (isSwipe && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      setUserIndex((i) =>
        dx < 0 ? Math.min((users?.length ?? 0) - 1, i + 1) : Math.max(0, i - 1)
      );
    } else {
      handleClickByCoordinate(e.changedTouches[0].clientX);
    }
  };

  if (isLoading || !currentUser) {
    return <Loader />;
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 p-1"
      onClick={(e) => handleClickByCoordinate(e.clientX)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="w-full h-[calc(100vh-60px)] relative overflow-hidden">
        {media.length > 1 && (
          <div className="absolute w-full flex gap-[2px] items-center top-1 px-4">
            {media.map((_, idx) => (
              <div
                key={idx}
                className={`${
                  idx === photoIndex ? "bg-white" : "bg-[#505965]"
                } w-full h-1 rounded-lg`}
              />
            ))}
          </div>
        )}

        <img
          src={media[photoIndex]?.url}
          alt={`Фото ${photoIndex + 1}`}
          className={`
            w-full h-full object-cover rounded-lg
            transition-opacity duration-500 ease-in-out
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
          onLoad={() => setLoaded(true)}
        />

        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black/80 via-black/60 to-transparent rounded-b-lg pointer-events-none z-10" />

        <div className="absolute z-10 bottom-4 px-4 text-white w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-[34px] font-bold">{currentUser.name}</p>
              <p className="text-[34px]">32</p>
            </div>
            <button className="cursor-pointer">
              <img src="/icons/info.svg" alt="info" />
            </button>
          </div>

          <div className="flex w-[80%] items-center gap-1 flex-wrap mt-2.5">
            {currentUser.passions.map((passion) => (
              <Tag key={passion} text={passion} isPreview />
            ))}
          </div>

          <div className="mt-11 flex items-center gap-5 justify-center">
            <button className="w-[46px] h-[46px] border border-[#CD7105] rounded-full flex items-center justify-center">
              <img
                className="w-full h-full object-cover object-center"
                src="/icons/repeat.svg"
                alt="repeat"
              />
            </button>

            <button className="w-[58px] h-[58px] border border-[#FF4458] rounded-full flex items-center justify-center">
              <img
                className="w-full h-full object-cover object-center"
                src="/icons/reject.svg"
                alt="reject"
              />
            </button>

            <button className="w-[46px] h-[46px] border border-[#1786FF] rounded-full flex items-center justify-center">
              <img
                className="w-full h-full object-cover object-center"
                src="/icons/favorite.svg"
                alt="favorite"
              />
            </button>

            <button className="w-[58px] h-[58px] border border-[#129E68] rounded-full flex items-center justify-center">
              <img
                className="w-full h-full object-cover object-center"
                src="/icons/like.svg"
                alt="like"
              />
            </button>

            <button className="w-[46px] h-[46px] border border-[#BA52F5] rounded-full flex items-center justify-center">
              <img
                className=" object-cover object-center"
                src="/icons/blinde-small.svg"
                alt="blinde-small"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
