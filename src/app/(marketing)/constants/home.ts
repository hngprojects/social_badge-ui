import { BadgeState, BadgeStyle } from '../types/badge';
import { Testimonial } from '../types/home';
import { StepItem } from '../types/home';

export const BADGE_COLORS = ['#E8441A', '#1A1A1A', '#F5C542', '#4ECDC4', '#A78BFA', '#3B82F6', '#E5E7EB'];
export const TEXT_COLORS = ['#E8441A', '#1A1A1A', '#F5C542', '#4ECDC4', '#A78BFA', '#3B82F6', '#ffffff'];

export const DECORATIVE_DOT_PATTERN = [
  [1, 0, 1],
  [0, 1, 0],
  [1, 0, 1],
] as const;

export const STYLES: { value: BadgeStyle; label: string }[] = [
  { value: 'classic', label: 'Classic' },
  { value: 'centered', label: 'Centered' },
  { value: 'banner', label: 'Banner' },
];

export const INITIAL_STATE: BadgeState = {
  photo: null,
  photoPreview: '',
  name: '',
  role: '',
  event: '',
  hashtag: '',
  style: 'classic',
  badgeColor: '#E8441A',
  textColor: '#ffffff',
};

export const trustedBy = [
  'DEVCON BERLIN',
  'LAGOS UX WEEK',
  'HACK THE BAY',
  'THE AI SUMMIT',
  'FOUNDERSHQ',
  'FRONTEND NATION ',
];

export const FEATURES = [
  {
    id: '01',
    title: 'Unique badge builder',
    image: '/assets/landing-page/feature-1.png',
    description:
      'Every keystroke reflects instantly on the canvas. High-fidelity rendering ensures what you see is exactly what they share.',
  },
  {
    id: '02',
    title: 'Real-time live preview',
    image: '/assets/landing-page/feature-2.png',
    description:
      'Changes appear instantly as organizers customize names, photos, and layouts, making every badge feel polished before it goes live.',
  },
  {
    id: '03',
    title: 'One-click social sharing',
    image: '/assets/landing-page/feature-3.png',
    description:
      'Changes appear instantly as organizers customize names, photos, and layouts, making every badge feel polished before it goes live.',
  },
  {
    id: '04',
    title: 'Comprehensive analytics',
    image: '/assets/landing-page/feature-4.png',
    imageWidth: 3808,
    imageHeight: 3348,
    description:
      "Track badge views, shares, clicks, and engagement insights in real time to understand what's driving event visibility.",
  },
];

export const faqData = [
  {
    id: 'item-1',
    question: 'Do participants need to sign up?',
    answer:
      'No. Only the event organizers are required to sign up. Participants can click the badge link, add their name and photo, and get their badge without signing up at all',
  },
  {
    id: 'item-2',
    question: 'Is it free?',
    answer:
      'Yes, Social Badge is completely free to use. Organisers can create and publish badge templates, and participants can generate and share their badges all at no cost.',
  },
  {
    id: 'item-3',
    question: 'Can I customise the badge?',
    answer:
      'Yes. Organisers can upload their logo, set their event name, choose a colour style, and write the caption that participants share.',
  },
  {
    id: 'item-4',
    question: 'Where can people share it?',
    answer:
      'Anywhere. Badges can be shared directly to LinkedIn, Instagram, and Twitter/X, or downloaded and posted wherever you like (WhatsApp, email, Telegram).',
  },
  {
    id: 'item-5',
    question: 'Will it embed on my event page?',
    answer: 'Yes. Our embed code integrates seamlessly with any event page or website platform.',
  },
  {
    id: 'item-6',
    question: 'Do I need design skills?',
    answer:
      'Absolutely not. Social Badge is created with non designers in mind and built around pre-design templates. Pick one, fill in your details and it is ready to share!',
  },
];

export const BENEFITS_DATA = [
  {
    title: "Looks designed",
    desc: "Polished output that’s worth posting — without opening Photoshop or Canva.",
  },
  {
    title: "Done in 60 seconds",
    desc: "Type, upload, share. No accounts, no friction. Mobile-first by design.",
  },
  {
    title: "Signals belonging",
    desc: "Speaker badges, finalist badges, member badges — built-in social proof.",
  },
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote:
      "We replaced three weeks of paid social with a single badge link in the confirmation email. Reg traffic in the final week tripled. I'm not going back.",
    author: 'Sade Olusegun',
    role: 'Marketing Lead',
    company: 'Lagos UX Week',
    initials: 'SO',
  },
  {
    id: '2',
    quote:
      'The fact that the OG preview is the actual badge is the unlock. Every share looks designed. Every click is tracked. It just works.',
    author: 'Marcus Klein',
    role: 'Producer',
    company: 'DevCon Berlin',
    initials: 'MK',
  },
  {
    id: '3',
    quote:
      'This completely transformed how we approach event marketing. The simplicity is deceptive – behind it is sophisticated tracking and analytics.',
    author: 'Elena Rodriguez',
    role: 'Event Director',
    company: 'Tech Summit Madrid',
    initials: 'ER',
  },
  {
    id: '4',
    quote:
      'Our attendee engagement metrics skyrocketed. What used to take weeks of campaigns now happens organically through shared badges.',
    author: 'David Chen',
    role: 'Head of Growth',
    company: 'Startup Connect',
    initials: 'DC',
  },
];




 export const steps: StepItem[] = [
    { id: 'step-1', stepNumber: 'STEP 01', title: 'Design Template' },
    { id: 'step-2', stepNumber: 'STEP 02', title: 'Generate Template' },
    { id: 'step-3', stepNumber: 'STEP 03', title: 'Share Link' },
  ];