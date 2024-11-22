import '@remix-run/server-runtime';
import { Dependencies } from '@/data/formDefinition/formDefinitionsDep';

declare module '@remix-run/server-runtime' {
  export interface AppLoadContext {
    dependencies: Dependencies;
    refreshDependencies: () => Promise<void>;
  }
}
