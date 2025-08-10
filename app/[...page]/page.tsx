// Dynamic page routing for Pages directory components
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

// Import working page components dynamically to ensure they're included in build
const pageComponents = {
  'dashboard': dynamic(() => import('../../Pages/Dashboard.tsx'), { ssr: false }),
  // More pages will be added as they are fixed
};

interface PageProps {
  params: {
    page: string[];
  };
}

export default function DynamicPage({ params }: PageProps) {
  const pageName = params.page?.[0]?.toLowerCase();
  
  if (!pageName || !pageComponents[pageName as keyof typeof pageComponents]) {
    notFound();
  }

  const PageComponent = pageComponents[pageName as keyof typeof pageComponents];

  return <PageComponent />;
}

// Generate static params for all available pages to ensure they're built
export async function generateStaticParams() {
  return Object.keys(pageComponents).map((page) => ({
    page: [page],
  }));
}