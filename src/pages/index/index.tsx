import { useMemo, useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { imageData } from '@/store/selectors/imageSelector.ts';
import CommonHeader from '@components/common/header/CommonHeader.tsx';
import CommonSearchBar from '@components/common/searchBar/CommonSearchBar.tsx';
import CommonNav from '@components/common/navigation/CommonNav.tsx';
import CommonFooter from '@components/common/footer/CommonFooter.tsx';
import Card from '@pages/index/component/Card.tsx';
import DetailDialog from '@components/common/dialog/DetailDialog.tsx';

import styles from './styles/index.module.scss';
import { CardDTO } from '@pages/index/types/card.ts';

function Index() {
  const storeImg = useRecoilValueLoadable(imageData);
  const [imgData, setImgData] = useState<CardDTO[]>();
  const [open, setOpen] = useState<boolean>(false); // 이미지 상세 다이얼로그 발생 state

  // 반복적으로 호출해야하는 함수를 useMemo를 통해 한번만 호출하도록 처리 (vue의 computed와 비슷)
  const CARD_LIST = useMemo(() => {
    // storeImg.state = hasValue, loading, hasError
    if (storeImg.state === 'hasValue') {
      return storeImg.contents.results.map((card: CardDTO) => {
        return (
          <Card
            key={card.id}
            data={card}
            handleDialog={setOpen}
            handleSetData={setImgData}
          />
        );
      });
    } else {
      return <div>로딩중...</div>;
    }
  }, [storeImg]);

  return (
    <div className={styles.page}>
      {/* 공통 헤더 UI 부분 */}
      <CommonHeader />
      {/* 공통 네비게이션 UI 부분 */}
      <CommonNav />
      <div className={styles.page__contents}>
        <div className={styles.page__contents__introBox}>
          <div className={styles.wrapper}>
            <span className={styles.wrapper__title}>PhotoSplash</span>
            <span className={styles.wrapper__desc}>
              인터넷의 시각 자료 출처입니다. <br />
              모든 지역에 있는 크리에이터들의 지원을 받습니다.
            </span>
            {/* 검색 UI */}
            <CommonSearchBar />
          </div>
        </div>
        <div className={styles.page__contents__imageBox}>{CARD_LIST}</div>
      </div>
      {/* 공통 푸터 UI 부분 */}
      <CommonFooter />
      {open && <DetailDialog data={imgData} handleDialog={setOpen} />}
    </div>
  );
}

export default Index;
