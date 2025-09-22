interface TimelineItem {
  id: string;
  year: number;
  month: string;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in_progress':
        return 'bg-yellow-500';
      case 'pending':
        return 'bg-gray-300';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'in_progress':
        return 'En cours';
      case 'pending':
        return 'À venir';
      default:
        return 'À venir';
    }
  };

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
      
      <div className="space-y-8">
        {items.map((item, index) => (
          <div key={item.id} className="relative flex items-start space-x-6">
            {/* Timeline dot */}
            <div className="relative z-10 flex-shrink-0">
              <div className={`w-4 h-4 rounded-full ${getStatusColor(item.status)}`}></div>
              <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full border-2 border-white bg-gray-100"></div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="card">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      {item.month} {item.year}
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : item.status === 'in_progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {getStatusText(item.status)}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
