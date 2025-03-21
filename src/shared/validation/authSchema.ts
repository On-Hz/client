import { z } from "zod";

//로그인&회원가입
export const authSchema = z.object({
    email: z.string().min(1, "이메일을 입력해주세요.").email("올바른 이메일 형식이 아닙니다."),
    password: z.string().min(4, "비밀번호는 최소 4자 이상이어야 합니다."),
});

export const validateAuth = (email: string, password: string): string | null => {
    const result = authSchema.safeParse({ email, password });
    return result.success ? null : result.error.errors[0].message;
};


//유저정보 변경
export const profileChangeSchema = z.object({
    userName: z.string().min(1, "닉네임을 입력해주세요."),
    password: z.string().min(4, "비밀번호는 최소 4자 이상이어야 합니다."),
    confirm: z.string().min(1, "비밀번호 확인을 입력해주세요."),
  }).refine((data) => data.password === data.confirm, {
    path: ["confirm"], // 에러 메시지를 confirm 필드에 표시
    message: "비밀번호가 일치하지 않습니다.",
});

export const validateProfileChange = ( userName: string, password: string, confirm: string): string | null => {
    const result = profileChangeSchema.safeParse({ userName, password, confirm });
    return result.success ? null : result.error.errors[0].message;
};
  