import React from 'react';
import { View } from 'react-native';
import Svg, { 
  Path, 
  Circle, 
  Text as SvgText, 
  Defs, 
  LinearGradient, 
  Stop 
} from 'react-native-svg';

interface OpenDreamsLogoProps {
  width?: number;
  height?: number;
}

export const OpenDreamsLogo: React.FC<OpenDreamsLogoProps> = ({ 
  width = 200, 
  height = 120 
}) => {
  return (
    <View style={{ width, height, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={width} height={height} viewBox="0 0 200 120">
        <Defs>
          {/* Gradient for the sun */}
          <LinearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#FCD34D" />
            <Stop offset="100%" stopColor="#F59E0B" />
          </LinearGradient>
          
          {/* Gradient for the book */}
          <LinearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#3B82F6" />
            <Stop offset="100%" stopColor="#1E40AF" />
          </LinearGradient>
        </Defs>
        
        {/* Sun rays */}
        <Path
          d="M100 15 L100 5 M115 18 L122 11 M130 30 L140 30 M115 42 L122 49 M85 18 L78 11 M70 30 L60 30 M85 42 L78 49"
          stroke="#FCD34D"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Sun circle */}
        <Circle
          cx="100"
          cy="30"
          r="12"
          fill="url(#sunGradient)"
          stroke="#F59E0B"
          strokeWidth="1"
        />
        
        {/* Book base */}
        <Path
          d="M60 45 L140 45 L135 65 L65 65 Z"
          fill="url(#bookGradient)"
          stroke="#1E40AF"
          strokeWidth="1"
        />
        
        {/* Book pages (left side) */}
        <Path
          d="M60 45 L100 40 L100 60 L65 65 Z"
          fill="#E0F2FE"
          stroke="#0EA5E9"
          strokeWidth="0.5"
        />
        
        {/* Book pages (right side) */}
        <Path
          d="M100 40 L140 45 L135 65 L100 60 Z"
          fill="#DBEAFE"
          stroke="#3B82F6"
          strokeWidth="0.5"
        />
        
        {/* Book spine */}
        <Path
          d="M100 40 L100 60"
          stroke="#1E40AF"
          strokeWidth="1.5"
        />
        
        {/* Page lines */}
        <Path
          d="M70 50 L95 48 M70 53 L95 51 M70 56 L95 54"
          stroke="#0EA5E9"
          strokeWidth="0.5"
          opacity="0.7"
        />
        <Path
          d="M105 48 L130 50 M105 51 L130 53 M105 54 L130 56"
          stroke="#3B82F6"
          strokeWidth="0.5"
          opacity="0.7"
        />
        
        {/* OpenDreams text */}
        <SvgText
          x="100"
          y="85"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="#0EA5E9"
        >
          Open
        </SvgText>
        <SvgText
          x="100"
          y="100"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill="#F59E0B"
        >
          Dreams
        </SvgText>
      </Svg>
    </View>
  );
};
