// Our Story page: renders the subnav and the FeatureSteps component that walks visitors through the four founding milestones of Health Decoded.
import Link from 'next/link';
import { FeatureSteps } from '@/components/ui/feature-section';
import { FadeInSection } from '@/components/motion/fade-in-section';

export const metadata = {
  title: 'Our Story - Health Decoded',
};

export default function OurStoryPage() {
  return (
    <div className="about-page">
      <div className="subnav">
        <Link href="/about/us" className="subnav-link">About Us</Link>
        <Link href="/about/story" className="subnav-link active">Our Story</Link>
        <Link href="/about/team" className="subnav-link">Our Team</Link>
      </div>

      <FadeInSection as="div" className="section section-no-padding" delay={0}>
        <FeatureSteps
          title="Our Story"
          imageHeight="feature-steps-story-image"
          features={[
            {
              step: "Step 1",
              title: "It started with a real gap",
              content:
                "Health Decoded began with an observation that Ruvanthika made early within her own family. Many of her relatives lived in rural India—small villages where clear, reliable health information wasn't easy to access. People often relied on word-of-mouth, guesswork, or whatever limited resources were available, and even simple medical decisions became overwhelming.",
              image:
                "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop",
            },
            {
              step: "Step 2",
              title: "The problem showed up everywhere",
              content:
                "As Ruvanthika grew older and began working in EMS, she noticed similar patterns emerging in her own community. Even in an environment with more hospitals and advanced technology, health information was not distributed equally. A person's ability to understand their care often depended on socioeconomic status, language, or whether anyone had ever taken the time to explain the basics to them.",
              image:
                "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
            },
            {
              step: "Step 3",
              title: "The curriculum gap became obvious",
              content:
                "She also realized something unexpected: she had never received any formal education about how the healthcare system worked either. Despite attending strong schools and learning subjects such as financial literacy, health literacy—something every person needs throughout their life—was never part of the curriculum. This led her to question why healthcare understanding isn't woven into education at every age level. Healthcare is universal; everyone will interact with it, yet young people are rarely taught how to navigate it.",
              image:
                "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2070&auto=format&fit=crop",
            },
            {
              step: "Step 4",
              title: "Health Decoded was created",
              content:
                "This realization ultimately led Ruvanthika to create Health Decoded. Her goal was to build an organization that empowers young people—especially those from under-resourced or multilingual communities—to understand healthcare in a way that feels simple, supportive, and culturally aware. HealthDecoded aims to provide a space where medical information is broken down into something approachable and human, regardless of a student's background or prior knowledge.",
              image:
                "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=2070&auto=format&fit=crop",
            },
          ]}
        />
      </FadeInSection>
    </div>
  );
}
