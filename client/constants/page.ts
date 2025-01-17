import { allMdxPosts } from '@/client/mdx';
import { MdxPage, Page } from '@/client/types/page';

export const mainPage: Page = {
  title: '개발자 성열',
  description: '유익하고 바보같고 화가나는 개발자 일상',
  path: '/',
};

export const notFoundPage: MdxPage = {
  title: '404 Not Found',
  description: '404 문서 구경하고 가세요.',
  // 이게 맞나...?
  path: '/aegjnhln',
  importMdx: () => import('../mdx/etc/notFound.mdx'),
};

export const pageList = [mainPage, ...allMdxPosts];
