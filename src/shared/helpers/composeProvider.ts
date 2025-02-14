import React, { FC, ReactNode } from "react";

export function composeProviders(
  providers: FC<{ children: ReactNode }>[]
): FC<{ children: ReactNode }> {
  return function ComposedProvider({ children }: { children: ReactNode }) {
    return providers.reduceRight<ReactNode>(
      (acc, Provider) => React.createElement(Provider, null, acc),
      children
    );
  };
}
