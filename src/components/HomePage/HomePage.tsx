import Layout from '../Layout/Layout';
import HomeContent from '../HomeContent/HomeContent';
import { observer } from 'mobx-react-lite';

const HomePage = () => {
  return (
    <Layout>
      <HomeContent />
    </Layout>
  );
};

export default observer(HomePage);
