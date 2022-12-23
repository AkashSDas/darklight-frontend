import { TextBadge } from "@components/badges/text";
import { useUser } from "@lib/hooks.lib";

export default function UserRoles(): JSX.Element {
  var { user } = useUser();

  return (
    <section className="w-full flex gap-2 justify-between items-center">
      <div className="w-full flex flex-col gap-2">
        <div>
          <TextBadge variant="regular">🧤</TextBadge>{" "}
          <span className="text-text1">Roles</span>
        </div>

        <p className="text-sm">Permission that you have</p>
      </div>

      <div className="w-full max-w-[300px]">
        <div className="flex gap-2 flex-wrap">
          {user?.roles.map((role: string) => (
            <div
              key={role}
              className="h-6 px-1 text-sm bg-border rounded-[7px] flex items-center justify-center"
            >
              {role[0].toUpperCase() + role.slice(1)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
