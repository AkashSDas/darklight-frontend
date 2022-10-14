function FormLabel({ label, htmlFor }: { label: string; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="-text-body font-medium text-grey7">
      {label}
    </label>
  );
}

export default FormLabel;
