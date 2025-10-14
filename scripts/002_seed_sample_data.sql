-- Insert sample team members
insert into public.team_members (name, role, bio, image_url, order_index) values
  ('Maria Petrova', 'Director', 'With over 15 years of experience in early childhood education, Maria leads our team with passion and dedication.', '/teacher-portrait-1.jpg', 1),
  ('Elena Dimitrova', 'Lead Teacher', 'Elena specializes in creative arts and brings joy to every classroom activity.', '/teacher-portrait-2.jpg', 2),
  ('Ivan Georgiev', 'Music Teacher', 'Ivan introduces children to the wonderful world of music through fun and interactive lessons.', '/teacher-portrait-3.jpg', 3),
  ('Sofia Ivanova', 'English Teacher', 'Sofia makes learning English fun with games, songs, and storytelling.', '/teacher-portrait-4.jpg', 4),
  ('Dimitar Petrov', 'Physical Education', 'Dimitar keeps our little ones active and healthy with engaging sports activities.', '/teacher-portrait-5.jpg', 5),
  ('Ana Nikolova', 'Assistant Teacher', 'Ana provides loving care and support to help every child feel safe and happy.', '/teacher-portrait-6.jpg', 6);

-- Insert sample news posts
insert into public.news_posts (title, slug, excerpt, content, image_url, category, published, published_at) values
  (
    'Welcome to the New School Year!',
    'welcome-new-school-year',
    'We are excited to welcome all our students back for another amazing year of learning and growth.',
    'We are thrilled to announce the start of our new school year! Our teachers have prepared exciting new activities and learning experiences for all our students. We look forward to seeing familiar faces and welcoming new families to our kindergarten community.',
    '/news-school-year.jpg',
    'Announcement',
    true,
    now() - interval ''10 days''
  ),
  (
    'Fall Festival Coming Soon',
    'fall-festival-coming-soon',
    'Join us for our annual Fall Festival with games, activities, and fun for the whole family!',
    'Mark your calendars! Our annual Fall Festival is coming up next month. There will be games, face painting, a costume parade, and delicious treats. This is a wonderful opportunity for families to come together and celebrate the season.',
    '/news-fall-festival.jpg',
    'Event',
    true,
    now() - interval ''5 days''
  ),
  (
    'New Art Studio Opening',
    'new-art-studio-opening',
    'We are proud to announce the opening of our brand new art studio equipped with the latest materials.',
    'Our new art studio is now open! Children will have access to a wide variety of art supplies and materials to explore their creativity. The studio features child-sized easels, a pottery corner, and plenty of space for messy, creative fun.',
    '/news-art-studio.jpg',
    'News',
    true,
    now() - interval ''15 days''
  );

-- Insert sample gallery images
insert into public.gallery_images (title, description, image_url, category, order_index) values
  ('Art Class Fun', 'Children enjoying creative art activities', '/gallery-art-class.jpg', 'Activities', 1),
  ('Outdoor Playtime', 'Playing in our beautiful outdoor playground', '/gallery-outdoor.jpg', 'Outdoor Play', 2),
  ('Story Time', 'Gathering for an exciting story', '/gallery-reading.jpg', 'Classroom', 3),
  ('Music Lesson', 'Learning rhythm and melody', '/gallery-music.jpg', 'Activities', 4),
  ('Science Discovery', 'Exploring the wonders of science', '/gallery-science.jpg', 'Activities', 5),
  ('Playground Fun', 'Enjoying our outdoor facilities', '/gallery-playground.jpg', 'Outdoor Play', 6),
  ('Classroom Activities', 'Learning through play', '/gallery-classroom.jpg', 'Classroom', 7),
  ('Sports Day', 'Active and healthy fun', '/gallery-sports.jpg', 'Events', 8);
