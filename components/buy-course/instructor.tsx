import Image from "next/image";

interface Props {
  instructor: {
    id: string;
    fullName: string;
    email: string;
    profileImage: {
      URL: string;
    };
  };
}

export default function Instructor(props: Props) {
  return (
    <div className="flex flex-col items-center gap-3 w-[200px]">
      <div className="w-[84px] h-[60px] relative">
        <Image
          src={
            props.instructor.profileImage.URL ||
            "https://media.giphy.com/media/Mjl0BsAgMGYTe/giphy.gif"
          }
          alt="Instructor profile image"
          fill
          className="object-cover rounded-2xl"
        />
      </div>

      <div className="flex flex-col items-center gap-[2px]">
        <div className="font-urbanist font-semibold text-lg text-text1 text-center">
          {props.instructor.fullName}
        </div>
        <div className="font-urbanist text-sm text-center">
          Founder, DeepLearning.AI & Co-founder, Coursera
        </div>
      </div>
    </div>
  );
}
