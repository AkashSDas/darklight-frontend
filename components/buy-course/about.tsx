import { useBuyCourse } from "@lib/hooks.lib";

export default function About(): JSX.Element {
  var { info } = useBuyCourse();

  function SkillBadge({ skill }: { skill: string }) {
    return (
      <span className="px-[10px] h-[32px] flex items-center justify-center bg-background3 rounded-xl">
        {skill[0].toUpperCase() + skill.slice(1)}
      </span>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-gilroy text-[25px] font-extrabold text-text1">
        About
      </h2>

      <p className="leading-[140%]">{info?.description}</p>

      {/* Skills you'll gain */}
      <div className="flex flex-col gap-3">
        <div className="text-[18px]">🧰 Skills {"you'll"} gain</div>

        <div className="flex gap-3">
          {info?.tags.map((tag: string) => (
            <SkillBadge key={tag} skill={tag} />
          ))}
        </div>
      </div>
    </section>
  );
}
