import { ROUTES_PATHS } from "@/app/router/routes";
import { useUploadQuery } from "@/features";
import { useAuthStore, useOnboardingStore } from "@/shared/stores";
import { Button, SwitchButton } from "@/shared/ui";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const getUrl = () => {
  return "";
};

export const MediaStep: React.FC = () => {
  const [view, setView] = useState<"edit" | "preview">("edit");
  const [activeIndex, setActiveIndex] = useState(0);
  const [smartPhotos, setSmartPhotos] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const name = useOnboardingStore((state) => state.name);
  const media = useOnboardingStore((state) => state.media);
  const passions = useOnboardingStore((state) => state.passions);
  const setMedia = useOnboardingStore((state) => state.setMedia);

  const login = useAuthStore((state) => state.login);

  const fileRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const mutationUpload = useUploadQuery();

  useEffect(() => {
    if (media.length > 9) {
      setMedia(media.slice(0, 9));
    }
  }, [media]);

  useEffect(() => {
    setActiveIndex(0);
  }, [media]);

  useEffect(() => {
    setLoaded(false);
  }, [activeIndex]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length <= 9) {
      const files = Array.from(e.target.files);
      const newMedia = files.map((file, idx) => ({
        id: Date.now() + idx,
        url: URL.createObjectURL(file),
      }));
      setMedia([...media, ...newMedia]);
      setFiles(files);
    }
  };

  const onFileRemove = (id: number) => {
    setMedia(media.filter((item) => item.id !== id));
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const onFileClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const onPreviewClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const { left, width } = container.getBoundingClientRect();
    const clickX = e.clientX - left;

    if (clickX < width / 2) {
      setActiveIndex((i) => Math.max(0, i - 1));
    } else {
      setActiveIndex((i) => Math.min(media.length - 1, i + 1));
    }
  };

  const onContinue = () => {
    if (media.length === 0) {
      toast.error("Please add at least one media item");
      return;
    }
    navigate(ROUTES_PATHS.home);
  };

  const onSubmit = async (): Promise<void> => {
    if (files.length === 0) {
      toast.error("Please select at least one file to upload");
      return;
    }

    try {
      setIsPending(true);
      const uploadResults = await Promise.all(
        files.map((file) => mutationUpload.mutateAsync(file))
      );

      const uploadedMedia = uploadResults.map(({ id, url }) => ({ id, url }));
      setMedia(uploadedMedia);

      toast.success("Media uploaded successfully");

      const user = await login({
        name,
        media: uploadedMedia,
        passions,
      });

      if (user) {
        onContinue();
        setIsPending(false);
      } else {
        toast.error("Login failed after upload");
        setIsPending(false);
      }
    } catch (err) {
      console.error(err);
      setIsPending(false);
      setMedia([]);
      toast.error("Failed to upload media");
    }
  };

  return (
    <div className="w-screen h-screen bg-[#F0F2F4]">
      <div className="flex w-full border-b border-gray-200 bg-white shadow-[0_0px_1px_rgb(0,0,0,0.1)]">
        <button
          className={`flex-1 py-3 text-lg text-center font-bold ${
            view === "edit" ? "text-pink-500" : "text-gray-500"
          }`}
          onClick={() => setView("edit")}
        >
          Edit
        </button>
        <div className="border-l border-[#D4D8DE]" />
        <button
          className={`flex-1 py-3 text-lg text-center font-bold ${
            view === "preview" ? "text-pink-500" : "text-gray-500"
          }`}
          onClick={() =>
            media.length > 0
              ? setView("preview")
              : toast.error("Please add at least one media item")
          }
        >
          Preview
        </button>
      </div>

      <div
        className={`${
          isPending
            ? "pointer-events-none opacity-50 transition-opacity duration-300"
            : ""
        }`}
      >
        {view === "edit" ? (
          <div className="flex-1 p-2 flex items-start gap-2 flex-wrap">
            <div
              className="grid w-full gap-2 p-2
                grid-cols-1
                min-[321px]:grid-cols-2
                min-[390px]:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                xl:grid-cols-6"
            >
              {Array.from({ length: 9 }).map((_, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    if (media[idx]) return;
                    onFileClick();
                  }}
                  className={`relative w-full h-[168px] rounded-lg ${
                    media[idx]
                      ? "border-0"
                      : "border-4 border-dashed border-[#B9BFC8]"
                  } bg-transparent`}
                >
                  {media[idx] && (
                    <img
                      src={media[idx].url}
                      alt={`media-${idx}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                  <input
                    ref={fileRef}
                    id={`file-input-${idx}`}
                    type="file"
                    accept="image/*"
                    hidden
                    multiple
                    onChange={onFileChange}
                  />
                  {media[idx] ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onFileRemove(media[idx].id);
                      }}
                      className="absolute bottom-[-6px] right-[-6px] w-7 h-7 border border-[#B9BFC8] rounded-full flex items-center justify-center bg-white"
                    >
                      <img
                        className="w-3 h-3"
                        src="/icons/close.svg"
                        alt="close"
                      />
                    </button>
                  ) : (
                    <button className="absolute bottom-[-6px] right-[-6px] w-7 h-7 border border-white rounded-full flex items-center justify-center btn-gradient">
                      <img className="w-4 h-4" src="/icons/add.svg" alt="add" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full flex flex-col items-center">
              <p className="text-[#505965] text-sm mb-7 text-center">
                Add a video, pic or Loop to get 4% closer to completing your
                profile and you may even get more Likes.
              </p>

              <Button onClick={onSubmit} width="312px">
                Add media
              </Button>
            </div>
          </div>
        ) : (
          <div
            ref={containerRef}
            onClick={onPreviewClick}
            className="flex-1 p-3"
          >
            <div className="w-full h-[670px] relative">
              <div className="absolute w-full flex gap-[2px] items-center top-1 px-4">
                {media.length > 1 &&
                  media.map((photo, idx) => (
                    <div
                      key={photo.id}
                      className={`${
                        idx === activeIndex ? "bg-white" : "bg-[#505965]"
                      } w-full h-1 rounded-lg`}
                    />
                  ))}
              </div>
              <img
                src={media[activeIndex]?.url}
                alt={`media-${activeIndex}`}
                className={`
            w-full h-[670px] object-cover rounded-lg
            transition-opacity duration-500 ease-in-out
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
                onLoad={() => setLoaded(true)}
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 via-black/10 to-transparent rounded-b-lg pointer-events-none z-10" />

              <div className="absolute z-10 bottom-4 px-4 text-white flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <p className="text-[34px] font-bold">{name}</p>
                  <p className="text-[34px]">23</p>
                </div>

                <button className="cursor-pointer">
                  <img src="/icons/info.svg" alt="info" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {view === "edit" && (
        <div className="w-full p-4 mt-7 flex items-center h-[52px] justify-between bg-white border border-[#D4D8DE]">
          <p>Smart Photos</p>

          <SwitchButton
            value={smartPhotos}
            onClick={() => setSmartPhotos(!smartPhotos)}
          />
        </div>
      )}
    </div>
  );
};

export default MediaStep;
