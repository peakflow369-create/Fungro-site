import AboutHero from '@/components/ui/AboutHero';
import Timeline from '@/components/ui/Timeline';
import Founders from '@/components/ui/Founders';
import BrandBanner from '@/components/ui/BrandBanner';

export const metadata = {
  title: 'About Funngro | Empowering Gen-Z talent & teen freelancers',
  description: 'Founded in 2022 by Payal Jain and Anik Jain to democratize youth work in India. Backed on Shark Tank India Season 2.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Timeline />
      <Founders />
      <BrandBanner />
    </>
  );
}
