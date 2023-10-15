import { PageConfig } from "next";

type Props = Record<"posts", any[]>;

export const config: PageConfig = {
  unstable_runtimeJS: false,
};

export default function Demo({ posts }: Props) {
  return (
    <div className="container mx-auto">
      <ul className="grid gap-4">
        {posts.map((post, index) => (
          <li key={index}>
            <h2 className="text-2xl">{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
      meta: {
        title: "Demo page",
        description: "Demo page desciption",
      },
    },
  };
}
