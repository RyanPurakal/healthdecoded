-- Seed "EOB Detective" (grades 11-12, Document Detective, 40 XP) from
-- hd-module-catalog.md Example A.
--
-- DRAFT: is_published = false. Assistant-authored, reviewed by a human before
-- publish. Fictional patient/provider/plan; illustrative numbers that are
-- internally consistent; framing is "how to read this", never medical or
-- financial advice. Publish by toggling is_published once reviewed.
--
-- Idempotent on the unique slug.

insert into public.game_activities (title, slug, type, description, xp_value, content, is_published)
values (
  'EOB Detective',
  'eob-detective',
  'document_detective',
  'This is NOT a bill: read an Explanation of Benefits and find billed vs. allowed vs. paid vs. what you owe.',
  40,
  $json$
  {
    "format": "document_detective",
    "pass_threshold": 0.7,
    "document": {
      "title": "Explanation of Benefits",
      "meta": [
        { "label": "Provider", "value": "Riverside Emergency Physicians" },
        { "label": "Date of service", "value": "03/14" },
        { "label": "Claim #", "value": "4482-119-06" }
      ],
      "table": {
        "columns": ["Service", "Billed", "Allowed", "Plan Paid", "You May Owe"],
        "rows": [
          { "cells": [
            { "text": "ED visit, level 3" },
            { "text": "$1,850.00", "region": "r_ed_billed" },
            { "text": "$612.00", "region": "r_ed_allowed" },
            { "text": "$489.60", "region": "r_ed_paid" },
            { "text": "$122.40", "region": "r_ed_owe" }
          ] },
          { "cells": [
            { "text": "Radiology, chest" },
            { "text": "$420.00", "region": "r_rad_billed" },
            { "text": "$138.00", "region": "r_rad_allowed" },
            { "text": "$110.40", "region": "r_rad_paid" },
            { "text": "$27.60", "region": "r_rad_owe" }
          ] },
          { "emphasis": true, "cells": [
            { "text": "Totals" },
            { "text": "$2,270.00", "region": "r_tot_billed" },
            { "text": "$750.00", "region": "r_tot_allowed" },
            { "text": "$600.00", "region": "r_tot_paid" },
            { "text": "$150.00", "region": "r_tot_owe" }
          ] }
        ]
      },
      "footnotes": [
        { "text": "Deductible applied this claim: $0.00" },
        { "text": "Coinsurance: 20%", "region": "r_coinsurance" },
        { "text": "*** THIS IS NOT A BILL ***", "region": "r_notabill", "emphasis": true }
      ]
    },
    "questions": [
      {
        "id": "q1",
        "prompt": "Which number is the total amount you might actually owe?",
        "answer_region": "r_tot_owe",
        "explanation": "The \"You May Owe\" column is the only one that reflects your real cost. The large numbers on the left are not what you pay."
      },
      {
        "id": "q2",
        "prompt": "Which number is what the provider originally charged, in total?",
        "answer_region": "r_tot_billed",
        "explanation": "Billed is the sticker price. It is almost never what you actually owe."
      },
      {
        "id": "q3",
        "prompt": "Where does this document tell you it is NOT a bill?",
        "answer_region": "r_notabill",
        "explanation": "That footer line is the single most useful sentence on the page. An actual bill arrives separately."
      },
      {
        "id": "q4",
        "prompt": "Which number is the total the plan \"allowed\" (the negotiated price)?",
        "answer_region": "r_tot_allowed",
        "explanation": "Allowed is the negotiated rate. In-network, the provider writes off the difference between billed and allowed, so you are not billed for it."
      },
      {
        "id": "q5",
        "prompt": "What is your coinsurance rate after the deductible?",
        "answer_region": "r_coinsurance",
        "explanation": "Coinsurance is your share of the allowed amount. Here 20% of the $612 ED visit is the $122.40 you may owe on that line."
      }
    ]
  }
  $json$::jsonb,
  false
)
on conflict (slug) do nothing;
