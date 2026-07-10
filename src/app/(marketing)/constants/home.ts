import { BadgeState, BadgeStyle } from '../types/badge';
import { Testimonial } from '../types/home';
import { StepItem } from '../types/home';

export const BADGE_COLORS = [ '#1A1A1A', '#F5C542', '#4ECDC4', '#A78BFA', '#3B82F6', '#E5E7EB'];
export const TEXT_COLORS = [ '#1A1A1A', '#F5C542', '#4ECDC4', '#A78BFA', '#3B82F6', '#ffffff'];

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
  badgeColor: '#3B82F6',
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
    question: 'How long does it take to set up a badge?',
    answer:
      'For a new template built from a starter, most organisers are live in under 10 minutes. Starting from scratch, give yourself 20–30 minutes if you\'re particular about typography and layout. Participants generate their personalised badge in well under a minute.',
  },
  {
    id: 'item-2',
    question: 'Can I gate access by email?',
    answer:
      'Yes. On Pro and Team plans, you can restrict badge generation to a specific list of verified email addresses — so only your actual attendees or cohort members can access the link. Free plan links are open by default.',
  },
  {
    id: 'item-3',
    question: 'What about content moderation?',
    answer:
      'Participant names and photos are submitted directly through your badge link. FlareTag does not host or expose participant content publicly. Badges are generated on-demand and downloaded directly — they are never stored in a public gallery. If you have specific moderation concerns for a large event, the Team plan includes controls worth discussing with us directly.',
  },
  {
    id: 'item-4',
    question: 'Can I use my own fonts and colours?',
    answer:
      'Yes. Pro and Team plans give you full colour customisation and the ability to upload brand assets including logos. Font options come from a curated set of professional typefaces — custom font upload is on the roadmap.',
  },
  {
    id: 'item-5',
    question: 'Will it embed on my event page?',
    answer:
      'Direct embed is on the roadmap. For now, your badge link works as a standalone page — most organisers drop it in their confirmation email, event WhatsApp group, or registration follow-up. That\'s where participation rates are highest anyway.',
  },
  {
    id: 'item-6',
    question: 'What happens if I downgrade?',
    answer:
      'Your published templates remain accessible. If your active campaigns exceed the limit of your new plan, you\'ll be asked to archive down to the allowed number before your next billing cycle. No content is deleted automatically — you always choose what stays.',
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