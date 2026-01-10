import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { db } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';

interface EventFormData {
    title: string;
    type: 'Webinar' | 'Workshop' | 'Conference' | 'Hackathon';
    date: string;
    time: string;
    location: string;
    description: string;
    image: string;
    registrationLink: string;
}

export default function EventController() {
    const { register, handleSubmit, reset } = useForm<EventFormData>();
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const onSubmit = async (data: EventFormData) => {
        setLoading(true);
        try {
            await addDoc(collection(db, 'events'), {
                ...data,
                status: 'upcoming', // Default to upcoming
                attendees: 0
            });
            toast({ title: 'Success', description: 'Event created successfully!' });
            reset();
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Add New Event</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Event Title</label>
                    <Input {...register('title', { required: true })} placeholder="e.g. Intro to Genomics" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Date</label>
                        <Input type="date" {...register('date', { required: true })} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Time</label>
                        <Input type="text" {...register('time', { required: true })} placeholder="e.g. 2:00 PM EAT" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Type</label>
                        <select {...register('type')} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                            <option value="Webinar">Webinar</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Conference">Conference</option>
                            <option value="Hackathon">Hackathon</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <Input {...register('location', { required: true })} placeholder="e.g. Online or Nairobi" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea {...register('description', { required: true })} placeholder="Short description..." />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <Input {...register('image')} placeholder="https://..." />
                </div>

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Creating...' : 'Create Event'}
                </Button>
            </form>
        </div>
    );
}
