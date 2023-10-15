import Head from "next/head";
import { useRouter } from "next/router";

type Props = Record<string, string>;

const SITE_NAME = "Yevheniy Kshevitskyi";
const SITE_URL = "htpps://apple.com";
const TWITTER_USERNAME = "@kshevitskiy";

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

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={TWITTER_USERNAME} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={locale} />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content={description}
        key="ogDescription"
      />
      <meta property="og:image" content={image} key="ogImage" />
    </Head>
  );
};

export default Meta;
