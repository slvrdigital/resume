import Head from "next/head";
import { useRouter } from "next/router";
import path from "path";
import meta from "@/public/data/meta.json";

type Props = Record<string, string>;

const SITE_NAME = meta.site_name;
const SITE_URL = meta.site_url;
const TWITTER_USERNAME = meta.twitter_username;

const Meta: React.FC<Props> = ({
  locale,
  title,
  image,
  description,
  author,
  published,
  modified,
  section,
  tags,
}: Props) => {
  const router = useRouter();
  const url = SITE_URL + router.asPath;
  const ogType = router.pathname === "/" ? "website" : "article";

  function getImage() {
    return (
      image ?? path.join(SITE_URL, process.env.BASE_PATH ?? "", "avatar.jpeg")
    );
  }

  function getTitle(): string {
    if (router.pathname === "/") return meta.site_name;
    return title ? `${meta.site_name} — ${title}` : meta.site_name;
  }

  return (
    <Head>
      <title>{getTitle()}</title>
      <meta name="description" content={description} key="description" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={TWITTER_USERNAME} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={getTitle()} />
      <meta
        property="og:description"
        content={description}
        key="ogDescription"
      />
      <meta property="og:image" content={getImage()} key="ogImage" />
    </Head>
  );
};

export default Meta;
