# Field Types

Learn how the Record Editor handles each Salesforce field type with specific editing interfaces, validation, and formatting.

## Overview

Salesforce has many field types, each with unique behaviors. The Record Editor provides specialized editing interfaces for each type to ensure valid data entry and a smooth experience.

**Field Categories:**
- **Simple Types** - Text, Number, Boolean
- **Date Types** - Date, DateTime
- **Selection Types** - Picklist, Multi-Select Picklist
- **Relationship Types** - Lookup, Master-Detail
- **Complex Types** - Address, Geolocation
- **Read-Only Types** - Formula, Rollup Summary, Auto-Number

::: info Field Type Detection
The editor automatically detects field types from Salesforce metadata and renders the appropriate input interface. You don't need to specify the type—it just works.
:::

## Text and Textarea

### Text

Single-line text fields for short strings.

**Salesforce Field Types:**
- Text
- Email
- Phone
- URL

**Editing:**

```
Press i
Type or paste text
Press Esc
```

**Example:**

```
Field: FirstName (Text)
Press i
Type: "Jonathan"
Press Esc
Value: "Jonathan"
```

**Features:**
- Free-form text input
- Character limit enforced (e.g., 80, 255)
- Special characters allowed
- Emoji supported

**Validation:**
- Email fields validate format on save
- URL fields validate format on save
- Phone fields accept any format (no validation)

### Textarea

Multi-line text fields for longer content.

**Salesforce Field Types:**
- Text Area
- Text Area (Long)
- Text Area (Rich)

**Editing:**

```
Press i
Type multi-line text (press Enter for new lines)
Press Esc
```

**Example:**

```
Field: Description (Text Area Long)
Press i
Type: "Line 1
Line 2
Line 3"
Press Esc
Value: (3-line content)
```

**Features:**
- Newlines preserved
- Character limit enforced (32,768 for Long)
- Rich text stored as HTML but edited as plain text
- Scrollable if content exceeds display area

::: warning Rich Text
Rich Text Area fields store HTML, but the editor shows plain text. Formatting (bold, italic) is not rendered or editable—only raw text.
:::

## Number, Currency, and Percent

### Number

Numeric fields for integers and decimals.

**Editing:**

```
Press i
Type numeric value
Press Esc
```

**Example:**

```
Field: NumberOfEmployees (Number)
Press i
Type: "500"
Press Esc
Value: 500
```

**Validation:**
- Only digits and decimal point allowed
- Precision enforced (e.g., 2 decimal places)
- Scientific notation supported (e.g., 1.5e6)
- Negative numbers allowed (prefix with `-`)

**Formatting:**
- Displayed with thousand separators on blur
- Input: `1000000` → Display: `1,000,000`

### Currency

Monetary values with currency symbol.

**Editing:**

```
Press i
Type numeric value (no currency symbol)
Press Esc
```

**Example:**

```
Field: AnnualRevenue (Currency)
Press i
Type: "2500000"
Press Esc
Value: $2,500,000.00
```

**Features:**
- Currency symbol auto-added based on org settings
- Multi-currency orgs show appropriate symbol
- Displayed with two decimal places
- Thousand separators added

**Multi-Currency:**
```
Field: Amount (Currency)
Related Field: CurrencyIsoCode
If CurrencyIsoCode = "EUR"
Display: €2,500,000.00

If CurrencyIsoCode = "GBP"
Display: £2,500,000.00
```

### Percent

Percentage values.

**Editing:**

```
Press i
Type numeric value (without % symbol)
Press Esc
```

**Example:**

```
Field: Discount_Percent__c (Percent)
Press i
Type: "15.5"
Press Esc
Value: 15.5%
```

**Features:**
- Percent symbol auto-added on blur
- Stored as decimal (15.5% = 0.155 internally)
- Input: `15.5` → Display: `15.5%`

::: tip Numeric Input
For Currency and Percent, type just the number (e.g., "100"). Don't type "$" or "%"—they're added automatically.
:::

## Date and DateTime

### Date

Calendar dates without time component.

