interface Props {
  height: number;
}

function Spacer({ height }: Props) {
  return <div className={`w-full h-[${height}px]`}></div>;
}

export default Spacer;
