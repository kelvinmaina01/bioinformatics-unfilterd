export interface TeamMember {
    name: string;
    role: string;
    description: string;
    image?: string;
}

export const teamMembers: TeamMember[] = [
    {
        name: "Kelvin Maina",
        role: "Founder",
        image: "/founder.jpg",
        description: "Visionary leader driving the mission to connect biomedical talent across Kenya.",
    },
    {
        name: "Sarah Wanjiku",
        role: "Co-Founder",
        image: undefined,
        description: "Strategic thinker ensuring our initiatives align with student and industry needs.",
    },
    {
        name: "David Ochieng",
        role: "Technical Lead",
        image: undefined,
        description: "Architecting the digital infrastructure that powers our community connections.",
    },
    {
        name: "Mercy Njeri",
        role: "Relationship & Community Lead",
        image: undefined,
        description: "Building bridges between students, universities, and partners.",
    },
    {
        name: "Brian Kipkorir",
        role: "Social Media Manager",
        image: undefined,
        description: "Amplifying our voice and engaging our community across digital platforms.",
    },
    {
        name: "Joy Muthoni",
        role: "Events and Outreach",
        image: undefined,
        description: "Orchestrating impactful events that bring the community together.",
    },
];
