import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { toast } from "react-hot-toast";
import { reorderGroups } from "services/course.service";
import { addGroup } from "services/group.service";
import { addLesson } from "services/lesson.service";

import { useEditableCourse, useUser } from "@lib/hooks.lib";
import Logo from "@public/logo.svg";

import { AddIcon, ArrowIcon, EyeIcon, MobileIcon, MoreIcon, PaymentIcon, SettingsIcon, UserProfileIcon } from "./icons";

export default function CourseEditorSidebar(): JSX.Element {
  return (
    <section className="fixed pt-4 pb-11 w-[300px] h-full flex flex-col gap-4 border border-solid border-border overflow-y-scroll">
      <LogoSection />
      <SettingsSection />
      <GroupsSection />
      <AddGroupButton />
    </section>
  );
}

// ==============================
// LogoSection
// ==============================

function LogoSection(): JSX.Element {
  return (
    <div className="px-4 h-[34px] flex items-center">
      <Link href="/" className="cursor-pointer">
        <Logo />
      </Link>
    </div>
  );
}

// ==============================
// SettingsSection
// ==============================

interface SidebarItemProps {
  id: string;
  icon: JSX.Element;
  label: string;
}

function SidebarItem(props: SidebarItemProps): JSX.Element {
  var router = useRouter();
  var active = router.pathname.includes(props.id);
  var { courseId } = useEditableCourse();

  return (
    <Link href={`/courses/${courseId}/${props.id}`}>
      <li
        className={`${
          active ? "bg-background3" : ""
        } px-4 h-11 w-full flex gap-3 items-center cursor-pointer hover:bg-background3 active:bg-border`}
      >
        <div className="icon">{props.icon}</div>
        <div>{props.label}</div>
      </li>
    </Link>
  );
}

function SettingsSection(): JSX.Element {
  var items = [
    {
      id: "settings",
      label: "Basic settings",
      icon: <SettingsIcon size="size_4" />,
    },
    {
      id: "members",
      label: "Members",
      icon: <UserProfileIcon size="size_4" />,
    },
    {
      id: "billing",
      label: "Services & Billings",
      icon: <PaymentIcon size="size_4" />,
    },
    {
      id: "preview",
      label: "Public view",
      icon: <EyeIcon size="size_4" />,
    },
    {
      id: "overview",
      label: "Course overview",
      icon: <MobileIcon size="size_4" />,
    },
  ];

  return (
    <ul>
      {items.map((item) => (
        <SidebarItem key={item.id} {...item} />
      ))}
    </ul>
  );
}

// ==============================
// GroupsSection
// ==============================

function GroupItem(props: any): JSX.Element {
  var router = useRouter();
  var { accessToken } = useUser();
  var { courseId, course } = useEditableCourse();
  var [openLessons, setOpenLessons] = useState(false);
  var iconStyle =
    "p-0 h-[20px] w-[20px] rounded-sm hover:bg-background3 active:bg-border";

  function navigateToGroup() {
    router.push(`/courses/${courseId}/groups/${props.group._id}`);
  }

  function DisplayGroupLessons(): JSX.Element {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenLessons(!openLessons);
        }}
        className={`${iconStyle} ${openLessons ? "" : "-rotate-90"}`}
      >
        <div className="icon">
          <ArrowIcon size="size_4" />
        </div>
      </button>
    );
  }

  function GroupEmoji(): JSX.Element {
    return (
      <span className="px-[3px] py-[1px] text-sm rounded-sm bg-background3">
        {props.group.emoji ?? "🌑"}
      </span>
    );
  }

  function GroupTitle(): JSX.Element {
    return (
      <span className="text-sm flex-grow">
        {props.group.title ?? "Untitled"}
      </span>
    );
  }

  function AddLessonButton(): JSX.Element {
    var [loading, setLoading] = useState(false);

    async function createLesson(e: any) {
      e.stopPropagation();

      if (course?._id && accessToken && props.group._id) {
        setLoading(true);

        let response = await addLesson(
          course._id,
          props.group._id,
          accessToken
        );

        if (!response.success) toast.error("Failed to create lesson");
        else {
          toast.success("Lesson created");
          router.push(
            `/courses/${course._id}/groups/${props.group._id}/lessons/${response.lesson._id}`
          );
        }

        setLoading(false);
      }
    }

    return (
      <button onClick={createLesson} disabled={loading} className={iconStyle}>
        <div className="icon">
          <AddIcon size="size_4" />
        </div>
      </button>
    );
  }

  function MoreDropdownButton(): JSX.Element {
    return (
      <button className={iconStyle}>
        <div className="icon">
          <MoreIcon size="size_4" />
        </div>
      </button>
    );
  }

  return (
    <>
      <div
        onClick={navigateToGroup}
        className="group h-9 px-2 flex gap-3 items-center cursor-pointer hover:bg-background3 active:bg-border"
      >
        <DisplayGroupLessons />
        <GroupEmoji />
        <GroupTitle />

        <div className="hidden group-hover:flex items-center gap-1 ">
          <AddLessonButton />
          <MoreDropdownButton />
        </div>
      </div>
    </>
  );
}

