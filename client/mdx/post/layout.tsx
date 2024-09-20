import MdxLayout from '@/client/page/mdx/MdxLayout';
import { MdxPage } from '@/client/mdx/MdxPage';

export let PostLayout = (props: MdxPage) => {
  return <MdxLayout mdx={props.importMdx()} />;
};