**Editing:**

```
Press i
Date picker appears
Select date from calendar
Press Esc or click outside picker
```

**Example:**

```
Field: StartDate (Date)
Press i
→ Calendar picker appears
→ Click "2025-11-15"
Press Esc
Value: 2025-11-15
```

**Features:**
- Visual calendar picker
- Navigate months with arrows
- Click date to select
- Today button for current date
- Manual input also supported

**Format:**
- Displayed: Based on user locale (e.g., "11/15/2025" in US)
- Stored: ISO 8601 format (`YYYY-MM-DD`)
- Input: Various formats accepted (MM/DD/YYYY, YYYY-MM-DD)

**Manual Input:**

```
Press i
Type: "11/15/2025"
Press Esc
Value: 2025-11-15
```

### DateTime

Date and time with timezone support.

**Editing:**

```
Press i
DateTime picker appears
Select date from calendar
Select time from dropdown
Press Esc or click outside picker
```

**Example:**

```
Field: EventDateTime__c (DateTime)
Press i
→ Calendar picker appears
→ Click "2025-11-15"
→ Time dropdown appears
→ Select "14:30"
Press Esc
Value: 2025-11-15T14:30:00.000Z
```

**Features:**
- Calendar and time picker
- Time in 24-hour or 12-hour format (based on locale)
- Timezone conversion automatic
- Current date/time button

**Timezone Handling:**
- Displayed in user's timezone
- Stored in UTC in Salesforce
- Conversion automatic
- Example: User in PST enters "2PM" → Stored as "22:00 UTC"

**Manual Input:**

```
Press i
Type: "11/15/2025 2:30 PM"
Press Esc
Value: 2025-11-15T22:30:00.000Z (if user in UTC)
```

::: info Timezone Aware
DateTime fields respect your Salesforce user timezone settings. What you see is in your timezone; what Salesforce stores is UTC.
:::

## Boolean (Checkbox)

True/false fields.

**Editing:**

```
Press i
Click checkbox or press Space
Press Esc
```

**Example:**

```
Field: IsActive (Checkbox)
Current: ☑ (true)
Press i
Press Space
Value: ☐ (false)
Press Esc
```

**Values:**
- `true` - Checkbox checked
- `false` - Checkbox unchecked
- `null` - Empty (if field is not required)

**Keyboard:**
- `Space` - Toggle checkbox
- `Click` - Toggle checkbox

**Display:**
- Checked: ☑ or "true"
- Unchecked: ☐ or "false"

## Picklist (Single-Select)

Dropdown with predefined values.

**Editing:**

```
Press i
Dropdown appears with all valid values
Click a value or use arrow keys + Enter
Press Esc
```

**Example:**

```
Field: Status (Picklist)
Values: Draft, In Review, Approved, Rejected
Current: Draft
Press i
→ Dropdown shows all 4 values
→ Select "Approved"
Press Esc
Value: Approved
```

**Features:**
- Only valid values selectable
- Invalid values prevented
- Search within dropdown (type to filter)
- Current value highlighted

**Keyboard Navigation:**

```
Press i
↓ to move down list
↑ to move up list
Enter to select
Esc to close without changing
```

**Search in Dropdown:**

```
Press i
Type: "app"
Dropdown filters to: "Approved"
Press Enter
Value: Approved
```

### Dependent Picklists

Picklists whose values depend on another field (controlling field).

**How It Works:**

1. Controlling field (e.g., Country) determines available values in dependent field (e.g., State)
2. Change controlling field → dependent field values update
3. If current dependent value is invalid for new controlling value, it's cleared

**Example:**

```
Controlling Field: Country
Dependent Field: State

Country = "USA"
→ State values: Alabama, Alaska, ..., Wyoming

Change Country to "Canada"
→ State values update: Alberta, British Columbia, ..., Yukon
→ Previous State value ("California") cleared (invalid for Canada)
```

**Visual Indicator:**
- Dependent fields show "(Depends on: Country)" in label

**Editing Workflow:**

