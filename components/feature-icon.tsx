"use client";

import { cn } from '@/lib/utils';

import { 
  Home, Blocks, Square, Flame, Settings, 
  Palette, Trees, Scissors, Sun, Sprout, Recycle, Droplets,
  Hammer, Leaf
} from 'lucide-react';

const iconMap = {
  Home,
  Blocks,
  Square,
  Flame,
  Settings,
  Palette,
  Trees,
  Scissors,
  Sun,
  Sprout,
  Recycle,
  Droplets,
  Hammer,
  Leaf
};

type IconName = keyof typeof iconMap;

interface FeatureIconProps {
  name: IconName;
  className?: string;
}

export function FeatureIcon({ name, className }: FeatureIconProps) {
  const IconComponent = iconMap[name];
  return <IconComponent className={className} />;
} 