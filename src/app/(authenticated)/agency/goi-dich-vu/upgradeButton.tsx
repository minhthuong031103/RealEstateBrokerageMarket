import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import React from 'react';

const UpgradeButton = () => {
  return (
    <Button>
      Upgrade now <ArrowRight className="w-5 h-5 ml-1.5" />
    </Button>
  );
};

export default UpgradeButton;
