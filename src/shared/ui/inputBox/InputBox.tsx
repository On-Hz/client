interface InputProps {
    width:string, //ex) 100px 단위까지 입력
    height?:string,
    placeholder?: string,
  }

export const InputBox = ({placeholder="", width, height = "40px"}: InputProps) => {
    return (
        <div className="px-[15px] bg-white border border-gray3 rounded-[8px]"
            style={{
                width:width,
                height:height
            }}
        >
           <input className="w-full h-full" placeholder={placeholder}/>
        </div>
    )
};
  