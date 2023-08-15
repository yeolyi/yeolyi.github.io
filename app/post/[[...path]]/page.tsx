import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";

const Post = async ({ params }: { params: { path?: string[] } }) => {
  const { content, frontmatter } = await fetchPost(params.path);
  return (
    <div className="flex flex-col m-8 prose">
      <h2>{frontmatter.title}</h2>
      <hr />
      {content}
    </div>
  );
};

const BASE_URL = "http://43.200.204.95:3001/";

const fetchPost = async (path?: string[]) => {
  let url = BASE_URL;
  if (path !== undefined) {
    url += path.join("/");
    url += "/";
  }
  url += "index.md";

  const resp = await fetch(url);
  const source = await resp.text();
  return await compileMDX<{ title: string }>({
    source,
    options: { parseFrontmatter: true, mdxOptions: { format: "md" } },
    components: {
      a: (props) => (
        <Link href={absolute(props.href ?? "")}>{props.children}</Link>
      ),
    },
  });
};

function absolute(href: string) {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("/")
  ) {
    return href;
  }

  const stack = ["post"];
  const parts = href.split("/");

  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === ".") continue;
    if (parts[i] === "..") stack.pop();
    else stack.push(parts[i]);
  }

  return stack.join("/");
}

export default Post;
