import { Dependencies } from '@/data/formDefinition/formDefinitionsDep';
import { i18n } from 'i18next';

declare module "react-router" {
  interface AppLoadContext {
    dependencies: Dependencies;
    refreshDependencies: () => Promise<void>;
    i18n: i18n;
  }
}

export {};