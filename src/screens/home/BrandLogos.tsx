import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

export interface BrandLogoProps {
  slug: string;
  size?: number;
  color?: string;
}

export default function BrandLogo({
  slug,
  size = 28,
  color = '#111827',
}: BrandLogoProps) {
  switch (slug.toLowerCase()) {
    case 'mercedes':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" />
          <Path
            d="M12 2.5L12 12M12 12L4.5 17.5M12 12L19.5 17.5"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );

    case 'bmw':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="10.5" stroke={color} strokeWidth="1.5" />
          <Circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1" />
          <Path
            d="M12 4A8 8 0 0 1 20 12L12 12Z"
            fill={color}
            opacity="0.85"
          />
          <Path
            d="M12 20A8 8 0 0 1 4 12L12 12Z"
            fill={color}
            opacity="0.85"
          />
        </Svg>
      );

    case 'tesla':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Path
            d="M3 5.5C8 4.2 16 4.2 21 5.5M12 6.5V20M8 8C10.5 7.2 13.5 7.2 16 8"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </Svg>
      );

    case 'toyota':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.6" />
          <Path
            d="M6 10C6 13 8.7 15 12 15C15.3 15 18 13 18 10C18 7 15.3 5 12 5C8.7 5 6 7 6 10Z"
            stroke={color}
            strokeWidth="1.5"
          />
          <Path
            d="M12 5V19"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </Svg>
      );

    case 'audi':
      return (
        <Svg width={size} height={size} viewBox="0 0 32 24" fill="none">
          <Circle cx="7" cy="12" r="4.5" stroke={color} strokeWidth="1.5" />
          <Circle cx="13" cy="12" r="4.5" stroke={color} strokeWidth="1.5" />
          <Circle cx="19" cy="12" r="4.5" stroke={color} strokeWidth="1.5" />
          <Circle cx="25" cy="12" r="4.5" stroke={color} strokeWidth="1.5" />
        </Svg>
      );

    case 'hyundai':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.6" />
          <Path
            d="M8 7L10 17M16 7L14 17M8.8 12H15.2"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </Svg>
      );

    default:
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.8" />
          <Path
            d="M7 12H17M12 7L17 12L12 17"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
  }
}

