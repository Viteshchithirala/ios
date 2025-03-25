import * as React from "react";
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  Rect,
} from "react-native-svg";
const RocketSolid = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_4224_12671)">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5C21.9489 1.5 22.1397 1.57902 22.2803 1.71967C22.421 1.86032 22.5 2.05109 22.5 2.25C22.5 7.306 20.117 11.805 16.416 14.686C16.5699 15.6502 16.5128 16.6364 16.2486 17.5764C15.9844 18.5164 15.5194 19.388 14.8857 20.1308C14.2519 20.8737 13.4646 21.4702 12.5779 21.8792C11.6913 22.2883 10.7264 22.5001 9.75 22.5C9.55109 22.5 9.36032 22.421 9.21967 22.2803C9.07902 22.1397 9 21.9489 9 21.75V17.619C8.02793 16.8514 7.14925 15.9724 6.382 15H2.25C2.05109 15 1.86032 14.921 1.71967 14.7803C1.57902 14.6397 1.5 14.4489 1.5 14.25C1.49992 13.2735 1.71173 12.3085 2.12082 11.4218C2.52991 10.5351 3.12653 9.74765 3.86951 9.11391C4.61249 8.48017 5.48413 8.01519 6.42427 7.75105C7.36442 7.48692 8.35068 7.42992 9.315 7.584ZM15 6.75C14.4033 6.75 13.831 6.98705 13.409 7.40901C12.9871 7.83097 12.75 8.40326 12.75 9C12.75 9.59674 12.9871 10.169 13.409 10.591C13.831 11.0129 14.4033 11.25 15 11.25C15.5967 11.25 16.169 11.0129 16.591 10.591C17.0129 10.169 17.25 9.59674 17.25 9C17.25 8.40326 17.0129 7.83097 16.591 7.40901C16.169 6.98705 15.5967 6.75 15 6.75Z"
        fill="url(#paint0_linear_4224_12671)"
      />
      <Path
        d="M5.26004 17.2419C5.33903 17.183 5.40564 17.1092 5.45608 17.0245C5.50652 16.9399 5.53979 16.8461 5.554 16.7486C5.56821 16.6511 5.56307 16.5518 5.53888 16.4563C5.5147 16.3607 5.47193 16.2709 5.41304 16.1919C5.35414 16.1129 5.28026 16.0463 5.19562 15.9959C5.11097 15.9455 5.01723 15.9122 4.91972 15.898C4.82222 15.8838 4.72288 15.8889 4.62736 15.9131C4.53184 15.9373 4.44203 15.98 4.36304 16.0389C3.59593 16.6096 2.99945 17.3791 2.63812 18.2642C2.27679 19.1494 2.16438 20.1165 2.31304 21.0609C2.33721 21.2182 2.4108 21.3638 2.52316 21.4765C2.63551 21.5892 2.78081 21.6633 2.93804 21.6879C3.88257 21.8365 4.84974 21.7239 5.73491 21.3624C6.62008 21.0009 7.38954 20.4042 7.96004 19.6369C8.02083 19.5582 8.06534 19.4681 8.09097 19.3719C8.11661 19.2758 8.12285 19.1755 8.10933 19.0769C8.09582 18.9783 8.06282 18.8834 8.01226 18.7977C7.9617 18.712 7.89459 18.6372 7.81484 18.5777C7.73509 18.5181 7.64429 18.4751 7.54774 18.451C7.45118 18.4269 7.3508 18.4223 7.25244 18.4374C7.15409 18.4525 7.05972 18.4871 6.97483 18.539C6.88995 18.5909 6.81626 18.6592 6.75804 18.7399C6.4093 19.2089 5.95561 19.5898 5.43328 19.852C4.91095 20.1142 4.33449 20.2505 3.75004 20.2499C3.75004 19.0199 4.34204 17.9269 5.26004 17.2419Z"
        fill="url(#paint1_linear_4224_12671)"
      />
    </G>
    <Defs>
      <LinearGradient
        id="paint0_linear_4224_12671"
        x1={-2.30315}
        y1={22.5}
        x2={22.5}
        y2={22.5}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.253333} stopColor="#F97316" />
        <Stop offset={1} stopColor="#FAA729" />
      </LinearGradient>
      <LinearGradient
        id="paint1_linear_4224_12671"
        x1={1.18674}
        y1={21.7516}
        x2={8.11628}
        y2={21.7516}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.253333} stopColor="#F97316" />
        <Stop offset={1} stopColor="#FAA729" />
      </LinearGradient>
      <ClipPath id="clip0_4224_12671">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default RocketSolid;
