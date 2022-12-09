import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import toast from "react-hot-toast";

import { useEditableCourse, useUser } from "../../lib/hooks.lib";
import Logo from "../../public/logo.svg";
import { reorderGroups } from "../../services/course.service";
import { addGroup } from "../../services/group.service";
import { AddIcon } from "../icons/add";
import { EyeIcon } from "../icons/eye";
import { MobileIcon } from "../icons/mobile";
import { MoreIcon } from "../icons/more";
import { PaymentCardIcon } from "../icons/payment-card";
import { RightArrowIcon } from "../icons/right-arrow";
import { SettingsIcon } from "../icons/settings";
import { UserCircleIcon } from "../icons/user-circle";

export default function Sidebar() {
  var router = useRouter();
  var [addingGroup, setAddingGroup] = useState(false);
  var { accessToken } = useUser();
  var { courseId, mutateCourse } = useEditableCourse();

  async function createGroup() {
    if (courseId && accessToken) {
      setAddingGroup(true);

      var newData = await mutateCourse(async (oldData) => {
        var response = await addGroup(courseId, accessToken);

        if (!response.success) {
          return {
            success: false,
            error: "Failed to create group",
            course: oldData?.course,
          };
        }

        return {
          success: true,
          error: null,
          course: {
            ...oldData?.course,
            groups: [...oldData?.course?.groups, response.group],
          },
        };
      });

      setAddingGroup(false);

      if (!newData?.success) {
        toast.error(newData?.error ?? "Failed to create group");
      } else {
        toast.success("Group created");
        let newGroup = newData.course.groups[newData.course.groups.length - 1];
        router.push(`/courses/${courseId}/groups/${newGroup._id}`);
      }
    }
  }

  return (
    <aside className="w-[300px] flex flex-col gap-4 pt-4 pb-[44px] h-full fixed border border-solid border-border overflow-y-scroll">
      <div className="h-[34px] flex items-center px-4">
        <Link href="/" className="cursor-pointer">
          <Logo />
        </Link>
      </div>

      <ul>
        <SidebarItem
          id="settings"
          icon={<SettingsIcon size="18" />}
          label="Basic settings"
        />
        <SidebarItem
          id="permission"
          icon={<UserCircleIcon size="18" />}
          label="Permission"
        />
        <SidebarItem
          id="billing"
          icon={<PaymentCardIcon size="18" />}
          label="Services & Billing"
        />
        <SidebarItem
          id="preview"
          icon={<EyeIcon size="18" />}
          label="Public view"
        />
        <SidebarItem
          id="overview"
          icon={<MobileIcon size="18" />}
          label="Course overview"
        />
      </ul>

      <Groups />

      <button
        disabled={addingGroup}
        onClick={createGroup}
        className="bottom-0 fixed bg-[#E1E4FF] w-[300px] h-11 flex items-center justify-center text-primary font-urbanist font-medium hover:brightness-95 active:brightness-90"
      >
        {addingGroup ? "Creating..." : "Add group"}
      </button>
    </aside>
  );
}

function Groups() {
  var { course, mutateCourse } = useEditableCourse();
  var { accessToken } = useUser();
  var router = useRouter();

  return (
    <DragDropContext
      onDragEnd={async (dropEvent) => {
        // Reorder
        var source = dropEvent.source.index;
        var destination = dropEvent.destination?.index;
        var groups = course?.groups.slice() || [];
        var moveGroup = groups[source];
        groups.splice(source, 1);
        groups.splice(destination || 0, 0, moveGroup);

        let optimisticData = {
          success: true,
          error: null,
          course: { ...course, groups, lastEditedOn: new Date(Date.now()) },
        };

        await mutateCourse(async () => optimisticData, {
          optimisticData,
          revalidate: false,
        });
        await reorderGroups(accessToken, course._id, { groups });
      }}
    >
      <Droppable droppableId="course-editor-sidebar">
        {(provided) => (
          <ul
            className="mt-4 flex flex-col"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {course?.groups.map((group: any, index: number) => (
              <Draggable key={group._id} draggableId={group._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => {
                      router.push(`/courses/${course._id}/groups/${group._id}`);
                    }}
                    className="h-9 px-2 flex items-center gap-3 group cursor-pointer hover:bg-background3 active:bg-border"
                  >
                    <button className="h-[20px] w-[20px] rounded-sm hover:bg-background3 active:bg-border">
                      <RightArrowIcon size="18" />
                    </button>

                    <span className="text-sm px-[3px] py-[1px] rounded-sm bg-background3">
                      {group.emoji ?? "🌑"}
                    </span>
                    <span className="text-sm font-urbanist font-medium flex-grow">
                      {group.title ?? "Untitled"}
                    </span>

                    <div className="hidden group-hover:flex items-center gap-1 ">
                      <button className="h-[20px] w-[20px] rounded-sm hover:bg-background3 active:bg-border">
                        <AddIcon size="18" />
                      </button>

                      <button className="h-[20px] w-[20px] rounded-sm hover:bg-background3 active:bg-border">
                        <MoreIcon size="18" />
                      </button>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

function SidebarItem({
  id,
  label,
  icon,
}: {
  id: string;
  label: string;
  icon: JSX.Element;
}) {
  var router = useRouter();
  var { courseId } = useEditableCourse();

  return (
    <Link href={`/courses/${courseId}/${id}`}>
      <li
        className={`${
          router.pathname?.includes(id) && "bg-background3"
        } text-[#555555] h-11 w-full flex items-center px-4 gap-3 cursor-pointer hover:bg-background3 active:bg-border`}
      >
        <div>{icon}</div>
        <div>{label}</div>
      </li>
    </Link>
  );
}
