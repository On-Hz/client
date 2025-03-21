interface InputProps {
    width:string, //ex) 100px 단위까지 입력
    height?:string,
    placeholder?: string,
    value?:string,
    type?:string,
    name?:string,
    disabled?:boolean,
    onChange?:(e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?:(e: React.ChangeEvent<HTMLInputElement>) => void;
  }

export const InputBox = ({onChange,onBlur,disabled=false, placeholder="",value="",type="text", name="", width, height = "35px"}: InputProps) => {

    return (
        <div 
            className={
                `px-[10px] border border-gray3 rounded-[5px] ${ 
                    disabled ? "bg-gray3" : ""
                }`
            }
            style={{
                width:width,
                height:height
            }}
        >
           <input 
                className="w-full h-full text-[14px]"
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                disabled={disabled}
            />
        </div>
    )
};
  