import Image from "next/image";

export default function Avatar({ src }) {
  return <img src={src} className="h-11 w-11 rounded-2xl object-cover" />;
}
