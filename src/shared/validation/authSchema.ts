import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, "이메일을 입력해주세요.").email("올바른 이메일 형식이 아닙니다."),
    password: z.string().min(4, "비밀번호는 최소 4자 이상이어야 합니다."),
});

export const validateLogin = (email: string, password: string): string | null => {
    const result = loginSchema.safeParse({ email, password });
    return result.success ? null : result.error.errors[0].message;
};