import { getEmissions, toEmissionCard } from '@/lib/content';
import EmissionsGrid from '@/components/EmissionsGrid';

export default async function BanknotesNews() {
  const emissions = await getEmissions();
  return <EmissionsGrid emissions={emissions.map(toEmissionCard)} />;
}
