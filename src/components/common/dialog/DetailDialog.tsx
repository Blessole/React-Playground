import { CardDTO } from '@pages/index/types/card.ts';
import { useEffect, useState } from 'react';
import styles from './DetailDialog.module.scss';
import toast, { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/dark.css';

toastConfig({ theme: 'dark' });

interface Props {
  data: CardDTO;
  handleDialog: (eventValue: boolean) => void;
}

function DetailDialog({ data, handleDialog }: Props) {
  console.log(data);
  const [bookmark, setBookmark] = useState(false);

  // 다이얼로그 끄기
  const closeDialog = () => {
    handleDialog(false);
  };

  const getLocalStorage = JSON.parse(localStorage.getItem('bookmark'));
  // 북마크 추가 이벤트
  const addBookmark = (selected: CardDTO) => {
    setBookmark(true);

    // 값을 저장할 때 stringify로 저장하기 때문에, parse로 가져와야함
    // 1. 로컬 스토리지에 bookmark 라는 데이터가 없을 경우
    if (!getLocalStorage) {
      localStorage.setItem('bookmark', JSON.stringify([selected]));
      toast('해당 이미지를 북마크에 저장했습니다.');
    } else {
      // 2. 로컬 스토리지에 bookmark 라는 데이터가 있을 경우
      // 2-1. 중복된 데이터가 있는지 확인
      const isDuplicate = getLocalStorage.some(
        (item: CardDTO) => item.id === selected.id
      );
      // 2-2. 중복된 데이터가 없을 경우
      if (!isDuplicate) {
        localStorage.setItem(
          'bookmark',
          JSON.stringify([...getLocalStorage, selected])
        );

        toast('해당 이미지를 북마크에 저장했습니다.');
      } else {
        // 2-3. 중복된 데이터가 있을 경우
        toast('이미 북마크에 저장된 이미지입니다.');
      }
    }
  };

  useEffect(() => {
    if (
      getLocalStorage &&
      getLocalStorage.findIndex((item: CardDTO) => item.id === data.id) > -1
    ) {
      setBookmark(true);
    }

    // ESC 키를 눌렀을 때, 다이얼로그 닫기
    const escKeyDownCloseDialog = (event) => {
      if (event.key === 'Escape') {
        closeDialog();
      }
    };

    // 위에 만들어둔 escKeyDownCloseDialog 함수를 이벤트리스너로 등록 및 해지
    document.addEventListener('keydown', escKeyDownCloseDialog);
    return () => {
      document.removeEventListener('keydown', escKeyDownCloseDialog);
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.container__dialog}>
        <div className={styles.container__dialog__header}>
          <div className={styles.close}>
            <button className={styles.close__button} onClick={closeDialog}>
              {/*구글아이콘 */}
              <span
                className='material-symbols-outlined'
                style={{ fontSize: 28 + 'px' }}
              >
                close
              </span>
            </button>
            <img
              src={data.user.profile_image.small}
              alt='닫기'
              className={styles.close__authorImage}
            />
            <span className={styles.close__authorName}>{data.user.name}</span>
          </div>
          <div className={styles.bookmark}>
            <button
              className={styles.bookmark__button}
              onClick={() => addBookmark(data)}
            >
              {/*구글아이콘 */}
              {bookmark === false ? (
                <span
                  className='material-symbols-outlined'
                  style={{ fontSize: 16 + 'px' }}
                >
                  favorite
                </span>
              ) : (
                <span
                  className='material-symbols-outlined'
                  style={{ fontSize: 16 + 'px', color: 'red' }}
                >
                  favorite
                </span>
              )}
              북마크
            </button>
            <button className={styles.bookmark__button}>다운로드</button>
          </div>
        </div>
        <div className={styles.container__dialog__body}>
          <img
            src={data.urls.small}
            alt='상세 이미지'
            className={styles.image}
          />
        </div>
        <div className={styles.container__dialog__footer}>
          <div className={styles.infoBox}>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>이미지 크기</span>
              <span className={styles.infoBox__item__value}>
                {data.width} X {data.height}
              </span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>업로드</span>
              <span className={styles.infoBox__item__value}>
                {data.created_at.split('T')[0]}
              </span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>
                마지막 업데이트
              </span>
              <span className={styles.infoBox__item__value}>
                {data.updated_at.split('T')[0]}
              </span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>다운로드</span>
              <span className={styles.infoBox__item__value}>{data.likes}</span>
            </div>
          </div>
          <div className={styles.tagBox}>
            <div className={styles.tagBox__tag}>dog</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailDialog;
