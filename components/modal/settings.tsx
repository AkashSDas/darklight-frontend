import { ReactElement, useRef, useState } from "react";

import FlatButton from "@components/buttons/flat-button";
import { useOutsideAlerter } from "@hooks/outsider-alerter";
import { useAppDispatch, useAppSelector } from "@hooks/store";
import { verifyEmailThunk } from "@store/auth/thunk";
import { instructorSignupThunk } from "@store/user/thunk";

import ModalBase from "./";

type Setting = "account" | "enrolled-in" | "billing" | "teacher" | "courses";

function SettingsModal({ handleClose }) {
  var { data: user, instructorSignupLoading } = useAppSelector(
    (state) => state.user
  );
  var { verifyEmailLoading } = useAppSelector((state) => state.auth);
  var dispatch = useAppDispatch();
  var [content, setContent] = useState<Setting>("account");

  var wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, function updateDropdownOnOutsideClick() {
    handleClose();
  });

  function SidebarItem({
    children,
    content,
  }: {
    children: ReactElement[];
    content: Setting;
  }) {
    return (
      <div
        onClick={() => setContent(content)}
        className="px-4 py-2 hover:bg-grey3 active:bg-grey4 cursor-pointer flex items-center gap-2"
      >
        {children}
      </div>
    );
  }

  function Sidebar() {
    return (
      <div className="w-[233px] bg-grey1 rounded-tl-xl rounded-bl-xl py-3 flex flex-col">
        <span className="px-4 py-2 font-medium text-grey6">
          {user?.fullName}
        </span>

        <SidebarItem content="account">
          <div className="w-[20px] h-[20px]">
            <img
              className="w-[20px] h-[20px] rounded-full"
              src={user?.profileImage?.URL ?? "/posters/user.svg"}
              alt={user?.fullName}
            />
          </div>
          <div className="text-grey7 -text-body1">My account</div>
        </SidebarItem>

        <div className="h-4"></div>

        <div className="px-4 py-2 font-medium text-grey6 uppercase tracking-[3px] -text-cap">
          Learn
        </div>

        <SidebarItem content="enrolled-in">
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.75 4.66663C11.75 5.08084 12.0858 5.41663 12.5 5.41663C12.9142 5.41663 13.25 5.08084 13.25 4.66663H11.75ZM6.75 4.66663C6.75 5.08084 7.08579 5.41663 7.5 5.41663C7.91422 5.41663 8.25 5.08084 8.25 4.66663H6.75ZM15.8333 10.5V9.74996C15.4191 9.74996 15.0833 10.0857 15.0833 10.5H15.8333ZM15.8333 17.1666H15.0833C15.0833 17.5808 15.4191 17.9166 15.8333 17.9166V17.1666ZM4.16667 10.5H4.91667C4.91667 10.0857 4.58089 9.74996 4.16667 9.74996V10.5ZM4.16667 17.1666V17.9166C4.58089 17.9166 4.91667 17.5808 4.91667 17.1666H4.16667ZM9.16667 8.08329C8.75246 8.08329 8.41667 8.41908 8.41667 8.83329C8.41667 9.24751 8.75246 9.58329 9.16667 9.58329V8.08329ZM10.8333 9.58329C11.2476 9.58329 11.5833 9.24751 11.5833 8.83329C11.5833 8.41908 11.2476 8.08329 10.8333 8.08329V9.58329ZM3.84422 13.1561C3.47024 13.3342 3.31144 13.7818 3.48953 14.1557C3.66761 14.5297 4.11514 14.6885 4.48912 14.5104L3.84422 13.1561ZM15.5109 14.5104C15.8849 14.6885 16.3324 14.5297 16.5105 14.1557C16.6886 13.7818 16.5298 13.3342 16.1558 13.1561L15.5109 14.5104ZM9.16667 5.41663H10.8333V3.91663H9.16667V5.41663ZM15.0833 9.66663V15.5H16.5833V9.66663H15.0833ZM12.5 18.0833H7.5V19.5833H12.5V18.0833ZM4.91667 15.5V9.66663H3.41667V15.5H4.91667ZM7.5 18.0833C6.07327 18.0833 4.91667 16.9267 4.91667 15.5H3.41667C3.41667 17.7551 5.24484 19.5833 7.5 19.5833V18.0833ZM15.0833 15.5C15.0833 16.9267 13.9267 18.0833 12.5 18.0833V19.5833C14.7552 19.5833 16.5833 17.7551 16.5833 15.5H15.0833ZM10.8333 5.41663C13.1805 5.41663 15.0833 7.31942 15.0833 9.66663H16.5833C16.5833 6.49099 14.009 3.91663 10.8333 3.91663V5.41663ZM9.16667 3.91663C5.99103 3.91663 3.41667 6.49099 3.41667 9.66663H4.91667C4.91667 7.31942 6.81946 5.41663 9.16667 5.41663V3.91663ZM9.16667 2.91663H10.8333V1.41663H9.16667V2.91663ZM11.75 3.83329V4.66663H13.25V3.83329H11.75ZM8.25 4.66663V3.83329H6.75V4.66663H8.25ZM10.8333 2.91663C11.3396 2.91663 11.75 3.32703 11.75 3.83329H13.25C13.25 2.4986 12.168 1.41663 10.8333 1.41663V2.91663ZM9.16667 1.41663C7.83198 1.41663 6.75 2.4986 6.75 3.83329H8.25C8.25 3.32703 8.66041 2.91663 9.16667 2.91663V1.41663ZM17.5833 13V15.5H19.0833V13H17.5833ZM16.6667 16.4166H15.8333V17.9166H16.6667V16.4166ZM16.5833 17.1666V10.5H15.0833V17.1666H16.5833ZM17.5833 15.5C17.5833 16.0062 17.1729 16.4166 16.6667 16.4166V17.9166C18.0014 17.9166 19.0833 16.8346 19.0833 15.5H17.5833ZM15.8333 11.25C16.7998 11.25 17.5833 12.0335 17.5833 13H19.0833C19.0833 11.205 17.6283 9.74996 15.8333 9.74996V11.25ZM3.41667 10.5V17.1666H4.91667V10.5H3.41667ZM4.16667 16.4166H3.33334V17.9166H4.16667V16.4166ZM2.41667 15.5V13H0.916672V15.5H2.41667ZM3.33334 16.4166C2.82708 16.4166 2.41667 16.0062 2.41667 15.5H0.916672C0.916672 16.8346 1.99865 17.9166 3.33334 17.9166V16.4166ZM4.16667 9.74996C2.37175 9.74996 0.916672 11.205 0.916672 13H2.41667C2.41667 12.0335 3.20017 11.25 4.16667 11.25V9.74996ZM9.16667 9.58329H10.8333V8.08329H9.16667V9.58329ZM4.48912 14.5104C6.78795 13.4158 8.417 12.9166 10 12.9166C11.583 12.9166 13.2121 13.4158 15.5109 14.5104L16.1558 13.1561C13.788 12.0286 11.917 11.4166 10 11.4166C8.08301 11.4166 6.21206 12.0286 3.84422 13.1561L4.48912 14.5104Z"
              fill="#494C53"
            />
          </svg>

          <div className="text-grey7 -text-body1">Courses enrolled in</div>
        </SidebarItem>

        <SidebarItem content="billing">
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.00001 3.75H15V2.25H5.00001V3.75ZM17.5833 6.33333V14.6667H19.0833V6.33333H17.5833ZM15 17.25H5V18.75H15V17.25ZM2.41667 14.6667V6.33333H0.916672V14.6667H2.41667ZM5 17.25C3.57327 17.25 2.41667 16.0934 2.41667 14.6667H0.916672C0.916672 16.9218 2.74484 18.75 5 18.75V17.25ZM17.5833 14.6667C17.5833 16.0934 16.4267 17.25 15 17.25V18.75C17.2552 18.75 19.0833 16.9218 19.0833 14.6667H17.5833ZM15 3.75C16.4267 3.75 17.5833 4.9066 17.5833 6.33333H19.0833C19.0833 4.07817 17.2552 2.25 15 2.25V3.75ZM5.00001 2.25C2.74484 2.25 0.916672 4.07817 0.916672 6.33333H2.41667C2.41667 4.9066 3.57327 3.75 5.00001 3.75V2.25Z"
              fill="#494C53"
            />
            <path
              d="M1.66667 6.33337V5.58337C1.25246 5.58337 0.916672 5.91916 0.916672 6.33337H1.66667ZM18.3333 6.33337H19.0833C19.0833 5.91916 18.7476 5.58337 18.3333 5.58337V6.33337ZM18.3333 9.66671V10.4167C18.7476 10.4167 19.0833 10.0809 19.0833 9.66671H18.3333ZM1.66667 9.66671H0.916672C0.916672 10.0809 1.25246 10.4167 1.66667 10.4167L1.66667 9.66671ZM1.66667 7.08337H18.3333V5.58337H1.66667V7.08337ZM17.5833 6.33337V9.66671H19.0833V6.33337H17.5833ZM18.3333 8.91671H1.66667V10.4167H18.3333V8.91671ZM2.41667 9.66671V6.33337H0.916672V9.66671H2.41667Z"
              fill="#494C53"
            />
            <path
              d="M6.66667 15.4166C7.08088 15.4166 7.41667 15.0808 7.41667 14.6666C7.41667 14.2524 7.08088 13.9166 6.66667 13.9166V15.4166ZM5 13.9166C4.58579 13.9166 4.25 14.2524 4.25 14.6666C4.25 15.0808 4.58579 15.4166 5 15.4166V13.9166ZM6.66667 13.9166H5V15.4166H6.66667V13.9166Z"
              fill="#494C53"
            />
          </svg>

          <div className="text-grey7 -text-body1">Billing</div>
        </SidebarItem>

        <div className="h-4"></div>

        <div className="px-4 py-2 font-medium text-grey6 uppercase tracking-[3px] -text-cap">
          Workspace
        </div>

        <SidebarItem content="teacher">
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5833 6.33333C12.5833 7.76007 11.4267 8.91667 10 8.91667V10.4167C12.2552 10.4167 14.0833 8.5885 14.0833 6.33333H12.5833ZM10 8.91667C8.57327 8.91667 7.41667 7.76007 7.41667 6.33333H5.91667C5.91667 8.5885 7.74484 10.4167 10 10.4167V8.91667ZM7.41667 6.33333C7.41667 4.9066 8.57327 3.75 10 3.75V2.25C7.74484 2.25 5.91667 4.07817 5.91667 6.33333H7.41667ZM10 3.75C11.4267 3.75 12.5833 4.9066 12.5833 6.33333H14.0833C14.0833 4.07817 12.2552 2.25 10 2.25V3.75ZM15.0833 15.0833C15.0833 15.4516 14.7653 15.987 13.7894 16.4749C12.8583 16.9404 11.5196 17.25 10 17.25V18.75C11.702 18.75 13.28 18.4067 14.4602 17.8165C15.5956 17.2489 16.5833 16.3259 16.5833 15.0833H15.0833ZM10 17.25C8.48036 17.25 7.14166 16.9404 6.21063 16.4749C5.23473 15.987 4.91667 15.4516 4.91667 15.0833H3.41667C3.41667 16.3259 4.40445 17.2489 5.53981 17.8165C6.72002 18.4067 8.29799 18.75 10 18.75V17.25ZM4.91667 15.0833C4.91667 14.715 5.23473 14.1797 6.21063 13.6918C7.14166 13.2262 8.48036 12.9167 10 12.9167V11.4167C8.29799 11.4167 6.72002 11.76 5.53981 12.3501C4.40445 12.9178 3.41667 13.8408 3.41667 15.0833H4.91667ZM10 12.9167C11.5196 12.9167 12.8583 13.2262 13.7894 13.6918C14.7653 14.1797 15.0833 14.715 15.0833 15.0833H16.5833C16.5833 13.8408 15.5956 12.9178 14.4602 12.3501C13.28 11.76 11.702 11.4167 10 11.4167V12.9167Z"
              fill="#494C53"
            />
          </svg>

          <div className="text-grey7 -text-body1">Teacher account</div>
        </SidebarItem>

        <SidebarItem content="courses">
          <svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.33334 11.4167C7.91912 11.4167 7.58334 11.7525 7.58334 12.1667C7.58334 12.5809 7.91912 12.9167 8.33334 12.9167V11.4167ZM11.6667 12.9167C12.0809 12.9167 12.4167 12.5809 12.4167 12.1667C12.4167 11.7525 12.0809 11.4167 11.6667 11.4167V12.9167ZM3.33334 10.4167H16.6667V8.91667H3.33334V10.4167ZM17.5833 11.3333V14.6667H19.0833V11.3333H17.5833ZM15 17.25H5V18.75H15V17.25ZM2.41667 14.6667V11.3333H0.916672V14.6667H2.41667ZM5 17.25C3.57327 17.25 2.41667 16.0934 2.41667 14.6667H0.916672C0.916672 16.9218 2.74484 18.75 5 18.75V17.25ZM17.5833 14.6667C17.5833 16.0934 16.4267 17.25 15 17.25V18.75C17.2552 18.75 19.0833 16.9218 19.0833 14.6667H17.5833ZM16.6667 10.4167C17.1729 10.4167 17.5833 10.8271 17.5833 11.3333H19.0833C19.0833 9.99864 18.0014 8.91667 16.6667 8.91667V10.4167ZM3.33334 8.91667C1.99865 8.91667 0.916672 9.99864 0.916672 11.3333H2.41667C2.41667 10.8271 2.82708 10.4167 3.33334 10.4167V8.91667ZM5.00001 7.08333H15V5.58333H5.00001V7.08333ZM15.9167 8V9.66667H17.4167V8H15.9167ZM4.08334 9.66667V8H2.58334V9.66667H4.08334ZM15 7.08333C15.5063 7.08333 15.9167 7.49374 15.9167 8H17.4167C17.4167 6.66531 16.3347 5.58333 15 5.58333V7.08333ZM5.00001 5.58333C3.66532 5.58333 2.58334 6.66531 2.58334 8H4.08334C4.08334 7.49374 4.49374 7.08333 5.00001 7.08333V5.58333ZM6.66667 3.75H13.3333V2.25H6.66667V3.75ZM14.25 4.66667V6.33333H15.75V4.66667H14.25ZM5.75 6.33333V4.66667H4.25001V6.33333H5.75ZM13.3333 3.75C13.8396 3.75 14.25 4.16041 14.25 4.66667H15.75C15.75 3.33198 14.668 2.25 13.3333 2.25V3.75ZM6.66667 2.25C5.33198 2.25 4.25001 3.33198 4.25001 4.66667H5.75C5.75 4.16041 6.16041 3.75 6.66667 3.75V2.25ZM8.33334 12.9167H11.6667V11.4167H8.33334V12.9167Z"
              fill="#494C53"
            />
          </svg>

          <div className="text-grey7 -text-body1">My courses</div>
        </SidebarItem>
      </div>
    );
  }

  function AccountSettings() {
    return (
      <>
        <div className="-text-intro">Account</div>
        <div className="h-[1px] w-full bg-grey5 rounded-full"></div>
      </>
    );
  }

  function TeacherSettings() {
    return (
      <>
        <div className="-text-intro">Teacher account</div>
        <div className="h-[1px] w-full bg-grey5 rounded-full"></div>
        {user?.roles?.includes("instructor") ? (
          <p className="-text-body1 text-grey7">You are a 👨🏻‍🚀 Teacher now!</p>
        ) : user?.isEmailVerified ? (
          <div className="w-max">
            <FlatButton
              onClick={async () => await dispatch(instructorSignupThunk())}
              size="lg"
              label={
                instructorSignupLoading ? "Signing you up" : "Become a teacher"
              }
            />
          </div>
        ) : (
          <p className="-text-body1 text-grey7">
            Your email is not verified.{" "}
            <span
              onClick={async () =>
                await dispatch(verifyEmailThunk(user?.email || undefined))
              }
              className="text-blue2 cursor-pointer"
            >
              {verifyEmailLoading
                ? "Sending you an email..."
                : "Verify it and activate my account?"}
            </span>
          </p>
        )}
      </>
    );
  }

  function Content() {
    function getContent() {
      if (content == "account") return <AccountSettings />;
      if (content == "teacher") return <TeacherSettings />;
      return null;
    }

    return (
      <div className="flex-grow flex flex-col gap-4 px-14 py-9">
        {getContent()}
      </div>
    );
  }

  return (
    <ModalBase onClick={handleClose}>
      <div
        ref={wrapperRef}
        className="w-[80vw] h-[80vh] bg-grey0 rounded-xl flex"
        onClick={(e) => e.stopPropagation()}
      >
        <Sidebar />
        <Content />
      </div>
    </ModalBase>
  );
}

export default SettingsModal;
