import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';

interface BlogFormData {
    title: string;
    excerpt: string;
    content: string;
    image: string;
    readTime: string;
    url: string; // External Medium link or internal slug? Let's assume URL for now as per current data model
}

export default function BlogController() {
    const { register, handleSubmit, reset } = useForm<BlogFormData>();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { user } = useAuth();

    const onSubmit = async (data: BlogFormData) => {
        setLoading(true);
        try {
            await addDoc(collection(db, 'blogs'), {
                ...data,
                author: user?.name,
                authorAvatar: user?.avatar,
                date: new Date().toISOString().split('T')[0],
                tags: ['General'], // Default tag for now
                likes: 0
            });
            toast({ title: 'Success', description: 'Blog post published!' });
            reset();
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Publish New Blog</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <Input {...register('title', { required: true })} placeholder="Article Header" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Excerpt</label>
                    <Textarea {...register('excerpt', { required: true })} placeholder="Short summary..." />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <Input {...register('image')} placeholder="https://..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Read Time</label>
                        <Input {...register('readTime')} placeholder="e.g. 5 min" defaultValue="5 min" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">External URL (Optional)</label>
                        <Input {...register('url')} placeholder="https://medium.com/..." />
                    </div>
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Publishing...' : 'Publish Blog'}
                </Button>
            </form>
        </div>
    );
}
