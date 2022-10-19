interface Props {
  height: number;
}

function Divider({ height }: Props) {
  return <div className={`w-full h-[${height}px] rounded-full bg-grey5`}></div>;
}

export default Divider;
