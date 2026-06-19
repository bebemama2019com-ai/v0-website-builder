# Frontend Content Fetching Strategy - Fetch with Fallback

## Overview

Your kindergarten website now implements a **fetch-with-fallback pattern** that ensures all admin-managed content displays correctly whether Supabase data exists or not. This provides a seamless experience for both administrators and website visitors.

## How It Works

### The Pattern

1. **Frontend requests data** from an API endpoint (e.g., `/api/team`, `/api/news`, `/api/gallery`)
2. **If Supabase has data**: The API returns it from the database
3. **If Supabase is empty or API fails**: The page uses **static fallback content** pre-defined in the component
4. **Result**: Website always displays content, never shows broken pages or loading errors

### Visual Flow

```
Frontend Page
     ↓
Try fetch from API (/api/team, /api/news, /api/gallery)
     ↓
Success? → Use API data
     ↓
Failed or empty? → Use static fallback data
     ↓
Display content to users
```

## Implementation Details

### The Reusable Hook: `useFetchWithFallback()`

Location: `/hooks/use-fetch-with-fallback.ts`

**Usage Example:**
```typescript
import { useFetchWithFallback } from "@/hooks/use-fetch-with-fallback"

const fallbackTeamMembers = [
  { id: "1", name: "John", position: "Director", ... },
  // ... more members
]

export default function AboutPage() {
  const { data: teamMembers } = useFetchWithFallback({
    endpoint: "/api/team",
    fallbackData: fallbackTeamMembers,
  })

  return (
    <div>
      {teamMembers.map(member => (
        <div key={member.id}>{member.name}</div>
      ))}
    </div>
  )
}
```

**Hook returns:**
- `data`: The fetched data or fallback data
- `isLoading`: Boolean indicating if still fetching
- `error`: Any error that occurred (doesn't prevent display)

## Sections Using This Pattern

### 1. **About Page** (`/app/about/page.tsx`)
- **Data Source**: Team members from Supabase or fallback
- **Admin Panel**: `/admin/team`
- **API**: `/api/team`
- **Fallback**: 4 default team members

### 2. **News Page** (`/app/news/page.tsx`)
- **Data Source**: News posts from Supabase or fallback
- **Admin Panel**: `/admin/news`
- **API**: `/api/news`
- **Fallback**: 6 sample news articles

### 3. **Gallery Page** (`/app/gallery/page.tsx`)
- **Data Source**: Gallery images from Supabase or fallback
- **Admin Panel**: `/admin/gallery`
- **API**: `/api/gallery`
- **Fallback**: 11 sample gallery images

## How to Add Content Through Admin Panel

### For Team Members:
1. Go to `/admin/team`
2. Click "Add Team Member"
3. Fill in name, position, bio, and upload photo
4. Save
5. **Immediately reflects on `/about` page** (no cache delays)

### For News:
1. Go to `/admin/news`
2. Click "New Post"
3. Add title, content, featured image, category
4. Publish
5. **Immediately visible on `/news` page**

### For Gallery:
1. Go to `/admin/gallery`
2. Click "Upload Images"
3. Select photos and add titles
4. Submit
5. **Immediately shows in `/gallery`**

## Benefits of This Approach

✅ **Resilient**: If Supabase is down, site still displays content  
✅ **Fast Development**: Build with fallback data while setting up admin panel  
✅ **No Cache Issues**: Data updates immediately (no waiting for cache)  
✅ **Graceful Degradation**: Empty Supabase? Shows fallback content  
✅ **Maintenance**: Update fallback data, update displays everywhere  

## How It Handles Different Scenarios

| Scenario | Result |
|----------|--------|
| Supabase has data | Shows live data from database |
| Supabase is empty | Shows fallback data |
| API fails/times out | Shows fallback data (no error screen) |
| API returns empty array | Shows fallback data |
| Network connection lost | Shows fallback data |

## Extending to Other Pages

To add this pattern to any new section (e.g., events, announcements):

1. **Create static fallback data in your component:**
```typescript
const fallbackEvents = [
  { id: "1", title: "Event 1", ... },
]
```

2. **Import and use the hook:**
```typescript
import { useFetchWithFallback } from "@/hooks/use-fetch-with-fallback"

const { data: events } = useFetchWithFallback({
  endpoint: "/api/events",
  fallbackData: fallbackEvents,
})
```

3. **Create the API endpoint** at `/app/api/events/route.ts`

4. **Create admin panel** at `/app/admin/events/page.tsx`

5. **Add Supabase table** for events data

## Notes

- The fetch happens automatically on component mount
- Fallback data is set immediately, so there's no blank page while fetching
- The hook is TypeScript-safe and works with any data shape
- Admin updates are instant (no cache busting needed)
- All sections are bilingual (Bulgarian/English)

## Support

If admin-made changes aren't showing on the frontend:

1. Check if the API endpoint is returning data: `/api/team`, `/api/news`, `/api/gallery`
2. Verify Supabase tables have data: `team_members`, `news_posts`, `gallery_images`
3. Check browser console for fetch errors
4. Fallback data should always display if API fails

---

**Last Updated**: June 2026
