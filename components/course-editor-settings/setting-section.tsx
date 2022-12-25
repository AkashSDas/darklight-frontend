import { TextBadge } from "@components/shared/text-badge";

interface Props {
  emoji: string;
  title: string;
  description: string;
  children: JSX.Element;
}

export default function SettingSection(props: Props): JSX.Element {
  return (
    <section className="w-full flex justify-between items-center gap-2">
      <div className="w-full flex flex-col gap-2">
        <div>
          <TextBadge variant="regular">{props.emoji}</TextBadge>{" "}
          <span className="text-text1">{props.title}</span>
        </div>

        <p className="text-sm">{props.description}</p>
      </div>

      <div className="max-w-[300px] flex items-center justify-end w-full">
        {props.children}
      </div>
    </section>
  );
}
