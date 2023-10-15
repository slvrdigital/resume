import { PageConfig } from "next";
import Image from "next/image";

// export const config: PageConfig = {
//   unstable_runtimeJS: false,
// };

export default function Home() {
  return (
    <>
      <section>
        <div className="container mx-auto">
          <h2>About</h2>
          <p>
            I’m a designer with 20 years of experience in brand, product design,
            and creative direction. I have an international reputation for
            creating warm, smart, and effective design for a variety of
            companies in technology and publishing. Among these is Abstract
            (acq. Adobe), which I co-founded in 2014. I’m head of brand at
            Modern Treasury.
          </p>
          <p>
            I also write and speak about design. Several of my essays and
            lectures are assigned in design classrooms around the world and act
            as foundational texts in the web design industry, including
            Everything Easy is Hard Again, The Web’s Grain, and What Screens
            Want. In 2012, I wrote, illustrated, and published The Shape of
            Design.
          </p>
        </div>
      </section>

      <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/next.svg"
        alt="Next.js Logo"
        width={180}
        height={37}
        priority
      />
    </>
  );
}
