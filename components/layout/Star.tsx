import { getStarGazers } from '@/util/octokit';
import Link from 'next/link';

export default async function Star() {
  let starCnt = await getStarGazers();
  let href = 'https://github.com/yeolyi/blog';

  return (
    <div className="flex items-center overflow-hidden whitespace-nowrap rounded-[.25em] border border-solid border-[#d0d7de]">
      <Link
        href={href}
        className="flex items-center gap-[2px] bg-[#ebf0f4] px-[10px] py-[5px] text-[12px] font-semibold text-[#24292f]"
      >
        <StarSVG />
        Star
      </Link>
      <Link
        href={href}
        className="bg-white px-[10px] py-[5px] text-[12px] font-semibold text-[#24292f]"
      >
        {starCnt}
      </Link>
    </div>
  );
}

let addCommas = (n: number) => {
  return String(n).replace(/(\d)(?=(\d{3})+$)/g, '$1,');
};

let StarSVG = () => (
  <svg
    viewBox="0 0 16 16"
    width="16"
    height="16"
    className="octicon octicon-star"
    aria-hidden="true"
  >
    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
  </svg>
);