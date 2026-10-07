import Hero from '@/components/ui/Hero';
import MetricsStrip from '@/components/ui/MetricsStrip';
import BentoGrid from '@/components/ui/BentoGrid';
import Proof from '@/components/ui/Proof';
import DownloadBand from '@/components/ui/DownloadBand';

export const metadata = {
  title: 'Earn money online & freelance as a teenager in India | Funngro',
  description: 'Join 70 Lakh+ young Indians building real experience with verified brand campaigns. Instant UPI payouts, zero upfront investment.',
};

export default function Page() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      <BentoGrid />
      <Proof />
      <DownloadBand />
    </>
  );
}
