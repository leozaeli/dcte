import SlugView from './SlugView';

export default async function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <SlugView slug={slug} />;
}
