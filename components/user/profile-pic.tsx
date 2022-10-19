import Image from "next/image";

import { useAppSelector } from "@hooks/store";
import { selectUser } from "@store/user/slice";

function ProfilePic() {
  var { data: user } = useAppSelector(selectUser);
  var img = user?.profileImage?.URL ?? "/posters/user.svg";

  return (
    <div className="h-11 w-11 rounded-[4px] cursor-pointer hover:bg-grey2 active:bg-grey3 flex justify-center items-center">
      <Image
        src={img}
        alt={user?.fullName}
        layout="fixed"
        height={36}
        width={36}
        className="rounded-[4px] object-cover w-9 h-9"
      />
    </div>
  );
}

export default ProfilePic;
