-- Create invoices table
CREATE TABLE IF NOT EXISTS public.invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  invoice_number TEXT NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT,
  items JSONB NOT NULL DEFAULT '[]',
  total INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'unpaid',
  notes TEXT,
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS invoices_user_id_idx ON public.invoices(user_id);
CREATE INDEX IF NOT EXISTS invoices_status_idx ON public.invoices(status);

-- Enable Row Level Security
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only see their own invoices
CREATE POLICY "Users can view their own invoices"
  ON public.invoices
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own invoices"
  ON public.invoices
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own invoices"
  ON public.invoices
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own invoices"
  ON public.invoices
  FOR DELETE
  USING (auth.uid() = user_id);
