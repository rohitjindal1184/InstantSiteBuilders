# Test Cases for InstantSiteBuilders Contact Form

This directory contains comprehensive test cases for the InstantSiteBuilders contact form functionality, covering frontend form validation, backend API endpoints, email functionality, and serverless deployment.

## Test Coverage

### 1. Frontend Tests (`contact-form.test.tsx`)

Tests the React contact form component with user interactions:

- **Form Rendering**: Verifies all required fields are present
- **Validation**: Tests client-side validation for required fields, email format, and message length
- **Form Submission**: Tests successful form submission with valid data
- **Loading States**: Verifies loading indicators during submission
- **Error Handling**: Tests graceful handling of submission errors
- **Form Reset**: Ensures form clears after successful submission

**Key Test Cases:**
```typescript
✓ renders contact form with all required fields
✓ shows validation errors for empty required fields  
✓ validates email format
✓ validates message minimum length
✓ submits form with valid data
✓ shows loading state during form submission
✓ handles form submission errors gracefully
✓ clears form after successful submission
```

### 2. Backend API Tests (`api.test.ts`)

Tests the Express.js API endpoints:

- **Valid Submissions**: Tests successful contact form processing
- **Data Validation**: Tests server-side validation using Zod schemas
- **Error Handling**: Tests various error scenarios and responses
- **Email Integration**: Tests email notification functionality
- **Special Characters**: Tests handling of unicode and special characters

**Key Test Cases:**
```typescript
✓ accepts valid contact form submission
✓ validates required name field
✓ validates email format
✓ validates required company field
✓ validates message minimum length
✓ handles email sending failure gracefully
✓ handles malformed JSON data
✓ handles requests with extra unexpected fields
✓ handles special characters in form data
```

### 3. Email Service Tests (`email.test.ts`)

Tests the nodemailer-based email functionality:

- **SMTP Configuration**: Tests transporter setup with Outlook SMTP
- **Email Content**: Tests HTML and text email generation
- **Data Handling**: Tests proper inclusion of submission data
- **Error Scenarios**: Tests email sending failures
- **Missing Credentials**: Tests graceful degradation without email credentials

**Key Test Cases:**
```typescript
✓ creates transporter with correct SMTP configuration
✓ sends email with correct mail options
✓ includes all submission data in email content
✓ handles line breaks in message content
✓ returns true on successful email send
✓ returns false on email send failure
✓ handles missing email credentials gracefully
✓ handles special characters in submission data
```

### 4. Serverless Function Tests (`serverless.test.ts`)

Tests the Vercel serverless function implementation:

- **CORS Handling**: Tests preflight requests and headers
- **Request Processing**: Tests contact form submission processing
- **Validation**: Tests data validation in serverless environment
- **Error Handling**: Tests various error scenarios
- **URL Parsing**: Tests correct endpoint routing

**Key Test Cases:**
```typescript
✓ handles CORS preflight requests
✓ processes valid contact form submissions
✓ validates contact form data
✓ handles email sending failures gracefully
✓ works without email credentials
✓ returns 404 for unknown endpoints
✓ handles malformed requests gracefully
✓ parses URL paths correctly
```

## Test Data

### Valid Test Submission
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "company": "Acme Corp",
  "message": "We need a professional website for our growing business needs"
}
```

### Validation Rules Tested
- **Name**: Required, non-empty string
- **Email**: Required, valid email format
- **Company**: Required, non-empty string
- **Message**: Required, minimum 10 characters

## Running Tests

```bash
# Run all tests
npx vitest run

# Run tests in watch mode
npx vitest

# Run specific test file
npx vitest tests/contact-form.test.tsx

# Run with coverage
npx vitest run --coverage
```

## Test Environment Setup

The tests use:
- **Vitest**: Modern test runner with TypeScript support
- **React Testing Library**: For component testing
- **Supertest**: For API endpoint testing
- **JSDoc**: For browser environment simulation
- **Mocking**: Vi.js for mocking external dependencies

## Mocked Dependencies

Tests mock the following external dependencies:
- `nodemailer`: Email transport functionality
- `framer-motion`: Animation library
- `@tanstack/react-query`: Data fetching
- Environment variables for configuration

## Integration Testing

The test suite covers:
1. **Unit Tests**: Individual functions and components
2. **Integration Tests**: API endpoints with email functionality
3. **End-to-End Flows**: Complete form submission workflow
4. **Error Scenarios**: Network failures, validation errors, missing credentials

## Continuous Integration

Tests are designed to run in CI/CD environments with:
- No external API dependencies
- Mocked email services
- Isolated test environment
- Deterministic results

This comprehensive test suite ensures the contact form functionality works reliably across all deployment environments (local development, Replit, and Vercel).