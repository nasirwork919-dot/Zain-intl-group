INSERT INTO public.properties
  (title, location, price, beds, baths, area_sqft, tag, cover_image, gallery, description, amenities, published, listing_type, property_type, placements, featured)
VALUES
  (
    'Skyline Signature Penthouse · Burj Views',
    'Downtown Dubai',
    16500000,
    4,
    5,
    5200,
    'Luxury',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2400&q=85',
    ARRAY[
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2400&q=85',
      'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2400&q=85',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2400&q=85'
    ],
    'A statement penthouse above the city with expansive terraces, curated finishes, and full skyline framing. Designed for entertaining with a chef-grade kitchen, private lift lobby, and bright, gallery-like interiors.',
    ARRAY[
      'Private terrace',
      'Concierge',
      'Residents-only pool',
      'Gym & sauna',
      'Private parking'
    ],
    true,
    'sale',
    'penthouse',
    ARRAY['buy','featured','featured-projects'],
    true
  ),
  (
    'Palm Jumeirah Waterfront Villa · Private Pool',
    'Palm Jumeirah',
    42000000,
    6,
    7,
    8200,
    'Waterfront',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2400&q=85',
    ARRAY[
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=2400&q=85',
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2400&q=85',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2400&q=85'
    ],
    'Ultra-private waterfront villa with resort-grade outdoor living, direct beach access, and refined interiors. Ideal for end-users seeking a landmark address and long-term lifestyle value.',
    ARRAY[
      'Private pool',
      'Direct beach access',
      'Landscaped garden',
      'Maid’s room',
      'Gated community'
    ],
    true,
    'sale',
    'villa',
    ARRAY['buy','communities','featured'],
    true
  ),
  (
    'Dubai Marina 3BR Residence · Full Sea View',
    'Dubai Marina',
    7800000,
    3,
    4,
    2600,
    'Prime',
    'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2400&q=85',
    ARRAY[
      'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2400&q=85',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2400&q=85',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2400&q=85'
    ],
    'A bright, waterfront home with full-height glazing, sunrise views, and a prime address steps from dining and beach access. Balanced layout, premium finishes, and strong end-user appeal.',
    ARRAY[
      'Infinity pool',
      'Valet parking',
      'Gym',
      'Concierge',
      'Private parking'
    ],
    true,
    'sale',
    'apartment',
    ARRAY['buy','featured','communities'],
    true
  ),
  (
    'Business Bay Canal Loft · Double-Height Living',
    'Business Bay',
    1950000,
    1,
    2,
    980,
    'Investor Pick',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2400&q=85',
    ARRAY[
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2400&q=85',
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2400&q=85',
      'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2400&q=85'
    ],
    'A high-ceiling loft with canal views and a walkable, central address. Excellent for yield-driven buyers with premium amenities and fast Downtown connectivity.',
    ARRAY[
      'Canal promenade',
      'Rooftop pool',
      'Co-working lounge',
      'Gym',
      'Concierge'
    ],
    true,
    'sale',
    'apartment',
    ARRAY['buy','featured-projects'],
    false
  ),
  (
    'Dubai Hills Estate Family Villa · Garden Courtyard',
    'Dubai Hills Estate',
    9800000,
    5,
    6,
    6100,
    'Family',
    'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2400&q=85',
    ARRAY[
      'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=2400&q=85',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2400&q=85',
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2400&q=85'
    ],
    'A calm, spacious villa with indoor-outdoor flow, shaded courtyard seating, and a quiet community feel near schools and golf. Perfect for long-term family living.',
    ARRAY[
      'Private garden',
      'Two-car garage',
      'Community park',
      '24/7 security',
      'Clubhouse access'
    ],
    true,
    'sale',
    'villa',
    ARRAY['buy','communities','featured'],
    true
  ),
  (
    'Downtown 2BR · Boulevard Access · High Floor (Rent)',
    'Downtown Dubai',
    320000,
    2,
    2,
    1350,
    'Ready',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2400&q=85',
    ARRAY[
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2400&q=85',
      'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2400&q=85',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=2400&q=85'
    ],
    'High-floor 2BR with clean finishes and immediate Boulevard access. Move-in ready with excellent walkability to Dubai Mall and top-tier dining.',
    ARRAY[
      'Direct mall access',
      'Residents pool',
      'Gym',
      '24/7 security',
      'Concierge'
    ],
    true,
    'rent',
    'apartment',
    ARRAY['rent','featured'],
    true
  ),
  (
    'Dubai Marina 2BR · Furnished · Waterfront Lifestyle (Rent)',
    'Dubai Marina',
    260000,
    2,
    2,
    1280,
    'Waterfront',
    'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2400&q=85',
    ARRAY[
      'https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2400&q=85',
      'https://images.unsplash.com/photo-1502005097973-6a7082348e28?auto=format&fit=crop&w=2400&q=85',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2400&q=85'
    ],
    'Premium furnished 2BR in Dubai Marina with a bright layout and waterfront access. Ideal for tenants seeking a lifestyle address with amenities and connectivity.',
    ARRAY[
      'Furnished',
      'Pool deck',
      'Gym',
      'Concierge',
      'Covered parking'
    ],
    true,
    'rent',
    'apartment',
    ARRAY['rent','communities'],
    false
  ),
  (
    'Business Bay Office · Grade A · Flexible Layout (Rent)',
    'Business Bay',
    540000,
    0,
    1,
    2100,
    'New',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85',
    ARRAY[
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=85',
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=85',
      'https://images.unsplash.com/photo-1450101215322-bf5cd27642fc?auto=format&fit=crop&w=2400&q=85'
    ],
    'Grade A office in Business Bay with flexible planning, strong natural light, and premium tower amenities — positioned for teams that want a central address.',
    ARRAY[
      'Reception',
      'Visitor parking',
      '24/7 security',
      'High-speed elevators',
      'Nearby metro'
    ],
    true,
    'rent',
    'office',
    ARRAY['rent'],
    false
  );