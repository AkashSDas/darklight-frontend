import moment from "moment-timezone";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import TextButton from "@components/buttons/text-button";
import { ArrowRightIcon } from "@components/icons";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { Module, selectEditableCourse, setCourse, setModule } from "@store/editable-course/slice";
import { createCourseModuleThunk, getCourseModuleThunk, getCourseThunk, reorderModulesThunk } from "@store/editable-course/thunk";

// https://github.com/atlassian/react-beautiful-dnd/issues/2393

function ModuleButton({ m }) {
  var { course } = useAppSelector(selectEditableCourse);
  var dispatch = useAppDispatch();
  var router = useRouter();
  var [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="relative cursor-pointer flex gap-[6px] items-center px-2 py-[5px] hover:bg-grey2 active:bg-grey3"
        onClick={() => {
          dispatch(setModule({ module: m, editing: false }));
          router.push(`/course-editor/${course.id}/${m.id}`);
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className={`w-4 h-4 hover:bg-grey5 rounded-sm ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          <ArrowRightIcon />
        </div>
        <div className="w-4 h-4 flex justify-center items-center">
          {m.emoji ?? "📁"}
        </div>
        <div className="-text-body2 leading-[100%] font-medium">
          {m.title ? (
            <span className="text-grey7">{m.title}</span>
          ) : (
            <span className="text-grey6">Untitled</span>
          )}
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="absolute right-2 flex justify-center items-center w-5 h-5 stroke-grey7 hover:bg-grey4 active:bg-grey5 rounded-sm"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.5 4C8.5 3.72386 8.27614 3.5 8 3.5C7.72386 3.5 7.5 3.72386 7.5 4V7.5H4C3.72386 7.5 3.5 7.72386 3.5 8C3.5 8.27614 3.72386 8.5 4 8.5H7.5V12C7.5 12.2761 7.72386 12.5 8 12.5C8.27614 12.5 8.5 12.2761 8.5 12V8.5H12C12.2761 8.5 12.5 8.27614 12.5 8C12.5 7.72386 12.2761 7.5 12 7.5H8.5V4Z"
              fill="#494C53"
            />
          </svg>
        </div>
      </div>

      {/* Lessons */}
      {isOpen && (
        <div>
          {m?.lessons?.map((l) => (
            <div
              onClick={() => {
                dispatch(setModule({ module: null, editing: false }));
                router.push(`/course-editor/${course.id}/${m.id}/${l.id}`);
              }}
              key={l.id}
              className="cursor-pointer pl-[26px] flex gap-[6px] items-center px-2 py-[5px] hover:bg-grey2 active:bg-grey3"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.75 8C9.75 8.9665 8.9665 9.75 8 9.75C7.0335 9.75 6.25 8.9665 6.25 8C6.25 7.0335 7.0335 6.25 8 6.25C8.9665 6.25 9.75 7.0335 9.75 8Z"
                  fill="#8A8F99"
                />
              </svg>

              <div className="-text-body2 text-grey6">
                {l.title ?? "Untitled"}
              </div>
            </div>
          ))}
        </div>
      )}

      {isOpen && m?.lessons?.length == 0 && (
        <div className="pl-[26px] flex gap-[6px] items-center px-2 py-[5px]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.75 8C9.75 8.9665 8.9665 9.75 8 9.75C7.0335 9.75 6.25 8.9665 6.25 8C6.25 7.0335 7.0335 6.25 8 6.25C8.9665 6.25 9.75 7.0335 9.75 8Z"
              fill="#8A8F99"
            />
          </svg>

          <div className="-text-body2 text-grey6">😢 No lesson</div>
        </div>
      )}
    </>
  );
}

function CourseSidebar() {
  var { course } = useAppSelector(selectEditableCourse);
  var dispatch = useAppDispatch();
  var router = useRouter();

  return (
    <div className="w-[240px] bg-grey1 h-screen fixed pt-[61px] pb-3">
      <DragDropContext
        onDragEnd={(dropEvent) => {
          // Reorder
          var source = dropEvent.source.index;
          var destination = dropEvent.destination?.index;
          if (destination) {
            var modules = (course?.modules.slice() || []) as Module[];
            var moveModule = modules[source];
            modules.splice(source, 1);
            modules.splice(destination || 0, 0, moveModule);
            dispatch(setCourse({ ...course, modules: modules }));
            dispatch(
              reorderModulesThunk({ courseId: course?.id, payload: modules })
            );
          }
        }}
      >
        <Droppable droppableId="sidebar-modules">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {course?.modules.map((m, index) => (
                <Draggable key={m.id} draggableId={m.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex flex-col"
                    >
                      <ModuleButton m={m} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={async () => {
          var id = await (
            await dispatch(createCourseModuleThunk(course?.id))
          ).payload;
          if (id) {
            router.push(`/course-editor/${course?.id}/${id}`);
          }
        }}
        className="w-full h-9 hover:bg-grey2 active:bg-grey3 flex gap-[6px] items-center px-2 py-[5px] border-t border-b border-t-grey5 border-b-grey5"
      >
        <span className="flex justify-center items-center w-5 h-5 stroke-grey7">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.5 4C8.5 3.72386 8.27614 3.5 8 3.5C7.72386 3.5 7.5 3.72386 7.5 4V7.5H4C3.72386 7.5 3.5 7.72386 3.5 8C3.5 8.27614 3.72386 8.5 4 8.5H7.5V12C7.5 12.2761 7.72386 12.5 8 12.5C8.27614 12.5 8.5 12.2761 8.5 12V8.5H12C12.2761 8.5 12.5 8.27614 12.5 8C12.5 7.72386 12.2761 7.5 12 7.5H8.5V4Z"
              fill="#494C53"
            />
          </svg>
        </span>
        <span>Add a module</span>
      </button>
    </div>
  );
}

function CourseNavName() {
  var router = useRouter();
  var dispatch = useAppDispatch();
  var { course, activeModule, isUpdating } =
    useAppSelector(selectEditableCourse);

  function handleCourseClick() {
    if (course?.id) {
      dispatch(setModule({ module: null, editing: false }));
      router.push(`/course-editor/${course?.id}`);
    }
  }

  function NavItem({ label, onClick }) {
    return (
      <span
        className="flex items-center gap-1 hover:bg-grey2 active:bg-grey3 px-1 py-[2px] cursor-pointer rounded-sm text-[14px]"
        onClick={onClick}
      >
        {label ? (
          <span className="text-grey8">{label}</span>
        ) : (
          <span className="text-grey6">Untitled</span>
        )}
      </span>
    );
  }

  return (
    <div className="flex gap-[2px]">
      <NavItem label={course?.title} onClick={handleCourseClick} />
      <span className="flex items-center">
        {activeModule ? <span className="-text-cap text-grey6">/</span> : null}
      </span>
      {activeModule?.id && (
        <NavItem label={activeModule.title} onClick={() => {}} />
      )}
      {isUpdating && <span className="text-grey6">Updating...</span>}
    </div>
  );
}

function CourseInfoAndActions() {
  var { course } = useAppSelector(selectEditableCourse);

  return (
    <div className="flex gap-2 items-center">
      <span className="text-grey6 -text-cap">
        <>Edited {moment(course?.lastEditedOn).tz("Asia/Kolkata").fromNow()}</>
      </span>

      <TextButton label="Modules" />
      <button className="h-7 w-7 flex items-center justify-center hover:bg-grey2 active:bg-grey3 rounded-[4px]">
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.947 15.3864C15.6541 15.0935 15.1792 15.0935 14.8863 15.3864C14.5934 15.6793 14.5934 16.1542 14.8863 16.4471L15.947 15.3864ZM17.803 19.3637C18.0959 19.6566 18.5708 19.6566 18.8637 19.3637C19.1566 19.0709 19.1566 18.596 18.8637 18.3031L17.803 19.3637ZM18.25 10.0834C18.25 5.29695 14.3698 1.41675 9.58334 1.41675V2.91675C13.5414 2.91675 16.75 6.12537 16.75 10.0834H18.25ZM9.58334 1.41675C4.79687 1.41675 0.916672 5.29695 0.916672 10.0834H2.41667C2.41667 6.12537 5.6253 2.91675 9.58334 2.91675V1.41675ZM0.916672 10.0834C0.916672 14.8699 4.79687 18.7501 9.58334 18.7501V17.2501C5.6253 17.2501 2.41667 14.0415 2.41667 10.0834H0.916672ZM9.58334 18.7501C14.3698 18.7501 18.25 14.8699 18.25 10.0834H16.75C16.75 14.0415 13.5414 17.2501 9.58334 17.2501V18.7501ZM14.8863 16.4471L17.803 19.3637L18.8637 18.3031L15.947 15.3864L14.8863 16.4471Z"
            fill="#494C53"
          />
        </svg>
      </button>

      <button className="h-7 w-7 flex items-center justify-center hover:bg-grey2 active:bg-grey3 rounded-[4px]">
        <svg
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.2866 13.6005L16.647 13.2088L16.647 13.2088L17.2866 13.6005ZM16.4911 14.8995L17.1307 15.2912L17.1307 15.2912L16.4911 14.8995ZM2.7134 7.39951L2.07379 7.00785L2.07379 7.00785L2.7134 7.39951ZM3.50886 6.10048L4.14847 6.49214L4.14847 6.49214L3.50886 6.10048ZM5.68209 5.55144L6.04067 4.89271L6.04067 4.89271L5.68209 5.55144ZM3.29572 9.44855L2.93713 10.1073L2.93713 10.1073L3.29572 9.44855ZM14.3179 15.4486L13.9593 16.1073L13.9593 16.1073L14.3179 15.4486ZM16.7043 11.5514L16.3457 12.2102L16.3457 12.2102L16.7043 11.5514ZM3.50886 14.8995L2.86925 15.2912L2.86925 15.2912L3.50886 14.8995ZM2.7134 13.6005L3.35301 13.2088L3.35301 13.2088L2.7134 13.6005ZM16.4911 6.10049L17.1307 5.70883L17.1307 5.70882L16.4911 6.10049ZM17.2866 7.39952L16.647 7.79119L16.647 7.79119L17.2866 7.39952ZM16.7043 9.44856L17.0628 10.1073L17.0628 10.1073L16.7043 9.44856ZM14.3179 5.55145L14.6765 6.21017L14.6765 6.21017L14.3179 5.55145ZM3.29572 11.5514L3.6543 12.2102L3.6543 12.2102L3.29572 11.5514ZM5.68209 15.4486L5.32351 14.7898L5.32351 14.7898L5.68209 15.4486ZM14.2333 5.59748L13.8748 4.93876L13.8748 4.93876L14.2333 5.59748ZM5.76666 5.59747L5.40808 6.2562L5.40808 6.2562L5.76666 5.59747ZM14.2333 15.4025L14.5919 14.7438L14.5919 14.7438L14.2333 15.4025ZM5.76666 15.4025L6.12524 16.0613L6.12524 16.0613L5.76666 15.4025ZM9.20453 3.75H10.7954V2.25H9.20453V3.75ZM10.7954 17.25H9.20453V18.75H10.7954V17.25ZM9.20453 17.25C8.69792 17.25 8.36362 16.8732 8.36362 16.5H6.86362C6.86362 17.7836 7.95387 18.75 9.20453 18.75V17.25ZM11.6364 16.5C11.6364 16.8732 11.3021 17.25 10.7954 17.25V18.75C12.0461 18.75 13.1364 17.7836 13.1364 16.5H11.6364ZM10.7954 3.75C11.3021 3.75 11.6364 4.12675 11.6364 4.5H13.1364C13.1364 3.21639 12.0461 2.25 10.7954 2.25V3.75ZM9.20453 2.25C7.95387 2.25 6.86362 3.21639 6.86362 4.5H8.36362C8.36362 4.12675 8.69792 3.75 9.20453 3.75V2.25ZM16.647 13.2088L15.8515 14.5079L17.1307 15.2912L17.9262 13.9921L16.647 13.2088ZM3.35301 7.79117L4.14847 6.49214L2.86925 5.70881L2.07379 7.00785L3.35301 7.79117ZM4.14847 6.49214C4.36924 6.13159 4.8963 5.97761 5.32351 6.21016L6.04067 4.89271C4.94603 4.29684 3.52711 4.63448 2.86925 5.70881L4.14847 6.49214ZM3.6543 8.78983C3.25049 8.57001 3.14947 8.12357 3.35301 7.79117L2.07379 7.00785C1.39869 8.11034 1.81909 9.49866 2.93713 10.1073L3.6543 8.78983ZM15.8515 14.5079C15.6307 14.8684 15.1037 15.0224 14.6765 14.7898L13.9593 16.1073C15.054 16.7032 16.4729 16.3655 17.1307 15.2912L15.8515 14.5079ZM17.9262 13.9921C18.6013 12.8897 18.1809 11.5013 17.0628 10.8927L16.3457 12.2102C16.7495 12.43 16.8505 12.8764 16.647 13.2088L17.9262 13.9921ZM4.14847 14.5079L3.35301 13.2088L2.07379 13.9921L2.86925 15.2912L4.14847 14.5079ZM15.8515 6.49215L16.647 7.79119L17.9262 7.00786L17.1307 5.70883L15.8515 6.49215ZM16.647 7.79119C16.8505 8.12358 16.7495 8.57002 16.3457 8.78984L17.0628 10.1073C18.1809 9.49867 18.6013 8.11035 17.9262 7.00786L16.647 7.79119ZM14.6765 6.21017C15.1037 5.97762 15.6307 6.13161 15.8515 6.49215L17.1307 5.70882C16.4729 4.63449 15.054 4.29685 13.9593 4.89272L14.6765 6.21017ZM3.35301 13.2088C3.14947 12.8764 3.25049 12.43 3.6543 12.2102L2.93713 10.8927C1.81909 11.5013 1.39869 12.8897 2.07379 13.9921L3.35301 13.2088ZM2.86925 15.2912C3.52711 16.3655 4.94603 16.7032 6.04067 16.1073L5.32351 14.7898C4.8963 15.0224 4.36924 14.8684 4.14847 14.5079L2.86925 15.2912ZM14.5919 6.25621L14.6765 6.21017L13.9593 4.89272L13.8748 4.93876L14.5919 6.25621ZM5.32351 6.21016L5.40808 6.2562L6.12524 4.93875L6.04067 4.89271L5.32351 6.21016ZM14.6765 14.7898L14.5919 14.7438L13.8748 16.0612L13.9593 16.1073L14.6765 14.7898ZM5.40808 14.7438L5.32351 14.7898L6.04067 16.1073L6.12524 16.0613L5.40808 14.7438ZM2.93713 10.1073C3.24828 10.2766 3.24828 10.7233 2.93713 10.8927L3.6543 12.2102C5.00922 11.4726 5.00923 9.52739 3.6543 8.78983L2.93713 10.1073ZM6.12524 16.0613C6.45811 15.88 6.86362 16.121 6.86362 16.5H8.36362C8.36362 14.983 6.74048 14.0185 5.40808 14.7438L6.12524 16.0613ZM13.1364 16.5C13.1364 16.121 13.5419 15.88 13.8748 16.0612L14.5919 14.7438C13.2595 14.0185 11.6364 14.983 11.6364 16.5H13.1364ZM17.0628 10.8927C16.7517 10.7233 16.7517 10.2767 17.0628 10.1073L16.3457 8.78984C14.9908 9.5274 14.9908 11.4726 16.3457 12.2102L17.0628 10.8927ZM5.40808 6.2562C6.74048 6.9815 8.36362 6.01702 8.36362 4.5H6.86362C6.86362 4.879 6.45811 5.11995 6.12524 4.93875L5.40808 6.2562ZM13.8748 4.93876C13.5419 5.11996 13.1364 4.879 13.1364 4.5H11.6364C11.6364 6.01703 13.2595 6.98151 14.5919 6.25621L13.8748 4.93876ZM11.75 10.5C11.75 11.4665 10.9665 12.25 10 12.25V13.75C11.7949 13.75 13.25 12.2949 13.25 10.5H11.75ZM10 12.25C9.0335 12.25 8.25 11.4665 8.25 10.5H6.75C6.75 12.2949 8.20507 13.75 10 13.75V12.25ZM8.25 10.5C8.25 9.5335 9.0335 8.75 10 8.75V7.25C8.20507 7.25 6.75 8.70507 6.75 10.5H8.25ZM10 8.75C10.9665 8.75 11.75 9.5335 11.75 10.5H13.25C13.25 8.70507 11.7949 7.25 10 7.25V8.75Z"
            fill="#494C53"
          />
        </svg>
      </button>
      <button className="h-7 w-7 flex items-center justify-center hover:bg-grey2 active:bg-grey3 rounded-[4px]">
        <svg
          width="20"
          height="25"
          viewBox="0 0 20 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 13.75C9.61597 13.75 9.08333 13.3242 9.08333 12.5L7.58333 12.5C7.58333 13.8849 8.54308 15.25 10 15.25L10 13.75ZM9.08333 12.5C9.08333 11.6758 9.61597 11.25 10 11.25L10 9.75C8.54308 9.75 7.58333 11.1151 7.58333 12.5L9.08333 12.5ZM10 11.25C10.384 11.25 10.9167 11.6758 10.9167 12.5L12.4167 12.5C12.4167 11.1151 11.4569 9.75 10 9.75L10 11.25ZM10.9167 12.5C10.9167 13.3242 10.384 13.75 10 13.75L10 15.25C11.4569 15.25 12.4167 13.8849 12.4167 12.5L10.9167 12.5ZM16.6667 13.75C16.2826 13.75 15.75 13.3242 15.75 12.5L14.25 12.5C14.25 13.8849 15.2098 15.25 16.6667 15.25L16.6667 13.75ZM15.75 12.5C15.75 11.6758 16.2826 11.25 16.6667 11.25L16.6667 9.75C15.2098 9.75 14.25 11.1151 14.25 12.5L15.75 12.5ZM16.6667 11.25C17.0507 11.25 17.5833 11.6758 17.5833 12.5L19.0833 12.5C19.0833 11.1151 18.1236 9.75 16.6667 9.75L16.6667 11.25ZM17.5833 12.5C17.5833 13.3242 17.0507 13.75 16.6667 13.75L16.6667 15.25C18.1236 15.25 19.0833 13.8849 19.0833 12.5L17.5833 12.5ZM3.33333 13.75C2.9493 13.75 2.41667 13.3242 2.41667 12.5L0.916668 12.5C0.916668 13.8849 1.87642 15.25 3.33333 15.25L3.33333 13.75ZM2.41667 12.5C2.41667 11.6758 2.9493 11.25 3.33333 11.25L3.33333 9.75C1.87642 9.75 0.916668 11.1151 0.916668 12.5L2.41667 12.5ZM3.33333 11.25C3.71737 11.25 4.25 11.6758 4.25 12.5L5.75 12.5C5.75 11.1151 4.79025 9.75 3.33333 9.75L3.33333 11.25ZM4.25 12.5C4.25 13.3242 3.71737 13.75 3.33333 13.75L3.33333 15.25C4.79025 15.25 5.75 13.8849 5.75 12.5L4.25 12.5Z"
            fill="#131313"
          />
        </svg>
      </button>
    </div>
  );
}

function CourseEditorLayout({ children }) {
  var dispatch = useAppDispatch();
  var router = useRouter();
  var { activeModule, course } = useAppSelector(selectEditableCourse);

  useEffect(
    function fetchCourse() {
      if (router.query?.id && !course?.id) {
        dispatch(getCourseThunk(router.query.id as string));
      }
    },
    [router.query, dispatch]
  );

  useEffect(
    function fetchCourseModule() {
      if (router.query?.id && router.query?.moduleId) {
        dispatch(
          getCourseModuleThunk({
            moduleId: router.query.moduleId as string,
            courseId: router.query?.id as string,
          })
        );
      }
    },
    [router.query, dispatch]
  );

  return (
    <div className="flex">
      <CourseSidebar />

      <div className="w-full">
        <nav className="ml-[240px] w-[calc(100vw-240px)] h-[45px] flex items-center justify-between px-4 py-[18px] border-b border-b-grey5">
          <CourseNavName />
          <CourseInfoAndActions />
        </nav>
        {children}
      </div>
    </div>
  );
}

export default CourseEditorLayout;
