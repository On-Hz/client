interface ButtonProps {
  width?: string;
  text: string;
  py?:string;
  px?:string;
  onClick?: () => void;
}

export const ModalButton = ({ text, width = "auto", py = "14px", px ="80px", onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{ width: width, paddingTop:py,paddingBottom:py, paddingLeft:px, paddingRight:px }}
      className="border border-point rounded-[30px] bg-point text-white
                transform hover:bg-white transition-colors hover:text-point
                max-500:px-0 max-500:py-[10px] max-500:!w-full"
    >
      {text}
    </button>
  );
};
