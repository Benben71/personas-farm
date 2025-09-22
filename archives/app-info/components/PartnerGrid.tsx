interface Partner {
  name: string;
  logo: string;
  type: string;
  description: string;
}

interface PartnerCategory {
  [key: string]: Partner[];
}

interface PartnerGridProps {
  partners: PartnerCategory;
}

export default function PartnerGrid({ partners }: PartnerGridProps) {
  const categoryLabels = {
    media: 'Médias',
    institutions: 'Institutions',
    associations: 'Associations',
    technologies: 'Technologies'
  };

  const categoryColors = {
    media: 'from-blue-500 to-blue-600',
    institutions: 'from-green-500 to-green-600',
    associations: 'from-purple-500 to-purple-600',
    technologies: 'from-orange-500 to-orange-600'
  };

  return (
    <div className="space-y-12">
      {Object.entries(partners).map(([category, partnerList]) => (
        <div key={category}>
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {categoryLabels[category as keyof typeof categoryLabels]}
            </h3>
            <div className={`w-16 h-1 bg-gradient-to-r ${categoryColors[category as keyof typeof categoryColors]} rounded-full`}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerList.map((partner, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow duration-300 group">
                <div className="flex flex-col items-center text-center space-y-4">
                  {/* Partner Logo Placeholder */}
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group-hover:from-primary-100 group-hover:to-secondary-100 transition-colors duration-300">
                    <span className="text-2xl font-bold text-gray-600 group-hover:text-primary-600">
                      {partner.name.charAt(0)}
                    </span>
                  </div>
                  
                  {/* Partner Info */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-lg text-gray-900">{partner.name}</h4>
                    <p className="text-sm text-primary-600 font-medium">{partner.type}</p>
                    <p className="text-gray-700 text-sm leading-relaxed">{partner.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
