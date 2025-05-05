"use client";

import { 
  Home, Blocks, Brick, Flame, Settings, 
  Palette, Tree, Scissors, Sun, Plant, Recycle, Droplets,
  Hammer, Leaf
} from 'lucide-react';

const iconMap = {
  Home,
  Blocks,
  Brick,
  Flame,
  Settings,
  Palette,
  Tree,
  Scissors,
  Sun,
  Plant,
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