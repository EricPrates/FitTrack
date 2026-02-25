'use client'

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '@/app/types/types';
import { supabase } from '@/lib/server/supabase';
import { Activity, Dumbbell } from 'lucide-react';
import { useUser } from '@/lib/hooks/useUser';


interface UserContext {
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    isLoggedIn: boolean;
    logout: () => Promise<void>;
    loading: boolean;
    error: string | null;
    startLoading: () => void;
    stopLoading: () => void;
}

export const AuthContext = createContext<UserContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    

    // Verificar sessão ao carregar
    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user as unknown as User);
        } catch (error) {
            console.error('Erro ao verificar sessão:', error);
        } finally {
            setLoading(false);
        }
    };
    const startLoading = () => {
        setLoading(true);
    };
    const stopLoading = () => {
        setLoading(false);
    }

    const login = async (email: string, password: string): Promise<boolean> => {
        setLoading(true);
        setError(null);
        
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) {
                setError(error.message);
                return false;
            }
            setUser(data.user as unknown as User);
         
            return true;
        } catch (err) {
            setError('Erro ao fazer login');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = async (): Promise<void> => {
        setLoading(true);
        try {
            await supabase.auth.signOut();
            setUser(null);
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        } finally {
            setLoading(false);
        }
    };

    const contextValue: UserContext = {
        user,
        login,
        startLoading,
        isLoggedIn: !!user,
        logout,
        loading,
        error,
        stopLoading

    };

    return (
        <>
            {/* Overlay de loading */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90">
                    <div className="text-center space-y-4">
                        <div className="relative">
                            <Dumbbell className="h-12 w-12 text-orange-500 animate-bounce mx-auto" />
                            <div className="absolute -inset-2 border-4 border-orange-200 rounded-full animate-ping"></div>
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-gray-800">Carregando...</p>
                            <p className="text-sm text-gray-600 mt-1">Preparando sua experiência</p>
                        </div>
                        <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden mx-auto">
                            <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-[loading_1.5s_ease-in-out_infinite]"></div>
                        </div>
                    </div>
                </div>
            )}
            <AuthContext.Provider value={contextValue}>

                {children}
            </AuthContext.Provider>
        </>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de AuthProvider');
    }
    return context;
};