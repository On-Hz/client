import { composeProviders } from "@/shared/helpers";
import { QueryProvider } from "./WithTanstakQuery";
import { WithErrorBoundary } from "./WithErrorBoundary";
import { WithRouter } from "./WithRouter";
import { WithAuthInitializer } from "./WithAuthInitiaizer";

const providersArr = [QueryProvider, WithRouter, WithAuthInitializer, WithErrorBoundary];

const Providers = composeProviders(providersArr);

export default Providers;
