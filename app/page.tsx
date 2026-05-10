// Home route entry point: delegates rendering to HomeClient (client hero). SEO title/description come from root layout defaults.
import HomeClient from './HomeClient';

export default function HomePage() {
  return <HomeClient />;
}
