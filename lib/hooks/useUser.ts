import { useAuth } from "@/app/api/contexts/Auth";
import { supabase } from "../server/supabase";

export const useUser = () => {
    const { startLoading, stopLoading } = useAuth();

    const addUser = async (id: string, email: string, name: string) => {
        startLoading();
        try {
            const { data, error } = await supabase
                .from('users')
                .insert({ id, email, name, created_at: new Date()})
                .select()
                .single();
            if (error) {
                throw new Error('Erro ao criar usuário: ' + error.message);
            }
            return data;
        } finally {
            stopLoading();
        }
    };
    return { addUser };
};