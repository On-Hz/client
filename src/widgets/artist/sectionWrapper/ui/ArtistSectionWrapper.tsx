import { ArtistSectionWrapperProps } from "../model/types";

export const ArtistSectionWrapper: React.FC<ArtistSectionWrapperProps> = ({
  title,
  children,
}) => {
  return (
    <section className="py-8 px-20 max-800:px-5">
      <h2 className="mb-4 text-2xl font-bold hz-landing-title">{title}</h2>
      {children}
    </section>
  );
};
