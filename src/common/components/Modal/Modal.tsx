import {
  ReactElement,
  ReactNode,
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from 'react';


// Interfaces
interface Props {
  className?: string;
  children: ReactElement | ReactNode;
  title: string;
}

type ModalHandle = {
  show: () => void;
  hide: () => void;
};

const Modal: ForwardRefRenderFunction<ModalHandle, Props> = (
  { className = '', children, title }: Props,
  ref
): ReactElement | null => {
  const [show, setShow] = useState(false);

  // Handlers
  const handleShow = () => {
    setShow(true);
  };

  const handleHide = () => {
    setShow(false);
  };

  // Ref interface
  useImperativeHandle(ref, () => ({
    show: handleShow,
    hide: handleHide,
  }));

  // Renderers
  if (!show) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 z-[100] h-screen w-screen p-10 ${className}`}
    >
      <div className="fixed bg-white right-0 bottom-1/2 top-1/2 left-0 z-[101] mx-auto h-fit max-w-[500px] -translate-y-1/2 transform rounded-2xl bg-white-900 p-4 lg:w-10/12 lg:p-7">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl.5 md:text-4xl.5">{title}</h1>
          </div>
          <div>
            <span
              onClick={handleHide}
              className="cursor-pointer text-2xl text-primary md:text-2xl.5"
            >
              Close
            </span>
          </div>
        </div>
        <hr className="my-5" />
        <div className="h-55vh overflow-hidden overflow-y-auto">{children}</div>
      </div>
      <span
        onClick={handleHide}
        className="absolute top-0 bottom-0 left-0 right-0 h-full w-full bg-black bg-opacity-5"
      />
    </div>
  );
};

export default forwardRef(Modal);