```
1. Edit controlling field (Country)
2. Press Esc
3. Navigate to dependent field (State)
4. Press i
5. Dropdown shows values filtered by controlling field
6. Select value
```

::: warning Dependent Field Clearing
Changing a controlling field may clear the dependent field. Always set the controlling field first, then the dependent field.
:::

## Multi-Select Picklist

Select multiple values from a list.

**Editing:**

```
Press i
Multi-select interface appears
Check/uncheck values
Press Esc or click outside
```

**Example:**

```
Field: Interests__c (Multi-Select Picklist)
Values: Sports, Music, Reading, Travel, Technology
Current: Sports;Reading
Press i
→ Checkboxes appear
→ Check "Technology"
→ Uncheck "Sports"
Press Esc
Value: Reading;Technology
```

**Features:**
- Multiple values separated by semicolons (`;`)
- Order preserved
- Maximum selections enforced (if configured)
- Search to filter values

**Display:**
- Selected: `Value1;Value2;Value3`
- Single: `Value1`
- None: (empty)

**Keyboard:**

```
Press i
↓ / ↑ to navigate
Space to check/uncheck
Tab to move to next value
Esc to close
```

## Reference/Lookup Fields

Link to related records.

**Salesforce Field Types:**
- Lookup
- Master-Detail
- External Lookup

**Editing:**

```
Press i
Type to search related records
Select from results dropdown
Press Esc
```

**Example:**

```
Field: AccountId (Lookup to Account)
Current: 001xx...AAW (Acme Corp)
Press i
Type: "Burlington"
→ Search results appear:
   - Burlington Textiles Corp
   - Burlington Industries
→ Click "Burlington Textiles Corp"
Press Esc
Value: 001xx...BAW (Burlington Textiles Corp)
```

**Features:**
- Autocomplete search
- Searches Name field by default
- Shows up to 10 results
- Recent records shown when search empty
- Click ID to navigate to related record

**Search Behavior:**

```
Type 2+ characters → Search executes
Results shown in dropdown
Navigate with ↑/↓
Press Enter to select
```

**Clear Lookup:**

```
Press i
Delete all text (Backspace)
Press Esc
Value: (empty)
```

**Polymorphic Lookups:**

Some lookups reference multiple object types (e.g., WhoId can be Contact or Lead).

```
Field: WhoId (Polymorphic: Contact, Lead)
Press i
Type: "John"
→ Results show both Contacts and Leads named "John"
→ Type label indicates object type
   - John Doe (Contact)
   - John Smith (Lead)
Select desired record
```

### Navigate to Related Record

Click any Salesforce ID in the Value column to open the related record.

**Example:**

```
Field: AccountId
Value: 001xx000003DH1QAAW (clickable link)
Click the ID
→ Account record opens in split view or new tab
→ Edit related record
→ Close to return
```

::: tip Lookup Workflow
Common workflow: Edit a Contact → Click AccountId → Edit Account → Close Account tab → Back to Contact editing.
:::

## Address Fields

Compound fields for addresses.

**Components:**
- Street
- City
- State/Province
- Postal Code
- Country

**Two Display Modes:**

### JSON Mode (Default)

```json
{
  "street": "123 Main St",
  "city": "San Francisco",
  "state": "CA",
  "postalCode": "94105",
  "country": "USA"
}
```

**Editing JSON Mode:**

```
Press i
Edit JSON directly
Press Esc
```

### Section Mode

```
Street:      123 Main St
City:        San Francisco
State:       CA
Postal Code: 94105
Country:     USA
```

**Editing Section Mode:**

```
Press i on any component (e.g., City)
Edit that component
Press Esc
```

**Toggle Between Modes:**

```
Press Ctrl+A
→ Switch from JSON to Section or Section to JSON
```

**Example Workflow:**

```
Field: BillingAddress
Display: JSON mode (default)
Press Ctrl+A
→ Section mode
Press i on Street
Type: "456 Oak Ave"
Press Esc
Press j to City
Press i
Type: "Los Angeles"
Press Esc
Press Ctrl+A
→ Back to JSON mode to verify
```

