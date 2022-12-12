import Image from "next/image";

export default function Instructor() {
  return (
    <div className="flex flex-col items-center gap-3 w-[200px]">
      <div className="w-[84px] h-[60px] relative">
        <Image
          src="https://media.giphy.com/media/Mjl0BsAgMGYTe/giphy.gif"
          alt="User"
          fill
          className="object-cover rounded-2xl"
        />
      </div>

      <div className="flex flex-col items-center gap-[2px]">
        <div className="font-urbanist font-semibold text-lg text-text1 text-center">
          Jane Watson
        </div>
        <div className="font-urbanist text-sm text-center">
          Founder, DeepLearning.AI & Co-founder, Coursera
        </div>
      </div>
    </div>
  );
}
