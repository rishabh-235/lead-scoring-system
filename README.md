# Lead Scoring System

A Node.js application that processes leads, scores them using AI-powered analysis, and manages lead data with CSV import/export capabilities. The system utilizes Google's Gemini AI for intelligent lead scoring, MongoDB for data persistence, and Docker for containerization.

## Project Overview

### Core Features

- **CSV Import/Export**: Bulk process lead data through CSV files
- **AI-Powered Scoring**: Utilize Gemini AI for intelligent lead evaluation
- **RESTful API**: Complete API for lead management
- **Docker Support**: Containerized deployment ready
- **MongoDB Integration**: Robust data persistence
- **Automated Testing**: Jest-based test suite

### Tech Stack

- **Backend**: Node.js & Express.js
- **Database**: MongoDB
- **AI Integration**: Google Gemini AI
- **Testing**: Jest & Supertest
- **Containerization**: Docker & Docker Compose
- **Documentation**: Swagger/OpenAPI
- **Version Control**: Git

### Project Structure

```
lead-scoring-system/
├── src/
│   ├── controllers/
│   │   ├── lead.controller.js    # Lead management logic
│   │   └── offer.controller.js   # Offer management logic
│   ├── models/
│   │   ├── lead.model.js        # Lead data schema
│   │   └── offer.model.js       # Offer data schema
│   ├── routes/
│   │   ├── lead.routes.js       # Lead API routes
│   │   └── offer.routes.js      # Offer API routes
│   ├── utils/
│   │   ├── asyncHandler.js      # Async error handling
│   │   ├── csvProcessor.js      # CSV processing utility
│   │   ├── geminiService.js     # AI service integration
│   │   └── leadScoring.js       # Scoring algorithm
│   └── tests/
│       ├── db-handler.js        # Test database setup
│       └── leadScoring.rules.test.js
├── Dockerfile                    # Container configuration
├── docker-compose.yml           # Multi-container setup
└── package.json                 # Project dependencies
```

### Key Features Explained

1. **Lead Processing**

   - CSV file parsing and validation
   - Data normalization and cleaning
   - Bulk import capabilities
   - Structured data export

2. **AI Scoring Engine**

   - Real-time lead evaluation
   - Multi-factor analysis
   - Configurable scoring rules
   - Historical data consideration

3. **Data Management**

   - CRUD operations for leads
   - Offer management system
   - Data validation
   - Error handling

4. **System Architecture**
   - Microservices-ready design
   - Scalable database structure
   - Containerized deployment
   - Environment-based configuration

## Deployment

The application is deployed on Render.com and can be accessed at:
[Render Deployment Documentation](https://render.com/docs/web-services#port-binding)

## Setup Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/rishabh-235/lead-scoring-system.git
   cd lead-scoring-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   GOOGLE_API_KEY=your_gemini_api_key
   ```

4. **Run the application**

   - Development mode:
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

5. **Docker Setup (Optional)**
   ```bash
   docker-compose up --build
   ```

## API Usage Examples

### 1. Upload Leads (CSV)

```bash
curl -X POST http://localhost:5000/api/v1/leads/upload \
  -H "Content-Type: multipart/form-data" \
  -F "file=@leads.csv"
```

### 2. Score Leads

```bash
curl -X POST http://localhost:5000/api/v1/leads/score
```

### 3. Get Scored Leads

```bash
curl -X GET http://localhost:5000/api/v1/leads/results
```

### 4. Export Leads (CSV)

```bash
curl -X GET http://localhost:5000/api/v1/leads/export
```

## Postman Collection

You can import the following endpoints into Postman:

1. **Upload Leads**

   - Method: POST
   - URL: `{{base_url}}/api/v1/leads/upload`
   - Body: form-data
     - Key: file
     - Value: [select CSV file]

2. **Score Leads**

   - Method: POST
   - URL: `{{base_url}}/api/v1/leads/score`

3. **Get Results**

   - Method: GET
   - URL: `{{base_url}}/api/v1/leads/results`

4. **Export CSV**
   - Method: GET
   - URL: `{{base_url}}/api/v1/leads/export`

## System Requirements

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- Docker (optional, for containerized deployment)
- Google Cloud Account (for Gemini AI API)

### Hardware Requirements

- RAM: 2GB minimum, 4GB recommended
- Storage: 1GB free space
- CPU: Dual-core processor or higher

## Lead Scoring Logic & Prompts

### Scoring Criteria

The lead scoring system uses the following criteria to evaluate leads:

1. **Basic Information Completeness (20%)**

   - Name
   - Email
   - Phone
   - Company

2. **Industry Relevance (25%)**

   - Industry type analysis
   - Company size consideration
   - Market segment alignment

3. **Engagement Level (30%)**

   - Source of lead
   - Previous interactions
   - Response time

4. **Position/Role Impact (25%)**
   - Decision-making authority
   - Job title relevance
   - Department alignment

### AI Prompt Structure

The system uses Google's Gemini AI with structured prompts for analysis:

```javascript
const basePrompt = `
Analyze the following lead information and provide a score:
- Name: [lead.name]
- Email: [lead.email]
- Company: [lead.company]
- Industry: [lead.industry]
- Job Title: [lead.jobTitle]
- Source: [lead.source]

Consider:
1. Information completeness
2. Industry alignment
3. Decision-making authority
4. Engagement indicators

Provide:
1. Numerical score (0-100)
2. Quality categorization (Hot/Warm/Cold)
3. Brief justification
`;
```

### Quality Categories

- **Hot Lead (80-100)**: High potential, immediate follow-up
- **Warm Lead (50-79)**: Moderate potential, scheduled follow-up
- **Cold Lead (0-49)**: Low potential, nurturing required

## Performance Optimization

### Database Indexing

```javascript
// Example of indexes in lead.model.js
leadSchema.index({ email: 1 }, { unique: true });
leadSchema.index({ score: -1 });
leadSchema.index({ company: 1, industry: 1 });
```

### Caching Strategy

- In-memory caching for frequently accessed data
- Response caching for API endpoints
- MongoDB query optimization

### Error Handling

```javascript
// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});
```

## Security Measures

1. **API Security**

   - Rate limiting
   - Request validation
   - CORS configuration
   - Helmet middleware

2. **Data Security**

   - Input sanitization
   - MongoDB injection prevention
   - Sensitive data encryption
   - Secure environment variables

3. **Best Practices**
   - Regular security updates
   - Dependency vulnerability scanning
   - Secure coding guidelines
   - Access control implementation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Common Issues

1. **MongoDB Connection**

   ```bash
   Error: MongoDB connection failed
   Solution: Check MONGODB_URI in .env and network connectivity
   ```

2. **CSV Upload**

   ```bash
   Error: Invalid CSV format
   Solution: Ensure CSV follows required structure and encoding
   ```

3. **Docker Issues**
   ```bash
   Error: Container not starting
   Solution: Check docker-compose.yml and environment variables
   ```

### Debug Mode

```bash
# Enable debug logging
DEBUG=app:* npm run dev
```

## Future Enhancements

1. **Planned Features**

   - Real-time lead scoring updates
   - Advanced analytics dashboard
   - Machine learning model integration
   - Webhook integrations
   - Batch processing optimization

2. **Architecture Evolution**
   - Microservices migration
   - GraphQL API implementation
   - Redis caching integration
   - Kubernetes deployment support

## License

This project is licensed under the MIT License - see the LICENSE file for details.