::: tip Which Mode to Use
Use Section mode for editing individual components. Use JSON mode for bulk copy/paste or viewing the complete address structure.
:::

## Geolocation Fields

Latitude and longitude coordinates.

**Components:**
- Latitude (decimal degrees)
- Longitude (decimal degrees)

**Editing:**

```
Press i
Edit latitude and longitude
Press Esc
```

**Example:**

```
Field: Location__c (Geolocation)
Value: Lat: 37.7749, Long: -122.4194
Press i
→ Two inputs appear
→ Edit Latitude: 40.7128
→ Edit Longitude: -74.0060
Press Esc
Value: Lat: 40.7128, Long: -74.0060 (New York coordinates)
```

**Validation:**
- Latitude: -90 to 90
- Longitude: -180 to 180
- Decimal precision up to 6 places

## Formula Fields

Read-only calculated fields.

**Characteristics:**
- **Cannot be edited** (calculated by Salesforce)
- Displayed in **gray text**
- No Insert mode on these fields
- Shows calculated value

**Example:**

```
Field: Total_Value__c (Formula: Amount * Quantity)
Value: $5,000.00
Press i
→ Nothing happens (read-only)
```

**Display:**

```
Name                Value
Total_Value__c      $5,000.00 [gray text]
```

**Types:**
- Text formulas
- Number formulas
- Date formulas
- Boolean formulas
- Currency formulas

::: info Why Read-Only
Formula fields are calculated by Salesforce based on other field values. Editing them directly would break the calculation. To change a formula field value, edit the fields it depends on.
:::

## Rollup Summary Fields

Aggregate values from related records.

**Characteristics:**
- **Cannot be edited** (calculated from child records)
- Displayed in **gray text**
- Shows aggregated value (SUM, COUNT, MIN, MAX, AVG)

**Example:**

```
Field: Total_Opportunities__c (Rollup: COUNT of Opportunities)
Value: 12
Press i
→ Nothing happens (read-only)
```

**Common Rollups:**

```
SUM: Total_Amount__c = SUM(Opportunity.Amount)
COUNT: Number_of_Contacts__c = COUNT(Contact.Id)
MIN: Earliest_Close_Date__c = MIN(Opportunity.CloseDate)
MAX: Latest_Activity__c = MAX(Task.ActivityDate)
```

::: tip Updating Rollups
To change a rollup field, edit the related child records. For example, to increase `Total_Amount__c`, add or edit Opportunities associated with the Account.
:::

## Auto-Number Fields

System-generated sequential numbers.

**Characteristics:**
- **Cannot be edited** (auto-generated)
- Displayed in **gray text**
- Format defined by admin (e.g., "CASE-{0000}")

**Example:**

```
Field: CaseNumber (Auto-Number)
Value: CASE-0012345
Press i
→ Nothing happens (read-only)
```

**Formats:**

```
CASE-{0000} → CASE-0001, CASE-0002, ...
INV-{YYYY}-{000} → INV-2025-001, INV-2025-002, ...
{00000} → 00001, 00002, ...
```

## System Fields

Read-only fields managed by Salesforce.

**Common System Fields:**
- `Id` - Record ID (18-character)
- `CreatedById` - User who created record
- `CreatedDate` - When record created
- `LastModifiedById` - User who last modified record
- `LastModifiedDate` - When last modified
- `SystemModstamp` - Last system modification timestamp
- `OwnerId` - Record owner (editable in some cases)

**Editing:**

```
Field: CreatedDate
Value: 2025-10-15 10:30:00
Press i
→ Nothing happens (read-only system field)
```

**OwnerId Exception:**

```
Field: OwnerId (Lookup to User)
Value: 005xx...AAW (John Doe)
Press i
→ Editable! (can change record owner)
Type: "Jane"
Select: Jane Smith
Press Esc
Value: 005xx...BAW (Jane Smith)
```

## Encrypted Fields

Fields with encryption at rest.

**Characteristics:**
- Editable like regular text fields
- Encrypted value not visible in editor
- Displayed as masked or placeholder text

