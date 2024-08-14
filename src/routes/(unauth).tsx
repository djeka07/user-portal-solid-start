import { RouteSectionProps } from '@solidjs/router';
import { Suspense } from 'solid-js';
import { PanelsRendererContainer } from '~/app/components/panels';
import { Spinner } from '~/app/components/spinners';
import Layout from '~/auth/components/layout/layout';

export default (props: RouteSectionProps) => (
  <Layout>
    <Suspense
      fallback={
        <div class="loading-wrapper">
          <Spinner />
        </div>
      }
    >
      {props.children}
      <PanelsRendererContainer />
    </Suspense>
  </Layout>
);
