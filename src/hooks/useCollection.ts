import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, Query, query, CollectionReference, DocumentData } from 'firebase/firestore';

export function useCollection<T = DocumentData>(collectionName: string, queryBuilder?: (ref: CollectionReference) => Query) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        try {
            const ref = collection(db, collectionName);
            const q = queryBuilder ? queryBuilder(ref) : query(ref);

            const unsubscribe = onSnapshot(q, (snapshot) => {
                const results: T[] = [];
                snapshot.docs.forEach((doc) => {
                    results.push({ id: doc.id, ...doc.data() } as T);
                });
                setData(results);
                setLoading(false);
            }, (err) => {
                console.error("Error fetching collection:", err);
                setError(err.message);
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    }, [collectionName]);

    return { data, loading, error };
}
