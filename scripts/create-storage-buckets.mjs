import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function createBucket(bucketName, isPublic = true) {
  try {
    console.log(`Creating bucket: ${bucketName}`)
    
    const { data, error } = await supabase.storage.createBucket(bucketName, {
      public: isPublic,
    })

    if (error) {
      if (error.message.includes('already exists')) {
        console.log(`Bucket "${bucketName}" already exists`)
        return true
      }
      throw error
    }

    console.log(`✓ Bucket "${bucketName}" created successfully`)
    return true
  } catch (err) {
    console.error(`✗ Error creating bucket "${bucketName}":`, err.message)
    return false
  }
}

async function main() {
  console.log('Creating storage buckets...\n')

  const buckets = [
    { name: 'menu-files', isPublic: true },
    { name: 'documents', isPublic: true },
  ]

  let allSuccessful = true
  for (const bucket of buckets) {
    const success = await createBucket(bucket.name, bucket.isPublic)
    allSuccessful = allSuccessful && success
  }

  if (allSuccessful) {
    console.log('\n✓ All buckets created successfully')
    process.exit(0)
  } else {
    console.log('\n✗ Some buckets failed to create')
    process.exit(1)
  }
}

main()
