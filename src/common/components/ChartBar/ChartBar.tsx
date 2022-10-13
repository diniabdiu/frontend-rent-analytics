
interface ChatBarProp {
  firstValue: number;
  secondValue: number;
  title: string;
}

const ChartBar = ({ firstValue, secondValue, title }: ChatBarProp) => {
  return (
    <span className=" flex-1 justify-end h-full min-w-[10px] max-w-[15px] gap-2 flex-col flex text-center">
      <div className="h-full flex justify-end items-end relative">
        <span
          className="cursor-pointer absolute bottom-0 left-0 rounded-2xl transition-all duration-300 w-[90%] max-h-full overflow-hidden"
          style={{ height: `${firstValue}%` }}
        >
          <div
            className={'w-full h-full bg-gradient-to-b from-yellow-500 to-yellow-400'}
          />
        </span>
        <span
          className="absolute transform translate-x-1/2 bottom-0 left-0 cursor-pointer rounded-2xl transition-all duration-300 w-full max-h-full overflow-hidden"
          style={{ height: `${secondValue}%` }}
        >
          <div
            className={'w-full h-full bg-gradient-to-b from-[#287482] to-[#2EA1B6]'}
          />
        </span>
      </div>
      <div className="font-semibold text-gray-primary text-base">{title}</div>
    </span>
  );
};

export default ChartBar;
