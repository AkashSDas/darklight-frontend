import Image from "next/image";

export function AuthGif({ src }: { src: string }) {
  return (
    <div className="w-[600px] h-[400px] relative">
      <Image
        src={src}
        alt="gif"
        fill
        className="object-cover rounded-[144px]"
      />
    </div>
  );
}
