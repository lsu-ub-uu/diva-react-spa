import '@remix-run/server-runtime';
import { Dependencies } from '@/.server/data/formDefinition/formDefinitionsDep';
import { i18n } from 'i18next';

declare module '@remix-run/server-runtime' {
  export interface AppLoadContext {
    dependencies: Dependencies;
    refreshDependencies: () => Promise<void>;
    i18n: i18n;
  }
}
