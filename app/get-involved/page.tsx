// Get Involved page entry point: sets metadata and delegates to GetInvolvedContent which needs 'use client' for its animation hooks.
import GetInvolvedContent from './GetInvolvedContent';

export const metadata = {
  title: 'Get Involved - Health Decoded',
};

export default function GetInvolvedPage() {
  return <GetInvolvedContent />;
}
