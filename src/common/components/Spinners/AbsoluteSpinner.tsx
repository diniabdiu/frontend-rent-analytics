import { ReactElement } from 'react';

interface Props {
  show?: boolean;
}

const AbsoluteSpinner = ({ show = false }: Props): ReactElement => {
  if (!show) return <></>;
  return (
    <div className="z-50 top-0 left-0 right-0 bottom-0 absolute flex align-middle items-center justify-center">
      <div className="top-0 left-0 right-0 bottom-0 absolute bg-gray-200 opacity-70" />
      <div className="flex justify-center items-center">
        <div className="flex items-center justify-center space-x-2 animate-pulse">
          <div
            style={{ borderTopColor: 'transparent' }}
            className="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AbsoluteSpinner;
