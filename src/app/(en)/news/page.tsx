import { getEmissions, toEmissionCard } from '@/lib/content';
import EmissionsGrid from '@/components/EmissionsGrid';
import { responsiveSource } from '@/lib/responsive-image';

export default async function BanknotesNews() {
  const emissions = await getEmissions();
  return (
    <EmissionsGrid
      emissions={emissions.map((emission) => ({
        ...toEmissionCard(emission),
        image: responsiveSource(emission.imageUrl),
      }))}
    />
  );
}
