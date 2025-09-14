import StoryblokProvider from "@/providers/StoryblokProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <StoryblokProvider>{children}</StoryblokProvider>;
}
