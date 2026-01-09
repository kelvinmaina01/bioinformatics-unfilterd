export interface Event {
    id: string;
    title: string;
    type: 'Conference' | 'Workshop' | 'Meetup' | 'Hackathon' | 'Webinar';
    date: string;
    time: string;
    location: string;
    description: string;
    longDescription: string;
    image: string;
    organizers: {
        name: string;
        role: string;
        image?: string;
    }[];
    status: 'upcoming' | 'past';
    rsvpLink?: string;
}

export const events: Event[] = [
    // Upcoming Events
    {
        id: '1',
        title: 'Bioinformatics Unfiltered Hackathon 2026',
        type: 'Hackathon',
        date: 'Mar 14, 2026',
        time: '8:00 AM - 5:30 PM (GMT+3)',
        location: 'iPIC Building, JKUAT, Juja',
        description: 'Join us for the inaugural Bioinformatics Unfiltered Hackathon. This event promises to be an exciting, beginner-friendly competition.',
        longDescription: `Join us for the inaugural Bioinformatics Unfiltered Hackathon on March 14th, 2026 at the iPIC Building. This event promises to be an exciting, beginner-friendly competition designed to immerse undergraduate and postgraduate students in the dynamic world of data science and AI.
    
    Our theme, 'Building Practical Systems with Data and AI,' targets students from all disciplines to work collaboratively in teams of 3–5. Participants will tackle industry-inspired challenges emphasizing insight generation, decision-making, and the creation of simple but effective AI systems.
    
    Expand your skills in data analysis, prediction, and system design while embracing ethical and human-centered AI practices. The Hackathon offers a structured, tiered challenge system catering to all skill levels, from novices to seasoned data enthusiasts, to ensure engaging learning experiences. Don't miss out on this chance to learn, compete, and network with like-minded peers!`,
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=2940', // Team collaboration
        status: 'upcoming',
        organizers: [
            { name: 'Christine Oyiera', role: 'Organizer' },
            { name: 'Paul Mwangi', role: 'Co-Organizer' },
            { name: 'Peaches Njenga', role: 'UI/UX Lead' },
            { name: 'Phil Karema', role: 'DevOps Track Lead' }
        ]
    },
    {
        id: '2',
        title: 'Genomics in Cloud: AWS & Nextflow',
        type: 'Workshop',
        date: 'Apr 05, 2026',
        time: '2:00 PM - 4:00 PM (GMT+3)',
        location: 'Virtual (Google Meet)',
        description: 'Learn how to scale your genomic workflows using Nextflow on AWS cloud infrastructure.',
        longDescription: 'This hands-on workshop will guide you through the basics of cloud computing for bioinformatics. We will cover setting up AWS instances, installing Nextflow, and running a sample RNA-seq pipeline. Ideal for students and researchers looking to move beyond local compute limitations.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2944', // Cloud/Tech
        status: 'upcoming',
        organizers: [
            { name: 'David Ochieng', role: 'Technical Lead' }
        ]
    },

    // Past Events
    {
        id: '3',
        title: 'Classification Models & Model Evaluation',
        type: 'Conference',
        date: 'Dec 18, 2025',
        time: '10:00 AM',
        location: 'Juja, Kenya',
        description: 'A deep dive into ML classification metrics.',
        longDescription: '...',
        image: '',
        status: 'past',
        organizers: []
    },
    {
        id: '4',
        title: 'The Grand Wrap-up: IoT to Robot Showdown',
        type: 'Meetup',
        date: 'Dec 18, 2025',
        time: '2:00 PM',
        location: 'Juja, Kenya',
        description: 'End of year community showcase.',
        longDescription: '...',
        image: '',
        status: 'past',
        organizers: []
    },
    {
        id: '5',
        title: 'Inside Modern Robotics',
        type: 'Webinar',
        date: 'Dec 16, 2025',
        time: '4:00 PM',
        location: 'Virtual',
        description: 'Expert talk and real-time simulation.',
        longDescription: '...',
        image: '',
        status: 'past',
        organizers: []
    },
    {
        id: '6',
        title: 'Unveiling the Startup Journey',
        type: 'Webinar',
        date: 'Dec 10, 2025',
        time: '7:00 PM',
        location: 'Virtual',
        description: 'A chat with various founders in the biotech space.',
        longDescription: '...',
        image: '',
        status: 'past',
        organizers: []
    }
];
