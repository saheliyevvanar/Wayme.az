# About Us (Haqqımızda) Feature Integration

## Overview
This document describes the integration of the "About Us" (Haqqımızda) feature in the WAYME platform. The feature has been implemented with a dynamic backend API and an updated frontend that fetches content from the database.

## Backend Implementation

### Database
A new table `about_us` has been created to store all About Us content with the following fields:
- `id`: Primary key
- `sectionType`: Type of content (mission, vision, values, services, contact)
- `title`: Section title
- `description`: Section description
- `iconName`: Icon identifier (e.g., "Target", "Lightbulb", "Heart")
- `displayOrder`: Display order for sorting
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

**Migration file**: `db/migration/V4_0__Create_AboutUs_Table.sql`

### Java Implementation

#### Entity: `AboutUs`
Location: `src/main/java/com/example/wayme_backend/entity/AboutUs.java`
- Represents an About Us content item
- Includes getters and setters for all fields

#### DTO: `AboutUsDTO`
Location: `src/main/java/com/example/wayme_backend/dto/AboutUsDTO.java`
- Data Transfer Object for API responses
- Used for request/response serialization

#### Repository: `AboutUsRepository`
Location: `src/main/java/com/example/wayme_backend/repository/AboutUsRepository.java`
- Extends JpaRepository
- Methods:
  - `findBySectionTypeOrderByDisplayOrder(String sectionType)`: Get content by section
  - `findAllByOrderByDisplayOrder()`: Get all content ordered

#### Service: `AboutUsService`
Location: `src/main/java/com/example/wayme_backend/service/AboutUsService.java`
- `getAllAboutUs()`: Retrieve all About Us content
- `getAboutUsBySection(String sectionType)`: Retrieve content by section type
- `getAboutUsById(Long id)`: Retrieve specific item
- `createAboutUs(AboutUsDTO dto)`: Create new content
- `updateAboutUs(Long id, AboutUsDTO dto)`: Update existing content
- `deleteAboutUs(Long id)`: Delete content

#### Controller: `AboutUsController`
Location: `src/main/java/com/example/wayme_backend/controller/AboutUsController.java`
- REST endpoints:
  - `GET /api/about-us`: Get all content
  - `GET /api/about-us/section/{sectionType}`: Get content by section
  - `GET /api/about-us/{id}`: Get specific item
  - `POST /api/about-us`: Create new content
  - `PUT /api/about-us/{id}`: Update content
  - `DELETE /api/about-us/{id}`: Delete content

## Frontend Implementation

### File Updated
`app/haqq;mda/page.tsx` - About Us page component

### Key Changes
1. **Dynamic Data Fetching**: 
   - Component now fetches content from `/api/about-us` endpoint
   - Uses `useEffect` hook to load data on component mount
   - Includes loading and error states

2. **Data Structure**:
   ```typescript
   interface AboutUsItem {
       id: number
       sectionType: string
       title: string
       description: string
       iconName: string
       displayOrder: number
   }
   ```

3. **Icon Mapping**:
   - Maps icon names from database to lucide-react components
   - Supports: Target, Lightbulb, BrainCircuit, ClipboardCheck, TrendingUp, Bot, Heart, Award, Mail

4. **Section Methods**:
   - `getMissionData()`: Filter mission content
   - `getVisionData()`: Filter vision content
   - `getValuesData()`: Filter values content
   - `getServicesData()`: Filter services content
   - `getContactData()`: Filter contact content

5. **Responsive Loading**: Shows loading indicator while fetching data

### Components Rendered Dynamically
- Mission & Vision sections
- Services/Offerings section
- Values section
- Contact section

## API Configuration

### Next.js Configuration
File: `next.config.ts`
- Added rewrites configuration to proxy `/api` requests
- Routes API calls to backend server

### Environment Variables
File: `.env.local`
- `NEXT_PUBLIC_API_URL`: Backend API URL (default for production: https://wayme-az.railway.app/api)

## Default Data
The migration file `V4_0__Create_AboutUs_Table.sql` includes default data in Azerbaijani:

### Sections Populated:
1. **Mission** (1 item)
2. **Vision** (1 item)
3. **Values** (3 items: Objektivity, Accessibility, Quality)
4. **Services** (4 items: Psychological Analysis, Professional Review, Personal Recommendations, AI Support)
5. **Contact** (1 item)

## Integration Steps

### For Backend:
1. Build the Spring Boot application
2. Database migration runs automatically (Flyway)
3. `/api/about-us` endpoints become available

### For Frontend:
1. Update environment variable `NEXT_PUBLIC_API_URL` if needed
2. Restart development server or rebuild
3. Navigate to `/haqq;mda` page
4. Content loads from database

## API Response Example

```json
[
  {
    "id": 1,
    "sectionType": "mission",
    "title": "Missiyamız",
    "description": "Hər kəsə ən uyğun karyera yolunu tapmaqda kömək etmək...",
    "iconName": "Target",
    "displayOrder": 1
  }
]
```

## Error Handling
- Failed API requests show error message to console
- Frontend gracefully handles missing data
- Loading state prevents UI flickering

## Maintenance

### Adding New Content
Use the POST endpoint:
```bash
curl -X POST http://localhost:8080/api/about-us \
  -H "Content-Type: application/json" \
  -d '{
    "sectionType": "testimonials",
    "title": "Customer Testimonial",
    "description": "Great service!",
    "iconName": "Heart",
    "displayOrder": 1
  }'
```

### Updating Content
Use the PUT endpoint with the item ID

### Deleting Content
Use the DELETE endpoint with the item ID

## Future Enhancements
- Add image/media support
- Implement content versioning
- Add multi-language support
- Admin panel for content management
- Caching mechanisms
- Content moderation workflow
