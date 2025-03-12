import CommonHeader from '@components/common/header/CommonHeader.tsx';
import { useEffect, useState } from 'react';
import Card from '@pages/bookmark/components/Card.tsx';
import styles from './styles/index.module.scss';

function Index() {
  const [data, setData] = useState([]);
  const getData = () => {};

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={styles.page}>
      {/* 공통 헤더 UI 부분 */}
      <CommonHeader />
      <main className={styles.page__contents}>
        <Card />
      </main>
    </div>
  );
}

export default Index;
