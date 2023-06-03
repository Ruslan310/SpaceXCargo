import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Svg, Path, G} from 'react-native-svg';
import COLORS from '../../colors/colors';

const TRASH = 'trash';
const CHECK = 'check';

interface Props {
  type: string;
  size: number;
  style?: StyleProp<ViewStyle>;
  color?: string;
  activeColor?: string;
  unActiveColor?: string;
}

const IconSVG = ({
  type,
  size = 1,
  style,
  color,
  unActiveColor = COLORS.black100,
}: Props) => {
  const active = color ? COLORS.white100 : unActiveColor;
  switch (type) {
    case TRASH:
      return (
        <Svg
          width={(26 * size) / 100}
          height={(24 * size) / 100}
          style={style}
          fill="none">
          <G scale={size / 100}>
            <Path
              d="M10.5 15L10.5 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <Path
              d="M14.5 15L14.5 12"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <Path
              d="M3.5 7H21.5V7C20.5681 7 20.1022 7 19.7346 7.15224C19.2446 7.35523 18.8552 7.74458 18.6522 8.23463C18.5 8.60218 18.5 9.06812 18.5 10V16C18.5 17.8856 18.5 18.8284 17.9142 19.4142C17.3284 20 16.3856 20 14.5 20H10.5C8.61438 20 7.67157 20 7.08579 19.4142C6.5 18.8284 6.5 17.8856 6.5 16V10C6.5 9.06812 6.5 8.60218 6.34776 8.23463C6.14477 7.74458 5.75542 7.35523 5.26537 7.15224C4.89782 7 4.43188 7 3.5 7V7Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <Path
              d="M10.5681 3.37059C10.6821 3.26427 10.9332 3.17033 11.2825 3.10332C11.6318 3.03632 12.0597 3 12.5 3C12.9403 3 13.3682 3.03632 13.7175 3.10332C14.0668 3.17033 14.3179 3.26427 14.4319 3.37059"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </G>
        </Svg>
      );
    case CHECK:
      return (
        <Svg
          width={(25 * size) / 100}
          height={(24 * size) / 100}
          style={style}
          fill={color || 'none'}>
          <G scale={size / 100}>
            <Path
              d="M16 5C17.4045 5 18.1067 5 18.6111 5.33706C18.8295 5.48298 19.017 5.67048 19.1629 5.88886C19.5 6.39331 19.5 7.09554 19.5 8.5V18C19.5 19.8856 19.5 20.8284 18.9142 21.4142C18.3284 22 17.3856 22 15.5 22H9.5C7.61438 22 6.67157 22 6.08579 21.4142C5.5 20.8284 5.5 19.8856 5.5 18V8.5C5.5 7.09554 5.5 6.39331 5.83706 5.88886C5.98298 5.67048 6.17048 5.48298 6.38886 5.33706C6.89331 5 7.59554 5 9 5"
              stroke="#222222"
            />
            <Path
              d="M9.5 5C9.5 3.89543 10.3954 3 11.5 3H13.5C14.6046 3 15.5 3.89543 15.5 5C15.5 6.10457 14.6046 7 13.5 7H11.5C10.3954 7 9.5 6.10457 9.5 5Z"
              stroke={active}
            />
            <Path d="M9.5 12L15.5 12" stroke={active} strokeLinecap="round" />
            <Path d="M9.5 16L13.5 16" stroke={active} strokeLinecap="round" />
          </G>
        </Svg>
      );
    default:
      return null;
  }
};

export default IconSVG;
