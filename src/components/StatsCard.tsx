
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
}

const StatsCard = ({ title, value, description, icon: Icon, trend }: StatsCardProps) => {
  return (
    <Card className="border-coffee-200 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-coffee-700">{title}</CardTitle>
        <Icon className="h-4 w-4 text-coffee-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-coffee-900">{value}</div>
        {description && (
          <p className="text-xs text-coffee-600 mt-1">{description}</p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={`text-xs font-medium ${
                trend.value > 0
                  ? "text-green-600"
                  : trend.value < 0
                  ? "text-red-600"
                  : "text-coffee-600"
              }`}
            >
              {trend.value > 0 ? "+" : ""}{trend.value}%
            </span>
            <span className="text-xs text-coffee-600 ml-1">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
