export default function PartnersCarousel() {
  // Placeholder company names – replace with real partner logos later
  const partners = [
    "Culture",
    "Tradition",
    "Inspiration",
    "Teamwork",
    "Excellence",
    "Integrity",
  ];

  // Duplicate the array to create seamless loop
  const duplicated = [...partners, ...partners];

  return (
    <div className="bg-neutral-offwhite py-4 border-t border-neutral-border">
      <div className="relative w-full overflow-hidden">
        {/* Inner container that moves to the right */}
        <div className="flex animate-scroll-right gap-12 items-center w-max">
          {duplicated.map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-5 w-32 bg-white rounded-md shadow-sm border border-neutral-border flex items-center justify-center text-sm font-medium text-neutral-slate hover:shadow-md transition-shadow"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}