**Example:**

```
Field: SSN__c (Encrypted Text)
Value: ********1234 (last 4 digits visible)
Press i
Type: "123-45-6789"
Press Esc
Value: ********6789 (encrypted, last 4 shown)
```

**Encryption Types:**
- Classic Encryption (masked display)
- Shield Platform Encryption (full encryption)

::: warning Encryption Visibility
Encrypted field values may not be fully visible even to admins. The editor respects encryption settings and shows masked values.
:::

## Field Type Quick Reference

| Field Type | Editable | Input Method | Example |
|------------|----------|--------------|---------|
| Text | ✅ | Text input | "John Doe" |
| Textarea | ✅ | Multi-line input | "Line 1\nLine 2" |
| Email | ✅ | Text input (validated) | "john@example.com" |
| Phone | ✅ | Text input | "555-1234" |
| URL | ✅ | Text input (validated) | "https://example.com" |
| Number | ✅ | Numeric input | 12345 |
| Currency | ✅ | Numeric input | $1,000.00 |
| Percent | ✅ | Numeric input | 15.5% |
| Date | ✅ | Date picker | 2025-11-15 |
| DateTime | ✅ | DateTime picker | 2025-11-15T14:30:00Z |
| Boolean | ✅ | Checkbox | true/false |
| Picklist | ✅ | Dropdown | "Approved" |
| Multi-Select Picklist | ✅ | Multi-select | "A;B;C" |
| Lookup | ✅ | Search + select | 001xx...AAW |
| Master-Detail | ✅ | Search + select | 001xx...AAW |
| Address | ✅ | JSON or section | {street, city, ...} |
| Geolocation | ✅ | Lat/Long inputs | 37.7749, -122.4194 |
| Formula | ❌ | Read-only | (calculated) |
| Rollup Summary | ❌ | Read-only | (calculated) |
| Auto-Number | ❌ | Read-only | CASE-00123 |
| Id | ❌ | Read-only | 001xx...AAW |
| CreatedDate | ❌ | Read-only | 2025-10-15 |
| LastModifiedDate | ❌ | Read-only | 2025-11-02 |

## Troubleshooting

### Can't Edit Field

**Symptom:** `i` key doesn't activate Insert mode
**Solution:**
1. Check if field is read-only (gray text)
2. Verify field type (formulas, rollups, system fields are read-only)
3. Check field-level security permissions
4. Ensure you're in Normal mode (press `Esc`)

### Invalid Value Error

**Symptom:** Save fails with "Invalid value" error
**Solution:**
1. Check field type validation (e.g., email format)
2. Verify picklist value is in the valid list
3. Ensure number is within allowed range
4. Check required fields are populated

### Lookup Search Returns Nothing

**Symptom:** No results when searching in lookup
**Solution:**
1. Type at least 2 characters
2. Check spelling
3. Verify related records exist
4. Try searching by ID instead
5. Check record access (sharing rules)

### Date Picker Won't Open

**Symptom:** Clicking date field doesn't show picker
**Solution:**
1. Ensure you pressed `i` to enter Insert mode
2. Click inside the date input field
3. Check browser compatibility
4. Try manual input (type date)

### Dependent Picklist Values Wrong

**Symptom:** Dependent picklist shows unexpected values
**Solution:**
1. Check controlling field value
2. Verify dependent picklist configuration in Salesforce
3. Try refreshing record (`:refresh`)
4. Set controlling field before dependent field

## Next Steps

- **[Navigation](/editor/navigation)** - Move through fields efficiently
- **[Editing](/editor/editing)** - Insert mode, undo/redo, copy/paste
- **[Command Mode](/editor/command-mode)** - Save, quit, and utility commands
- **[Advanced Features](/editor/advanced-features)** - Split-screen, related lists, power techniques

::: tip Know Your Fields
Understanding field types helps you edit faster. Learn which fields are read-only, which use pickers, and which need special formatting. The editor guides you, but knowledge accelerates your workflow.
:::
