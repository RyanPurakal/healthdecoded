// Past events shown on /events as a scrollable row.
// Photos live in public/images/events/ig/<shortcode>.jpg (saved from the Instagram posts).
// To add one: drop the photo in that folder and add an entry at the top (newest first).

export type PastEvent = {
  id: string; // Instagram shortcode
  title: string;
  host?: string;
  date: string; // display month, e.g. "Oct 2026"
  description: string;
  image: string;
  instagramUrl: string;
};

const ig = (code: string) => `https://www.instagram.com/p/${code}/`;
const img = (code: string) => `/images/events/ig/${code}.jpg`;

export const PAST_EVENTS: PastEvent[] = [
  {
    id: 'Dezr4PUGgrH',
    title: 'NJ Medical Symposia',
    date: 'Oct 2026',
    description: 'Health Decoded joined NJ Medical Symposia for this event.',
    image: img('Dezr4PUGgrH'),
    instagramUrl: ig('Dezr4PUGgrH'),
  },
  {
    id: 'DdwcFmORupW',
    title: 'Guess the Skittles Fundraiser',
    host: 'Livingston Student Center',
    date: 'Sep 2026',
    description:
      'We had an amazing tabling event made by a member of our fundraising team, Darsh, this past Thursday! Thank you to everyone who came and congratulations to Varun P, the winner of our Guess the Skittles contest!',
    image: img('DdwcFmORupW'),
    instagramUrl: ig('DdwcFmORupW'),
  },
  {
    id: 'DdwbS4UkZaf',
    title: 'Tabling in New Brunswick',
    host: 'Hosted by @caresparc',
    date: 'Sep 2026',
    description:
      'Health Decoded had another tabling event in New Brunswick hosted by @caresparc where we were able to connect with so many new people and spread our message. We hope to have many more in the future and hope to see you there as well!',
    image: img('DdwbS4UkZaf'),
    instagramUrl: ig('DdwbS4UkZaf'),
  },
  {
    id: 'DcY9JtjlUSe',
    title: 'New Brunswick Adult Learning Center',
    host: 'Parents and staff of New Brunswick schools',
    date: 'Aug 2026',
    description:
      'A big thank you to New Brunswick Adult Learning Center for allowing Health Decoded to present for the parents and staff of local New Brunswick schools! Another thank you to our Ambassador, Gina, for coming along and helping us throughout this presentation, as well as presenting her own segment! We hope to continue working with many local New Brunswick schools and more of our Ambassadors.',
    image: img('DcY9JtjlUSe'),
    instagramUrl: ig('DcY9JtjlUSe'),
  },
  {
    id: 'Dbi9LY2zliD',
    title: 'Somerset Health Fair',
    host: 'Robert Wood Johnson',
    date: 'Aug 2026',
    description:
      'A big thank you to Robert Wood Johnson for inviting us to table at the Somerset Health Fair! It was a pleasure meeting so many other organizations and sharing our mission. We look forward to many more opportunities like this in the future!',
    image: img('Dbi9LY2zliD'),
    instagramUrl: ig('Dbi9LY2zliD'),
  },
  {
    id: 'DZ2x4MgxhWR',
    title: 'Juneteenth Community Cookout',
    host: 'Saint Peter’s Hospital and Ebenezer Baptist Church',
    date: 'Jun 2026',
    description:
      'A big thank you to Saint Peter’s Hospital and Ebenezer Baptist Church for inviting us to Juneteenth Community Cookout! At this event, we spoke about our organization and our cause for starting our nonprofit. It was truly a pleasure to meet so many people and spread the outreach of our program to so many communities!',
    image: img('DZ2x4MgxhWR'),
    instagramUrl: ig('DZ2x4MgxhWR'),
  },
  {
    id: 'DYnPoj1FlKh',
    title: 'Million Dollar Match',
    host: 'Piscataway High School HOSA',
    date: 'May 2026',
    description:
      'Thank you to Piscataway High School HOSA for inviting Health Decoded at the Million Dollar Match event. We had such a great time meeting new people, sharing our mission, and talking about the importance of health literacy within the community. It was inspiring to hear so many different perspectives and connect with others who are passionate about making health information more accessible. Events like this help us continue spreading awareness and introducing our message to new audiences. We are so grateful for the opportunity and support.',
    image: img('DYnPoj1FlKh'),
    instagramUrl: ig('DYnPoj1FlKh'),
  },
  {
    id: 'DXnJdleET_q',
    title: 'Sayreville High School',
    date: 'Apr 2026',
    description:
      'We are grateful to Sayreville High School for inviting Health Decoded to speak with your group. It was especially meaningful as this was the first time our entire board attended an event together. We loved sharing our mission, and the debate activity was especially engaging, it was wonderful to hear so many different perspectives. Experiences like this inspire us to keep expanding our impact, and we hope to connect again in the future. Thank you for your support.',
    image: img('DXnJdleET_q'),
    instagramUrl: ig('DXnJdleET_q'),
  },
  {
    id: 'DXf3SkmF6zD',
    title: 'Piscataway HOSA',
    date: 'Apr 2026',
    description:
      'We are grateful to Piscataway HOSA for inviting Health Decoded to speak with your group. It was a great experience sharing our mission and having meaningful conversations with such an engaged audience. Opportunities like this help us continue expanding our impact, and we look forward to connecting again in the future. Thank you for your support.',
    image: img('DXf3SkmF6zD'),
    instagramUrl: ig('DXf3SkmF6zD'),
  },
  {
    id: 'DWKiBiIkT2e',
    title: 'Woodrow Wilson Middle School',
    host: 'Future Health Professionals club',
    date: 'Mar 2026',
    description:
      'We thank the Future Health Professionals club at Woodrow Wilson Middle School for having us and giving Health Decoded the opportunity to come and speak with you all. It was such an honor to share our mission and connect with such a thoughtful and engaged audience. We are excited to continue growing our impact and look forward to more moments like this in the future. Thank you again for supporting our cause!',
    image: img('DWKiBiIkT2e'),
    instagramUrl: ig('DWKiBiIkT2e'),
  },
];
