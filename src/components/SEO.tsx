import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export const SEO = ({
  title = 'CodeGetIt - Professional Full-Stack Development Agency',
  description = 'Expert full-stack development with TypeScript, React, and Spring Boot. We build modern web applications, scalable APIs, and enterprise software solutions.',
  keywords = 'full-stack development, TypeScript, React, Spring Boot, Java, web development, API development, REST API, GraphQL, enterprise software, microservices, cloud native, modern web apps',
  author = 'CodeGetIt',
  ogImage = '/og-image.jpg',
  ogType = 'website',
  canonicalUrl = 'https://codegetit.com',
}: SEOProps) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="CodeGetIt" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Additional SEO */}
      <meta name="theme-color" content="#171717" />
      <meta name="msapplication-TileColor" content="#171717" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "CodeGetIt",
          "url": canonicalUrl,
          "logo": `${canonicalUrl}/logo.png`,
          "description": description,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "San Francisco",
            "addressRegion": "CA",
            "addressCountry": "US"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-123-4567",
            "contactType": "Customer Service",
            "email": "hello@codegetit.com"
          },
          "sameAs": [
            "https://twitter.com/codegetit",
            "https://linkedin.com/company/codegetit",
            "https://github.com/codegetit"
          ]
        })}
      </script>
    </Helmet>
  );
};
