'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Globe } from 'lucide-react'

interface AlternativeTitleItem {
  title: string;
  country: string;
}

interface AlternativeTitleProps {
  titles: AlternativeTitleItem[];
}

const AlternativeTitle: React.FC<AlternativeTitleProps> = ({ titles }) => {
  if (!titles || titles.length === 0) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-background/70 to-background/50 backdrop-blur-sm border-none shadow-lg">
      <CardHeader className="pb-2 px-0">
        <CardTitle className="text-xl font-semibold flex items-center gap-2 text-primary">
          <Globe className="w-5 h-5 text-primary" />
          Alternative Titles
        </CardTitle>
      </CardHeader>
      <CardContent className="h-fit p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {titles.map((title, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 rounded-md bg-background/80 hover:bg-primary/20 transition-colors duration-200 border border-primary/10"
            >
              <span className="text-sm font-medium truncate flex-grow mr-2 text-secondary-foreground">
                {title.title}
              </span>
              <Badge
                variant="secondary"
                className="text-xs whitespace-nowrap bg-primary/10 text-primary"
              >
                {title.country}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default AlternativeTitle