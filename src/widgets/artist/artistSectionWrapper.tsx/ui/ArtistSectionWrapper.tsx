import { ArtistSectionWrapperProps } from "../model/types";

export const ArtistSectionWrapper: React.FC<ArtistSectionWrapperProps> = ({
  title,
  children,
}) => {
  return (
    <section className="px-4 py-8 mx-auto max-w-7xl">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
};
