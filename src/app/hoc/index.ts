import { composeProviders } from "@/shared/helpers";
import { QueryProvider } from "./WithTanstakQuery";
import { WithErrorBoundary } from "./WithErrorBoundary";
import { WithRouter } from "./WithRouter";

const providersArr = [QueryProvider, WithRouter, WithErrorBoundary];

const Providers = composeProviders(providersArr);

export default Providers;
