-- Enable RLS on all tables
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipment_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE sample_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Authenticated users can CRUD all tables
CREATE POLICY "Authenticated users can CRUD vendors" ON vendors FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can CRUD shipments" ON shipments FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can CRUD shipment_items" ON shipment_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can CRUD leads" ON leads FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can CRUD sample_requests" ON sample_requests FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can CRUD quotes" ON quotes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can CRUD invoices" ON invoices FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can CRUD invoice_items" ON invoice_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can CRUD expenses" ON expenses FOR ALL USING (auth.role() = 'authenticated');

-- Public can insert sample requests (from the landing page form)
CREATE POLICY "Public can insert sample requests" ON sample_requests FOR INSERT WITH CHECK (true);
