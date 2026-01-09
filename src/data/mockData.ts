// Mock data for Bioinformatics Unfiltered

export interface Member {
  id: string;
  name: string;
  avatar: string;
  skills: string[];
  interests: string[];
  region: string;
  regionFlag: string;
  bio: string;
}

export interface Project {
  id: string;
  title: string;
  goal: string;
  contributors: number;
  tools: string[];
  progress: number;
  status: 'active' | 'completed' | 'planning';
  field: string;
}

export interface Paper {
  id: string;
  title: string;
  field: string;
  unfilteredTake: string;
  fullContent: string;
  author: string;
  date: string;
}

export const members: Member[] = [
  {
    id: '1',
    name: 'Brian Kimani',
    avatar: 'BK',
    skills: ['Biomedical Science', 'Python', 'Data Analysis'],
    interests: ['Infectious diseases', 'Public health'],
    region: 'JKUAT',
    regionFlag: '🇰🇪',
    bio: 'Biomedical Science student at JKUAT. Passionate about applying computational methods to disease research.'
  },
  {
    id: '2',
    name: 'Faith Wanjiku',
    avatar: 'FW',
    skills: ['Medical Lab Sciences', 'R', 'Statistics'],
    interests: ['Clinical diagnostics', 'Hematology'],
    region: 'University of Nairobi',
    regionFlag: '🇰🇪',
    bio: 'Final year Medical Laboratory Sciences student at UoN. Focused on improving diagnostic accuracy in resource-limited settings.'
  },
  {
    id: '3',
    name: 'Kevin Ochieng',
    avatar: 'KO',
    skills: ['Biotechnology', 'Bioinformatics', 'Linux'],
    interests: ['Genomics', 'Agricultural biotech'],
    region: 'Kenyatta University',
    regionFlag: '🇰🇪',
    bio: 'KU Biotechnology student exploring the intersection of genomics and sustainable agriculture.'
  },
  {
    id: '4',
    name: 'Dr. Amina Hassan',
    avatar: 'AH',
    skills: ['Public Health', 'Epidemiology', 'SPSS'],
    interests: ['Disease surveillance', 'Health policy'],
    region: 'Moi University',
    regionFlag: '🇰🇪',
    bio: 'Lecturer at Moi University School of Public Health. Researching infectious disease patterns in Western Kenya.'
  },
  {
    id: '5',
    name: 'Peter Mutua',
    avatar: 'PM',
    skills: ['Biochemistry', 'Lab Techniques', 'Research'],
    interests: ['Drug development', 'Molecular biology'],
    region: 'Egerton University',
    regionFlag: '🇰🇪',
    bio: 'Biochemistry graduate student at Egerton. Working on natural product drug discovery.'
  },
  {
    id: '6',
    name: 'Grace Akinyi',
    avatar: 'GA',
    skills: ['Nursing', 'Community Health', 'Data Collection'],
    interests: ['Maternal health', 'Rural healthcare'],
    region: 'Maseno University',
    regionFlag: '🇰🇪',
    bio: 'Community Health Nursing student passionate about improving healthcare access in underserved communities.'
  },
  {
    id: '7',
    name: 'Samuel Kariuki',
    avatar: 'SK',
    skills: ['Biomedical Engineering', 'MATLAB', 'CAD'],
    interests: ['Medical devices', 'Prosthetics'],
    region: 'TUK',
    regionFlag: '🇰🇪',
    bio: 'Biomedical Engineering student at Technical University of Kenya. Building affordable medical devices for Kenyan hospitals.'
  },
  {
    id: '8',
    name: 'Mary Njeri',
    avatar: 'MN',
    skills: ['Pharmacy', 'Pharmacology', 'Clinical Trials'],
    interests: ['Drug interactions', 'Pharmaceutical research'],
    region: 'Mount Kenya University',
    regionFlag: '🇰🇪',
    bio: 'Pharmacy student at MKU with interests in clinical pharmacology and drug safety monitoring.'
  }
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'OpenGenome Atlas',
    goal: 'Create an open-access, community-curated human genome annotation database',
    contributors: 47,
    tools: ['Python', 'PostgreSQL', 'React', 'Docker'],
    progress: 68,
    status: 'active',
    field: 'Genomics'
  },
  {
    id: '2',
    title: 'AfriSeq Pipeline',
    goal: 'Accessible sequencing analysis pipelines optimized for African genetic diversity',
    contributors: 23,
    tools: ['Nextflow', 'Singularity', 'AWS', 'Bash'],
    progress: 45,
    status: 'active',
    field: 'Population Genetics'
  },
  {
    id: '3',
    title: 'ProteinChat',
    goal: 'LLM-powered natural language interface for protein structure exploration',
    contributors: 12,
    tools: ['PyTorch', 'FastAPI', 'TypeScript', 'WebGL'],
    progress: 32,
    status: 'planning',
    field: 'Structural Biology'
  },
  {
    id: '4',
    title: 'CellVerse',
    goal: 'Interactive 3D visualization platform for single-cell spatial data',
    contributors: 31,
    tools: ['Three.js', 'Rust', 'WebGPU', 'Scanpy'],
    progress: 89,
    status: 'active',
    field: 'Single-cell Biology'
  },
  {
    id: '5',
    title: 'BioEthics Framework',
    goal: 'Open guidelines and toolkits for ethical AI in biomedical research',
    contributors: 56,
    tools: ['Markdown', 'GitHub', 'LaTeX', 'Zotero'],
    progress: 100,
    status: 'completed',
    field: 'Ethics'
  },
  {
    id: '6',
    title: 'MicrobeNet',
    goal: 'Graph neural network for predicting microbial community interactions',
    contributors: 18,
    tools: ['PyTorch Geometric', 'Neo4j', 'Flask', 'D3.js'],
    progress: 56,
    status: 'active',
    field: 'Microbiome'
  },
  {
    id: '7',
    title: 'DrugSeeker',
    goal: 'Open-source virtual screening platform for small molecule drug discovery',
    contributors: 29,
    tools: ['RDKit', 'Docking', 'Kubernetes', 'Vue.js'],
    progress: 72,
    status: 'active',
    field: 'Drug Discovery'
  },
  {
    id: '8',
    title: 'EpiTrack',
    goal: 'Real-time epigenetic clock and aging biomarker analysis toolkit',
    contributors: 14,
    tools: ['R', 'Shiny', 'Bioconductor', 'Docker'],
    progress: 41,
    status: 'active',
    field: 'Epigenetics'
  }
];

