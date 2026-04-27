// Home route entry point: sets page-level metadata and delegates all rendering to HomeClient (a 'use client' component that needs browser APIs for the parallax hero).
import HomeClient from './HomeClient';

export const metadata = {
  title: 'Health Decoded - Empowering Youth Through Health Education',
};

export default function HomePage() {
  return <HomeClient />;
}
