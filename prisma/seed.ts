import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const adminPassword = await hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  // Create regular users
  const userPassword = await hash("user123", 12);
  const regularUsers = await Promise.all(
    Array.from({ length: 5 }).map(async (_, i) => {
      return prisma.user.upsert({
        where: { email: `user${i + 1}@example.com` },
        update: {},
        create: {
          email: `user${i + 1}@example.com`,
          name: `User ${i + 1}`,
          password: userPassword,
          role: Role.USER,
          preferences: {
            create: {
              preferredDestinations: ["Beach", "Mountain", "City"],
              dietaryRestrictions: ["Vegetarian"],
              accommodationType: ["Hotel", "Resort"],
              budgetRange: "BDT 1000-BDT 3000",
              travelStyle: ["Luxury", "Adventure"],
            },
          },
        },
      });
    })
  );

  // Combine admin and regular users
  const users = [admin, ...regularUsers];

  // Create tours with features and reviews
  const tours = await Promise.all([
    prisma.tour.create({
      data: {
        title: "Amazing Thailand Adventure",
        description:
          "Experience the best of Thailand with this comprehensive tour package. Visit beautiful temples, enjoy exotic cuisine, and relax on pristine beaches.",
        location: "Thailand",
        price: 1999.99,
        duration: 7,
        maxPeople: 15,
        featured: true,
        features: ["Professional Guide", "Luxury Transportation", "All Meals Included", "Hotel Accommodations", "Temple Tours", "Cooking Class", "Island Hopping"],
        images: {
          create: [
            {
              url: "https://images.unsplash.com/photo-1568321385520-b9252021b491",
              alt: "Thai Temple",
            },
            {
              url: "https://images.unsplash.com/photo-1660593212118-e59bdd0c1e79",
              alt: "Thai Beach",
            },
          ],
        },
        reviews: {
          create: [
            {
              rating: 5,
              comment: "Amazing experience! The temples were breathtaking and the food was incredible.",
              user: { connect: { id: users[1].id } },
            },
            {
              rating: 4.5,
              comment: "Great tour with knowledgeable guides. Highly recommended!",
              user: { connect: { id: users[2].id } },
            },
          ],
        },
      },
    }),
    prisma.tour.create({
      data: {
        title: "Japanese Culture Tour",
        description:
          "Immerse yourself in Japanese culture with this unique tour. Visit ancient temples, experience tea ceremonies, and explore modern Tokyo.",
        location: "Japan",
        price: 2499.99,
        duration: 10,
        maxPeople: 12,
        featured: true,
        features: ["Bullet Train Pass", "Tea Ceremony", "Temple Visits", "Sushi Making Class", "Local Guide", "Traditional Ryokan Stay", "City Tours"],
        images: {
          create: [
            {
              url: "https://images.unsplash.com/photo-1717381359262-5f6f6706498a",
              alt: "Tokyo Tower",
            },
            {
              url: "https://images.unsplash.com/photo-1648383347874-d4839ad837a1",
              alt: "Japanese Temple",
            },
          ],
        },
        reviews: {
          create: [
            {
              rating: 5,
              comment: "Perfect blend of traditional and modern Japan. The ryokan stay was unforgettable!",
              user: { connect: { id: users[3].id } },
            },
            {
              rating: 4.8,
              comment: "Excellent organization and wonderful cultural experiences.",
              user: { connect: { id: users[4].id } },
            },
          ],
        },
      },
    }),
  ]);

  // Create hotels with deals and reviews
  const hotels = await Promise.all([
    prisma.hotel.create({
      data: {
        name: "Luxury Beach Resort",
        description: "A luxurious beachfront resort with stunning ocean views and world-class amenities.",
        location: "Maldives",
        price: 599.99,
        discountedPrice: 479.99,
        discountPercentage: 20,
        validUntil: new Date("2024-02-29"),
        rating: 4.8,
        amenities: ["Pool", "Spa", "Beach Access", "Restaurant", "Room Service", "Free WiFi", "Fitness Center"],
        featured: true,
        images: {
          create: [
            {
              url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
              alt: "Luxury Beach Resort",
            },
            {
              url: "https://images.unsplash.com/photo-1582719508461-905c673771fd",
              alt: "Resort Pool",
            },
          ],
        },
        reviews: {
          create: [
            {
              rating: 5,
              comment: "Paradise on Earth! The service was impeccable and the views were breathtaking.",
              user: { connect: { id: users[1].id } },
            },
            {
              rating: 4.7,
              comment: "Exceptional stay with amazing amenities. Will definitely return!",
              user: { connect: { id: users[2].id } },
            },
          ],
        },
      },
    }),
    prisma.hotel.create({
      data: {
        name: "Mountain View Lodge",
        description: "A cozy mountain lodge offering breathtaking views and outdoor activities.",
        location: "Swiss Alps",
        price: 399.99,
        discountedPrice: 299.99,
        discountPercentage: 25,
        validUntil: new Date("2024-03-15"),
        rating: 4.6,
        amenities: ["Ski Access", "Fireplace", "Restaurant", "Spa", "Free WiFi", "Parking", "Mountain Views"],
        featured: true,
        images: {
          create: [
            {
              url: "https://images.unsplash.com/photo-1601919051950-bb9f3ffb3fee",
              alt: "Mountain Lodge",
            },
            {
              url: "https://images.unsplash.com/photo-1604537466158-719b1972feb8",
              alt: "Lodge Interior",
            },
          ],
        },
        reviews: {
          create: [
            {
              rating: 4.8,
              comment: "Perfect winter getaway! The views are incredible and the ski access is convenient.",
              user: { connect: { id: users[3].id } },
            },
            {
              rating: 4.5,
              comment: "Cozy atmosphere and excellent service. Great for both summer and winter stays.",
              user: { connect: { id: users[4].id } },
            },
          ],
        },
      },
    }),
    prisma.hotel.create({
      data: {
        name: "Urban Boutique Hotel",
        description: "A stylish boutique hotel in the heart of the city, perfect for both business and leisure travelers.",
        location: "New York City",
        price: 299.99,
        discountedPrice: 239.99,
        discountPercentage: 20,
        validUntil: new Date("2024-03-31"),
        rating: 4.5,
        amenities: ["Free WiFi", "Restaurant", "Bar", "Business Center", "Fitness Center", "Room Service", "City Views"],
        featured: false,
        images: {
          create: [
            {
              url: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
              alt: "Boutique Hotel",
            },
            {
              url: "https://images.unsplash.com/photo-1582719508461-905c673771fd",
              alt: "Hotel Room",
            },
          ],
        },
        reviews: {
          create: [
            {
              rating: 4.6,
              comment: "Great location and modern amenities. Perfect for city exploration!",
              user: { connect: { id: users[1].id } },
            },
            {
              rating: 4.4,
              comment: "Excellent service and comfortable rooms. Will stay again!",
              user: { connect: { id: users[2].id } },
            },
          ],
        },
      },
    }),
  ]);

  console.log({ users, tours, hotels });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
