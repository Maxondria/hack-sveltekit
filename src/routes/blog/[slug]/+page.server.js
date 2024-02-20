import { posts } from '../data';
import { error } from '@sveltejs/kit';

export function load({ params }) {
  const { slug } = params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) throw error(404, 'Post not found');

  return { post };
}
