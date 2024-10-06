import {
  ultraPath,
  defaultPath,
  ultraSvgSize,
  defaultSVGSize,
  ultraBorderPath,
  defaultBorderPath,
  ultraBorderSize,
  defaultBorderSize,
} from '@/client/components/layout/island/path';
import { allMdxPosts } from '@/client/mdx/index.ts';
import { MdxPage } from '@/client/types/page.ts';
import { LazyMotion, m } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { FaInstagram } from 'react-icons/fa6';
import { PiMapPinBold } from 'react-icons/pi';
import { RiHomeLine } from 'react-icons/ri';
import { RxGithubLogo } from 'react-icons/rx';
import { Link } from 'wouter';

const loadFeatures = () => import('./lazy.ts').then((res) => res.default);

export default function Island({ page }: { page: MdxPage }) {
  const [hover, setHover] = useState(false);
  const borderSize = hover ? ultraBorderSize : defaultBorderSize;
  const size = hover ? ultraSvgSize : defaultSVGSize;
  const isTouch = window.matchMedia('(any-hover: none)').matches;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isTouch) return;

    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (isTouch) setHover(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('scroll', handleClickOutside);
    };
  }, [isTouch]);

  return (
    <LazyMotion features={loadFeatures} strict>
      <div className="not-prose fixed bottom-6 left-6 z-50">
        <m.div
          className="absolute bottom-[-1px] left-[-1px] bg-[#3C3C3C]"
          animate={{
            ...borderSize,
            clipPath: `path('${hover ? ultraBorderPath : defaultBorderPath}')`,
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 30,
            },
          }}
          initial={false}
        />
        <m.div
          className="absolute bottom-0 left-0 gap-1 bg-black"
          animate={{
            ...size,
            clipPath: `path('${hover ? ultraPath : defaultPath}')`,
            transition: {
              type: 'spring',
              stiffness: 400,
              damping: 30,
            },
          }}
          onHoverStart={() => setHover(true)}
          onHoverEnd={() => setHover(false)}
          onClick={() => isTouch && setHover(true)}
          initial={false}
          ref={ref}
          layout
        >
          {hover ?
            <Detail page={page} />
          : <Preview />}
        </m.div>
      </div>
    </LazyMotion>
  );
}

const Preview = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <PiMapPinBold className="text-[25px]" />
    </div>
  );
};

const Detail = ({ page }: { page: MdxPage }) => {
  const getPathId = (x: string) => x.split('/')[1];
  const id = getPathId(page.path);

  const relatedPostList = allMdxPosts.filter(
    ({ path }) => id === getPathId(path),
  );

  const recentPostList: MdxPage[] = [];
  let wordCnt = 0;
  for (const post of relatedPostList) {
    wordCnt += post.title.length;
    if (130 < wordCnt) break;
    recentPostList.push(post);
  }

  return (
    <div
      className="flex h-full w-full flex-col justify-between px-6 py-4"
      style={ultraSvgSize}
    >
      <m.p className="whitespace-pre-wrap">
        {recentPostList
          .filter(({ path }) => id === getPathId(path))
          .map((_page, idx) => {
            const isCurrent = _page === page;

            return (
              <DetailLink highlight={isCurrent} key={idx} href={_page.path}>
                {_page.title}
                {'    '}
              </DetailLink>
            );
          })}
      </m.p>
      <div className="flex w-full justify-end gap-4">
        <DetailLink href="/" className="flex items-center gap-1">
          <RiHomeLine className="inline text-[20px]" />홈
        </DetailLink>
        <DetailLink
          href="https://github.com/yeolyi"
          className="flex items-center gap-1"
        >
          <RxGithubLogo className="inline text-[20px]" />
          깃허브
        </DetailLink>
        <DetailLink
          href="https://instagram.com/yeolyii"
          className="flex items-center gap-1"
        >
          <FaInstagram className="inline text-[20px]" />
          인스타
        </DetailLink>
      </div>
    </div>
  );
};

const DetailLink = ({
  className,
  href,
  highlight,
  onClick,
  children,
}: {
  className?: string;
  href: string;
  highlight?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) => (
  <Link
    className={`font-semibold ${highlight ? 'text-white' : 'text-neutral-400'} cursor-pointer hover:text-neutral-200 ${className}`}
    onClick={onClick}
    href={href}
  >
    {children}
  </Link>
);
