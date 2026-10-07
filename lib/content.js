export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || '#download';
export const BRAND_URL = process.env.NEXT_PUBLIC_BRAND_URL || '#brands';

export const stages = [
  { n: '01', title: 'First income', range: 'From ₹1K a month', body: 'Start with micro-tasks, surveys and app tests. Your first payout lands straight in your UPI account.' },
  { n: '02', title: 'Multiply & influence', range: 'Income grows with your reach', body: 'Edit videos, create content and promote brands to your own audience. Better work unlocks bigger projects.' },
  { n: '03', title: 'Micro-business', range: 'Up to ₹15K+ a month', body: 'Take on repeat campaigns and run your freelancing like a small business, with brands that rebook you.' },
];

// SAMPLE tasks for the interactive card. Swap for real task types / pay bands.
export const tasks = [
  { id: 't1', title: 'Test a food-delivery app', meta: '12 min', pay: 120 },
  { id: 't2', title: 'Answer a brand survey', meta: '4 min', pay: 40 },
  { id: 't3', title: 'Share a campaign post', meta: '2 min', pay: 25 },
];

// PLACEHOLDER testimonials. Replace with real, consented member quotes before launch.
export const testimonials = [
  { quote: 'I cut my first reel for a brand between classes. The payout reached my UPI the next day.', name: 'Aarav', meta: '17, Pune' },
  { quote: 'Surveys got me started. Now I edit videos for campaigns and save for my own laptop.', name: 'Meher', meta: '16, Jaipur' },
  { quote: 'Real brief, real deadline, real money. It looks better on my portfolio than any school project.', name: 'Kabir', meta: '18, Lucknow' },
  { quote: 'I told my parents it was legit when the brand name showed up on the campaign page.', name: 'Ishita', meta: '17, Indore' },
];

export const timeline = [
  { year: '2022', title: 'Founded, first version grows', body: 'Payal Jain and Anik Jain launch Funngro and grow the first version of the app with young freelancers.' },
  { year: 'Late 2022', title: 'Shark Tank India, Season 2', body: 'Funngro closes a deal on the show, backed by Amit Jain and Namita Thapar.' },
  { year: '2023–2025', title: '1 million to 3 million+ users', body: 'The community grows past 3 million members and the app earns a top-tier ranking on Google Play.' },
  { year: '2026', title: '70 lakh+ active young people', body: 'More than 70 lakh active youth, 5,000+ corporate brands, and profitable in 10 of the last 12 months.' },
];

// TODO: swap in approved bios and real LinkedIn URLs.
export const founders = [
  { name: 'Payal Jain', initials: 'PJ', role: 'Co-founder', bio: 'IIM alumna. Co-founded Funngro in 2022 to give young Indians a way to earn, learn and build a portfolio before they graduate.', linkedin: '#' },
  { name: 'Anik Jain', initials: 'AJ', role: 'Co-founder', bio: 'IIM alumnus. Co-founded Funngro in 2022 and works with brands to turn real campaigns into paid projects for teenagers.', linkedin: '#' },
];