function GroupsSection(): JSX.Element {
  var { accessToken } = useUser();
  var { course, mutateCourse } = useEditableCourse();

  async function onDragEnd(dropEvent: DropResult) {
    if (dropEvent.destination && accessToken) {
      // Reorder
      let source = dropEvent.source.index;
      let destination = dropEvent.destination?.index;
      let groups = course?.groups.slice() || [];
      let moveGroup = groups[source];
      groups.splice(source, 1);
      groups.splice(destination || 0, 0, moveGroup);

      // Optimistic update
      let optimisticData = {
        success: true,
        error: null,
        course: { ...course, groups, lastEditedOn: new Date(Date.now()) },
      };

      await mutateCourse(async () => optimisticData, {
        optimisticData,
        revalidate: false,
      });

      // Update server
      groups = groups.map((group: any) => {
        return {
          ...group,
          lessons: group.lessons.map((lesson: any) => lesson._id),
        };
      });
      await reorderGroups(accessToken, course._id, { groups });
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="course-editor-sidebar">
        {(provided) => (
          <ul
            className="mt-4 flex flex-col"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {course?.groups.map((groupItem: any, index: number) => (
              <Draggable
                key={groupItem._id}
                draggableId={groupItem._id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <GroupItem group={groupItem} />
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

// ==============================
// AddGroupButton
// ==============================

function AddGroupButton(): JSX.Element {
  var router = useRouter();
  var { accessToken } = useUser();
  var { courseId, mutateCourse } = useEditableCourse();
  var [loading, setLoading] = useState(false);

  async function createGroup() {
    if (courseId && accessToken) {
      setLoading(true);

      let newData = await mutateCourse(async (oldData) => {
        var response = await addGroup(courseId, accessToken);

        if (!response.success) {
          toast.error("Failed to create group");
          return {
            ...oldData,
            success: false,
            error: Error("Failed to create group"),
          };
        }

        toast.success("Group created");
        return {
          success: true,
          error: null,
          course: {
            ...oldData?.course,
            groups: [...oldData?.course.groups, response.group],
          },
        };
      });

      setLoading(false);

      if (newData?.success) {
        let newGroup = newData.course.groups[newData.course.groups.length - 1];
        router.push(`/courses/${courseId}/groups/${newGroup._id}`);
      }
    }
  }

  return (
    <button
      disabled={loading}
      onClick={createGroup}
      className="bottom-0 fixed bg-[#E1E4FF] w-[300px] h-11 flex items-center justify-center text-primary hover:brightness-95 active:brightness-90"
    >
      {loading ? "Creating..." : "Add group"}
    </button>
  );
}
