interface InputProps {
    width:string, //ex) 100px 단위까지 입력
    height?:string,
    placeholder?: string,
    value?:string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }

export const InputBox = ({onChange, placeholder="",value="", width, height = "40px"}: InputProps) => {

    return (
        <div className="px-[15px] bg-white border border-gray3 rounded-[8px]"
            style={{
                width:width,
                height:height
            }}
        >
           <input 
                className="w-full h-full text-[14px]"
                value={value} 
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    )
};
  