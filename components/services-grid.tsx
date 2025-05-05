import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { ServiceCategory, Service } from '@/data/service-categories';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  className?: string;
}

export const ServiceCard = ({ title, description, image, link, className }: ServiceCardProps) => {
  return (
    <Link 
      href={link}
      className={cn(
        "group block overflow-hidden rounded-lg bg-white shadow-md card-hover",
        className
      )}
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-80" />
        <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl md:text-2xl drop-shadow-md">
          {title}
        </h3>
      </div>
      <div className="p-4">
        <p className="text-gray-700 line-clamp-3">{description}</p>
        <div className="mt-4 font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
          Learn more →
        </div>
      </div>
    </Link>
  );
};

interface ServicesGridProps {
  category?: string;
  services?: Service[];
  categories?: ServiceCategory[];
  columns?: 2 | 3 | 4;
  className?: string;
  cardClassName?: string;
}

export const ServicesGrid = ({
  category,
  services,
  categories,
  columns = 3,
  className,
  cardClassName,
}: ServicesGridProps) => {
  const columnsClass = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  // If specific services are provided, show them
  if (services) {
    return (
      <div className={cn('grid grid-cols-1 gap-6 md:gap-8', columnsClass[columns])}>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            {...service}
            className={cardClassName}
          />
        ))}
      </div>
    );
  }

  // If categories are provided, show them grouped
  if (categories) {
    return (
      <div className="space-y-16">
        {categories.map((cat) => (
          <div key={cat.slug} className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">{cat.title}</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">{cat.description}</p>
            </div>
            <div className={cn('grid grid-cols-1 gap-6 md:gap-8', columnsClass[columns])}>
              {cat.services.map((service, index) => (
                <ServiceCard
                  key={index}
                  {...service}
                  className={cardClassName}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // If a specific category is provided, show its services
  if (category && categories) {
    const selectedCategory = categories.find(cat => cat.slug === category);
    if (!selectedCategory) return null;

    return (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">{selectedCategory.title}</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">{selectedCategory.description}</p>
        </div>
        <div className={cn('grid grid-cols-1 gap-6 md:gap-8', columnsClass[columns])}>
          {selectedCategory.services.map((service, index) => (
            <ServiceCard
              key={index}
              {...service}
              className={cardClassName}
            />
          ))}
        </div>
      </div>
    );
  }

  return null;
};