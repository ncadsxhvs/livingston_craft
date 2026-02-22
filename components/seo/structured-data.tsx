import { Product } from '@/types/product';

interface OrganizationSchemaProps {
  siteUrl: string;
}

export function OrganizationSchema({ siteUrl }: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Livingston Craft',
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    description: 'Premium flooring solutions including hardwood, luxury vinyl, engineered wood, and laminate flooring.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@livingstoncraft.com',
      availableLanguage: 'English',
    },
    sameAs: [
      // Add social media URLs when available
      // 'https://www.facebook.com/livingstoncraft',
      // 'https://www.instagram.com/livingstoncraft',
      // 'https://www.twitter.com/livingstoncraft',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '10000',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ProductSchemaProps {
  product: Product;
  siteUrl: string;
}

export function ProductSchema({ product, siteUrl }: ProductSchemaProps) {
  // Extract price range (e.g., "$3 - $5/sq ft" -> 3 and 5)
  const priceMatch = product.priceRange.match(/\$(\d+)\s*-\s*\$(\d+)/);
  const lowPrice = priceMatch ? priceMatch[1] : '3';
  const highPrice = priceMatch ? priceMatch[2] : '8';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Livingston Craft',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: lowPrice,
      highPrice: highPrice,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: lowPrice,
        priceCurrency: 'USD',
        unitText: 'square foot',
      },
      availability: 'https://schema.org/InStock',
      url: `${siteUrl}/#${product.id}`,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '250',
    },
    // Add color variants
    color: product.colors.map((color) => color.name),
    material: product.id === 'hardwood' ? 'Hardwood' :
              product.id === 'vinyl' ? 'Vinyl' :
              product.id === 'engineered' ? 'Engineered Wood' :
              'Laminate',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema({ siteUrl }: { siteUrl: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Livingston Craft',
    url: siteUrl,
    description: 'Premium flooring solutions for your home',
    publisher: {
      '@type': 'Organization',
      name: 'Livingston Craft',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ siteUrl }: { siteUrl: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Products',
        item: `${siteUrl}/#products`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
