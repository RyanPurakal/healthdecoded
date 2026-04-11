import ProgramsFeatureSections from '@/components/ui/feature-sections';

export const metadata = {
  title: 'Our Programs - Health Decoded',
};

export default function ProgramsPage() {
  return (
    <div className="programs-page min-h-screen bg-slate-50">
      <ProgramsFeatureSections />
    </div>
  );
}
