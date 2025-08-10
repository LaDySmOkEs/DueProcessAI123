import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, CheckCircle } from "lucide-react";

const priorityColors = {
  essential: "bg-red-100 text-red-800 border-red-200",
  important: "bg-orange-100 text-orange-800 border-orange-200",
  helpful: "bg-blue-100 text-blue-800 border-blue-200"
};

const categoryLabels = {
  traffic_stops: "Traffic Stops",
  home_searches: "Home Searches", 
  arrests: "Arrests",
  questioning: "Questioning",
  protests: "Protests", 
  general_rights: "General Rights"
};

export default function RightsModuleCard({ module, onClick, isSelected }) {
  return (
    <Card 
      className={`border-0 shadow-lg bg-white cursor-pointer transition-all duration-200 hover:shadow-xl ${
        isSelected ? 'ring-2 ring-amber-500 ring-offset-2' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-slate-900 mb-2">
              {module.title}
            </CardTitle>
            <Badge variant="outline" className="mb-3">
              {categoryLabels[module.category] || module.category}
            </Badge>
          </div>
          <Badge 
            variant="secondary"
            className={`${priorityColors[module.priority_level]} border font-medium flex items-center gap-1`}
          >
            {module.priority_level === 'essential' && (
              <Star className="w-3 h-3 fill-current" />
            )}
            {module.priority_level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-slate-600 mb-4 line-clamp-3">
          {module.content ? module.content.substring(0, 150) + '...' : 'Click to view content'}
        </p>
        
        {module.key_points && module.key_points.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-slate-700 mb-2">Key Points:</h4>
            <ul className="space-y-1">
              {module.key_points.slice(0, 2).map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-xs text-slate-600">
                  <CheckCircle className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="line-clamp-1">{point}</span>
                </li>
              ))}
              {module.key_points.length > 2 && (
                <li className="text-xs text-slate-500">
                  +{module.key_points.length - 2} more points
                </li>
              )}
            </ul>
          </div>
        )}

        <Button 
          variant="outline" 
          size="sm" 
          className="w-full gap-2"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          <BookOpen className="w-4 h-4" />
          {isSelected ? 'Selected' : 'View Details'}
        </Button>
      </CardContent>
    </Card>
  );
}
