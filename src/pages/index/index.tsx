import CommonHeader from "@components/common/header/CommonHeader.tsx";
import CommonSearchBar from "@components/common/searchBar/CommonSearchBar.tsx";
import CommonNav from "@components/common/navigation/CommonNav.tsx";
import CommonFooter from "@components/common/footer/CommonFooter.tsx";
import Card from "@pages/index/component/Card.tsx";
import styles from './styles/index.module.scss'
import axios from "axios";
import {useEffect, useState} from "react";
import {CardDTO} from "@pages/index/types/card.ts";

function Index() {
    const [imageUrls, setImageUrls] = useState([]);
   const getData =  async () => {
     // 오픈 API 호출
     const API_URL = 'https://api.unsplash.com/search/photos';
     const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
     const PER_PAGE = 30;

     const searchValue = 'dog';
     const pageValue = 100;

     try {
       const res = await axios.get(`${API_URL}?query=${searchValue}&client_id=${API_KEY}&per_page=${PER_PAGE}&page=${pageValue}`);

       console.log(res);
        if(res.status === 200) {
            setImageUrls(res.data.results);
        }

     } catch (error) {
       console.log(error)
     }
   }

   const cardList = imageUrls.map((card: CardDTO) => {
       return (
              <Card key={card.id} data={card} />
       )
   })

   useEffect(() => {
       getData();
   },[])

    return <div className={styles.page}>
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
            <div className={styles.page__contents__imageBox}>
                {cardList}
            </div>
        </div>
        {/* 공통 푸터 UI 부분 */}
        <CommonFooter />
    </div>
}

export default Index