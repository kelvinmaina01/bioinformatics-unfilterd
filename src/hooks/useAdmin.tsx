import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onIdTokenChanged, User } from 'firebase/auth';

export const useAdmin = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        // Failsafe: If firebase takes too long, stop loading
        timeoutId = setTimeout(() => {
            if (loading) {
                console.warn("useAdmin: Auth check timed out after 10s");
                setLoading(false);
            }
        }, 10000);

        const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    const tokenResult = await currentUser.getIdTokenResult();
                    console.log("useAdmin: Claims", tokenResult.claims);
                    setIsAdmin(!!tokenResult.claims.admin);
                } catch (error) {
                    console.error("Error checking admin status:", error);
                    setIsAdmin(false);
                }
            } else {
                console.log("useAdmin: No user");
                setIsAdmin(false);
            }
            setLoading(false);
            clearTimeout(timeoutId);
        });

        return () => {
            unsubscribe();
            clearTimeout(timeoutId);
        };
    }, []);

    return { isAdmin, loading, user };
};
