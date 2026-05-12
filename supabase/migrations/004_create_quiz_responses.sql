CREATE TABLE IF NOT EXISTS quiz_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  hair_type TEXT,
  hair_porosity TEXT,
  scalp_condition TEXT,
  main_concern TEXT,
  wash_frequency TEXT,
  chemical_treatments TEXT,
  budget_range TEXT,
  goals TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_quiz_responses_lead ON quiz_responses(lead_id);
CREATE INDEX IF NOT EXISTS idx_quiz_responses_created ON quiz_responses(created_at DESC);

INSERT INTO storage.buckets (id, name, public)
VALUES ('quiz-pdfs', 'quiz-pdfs', true)
ON CONFLICT (id) DO NOTHING;
