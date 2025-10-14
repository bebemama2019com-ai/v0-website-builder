import { client } from "./sanity"

export async function getTeamMembers() {
  const query = `*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    "image": image.asset->url,
    order
  }`
  return await client.fetch(query)
}

export async function getNewsPosts() {
  const query = `*[_type == "newsPost"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    "image": image.asset->url,
    category
  }`
  return await client.fetch(query)
}

export async function getNewsPost(slug: string) {
  const query = `*[_type == "newsPost" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    "image": image.asset->url,
    category
  }`
  return await client.fetch(query, { slug })
}

export async function getGalleryImages() {
  const query = `*[_type == "galleryImage"] | order(date desc) {
    _id,
    title,
    "image": image.asset->url,
    category,
    date
  }`
  return await client.fetch(query)
}

export async function getPageContent(slug: string) {
  const query = `*[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    "heroImage": heroImage.asset->url
  }`
  return await client.fetch(query, { slug })
}
