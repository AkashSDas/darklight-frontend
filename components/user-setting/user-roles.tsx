import { useUser } from "../../lib/hooks.lib";
import { TextBadge } from "../badges";

export default function UserRoles() {
  var { user } = useUser();

  return (
    <section className="w-full flex justify-between items-center gap-2">
      <div className="flex flex-col gap-2 w-full">
        <div>
          <TextBadge variant="regular">🧤</TextBadge>{" "}
          <span className="text-text1">Roles</span>
        </div>

        <p className="text-sm">Permission that you have</p>
      </div>

      <div className="w-full max-w-[300px]">
        <div className="flex flex-wrap gap-2">
          {user?.roles.map((role: string) => (
            <div
              key={role}
              className="text-sm bg-border h-6 px-1 rounded-[7px] flex items-center justify-center"
            >
              {role[0].toUpperCase() + role.slice(1)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
