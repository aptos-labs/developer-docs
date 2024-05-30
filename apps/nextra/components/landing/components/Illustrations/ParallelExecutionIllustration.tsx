import { SVGProps } from "react";

export function ParallelExecutionIllustration(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" fill="none" {...props}>
      <g className="animate-fade-in-second">
        <path
          d="M68.248 137.178L100 85.2202L131.752 137.178L68.248 137.178Z"
          stroke="var(--illustration-line-secondary)"
          strokeOpacity="0.5"
        />
        <path
          opacity="0.5"
          d="M110.546 85.2204C110.546 91.0449 105.825 95.7665 100 95.7665C94.1755 95.7665 89.4539 91.0449 89.4539 85.2204C89.4539 79.3959 94.1755 74.6742 100 74.6742C105.825 74.6742 110.546 79.3959 110.546 85.2204Z"
          fill="var(--illustration-bg)"
          stroke="var(--illustration-line-secondary)"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M99.9999 93.8801C104.782 93.8801 108.66 90.003 108.66 85.2204C108.66 80.4378 104.782 76.5608 99.9999 76.5608C95.2173 76.5608 91.3403 80.4378 91.3403 85.2204C91.3403 90.003 95.2173 93.8801 99.9999 93.8801ZM76.9076 137.178C76.9076 141.961 73.0306 145.838 68.248 145.838C63.4654 145.838 59.5884 141.961 59.5884 137.178C59.5884 132.396 63.4654 128.519 68.248 128.519C73.0306 128.519 76.9076 132.396 76.9076 137.178ZM140.412 137.178C140.412 141.961 136.535 145.838 131.752 145.838C126.969 145.838 123.092 141.961 123.092 137.178C123.092 132.396 126.969 128.519 131.752 128.519C136.535 128.519 140.412 132.396 140.412 137.178Z"
          fill="url(#paint0_linear_41_832)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M99.9999 93.8801C104.782 93.8801 108.66 90.003 108.66 85.2204C108.66 80.4378 104.782 76.5608 99.9999 76.5608C95.2173 76.5608 91.3403 80.4378 91.3403 85.2204C91.3403 90.003 95.2173 93.8801 99.9999 93.8801ZM76.9076 137.178C76.9076 141.961 73.0306 145.838 68.248 145.838C63.4654 145.838 59.5884 141.961 59.5884 137.178C59.5884 132.396 63.4654 128.519 68.248 128.519C73.0306 128.519 76.9076 132.396 76.9076 137.178ZM140.412 137.178C140.412 141.961 136.535 145.838 131.752 145.838C126.969 145.838 123.092 141.961 123.092 137.178C123.092 132.396 126.969 128.519 131.752 128.519C136.535 128.519 140.412 132.396 140.412 137.178Z"
          fill="var(--illustration-shadow)"
          fillOpacity="0.8"
        />
      </g>

      <g className="animate-fade-in-first">
        <path
          d="M50.8608 148.535L99.9999 68.1261L149.139 148.535L50.8608 148.535Z"
          stroke="var(--illustration-line-secondary)"
          strokeOpacity="0.8"
        />
        <path
          opacity="0.5"
          d="M116.869 68.1263C116.869 77.4427 109.316 84.9951 99.9999 84.9951C90.6835 84.9951 83.1311 77.4427 83.1311 68.1263C83.1311 58.81 90.6835 51.2576 99.9999 51.2576C109.316 51.2576 116.869 58.81 116.869 68.1263Z"
          fill="var(--illustration-bg)"
          stroke="var(--illustration-line-secondary)"
          strokeWidth="2"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M99.9996 81.5281C107.401 81.5281 113.401 75.528 113.401 68.1265C113.401 60.7251 107.401 54.725 99.9996 54.725C92.5982 54.725 86.5981 60.7251 86.5981 68.1265C86.5981 75.528 92.5982 81.5281 99.9996 81.5281ZM64.2624 148.536C64.2624 155.938 58.2623 161.938 50.8608 161.938C43.4593 161.938 37.4592 155.938 37.4592 148.536C37.4592 141.135 43.4593 135.135 50.8608 135.135C58.2623 135.135 64.2624 141.135 64.2624 148.536ZM162.541 148.536C162.541 155.938 156.54 161.938 149.139 161.938C141.737 161.938 135.737 155.938 135.737 148.536C135.737 141.135 141.737 135.135 149.139 135.135C156.54 135.135 162.541 141.135 162.541 148.536Z"
          fill="url(#paint1_linear_41_832)"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M99.9996 81.5281C107.401 81.5281 113.401 75.528 113.401 68.1265C113.401 60.7251 107.401 54.725 99.9996 54.725C92.5982 54.725 86.5981 60.7251 86.5981 68.1265C86.5981 75.528 92.5982 81.5281 99.9996 81.5281ZM64.2624 148.536C64.2624 155.938 58.2623 161.938 50.8608 161.938C43.4593 161.938 37.4592 155.938 37.4592 148.536C37.4592 141.135 43.4593 135.135 50.8608 135.135C58.2623 135.135 64.2624 141.135 64.2624 148.536ZM162.541 148.536C162.541 155.938 156.54 161.938 149.139 161.938C141.737 161.938 135.737 155.938 135.737 148.536C135.737 141.135 141.737 135.135 149.139 135.135C156.54 135.135 162.541 141.135 162.541 148.536Z"
          fill="var(--illustration-shadow)"
          fillOpacity="0.5"
        />
      </g>

      <path
        d="M35.2942 155.882L100 49.9995L164.706 155.882H35.2942Z"
        stroke="var(--illustration-line-secondary)"
        strokeWidth="2"
        strokeDasharray="14.47 14.47"
      />
      <circle
        opacity="0.5"
        cx="99.9999"
        cy="49.9997"
        r="22.5294"
        fill="var(--illustration-bg)"
        stroke="var(--illustration-line-secondary)"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M99.9996 67.647C109.746 67.647 117.647 59.7462 117.647 50C117.647 40.2538 109.746 32.3529 99.9996 32.3529C90.2534 32.3529 82.3526 40.2538 82.3526 50C82.3526 59.7462 90.2534 67.647 99.9996 67.647ZM52.9411 155.883C52.9411 165.629 45.0402 173.53 35.294 173.53C25.5478 173.53 17.647 165.629 17.647 155.883C17.647 146.136 25.5478 138.236 35.294 138.236C45.0402 138.236 52.9411 146.136 52.9411 155.883ZM182.353 155.883C182.353 165.629 174.452 173.53 164.706 173.53C154.96 173.53 147.059 165.629 147.059 155.883C147.059 146.136 154.96 138.236 164.706 138.236C174.452 138.236 182.353 146.136 182.353 155.883Z"
        fill="url(#paint2_linear_41_832)"
      />
      <ellipse
        cx="99.9996"
        cy="50"
        rx="17.6471"
        ry="17.6471"
        fill="url(#paint3_linear_41_832)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_41_832"
          x1="100"
          y1="145.838"
          x2="100.008"
          y2="76.562"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#78D5E2" />
          <stop offset="0.0926214" stopColor="#88D2CD" />
          <stop offset="0.2402" stopColor="#9DCEB1" />
          <stop offset="0.3254" stopColor="#A5CDA6" />
          <stop offset="0.5032" stopColor="#AEBD9A" />
          <stop offset="0.8469" stopColor="#C6957C" />
          <stop offset="0.9994" stopColor="#D2816D" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_41_832"
          x1="99.9999"
          y1="161.938"
          x2="100.012"
          y2="54.7268"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#78D5E2" />
          <stop offset="0.0926214" stopColor="#88D2CD" />
          <stop offset="0.2402" stopColor="#9DCEB1" />
          <stop offset="0.3254" stopColor="#A5CDA6" />
          <stop offset="0.5032" stopColor="#AEBD9A" />
          <stop offset="0.8469" stopColor="#C6957C" />
          <stop offset="0.9994" stopColor="#D2816D" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_41_832"
          x1="99.9999"
          y1="173.53"
          x2="100.016"
          y2="32.3553"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#78D5E2" />
          <stop offset="0.0926214" stopColor="#88D2CD" />
          <stop offset="0.2402" stopColor="#9DCEB1" />
          <stop offset="0.3254" stopColor="#A5CDA6" />
          <stop offset="0.5032" stopColor="#AEBD9A" />
          <stop offset="0.8469" stopColor="#C6957C" />
          <stop offset="0.9994" stopColor="#D2816D" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_41_832"
          x1="99.9996"
          y1="176.471"
          x2="100.015"
          y2="32.3535"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#78D5E2" />
          <stop offset="0.0926214" stopColor="#88D2CD" />
          <stop offset="0.2402" stopColor="#9DCEB1" />
          <stop offset="0.3254" stopColor="#A5CDA6" />
          <stop offset="0.5032" stopColor="#AEBD9A" />
          <stop offset="0.8469" stopColor="#C6957C" />
          <stop offset="0.9994" stopColor="#D2816D" />
        </linearGradient>
      </defs>
    </svg>
  );
}
