interface Props {
  label: string;
  variant: "regular" | "success" | "error";
  htmlFor?: string;
}

export function FormLabel({ label, variant, htmlFor }: Props) {
  if (variant == "success") var color = "text-success";
  else if (variant == "error") var color = "text-error";
  else var color = "text-text2";

  return (
    <label htmlFor={htmlFor} className={`text-sm ${color}`}>
      {label}
    </label>
  );
}
