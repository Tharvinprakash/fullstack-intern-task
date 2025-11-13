exports.seed = async (knex) => {
  await knex("templates").del();

  await knex("templates").insert([
    {
      name: "Portfolio Template",
      description: "Personal portfolio design",
      thumbnail_url: "/uploads/portfolio.jpg",
      category: "Personal",
    },
    {
      name: "E-commerce Template",
      description: "Online shop layout", 
      thumbnail_url: "/uploads/ecommerce.jpg",
      category: "Business",
    },
    {
      name: "Blog Template",
      description: "Simple blog UI",
      thumbnail_url: "/uploads/Blog.jpg",
      category: "Content",
    },
    {
      name: "Restaurant Template", 
      description: "Food business website",
      thumbnail_url: "/uploads/restraunts.jpg",
      category: "Business",
    },
    {
      name: "CV Template",
      description: "Professional resume template",
      thumbnail_url: "/uploads/CV.jpg", 
      category: "Personal",
    },
    {
      name: "Dashboard Template",
      description: "Admin dashboard with analytics and charts",
      thumbnail_url: "/uploads/Dashboard.jpg",
      category: "Business",
    },
    {
      name: "Landing Page Template",
      description: "Modern landing page with call-to-action sections",
      thumbnail_url: "/uploads/LandingPage.jpg",
      category: "Business",
    },
    {
      name: "Photography Portfolio",
      description: "Showcase gallery for photographers and artists",
      thumbnail_url: "/uploads/photo.jpg",
      category: "Personal",
    },
    {
      name: "Real Estate Template",
      description: "Property listing and agency website",
      thumbnail_url: "/uploads/RealEstate.jpg",
      category: "Business",
    },
    {
      name: "Education Platform",
      description: "Online course and learning management system",
      thumbnail_url: "/uploads/education.jpg",
      category: "Content",
    }
  ]);
};