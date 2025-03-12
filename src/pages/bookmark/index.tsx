import CommonHeader from '@components/common/header/CommonHeader.tsx';
import { useEffect, useState } from 'react';
import Card from '@pages/bookmark/components/Card.tsx';
import styles from './styles/index.module.scss';
import { CardDTO } from '@pages/index/types/card.ts';

function Index() {
  const [data, setData] = useState([]);
  const getData = () => {
    const getLocalStorage = JSON.parse(localStorage.getItem('bookmark'));
    if (getLocalStorage) {
      setData(getLocalStorage);
    } else {
      setData([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={styles.page}>
      {/* 공통 헤더 UI 부분 */}
      <CommonHeader />
      <main className={styles.page__contents}>
        {data.map((item: CardDTO) => {
          return <Card prop={item} key={item.id} />;
        })}
      </main>
    </div>
  );
}

export default Index;
