import { PostCellProps } from '@/routes/main/components/post/PostCell';
import lodash from './assets/lodash.svg';
import es2024 from './assets/es2024.png';
import eslint from './assets/eslint.svg';
import jslogo from './assets/jslogo.svg';

export let postCellProps: PostCellProps[] = [
  {
    title: '가볍게 살펴보는 ESLint',
    dateStr: '2024.07.21',
    fileName: 'eslint',
    src: eslint,
    objectFit: 'contain',
  },
  {
    title: '가볍게 살펴보는 Lodash',
    dateStr: '2024.07.20',
    fileName: 'lodash',
    src: lodash,
    objectFit: 'contain',
  },
  {
    title: '책에는 없는 JS 기능 구경',
    dateStr: '2024.07.19',
    fileName: 'es2024',
    src: jslogo,
    objectFit: 'contain',
  },
  {
    title: '미래의 자바스크립트 미리 써보기',
    dateStr: '2024.07.07',
    fileName: 'js-proposals',
    src: es2024,
    objectFit: 'cover',
  },
];