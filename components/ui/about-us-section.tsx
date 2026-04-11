'use client';

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import {
  Pen,
  PaintBucket,
  Home,
  Ruler,
  PenTool,
  Building2,
  Award,
  Users,
  Calendar,
  CheckCircle,
  Sparkles,
  Star,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import type { Variants } from "framer-motion";

export default function AboutUsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, -30],
  );
  const y2 = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 30],
  );
  const containerVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.2,
        delayChildren: prefersReducedMotion ? 0 : 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: prefersReducedMotion ? 0 : 20, opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: 'easeOut' as const },
    },
  };

  const services = [
    {
      icon: <Pen className="about-icon" />,
      secondaryIcon: <Sparkles className="about-icon-secondary" />,
      title: "Curriculum",
      description:
        "Designing health education content that turns complex topics into clear, age-appropriate lessons for youth.",
      position: "left",
    },
    {
      icon: <Home className="about-icon" />,
      secondaryIcon: <CheckCircle className="about-icon-secondary" />,
      title: "School Partnerships",
      description:
        "Collaborating with schools and community organizations to bring health literacy into real classrooms.",
      position: "left",
    },
    {
      icon: <PenTool className="about-icon" />,
      secondaryIcon: <Star className="about-icon-secondary" />,
      title: "Workshop Design",
      description:
        "Crafting interactive workshops that help students practice navigating appointments, questions, and decisions.",
      position: "left",
    },
    {
      icon: <PaintBucket className="about-icon" />,
      secondaryIcon: <Sparkles className="about-icon-secondary" />,
      title: "Storytelling",
      description:
        "Using stories, visuals, and real-world scenarios to make healthcare feel human and approachable.",
      position: "right",
    },
    {
      icon: <Ruler className="about-icon" />,
      secondaryIcon: <CheckCircle className="about-icon-secondary" />,
      title: "Program Planning",
      description:
        "Building scalable programs and pilots so health education can reach more youth and communities.",
      position: "right",
    },
    {
      icon: <Building2 className="about-icon" />,
      secondaryIcon: <Star className="about-icon-secondary" />,
      title: "Community Building",
      description:
        "Growing a network of students, educators, and partners who care about health literacy for all.",
      position: "right",
    },
  ];

  const stats = [
    {
      icon: <Award />,
      value: 3,
      label: "Workshops delivered",
      suffix: "",
    },
    {
      icon: <Users />,
      value: 400,
      label: "Students Reached",
      suffix: "+",
    },
    {
      icon: <Calendar />,
      value: 1,
      label: "Year building the program",
      suffix: "",
    },
    {
      icon: <TrendingUp />,
      value: 95,
      label: "Students Feeling More Confident",
      suffix: "%",
    },
  ];

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="about-hero-section"
    >
      <motion.div
        className="about-hero-inner"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div
          className="about-hero-header team-section-modern-header"
          variants={itemVariants}
        >
          <motion.span
            className="team-section-modern-pill about-hero-kicker"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Sparkles className="team-section-modern-pill-icon" aria-hidden />
            Discover our story
          </motion.span>
          <h2 className="team-section-modern-title">
            About <span className="hd-gradient-text">Health Decoded</span>
          </h2>
          <motion.div
            className="about-hero-underline"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
            aria-hidden
          />
        </motion.div>

        <motion.p
          className="about-hero-lead"
          variants={itemVariants}
        >
          Health Decoded is a youth-led initiative dedicated to making healthcare
          understandable, human, and less intimidating. We turn dense medical
          information into clear, culturally responsive education so young people
          can advocate for themselves in any care setting.
        </motion.p>

        <div className="about-hero-grid">
          <div className="about-hero-column">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="left"
                />
              ))}
          </div>

          <div className="about-hero-image-wrapper">
            <motion.div className="about-hero-image-card" variants={itemVariants}>
              <motion.div
                className="about-hero-image-inner"
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <img
                  src="/images/events/hero-team-sofia.png"
                  alt="Health Decoded board members"
                  className="about-hero-image"
                  loading="lazy"
                  decoding="async"
                />
                <motion.div
                  className="about-hero-image-gradient"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  <Link href="/programs" className="about-hero-image-cta">
                    Explore our programs
                    <ArrowRight className="about-hero-image-cta-icon" />
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                className="about-hero-image-frame"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />

              <motion.div
                className="about-hero-float float-top-right"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              />
              <motion.div
                className="about-hero-float float-bottom-left"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              />
            </motion.div>
          </div>

          <div className="about-hero-column">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  direction="right"
                />
              ))}
          </div>
        </div>

        <motion.div
          ref={statsRef}
          className="about-stats-grid"
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        <motion.div
          className="about-cta-banner"
          initial={{ opacity: 0, y: 30 }}
          animate={
            isStatsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="about-cta-copy">
            <h3>Ready to bring health literacy to your community?</h3>
            <p>Together, we can make healthcare less confusing for the next generation.</p>
          </div>
          <Link href="/get-involved" className="about-cta-button">
            Get involved
            <ArrowRight className="about-cta-button-icon" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ServiceItem({
  icon,
  secondaryIcon,
  title,
  description,
  variants,
  delay,
  direction,
}: {
  icon: ReactNode;
  secondaryIcon: ReactNode;
  title: string;
  description: string;
  variants: Variants;
  delay: number;
  direction: "left" | "right";
}) {
  return (
    <motion.div
      className="about-service"
      variants={variants}
      transition={{ delay }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="about-service-header"
        initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
      >
        <motion.div
          className="about-service-icon-wrapper"
          whileHover={{
            rotate: [0, -8, 8, -4, 0],
            transition: { duration: 0.5 },
          }}
        >
          {icon}
          {secondaryIcon}
        </motion.div>
        <h3>{title}</h3>
      </motion.div>
      <motion.p
        className="about-service-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.4 }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

function StatCounter({
  icon,
  value,
  label,
  suffix,
  delay,
}: {
  icon: ReactNode;
  value: number;
  label: string;
  suffix: string;
  delay: number;
}) {
  const countRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(countRef, { once: false });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 10,
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    } else if (!isInView && hasAnimated) {
      springValue.set(0);
      setHasAnimated(false);
    }
  }, [isInView, value, springValue, hasAnimated]);

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest)
  );

  return (
    <motion.div
      className="about-stat-card"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, delay },
        },
      }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className="about-stat-icon-wrapper"
        whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
      >
        {icon}
      </motion.div>
      <motion.div
        ref={countRef}
        className="about-stat-value"
      >
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="about-stat-label">{label}</p>
      <motion.div className="about-stat-underline" />
    </motion.div>
  );
}
