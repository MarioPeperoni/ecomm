import InfoCard from "@/components/home/cards/InfoCard";

import { Cog, Globe, Paintbrush } from "lucide-react";

export default function InfoCards() {
  const cards = [
    {
      title: "Your personalized store",
      icon: <Paintbrush className="mb-2 h-10 w-10 text-teal-500" />,
      text: "Create a personalized storefront on your unique domain (e.g., myshop.ucommerce.com). Customize everything from colors and fonts to logos, images, and banners. Tailor your site to your brand's identity.",
    },
    {
      title: "Effortless Admin Panel",
      icon: <Cog className="mb-2 h-10 w-10 text-orange-500" />,
      text: "Manage everything from your store's products to categories, tags, and SEO settings through an easy-to-use admin panel. Organize your content and optimize your online presence with just a few clicks.",
    },
    {
      title: "Discover and Explore Shops",
      icon: <Globe className="mb-2 h-10 w-10 text-green-500" />,
      text: "Your store can be discovered on the main platform. Browse all shops easily by searching for items or exploring through the 'Explore Items' feature. Connect with a wide range of stores all in one place.",
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <InfoCard key={index} {...card} />
      ))}
    </div>
  );
}
