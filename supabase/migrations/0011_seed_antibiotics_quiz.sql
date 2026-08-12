-- Seed the first real quiz: "Antibiotics Don't Fight Everything" (grades 9-10,
-- Myth or Fact, 20 XP) from hd-module-catalog.md.
--
-- DRAFT: inserted with is_published = false. This content was drafted by the
-- assistant for review and is NOT finished curriculum — it stays unpublished
-- until a human verifies the health content. Fictional/plain-language framing;
-- nothing here is medical advice (matches the Terms language). Publish by
-- toggling is_published once reviewed.
--
-- Idempotent on the unique slug.

insert into public.game_activities (title, slug, type, description, xp_value, content, is_published)
values (
  'Antibiotics Don''t Fight Everything',
  'antibiotics-dont-fight-everything',
  'quiz',
  'Myth or Fact: viral vs. bacterial infections and the basics of antibiotic resistance.',
  20,
  $json$
  {
    "format": "myth_or_fact",
    "pass_threshold": 0.7,
    "questions": [
      {
        "id": "q1",
        "prompt": "Antibiotics can cure the common cold or the flu.",
        "options": ["Myth", "Fact"],
        "answer_index": 0,
        "explanation": "Colds and flu are caused by viruses. Antibiotics only work against bacteria, so they can't treat a viral infection."
      },
      {
        "id": "q2",
        "prompt": "Using antibiotics when you don't actually need them can make them less effective in the future.",
        "options": ["Myth", "Fact"],
        "answer_index": 1,
        "explanation": "Unnecessary use drives antibiotic resistance: bacteria adapt, so the medicine may not work when you genuinely need it."
      },
      {
        "id": "q3",
        "prompt": "You should take antibiotics exactly as your prescriber directs, rather than stopping on your own the moment you feel better.",
        "options": ["Myth", "Fact"],
        "answer_index": 1,
        "explanation": "Take them exactly as prescribed. If you have questions about stopping early, ask your prescriber or pharmacist instead of deciding on your own."
      },
      {
        "id": "q4",
        "prompt": "Every sore throat needs antibiotics.",
        "options": ["Myth", "Fact"],
        "answer_index": 0,
        "explanation": "Most sore throats are viral. Strep throat is bacterial and is diagnosed with a test; only then might antibiotics be appropriate."
      },
      {
        "id": "q5",
        "prompt": "It's fine to share leftover antibiotics with a family member who has similar symptoms.",
        "options": ["Myth", "Fact"],
        "answer_index": 0,
        "explanation": "Prescriptions are specific to one person and one condition. Sharing medication can be harmful and is never recommended."
      },
      {
        "id": "q6",
        "prompt": "It is the bacteria that become resistant to antibiotics, not your body.",
        "options": ["Myth", "Fact"],
        "answer_index": 1,
        "explanation": "Resistance develops in the bacteria, not in you. This is a common misconception worth clearing up."
      }
    ]
  }
  $json$::jsonb,
  false
)
on conflict (slug) do nothing;
