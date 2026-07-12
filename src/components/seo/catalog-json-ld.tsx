import { listProductsSync } from "@/lib/catalog-api";
import { siteConfig } from "@/lib/site";

export function CatalogJsonLd() {
  const products = listProductsSync();
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Monis workspace rental catalog",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.description,
        category: product.category,
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          price: product.pricePerWeek,
          priceValidUntil: "2099-12-31",
          availability: "https://schema.org/InStock",
          url: `${siteConfig.url}/en/setup-builder`,
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
    />
  );
}
