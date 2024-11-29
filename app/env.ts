import { Dependencies } from '@/data/formDefinition/formDefinitionsDep';

declare module "react-router" {
  // Your AppLoadContext used in v2
  interface AppLoadContext {
    dependencies: Dependencies;
    refreshDependencies: () => Promise<void>;
  }

  // TODO: remove this once we've migrated to `Route.LoaderArgs` instead for our loaders
  interface LoaderFunctionArgs {
    context: AppLoadContext;
  }

  // TODO: remove this once we've migrated to `Route.ActionArgs` instead for our actions
  interface ActionFunctionArgs {
    context: AppLoadContext;
  }
}

export {}; // necessary for TS to treat this as a module