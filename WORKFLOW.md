# Travel Website Workflow Documentation

## Admin Journey

### 1. Authentication
- **Login Route**: `/login`
  - Use admin credentials:
    - Email: admin@example.com
    - Password: admin123
  - Upon successful login, redirected to `/admin`

### 2. Admin Dashboard (`/admin`)
- View overall statistics:
  - Total Users
  - Total Tours
  - Total Hotels
  - Total Bookings

### 3. Tour Management (`/admin/tours`)
- View all tours in a table format
- Add new tours with:
  - Title
  - Description
  - Location
  - Price
  - Duration
  - Maximum People
  - Featured status
  - Multiple images
  - Itinerary details
- Edit existing tours
- Delete tours
- View tour bookings

### 4. Hotel Management (`/admin/hotels`)
- View all hotels in a table format
- Add new hotels with:
  - Name
  - Description
  - Location
  - Price per night
  - Rating
  - Amenities
  - Featured status
  - Multiple images
- Edit existing hotels
- Delete hotels
- View hotel bookings

### 5. Gallery Management (`/admin/gallery`)
- Upload new images
- Categorize images (NATURE, CITY, CULTURE, ADVENTURE)
- Set featured status
- Delete images
- View images in grid or list format
- Filter images by category

### 6. Special Offers Management
- Create special offers for tours and hotels
- Set discount amounts
- Define validity periods
- Set maximum redemptions
- Track current redemptions
- Activate/deactivate offers

## User Journey

### 1. Authentication
- **Register Route**: `/register`
  - Create new account with:
    - Name
    - Email
    - Password
    - Travel preferences
- **Login Route**: `/login`
  - Login with email and password
  - Upon successful login, redirected to `/dashboard`

### 2. User Dashboard (`/dashboard`)
- View profile information
- View booking history
- Track upcoming trips
- Manage travel preferences
- View payment history

### 3. Tours Exploration (`/tours`)
- Browse available tours
- Search functionality:
  - By location
  - By price range
  - By duration
  - By keywords
- Filter and sort options
- View tour details (`/tours/[id]`)
- Make tour bookings
- Add tours to wishlist

### 4. Hotels Exploration (`/hotels`)
- Browse available hotels
- Search functionality:
  - By location
  - By price range
  - By rating
  - By amenities
- Filter and sort options
- View hotel details (`/hotels/[id]`)
- Make hotel bookings
- Add hotels to wishlist

### 5. Gallery Viewing (`/gallery`)
- View all travel images
- Filter by categories
- Full-screen image viewing
- Image slideshow

### 6. Special Offers (`/special-offers`)
- View available special offers
- Filter by:
  - Tours
  - Hotels
  - Discount amount
  - Validity period
- Apply offers during booking

### 7. Booking Process
1. Select tour/hotel
2. Choose dates
3. Specify number of guests
4. Apply special offers
5. Review booking details
6. Make payment (Mock payment system)
7. Receive confirmation

### 8. Wishlist (`/wishlist`)
- Save favorite tours and hotels
- Remove items from wishlist
- Quick access to booking

## API Routes

### Authentication
- `/api/auth/register` - User registration
- `/api/auth/login` - User login
- `/api/auth/me` - Get current user

### Tours
- `/api/tours` - CRUD operations for tours
- `/api/tours/search` - Search tours
- `/api/tours/[id]` - Single tour operations

### Hotels
- `/api/hotels` - CRUD operations for hotels
- `/api/hotels/search` - Search hotels
- `/api/hotels/[id]` - Single hotel operations

### Bookings
- `/api/bookings` - Create and manage bookings
- `/api/bookings/user` - User's bookings
- `/api/bookings/[id]` - Single booking operations

### Gallery
- `/api/gallery` - Manage gallery images
- `/api/gallery/upload` - Upload images
- `/api/gallery/[id]` - Single image operations

### Special Offers
- `/api/special-offers` - Manage special offers
- `/api/special-offers/[id]` - Single offer operations

### Admin
- `/api/admin/stats` - Dashboard statistics
- `/api/admin/users` - User management
- `/api/admin/bookings` - All bookings management

### Payments
- `/api/payments/mock` - Mock payment processing

## Protected Routes
- All `/admin/*` routes - Admin only
- `/dashboard` - Authenticated users only
- `/bookings` - Authenticated users only
- `/wishlist` - Authenticated users only

## Public Routes
- `/`
- `/tours`
- `/hotels`
- `/gallery`
- `/special-offers`
- `/about`
- `/contact`
- `/login`
- `/register` 