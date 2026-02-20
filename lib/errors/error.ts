import { ResultPattern } from "@/app/types/types";
export const tryCatchError  = async <T>(fn: () => Promise<T>): Promise<[T | null, Error | null]> => {
    try {
        const result =  await fn();
        return [result, null];
    } catch (error: any) {
        return [null, error];
    }
};
export const tryCatchErrorResult = async <T>(fn: () => Promise<T>): Promise<ResultPattern<T>> => {

    try {
        const result =  await fn();
        return { success: true, data: result };
    } catch (error: any) {
        return { success: false, error };
    }
}
