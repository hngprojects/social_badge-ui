import { Plan, ComparisonRow, FaqItem } from '../types/pricing';

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: 'Best for small or one-time events',
    cta: 'Get Started Free',
    ctaVariant: 'outline',
    popular: false,
    features: [
      '1 active badge campaign',
      'Basic badge templates',
      'Shareable link',
      'Limited customization',
      'Watermark included',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 30,
    yearlyPrice: 24,
    description: 'For growing teams and organizers',
    cta: 'Upgrade to Pro',
    ctaVariant: 'primary',
    popular: true,
    features: [
      'Up to 5 active campaigns',
      'Premium templates',
      'Shareable link',
      'Advanced customization',
      'Basic analytics',
      'Custom link / URL',
      'Watermark removed',
    ],
  },
  {
    id: 'team',
    name: 'Team',
    monthlyPrice: 50,
    yearlyPrice: 40,
    description: 'For large events and organizations',
    cta: 'Upgrade to Team',
    ctaVariant: 'outline',
    popular: false,
    features: [
      'Unlimited active campaigns',
      'All templates + custom upload',
      'Shareable link',
      'Full branding & customization',
      'Advance dashboard & analytics',
      'Custom link / URL',
      'API access & integrations',
      'Watermark removed',
    ],
  },
];

export const FAQ_DATA: FaqItem[] = [
  {
    question: 'What is a badge campaign?',
    answer:
      'A badge campaign is a single setup where you create a badge design and share it with others so they can generate and download their own badges.',
    defaultOpen: true,
  },
  {
    question: 'Can I upgrade or downgrade anytime?',
    answer:
      'Yes, you can change your plan at any time. Changes take effect immediately and billing is prorated.',
  },
  {
    question: 'Do I need to pay for people creating badges?',
    answer:
      "No. Your plan covers your campaigns. The people who use your campaign link to create their own badges don't need an account or a paid plan.",
  },
  {
    question: 'Will my badges have watermark?',
    answer:
      'Badges on the Free plan include a Social Badge watermark. Upgrading to Pro or Team removes the watermark entirely.',
  },
  {
    question: 'Can I customize my badge design?',
    answer:
      'Yes. Pro and Team plans unlock advanced customization options including custom fonts, colors, layouts, and brand assets.',
  },
  {
    question: 'Can I use my own logo?',
    answer:
      'Team plan users can upload custom assets including their own logo. Pro plan users have access to advanced customization within our template system.',
  },
  {
    question: 'Is there a limit to how many people can create badges?',
    answer:
      'There is no limit on the number of people who can create badges from your campaign link, regardless of plan.',
  },
  {
    question: 'Do you offer refunds?',
    answer:
      'We offer a 7-day money-back guarantee on paid plans. Contact support within 7 days of your purchase for a full refund.',
  },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'Active badge campaign',
    free: '1',
    pro: 'Up to 5',
    team: 'Unlimited',
  },
  {
    feature: 'Basic badge template',
    free: 'Basic',
    pro: 'Premium templates',
    team: 'All templates + custom',
  },
  {
    feature: 'Shareable link',
    free: 'check',
    pro: 'check',
    team: 'check',
  },
  {
    feature: 'Customization',
    free: 'Basic',
    pro: 'Advanced',
    team: 'Full branding',
  },
  {
    feature: 'Analytics',
    free: '—',
    pro: 'Basic stats',
    team: 'Advanced dashboard',
  },
  {
    feature: 'Custom link/URL',
    free: 'cross',
    pro: 'check',
    team: 'check',
  },
  {
    feature: 'Watermark',
    free: 'Included',
    pro: 'Removed',
    team: 'Removed',
  },
];