export const papers: Paper[] = [
  {
    id: '1',
    title: 'The Reproducibility Crisis in Computational Biology: A Path Forward',
    field: 'Meta-science',
    unfilteredTake: 'Most published bioinformatics methods cannot be reproduced. We need to stop rewarding novelty over reliability.',
    fullContent: 'The field of computational biology faces a significant challenge: the majority of published methods cannot be reliably reproduced by independent researchers. This paper examines the root causes—from inadequate documentation to missing dependencies—and proposes concrete solutions including mandatory containerization, standardized benchmarking datasets, and cultural shifts in how we evaluate scientific contributions.',
    author: 'Community Collective',
    date: '2024-12-15'
  },
  {
    id: '2',
    title: 'Why Your Favorite Aligner Is Probably Wrong',
    field: 'Genomics',
    unfilteredTake: 'Alignment tools optimize for speed, not accuracy. In repetitive regions, most aligners are essentially guessing.',
    fullContent: 'Modern sequence aligners prioritize computational efficiency, often at the cost of accuracy in challenging genomic regions. This analysis reveals systematic biases in popular tools when handling repetitive elements, structural variants, and low-complexity sequences. We argue for a paradigm shift toward accuracy-aware alignment strategies.',
    author: 'Dr. Elena Vasquez',
    date: '2024-11-28'
  },
  {
    id: '3',
    title: 'AI in Drug Discovery: Hype vs. Reality',
    field: 'AI/ML',
    unfilteredTake: 'Most AI drug discovery startups will fail. The biology is harder than the models, and everyone is training on the same bad data.',
    fullContent: 'The pharmaceutical industry has embraced artificial intelligence with unprecedented enthusiasm, yet the gap between promises and delivered therapeutics remains vast. This critical analysis examines why AI approaches frequently fail in drug discovery, from data quality issues to fundamental biological complexity that current architectures cannot capture.',
    author: 'Priya Sharma',
    date: '2024-11-10'
  },
  {
    id: '4',
    title: 'The Hidden Bias in Public Genomics Databases',
    field: 'Population Genetics',
    unfilteredTake: 'Genomic databases are overwhelmingly European. This is not just an ethics problem—it is actively producing bad science.',
    fullContent: 'Analysis of major genomic repositories reveals severe population imbalances that compromise both equity and scientific validity. Variant calling algorithms, polygenic risk scores, and GWAS findings derived from biased datasets may be fundamentally flawed for non-European populations. We present data and propose actionable solutions.',
    author: 'Amara Okonkwo',
    date: '2024-10-22'
  },
  {
    id: '5',
    title: 'Single-Cell Sequencing: When More Data Means Less Understanding',
    field: 'Single-cell Biology',
    unfilteredTake: 'We are generating more single-cell data than we can interpret. The field needs to slow down and think harder.',
    fullContent: 'The explosion of single-cell technologies has created an unprecedented deluge of data. Yet our biological insights have not scaled proportionally. This perspective argues that the community has prioritized data generation over hypothesis testing, and that meaningful progress requires returning to first principles.',
    author: 'Dr. Lars Andersen',
    date: '2024-10-05'
  },
  {
    id: '6',
    title: 'Open Source Bioinformatics: Sustainability and Burnout',
    field: 'Community',
    unfilteredTake: 'The tools you rely on are maintained by exhausted volunteers. This is unsustainable, and the community needs to fund infrastructure.',
    fullContent: 'Critical bioinformatics infrastructure depends on unpaid or underpaid maintainers. Through surveys and interviews, we document the mental health impact and sustainability crisis in open-source bioinformatics. Proposed solutions include institutional support models and community funding mechanisms.',
    author: 'Sofia Mueller',
    date: '2024-09-18'
  },
  {
    id: '7',
    title: 'CRISPR Ethics: What the Hype Machine Ignores',
    field: 'Ethics',
    unfilteredTake: 'Gene editing will create new inequalities. The ethics conversation is too focused on sci-fi scenarios and not enough on access.',
    fullContent: 'Public discourse around CRISPR ethics often centers on hypothetical scenarios while ignoring imminent concerns about equitable access, consent frameworks, and the commercialization of genetic interventions. This paper refocuses the ethical conversation on tractable, near-term challenges.',
    author: 'Marcus Williams',
    date: '2024-09-01'
  },
  {
    id: '8',
    title: 'The Metabolomics Reproducibility Gap',
    field: 'Metabolomics',
    unfilteredTake: 'Most metabolomics studies cannot be compared across labs. Standardization efforts have failed, and we need to start over.',
    fullContent: 'Despite decades of effort, metabolomics remains plagued by irreproducibility. This systematic review quantifies the problem and identifies root causes in sample preparation, instrument calibration, and data processing. We propose a minimal viable standard that prioritizes practical implementation over perfection.',
    author: 'Yuki Tanaka',
    date: '2024-08-14'
  }
];

// World map dot locations (simplified coordinates for visual representation)
export const globalPresence = [
  { id: 1, x: 15, y: 35, region: 'North America' },
  { id: 2, x: 25, y: 40, region: 'North America' },
  { id: 3, x: 20, y: 55, region: 'South America' },
  { id: 4, x: 48, y: 30, region: 'Europe' },
  { id: 5, x: 52, y: 35, region: 'Europe' },
  { id: 6, x: 45, y: 38, region: 'Europe' },
  { id: 7, x: 50, y: 45, region: 'Africa' },
  { id: 8, x: 55, y: 50, region: 'Africa' },
  { id: 9, x: 65, y: 35, region: 'Middle East' },
  { id: 10, x: 72, y: 40, region: 'South Asia' },
  { id: 11, x: 78, y: 35, region: 'East Asia' },
  { id: 12, x: 82, y: 38, region: 'East Asia' },
  { id: 13, x: 85, y: 32, region: 'East Asia' },
  { id: 14, x: 80, y: 55, region: 'Southeast Asia' },
  { id: 15, x: 88, y: 65, region: 'Oceania' }
];
