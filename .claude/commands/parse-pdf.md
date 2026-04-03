# Parse PDF Document

Parse a logistics PDF (BOL, invoice, packing list, shipping label) into structured Markdown.

## Instructions

1. **Read the PDF** at path: `$ARGUMENTS`
2. **Detect the document type** (Bill of Lading, invoice, packing list, shipping label, etc.)
3. **Extract all structured data** into markdown using the appropriate template below
4. **Write the `.md` file** next to the source PDF (same directory, same base name with `.md` extension)
5. **Cross-reference** against existing files in `logistics/` for validation — flag any discrepancies (mismatched addresses, unknown vendors, weight inconsistencies, etc.)

## Output Format

Write the `.md` file, then summarize what was extracted and any discrepancies found.

---

## Templates

### Bill of Lading (BOL)

```markdown
# Bill of Lading — BOL #[NUMBER]

## Header

| Field | Value |
|-------|-------|
| BOL No | |
| Carrier Name | |
| Pickup Date | |
| Service Level | |
| PRO # | |

## Reference Numbers

| Reference | Value |
|-----------|-------|
| Carrier Quote ID | |
| Customer PO | |
| Delivery PO | |
| Pickup Number | |

## Ship From

**[COMPANY NAME]**
[Address]
Contact: [Name, Phone]

## Ship To

**[COMPANY NAME]**
[Address]
Contact: [Name, Phone]
Hours: [if listed]

## Freight Charges Billed To

**[COMPANY NAME]**
[Address]
Contact: [Phone, Email]
Account Representative: [Name]
Phone: [Number]

## Terminal Info

| Terminal | Phone |
|----------|-------|
| Origin | |
| Destination | |

## Cargo Details

| Qty | Type | Weight | Class | L x W x H | Item Description | NMFC |
|-----|------|--------|-------|------------|------------------|------|
| | | | | | | |
| **Total** | | **Total lbs** | | | **Grand Totals** | |

## Freight Charge

- **[Payment method]** (checked)

## Special Instructions

- [List all special instructions]
```

### Invoice

```markdown
# Invoice — #[NUMBER]

## Header

| Field | Value |
|-------|-------|
| Invoice No | |
| Date | |
| Due Date | |
| Terms | |

## Vendor

**[COMPANY NAME]**
[Address]
[Contact info]

## Bill To

**[COMPANY NAME]**
[Address]

## Line Items

| Qty | Description | Unit Price | Total |
|-----|-------------|-----------|-------|
| | | | |
| | | **Subtotal** | |
| | | **Tax** | |
| | | **Total** | |

## Notes

- [Any additional notes]
```

### Packing List

```markdown
# Packing List — #[NUMBER]

## Header

| Field | Value |
|-------|-------|
| PO Number | |
| Ship Date | |
| Carrier | |

## Items

| Item | SKU | Qty Ordered | Qty Shipped | Weight |
|------|-----|-------------|-------------|--------|
| | | | | |

## Package Summary

| Package | Dimensions | Weight | Contents |
|---------|-----------|--------|----------|
| | | | |
```

### Shipping Label

```markdown
# Shipping Label

## From

**[COMPANY NAME]**
[Address]

## To

**[COMPANY NAME]**
[Address]

## Shipment Details

| Field | Value |
|-------|-------|
| Tracking # | |
| Carrier | |
| Service | |
| Weight | |
| Ship Date | |
```

---

## Validation Rules

After extracting, check against `logistics/` files:
- Do vendor names/addresses match entries in `logistics/Vendor/`?
- Do PO numbers or BOL numbers appear in other documents?
- Are weights and quantities consistent across related documents?
- Flag anything that looks unusual or inconsistent
