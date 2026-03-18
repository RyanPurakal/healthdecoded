import { useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Mail, Sparkles } from "lucide-react";

// Lightweight UI primitives inspired by shadcn/ui
function Badge({ className = "", children, ...props }) {
  return (
    <span className={`hd-badge ${className}`} {...props}>
      {children}
    </span>
  );
}

function Button({ className = "", children, ...props }) {
  return (
    <button className={`hd-button ${className}`} {...props}>
      {children}
    </button>
  );
}

function Card({ className = "", children, ...props }) {
  return (
    <div className={`hd-card ${className}`} {...props}>
      {children}
    </div>
  );
}

const teamMembers = [
  {
    name: "Ruvanthika Sivaprakasini Veerasikku",
    role: "Executive Director",
    bio: "Ruvanthika is a freshman at Rutgers University–New Brunswick majoring in Cell Biology and Neuroscience. She is excited to be a part of Health Decoded and is passionate about improving health literacy and access to clear, reliable medical information. In her free time, she enjoys reading, snowboarding, and watching movies.",
    image: "/team/ruvanthika.jpg",
    email: "ruvanthikasv@healthdecodedinitiative.org",
  },
  {
    name: "Celdave Weaver",
    role: "Director of Education & Outreach",
    bio: "Celdave is a freshman at Rutgers University-New Brunswick majoring in Biological Sciences. She is thrilled to be a part of Health Decoded and wants to help educate others on health literacy. In her free time she loves to play piano and bake (her favorite desert to make is double chocolate chip brownies).",
    image: "/team/celdave.jpg",
    email: "celdavew@healthdecodedinitiative.org",
  },
  {
    name: "Ryan Purakal",
    role: "Director of Technology",
    bio: "Ryan is a freshman majoring in Computer Science at Rutgers. He's really excited to help with the global push for health education through tech initiatives. In his free time he loves to watch movies and shows (his favorites are Se7en and Better Call Saul).",
    image: "/team/ryan.jpg",
    email: "ryanp@healthdecodedinitiative.org",
  },
  {
    name: "Gil Shenoy",
    role: "Director of Operations",
    bio: "Gil is a freshman at Rutgers University-New Brunswick, majoring in Biochemistry. He is interested in medicine, wanting to create better knowledge about health care through education. In his free time he loves to go rock climbing and likes to spend time outside.",
    image: "/team/gil.jpg",
    email: "gils@healthdecodedinitiative.org",
  },
  {
    name: "Kartik Narula",
    role: "Director of Communications",
    bio: "Kartik is a freshman at Rutgers University-New Brunswick majoring in Cell Biology and Neuroscience. He aspires to make a change in the healthcare community by bringing the truth forward and exposing the complexities in the system. In his free time he enjoys riding as an EMT and making a difference in the lives of others.",
    image: "/team/kartik.jpg",
    email: "kartikn@healthdecodedinitiative.org",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  },
};

function TeamMemberCard({ member }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left - width / 2) / (width / 2);
    const y = (e.clientY - rect.top - height / 2) / (height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div variants={itemVariants} className="perspective-1000">
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="team-card-wrapper"
      >
        <Card>
          <div className="team-card-inner">
            <div className="team-avatar-wrapper">
              <motion.div
                className="team-avatar-ring"
                animate={
                  isHovered && !shouldReduceMotion
                    ? { rotate: 360, scale: [1, 1.06, 1] }
                    : { rotate: 0, scale: 1 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0.4 : 4,
                  repeat: shouldReduceMotion ? 0 : Infinity,
                  ease: "linear",
                }}
              />
              <motion.img
                src={member.image}
                alt={member.name}
                className="team-avatar"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.25 }}
              />
            </div>

            <div className="team-card-content">
              <div className="team-card-header">
                <motion.h3
                  className="team-card-name"
                  animate={isHovered ? { scale: 1.03 } : { scale: 1 }}
                  transition={{ duration: 0.18 }}
                >
                  {member.name}
                </motion.h3>
                <Badge>{member.role}</Badge>
              </div>

              <p className="team-card-bio">{member.bio}</p>

              <div className="team-card-social">
                <Button
                  className="team-card-social-button"
                  aria-label={`Email ${member.name}`}
                  onClick={() => {
                    window.location.href = `mailto:${member.email || "info@healthdecodedinitiative.org"}`;
                  }}
                >
                  <Mail className="team-card-social-icon" aria-hidden />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default function TeamSectionBlock() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="modern-team-section-heading"
      className="team-section-modern"
    >
      <div className="team-section-modern-bg">
        <motion.div
          aria-hidden
          className="team-section-modern-orb orb-primary"
          animate={
            shouldReduceMotion
              ? { opacity: 0.16 }
              : {
                  scale: [1, 1.12, 1],
                  opacity: [0.12, 0.28, 0.12],
                }
          }
          transition={{
            duration: shouldReduceMotion ? 0.6 : 14,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          aria-hidden
          className="team-section-modern-orb orb-secondary"
          animate={
            shouldReduceMotion
              ? { opacity: 0.18 }
              : {
                  scale: [1.05, 0.96, 1.05],
                  opacity: [0.16, 0.32, 0.16],
                }
          }
          transition={{
            duration: shouldReduceMotion ? 0.6 : 16,
            repeat: shouldReduceMotion ? 0 : Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="team-section-modern-inner">
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="team-section-modern-header"
        >
          <Badge className="team-section-modern-pill">
            <Sparkles className="team-section-modern-pill-icon" aria-hidden />
            Our Leadership & Core Team
          </Badge>

          <h2 id="modern-team-section-heading" className="team-section-modern-title">
            The people decoding{" "}
            <span>healthcare for the next generation</span>
          </h2>

          <p className="team-section-modern-subtitle">
            A small, focused team of students and emerging leaders using health
            education to make medical systems feel human, clear, and
            accessible—starting with youth.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="team-section-modern-grid"
        >
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

