import { Calendar } from "lucide-react";

interface SaleEvent {
  id: number;
  title: string;
  date: string;
  type: "upcoming" | "ongoing" | "completed";
}

interface SalesCalendarProps {
  events?: SaleEvent[];
}

const defaultEvents: SaleEvent[] = [
  { id: 1, title: "Black Friday Sale", date: "Nov 24, 2025", type: "upcoming" },
  { id: 2, title: "Cyber Monday", date: "Nov 27, 2025", type: "upcoming" },
  { id: 3, title: "End of Year Clearance", date: "Dec 20, 2025", type: "upcoming" },
  { id: 4, title: "Holiday Special", date: "Dec 25, 2025", type: "upcoming" },
];

export function SalesCalendar({ events = defaultEvents }: SalesCalendarProps) {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-100 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-900">Upcoming Events</h3>
      </div>
      <div className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex flex-col items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-blue-600">
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
              </span>
              <span className="text-lg font-bold text-blue-600">
                {new Date(event.date).getDate()}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{event.title}</p>
              <p className="text-xs text-gray-500">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
