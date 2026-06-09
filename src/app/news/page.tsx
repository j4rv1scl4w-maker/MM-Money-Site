import type { Metadata } from 'next';
import { getEmissions } from '@/lib/content';
import EmissionsGrid from '@/components/EmissionsGrid';

export const metadata: Metadata = {
  title: 'Banknotes News — MM·Money',
  description: 'New worldwide banknote emissions from central banks, 2020–2026. Stay up to date with the latest issues.',
};

export default async function BanknotesNews() {
  const emissions = await getEmissions();
  return <EmissionsGrid emissions={emissions} />;
}
